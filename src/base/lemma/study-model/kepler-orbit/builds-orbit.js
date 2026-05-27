( function() {
    var { sn, has, mcurve, stdMod, rg, sconf, ssD, }
        = window.b$l.apptree({ stdModExportList : { buildsOrbit, }, });
    var NON_SOLVABLE_THRESHOLD = 0.05;

    //A large arbitrary value.  It should ensure smooth behavior (not too small
    //eg. 10 would mean each increment is 36 degrees), and round-off error isn't
    //an issue (not way too large).
    ssD.ANGLE_INCREMENTS = 360000;

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
        const delta_q_between_steps = sconf.delta_q_between_steps;
        var momentum0; //at start of the path
        
        var solvable = true;
        var foldPoints = [];
        ssD.nonSolvablePointCaption = "The orbit's tangent cannot pass through center of force";
        
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

            if (sconf.CURVE_REVOLVES)
                bP.angleIncrement = calculateAngleIncrement(rr, qix);

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



    function calculateAngleIncrement(posPoint, qix) {
        //Calculate the angle of this point relative to the origin
        //-To avoid error where this is used, imagine splitting the orbit into
        // equally spaced angular increments.  Calculate the angular increment
        // that contains this point, and store it as an integer.
        //-The first qix corresponds to an increment of 0
        //-The last qix corresponds to an increment of ANGLE_INCREMENTS
        //-For some models the angle is sometimes the same as bP.q, and the
        // calculated increment sometimes the same as qix (if ANGLE_INCREMENTS =
        // Q_STEPS).  However that's not always true, and therefore would be
        // unreliable if used for this instead.
        
        const Q_STEPS = sconf.Q_STEPS;
        const center = sconf.diagramOrigin;
        const x = posPoint[0] - center[0];
        const y = posPoint[1] - center[1];

        //Angle should be from 0 to PI for upper half of points, and PI
        //to 2*PI for lower half.
        const isLowerHalf = (qix > Q_STEPS / 2);
        //Ensure y is always -ve for lower half, and +ve for upper half.
        //Otherwise if eg. y is near 0, a tiny bit of error could cause the
        //sign to flip, meaning the angle won't be calculated correctly.
        const yAdjusted = isLowerHalf ? Math.min(y, -0) : Math.max(y, 0);

        //Calculate angle (upper half 0 to PI, lower half -PI to 0)
        let angle = Math.atan2(yAdjusted, x);
        //Adjust lower half to be from PI to 2*PI
        if (isLowerHalf)
            angle += 2 * Math.PI;

        const incrementsPerRadian = ssD.ANGLE_INCREMENTS / (2*Math.PI);
        //Round to the nearest increment.  This ensures eg. 2*PI +/- a bit of
        //error always results in the maximum increment, rather than ambiguity
        //between 0 vs the maximum increment.
        return Math.round(angle * incrementsPerRadian);
    }
}) ();

