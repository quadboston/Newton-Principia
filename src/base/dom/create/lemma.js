( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point');

    var sapp        = sn('sapp'); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD); //todm should be child of ss
    var wrkwin      = sn('wrkwin',ssD); //work window

    var detected_user_interaction_effect_DONE = false;
    rg.detected_user_interaction_effect_DONE = false;
    sDomF.detected_user_interaction_effect = detected_user_interaction_effect;

    fmethods.lemmaDom___ess8med8leg_roots_8_menuPH_8_dividor_8_medSRoot =
             lemmaDom___ess8med8leg_roots_8_menuPH_8_dividor_8_medSRoot;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000







    //=========================================================
    /// create LemmaDom
    //=========================================================
    function lemmaDom___ess8med8leg_roots_8_menuPH_8_dividor_8_medSRoot( bgImagesAreLoaded_cb )
    {
        //==============================================================
        // //\\ essay and media panes
        //==============================================================
        for( wx=0; wx<2; wx++ ) {
            if( ( wx===0 && fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) ||
                ( wx===1 && !fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) ) {
                // //\\ creates essaion pane
                //      "essaion superroot"
                var w = cssp+'-text-widget';
                var wCls = w;
                if( fconf.attach_menu_to_essaion_root ) {
                    wCls += ' leftside-menuholder';
                }
                sDomN.essaionsRoot$ = $$.dict( w, wCls, fapp.fappRoot$ );
                // \\// creates essaion pane
            } else {
                //: creates media superroot
                var wCSS = cssp + '-media-superroot';
                var medSuperroot$ = sDomN.medSuperroot$ = $$.dict(
                    wCSS,
                    wCSS,
                    fapp.fappRoot$ );
            }
        }
        //==============================================================
        // \\// essay and media panes
        //==============================================================



        //==============================================================
        // //\\ model data legend
        //==============================================================
        sDomN.legendRoot$ = $$.dct( cssp + '-legend-root',
                                    fapp.fappRoot$ );
        //==============================================================
        // \\// model data legend
        //==============================================================

        sDomF.build_menu_top_leafs_placeholders();
        wrkwin.createDividorResizer();
        fmethods.populate_mediaSuperRoot( bgImagesAreLoaded_cb );
    }



    //===================================================================
    // //\\ this makes one-time effect of fading-out the original picture
    //===================================================================
    function detected_user_interaction_effect( doUndetected )
    {
        //todm: this is good "if" because prevents extra CSS work
        //      but because of poor design, it fails to do CSS work
        //      when this function is called too early before bgImage is
        //      created;
        //if( detected_user_interaction_effect_DONE ) return;
        detected_user_interaction_effect_DONE = !doUndetected;
        rg.detected_user_interaction_effect_DONE = !doUndetected;

        if( !doUndetected ) {
            //todm: this is not very well thought:
            //      sapp.dnative && sapp.dnative.bgImage$
            //todm: images apparently do not exist and first upcreate_model:
            ns.h( sDomN, 'bgImage$' ) && sDomN.bgImage$.addClass( 'in-study' );

        } else {
            ns.h( sDomN, 'bgImage$' ) && sDomN.bgImage$.removeClass( 'in-study' );
        }
    }
    //===================================================================
    // \\// this makes one-time effect of fading-out the original picture
    //===================================================================


}) ();

