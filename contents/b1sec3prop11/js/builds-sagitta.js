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
            builds_dq8agitta,
        },
    });
    var graphArray = sn( 'graphArray', stdMod, [] );
    var tix2orbit = sn( 'tix2orbit', ssD, [] );
    var qix2orb = sn( 'qix2orb', ssD, [] );
    const BONUS = userOptions.showingBonusFeatures();
    return;


    function builds_dq8agitta()
    {
        const ADDENDUM = amode.aspect === 'addendum';
        const FORCE_ARRAY_LEN = sconf.FORCE_ARRAY_LEN;
        const q2xy = stdMod.q2xy;
        const graphArray = stdMod.graphArray;
        var qix2orb = ssD.qix2orb;
        var tix2orbit = ssD.tix2orbit;
        var timeDelta = ssD.timeDelta
        var timeRange = ssD.timeRange;
        var qRange = sconf.curveQRange;
        var sDt = ssD.saggitaDt;
        var deltaQ = qRange / FORCE_ARRAY_LEN;
        for( let qix=0; qix<=FORCE_ARRAY_LEN; qix++ ) {
            let bP = qix2orb[ qix ]; //body point data
            let bT = bP.timeAtQ; //body time
            let rr = bP.rr; //abs
            let r2 = bP.r2; //rel

            if( sDt < timeDelta*2 ) {
                ////this does not work for sagitta,
                ////possibly because of non-linear dependency
                ////of sDt * bP.dq_dt
                var plusQ = bP.q + sDt * bP.dq_dt;
            } else {
                let plusT = ( timeRange + bT + ssD.saggitaDt ) % timeRange;
                let plusTix = Math.floor( plusT/timeDelta );
                let plusQix = tix2orbit[plusTix].qix;
                let plusP = qix2orb[ plusQix ];
                let plusTQix = plusP.timeAtQ;
                let plusT_reminder = plusT - plusTQix;
                var plusQ = plusP.q +  plusT_reminder * plusP.dq_dt; 
            }
            
            //saves data for model-upcreate;
            bP.plusQ = plusQ;
            bP.sagittaDq = (plusQ - bP.q + qRange )%qRange;
            let rrplus = q2xy( plusQ );

            if( sDt < timeDelta*2 ) {
                ////this does not work for sagitta,
                ////possibly because of non-linear dependency
                ////of sDt * bP.dq_dt
                var minusQ = bP.q - sDt * bP.dq_dt;
            } else {
                let minusT = ( timeRange + bT - ssD.saggitaDt ) % timeRange;
                let minusTix = Math.floor( minusT/timeDelta );
                let minusQix = tix2orbit[minusTix].qix;
                let minusP = qix2orb[ minusQix ];
                let minusTQix = minusP.timeAtQ;
                let minusT_reminder = minusT - minusTQix;
                var minusQ = minusP.q + minusT_reminder * minusP.dq_dt;
            }   
            //saves data for model-upcreate;
            bP.minusQ = minusQ;
            let rrminus = q2xy( minusQ );

            var sagitta0 = rrplus[0]+rrminus[0]-2*rr[0];
            var sagitta1 = rrplus[1]+rrminus[1]-2*rr[1];
            var sagitta = 0.5*Math.sqrt( sagitta0*sagitta0+sagitta1*sagitta1 );

            var deviation = stdMod.buildsDeviation({ 
                parq: plusQ,
                bP
            });
            
            /*
            ///this is a debug of non-completely clear issue
            ///of large fluctuations of dq at small dt
            ///it can be due of algo, or due code error
            //sconf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
            //sconf.DT_MIN = 0.0001;
            //var FORCE_ARRAY_LEN = 20;
            //var TIME_STEPS = 20;
            //var DATA_GRAPH_ARRAY_LEN = 200;
            if( qix === 19 || qix === 15 ) { 
                //ix || bP.sagittaDq < 0.1) {
                ccc( 'qix='+qix+ ' pix='+plusQix + ' mix='+minusQix +
                    //' plus: t at qix=' + plusTQix +
                    ' sag='+sagitta.toFixed(5)
                    );
                ccc( ' pQ = '+ plusQ.toFixed(5) + '= (atIX=)'+ plusP.q.toFixed(5) +
                    '(qrem=)' + (plusT_reminder * plusP.dq_dt).toFixed(5) );
                ccc( ' mQ = '+ minusQ.toFixed(5) + '=(atIX=)'+ minusP.q.toFixed(5) +
                    '(qrem=)' + (minusT_reminder * minusP.dq_dt).toFixed(5) );
            }
            */

            //-----------------------------------------------------------
            // //\\ calculates maximum force
            //-----------------------------------------------------------
            if( qix === 0 ) {
                var deviationMax = deviation;
            }
            if( deviationMax < deviation ) {
                var deviationMax = deviation;
            }
            bP.deviation = ADDENDUM ? -deviation : deviation;
            //-----------------------------------------------------------
            // \\// calculates maximum force
            //-----------------------------------------------------------

            //-----------------------------------------------------------
            // //\\ calculates maximum force
            //-----------------------------------------------------------
            if( qix === 0 ) {
                var sagittaMax = sagitta;
            }
            if( sagittaMax < sagitta ) {
                var sagittaMax = sagitta;
            }
            bP.sagitta = ADDENDUM ? -sagitta : sagitta;
            //-----------------------------------------------------------
            // \\// calculates maximum force
            //-----------------------------------------------------------

            //-----------------------------------------------------------
            // //\\ calculates maximum speed
            //-----------------------------------------------------------
            if( qix === 0 ) {
                var speedMax = bP.ds_dt;
            }
            speedMax = Math.max( speedMax, bP.ds_dt );
            //-----------------------------------------------------------
            // \\// calculates maximum speed
            //-----------------------------------------------------------
        }
        //stdMod.graphFW_lemma.forceMax = forceMax;
        ///resets forceGraphArray
        stdMod.graphFW_lemma.graphArray = graphArray;

        var arrLen = graphArray.length;
        for (var gix = 0; gix<arrLen; gix++ )
        {
            let ga = graphArray[ gix ];
            let qix = ga.qix;
            let bP = qix2orb[ qix ];
            ga.y[0] = ADDENDUM ? -bP.forceAbsNormed : bP.forceAbsNormed;
            ga.y[1] = bP.deviation / deviationMax;
            ADDENDUM && ( ga.y[2] = bP.ds_dt / speedMax );
            ADDENDUM && ( ga.y[3] = bP.sagitta / sagittaMax );
        }
        stdMod.graphFW_lemma.graphArrayMask = ADDENDUM ?
            [ 'force', 'deivation', 'body',
               sDt > timeDelta*2  //blocks at times wher algo breaks, 'sagitta'
            ] :
            [ 'force', 'deivation', ];
        //this is just an example how to reset colors dynamically:
        //stdMod.graphFW_lemma.colorThreadArray[0] =
        //    ADDENDUM ? 'green' : sDomF.getFixedColor( 'force' );
    }
}) ();

