( function() {
    var {
        sn, haz, mcurve, mat, userOptions,
        stdMod, rg, sconf, ssD, ssF,
    } = window.b$l.apptree({
        stdModExportList :
        {
            buildsSagitta,
        },
    });
    var graphArray = sn( 'graphArray', stdMod, [] );
    var tix2orbit = sn( 'tix2orbit', ssD, [] );
    var qix2orb = sn( 'qix2orb', ssD, [] );
    const BONUS = userOptions.showingBonusFeatures() ? 1 : 0;
    return;


    function buildsSagitta()
    {
        const FORCE_ARRAY_LEN = sconf.FORCE_ARRAY_LEN;
        const q2xy = stdMod.q2xy;
        const graphArray = stdMod.graphArray;
        var qix2orb = ssD.qix2orb;
        var tix2orbit = ssD.tix2orbit;
        var timeDelta = ssD.timeDelta
        var timeRange = ssD.timeRange;
        var qRange = sconf.curveQRange;
        var deltaQ = qRange / FORCE_ARRAY_LEN;
        //ccc( 'timeRange='+timeRange.toFixed(3) + ' qRange='+qRange.toFixed(3) );
        for( let qix=0; qix<=FORCE_ARRAY_LEN; qix++ ) {
            let bP = qix2orb[ qix ]; //body point data
            let bT = bP.timeAtQ; //body time
            let rr = bP.rr; //abs
            let r2 = bP.r2; //rel

            let plusT = ( timeRange + bT + ssD.saggitaDt ) % timeRange;
            let plusTix = Math.floor( plusT/timeDelta );
            let plusQix = tix2orbit[plusTix].qix;
            let plusP = qix2orb[ plusQix ];
            let plusTQix = plusP.timeAtQ;
            let plusT_reminder = plusT - plusTQix;
            let pulsQ = plusP.q +  plusT_reminder * plusP.dq_dt; 

            //saves data for model-upcreate;
            bP.pulsQ = pulsQ;
            bP.sagittaDq = (pulsQ - bP.q + qRange )%qRange;

            let rrplus = q2xy( pulsQ );
            let minusT = ( timeRange + bT - ssD.saggitaDt ) % timeRange;
            let minusTix = Math.floor( minusT/timeDelta );
            let minusQix = tix2orbit[minusTix].qix;
            let minusP = qix2orb[ minusQix ];
            let minusTQix = minusP.timeAtQ;
            let minusT_reminder = minusT - minusTQix;
            let minusQ = minusP.q + minusT_reminder * minusP.dq_dt;
               
            //saves data for model-upcreate;
            bP.minusQ = minusQ;
            let rrminus = q2xy( minusQ );

            var sagitta0 = rrplus[0]+rrminus[0]-2*rr[0];
            var sagitta1 = rrplus[1]+rrminus[1]-2*rr[1];
            var sagitta2 = Math.sqrt( sagitta0*sagitta0+sagitta1*sagitta1 );
            var estimatedForce = sagitta2;
            bP.sagitta = sagitta2 * 0.5;

            //--------------------------------------------
            // //\\ estimated force
            //      by Newton's method,
            //      but it is implemented wrongly here,
            //      it is static, but must be not:
            //--------------------------------------------
            //var QTPivots = haz( rg.QT, 'pivots' );
            //var QT2 = QTPivots ? mat.p1_to_p2( QTPivots[0].pos, QTPivots[1].pos ).v2 : 1;
            //var QRPivots = haz( rg.QR, 'pivots' );
            //var QR = QRPivots ? mat.p1_to_p2( QRPivots[0].pos, QRPivots[1].pos ).abs : 1;
            //var estimatedForce = QR/(QT2*r2);
            //--------------------------------------------
            // \\// estimated force
            //--------------------------------------------


            //-----------------------------------------------------------
            // //\\ builds coefficients at maximum |force|
            //-----------------------------------------------------------
            if( qix === 0 ) {
                var estimatedForceMax = estimatedForce;
            }
            if( estimatedForceMax < estimatedForce ) {
                var estimatedForceMax = estimatedForce;
            }
            //-----------------------------------------------------------
            // \\// builds coefficients at maximum |force|
            //-----------------------------------------------------------

            //-----------------------------------------------------------
            // //\\ builds coefficients at maximum |force|
            //-----------------------------------------------------------
            if( qix === 0 ) {
                var speedMax = bP.ds_dt;
            }
            speedMax = Math.max( speedMax, bP.ds_dt );
            //-----------------------------------------------------------
            // \\// builds coefficients at maximum |force|
            //-----------------------------------------------------------
            bP.estimatedForce = estimatedForce;
        }
        var arrLen = graphArray.length;
        for (var gix = 0; gix<arrLen; gix++ )
        {
            let ga = graphArray[ gix ];
            let qix = ga.qix;
            let bP = qix2orb[ qix ];
            ga.y[1] = bP.estimatedForce / estimatedForceMax;
            BONUS && ( ga.y[2] = bP.ds_dt / speedMax );
        }
    }
}) ();

