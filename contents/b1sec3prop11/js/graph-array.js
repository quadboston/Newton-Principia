( function() {
    var {
        sn, haz, mcurve, mat, userOptions,
        stdMod, rg, sconf, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            buildsforceGraphArray,
            pos2qix,
        },
    });
    let bonus = userOptions.showingBonusFeatures() ? 1 : 0;
    var tix2orbit = ssD.tix2orbit = [];
    var qix2orb = ssD.qix2orb = [];
    return;


    function buildsforceGraphArray()
    {
        var curveParFi0   = sconf.curveParFi0;
        var rrc      = rg.S.pos;
        var q2xy      = rg[ 'approximated-curve' ].t2xy;
        const FORCE_ARRAY_LEN = sconf.FORCE_ARRAY_LEN;
        const TIME_STEPS = sconf.TIME_STEPS; // 7; //300;
        var momentum0; //at start of the path
        var qRange = sconf.curveQRange;
        var deltaQ = qRange / FORCE_ARRAY_LEN;
        var graphArray = [];
        //there is no prebilt orbit points, they are built and
        //embedded into svg in other place,
        ///they are recalculated here
        ///with other step here for derivative params,
        for (var qix = 0; qix<=FORCE_ARRAY_LEN; qix++ )
        {
            var q = curveParFi0 + qix * deltaQ;
            qix2orb[ qix ] = mcurve.planeCurveDerivatives({
                fun : q2xy,
                q,
                rrc,
            });
            var {
                rr,
                //r, //from chosen rrc
                v, //|d𝗿/dq|
                r2,
                //R,
                staticSectorialSpeed_rrrOnUU,
            } = qix2orb[ qix ];
            
            //------------------------------------------
            // //\\ preparing time array
            //------------------------------------------
            if( 0 === qix ) {
                momentum0 = staticSectorialSpeed_rrrOnUU;
                qix2orb[ 0 ].timeAtQ = 0;
            } else {
                var ds2dt = momentum0 / staticSectorialSpeed_rrrOnUU;
                var dq2dt = v * ds2dt;
                //ds/dq = v
                qix2orb[ qix ].timeAtQ = qix2orb[ qix -1 ].timeAtQ +
                    deltaQ * dq2dt;
            }
            //------------------------------------------
            // \\// preparing time array
            //------------------------------------------
        }

        //------------------------------------------
        // //\\ distributing values in time arrays
        //------------------------------------------
        {
            var timeRange = qix2orb[ FORCE_ARRAY_LEN ].timeAtQ - qix2orb[0].timeAtQ;
            var timeDelta = timeRange/TIME_STEPS;
            let timeAtT = 0;
            let timeAtQ = 0;
            let qix = 0;
            var qix_former = qix;
            var timeAtQ_former = timeAtQ;
            tix2orbit.length = 0; 
            tix2orbit[0] = [ {timeAtT, qix, timeAtQ, timeReminder:0} ];
            for( let tix = 0; tix<=TIME_STEPS; tix++ )
            {
                timeAtT = tix*timeDelta;
                while( timeAtT > timeAtQ ) {
                    qix_former = qix;
                    timeAtQ_former = timeAtQ;
                    if( qix >= FORCE_ARRAY_LEN ) break;
                    qix++;
                    timeAtQ = qix2orb[qix].timeAtQ;
                }
                tix2orbit[tix] = {
                     timeAtT,
                     qix:qix_former,
                     timeAtQ:timeAtQ_former,
                     timeReminder:
                        Math.max( //prevents floating poit errors
                            0,timeAtT - timeAtQ_former )
                };
                qix = qix_former+1;
                if( qix > FORCE_ARRAY_LEN ) {
                    qix = FORCE_ARRAY_LEN;
                }
                timeAtQ = qix2orb[qix].timeAtQ;
            }
        }
        //------------------------------------------
        // \\// distributing values in time arrays
        //------------------------------------------

        {
            //ccc( 'timeRange='+timeRange.toFixed(3) + ' qRange='+qRange.toFixed(3) );
            for( let qix=0; qix<=FORCE_ARRAY_LEN; qix++ ) {
                let bP = qix2orb[ qix ]; //body point data
                let bT = bP.timeAtQ; //body time
                let rr = bP.rr; //abs
                let r2 = bP.r2; //rel

                let plusT = ( timeRange + bT + sconf.sForSagitta_valT ) % timeRange;                
                let tix = Math.floor( plusT/timeDelta );
                let plusT_reminder = plusT - tix*timeDelta;
                let pulsQ = ( tix2orbit[tix].qix + plusT_reminder/timeDelta ) * deltaQ;

                //saves data for model-upcreate;
                bP.pulsQ = pulsQ;
                bP.deltaSugittaQ = (pulsQ - bP.q + qRange )%qRange;

                let rrplus = q2xy( pulsQ );
                let minusT = ( timeRange + bT - sconf.sForSagitta_valT ) % timeRange;                
                tix = Math.floor( plusT/timeDelta );
                let minusT_reminder = plusT - tix*timeDelta;
                let minusQ = ( tix2orbit[tix].qix + minusT_reminder/timeDelta ) * deltaQ; 
                let rrminus = q2xy( minusQ );

                var sagitta0 = rrplus[0]+rrminus[0]-2*rr[0];
                var sagitta1 = rrplus[1]+rrminus[1]-2*rr[1];
                var sagitta2 = Math.sqrt( sagitta0*sagitta0+sagitta1*sagitta1 );
                var estimatedForce = sagitta2;
                bP.sagitta = sagitta2 * 0.5;

                //--------------------------------------------
                // //\\ estimated force
                //      this is all wrong: it is static, but must be not:
                //--------------------------------------------
                //var QTPivots = haz( rg.QT, 'pivots' );
                //var QT2 = QTPivots ? mat.p1_to_p2( QTPivots[0].pos, QTPivots[1].pos ).v2 : 1;
                //var QRPivots = haz( rg.QR, 'pivots' );
                //var QR = QRPivots ? mat.p1_to_p2( QRPivots[0].pos, QRPivots[1].pos ).abs : 1;
                //var estimatedForce = QR/(QT2*r2);
                //--------------------------------------------
                // \\// estimated force
                //--------------------------------------------

                var unitlessForce = -1/r2;
                var forceSafe = Math.abs( unitlessForce );
                var sectSpeedSafe = 1e-150 > Math.abs( staticSectorialSpeed_rrrOnUU ) ?
                                    1e+150 : 1/staticSectorialSpeed_rrrOnUU;
                sectSpeedSafe = Math.abs( sectSpeedSafe );

                //-----------------------------------------------------------
                // //\\ builds coefficients at maximum |force|
                //-----------------------------------------------------------
                if( qix === 0 ) {
                    var forceMax        = forceSafe;
                    var estimatedForceMax = estimatedForce;
                    var speedMax = sectSpeedSafe;
                }
                if( forceMax < forceSafe ) {
                    var forceMax = forceSafe;
                }
                if( estimatedForceMax < estimatedForce ) {
                    var estimatedForceMax = estimatedForce;
                }
                if( speedMax < sectSpeedSafe ) {
                    var speedMax = sectSpeedSafe;
                }
                //-----------------------------------------------------------
                // \\// builds coefficients at maximum |force|
                //-----------------------------------------------------------

                graphArray[ qix ] = {
                    x : bP.r,
                    y : [
                            bonus ? unitlessForce : forceSafe,
                            estimatedForce,
                            //=vt=tangent speed
                            //sectSpeedSafe,
                    ],
                };
            }
            ccc( 'tix2orbit',tix2orbit );
            ccc( 'qix2orb',qix2orb );
        }
        var arrLen = graphArray.length;
        stdMod.graphArray = [];
        for (var qix = 0; qix<arrLen; qix++ )
        {
            var qo = graphArray[ qix ];
            qo.y[0] = qo.y[0] / forceMax;
            qo.y[1] = qo.y[1] / estimatedForceMax; //will be: estimatedMax;
            //qo.y[2] = qo.y[2] / speedMax;
        }
        stdMod.graphArray = graphArray;
        //ccc( "graphArray",graphArray )
    }


    function pos2qix( pos )
    {
        var q = stdMod.pos2t( rg.P.pos );
        var qixMax = stdMod.graphArray.length-1;
        var qix = Math.floor(   qixMax * q / Math.PI / 2   ); //=angle Ix,
        return Math.max( 0, Math.min( qixMax, qix ) );
    }

}) ();

