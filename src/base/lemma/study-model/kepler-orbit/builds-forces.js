///builds force estimation, as Prop6 cor5 dev/area^2,
///which is calculated from time t and curve parameter q
( function() {
    var { sn, stdMod, sconf, ssD, sData, rg, } = window.b$l.apptree({
        stdModExportList : { builds_force_plusQ_minusQ_and_related, }, });
    sn( 'qIndexToOrbit', ssD, [] );
    sn( 'graphArray', stdMod, [] );
    sData.ULTIM_MAX = 2;
    sData.ULTIM_ACTUAL = 1;
    sData.ULTIM_ESTIMATED = 0;
    return;


    function builds_force_plusQ_minusQ_and_related(ulitmacy) {
        //Calculates:
        //-force for specified ulitmacy
        //-plusQ, minusQ, and related (eg. valid graph qix values)
        const CURVE_REVOLVES = sconf.CURVE_REVOLVES;
        const Q_STEPS = sconf.Q_STEPS;
        const Q_MINUS_EXISTS = rg.rrminus != null;
        const q2xy = stdMod.q2xy;
        const qIndexToOrbit = ssD.qIndexToOrbit;
        const timeRange = ssD.timeRange;
        const qrange = sconf.curveQRange;
        ulitmacy = !ulitmacy ? 0 : ulitmacy;
        var MAKE_RANGE = null;
        switch( ulitmacy ){
            case sData.ULTIM_MAX:
                ////here we set graph range when Dq or Dt
                ////take their maximums,
                ////this makes abscissa range constant
                ////whan Dq and Dt do change,
                var Dt = sconf.DT_SLIDER_MAX;
                var Dq = sconf.DQ_SLIDER_MAX;
                //we are going to rebuid diagram abscissa range:
                MAKE_RANGE = true;
                ssD.qix_graph_start = 0;
                ssD.qix_graph_end = Q_STEPS;
                break;
            case sData.ULTIM_ESTIMATED:
                var Dt = ssD.Dt;
                var Dq = ssD.Dq;
                break;
            case sData.ULTIM_ACTUAL:
                var Dt = 0.0001;
                var Dq = sconf.DQ_SLIDER_MIN;
                break;
        }
        for( let qix=0; qix<=Q_STEPS; qix++ ) {
            const bP = qIndexToOrbit[ qix ]; //body point data
            MAKE_RANGE && ( bP.invalid = false );
            //**********************************************
            // //\\ q is free variable
            //**********************************************
            if( !sconf.TIME_IS_FREE_VARIABLE ){
                var plusQ = bP.q + Dq;
                if( sconf.orbit_q_end <= plusQ ){
                    if( MAKE_RANGE && !CURVE_REVOLVES ){
                        ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                        bP.invalid = true
                    }
                } else {
                    bP.plusQ = plusQ;
                    const force = stdMod.calculateForce({
                        parq: plusQ,
                        bP
                    });
                    switch (ulitmacy) {
                        case sData.ULTIM_ESTIMATED:
                            bP.estimatedForce = force;
                            break;
                        case sData.ULTIM_ACTUAL:
                            bP.actualForce = force;
                            break;
                    }
                }
                continue;
            }
            //**********************************************
            // \\// q is free variable
            //**********************************************

            
            //**********************************************
            // //\\ t is a free variable
            //**********************************************
            const bodyTime = bP.timeAtQ; //body time
            {
                const plusT = bodyTime + Dt;
                var plusQ = convertTimeToQ(plusT);

                if (plusQ === null) {
                    if (MAKE_RANGE && !CURVE_REVOLVES) {
                        if (plusT > timeRange) {
                            bP.invalid = true;
                            ssD.qix_graph_end =
                                Math.min( ssD.qix_graph_end, qix-1 );
                        }
                    }
                } else {
                    //saves data for model-upcreate;
                    bP.plusQ = plusQ;
                    Dq = plusQ-bP.q;
                    bP.Dq = CURVE_REVOLVES ? (Dq + qrange )%qrange : Dq;
                }
            }

            if( plusQ !== null ){
                const force = stdMod.calculateForce({
                    parq: plusQ,
                    bP
                });
                switch (ulitmacy) {
                    case sData.ULTIM_ESTIMATED:
                        bP.estimatedForce = force;
                        break;
                    case sData.ULTIM_ACTUAL:
                        bP.actualForce = force;
                        break;
                }
                if( ulitmacy === sData.ULTIM_MAX ){
                    bP.max_displacement = force;
                }
            }
            
            if( plusQ !== null ){
                bP.rrplus = q2xy( plusQ );
                let minusT = bodyTime - Dt;
                var minusQ = convertTimeToQ(minusT);

                if (minusQ === null) {
                    if( MAKE_RANGE && !CURVE_REVOLVES && Q_MINUS_EXISTS ){
                        if (minusT < 0) {
                            ssD.qix_graph_start =
                                Math.max( ssD.qix_graph_start, qix+1 );
                            bP.invalid = true;
                        }
                    }
                    continue;
                }
                //saves data for model-upcreate;
                bP.minusQ = minusQ;
                bP.rrminus = q2xy( minusQ );

                // console.log('Q = ' + bP.rrplus + ", Q' = " + bP.rrminus);
            }
        }
        //**********************************************
        // \\// t is a free variable
        //**********************************************

        //Can be enabled temporarily for testing if needed
        // checkConvertTimeToQ();
    }



    function convertTimeToQ(time) {
        //Use the bisection method to find the qix interval containing the
        //input time, then interpolate and output the q value using that
        //interval.

        const CURVE_REVOLVES = sconf.CURVE_REVOLVES;
        const qIndexToOrbit = ssD.qIndexToOrbit;
        const timeRange = ssD.timeRange;
        
        //Adjust time as needed, and ensure within bounds.
        const timeFind = CURVE_REVOLVES ? (timeRange + time) % timeRange : time;
        if (timeFind < 0 || timeFind > timeRange)
            return null;


        //Lower and upper bound for searching
        let qixL = 0;
        //As interval is always defined by the first qix (not qix + 1), last
        //possible index can never be a valid value.
        let qixU = (qIndexToOrbit.length - 1) - 1;


        while(qixL <= qixU) {
            //Calculate new qix for midpoint
            const qix = Math.floor((qixL + qixU) / 2);

            //Times for current interval
            const timeStart = qIndexToOrbit[qix].timeAtQ;
            const timeEnd = qIndexToOrbit[qix + 1].timeAtQ

            if (timeFind < timeStart) {
                //Lower than current qix, therefore must be less (not same)
                qixU = qix - 1;
            } else if (timeFind > timeEnd) {
                //Higher than current qix, therefore must be greater (not same)
                qixL = qix + 1;
            } else {
                //Within current interval (includes both sides)

                //Found correct qix so calculate q value
                //Must use dq_dt from PEnd not PStart to be consistent with
                //how qIndexToOrbit data is setup in "builds-orbit.js"
                const PStart = qIndexToOrbit[ qix ];
                const PEnd = qIndexToOrbit[ qix + 1 ];
                const T_reminder = timeFind - timeStart;
                const Q = PStart.q +  T_reminder * PEnd.dq_dt;
                return Q;
            }
        }

        return null;
    }



    function checkConvertTimeToQ() {
        //Simple automated test intended to help check if convertTimeToQ
        //calculates values correctly.  It could be improved for example:
        // -Could include end of interval.  Note when CURVE_REVOLVES = true
        //  the end of the last interval can return the fist q value rather
        //  than the max.  That is to say 0 rather then eg. 2PI (depending on
        //  the model).
        // -Could check time values outside range 0 to the maximum (timeRange).
        //  Note behavior is different depending on value of CURVE_REVOLVES.
        const qIndexToOrbit = ssD.qIndexToOrbit;

        let countPassed = 0;
        let countTests = 0;

        const qixMax = (qIndexToOrbit.length - 1);
        const checksPerInterval = 5;

        for(let qix = 0; qix < qixMax; qix++) {
            //Values for current interval
            const pS = qIndexToOrbit[qix];
            const pE = qIndexToOrbit[qix + 1];

            const qS = pS.q;
            const qE = pE.q;
            const tS = pS.timeAtQ;
            const tE = pE.timeAtQ;

            //Check values within interval (including start, excluding end)
            for(let i = 0; i < checksPerInterval; i++) {
                const factor = i / checksPerInterval;

                const time = tS + (tE - tS) * factor;
                const q    = qS + (qE - qS) * factor;
                
                //Calculate and check value
                const Q = convertTimeToQ(time);
                if (Q === null) {
                    //Failed, shouldn't be null
                } else if (Math.abs(Q - q) < 1e-9) {
                    //Passed, within error tolerance
                    countPassed++;
                }
                countTests++;
            }
        }

        const message = `Simple test for function convertTimeToQ ` +
            `${countPassed}/${countTests} tests passed.`;
        if (countPassed === countTests) {
            console.log(message);
        } else {
            console.error(message);
        }
    }
}) ();

