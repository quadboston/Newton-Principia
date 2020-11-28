( function() {
    var {
        ns,
        $$,
        sn,
        nsmethods,
        fapp,
        fconf,
        sconf,
        sapp,
        sDomF,
        sDomN,
        amode,
        studyMods,
        capture,
        ssD,
        topics,
        bgImages,
        fixedColors,
        references,
        exegs,
    } = window.b$l.apptree({
        ssFExportList :
        {
            loads_scenarioList8refs8conf8contents__8__builds_exegs8subexegs,
        },
    });
    sDomF.getFixedColor = getFixedColor;
    return;








    ///==========================================
    ///creates html for text pane
    ///==========================================
    function loads_scenarioList8refs8conf8contents__8__builds_exegs8subexegs( continueAppInit_cb )
    {
        var allEssaionsStr = "";
        var lemmaConfig = fconf.sappModulesList[ fconf.sappId ];
        contentsList_2_essaions_2_exegs( lemmaConfig );
        return;

        ///This ajax-load takes contents-files, concatenates them, and calls
        ///final subroutine, essaions2exegs.
        function contentsList_2_essaions_2_exegs( conf_files_list )
        {
            var lemma_bookfiles_list = conf_files_list[ 'contents-list' ];
            //=========================================================
            // //\\ ajax load
            //=========================================================
                // //\\  making the list
                //------------------------------------
                var lbf_forAjax = [];
                lemma_bookfiles_list.forEach( function( listItem ) {
                    if( !listItem.match( /^\s*$/ ) ) {
                        lbf_forAjax.push({
                              id: listItem,
                              link : fconf.pathToStem + 'contents/' + fconf.sappId + '/' + listItem
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
                            allEssaionsStr += loadedFilesById_II[ listItem.id ].text;
                        });
                        essaions2exegs( conf_files_list );
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
        function essaions2exegs( loadedFilesById )
        {
            references.text =
                ns.haz( fconf.sappModulesList[ fconf.sappId ], 'referencesForAllLemmaEssays' );

            if( loadedFilesById['content-config'] ) {
                var tmRack = JSON.parse(loadedFilesById['content-config'].text);
                sconf.contentConfig = tmRack;
            }
            var txt = allEssaionsStr;

            var ESSAYON_DIVIDOR = /\*::\*/g;
            var essayons = txt.split( ESSAYON_DIVIDOR );
            sconf.asp8theor_menus = {};
            bgImages.cssId2rk = {};
            bgImages.path2rk = {};
            bgImages.bgImgCount = 0;

            ///essayons are raw atomic essays
            essayons.forEach( function( essayon ) {

                //.removes empty essayons
                if( essayon.replace( /(\s|\n\r)*/g, '').length === 0 ) return;

                //--------------------------------------
                // //\\ splits the essayon ...
                //--------------------------------------
                //      essayon = proof|english precontent
                //             precontent = \nJSON*..*\n content 
                //             JSON essayon is optional                
                //              
                //      below: ess_instructions[1] = theorion_id: claim, proof,
                //                                            theorems, neutral, ... 
                //             ess_instructions[2] = aspect_id: english,... latin, ...
                //             ess_instructions[3] = precontent
                //https://stackoverflow.com/questions/2429146/
                //      javascript-regular-expression-single-space-character
                var ess_instructions = essayon.match( /^([^\|]*)\|([^\s]*)\s*\n([\s\S]*)$/);

                //ess_instructions[3] is text itself
                if( ess_instructions && ess_instructions[3] ) {
                    var theorion_id = ess_instructions[1];
                    var aspect_id = ess_instructions[2];
                    var wPreText = ess_instructions[3];
                    var wIx = wPreText.indexOf("*..*");
                    if( wIx > -1 ) {
                        var wHeader = wPreText.substring(0, wIx-1);
                        wPreText = wPreText.substring( wIx+4 );
                    }
                    //.converts essayion's-header-script to header-js-object
                    //.assumes if wHeader exists, it must be valid JSON
                    var essayHeader = wHeader ? JSON.parse( wHeader ) : {};

                    //:sets defaults
                    essayHeader.submodel = ns.haz( essayHeader, 'submodel' ) || 'common';
                    if( !ns.h( studyMods, essayHeader.submodel ) ) {
                        alert( 'Wrong submodel "' + essayHeader.submodel +
                               '" prescipted in essay ' + theorion_id + '/' + aspect_id +
                               " This submodel does not exist in lemma`s modules."
                        );
                        //todm ... why this return crashes app?
                        return;
                    }

                    //===============================================================
                    // //\\ sets initial amode
                    //===============================================================
                    //.todm: patch: missed submodel property does default to 'common'
                    //              empty string denotes absence of submodel
                    essayHeader.submodel = ns.h( essayHeader, 'submodel' ) ?
                                           essayHeader.submodel :
                                           'common';
                    sn( theorion_id, exegs );
                    var aspExeg = sn( aspect_id, exegs[ theorion_id ] );
                    var subexegs = ns.sn( 'subexegs', aspExeg, [] );
                    var subexegsIx = subexegs.length;
                    //normalizes subessay id:
                    ns.sn( 'subessay', essayHeader, subexegsIx + '' );

                    //----------------------------------------------------------------
                    // //\\ sets sapp.amodel_initial
                    //      to "default" or to the first essay if no "default"
                    //----------------------------------------------------------------
                    if( ns.haz( essayHeader, "default" ) === "1" ||
                        !ns.haz( sapp, 'amodel_initial' )
                    ) {
                        sapp.amodel_initial =
                        {
                            theorion    : theorion_id,
                            aspect      : aspect_id,
                            submodel    : essayHeader.submodel,
                            subessay    : essayHeader.subessay,
                        };
                        Object.assign( amode, sapp.amodel_initial );
                    }
                    //----------------------------------------------------------------
                    // \\// sets sapp.amodel_initial
                    //===============================================================
                    // \\// sets initial amode
                    //===============================================================

                    // //\\ establishes unescaped fixed
                    //      topic cats lemma-wise
                    var wwfc = ns.haz( essayHeader, 'fixed-colors' );
                    if( wwfc ) {
                        Object.keys( wwfc ).forEach( topicKey => {
                            var tk = sDomF.topicIdUpperCase_2_underscore( topicKey );
                            fixedColors[ tk ] = wwfc[ topicKey ];
                        });
                    }
                    // \\// establishes unescaped fixed


                    //---------------------------------------------------------
                    // //\\ captured states
                    //---------------------------------------------------------
                    //we are ready to take body of text ...
                    //but, before this, we extract captured states
                    var CAPTURE_POSITION_INDICATOR = '*:::*:::*';
                    var capturePos = wPreText.indexOf( CAPTURE_POSITION_INDICATOR );
                    if( capturePos > -1 ) {
                        ////captures do exist ... split them from text
                        var captureTxt = wPreText.substring(
                            capturePos + CAPTURE_POSITION_INDICATOR.length );
                        wPreText = wPreText.substring( 0, capturePos );
                        ns.paste( capture, JSON.parse( captureTxt ) );
                    }
                    //---------------------------------------------------------
                    // //\\ digesting app-mode to lemma conditions
                    //---------------------------------------------------------
                    var wwCond = ns.haz( capture, "__amode2rgstate" );
                    if( wwCond ) {
                        ssD.__amode2rgstate = wwCond;
                        delete capture.__amode2rgstate;
                    } else {
                        ssD.__amode2rgstate = [];
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
                        bodyscript : wPreText,
                        essayHeader,
                        //subexegsIx,
                    };
                    var subessay2subexeg = ns.sn( 'subessay2subexeg', aspExeg );
                    subessay2subexeg[ essayHeader.subessay ] = subexeg;
                    subexegs.push( subexeg );
                    //---------------------------------------------------------
                    // \\// does index bodyscript and essayHeader
                    //---------------------------------------------------------
                }
                //--------------------------------------
                // \\// splits the essayon ...
                //--------------------------------------
            });

            //===========================================================
            /// collect BgImg, set Menu, dec Point_parentClasses
            ///     continues to spawn exegs after all exegs placeholders
            ///     have been established from parser
            //===========================================================
            sn( 'asp8theor_menus', sconf );
            ns.eachprop( exegs, ( exAspects, theorion_id ) => {
                ns.eachprop( exAspects, ( exAspect, aspect_id ) => {
                    exAspect.subexegs.forEach( ( exeg, exegId ) => {
                        var essayHeader = exeg.essayHeader;
                        if( exegId === 0 ) {
                            collectBgImg( essayHeader, exeg );

                            //.not elegant: should be in "theorion" loop, not in child loop,
                            setMenu( theorion_id, 'theorion', essayHeader );

                            setMenu( aspect_id, 'aspect', essayHeader );
                            //******************************************************************
                            // //\\ collects decPoint_parentClasses for d8d_p.createFramework
                            //      media-drag-decoration-enabled-aspect
                            //      todm: looks like useless artifact.
                            //******************************************************************
                            //      currently unlocks all aspects in content for
                            //      being able to have dragged points and other elements in model,

                            //      apparent side effect is increasing a specifity for
                            //      some CSS in "decorator.css.js"

                            //used in: d8d_p.createFramework({
                            //         decPoint_parentClasses : fconf.dragPointDecoratorClasses,
                            var wDecArr = sn( 'dragPointDecoratorClasses', fconf, [] );

                            var wDecorAspect = 'aspect--' + aspect_id;
                            if( wDecArr.indexOf( wDecorAspect ) < 0 ) {
                                wDecArr.push( wDecorAspect );
                            }
                            //******************************************************************
                            // \\// collects decPoint_parentClasses for d8d_p.createFramework
                            //******************************************************************
                        }
                        ///remembers default for easy access
                        if( ns.h( essayHeader, "default" ) ){
                            exAspect[ "default" ] = exeg;
                        }
                    });
                });
            });
            continueAppInit_cb();
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
                //ccc( 'checing dup ' + leafId + ' ' + mcat_id  + ' men=', men); 
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
                if( ns.h( sapp, 'amodel_initial' ) ) {
                    var ww = sapp.amodel_initial;
                    if( ww.theorion === leafId || ww.aspect === leafId ) {
                        men[ "default" ] = leafId;
                    }
                }
                //------------------------------------------------------------
                // \\// this thing does breed two mcat_ids with "default"
                //------------------------------------------------------------


                ///at least one caption should exist among twin aspects
                if( ns.haz( essayHeader, 'menuCaption' ) && mcat_id === 'aspect' ) {
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
            ///
            /// collects all possible background images racks
            ///     bgImages.cssId2rk (indexed by cssId )
            ///             cssId is = bg<imagesCount>
            ///     path2rk           ( indexed by imgId )
            ///             imgId is = 'common', 'empty', or from exeg-header
            ///                   and is a path in /contents/.../img/ folder
            ///                       except for 'empty'
            ///                       which is configured by null in exeg header;
            /// puts the rack specific to exeg into exeg.imgRk
            ///
            function collectBgImg( essayHeader, exeg ) {
                //recall: bgImages = ssD.bgImages;
                var pr = bgImages.path2rk;
                var imgId = essayHeader.mediaBgImage;
                imgId = !ns.h( essayHeader, 'mediaBgImage' ) ?
                          //if no im in header, then id is common,
                          //apparently "common" means common for all essays in lemma,
                          //see *c* below
                          'common' :
                          //if null in head., then set to keyword "empty"
                          ( imgId === null ? 'empty' : imgId );
                if( !ns.h( pr, imgId ) ) {
                    var cssId = 'bg'+bgImages.bgImgCount;


                    var lemmaConfig = fconf.sappModulesList[ fconf.sappId ]
                    var bgImg = lemmaConfig.mediaBgImage;
                    bgImages.cssId2rk[ cssId ] = pr[ imgId ] =
                    {
                        cssId : cssId,
                        src: imgId === 'empty' ?
                             fconf.pathToStem + 'images/empty.png' :
                             fconf.pathToStem + 'contents/' + fconf.sappId + '/img/' +
                                ( imgId === 'common' ?
                                    //it turns out that "common" means "from conf" //*c*
                                    bgImg : imgId
                                )
                    };
                    bgImages.bgImgCount++;
                }
                exeg.imgRk = pr[ imgId ];
            }
            // \\// bg images
        }
        //====================================================
        // \\// on content Files Load Success
        //====================================================

    }

    ///input: ptype - optional,
    ///               if falsy, then "rgba('0,0,0,1')" color is returned,
    ///               if string, then converted to array first,
    ///               if captilized-string, then converts to low-case-topic-style
    ///               if array, converted as array to color
    ///returns fixed color or black,
    ///todm: call as tptype2fixedColor_rgba
    function getFixedColor( ptype )
    {
        if( typeof ptype === 'string' ) {
            //returns blank, ' ' if ptype is falsy
            var cleared = sDomF.topicIdUpperCase_2_underscore( ptype || ' ' );

            //returns false if cleared === ' ' and not a key in fixed-colors ...
            var colorArray = ns.haz( ssD[ 'fixed-colors' ], cleared );
        } else {
            var colorArray = ptype;
        }
        ///returns "rgba('0,0,0,1')" if color is falsy
        return ns.arr2rgba( colorArray );
    }


}) ();

