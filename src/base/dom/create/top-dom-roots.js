( function() {
    var {
        $$, fmethods, cssp,
        fapp, fconf, wrkwin, sDomN, sDomF,
        amode, studyMods, rg,
    } = window.b$l.apptree({
    });

    sDomF.detected_user_interaction_effect = detected_user_interaction_effect;
    sDomF.creates_mainWorkspace_domRoots = creates_mainWorkspace_domRoots;
    return;







    function creates_mainWorkspace_domRoots()
    {
        //==============================================================
        // //\\ essay and media panes
        //==============================================================
        for( wx=0; wx<2; wx++ ) {
            if( ( wx===0 && fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) ||
                ( wx===1 && !fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) ) {
                // //\\ creates essaion pane
                //      "essaion superroot"
                var wCls = 'bsl-text-widget';
                if( fconf.attach_menu_to_essaion_root ) {
                    wCls += ' leftside-menuholder';
                }
                sDomN.essaionsRoot$ = $$.div()
                    .cls( wCls )
                    .to( fapp.fappRoot$ )
                    ;
                // \\// creates essaion pane
            } else {
                //: creates media superroot
                sDomN.simSScene$ = $$.div()
                    .cls( 'bsl-sim-superscene' )
                    .to(fapp.fappRoot$)
                    ;
            }
        }
        //==============================================================
        // \\// essay and media panes
        //==============================================================

        sDomF.build_menu_top_leafs_placeholders();
        wrkwin.createDividorResizer();
    }


    //===================================================================
    // //\\ this makes effect of fading-out
    //      the original picture
    //===================================================================
    function detected_user_interaction_effect( doShowDiagram )
    {
        doesShowDiagram( doShowDiagram );
        if( fconf.timeToShowOriginalDiagram > 0 && doShowDiagram ) {
            setTimeout(
                () => {
                    doesShowDiagram( false ),
                    studyMods[ amode.submodel ].media_upcreate();
                },
                fconf.timeToShowOriginalDiagram
            );
        }
    }
    function doesShowDiagram( doShowDiagram ) { 
        rg.detected_user_interaction_effect_DONE = !doShowDiagram;
        studyMods[ amode.submodel ].imgRk.dom$
           [ doShowDiagram ? 'removeClass' : 'addClass' ]( 'in-study' );
        rg.allLettersAreHidden = doShowDiagram;
    }
    //===================================================================
    // \\// this makes effect of fading-out
    //===================================================================


}) ();

