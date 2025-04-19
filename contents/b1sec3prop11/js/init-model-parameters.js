( function() {
    var {
        ns, sn, $$, nsmethods, nssvg, mcurve, integral, mat,
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

        toreg( 'approximated-curve' );
        toreg( 'sForSagitta' ),
  //sconf.sForSagitta_valT
        stdMod.creates_orbitRack();
        stdMod.buildsforceGraphArray();
        var parP = sconf.PparT;
        var deltaQ = sconf.curveQRange / sconf.curveQRange*sconf.FORCE_ARRAY_LEN;
        var qixP = Math.floor( parP / deltaQ );
        var diff = ssD.qix2orb[ qixP ];
        rg.sForSagitta.val = (diff.pulsQ - qixP*deltaQ + sconf.curveQRange)
                             % sconf.curveQRange;
        ccc( rg.sForSagitta.val );

        //var t =  stdMod.pos2t( rt.P.pos );
        //var newP = rg[ 'approximated-curve' ].t2xy( t );

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
        stdMod.createsGraphFW( stdMod.legendRoot$ );
        //==================================================
        // \\// decoration graph 
        //==================================================

        //too early: overriden later by sconf.rgShapesVisible
        //rg[ 'S,nonSolvablePoint' ].undisplay = true;

        rg.allLettersAreHidden = true;
    }

}) ();

