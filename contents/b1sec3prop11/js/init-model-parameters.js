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

        toreg( 'q2pos' );
        toreg( 'sForSagitta' ),

        stdMod.creates_orbitRack();
        ssD.sForSagitta_valT = sconf.sForSagitta_valT;
        stdMod.buildsforceGraphArray();

        var deltaQ = sconf.curveQRange / sconf.FORCE_ARRAY_LEN;
        rg.P.qix = Math.floor( sconf.parQ / deltaQ );
        rg.P.parQ = rg.P.qix * deltaQ;
        nspaste( rg.P.pos, rg.q2pos.t2xy( rg.P.parQ ));
        var diff = ssD.qix2orb[ rg.P.qix ];
        rg.sForSagitta.val = diff.sagittaDq;
        ccc( 'init, sag_dq=' + rg.sForSagitta.val +
             ' P.qix=' + rg.P.qix +
             ' P.parQ=' + rg.P.parQ );

        //var t =  stdMod.pos2t( rt.P.pos );
        //var newP = rg.q2pos.t2xy( t );

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

