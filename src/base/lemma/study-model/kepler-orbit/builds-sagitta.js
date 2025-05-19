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
            builds_dq8sagitta8deviation,
        },
    });
    sn( 'tix2orbit', ssD, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
    const graphArray = sn( 'graphArray', stdMod, [] );
    //const BONUS = userOptions.showingBonusFeatures();
    return;


    function builds_dq8sagitta8deviation()
    {
        const ADDENDUM = amode.aspect === 'addendum';
        const CR = sconf.CURVE_REVOLVES;
        const CALCULATE_SUGITTA_ALONG_THE_PATH =
              sconf.CALCULATE_SUGITTA_ALONG_THE_PATH;
        const FS = sconf.Q_STEPS;
        const TIME_STEPS = sconf.TIME_STEPS;
        const q2xy = stdMod.q2xy;
        const qix2orb = ssD.qix2orb;
        const tix2orbit = ssD.tix2orbit;
        const t2o_len = tix2orbit.length;
        const graphArray = stdMod.graphArray;
        const tgrid_step = ssD.tgrid_step;
        const qgrid_step = sconf.qgrid_step;
        const trange = ssD.trange;
        const qrange = sconf.curveQRange;
        
        const Dt = ssD.Dt;  //optional
        var Dq = ssD.Dq;    //optional
        
        for( let qix=0; qix<=FS; qix++ ) {
            const bP = qix2orb[ qix ]; //body point data

            
            //**********************************************
            // //\\ q is free variable
            //**********************************************
            if( !sconf.TIME_IS_FREE_VARIABLE ){
                var plusQ = bP.q + Dq;
                if( sconf.orbit_q_end <= bP.q+qgrid_step*2 ){
                    bP.plusQ = null;
                    if( ssD.qix_graph_lim === null ){
                        ssD.qix_graph_lim = qix;
                    }
                } else {
                    bP.plusQ = plusQ;
                    bP.estForce = stdMod.buildsDeviation({ 
                        parq: plusQ,
                        bP
                    });
                }
                if( FS === qix && ssD.qix_graph_lim === null ){
                    ssD.qix_graph_lim = qix+1;
                }
                continue;
            }
            //**********************************************
            // \\// q is free variable
            //**********************************************

            
            if( ssD.qix_graph_lim !== null && ssD.qix_graph_lim <= qix ){
                bP.plusQ = null;
                continue;
            }
            if( sconf.orbit_q_end <= bP.q+qgrid_step*2 && !CR ){
                bP.plusQ = null;
                ssD.qix_graph_lim = ssD.qix_graph_lim === null ?
                    ssD.qix_graph_lim = qix : ssD.qix_graph_lim;
                continue;
            }
                
            const bT = bP.timeAtQ; //body time
            const rr = bP.rr; //abs
            const r2 = bP.r2; //rel
            if( Dt < tgrid_step*3 ) {
                ////this does not work for sagitta,
                ////possibly because of non-linear dependency
                ////of Dt * bP.dq_dt
                var plusQ = bP.q + Dt * bP.dq_dt;
                bP.plusQ = plusQ;
            } else {
                let plusT = bT + Dt;
                plusT = CR ? ( trange + plusT ) % trange : plusT;
                //possibly floating errors do happen
                let  plusTix = Math.floor( plusT/tgrid_step );
                ///todm: why this correction needed?
                if( plusTix >= t2o_len ) {
                    plusTix = t2o_len -1;
                    plusT = plusTix * tgrid_step;
                    bP.plusQ = null;
                    if( ssD.qix_graph_lim === null ){
                        ////relies on running 
                        ssD.qix_graph_lim = qix;
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
            ///prefents empty graph array, sets limit for this array:
            if( FS === qix && ssD.qix_graph_lim === null ){
                ssD.qix_graph_lim = qix+1;
            }
            if( bP.plusQ !== null ){
                bP.estForce = stdMod.buildsDeviation({ 
                    parq: plusQ,
                    bP
                });
            }
            
            
            ///todm: unfinished work: must block time values below time range:
            ///do this via bP.plusQ = null;
            if( bP.plusQ !== null && sconf.CALCULATE_SUGITTA_ALONG_THE_PATH ){
                const rrplus = q2xy( plusQ );
                let minusT = bT - Dt;
                minusT =  CR ? ( trange + minusT ) % trange : minusT;
                const minusTix = Math.floor( minusT/tgrid_step );
                if( minusTix < 1 ) {
                    bP.plusQ = null;
                    continue;
                }
                const minusQix = tix2orbit[minusTix].qix;
                const minusP = qix2orb[ minusQix ];
                const minusTQix = minusP.timeAtQ;
                const minusT_reminder = minusT - minusTQix;
                var minusQ = minusP.q + minusT_reminder * minusP.dq_dt;
                //saves data for model-upcreate;
                bP.minusQ = minusQ;
                const rrminus = q2xy( minusQ );
                const s0 = rrplus[0]+rrminus[0]-2*rr[0];
                const s1 = rrplus[1]+rrminus[1]-2*rr[1];
                bP.sagitta = 0.5*Math.sqrt( s0*s0+s1*s1 );
            }
        }
    }
}) ();

