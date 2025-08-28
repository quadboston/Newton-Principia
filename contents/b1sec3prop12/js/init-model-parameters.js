( function() {
    var {
        ns, nspaste, mcurve, mat,
        fconf, ssD,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList : {
            init_model_parameters,
        },
    });
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        var op = sconf.orbitParameters;
        toreg( 'approximated-curve' );
        toreg( 'instanttriangle' );

        rg.P.q = op.PparQ_initial;
        ////creates both curve and its area
        stdMod.creates_orbitRack();
        {
            let {
                rr,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q : op.PparQ_initial,
                rrc : rg.S.pos,
            });
            nspaste( rg.P.pos, rr );
        }

        stdMod.completesSlidersCreation();      //in-diagram sliders
        stdMod.establishesEccentricity( sconf.orbitParameters.eccentricity );

        //==================================================
        // //\\ decoration graph
        //==================================================
        ssD.zebraCols = {};
        [ false, ns.rgbaArr2hsla( [0,     0,   255,    1] )[0] ].forEach(
            ( monoColorHue ) => {
                var wwCols = ns.builds_zebraNColors_array({
                    maxColors : 10,
                    SATUR       : sconf.DEFAULT_TP_SATUR,  //site setting

                    //40 seems better than 40 for distinct graph lines
                    LIGHT       : 40,  //sconf.default_tp_lightness ||
                    OPACITY     : 0.8, //apparently irrelevant; sconf.DEFAULT_TP_OPACITY,
                    zebraNumber : 4,
                    monoColorHue, //true is for mono, false is for multy,
                });
                if( monoColorHue ) {
                    ssD.zebraCols.monocolor = wwCols;
                } else {
                    ssD.zebraCols.multicolor = wwCols;
                }
            });

        stdMod.createsGraphFW( stdMod.legendRoot$ );
        //==================================================
        // \\// decoration graph 
        //==================================================
    }

}) ();

