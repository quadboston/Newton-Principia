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
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var bgImages    = sn('bgImages', ssD);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);
    var rgtools     = sn('tools',ssD);
    var exegs       = sn('exegs', ssD);



    fmethods.populate_mediaSuperRoot = populate_mediaSuperRoot;
    return;








    //=========================================================
    /// create LemmaDom
    //=========================================================
    function populate_mediaSuperRoot( bgImagesAreLoaded_cb )
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



        //..........................
        // //\\ change-tools button
        //..........................
        if( sconf.enableTools ) {
            $$
                .c( 'div' )
                .addClass( 'change-tools-button' )
                .html( "tools" )
                .to( topMediaControls$() )
                //.css( 'display', 'block' )
                .e( 'click', () => {
                    rgtools.value = rgtools.value === 'on' ? 'off' : 'on';
                    if( rgtools.value === 'on' ) {
                        fapp.fappRoot$.addClass( 'rgtools' );
                    } else {
                        fapp.fappRoot$.removeClass( 'rgtools' );
                    }
                    var wwsm = ns.haf( studyMods[ amode['submodel'] ],
                                       'model8media_upcreate' );
                    if( wwsm ) {
                        wwsm();
                    } else {
                        ns.haf( ssF, 'model8media_upcreate' )();
                    }
                })
                ;
                rgtools.value = 'off'
                fapp.fappRoot$.removeClass( 'rgtools' );
        }
        //..........................
        // \\// change-tools button
        //..........................

        //..........................
        // //\\ change model data button
        //..........................
        if( sconf.enableDataFunctionsRepository ) {
            $$
                .c( 'div' )
                .addClass( 'change-model-data-button' )
                .html( "data options" )
                .to( topMediaControls$() )
                //.css( 'display', 'block' )
                .e( 'click', () => {
                    ns.haf( studyMods[ amode['submodel'] ], 'toggleData' )();
                })
                ;
        }
        //..........................
        // \\// change model data button
        //..........................

        //..........................
        // //\\ sets capture button
        //..........................
        if( sconf.enableCapture ) {
            sDomN.captureButton$ = $$
                .c( 'div' )
                .addClass( 'capture-button' )
                .html( "capture" )
                .to( topMediaControls$() )
                //.css( 'display', 'block' )
                .e( 'click', () => {
                    if( sDomN.captureButton$._html().indexOf( 'capture' ) > -1 ) {
                        var stdMod = ns.haz( studyMods, amode.submodel );
                        if( ns.h( stdMod, 'captureAState' ) ) {
                            ns.haf( stdMod, 'captureAState' )();
                        } else {
                            ////remove this later
                            ns.haf( ssF, 'captureAState' )();
                        }
                        fapp.captureWind.openWindow();
                        sDomN.captureButton$.html( 'close' );
                    } else {
                        fapp.captureWind.closeWindow();
                        sDomN.captureButton$.html( 'capture' );
                    }
                })
                ;
            sDomF.createsCaptureWindow();
        }
        //..........................
        // \\// sets capture button
        //..........................

        //..........................
        // //\\ sets studylab button
        //..........................
        if( sconf.enableStudylab ) {
            sDomN.enableStudylab$ = $$
                .c( 'div' )
                .addClass( 'studylab-button' )
                .a( 'title', 'tools and theory to study and experiment' )
                .html( "lab" )
                .to( topMediaControls$() )
                .css( 'display', 'block' )
                .e( 'click', () => {
                    if( sDomN.enableStudylab$._html().indexOf( 'close lab' ) === -1 ) {
                        sDomN.enableStudylab$.html( 'close lab' );
                        fapp.fappRoot$.addClass( 'studylab' );
                    } else {
                        fapp.fappRoot$.removeClass( 'studylab' )
                        sDomN.enableStudylab$.html( 'lab' );
                    }
                })
                ;
        }
        //..........................
        // \\// sets studylab button
        //..........................



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
        // //\\ change mode button
        //..........................
        sDomN.changeModeButton$ = $$
            .c( 'div' )
            .addClass( cssp + '-change-mode-button' )
            .html( "Submit" )
            .to( sDomN.medRoot )
            .css( 'display', 'none' ) //todo
            .e( 'click', () => {
                alert( 'this feature is in progress ... ' );
                //rg.mode.value = rg.mode.value === 'solving' ? 'showing' : 'solving';
                //ns.haf( ssF, 'model8media_upcreate' )();
            })
            ;
        //..........................
        // \\// change mode button
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

        // //\\ hides all media before visualizing in relevant egreg-GUI
        var css = `
            .${cssp}-approot .${imgCss},
            .${cssp}-approot .${cssp}-media {
                display:none;
            }
        `;
        // \\// hides all media before visualizing in relevant egreg-GUI

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
                            //setTimeout( bgImagesAreLoaded_cb, 1000 );
                            bgImagesAreLoaded_cb();
                        }
                    };
                    imgRk.dom$
                        .a( 'src', imgRk.src )
                        .to( sDomN.medRoot )
                        ;

                    imgRk.filler$ = $$.img()
                        .addClass( imgCss + '-toolsliders-extender' )
                        .css( 'width', '100%' )
                        .css( 'height', sconf.SLIDERS_LEGEND_HEIGHT + 'px' )
                        .css( 'visibility', 'hidden' )
                        .css( 'display', sconf.SLIDERS_LEGEND_HEIGHT === 0 ?
                                         'none' : 'inline' )
                        .a( 'src', imgRk.src )
                        .to( sDomN.medRoot )
                        ;
                }
                imgRk.dom$.cls( imgCss + ' ' + cssId );

                // //\\ makes submodel visible in relevant egreg-GUI
                var ww = `.${cssp}-approot.theorion--${tkey}.aspect--${akey}`;
                css += `
                    ${ww} .${cssId} {
                        display :inline;
                    }
                    ${ww}
                    .${cssp}-media.submodel-${aspect.essayHeader.submodel} {
                        display:block;
                    }
                `;
                // \\// makes submodel visible in relevant egreg-GUI
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

        //todm: poor design: legend is lemma-wise but some legens are lemma-submodel-wise:
        ssF.create_digital_legend && ssF.create_digital_legend();

        ///abandoned code
        ///this should be moved into lab/tools/sliders
        if( fconf.ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED ) {
            sDomF.create_original_picture_vis_slider();
        }
    }

}) ();

