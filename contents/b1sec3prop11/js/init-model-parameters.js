( function() {
    var {
        ns, sn, $$, nspaste, nsmethods, nssvg, mcurve, integral, mat,
        fconf, ssF, ssD, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
        },
    });
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        //=================================================
        // //\\ model parameters,
        //      these are independent parameters,
        //      to be varied by sliders
        //=================================================
        //curve //varied by pivots
        //      //pivot 'P' is attached to initial spped V,
        //      it is already in registry,

        //projection of speed to static tangent vector uu
        //at all points P used for differentiation,
        //body moves backward on x,
        toreg( 'vt' )( 'val', 1 );
        //=================================================
        // \\// model parameters,
        //=================================================


        stdMod.graphFW_lemma = stdMod.createsGraph_FW_lemma({ digramParentDom$:stdMod.legendRoot$ });

        ssD.saggitaDt = sconf.saggitaDt;

        stdMod.recreates_q2xy();
        stdMod.recreatesPosCorrector();
        stdMod.creates_poly2svg_for_lemma();
        rg.S.pos[0] = -sconf.ellipseFocus;
        rg.S.pos[1] = 0;
        stdMod.buildsOrbit();
        stdMod.builds_dq8agitta();

        //----------------------------------------------
        // //\\ sets parameters of P
        //----------------------------------------------
        var deltaQ = sconf.curveQRange / sconf.FORCE_ARRAY_LEN;
        rg.P.qix = Math.floor( sconf.parQ / deltaQ );
        rg.P.parQ = rg.P.qix * deltaQ;
        nspaste( rg.P.pos, stdMod.q2xy( rg.P.parQ ));
        var diff = ssD.qix2orb[ rg.P.qix ];
        //----------------------------------------------
        // \\// sets parameters of P
        //----------------------------------------------
        
        stdMod.completesSlidersCreation();

        //creates placeholder
        //toreg( 'curvatureCircle' );
        toreg( 'tangentCircle' );


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
        //stdMod.createsGraphFW( stdMod.legendRoot$ );
        //==================================================
        // \\// decoration graph 
        //==================================================

        //too early: overriden later by sconf.rgShapesVisible
        //rg[ 'S,nonSolvablePoint' ].undisplay = true;

        rg.allLettersAreHidden = true;
    }

}) ();

