///builds two force estimations, 1) as finite sagitta,
///2) as Prop6, cor5 dev/area^2,
///which is calculated from preintegrated synchronized
///grids of t and q, time t and curve parameter q,
( function() {
    var {
        sn, haz, mcurve, mat, userOptions,
        stdMod,  amode, rg, sconf, ssD, ssF, sDomF,
    } = window.b$l.apptree({
        stdModExportList :
        {
            builds_dq8sagitta,
        },
    });
    var graphArray = sn( 'graphArray', stdMod, [] );
    sn( 'tix2orbit', ssD, [] );
    var qix2orb = sn( 'qix2orb', ssD, [] );
    const BONUS = userOptions.showingBonusFeatures();
    return;


    function builds_dq8sagitta()
    {
        const ADDENDUM = amode.aspect === 'addendum';
        const CALCULATE_SUGITTA_ALONG_THE_PATH =
              sconf.CALCULATE_SUGITTA_ALONG_THE_PATH;
        const FORCE_ARRAY_LEN = sconf.FORCE_ARRAY_LEN;
        const q2xy = stdMod.q2xy;
        const graphArray = stdMod.graphArray;
        const qix2orb = ssD.qix2orb;
        const tix2orbit = ssD.tix2orbit;
        const timeDelta = ssD.timeDelta
        const timeRange = ssD.timeRange;
        const qRange = sconf.curveQRange;
        const sDt = ssD.saggitaDt;
        const deltaQ = sconf.deltaQ;
        const CURVE_REVOLVES = sconf.CURVE_REVOLVES;
        const TIME_STEPS = sconf.TIME_STEPS;
        const TIME_RANGE_FLOAT = timeRange*0.999999;
        for( let qix=0; qix<=FORCE_ARRAY_LEN; qix++ ) {
            const bP = qix2orb[ qix ]; //body point data
            const bT = bP.timeAtQ; //body time
            const rr = bP.rr; //abs
            const r2 = bP.r2; //rel

            if( sDt < timeDelta*3 ) {
                ////this does not work for sagitta,
                ////possibly because of non-linear dependency
                ////of sDt * bP.dq_dt
                var plusQ = bP.q + sDt * bP.dq_dt;
            } else {
                const plusT = CURVE_REVOLVES ? 
                    ( timeRange + bT + ssD.saggitaDt ) % timeRange :
                    Math.min( TIME_RANGE_FLOAT, bT + ssD.saggitaDt );

                //possibly floating errors do happen
                const plusTix = Math.floor( plusT/timeDelta );
                const plusQix = tix2orbit[plusTix].qix;
                const plusP = qix2orb[ plusQix ];
                const plusTQix = plusP.timeAtQ;
                const plusT_reminder = plusT - plusTQix;
                var plusQ = plusP.q +  plusT_reminder * plusP.dq_dt; 
            }
            
            //saves data for model-upcreate;
            bP.plusQ = plusQ;
            
            if( sconf.CALCULATE_SUGITTA_ALONG_THE_PATH ){
                var sagittaDq = plusQ - bP.q;
                bP.sagittaDq = CURVE_REVOLVES ?
                        (sagittaDq + qRange )%qRange :
                        sagittaDq;
                const rrplus = q2xy( plusQ );
                if( sDt < timeDelta*3 ) {
                    ////this does not work for sagitta,
                    ////possibly because of non-linear dependency
                    ////of sDt * bP.dq_dt
                    var minusQ = bP.q - sDt * bP.dq_dt;
                } else {
                    const minusT =  CURVE_REVOLVES ? 
                        ( timeRange + bT - ssD.saggitaDt ) % timeRange :
                        bT-ssD.saggitaDt;
                    const minusTix = Math.floor( minusT/timeDelta );
                    const minusQix = tix2orbit[minusTix].qix;
                    const minusP = qix2orb[ minusQix ];
                    const minusTQix = minusP.timeAtQ;
                    const minusT_reminder = minusT - minusTQix;
                    var minusQ = minusP.q + minusT_reminder * minusP.dq_dt;
                }   
                //saves data for model-upcreate;
                bP.minusQ = minusQ;
                const rrminus = q2xy( minusQ );

                const s0 = rrplus[0]+rrminus[0]-2*rr[0];
                const s1 = rrplus[1]+rrminus[1]-2*rr[1];
                bP.sagitta = 0.5*Math.sqrt( s0*s0+s1*s1 );
            }
            bP.estForce = stdMod.buildsDeviation({ 
                parq: plusQ,
                bP
            });
        }
    }
}) ();

