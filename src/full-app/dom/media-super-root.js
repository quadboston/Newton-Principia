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
    var bgImages    = sn('bgImages', ssD);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);
    var exegs    = sn('exegs', ssD);



    fmethods.populate_mediaSupreRoot = populate_mediaSupreRoot;
    return;








    //=========================================================
    /// create LemmaDom
    //=========================================================
    function populate_mediaSupreRoot( bgImagesAreLoaded )
    {

        //--------------------------
        // //\\ top media controls
        //--------------------------
        var topMediaControls$ = sDomN.topMediaControls$ = $$.c( 'div' )
            .addClass( 'top-media-controls' )
            .to( sDomN.medSuperroot$ )
            ;
        var wwHelpOnTop$ = sDomN.helpBoxAboveMedia$ = $$.c( 'div' )
            .addClass( 'help-box' )
            .to( topMediaControls$() )
            ;
        sDomN.videoListPopup_button_onModelPane$ = $$
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
            .to( sDomN.medSuperroot$ )
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
            .to( sDomN.essaionsRoot$() )
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

        //..............................
        // //\\ study image and submodel
        //..............................
        var images = {};
        //top mode CSS: bsl-approot theorion--claim aspect--hypertext
        var imgCss = cssp +'-bg-image';
        var css = `
            .${cssp}-approot .${imgCss},
            .${cssp}-approot .${cssp}-media {
                display:none;
            }
        `;

        //todo img load scenarios: remove timeout from load/resize ...
        var actuallyLoaded = 0;
        ns.eachprop( exegs, ( theor, tkey ) => {
            ns.eachprop( theor, ( aspect, akey ) => {
                var imgRk = aspect.imgRk;
                var cssId = imgRk.cssId;

                if( !ns.h( imgRk, 'dom$' ) ) {
                    imgRk.dom$ = $$
                        .img()
                        ;
                    imgRk.dom$().onload = function() {
                        if( bgImages.bgImgCount === ++actuallyLoaded ) {
                            //setTimeout( bgImagesAreLoaded, 1000 );
                            bgImagesAreLoaded();
                        }
                    };
                    imgRk.dom$
                        .a( 'src', imgRk.src )
                        .to( sDomN.medRoot )
                        ;
                }
                imgRk.dom$.cls( imgCss + ' ' + cssId )
                css += `
                    .${cssp}-approot.theorion--${tkey}.aspect--${akey} .${cssId} {
                        display :inline;
                    }
                `;

                ///submodel
                if( aspect.essayHeader.submodel ) {
                    css += `
                        .${cssp}-approot.theorion--${tkey}.aspect--${akey}
                        .${cssp}-media.submodel-${aspect.essayHeader.submodel} {
                            display:block;
                        }
                    `;
                }
            });
        });
        ns.globalCss.addText( css );
        //..............................
        // \\// study image and submodel
        //..............................

        sDomF.create8prepopulate_svg();
        //.patches l2
        ssF.continue_create_8_prepopulate_svg && ssF.continue_create_8_prepopulate_svg();

        //.disabled ... effect is too strong
        //stdMod.mmedia$.e( 'mouseover', sDomF.detected_user_interaction_effect );
        ssF.create_digital_legend && ssF.create_digital_legend();
        sDomN.mainLegends = document.querySelectorAll( '.main-legend' );
        if( fconf.ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED ) {
            sDomF.create_original_picture_vis_slider();
        }
    }

}) ();

