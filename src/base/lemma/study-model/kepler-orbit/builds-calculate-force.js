///notations are from Prop6, cor. 5,
( function() {
    var { mat, stdMod, sconf, ssD, sData, } = window.b$l.apptree({
        stdModExportList : {
            calculateForce,
            calculateDqSubstituteActualForce,
        }, });
    ssD.DT_SUBSTITUTE_ACTUAL_FORCE = 0.0001;
    return;


    function calculateDqSubstituteActualForce() {
        //Convert DT_SUBSTITUTE_ACTUAL_FORCE to an equivalent Dq value

        //For every possible position along the orbit (point P positions), the
        //point where the substitution for each of them must occur can be
        //calculated.  This is done by adding DT_SUBSTITUTE_ACTUAL_FORCE to the
        //time at each point P position.  The delta between the q values at both
        //those points can then be calculated.

        //When dragging point P, Dq and the curves on the graph stay the same.
        //Also note the delta q values calculated for the substitution, are
        //usually different for each possible position of point P.  This means
        //if the substitution must occur for even one possible position of point
        //P, it must occur for all of them.  Therefore the equivalent Dq
        //substitution value will be the maximum delta q value.

        //Only run this function if q is the free variable
        if (sconf.TIME_IS_FREE_VARIABLE)
            return;

        const Q_STEPS = sconf.Q_STEPS;
        const qIndexToOrbit = ssD.qIndexToOrbit;

        //Start at 0 because shouldn't be negative (distance between Q and P
        //must be 0 or greater)
        let delta_q_max = 0;

        for(let qix=0; qix<=Q_STEPS; qix++) {
            const bP = qIndexToOrbit[ qix ]; //body point data
            const timeP = bP.timeAtQ;

            const timeOffset = timeP + ssD.DT_SUBSTITUTE_ACTUAL_FORCE;
            const qOffset = stdMod.convertTimeTo_q(timeOffset);

            if (qOffset != null) {
                const qP = bP.q;
                const delta_q = qOffset - qP;
                delta_q_max = Math.max(delta_q_max, delta_q);
            }
        }

        ssD.DqSubstituteActualForce = delta_q_max;


        //todo
        //Add models here that have been checked
        switch(sconf.sappId) {
            case "b1sec2prop9":
                return;
        }
        console.warn(
            "At the time of writing this, most models don't use q as the " +
            "free variable.  Therefore if a model is switched to use it, the " +
            "force substitution that occurs when Q is close to P, needs to " +
            "be checked to ensure it works correctly."
        );
        //This can be checked by moving Q close to, and at P, for different
        //arrangements (eg. drag point A to adjust the orbit, S to adjust the
        //center of forces etc.).  Then check for issues such as the following:
        //-Errors in the console
        //-NaN data points for the estimated force curve
        //-Jagged/noisy estimated force curve
    }


    function calculateForce({
        parq, //orbit argument
        bP,   //orbit point P rack
        Dt,
        Dq,
        ulitmacy,
    }) {
        //When Q is close to P, the estimated force calculation can have issues
        //such as noise.  Therefore if close enough substitute actual force to
        //prevent issues.

        let substituteActualForce = false;
        if (!sconf.TIME_IS_FREE_VARIABLE) {
            //"<=" not "<", because if both values are 0, the substitution
            //should still occur
            substituteActualForce = (Dq <= ssD.DqSubstituteActualForce);
        } else {
            substituteActualForce = (Dt <= ssD.DT_SUBSTITUTE_ACTUAL_FORCE);
        }

        const isUlitmacyForActualForce = (ulitmacy === sData.ULTIM_ACTUAL);

        // //Can be enabled temporarily for testing if needed
        // if (bP.qix === 0 && !isUlitmacyForActualForce) {
        //     const message = `substituteActualForce = ${substituteActualForce}`;
        //     if (substituteActualForce) {
        //         console.warn(message);
        //     } else {
        //         console.log(message);
        //     }
        // }

        return (isUlitmacyForActualForce || substituteActualForce) ?
            calculateActualForce({bP}) :
            calculateEstimatedForce({parq, bP});
    }


    function calculateActualForce({
        bP    //orbit point P rack
    }) {
		if (stdMod.calculateActualForce) {
			return stdMod.calculateActualForce({bP});
		}
        const P = bP.rr;
        const S = bP.sunXY;
        const V = bP.curvatureChordSecondPoint;
        const Y = bP.projectionOfCenterOnTangent;

        const SY0 = S[0]-Y[0];
        const SY1 = S[1]-Y[1];
        const SY = Math.sqrt( SY0*SY0 + SY1*SY1 );

        const PV0 = P[0]-V[0];
        const PV1 = P[1]-V[1];
        const PV = Math.sqrt( PV0*PV0 + PV1*PV1 );

        const force = 1 / (SY ** 2 * PV);

        const sign = calculateSign(bP, [-PV0, -PV1]);
        return sign * force;
    }


    function calculateEstimatedForce({
        parq, //orbit argument
        bP    //orbit point P rack
    }){
        ///builds estimated force as displacement/area^2,
        ///displacement = QR, area = QT*SP,
        const q2xy = stdMod.q2xy;
        const Q = q2xy( parq );
        const P = bP.rr;
        const S = bP.sunXY;
        const R = mat.linesCross(
            bP.uu, P, //direction, start
            [P[0]-S[0], P[1]-S[1]], Q, //direction, start
        );
        const QR0 = Q[0]-R[0];
        const QR1 = Q[1]-R[1];
        const QR = Math.sqrt( QR0*QR0 + QR1*QR1 );

        const T = mat.dropPerpendicular( Q, S, P )
        const QT0 = Q[0]-T[0];
        const QT1 = Q[1]-T[1];
        const QT = Math.sqrt( QT0*QT0 + QT1*QT1 );
        const SP = bP.r;
        const area = SP*QT;
        const force = QR/(area*area);

        const sign = calculateSign(bP, [QR0, QR1]);
        return sign * force;
    }


    function calculateSign(bP, direction) {
        //Calculate by comparing directions of the following vectors
        const rrr = bP.rrr; //vector from S to P
        return Math.sign(rrr[0]*direction[0] + rrr[1]*direction[1]);
    }
}) ();

