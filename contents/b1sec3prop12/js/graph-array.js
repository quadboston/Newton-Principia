( function() {
    var {
        sn, mcurve,
        stdMod, rg, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            buildsforceGraphArray,
            P2gix,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    return;


    function buildsforceGraphArray()
    {
        var op      = sconf.orbitParameters;
        var qStart  = op.qStart;
        var qEnd    = op.qEnd;
        var rrc     = rg.S.pos;
        var t2xy    = rg[ 'approximated-curve' ].t2xy;
        var forceGraphArray = [];
        var Q_STEPS = 400;
        let calcs_fQR = stdMod.calcs_fQR;
        for (var forceArrayIx = 0; forceArrayIx<=Q_STEPS; forceArrayIx++ )
        {
            var q = qStart + forceArrayIx * ( qEnd - qStart ) / Q_STEPS;
            let bP = mcurve.planeCurveDerivatives({
                fun : t2xy,
                q,
                rrc,
            });
            var {
                r, //from chosen rrc
            } = bP;            
            var fQR = Math.abs( calcs_fQR({ 
                        parq: q + op.sagittaDelta_q,
                        bP,
            }));
            let fQR_instant_abs = bP.fQR_instant_abs =
                Math.abs( calcs_fQR({ 
                        parq: q + op.sagittaDelta_q_instant,
                        bP,
            }));
            //----------------------------------------
            // //\\ builds norms
            //----------------------------------------
            if( forceArrayIx === 0 ) {
                var forceMax        = fQR;
                fQR_instant_max     = fQR_instant_abs;
            }
            if( forceMax < fQR ) {
                var forceMax = fQR;
            }
            if( fQR_instant_max < fQR_instant_abs ){
                fQR_instant_max = fQR_instant_abs;
            }
            //----------------------------------------
            // \\// builds norms
            //----------------------------------------

            forceGraphArray[ forceArrayIx ] = {
                x : Math.log( r ),
                y : [
                        fQR_instant_abs,
                        fQR,
                ],
            };
        }
        var arrLen = forceGraphArray.length;
        const ga = graphArray;
        ga.length = 0;
        for (var forceArrayIx = 0; forceArrayIx<arrLen; forceArrayIx++ )
        {
            var far = forceGraphArray[ forceArrayIx ];
            far.y[0] = Math.log( far.y[0] / fQR_instant_max );
            far.y[1] = Math.log( far.y[1] / fQR_instant_max );
            //it is referenced somewhere, so we use element by element set:
            ga[forceArrayIx] = far;
        }
    }


    ///to be used in slow code
    function P2gix( pos )
    {
        const q = rg.P.q;
        const qixMax = stdMod.graphArray.length-1;
        const qix = Math.floor(   qixMax * (q-sconf.orbitParameters.qStart)
                  / (2*Math.PI) ); //=angle Ix,
        return Math.max( 0, Math.min( qixMax, qix ) );
    }
})();
