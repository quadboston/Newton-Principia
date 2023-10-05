( function() {
    var {
        ns, $$, cssp, eachprop, has,
        sn, haff,
        fapp, fconf, sconf,
        fmethods,
        sDomF, sDomN,
        amode,
        studyModsActivated,
        ssF,
        rg,
        exegs, rgtools,
        studyMods,
        userOptions
    } = window.b$l.apptree({
    });


    fmethods.populate_mediaSuperRoot = populate_mediaSuperRoot;
    fmethods.cre__medRootDetails = cre__medRootDetails;
    var actuallyLoaded = 0;
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
            .addClass( 'top-media-controls highlight-text-disabled' )
            .to( sDomN.simSScene$ )
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

                        //------------------------------------------------
                        // //\\ do wrap into capture-method or refactor
                        //------------------------------------------------
                        var ast = { stdModName : stdMod.SUB_MODEL };
                        ///non-rg property: media center:
                        ///todm: legalize;
                        var mcenter = ns.haz( rg, 'media-mover' );
                        if( mcenter ) {
                            ns.paste( ast, { 'media-mover' :
                                                { achieved :  mcenter.achieved },
                                              subessay : amode.subessay,
                                           }
                            );
                        }
                        (
                            ns.haz( stdMod, 'captureAState' ) ||
                            ns.haz( ssF, 'captureAState' ) ||
                            ssF.captureAState_generic
                        )( ast );
                        //------------------------------------------------
                        // \\// do wrap into capture-method or refactor
                        //------------------------------------------------



                        fapp.captureWind.openWindow();
                        sDomN.captureButton$.html( 'close' );
                    } else {
                        fapp.captureWind.closeWindow();
                        sDomN.captureButton$.html( 'capture' );
                    }
                })
                ;
            //todm: simplify: this line has a side effect =
            //side effect = creates capturer functions
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


        ///video-help-button is not the bulb image of help box,
        ///video-help-button is about running movies,
        sDomN.videoListPopup_button_onModelPane$ = $$
            .c('img')
            .addClass( "video-help-button" )
            .css('width','35px')
            .a( 'src', fconf.engineImg + "/camera-lightbulb.png" )
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
            .addClass( "model-help" ) //todm ... non-elegant ... spread of CSS
            .a( 'src', fconf.engineImg + "/lightbulb.svg" )
            .a( 'alt', "Hover over the diagram to interact" )
            .to( wwHelpOnTop$() )
            ;
        if( ns.h( fconf.appDecor, 'idleHelpButtonTooltip' ) ){
            sDomN.idleHelpButton$.a( 'title', fconf.appDecor.idleHelpButtonTooltip );
        }

        sDomN.helpBoxText$ = $$
            .c('span')
            .addClass( "help-box__text" )
            .html( fconf.appDecor.helpButtonCaption)
            .to( wwHelpOnTop$() )
            ;
        //--------------------------
        // \\// top media controls
        //--------------------------



        //..........................
        // //\\ video help
        //..........................
        // //\\ local video
        //. . . . . . . . . . . . .
        sDomN.videoWrap$ = $$
            .c( 'div' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video-wrap' )
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
            .to(sDomN.videoWrap$())
            ;
        //..........................
        // \\// close-video button
        //. . . . . . . . . . . . .

        haff( fmethods, 'create_video_help_manager' );
        //..........................
        // \\// video help
        //..........................


    }



    function cre__medRootDetails( bgImagesAreLoaded_cb )
    {
        eachprop( studyMods, stdMod => {
            createsMediaRoot( stdMod, bgImagesAreLoaded_cb );
        });
    }


    function createsMediaRoot( stdMod, bgImagesAreLoaded_cb )
    {
        var stdModName  = stdMod.SUB_MODEL;
        //var medRoot     = stdMod.simScene;
        //var medRoot$    = stdMod.simScene$;


        //..............................
        // //\\ study image and submodel
        //..............................
        var images = {};
        //top mode CSS: bsl-approot theorion--claim aspect--hypertext
        var imgCss = 'bsl-bg-image';

        // //\\ hides all media before visualizing in relevant egreg-GUI
        var css = `
            .${cssp}-approot .${imgCss},
        `;
        // \\// hides all media before visualizing in relevant egreg-GUI

        //todo img load scenarios: remove timeout from load/resize ...
        ns.eachprop( exegs, ( theor, tkey ) => {
            ns.eachprop( theor, ( exAspect, akey ) => {
                exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                    ///============================================================
                    /// does images and CSS-visibility-machine for root of subexeg,
                    ///      meaningly: only for first subexeg,
                    ///============================================================
                    var headSubMod = subexeg.essayHeader.submodel;
                    var stdMod = studyMods[ headSubMod ];
                    var imgRk = stdMod.imgRk;
                    if( headSubMod !== stdModName ||
                        has( imgRk, 'src' ) //checks flag
                        //exegId !== 0
                    ) {
                        return;
                    }
                    imgRk.src = stdMod.imgRk.srcParsed;
                    var cssId = imgRk.cssId;

                    if( !imgRk.onloadStarted ) {
                        imgRk.onloadStarted = true;
                        imgRk.dom$().onload = function() {
                            if( studyModsActivated.length === ++actuallyLoaded ) {
                                ////assumes that each stdMod has bg. image to download
                                //setTimeout( bgImagesAreLoaded_cb, 1000 );
                                //without this call, app landing must crash:
                                bgImagesAreLoaded_cb();
                            }
                        };
                        imgRk.dom$
                            .cls( imgCss + ' ' + cssId )
                            .a( 'src', imgRk.src )
                            .a( 'draggable', 'false' )
                            .to( stdMod.simScene )
                            ;
                    }


                    //***************************************************************
                    // //\\ makes submodel visible in relevant egreg-GUI
                    //      the first css is for image,
                    //      the second is for svg,
                    //***************************************************************
                    var ww = `.${cssp}-approot.theorion--${tkey}.aspect--${akey}`;
                    css += `
                        ${ww} .${cssId} {
                            display :inline;
                        }
                    `;
                    //***************************************************************
                    // \\// makes submodel visible in relevant egreg-GUI
                    //***************************************************************
                });
            });
        });
        //todm: don't delay update ... bs makes code less readable
        //ns.globalCss.addText( css );
        ns.globalCss.update( css );
        //..............................
        // \\// study image and submodel
        //..............................

        //.disabled ... effect is too strong
        //std Mod.mmedia$.e( 'mouseover', sDomF.detected_user_interaction_effect );
    }

}) ();

