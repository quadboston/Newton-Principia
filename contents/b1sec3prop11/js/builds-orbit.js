( function() {
    var {
        sn, haz, mcurve, mat, userOptions,
        amode, stdMod, rg, sconf, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            buildsOrbit,
        },
    });
    var graphArray = sn( 'graphArray', stdMod, [] );
    var tix2orbit = sn( 'tix2orbit', ssD, [] );
    var qix2orb = sn( 'qix2orb', ssD, [] );
    var orbitXYToDraw = sn( 'orbitXYToDraw', ssD, [] );
    const BONUS = userOptions.showingBonusFeatures() ? 1 : 0;
    return;


    function buildsOrbit()
    {
        const ADDENDUM = amode.aspect === 'addendum';
        
        //this array speeds up conversion between q and t grids:
        //it elimiantes extra calculations and loops:
        tix2orbit.length = 0;
        
        graphArray.length =0;
        qix2orb.length = 0;
        
        var curveParFi0 = sconf.curveParFi0;
        var q2xy = stdMod.q2xy;
        const FORCE_ARRAY_LEN = sconf.FORCE_ARRAY_LEN;
        const orbitXYToDraw_LIMIT = Math.min( 1000, sconf.FORCE_ARRAY_LEN );
        const TIME_STEPS = sconf.TIME_STEPS;
        const DATA_GRAPH_ARRAY_LEN = sconf.DATA_GRAPH_ARRAY_LEN;
        var DATA_GRAPH_ARRAY_period = Math.max( 1,
            Math.floor( FORCE_ARRAY_LEN/DATA_GRAPH_ARRAY_LEN ) );
        var momentum0; //at start of the path
        var qRange = sconf.curveQRange;
        var deltaQ = qRange / FORCE_ARRAY_LEN;
        //there is no prebilt orbit points, they are built and
        //embedded into svg in other place,
        ///they are recalculated here
        ///with other step here for derivative params,
        for (var qix = 0; qix<=FORCE_ARRAY_LEN; qix++ )
        {
            var q = curveParFi0 + qix * deltaQ;
            var bP = qix2orb[ qix ] = mcurve.planeCurveDerivatives({
                fun : q2xy,
                q,
                rrc : rg.S.pos,
            });
            var {
                rr,
                v, //|d𝗿/dq|
                r2,
                staticSectorialSpeed_rrrOnUU,
            } = bP;
            //------------------------------------------
            // //\\ preparing time array
            //------------------------------------------
            //meaning: dq_dt = dq/dt
            if( 0 === qix ) {
                momentum0 = staticSectorialSpeed_rrrOnUU;
                var ds_dt = 1;
                //v = ds/dq
                bP.timeAtQ = 0;
                var dq_dt = ds_dt/v;
            } else {
                var ds_dt = momentum0 / staticSectorialSpeed_rrrOnUU;
                var dq_dt = ds_dt/v;
                bP.timeAtQ = qix2orb[ qix -1 ].timeAtQ +
                             deltaQ / dq_dt;
            }
            bP.ds_dt = ds_dt;
            bP.dq_dt = dq_dt;
            //------------------------------------------
            // \\// preparing time array
            //------------------------------------------
        }

        ////builds once per app lanuch
        ///decoration: builds pivots for scalable decorational orbit
        for( let oix=0; oix<=orbitXYToDraw_LIMIT; oix++ ){
            let qix = Math.floor( oix*FORCE_ARRAY_LEN/orbitXYToDraw_LIMIT );
            orbitXYToDraw[ oix ] = qix2orb[qix].rr;
        }
        ssD.timeRange = qix2orb[ FORCE_ARRAY_LEN ].timeAtQ -
                        qix2orb[0].timeAtQ;
        ssD.timeDelta = ssD.timeRange/TIME_STEPS;
        
        {
            //------------------------------------------
            // //\\ distributing values in time arrays
            //------------------------------------------
            var timeDelta = ssD.timeDelta
            var timeRange = ssD.timeRange;
            let timeAtT = 0;
            let timeAtQ = 0;
            let qix = 0;
            var qix_former = qix;
            var timeAtQ_former = timeAtQ;
            tix2orbit.length = 0; 
            tix2orbit[0] = [ {timeAtT, qix, timeAtQ, timeReminder:0} ];
            const FORCE_ARRAY_LEN1 = FORCE_ARRAY_LEN - 1;
            for( let tix = 0; tix<=TIME_STEPS; tix++ )
            {
                timeAtT = tix*timeDelta;
                while( timeAtT > timeAtQ ) {
                    qix_former = qix;
                    timeAtQ_former = timeAtQ;
                    if( qix >= FORCE_ARRAY_LEN1 ) break;
                    qix++;
                    timeAtQ = qix2orb[qix].timeAtQ;
                }
                let dt4dqix =  qix2orb[qix_former+1].timeAtQ - timeAtQ_former;
                tix2orbit[tix] = {
                     timeAtT,
                     qix:qix_former,
                     timeAtQ:timeAtQ_former, //extra
                     timeReminder:
                        Math.max( //prevents floating poit errors
                            0,timeAtT - timeAtQ_former ),
                     dt4dqix,
                };
                if( qix_former+1 <= FORCE_ARRAY_LEN1 ) {
                    qix = qix_former+1;
                    timeAtQ = qix2orb[qix].timeAtQ;
                }
            }
        }
        //------------------------------------------
        // \\// distributing values in time arrays
        //------------------------------------------

        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        for( let qix=0; qix<=FORCE_ARRAY_LEN; qix++ ) {
            var bP = qix2orb[ qix ];
            var forceAbs = 1/bP.r2;
            bP.forceAbsNormed = forceAbs;
            //var sectSpeedSafe = 1e-150 > Math.abs( staticSectorialSpeed_rrrOnUU ) ?
            //                    1e+150 : 1/staticSectorialSpeed_rrrOnUU;
            //sectSpeedSafe = Math.abs( sectSpeedSafe );
            //-----------------------------------------------------------
            // //\\ builds coefficients at maximum |force|
            //-----------------------------------------------------------
            if( qix === 0 ) {
                var forceMax = forceAbs;
            }
            if( forceMax < forceAbs ) {
                var forceMax = forceAbs;
            }
            //-----------------------------------------------------------
            // \\// builds coefficients at maximum |force|
            //-----------------------------------------------------------
            if( !(qix%DATA_GRAPH_ARRAY_period) || qix===FORCE_ARRAY_LEN ){
                let graphColumn = {
                    qix,
                    x : bP.r,
                    y : [
                            ////reserves space for
                            0, //forceAbs/forceMax,
                            0, //for deviation,
                            0, //sectSpeedSafe,
                            0, //sagitta,
                    ],
                };
                graphArray.push( graphColumn );
            }
        }
        ///stashes static values
        for (var qix = 0; qix<=FORCE_ARRAY_LEN; qix++ )
        {
            var bP = qix2orb[ qix ];
            bP.forceAbsNormed /= forceMax;
        }
    }
}) ();

