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

        var rgCurve = toreg( 'approximated-curve' )();
        //interval of t to construct an arc for
        //Newton's sagitta
        toreg( 'tForSagitta' )( 'val', sconf.tForSagitta0 );

        //sets and paints initial orbit
        //was:  stdMod.pointsArr_2_singleDividedDifferences();        
        stdMod.creates_orbitRack();
        rgCurve.q2ix = 1/(rgCurve.tEnd-rgCurve.tStart)*ssD.curveSTEPS;

        rg.P.q = stdMod.pos2t( rg.P.pos );
        stdMod.completesSlidersCreation();

        //creates placeholder
        toreg( 'curvatureCircle' );


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
        stdMod.graphFW_lemma = stdMod.createsGraph_FW_lemma({ 
            digramParentDom$:stdMod.legendRoot$ });
        //==================================================
        // \\// decoration graph 
        //==================================================

        //too early: overriden later by sconf.rgShapesVisible
        //rg[ 'S,nonSolvablePoint' ].undisplay = true;

        //-----------------------------------------
        // //\\ partially draggers and decoration
        //      are initiated here
        //      todm: not very consistent,
        //-----------------------------------------
        ssD.PdragInitiated = false;
        ssD.SdragInitiated = false;
        sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
            fp.rgX = rg[ 'foldPoints-' + ppix ];
            fp.rgX.undisplay = true;
        });
        //-----------------------------------------
        // \\// partially draggers and decoration
        //-----------------------------------------

        rg.allLettersAreHidden = true;
        //todo needed? why?
        stdMod.curveIsSolvable(); //to create "graph array"
    }
})();