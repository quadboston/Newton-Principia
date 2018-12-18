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
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp'); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD); //todo should be child of ss

    var detected_user_interaction_effect_DONE = false;
    sDomF.detected_user_interaction_effect = detected_user_interaction_effect;

    fmethods.createLemmaDom = createLemmaDom;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000







    //=========================================================
    /// create LemmaDom
    //=========================================================
    function createLemmaDom()
    {
        sDomF.createMenu();
        sDomF.createExegesisTabs();

        //=====================================
        // //\\ arrived with lemma23-artist-GUI
        //=====================================
        var wwPaginatorButton$  = $$
           .c( 'a' )
           .a( 'class', 'page-btn desktop-link page-btn--right' )
           .a( 'href', 'javascript:void(0)' )
           .html('<img src="images/right-page-triangle.svg">') 
           .to( rootvm.approot )
           ;
        var wwPaginatorButton$  = $$
           .c( 'a' )
           .a( 'class', 'page-btn desktop-link page-btn--left' )
           .a( 'href', 'javascript:void(0)' )
           .html('<img src="images/left-page-triangle.svg">') 
           .to( rootvm.approot )
           ;
        //=====================================
        // \\// arrived with lemma23-artist-GUI
        //=====================================



        //--------------------------------------------------------
        // //\\ binds widget to containers
        //--------------------------------------------------------
        var medSuperroot$  = $$.c( 'div' )
            .a( 'id', cssp + '-media-superroot' )
            .addClass( cssp + '-media-superroot' )
            .to( rootvm.approot )
            ;
        var medSuperroot   = medSuperroot$();
        sDomN.medSuperroot$ = medSuperroot$;
        sDomN.medSuperroot  = medSuperroot;
        //--------------------------------------------------------
        // \\// binds widget to containers
        //--------------------------------------------------------
        sDomF.createTextWidget();
        fmethods.createDividorResizer();

        //--------------------------
        // //\\ in media superroot
        //--------------------------

        //--------------------------
        // //\\ top media controls
        //--------------------------
        var topMediaControls$ = sDomN.topMediaControls$ = $$.c( 'div' )
            .addClass( 'top-media-controls' )
            .to( medSuperroot )
            ;
        var wwHelpOnTop$ = $$.c( 'div' )
            .addClass( 'help-box' )
            .to( topMediaControls$() )
            ;
        sDomN.runVideoHelpButton$ = $$
            .c('img')
            .addClass( "video-help-button" )
            .css('width','35px')
            .a( 'src', "images/camera-lightbulb.png" )
            .a( 'alt', "Watch videohelp" )
            .a( 'title', "Watch videohelp" )
            /*
            .e('mouseover', function() {
                sDomN.helpBoxText$.innerHTML = 'Watch videohelp';
            })
            */
            .to( wwHelpOnTop$() )
            ;
        sDomN.idleHelpButton$ = $$
            .c('img')
            .addClass( "model-help" )
            .a( 'src', "images/lightbulb.svg" )
            .a( 'alt', "Hover over the diagram to interact" )
            //.a( 'title', "Hover over the diagram to interact" )
            .to( wwHelpOnTop$() )
            ;
        sDomN.helpBoxText$ = $$
            .c('span')
            .addClass( "help-box__text" )
            .html('Hover over the diagram to interact')
            .to( wwHelpOnTop$() )
            ;
        //--------------------------
        // \\// top media controls
        //--------------------------

        //..........................
        // //\\ media root
        //..........................
        var medRoot$ = $$
            .c( 'div' )
            .addClass( cssp + '-media-root' )
            .addClass( 'model' )
            .to( medSuperroot )
            ;
        var medRoot        = medRoot$();
        sDomN.medRoot$     = medRoot$;
        sDomN.medRoot      = medRoot;
        if( fconf.NAVIGATION_DECORATIONS_ALWAYS_VISIBLE ) {
            sDomN.medRoot$.addClass( 'active-tip' );
        }
        //..........................
        // \\// media root
        //..........................


        //..........................
        // //\\ video help
        //..........................
        // //\\ local video
        //. . . . . . . . . . . . . 
        sDomN.videoWrap$ = $$
            .c( 'div' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video-wrap' )
            //.to( sDomN.medRoot )
            .to( sDomN.text$() )
            ;
        sDomN.localVideo$ = $$
            .c( 'video' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video' )
            .a('muted','true')
            .a('controls','true')
            .a('preload','true')
            .to( sDomN.videoWrap$() )
            ;
        sDomN.localVideoSource$ = $$
            .c( 'source' )
            .a('type','video/mp4')
            .to( sDomN.localVideo$() )
            ;
        //. . . . . . . . . . . . . 
        // \\// local video
        //. . . . . . . . . . . . . 

        //..........................
        // //\\ iframed video
        //. . . . . . . . . . . . . 
        sDomN.iframedVideo$ = $$
            .c( 'iframe' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video-iframe' )
            .a('frameborder','0')
            .a('webkitallowfullscreen','true')
            .a('mozallowfullscreen','true')
            .a('allowfullscreen','true')
            //.to( sDomN.medRoot )
            .to( sDomN.videoWrap$() )
            ;
        //. . . . . . . . . . . . . 
        // \\// iframed video
        //..........................

        //..........................
        // //\\ close-video button
        //. . . . . . . . . . . . . 
        sDomN.doCloseVideoHelp$ = $$
            .c( 'div' )
            .a('title','close video')
            .css( 'display', 'none' )
            .addClass( cssp + '-close-html-button' )
            .html('X')
            //.to( sDomN.medRoot )
            .to(sDomN.videoWrap$())
            ;
        //..........................
        // \\// close-video button
        //. . . . . . . . . . . . . 
    
        fmethods.create_video_help_manager();
        //..........................
        // \\// video help
        //..........................


        ssF.create8prepopulate_svg();
        //.disabled ... effect is too strong
        //$$.$( sDomN.mmedia ).e( 'mouseover', sDomF.detected_user_interaction_effect );
        ssF.create_digital_legend();
        sDomN.mainLegends = document.querySelectorAll( '.main-legend' );
        if( fconf.ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED ) {
            sDomF.create_original_picture_vis_slider();
        }
        //--------------------------
        // \\// in media superroot
        //--------------------------
    }


    ///this makes one-time effect of fading-out the original picture
    function detected_user_interaction_effect()
    {
        if( detected_user_interaction_effect_DONE ) return;
        detected_user_interaction_effect_DONE = true;

        //todm: this is not very well thought:
        //      sapp.dnative && sapp.dnative.bgImage$
        sapp.dnative && sapp.dnative.bgImage$ && sapp.dnative.bgImage$.addClass( 'in-study' );
    }


}) ();

