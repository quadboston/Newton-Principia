///builds force estimation, as Prop6 cor5 dev/area^2,
///which is calculated from time t and curve parameter q
( function() {
    var { sn, stdMod, sconf, ssD, sData, rg, } = window.b$l.apptree({
        stdModExportList : {
            builds_force_plusQ_minusQ_and_related,
            convertTimeToQ,
            //TEMP
            convert_q_to_time,
        }, });
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
                //TEMP
                // console.log("builds_force_plusQ_minusQ_and_related ssD.Dq =",
                //     ssD.Dq);
                break;
            case sData.ULTIM_ACTUAL:
                var Dt = 0;
                var Dq = 0;
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
                //TEMP
                // if (qix === 837) {
                //     console.log("qix === 837");
                //     console.log("bP.q =", bP.q);
                //     console.log("Dq =", Dq);
                //     console.log("plusQ =", plusQ);
                // }
                //"<" not "<=" to ensure point Q can reach the end of the orbit
                if( sconf.orbit_q_end < plusQ ){
                    if( MAKE_RANGE && !CURVE_REVOLVES ){
                        ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                        bP.invalid = true
                    }
                    //TEMP
                    // if (qix === 837) {
                    //     console.log("plusQ NOT updated");
                    // }
                } else {
                    //TEMP
                    // if (qix === 837) {
                    //     console.log("plusQ updated");
                    // }
                    bP.plusQ = plusQ;
                    const force = stdMod.calculateForce({
                        parq: plusQ,
                        bP,
                        Dq,
                        ulitmacy,
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
                    bP,
                    Dt,
                    ulitmacy,
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
        // check_q_and_time_conversions();
    }



    //TEMP Should the following be renamed to eg.
    //"convert_time_to_q"?
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



    //TEMP
    function calculateTimeBetweenQandP() {
        //TEMP Possible function to be called by the data table instead of
        //"ssD.Dt".
    }


    function convert_q_to_time(q, clampToMinAndMaxTime = false) {
        //Find the qix interval containing the input q, then interpolate and
        //output the time value using that interval.  Optionally if out of
        //bounds, clamp time to be from 0 to the maximum rather than null.

        const Q_STEPS = sconf.Q_STEPS;
        const qIndexToOrbit = ssD.qIndexToOrbit;
        const delta_q_between_steps = sconf.delta_q_between_steps;
        const orbit_q_start = sconf.orbit_q_start;
        const orbit_q_end = sconf.orbit_q_end;
        const timeRange = ssD.timeRange;

        //Ensure q within bounds, clamp if needed
        if (q < orbit_q_start) {
            return clampToMinAndMaxTime ? 0 : null;
        } else if (q > orbit_q_end) {
            return clampToMinAndMaxTime ? timeRange : null;
        }


        //Calculate qix for q
        const qix = (q - orbit_q_start) / delta_q_between_steps;

        if (qix === Q_STEPS) {
            //Exactly at orbit end point (no remainder)
            return qIndexToOrbit[Q_STEPS].timeAtQ;
        } else if (qix < 0) {
            //Before start of orbit, clamp if needed
            return clampToMinAndMaxTime ? 0 : null;
        } else if (qix > Q_STEPS) {
            //After end of orbit, clamp if needed
            return clampToMinAndMaxTime ? timeRange : null;
        }

        //Lower bound of interval that contains q
        const qixL = Math.floor(qix);

        //Calculate time value
        //Must use dq_dt from PEnd not PStart to be consistent with
        //how qIndexToOrbit data is setup in "builds-orbit.js"
        const PStart = qIndexToOrbit[ qixL ];
        const PEnd = qIndexToOrbit[ qixL + 1 ];
        const q_reminder = q - PStart.q;
        const time = PStart.timeAtQ + q_reminder / PEnd.dq_dt;
        return time;
    }



    function check_q_and_time_conversions() {
        //Simple automated test intended to help check if convertTimeToQ and
        //convert_q_to_time calculate values correctly.  It could be improved
        //for example:
        // -Could include end of interval.  Note when CURVE_REVOLVES = true
        //  the end of the last interval can return the first value rather than
        //  the max.
        // -Could check values outside range start to end (eg. 0 to timeRange).
        //  Note behavior is different depending on value of CURVE_REVOLVES.
        const qIndexToOrbit = ssD.qIndexToOrbit;

        const counts_time_to_q = { passed: 0, tests: 0, };
        const counts_q_to_time = { passed: 0, tests: 0, };

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

                //Calculate values and update counts
                const qCalculated = convertTimeToQ(time);
                updateCounts(counts_time_to_q, qCalculated, q);
                const timeCalculated = convert_q_to_time(q);
                updateCounts(counts_q_to_time, timeCalculated, time);
            }
        }

        showMessage(counts_time_to_q, "convertTimeToQ");
        showMessage(counts_q_to_time, "convert_q_to_time");


        function updateCounts(counts, valueCalculated, valueActual) {
            //Check value and update counts
            if (valueCalculated === null) {
                //Failed, shouldn't be null
            } else if (Math.abs(valueCalculated - valueActual) < 1e-9) {
                //Passed, within error tolerance
                counts.passed++;
            }
            counts.tests++;
        }

        function showMessage(counts, nameFunction) {
            const message = `Simple test for function ${nameFunction} ` +
                `${counts.passed}/${counts.tests} tests passed.`;
            if (counts.passed === counts.tests) {
                console.log(message);
            } else {
                console.error(message);
            }
        }
    }
}) ();

