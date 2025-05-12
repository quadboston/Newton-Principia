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
        
        var orbit_q_start = sconf.orbit_q_start;
        var q2xy = stdMod.q2xy;
        const FORCE_ARRAY_LEN = sconf.FORCE_ARRAY_LEN;
        const orbitXYToDraw_LIMIT = Math.min( 1000, sconf.FORCE_ARRAY_LEN );
        const TIME_STEPS = sconf.TIME_STEPS;
        const DATA_GRAPH_ARRAY_LEN = sconf.DATA_GRAPH_ARRAY_LEN;
        var DATA_GRAPH_ARRAY_period = Math.max( 1,
            Math.floor( FORCE_ARRAY_LEN/DATA_GRAPH_ARRAY_LEN ) );
        var momentum0; //at start of the path
        var qRange = sconf.curveQRange;
        var deltaQ = sconf.deltaQ;
        //there is no prebilt orbit points, they are built and
        //embedded into svg in other place,
        ///they are recalculated here
        ///with other step here for derivative params,
        for (var qix = 0; qix<=FORCE_ARRAY_LEN; qix++ )
        {
            var q = orbit_q_start + qix * deltaQ;
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
        //to use this, one needs separate q for sagitta:
        //sconf.CALCULATE_SUGITTA_ALONG_THE_PATH && 

        stdMod.builds_orbit_time_grid();        
    }
}) ();

