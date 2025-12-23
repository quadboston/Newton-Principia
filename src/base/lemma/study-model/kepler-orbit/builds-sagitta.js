///builds two force estimations, 1) as finite sagitta,
///2) as Prop6, cor5 dev/area^2,
///which is calculated from preintegrated synchronized
///grids of t and q, time t and curve parameter q,
( function() {
    var { sn, stdMod, sconf, ssD, sData, } = window.b$l.apptree({
        stdModExportList : { builds_dq8sagit8displace, }, });
    sn( 'tIndexToOrbit', ssD, [] );
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
        const q2xy = stdMod.q2xy;
        const qIndexToOrbit = ssD.qIndexToOrbit;
        const tIndexToOrbit = ssD.tIndexToOrbit;
        const tIndexToOrbit_len = tIndexToOrbit.length;
        const graphArray = stdMod.graphArray;
        const delta_t_between_steps = ssD.delta_t_between_steps;
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
                let plusT = bodyTime + Dt;
                plusT = CURVE_REVOLVES ? ( timeRange + plusT ) % timeRange : plusT;
                //possibly floating errors do happen
                let  plusTix = Math.floor( plusT/delta_t_between_steps );
                ///todm: why this correction needed?
                if( plusTix >= tIndexToOrbit_len ) {
                    plusTix = tIndexToOrbit_len -1;
                    plusT = plusTix * delta_t_between_steps;
                    if( MAKE_RANGE && !CURVE_REVOLVES ){
                        plusQ = null;
                        bP.invalid = true;
                        ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                    }
                }else if( plusTix < 0 ){
                    //Seems to only occur when eg. P6 "Orbits are disconnected".
                    //For now this is just an error check, however additional
                    //code could be added if needed, perhaps similar to bounds
                    //check for minusTix code below and plusTix code above.

                } else {
                    //TEMP
                    const time = bodyTime + Dt;
                    const found = findQixTempBisection(time, bP.qix);
                    // const found = findQixTempLinearSearch(time, bP.qix);
                    const plusQix = found.qix;
                    //TEMP//
                    // const plusQix = tIndexToOrbit[plusTix].qix;
                    const plusP = qIndexToOrbit[ plusQix ];
                    const plusTQix = plusP.timeAtQ;
                    const plusT_reminder = plusT - plusTQix;
                    //TEMP Wrong qix (plusQix) often chosen when using
                    //tIndexToOrbit, and therefore wrong dq_dt
                    var plusQ = plusP.q +  plusT_reminder * plusP.dq_dt; 
                    //saves data for model-upcreate;
                    bP.plusQ = plusQ;
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
                minusT = CURVE_REVOLVES ? ( timeRange + minusT ) % timeRange : minusT;
                const minusTix = Math.floor( minusT/delta_t_between_steps );
                if( minusTix < 1 ) {
                    if( MAKE_RANGE && !CURVE_REVOLVES ){
                        ssD.qix_graph_start = Math.max( ssD.qix_graph_start, qix+1 );
                        bP.invalid = true;
                    }
                    continue;
                } else if( minusTix >= tIndexToOrbit.length ){
                    ////todo why? helps only in P6 when curve shape changes
                    if( MAKE_RANGE && !CURVE_REVOLVES ){
                        ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                        bP.invalid = true;
                    }
                    continue;
                }   
                const minusQix = tIndexToOrbit[minusTix].qix;
                const minusP = qIndexToOrbit[ minusQix ];
                const minusTQix = minusP.timeAtQ;
                const minusT_reminder = minusT - minusTQix;
                var minusQ = minusP.q + minusT_reminder * minusP.dq_dt;
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
    }


    // function performanceTest() {
    //     const Dt = ssD.Dt;
    //     const Q_STEPS = sconf.Q_STEPS;
    //     const qIndexToOrbit = ssD.qIndexToOrbit;
    //     console.time("performanceTest");
    //     for( let qix=0; qix<=Q_STEPS; qix++ ) {
    //         const bP = qIndexToOrbit[ qix ]; //body point data
    //         const bodyTime = bP.timeAtQ; //body time
    //         const foundData = findQixTempBisection(bodyTime + Dt, bP.qix);
    //     }
    //     console.timeEnd("performanceTest");
    // }


    function findQixTempBisection(time, qixStart) {
        //Temporary test to find the q index that corresponds to the input time
        //using bisection
        const qIndexToOrbit = ssD.qIndexToOrbit;
        let qixL = 0;
        let qixU = qIndexToOrbit.length - 1 - 1;
        // let qixU = qIndexToOrbit.length - 1;

        let count = 0;

        while(qixU - qixL >= 1) {
            const qixNew = Math.floor((qixL + qixU) / 2);
            const qix1 = qixStart + qixNew;
            const qix2 = qix1 + 1;

            const wrapQix1 = (qix1 >= qIndexToOrbit.length);
            const wrapQix2 = (qix2 >= qIndexToOrbit.length);

            const qix1Use = qix1 - (wrapQix1 ? qIndexToOrbit.length : 0);
            const qix2Use = qix2 - (wrapQix2 ? qIndexToOrbit.length : 0);

            const time1 = qIndexToOrbit[qix1Use].timeAtQ +
                (wrapQix1 ? ssD.timeRange : 0);
            const time2 = qIndexToOrbit[qix2Use].timeAtQ +
                (wrapQix2 ? ssD.timeRange : 0);

            count++;

            if (time >= time1 && time <= time2) {
                return {
                    qix: qix1Use,
                    count,
                };
            }

            if (time <= time1) {
                qixU = qixNew;
            } else {
                qixL = qixNew;
            }
        }
        return null;
    }


    function findQixTempLinearSearch(time, qixStart) {
        //Temporary test to find the q index that corresponds to the input time
        //using linear search
        const qIndexToOrbit = ssD.qIndexToOrbit;
        for(let i = 0; i < qIndexToOrbit.length; i++) {
            let qix1 = qixStart + i;
            let qix2 = qix1 + 1;

            const wrapQix1 = (qix1 >= qIndexToOrbit.length);
            const wrapQix2 = (qix2 >= qIndexToOrbit.length);

            const qix1Use = qix1 - (wrapQix1 ? qIndexToOrbit.length : 0);
            const qix2Use = qix2 - (wrapQix2 ? qIndexToOrbit.length : 0);

            const time1 = qIndexToOrbit[qix1Use].timeAtQ +
                (wrapQix1 ? ssD.timeRange : 0);
            const time2 = qIndexToOrbit[qix2Use].timeAtQ +
                (wrapQix2 ? ssD.timeRange : 0);

            if (time >= time1 && time <= time2) {
                return {
                    qix: qix1Use,
                    count: i + 1,
                };
            }
        }
        return null;
    }
}) ();

