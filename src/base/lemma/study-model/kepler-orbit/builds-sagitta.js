///builds two force estimations, 1) as finite sagitta,
///2) as Prop6, cor5 dev/area^2,
///which is calculated from preintegrated synchronized
///grids of t and q, time t and curve parameter q,
( function() {
    var {
        sn,
        stdMod, amode, sconf, ssD, sData,
    } = window.b$l.apptree({
        stdModExportList :
        {
            builds_dq8sagit8displace,
        },
    });
    sn( 'tix2orbit', ssD, [] );
    sn( 'qix2orb', ssD, [] );
    sn( 'graphArray', stdMod, [] );
    sData.ULTIM_MAX = 2;
    sData.ULTIM_INSTANT = 1;
    sData.ULTIM_MIDDLE = 0;
    return;


    function builds_dq8sagit8displace({ ulitmacy }){
        const ADDENDUM = amode.aspect === 'addendum';
        const SACC = sconf.SAGITTA_ACCURACY_LIMIT;
        const CR = sconf.CURVE_REVOLVES;
        const QS = sconf.Q_STEPS;
        const q2xy = stdMod.q2xy;
        const qix2orb = ssD.qix2orb;
        const tix2orbit = ssD.tix2orbit;
        const t2o_len = tix2orbit.length;
        const graphArray = stdMod.graphArray;
        const tgrid_step = ssD.tgrid_step;
        const qgrid_step = sconf.qgrid_step;
        const trange = ssD.trange;
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
                //We do make range for permitted (for cosmetic goals) q and qx
                //when saggita is built "once per curve" and with 
                //"ulitmate" accuracy. We do not rebuilt range on
                //current and big intervals Dq or Dt.
                MAKE_RANGE = true;
                ssD.qix_graph_start = 0;
                ssD.qix_graph_end = QS;
                break;
            case sData.ULTIM_MIDDLE:
                var Dt = ssD.Dt;
                var Dq = ssD.Dq;
                break;
            case sData.ULTIM_INSTANT:
                var Dt = ssD.tgrid_step*(SACC+1);
                var Dq = sconf.DQ_SLIDER_MIN;
                break;
        }
        for( let qix=0; qix<=QS; qix++ ) {
            const bP = qix2orb[ qix ]; //body point data
            MAKE_RANGE && ( bP.invalid = false );
            //**********************************************
            // //\\ q is free variable
            //**********************************************
            if( !sconf.TIME_IS_FREE_VARIABLE ){
                var plusQ = bP.q + Dq;
                if( !CR && sconf.orbit_q_end <= plusQ ){
                    if( MAKE_RANGE ){
                        ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                        bP.invalid = true
                    }
                } else {
                    bP.plusQ = plusQ;
                    const fQR = stdMod.calcs_fQR({ 
                        parq: plusQ,
                        bP
                    });
                    bP.fQR = fQR;
                    if( ulitmacy === sData.ULTIM_INSTANT ){
                        bP.instant_fQR = fQR;
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
            const bT = bP.timeAtQ; //body time
            const rr = bP.rr; //abs
            const r2 = bP.r2; //rel
            {
                let plusT = bT + Dt;
                plusT = CR ? ( trange + plusT ) % trange : plusT;
                //possibly floating errors do happen
                let  plusTix = Math.floor( plusT/tgrid_step );
                ///todm: why this correction needed?
                if( plusTix >= t2o_len ) {
                    plusTix = t2o_len -1;
                    plusT = plusTix * tgrid_step;
                    if( !CR && MAKE_RANGE ){
                        plusQ = null;
                        bP.invalid = true;
                        ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                    }
                } else {
                    const plusQix = tix2orbit[plusTix].qix;
                    const plusP = qix2orb[ plusQix ];
                    const plusTQix = plusP.timeAtQ;
                    const plusT_reminder = plusT - plusTQix;
                    var plusQ = plusP.q +  plusT_reminder * plusP.dq_dt; 
                    //saves data for model-upcreate;
                    bP.plusQ = plusQ;
                    Dq = plusQ-bP.q;
                    bP.Dq = CR ? (Dq + qrange )%qrange : Dq;
                }
            }

            if( plusQ !== null ){
                const fQR = stdMod.calcs_fQR({ 
                    parq: plusQ,
                    bP
                });
                bP.fQR = fQR;
                if( ulitmacy === sData.ULTIM_INSTANT ){
                    bP.instant_fQR = fQR;
                }
            }
            
            if( plusQ !== null ){
                const rrplus = bP.rrplus = q2xy( plusQ );
                let minusT = bT - Dt;
                minusT =  CR ? ( trange + minusT ) % trange : minusT;
                const minusTix = Math.floor( minusT/tgrid_step );
                if( minusTix < 1 ) {
                    if( !CR && MAKE_RANGE ){
                        ssD.qix_graph_start = Math.max( ssD.qix_graph_start, qix+1 );
                        bP.invalid = true;
                    }
                    continue;
                } else if( minusTix >= tix2orbit.length ){
                    ////todo why? helps only in P6 when curve shape changes
                    if( !CR && MAKE_RANGE ){
                        ssD.qix_graph_end = Math.min( ssD.qix_graph_end, qix-1 );
                        bP.invalid = true;
                    }
                    continue;
                }   
                const minusQix = tix2orbit[minusTix].qix;
                const minusP = qix2orb[ minusQix ];
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
        }
        //**********************************************
        // \\// t is a free variable
        //**********************************************
    }
})();