( function() {
    var { sn, has, mcurve, stdMod, rg, sconf, ssD, }
        = window.b$l.apptree({ stdModExportList : { buildsOrbit, }, });
    var NON_SOLVABLE_THRESHOLD = 0.05;

    const graphArray = sn( 'graphArray', stdMod, [] );
    const qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    const orbitXYToDraw = sn( 'orbitXYToDraw', ssD, [] );
    return;


    function buildsOrbit()
    {
        graphArray.length =0;
        qIndexToOrbit.length = 0;
        
        const orbit_q_start = sconf.orbit_q_start;
        const q2xy = stdMod.q2xy;
        const Q_STEPS = sconf.Q_STEPS;
        const orbitXYToDraw_LIMIT = Math.min( 1000, Q_STEPS );
        const qrange = sconf.curveQRange;
        const delta_q_between_steps = sconf.delta_q_between_steps;
        var momentum0; //at start of the path
        
        var solvable = true;
        var foldPoints = [];
        
        //there is no prebilt orbit points, they are built and
        //embedded into svg in other place,
        ///they are recalculated here
        ///with other step here for derivative params,
        for (var qix = 0; qix<=Q_STEPS; qix++ )
        {
            var bP = qIndexToOrbit[ qix ] = mcurve.planeCurveDerivatives({
                fun : q2xy,
                q : orbit_q_start + qix * delta_q_between_steps,
                rrc : rg.S.pos,
            });
            bP.qix = qix;
            var {
                rr,
                ds_dq, //|d𝗿/dq|
                r2,
                staticSectorialSpeed_rrrOnUU,
                sinOmega, //for Kepler's motion, f = 1/R vₜ² / sin(w)
            } = bP;
            if( qix === 0 ) {
                //sometimes utilized in model for precise sagitta calculations
                ssD.sectSpeed0 = staticSectorialSpeed_rrrOnUU;
            }
            
            // Kepler's motion: rvₜcos(w) = M
            // f = M²/(Rr²cos³(w))
            sinAbs = Math.abs( sinOmega );
            if( NON_SOLVABLE_THRESHOLD > sinAbs ) {
                solvable = false;
                foldPoints.push( [ rr[0], rr[1] ] );
                bP.solvablePoint = solvable;
            }
            
            //------------------------------------------
            // //\\ preparing time array
            //------------------------------------------
            //meaning: dq_dt = dq/dt
            if( 0 === qix ) {
                momentum0 = staticSectorialSpeed_rrrOnUU;
                var ds_dt = 1;
                var timeAtQ = bP.timeAtQ = 0;
                var pathAtQ = bP.pathAtQ = 0;
                var dq_dt = ds_dt/ds_dq;
            } else {
                var ds_dt = momentum0 / staticSectorialSpeed_rrrOnUU;
                var dq_dt = ds_dt/ds_dq;
                var pathAtQ = bP.pathAtQ = pathAtQ + delta_q_between_steps * ds_dq;
                var timeAtQ = bP.timeAtQ = timeAtQ + delta_q_between_steps / dq_dt;
            }
            bP.ds_dt = ds_dt;
            bP.dq_dt = dq_dt;
            //------------------------------------------
            // \\// preparing time array
            //------------------------------------------
        }

        // //\\ one or many shapes
        if( !has( sconf, 'RESHAPABLE_ORBIT' ) ){
            sconf.RESHAPABLE_ORBIT = 1;
        }
        //todo start here apparen duplicate with other builder or
        //svg object duplicates and leaks, this is seen when,
        //we do not add ...P11 in media_upcreate basic,
        if( sconf.RESHAPABLE_ORBIT ){
            if( sconf.RESHAPABLE_ORBIT === 1 ){
                ////blocks redraw forever
                sconf.RESHAPABLE_ORBIT = 0;
            }
            ///for static orbit shapes shoult build once per launch,
            ///decoration: builds pivots for scalable decorational orbit
            const ORBIT_STEP = Q_STEPS/orbitXYToDraw_LIMIT;
            for( let oix=0; oix<=orbitXYToDraw_LIMIT; oix++ ){
                let qix = Math.floor( oix * ORBIT_STEP );
                orbitXYToDraw[ oix ] = qIndexToOrbit[qix].rr;
            }
        }
        // \\// one or many shapes

        ssD.solvable = solvable;
        ssD.foldPoints = foldPoints;
    }
}) ();

