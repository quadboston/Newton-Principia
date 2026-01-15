///builds two force estimations, 1) as finite sagitta,
///2) as Prop6, cor5 dev/area^2,
//TEMP This comment probably needs to be adjusted or removed entirely.  For
//example the part about "grids of t and q".
///which is calculated from preintegrated synchronized
///grids of t and q, time t and curve parameter q,
( function() {
    var { sn, stdMod, sconf, ssD, sData, } = window.b$l.apptree({
        stdModExportList : { builds_dq8sagit8displace, }, });
    sn( 'qIndexToOrbit', ssD, [] );
    sn( 'graphArray', stdMod, [] );
    sData.ULTIM_MAX = 2;
    sData.ULTIM_INSTANT = 1;
    sData.ULTIM_MIDDLE = 0;
    return;


    function builds_dq8sagit8displace({ ulitmacy }){
        const SACC = sconf.SAGITTA_ACCURACY_LIMIT;
        const CURVE_REVOLVES = sconf.CURVE_REVOLVES;
        const Q_STEPS = sconf.Q_STEPS;
        const Q_MINUS_EXISTS = sconf.Q_MINUS_EXISTS;
        const q2xy = stdMod.q2xy;
        const qIndexToOrbit = ssD.qIndexToOrbit;
        const graphArray = stdMod.graphArray;
        //TEMP I believe this has been removed.
        // const delta_t_between_steps = ssD.delta_t_between_steps;
        const delta_q_between_steps = sconf.delta_q_between_steps;
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
            case sData.ULTIM_MIDDLE:
                var Dt = ssD.Dt;
                var Dq = ssD.Dq;
                break;
            case sData.ULTIM_INSTANT:
                var Dt = 0.0001;//ssD.delta_t_between_steps*(SACC+1); //TEMP
                var Dq = sconf.DQ_SLIDER_MIN;
                break;
        }
        console.log("builds_dq8sagit8displace  ulitmacy =", ulitmacy);
        console.log(`builds_dq8sagit8displace  ulitmacy = ${ulitmacy}  Dt = ${Dt}`);
        // let outputTemp = "qix, q, timeAtQ, dq_dt, plusQ\n";//TEMP
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
                    const displ = stdMod.calcs__displacement({ 
                        parq: plusQ,
                        bP
                    });
                    bP.displacement = displ;
                    if( ulitmacy === sData.ULTIM_INSTANT ){
                        bP.instant_displacement = displ;
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
            const rr = bP.rr; //abs
            const r2 = bP.r2; //rel
            {
                const plusT = bodyTime + Dt;
                var plusQ = convertTimeToQ(plusT);

                if (plusQ == null) {
                    if (MAKE_RANGE && !CURVE_REVOLVES) {
                        //TEMP Greater.  Needs to be improved.
                        if (plusT > timeRange) {
                            plusQ = null;
                            bP.invalid = true;
                            ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                        }
                        //TEMP Less, should something be added for this?
                        //Maybe not, maybe plus should only check the positive
                        //side, and minus only the negative side?
                    }
                } else {
                    //TEMP
                    //saves data for model-upcreate;
                    bP.plusQ = plusQ;
                    //TEMP Is the following correct?
                    Dq = plusQ-bP.q;
                    bP.Dq = CURVE_REVOLVES ? (Dq + qrange )%qrange : Dq;
                }
            }

            if( plusQ !== null ){
                const displ = stdMod.calcs__displacement({ 
                    parq: plusQ,
                    bP
                });
                bP.displacement = displ;
                if( ulitmacy === sData.ULTIM_INSTANT ){
                    bP.instant_displacement = displ;
                }
            }
            
            if( plusQ !== null ){
                const rrplus = bP.rrplus = q2xy( plusQ );
                let minusT = bodyTime - Dt;
                
                // const minusTix = Math.floor( minusT/delta_t_between_steps );
                // if( minusTix < 1 ) {
                //     if( MAKE_RANGE && !CURVE_REVOLVES ){
                //         ssD.qix_graph_start = Math.max( ssD.qix_graph_start, qix+1 );
                //         bP.invalid = true;
                //     }
                //     continue;
                // } else if( minusTix >= tIndexToOrbit.length ){
                //     ////todo why? helps only in P6 when curve shape changes
                //     if( MAKE_RANGE && !CURVE_REVOLVES ){
                //         ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                //         bP.invalid = true;
                //     }
                //     continue;
                // }

                
                var minusQ = convertTimeToQ(minusT);

                //TEMP
                if (minusQ == null) {
                    //TEMP A setting or similar should probably be added to
                    //disable this if Q minus isn't present (eg. for P9).
                    //
                    //Are there any issues that could occur?  For example
                    //perhaps the estimated force curve on the graph will end
                    //up missing a bit on the right side?
                    // -That seems to be the case but it's probably not a big
                    //  deal overall

                    //TEMP I suppose convertTimeToQ would take into
                    //account whether or not CURVE_REVOLVES, so it may not be
                    //needed here?
                    // -Perhaps however it's always possible soething could
                    //change and probably best to leave for clarity.

                    //TEMP The wollowing setting should probably be added to
                    //sconf, likely only for P6.
                    // const qMinusPresentTEMP = false;
                    if( MAKE_RANGE && !CURVE_REVOLVES && Q_MINUS_EXISTS ){
                        if (minusT < 0) {
                            ssD.qix_graph_start = Math.max( ssD.qix_graph_start, qix+1 );
                            bP.invalid = true;
                        } else if (minusT > timeRange) {
                            //TEMP Commented, may not need this.
                            //Does leaving this or removing this cause problems?
                            // ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                            // bP.invalid = true;
                        }
                    }
                    continue;
                }
                //saves data for model-upcreate;
                bP.minusQ = minusQ;
                const rrminus = bP.rrminus = q2xy( minusQ );
                const s0 = (rrplus[0]+rrminus[0]-2*rr[0])*0.5;
                const s1 = (rrplus[1]+rrminus[1]-2*rr[1])*0.5;

                //when displacement is parallel to rrr, then sign > 0
                const rrr = bP.rrr;
                const sign = Math.sign( rrr[0]*s0 + rrr[1]*s1 );
                const sagittaAbs = Math.sqrt( s0*s0+s1*s1 );
                bP.sagitta = sign * sagittaAbs;
                bP.sagittaVector = [s0, s1];
                if( ulitmacy === sData.ULTIM_INSTANT ){
                    bP.instant_sagitta = bP.sagitta;
                }
            }
            // outputTemp += `${bP.qix}, ${bP.q}, ${bP.timeAtQ}, ${bP.dq_dt}, ` +
            //               `${bP.plusQ}\n`;
        }
        //**********************************************
        // \\// t is a free variable
        //**********************************************
        //console.log("outputTemp =", outputTemp);
        //TEMP
        // runTest();
    }



    function convertTimeToQ(time) {
        //Use the bisection method to find the qix interval containing the
        //input time, then interpolate and output the q value using that
        //interval.

        const CURVE_REVOLVES = sconf.CURVE_REVOLVES;
        const qIndexToOrbit = ssD.qIndexToOrbit;
        const timeRange = ssD.timeRange;

        //TEMP Could the following have float point error for curves that
        //revolve, when time is at eg. timeRange?
        
        //Adjust time as needed, and ensure within bounds.
        const timeFind = CURVE_REVOLVES ? (timeRange + time) % timeRange : time;
        if (timeFind < 0 || timeFind > timeRange)
            return null;


        //Lower and upper bound of interval.
        let qixL = 0;
        //As interval is always defined by the first qix (not qix + 1), last
        //possible index can never be a valid value.
        let qixU = (qIndexToOrbit.length - 1) - 1;


        while(qixL <= qixU) {//TEMP Probably needs to be changed, maybe fine now.
            //Calculate new qix for midpoint
            const qix = Math.floor((qixL + qixU) / 2);

            //Times for current interval
            const timeStart = qIndexToOrbit[qix].timeAtQ;
            const timeEnd = qIndexToOrbit[qix + 1].timeAtQ

            //TEMP Are the following correct?  What if eg. time was the max?
            //Then I think there would be an issue because currently the
            //interval found is equal or greater than the lower bound, but
            //always less than the upper bound.  Perhaps if the upper bound was
            //included (or similar) then it could work?
            if (timeFind < timeStart) {
                //Lower than current qix, therefore must be less (not same)
                qixU = qix - 1;
            } else if (timeFind > timeEnd) {
                //Higher than current qix, therefore must be greater (not same)
                qixL = qix + 1;
            } else {
                //Within current interval (includes lower and upper bound)
                // return qix;

                //TEMP To output plusQ or similar rather than qix
                //Found correct qix so convert to q value //TEMP
                //Convert q index to q value //TEMP
                const P = qIndexToOrbit[ qix ];
                const TQix = P.timeAtQ;
                const T_reminder = timeFind - TQix;
                const Q = P.q +  T_reminder * P.dq_dt; 
                return Q;
            }
        }

        return null;
    }
}) ();

