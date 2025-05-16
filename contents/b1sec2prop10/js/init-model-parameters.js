( function() {
    var { ns, sn, $$, nspaste, nsmethods, nssvg, mcurve, integral, mat, fconf, ssF, 
        ssD, sData, stdMod, sconf, rg, toreg, } = window.b$l.apptree({ stdModExportList :
        { init_model_parameters, }, });
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
        rg.S.pos[0] = 0; //-sconf.ellipseFocus;
        rg.S.pos[1] = 0;

        stdMod.graphFW_lemma = stdMod.createsGraph_FW_lemma({
               digramParentDom$:stdMod.legendRoot$ });
        ssD.saggitaDt = sconf.saggitaDt;

        stdMod.recreates_q2xy();

        //order of these two lines  is significant
        stdMod.recreates_pos2q();
        stdMod.recreates_q8pos_2_q8pos8qix( sconf.orbit_q_start );
        stdMod.creates_poly2svg_for_lemma();
        stdMod.buildsOrbit();
        stdMod.builds_dq8sagitta();
        stdMod.builds_orbit_data_graph( sconf.force_law );

        //----------------------------------------------
        // //\\ sets parameters of P
        //----------------------------------------------
        var deltaQ = sconf.deltaQ;
        rg.P.qix = Math.floor( sconf.parQ / deltaQ );
        rg.P.parQ = rg.P.qix * deltaQ;
        nspaste( rg.P.pos, stdMod.q2xy( rg.P.parQ ));
        //----------------------------------------------
        // \\// sets parameters of P
        //----------------------------------------------

        stdMod.creates_Q8P_sliders();

        //creates placeholder
        toreg( 'tangentCircle' );

        rg.allLettersAreHidden = true;
    }

}) ();

