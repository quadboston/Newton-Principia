( function() {
    var { sn, has, mcurve, stdMod, rg, sconf, ssD, sData, }
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
        
        //there are no prebuilt orbit points, they are built and
        //embedded into svg in other place,
        ///they are recalculated here
        ///with other step here for derivative params,
        for (var qix = 0; qix<=Q_STEPS; qix++ )
        {
            var bP = qIndexToOrbit[ qix ] = mcurve.planeCurveDerivatives({
                pointAt : q2xy,
                q : orbit_q_start + qix * delta_q_between_steps,
                sunXY : rg.S.pos,
            });
            bP.qix = qix;
            var {
                planetXY,
                ds_dq, //|d𝗿/dq|
                r2,
                staticSectorialSpeed_rrrOnUU,
                sinOmega, //for Kepler's motion, f = 1/R vₜ² / sin(w)
            } = bP;

            if (sconf.CURVE_REVOLVES)
                bP.angleIncrement = calculateAngleIncrement(planetXY, qix);

            // Kepler's motion: rvₜcos(w) = M
            // f = M²/(Rr²cos³(w))
            sinAbs = Math.abs( sinOmega );
            if( NON_SOLVABLE_THRESHOLD > sinAbs ) {
                solvable = false;
                foldPoints.push( [ planetXY[0], planetXY[1] ] );
                bP.solvablePoint = solvable;
            }
            
            //------------------------------------------
            // //\\ preparing time array
            //------------------------------------------
            //meaning: dq_dt = dq/dt
            if( 0 === qix ) {
                //TEMP
                // momentum0 = staticSectorialSpeed_rrrOnUU;
                // var ds_dt = 1;

                //TEMP
                var ds_dt = calculateVTemp(bP);
                // console.log("buildsOrbit ds_dt =", ds_dt);
                momentum0 = staticSectorialSpeed_rrrOnUU * ds_dt;

                var timeAtQ = bP.timeAtQ = 0;
                var pathAtQ = bP.pathAtQ = 0;
                //TEMP
                var dq_dt = ds_dt/ds_dq;//  /5.7;// / 0.4518;// / 2.5945;//5.7;
            } else {
                var ds_dt = momentum0 / staticSectorialSpeed_rrrOnUU;
                //TEMP
                var dq_dt = ds_dt/ds_dq;//  /5.7;// / 0.4518;// / 2.5945;//5.7;
                var pathAtQ = bP.pathAtQ = pathAtQ + delta_q_between_steps * ds_dq;
                var timeAtQ = bP.timeAtQ = timeAtQ + delta_q_between_steps / dq_dt;
            }
            bP.dq_dt = dq_dt;
            //------------------------------------------
            // \\// preparing time array
            //------------------------------------------
        }
        //TEMP
        // const T = qIndexToOrbit[Q_STEPS].timeAtQ - qIndexToOrbit[0].timeAtQ;
        // console.log("buildsOrbit T =", T);
        // const A = sconf.ellipseA;
        // console.log("buildsOrbit A^3 / T^2 =", A**3 / T**2);

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
                orbitXYToDraw[ oix ] = qIndexToOrbit[qix].planetXY;
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



    function calculateVTemp(bP) {
        //TEMP This function needs some improvements
        // s1 = s0 + v0*t + 1/2*a*t^2
        // x1 = x0 + vx0*t + 1/2*ax*t^2
        // x1 - x0 = vx0*t + 1/2*ax*t^2


        //st1 = st0 + vt0*t + 1/2*at*t^2
        //st1 - st0 = vt0*t + 1/2*at*t^2
        //(st1 - st0) - 1/2*at*t^2 = vt0*t
        //(st1 - st0) / t - 1/2*at*t = vt0
        //(st1 - st0) / t - at * t / 2 = vt0


        //sn1 = sn0 + vn0*t + 1/2*an*t^2
        //vn0 = 0
        //sn1 - sn0 = 1/2*an*t^2
        //2 * (sn1 - sn0) = an*t^2
        //2 * (sn1 - sn0) / an = t^2
        //Math.sqrt(2 * (sn1 - sn0) / an) = t

        const q2xy = stdMod.q2xy;
        const delta_q = 0.00001;


        const actualForce = Math.abs(stdMod.calculateForce({
            bP, ulitmacy: sData.ULTIM_ACTUAL
        }));

        var sunXY = rg.S.pos;

        const SP = [bP.planetXY[0]- sunXY[0], bP.planetXY[1]- sunXY[1]];
        const magnitudeSP = Math.sqrt(SP[0]**2 + SP[1]**2);
        const nSP0 = [SP[0] / magnitudeSP, SP[1] / magnitudeSP];

        const F = [-nSP0[0] * actualForce, -nSP0[1] * actualForce];


        const pos0 = bP.planetXY;
        const pos1 = q2xy(bP.q + delta_q);

        const sn0 = pos0[0] * bP.nn[0] + pos0[1] * bP.nn[1];
        const sn1 = pos1[0] * bP.nn[0] + pos1[1] * bP.nn[1];
        const an = F[0] * bP.nn[0] + F[1] * bP.nn[1];

        const st0 = pos0[0] * bP.uu[0] + pos0[1] * bP.uu[1];
        const st1 = pos1[0] * bP.uu[0] + pos1[1] * bP.uu[1];
        const at = F[0] * bP.uu[0] + F[1] * bP.uu[1];

        const t = Math.sqrt(2 * (sn1 - sn0) / an);
        const ds_dt = (st1 - st0) / t - at * t / 2;
        return ds_dt;
        // const vt0 = (st1 - st0) / t - at * t / 2;
        // return vt0;
    }
}) ();

