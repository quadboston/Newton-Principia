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

        var rgCurve = toreg( 'approxer' )();
        //interval of t to construct an arc for
        //Newton's sagitta
        toreg( 'tForSagitta' )( 'val', sconf.tForSagitta0 );

        //sets and paints initial orbit
        //was:  stdMod.Pivots_2_divdifFW();
        stdMod.creates_orbitRack();
        rgCurve.q2ix = 1/(rgCurve.tEnd-rgCurve.tStart)*ssD.curveSTEPS;

        rg.P.q = stdMod.pos2t( rg.P.pos );
        stdMod.completesSlidersCreation();

        //creates placeholder
        toreg( 'curvatureCircle' );

        stdMod.graphFW_lemma = stdMod.wraps_graph_fw({
            digramParentDom$:stdMod.legendRoot$ });

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