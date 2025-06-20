( function() {
    var {
        ns, $$, cssp, eachprop, has,
        sn, haff,
        fapp, fconf, sconf,
        fmethods,
        sDomF, sDomN,
        amode,
        ssF,
        stdMod, rg,
        exegs, rgtools,
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
                    var wwsm = ns.haf( stdMod, 'model8media_upcreate' );
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
                    ns.haf( stdMod, 'toggleData' )();
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
                        //------------------------------------------------
                        // //\\ do wrap into capture-method or refactor
                        //------------------------------------------------
                        var ast = {};
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
    }



    function cre__medRootDetails( bgImagesAreLoaded_cb )
    {
        createsMediaRoot( bgImagesAreLoaded_cb );
    }


    function createsMediaRoot( bgImagesAreLoaded_cb )
    {
        //..............................
        // //\\ study image and submodel
        //..............................
        var images = {};
        //top mode CSS: bsl-approot logic_phase--claim aspect--video
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
                    var imgRk = stdMod.imgRk;
                    if( has( imgRk, 'src' ) ) return;
                    imgRk.src = stdMod.imgRk.srcParsed;
                    var cssId = imgRk.cssId;

                    if( !imgRk.onloadStarted ) {
                        imgRk.onloadStarted = true;
                        imgRk.dom$().onload = function() {
                            if( 1 === ++actuallyLoaded ) {
                                ////assumes that stdMod has bg. image to download
                                //setTimeout( bgImagesAreLoaded_cb, 1000 );
                                //without this call, app landing must crash:
                                bgImagesAreLoaded_cb();
                            }
                        };
                        imgRk.dom$
                            .cls( imgCss + ' ' + cssId )
                            .a( 'draggable', 'false' )
                            .to( stdMod.simScene )
                            .a( 'src', imgRk.src )
                            ;
                    }


                    //***************************************************************
                    // //\\ makes s ubmodel visible in relevant egreg-GUI
                    //      the first css is for image,
                    //      the second is for svg,
                    //***************************************************************
                    var ww = `.${cssp}-approot.logic_phase--${tkey}.aspect--${akey}`;
                    css += `
                        ${ww} .${cssId} {
                            display :inline;
                        }
                    `;
                    //***************************************************************
                    // \\// makes s ubmodel visible in relevant egreg-GUI
                    //***************************************************************
                });
            });
        });
        //todm: don't delay update ... bs makes code less readable
        //ns.globalCss.addText( css );
        ns.globalCss.update( css );
        //..............................
        // \\// study image and s ubmodel
        //..............................

        //.disabled ... effect is too strong
        //std Mod.mmedia$.e( 'mouseover', sDomF.detected_user_interaction_effect );
    }

}) ();

