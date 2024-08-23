( function() {
    var {
        ns, $$, sn, nsmethods, has, haz, nspaste, eachprop,
        fapp, fconf, sconf, ssD, sapp, sDomF, sDomN, capture, rg,
        topics, studyModsActivated, fixedColors, references, exegs,
        studyMods, amode, userOptions
    } = window.b$l.apptree({
        ssFExportList :
        {
            LANDING_V___loads_professorList8cont_8_buildsSubexegs,
        },
    });
    sDomF.getFixedColor = getFixedColor;
    var dataFiles = sn( 'dataFiles', ssD, [] );
    var dataFiles_id2content = sn( 'dataFiles_id2content', ssD );
    return;








    ///==========================================
    /// creates html for text pane
    /// loads_scenarioList8refs8conf8contents__8__builds_exegs8subexegs
    ///==========================================
    function LANDING_V___loads_professorList8cont_8_buildsSubexegs(
        prepare8do_LANDING_VI_and_beyond___cb
    ){
        var allEssays__str = "";
        var lemmaConfig = fconf.sappId2lemmaDef[ fconf.sappId ];
        contentsList_2_essaions_2_exegs( lemmaConfig );
        return;

        ///This ajax-load takes contents-files, concatenates them, and calls
        ///final subroutine, subessays2subexegs_8_doProcessSubexegs.
        function contentsList_2_essaions_2_exegs( lemmaConfig )
        {
            var lemma_bookfiles_list = lemmaConfig[ 'contents-list' ];
            //=========================================================
            // //\\ ajax load
            //=========================================================
                // //\\  making the list
                //------------------------------------
                var lbf_forAjax = [];

                ///does two things: sets responseType and
                ///                 later on extracts "data-id"=match[1]
                var matchRe = /^data\/([^\.]+)./;
                var res_matchRe = /\/resources\/([^\/]+)$/;  // ends with /resources/<file-name>
                lemma_bookfiles_list.forEach( function( listItem ) {
                    if( !listItem.match( /^\s*$/ ) ) {
                        var match = listItem.match( matchRe );
                        var responseType = match ? 'arraybuffer' : 'text';
                        lbf_forAjax.push({
                              id: listItem,
                              responseType,
                              link : fconf.pathToContentSite + '/contents/' +
                                     fconf.sappId + '/' + listItem
                        });
                    }
                });
                //------------------------------------
                // \\//  making the list
                //------------------------------------

                //------------------------------------
                // //\\  making the load
                //------------------------------------
                nsmethods.loadAjaxFiles( lbf_forAjax, function( loadedFilesById_II ) {
                        lbf_forAjax.forEach( function( listItem ) {

                            //do collect resources somewhere elese, like for PIXI plugin ...
                            if( listItem.id.match( res_matchRe ) ) return;
                            //patch
                            //todm ... does double job, load resources only once ...

                            var match = listItem.id.match( matchRe );
                            if( match ) {
                                dataFiles.push( loadedFilesById_II[ listItem.id ] );
                                dataFiles_id2content[ match[1] ] =
                                    loadedFilesById_II[ listItem.id ];
                            } else {
                                allEssays__str += loadedFilesById_II[ listItem.id ].text;
                            }
                        });
                        subessays2subexegs_8_doProcessSubexegs( lemmaConfig );
                    }
                );
                //------------------------------------
                // \\//  making the load
            //=========================================================
            // \\// ajax load
            //=========================================================
        }



        //====================================================
        // //\\ on content Files Load Success
        //====================================================
        function subessays2subexegs_8_doProcessSubexegs( lemmaConfig )
        {
            references.text =
                haz( fconf.sappId2lemmaDef[ fconf.sappId ], 'referencesForAllLemmaEssays' );
            var SUBESSAYS_DIVIDOR = /\*::\*/g;
            var subessays = allEssays__str.split( SUBESSAYS_DIVIDOR );

            //=========================================================
            // //\\ splits text to subessays
            //      and prebuilds esssay-placeholders and indexes them
            //=========================================================
            subessays.forEach( function( singleSubessay ) {

                //removes subessays which are empty text
                if( singleSubessay.replace( /(\s|\n\r)*/g, '').length === 0 ) return;

                //--------------------------------------
                // //\\ splits the singleSubessay ...
                //--------------------------------------
                //      singleSubessay = proof|english precontent
                //             precontent = \nJSON*..*\n content
                //             JSON in singleSubessay is optional
                //
                //      below: ess_instructions[1] = theorion_id: claim, proof,
                //                                            theorems, neutral, ...
                //             ess_instructions[2] = aspect_id: english,... latin, ...
                //             ess_instructions[3] = precontent
                //https://stackoverflow.com/questions/2429146/
                //      javascript-regular-expression-single-space-character
                var ess_instructions =
                        singleSubessay.match( /^([^\|]*)\|([^\s]*)\s*\n([\s\S]*)$/);

                //ess_instructions[3] is text itself
                if( ess_instructions && ess_instructions[3] ) {
                    var theorion_id = ess_instructions[1];
                    var aspect_id   = ess_instructions[2];
                    var precontent  = ess_instructions[3];

                    if (!aspectTurnedOn(aspect_id)) {
                        return;
                    }
                    var wIx         = precontent.indexOf("*..*");
                    if( wIx > -1 ) {
                        var wHeader = precontent.substring(0, wIx-1);
                        var bodyscript = precontent.substring( wIx+4 );
                    } else {
                        var bodyscript  = ess_instructions[3];
                    }

                    //converts essayion's-header-script to header-js-object,
                    //will be attached to essay-section only at the very end of this loop,
                    //assumes if wHeader exists, it must be valid JSON,
                    var essayHeader = wHeader ? JSON.parse( wHeader ) : {};

                    //---------------------------------------------------------------
                    // //\\ validates submodel
                    essayHeader.submodel = haz( essayHeader, 'submodel' ) ||
                        ssD.DEFAULT_STUDY_MODEL_NAME;
                    if( !has( studyMods, essayHeader.submodel ) ) {
                        alert( 'Wrong submodel "' + essayHeader.submodel +
                               '" prescipted in essay ' + theorion_id + '/' + aspect_id +
                               " This submodel does not exist in lemma`s modules."
                        );
                        //todm ... why this return crashes app? ...
                        //         this return just skips bad essay,
                        return;
                    }
                    // \\// validates submodel
                    //---------------------------------------------------------------

                    //===============================================================
                    // //\\ sets initial amode
                    //===============================================================
                    //.todm: patch: missed submodel property does default to 'common'
                    //              empty string denotes absence of submodel

                    // already done ... code prolifiration
                    //essayHeader.submodel = has( essayHeader, 'submodel' ) ?
                    //                       essayHeader.submodel :
                    //                       'common';

                    sn( theorion_id, exegs );
                    var aspExeg     = sn( aspect_id, exegs[ theorion_id ] );

                    //group of "objectivied"-subessays === group of subexegs,
                    //subexeg is to be further structured,
                    var subexegs    = sn( 'subexegs', aspExeg, [] );

                    var subexegsIx  = subexegs.length;

                    //..................................................
                    //normalizes subessay id:
                    sn( 'subessay', essayHeader, subexegsIx + '' );
                    //todom migrate app to this improvement:
                    //essayHeader.subessayId = essayHeader.subessay;
                    //..................................................

                    //----------------------------------------------------------------
                    // //\\ sets sapp.amodel_initial
                    //      to "default" or to the first essay if no "default"
                    //----------------------------------------------------------------
                    if( haz( essayHeader, "default" ) === "1" ||
                        !haz( sapp, 'amodel_initial' )
                    ) {
                        var ami = haz( sapp, 'amodel_initial' );
                        if( !ami ) {
                            var ami = sn( 'amodel_initial', sapp, {
                                posOverriden : false
                            });
                            var theorionId  = haz( fconf, 'theorionId' );
                            var aspectId    = haz( fconf, 'aspectId' );
                            if( theorionId && aspectId ) {
                                var subessayId  = haz( fconf, 'subessayId' );
                                if( !subessayId ) {
                                    ////default subessayId is set to 0,
                                    ////to enable missed subessayId in URL-query-config
                                    subessayId = '0';
                                }
                                ami.theorion = theorionId;
                                ami.aspect = aspectId;
                                ami.subessay = subessayId;
                                ami.posOverriden = {
                                    theorion : theorionId,
                                    aspect : aspectId,
                                    subessay : subessayId,
                                };
                            }
                        }

                        if( !ami.posOverriden ) {
                            ami.theorion = theorion_id;
                            ami.aspect = aspect_id;
                            ami.subessay = essayHeader.subessay;
                            //sets 'default' for case it will be missed in all text
                            essayHeader[ 'default' ] = '1';
                        }
                        ami.submodel = essayHeader.submodel;
                        //**********************************
                        //at least from now, amode is set
                        //**********************************
                        Object.assign( amode, ami );
                    }

                    var ao = sapp.amodel_initial.posOverriden;
                    if( ao ) {
                        ///these conditions preserve legacy structure of
                        ///essayHeader in case if default are supplied from URLquery
                        if(
                            theorion_id          !== ao.theorion ||
                            aspect_id            !== ao.aspect ||
                            essayHeader.subessay !== ao.subessay
                        ){
                            essayHeader[ 'default' ] = '0';
                        } else {
                            essayHeader[ 'default' ] = '1';
                        }
                    }
                    //----------------------------------------------------------------
                    // \\// sets sapp.amodel_initial
                    //===============================================================
                    // \\// sets initial amode
                    //===============================================================


                    //---------------------------------------------------------------
                    // //\\ adds topic-categories from
                    //---------------------------------------------------------------
                    //      essayHeader, 'fixed-colors' to fixedColors
                    //      for entire lemma
                    var wwfc = haz( essayHeader, 'fixed-colors' );
                    if( wwfc ) {
                        Object.keys( wwfc ).forEach( topicKey => {
                            var tk = nsmethods.topicIdUpperCase_2_underscore( topicKey );
                            fixedColors[ tk ] = wwfc[ topicKey ];
                        });
                    }
                    //---------------------------------------------------------------
                    // \\// adds topic-categories from
                    //---------------------------------------------------------------

                    //---------------------------------------------------------
                    // //\\ captured states
                    //      we are ready to take body of text ...
                    //      but, before this, we extract captured states
                    //---------------------------------------------------------
                    var CAPTURE_POSITION_INDICATOR = '*:::*:::*';
                    var capturePos = bodyscript.indexOf( CAPTURE_POSITION_INDICATOR );
                    if( capturePos > -1 ) {
                        ////captures do exist ... split them from text
                        var captureTxt = bodyscript.substring(
                            capturePos + CAPTURE_POSITION_INDICATOR.length );
                        bodyscript = bodyscript.substring( 0, capturePos );
                        nspaste( capture, JSON.parse( captureTxt ) );
                    }
                    //---------------------------------------------------------
                    // //\\ digesting app-mode to lemma conditions
                    //---------------------------------------------------------
                    var wwCond = haz( capture, "__amode2rgstate" );
                    if( wwCond ) {
                        ssD.__amode2rgstate = wwCond;
                        delete capture.__amode2rgstate;
                    } else {
                        sn( '__amode2rgstate', ssD, [] );
                    }
                    //---------------------------------------------------------
                    // \\// digesting app-mode to lemma conditions
                    // \\// captured states
                    //---------------------------------------------------------

                    //---------------------------------------------------------
                    // //\\ does index bodyscript and essayHeader
                    //---------------------------------------------------------
                    var subexeg =
                    {
                        bodyscript,
                        essayHeader,
                        //subexegsIx,
                    };
                    var subessay2subexeg = sn( 'subessay2subexeg', aspExeg );

                    subessay2subexeg[ essayHeader.subessay ] = subexeg;

                    //good patch ... should be legalized
                    var subessayName2subexegIx = sn( 'subessayName2subexegIx', aspExeg );
                    subessayName2subexegIx[ essayHeader.subessay ] = subexegsIx;

                    subexegs.push( subexeg );
                    //---------------------------------------------------------
                    // \\// does index bodyscript and essayHeader
                    //---------------------------------------------------------
                }
                //--------------------------------------
                // \\// splits the singleSubessay ...
                //--------------------------------------
            });
            //=========================================================
            // \\// splits text to subessays
            //=========================================================




            //===========================================================
            /// collect BgImg, set Menu, dec Point_parentClasses
            ///     continues to spawn exegs after all exegs placeholders
            ///     have been established from parser
            //===========================================================
            sconf.asp8theor_menus = {};

            eachprop( exegs, ( exAspects, theorion_id ) => {
                eachprop( exAspects, ( exAspect, aspect_id ) => {
                    exAspect.subexegs.forEach( ( subex, subexId ) => {
                        var essayHeader = subex.essayHeader;
                        doesAddStudyModelIfNew( essayHeader, subex );

                        ///we need menu and classes only once per theor-aspect pair
                        if( subexId === 0 ) {

                            //.not elegant: should be in "theorion" loop, not in child loop,
                            setMenu( theorion_id, 'theorion', essayHeader );

                            setMenu( aspect_id, 'aspect', essayHeader );
                            //******************************************************************
                            // //\\ collects decPoint_parentClasses for d8dp.createFramework
                            //      media-drag-decoration-enabled-aspect
                            //      todm: looks like useless artifact.
                            //******************************************************************
                            //      currently unlocks all aspects in content for
                            //                        ===========
                            //      being able to have dragged points and other
                            //      elements in model,
                            //
                            //      apparent side effect is increasing a specifity for
                            //      some CSS in "decorator.css.js"
                            //
                            //used in: d8dp.createFramework({
                            //         decPoint_parentClasses : fconf.dragPointDecoratorClasses,
                            var wDecArr = sn( 'dragPointDecoratorClasses', fconf, [] );

                            var wDecorAspect = 'aspect--' + aspect_id;
                            if( wDecArr.indexOf( wDecorAspect ) < 0 ) {
                                wDecArr.push( wDecorAspect );
                            }
                            //******************************************************************
                            // \\// collects decPoint_parentClasses for d8dp.createFramework
                            //******************************************************************
                        }

                        ///scans all subessays ( not only subessay-0 ),
                        ///finds default, and places this
                        ///subessay into subessay's-parent default
                        ///
                        ///for some reason, essay-section memorizes parent-header if
                        ///parent is an effective default
                        ///remembers default for easy access
                        if( haz( essayHeader, "default" ) === '1' ){
                            //this is an alternative "if" which must work too
                            //if(
                            //    sapp.amodel_initial.theorion === theorion_id &&
                            //    sapp.amodel_initial.aspect === aspect_id
                            //){
                            //todm ... name "default" is very unlucky, do change it ...
                            exAspect[ "default" ] = subex;
                        }
                    });
                });
            });


            //-----------
            //this function prepare8do_LANDING_VI_and_beyond___cb
            //is predefined as an argument in code-fragment
            ///loads Book
            //ssF.LANDING_V___loads_professorList8cont_8_buildsSubexegs(
            //    function() {
            //-----------
            prepare8do_LANDING_VI_and_beyond___cb();
            //todo do resolve this construct in CSS ... it may be make
            //extra specifity and removing this set will change this specifity and
            //damage the application
            //c cc( fconf.dragPointDecoratorClasses );
            return;






            //=======================================
            // //\\ parses and sets menu
            //=======================================
            function setMenu( leafId, mcat_id, essayHeader )
            {
                //=======================================
                // //\\ how submenu built
                //=======================================
                    /*
                    asp8theor_menus :
                    {
                        theorion: {
                            list:
                            [
                                { id:'claim' },
                                { id:'proof' }
                            ],
                            'default' : 'claim'
                        },
                        aspect: {
                            list:
                            [
                                { id:'latin',   caption:'Latin' },
                            ....
                        }
                        //worked
                        ,decorations: {
                            list:
                        ....
                    }
                    */
                //=======================================
                // \\// how submenu built
                //=======================================
                var men = sconf.asp8theor_menus[ mcat_id ] = sconf.asp8theor_menus[ mcat_id ] ||
                     {  list : [],
                        //.will be overriden if aspect-default is preset in script
                        "default" : leafId,
                        duplicates : {}  //todm: this repeats parts of "exegs" ... proliferation
                     };
                if( !men.duplicates[ leafId ] ) {
                    var menuItem = { id:leafId };
                    men.duplicates[ leafId ] = menuItem;
                    men.list.push( menuItem );
                    if( mcat_id === 'theorion' ) {
                        sDomN.theorionMenuMembersCount =
                            ( sDomN.theorionMenuMembersCount || 0 ) + 1;
                    } else if( mcat_id === 'aspect' ) {
                        sDomN.aspectionMenuMembersCount =
                            ( sDomN.aspectionMenuMembersCount || 0 ) + 1;
                    }
                }


                //------------------------------------------------------------
                // //\\ this thing does breed two mcat_ids with "default"
                //------------------------------------------------------------
                //     for example for claim/english header with default === "1"
                //         sconf.asp8theor_menus[ 'aspect' ].default='english';
                //         sconf.asp8theor_menus[ 'theorion' ].default='claim';
                if( has( sapp, 'amodel_initial' ) ) {
                    var ww = sapp.amodel_initial;
                    if( ww.theorion === leafId || ww.aspect === leafId ) {
                        men[ "default" ] = leafId;
                    }
                }
                //------------------------------------------------------------
                // \\// this thing does breed two mcat_ids with "default"
                //------------------------------------------------------------


                ///at least one caption should exist among twin aspects
                if( haz( essayHeader, 'menuCaption' ) && mcat_id === 'aspect' ) {
                    men.duplicates[ leafId ].caption = essayHeader.menuCaption;
                    men.duplicates[ leafId ].studylab = essayHeader.studylab;
                }
                if( essayHeader.theorionCaption && mcat_id === 'theorion' ) {
                    men.duplicates[ leafId ].caption = essayHeader.theorionCaption;
                }
            }
            //=======================================
            // \\// parses and sets menu
            //=======================================



            // //\\ bg images
            /// collects all possible background images racks

            //******************************************************
            //puts bg image into subex for consumption in sim scene,
            //imgId is === "empty" or "path-to-image-in-img-folder":
            //      see this below: stdMod.imgRk.srcParsed = src,
            //******************************************************
            function doesAddStudyModelIfNew( essayHeader, subex ) {
                var stdMod = studyMods[ essayHeader.submodel ];
                var stdModActivatedIx = haz( stdMod, 'stdModActivatedIx' );
                if( !stdModActivatedIx && stdModActivatedIx !== 0) {
                    ////todm, is forgotten why there is an
                    ////array of flags studyModsActivated additional to
                    ////studyMods, but keep it here
                    stdMod.stdModActivatedIx = studyModsActivated.length;
                    studyModsActivated.push( stdMod );
                }
                stdMod.imgRk.cssId = 'bg' + stdMod.stdModActivatedIx;
                //*************************************************************
                //first new-submodel header must have img if submodel needs it,
                //      bg image is per submodel
                //*************************************************************
                if( !userOptions.usingBackgroundImage() ) {
                    //essayHeader.mediaBgImage = null; //disables it for definitness
                    rg.detected_user_interaction_effect_DONE = true;
                    stdMod.imgRk.srcParsed = fconf.engineImg + '/empty.png';
                    return;
                }
                if( haz( stdMod.imgRk, 'imgFoundInText' ) ) return;

                // //\\ establishes image source file name
                var headerHasImage = has( essayHeader, 'mediaBgImage' );
                var imgInSconf = haz( studyMods[ essayHeader.submodel ].sconf, 'mediaBgImage' );
                if( headerHasImage ) {
                    let imgInHeader = essayHeader.mediaBgImage;
                    var imgId = imgInHeader === null || imgInHeader === '' ?
                                '*empty*' : ''+imgInHeader;
                    stdMod.imgRk.imgFoundInText = true;
                } else if( imgInSconf )  {
                    var imgId = imgInSconf;
                } else {
                    imgId = '*empty*';
                }
                stdMod.imgRk.srcParsed = imgId === '*empty*' ?
                     fconf.engineImg + '/empty.png' :
                        fconf.pathToContentSite + '/contents/' +
                        fconf.sappId + '/img/' + imgId;
                // \\// establishes image source file name
            }
            // \\// bg images
        }
        //====================================================
        // \\// on content Files Load Success
        //====================================================


        function aspectTurnedOn(aspect_id) {
            if (aspect_id === 'model' || aspect_id === 'addendum' || aspect_id === 'xixcentury'){
                return userOptions.showingBonusFeatures();
            }
            if (aspect_id === 'latin'){
                return userOptions.showingLatin();
            }
            return true;
        }
    }

    ///input: ptype - optional,
    ///               if falsy, then "rgba(0,0,0,1)" color is returned,
    ///               if string, then converted to array first,
    ///               if captilized-string, then converts to low-case-topic-style
    ///               if array, converted as array to color
    ///returns fixed color or black,
    ///todm: call as tptype2tpcolorRgba
    function getFixedColor( ptype0colorArray, makeOpacity1 )
    {
        if( typeof ptype0colorArray === 'string' ) {
            //returns blank, ' ' if ptype0colorArray is falsy
            var cleared = nsmethods.topicIdUpperCase_2_underscore( ptype0colorArray || ' ' );

            //returns false if cleared === ' ' and not a key in fixed-colors ...
            var colorArray = haz( ssD[ 'fixed-colors' ], cleared );
        } else {
            var colorArray = ptype0colorArray;
        }
        ///returns "rgba(0,0,0,1)" if color is falsy
        if( colorArray && makeOpacity1 ) {
            var rgba = ns.arr2rgba(
                [ colorArray[0], colorArray[1], colorArray[2], 1 ]
            );
        } else {
            var rgba = ns.arr2rgba( colorArray );
        }
        return rgba;
    }

}) ();

