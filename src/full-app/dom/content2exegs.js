( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var nsmethods   = sn('methods');

    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var bgImages    = sn('bgImages',ssD);
    var fixedColors = sn('fixed-colors',ssD);

    var references  = sn('references', ssD);
    var exegs       = sn('exegs', ssD);
    sDomF.loads_scenarioList8refs8conf__2__essaions_2_exegs = 
          loads_scenarioList8refs8conf__2__essaions_2_exegs;
    sDomF.getFixedColor = getFixedColor;
    return;








    ///==========================================
    ///creates html for text pane
    ///==========================================
    function loads_scenarioList8refs8conf__2__essaions_2_exegs( continueAppInit_cb )
    {
        var allEssaionsStr = "";
        ///this ajax-load takes following aux. files including list of contents
        nsmethods.loadAjaxFiles(
            [
                { id: 'contents-list.txt',
                  link:'contents/' + fconf.sappId + '/contents-list.txt' }
               ,{ id: 'references',
                  link:'contents/' + fconf.sappId + '/references.html'
                }
               ,{ id: 'content-config',
                  link:'contents/' + fconf.sappId + '/conf.json'
               }
            ],
            contentsList_2_essaions_2_exegs
        );

        ///This ajax-load takes contents-files, concatenates them, and calls
        ///final subroutine, essaions2exegs.
        function contentsList_2_essaions_2_exegs( conf_files_list )
        {
            var lemma_bookfiles_list = conf_files_list[ 'contents-list.txt' ]
                                       .text.split(/\r\n|\n|\r/);

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
                              link:'contents/' + fconf.sappId + '/' + listItem
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
            references.text = loadedFilesById.references.text || references.text || '';
            if( loadedFilesById['content-config'] ) {
                var tmRack = JSON.parse(loadedFilesById['content-config'].text);
                var topics = sn('topics', ssD);
                sconf.contentConfig = tmRack;
            }
            var txt = allEssaionsStr;

            var ESSAYON_DIVIDOR = /\*::\*/g;
            var essayons = txt.split( ESSAYON_DIVIDOR );
            sconf.submenus = {};
            bgImages.cssId2rk = {};
            bgImages.path2rk = {};
            bgImages.bgImgCount = 0;

            ///essayons are raw atomic essays
            essayons.forEach( function( essayon, essayonIx ) {

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
                    var essayHeader = wHeader ? JSON.parse( wHeader ) : {};

                    //:sets default
                    if( essayHeader[ "default" ] === "1" ) {
                        sapp.amodel_initial = ns.haz( sapp, 'amodel_initial' )  ||
                        {
                            theorion    : theorion_id,
                            aspect      : aspect_id,
                            submodel    : ns.h( essayHeader, 'submodel' ) ?
                                               essayHeader.submodel :
                                               'common',
                        };
                    }

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

                    //.todm: patch: missed submodel property does default to 'common'
                    //              empty string denotes absence of submodel
                    essayHeader.submodel = ns.h( essayHeader, 'submodel' ) ?
                                           essayHeader.submodel :
                                           'common';
                    exegs[ theorion_id ] = exegs[ theorion_id ] || {};

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
                        ssD.capture = JSON.parse( captureTxt );
                    } else {
                        ssD.capture = {}; //code-break-preventor
                    }
                    //---------------------------------------------------------
                    // \\// captured states
                    //---------------------------------------------------------


                    //---------------------------------------------------------
                    // //\\ does index bodyscript and essayHeader
                    //---------------------------------------------------------
                    var exeg = exegs[ theorion_id ][ aspect_id ] =
                    {
                        bodyscript:wPreText, essayHeader:essayHeader
                    };
                    //---------------------------------------------------------
                    // \\// does index bodyscript and essayHeader
                    //---------------------------------------------------------
                    collectBgImg( essayHeader, exeg );

                    sconf.submenus = sconf.submenus || {};
                    setMenu( theorion_id, 'theorion', aspect_id )
                    setMenu( aspect_id, 'aspect' )

                    // //\\ media-drag-decoration-enabled-aspect
                    //      currently unlocks all aspects in content for
                    //      being able to have dragged points and other elements in model,

                    //      todm: looks like useless artifact.
                    //      apparent side effect is increasing a specifity for
                    //          some CSS in "decorator.css.js"

                    var wDecArr = fconf.dragPointDecoratorClasses =
                                  fconf.dragPointDecoratorClasses || [];
                    var wDecorAspect = 'aspect--' + aspect_id;
                    if( wDecArr.indexOf( wDecorAspect ) < 0 ) {
                        wDecArr.push( wDecorAspect );
                    }
                    // \\// media-drag-decoration-enabled-aspect


                    //ccc( teaf_id, aspect_id, essayHeader );

                    //=======================================
                    // //\\ parses and sets menu
                    //=======================================
                    function setMenu( leafId, teaf_id, childCatId )
                    {
                        //=======================================
                        // //\\ how submenu built
                        //=======================================
                            /*
                            submenus :
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
                        var men = sconf.submenus[ teaf_id ] = sconf.submenus[ teaf_id ] ||
                             {  list : [],
                                //.will be overriden if aspect-default is preset in script
                                "default" : leafId,
                                duplicates : {}
                             };
                        //ccc( 'checing dup ' + leafId + ' ' + teaf_id  + ' men=', men); 
                        if( !men.duplicates[ leafId ] ) {
                            //var menuItem = { id:aspect, caption:essayHeader.menuCaption } 
                            var menuItem = { id:leafId };
                            men.duplicates[ leafId ] = menuItem;
                            men.list.push( menuItem );
                            if( teaf_id === 'theorion' ) {
                                sDomN.theorionMenuMembersCount =
                                    ( sDomN.theorionMenuMembersCount || 0 ) + 1;
                            } else if( teaf_id === 'aspect' ) {
                                sDomN.aspectionMenuMembersCount =
                                    ( sDomN.aspectionMenuMembersCount || 0 ) + 1;
                            }
                        }


                        //------------------------------------------------------------
                        // //\\ this thing does breed two teaf_ids with "default"
                        //------------------------------------------------------------
                        //     for example for claim/english header with default === "1"
                        //         sconf.submenus[ 'aspect' ].default='english';
                        //         sconf.submenus[ 'theorion' ].default='claim';
                        if( ns.h( sapp, 'amodel_initial' ) ) {
                            var ww = sapp.amodel_initial;
                            if( ww.theorion === leafId || ww.aspect === leafId ) {
                                men[ "default" ] = leafId;
                            }
                        }
                        //------------------------------------------------------------
                        // \\// this thing does breed two teaf_ids with "default"
                        //------------------------------------------------------------


                        if( essayHeader.menuCaption && teaf_id === 'aspect' ) {
                            men.duplicates[ leafId ].caption = essayHeader.menuCaption;
                            men.duplicates[ leafId ].studylab = essayHeader.studylab;
                        }
                        if( essayHeader.theorionCaption && teaf_id === 'theorion' ) {
                            men.duplicates[ leafId ].caption = essayHeader.theorionCaption;
                        }
                    }
                    //=======================================
                    // \\// parses and sets menu
                    //=======================================
                }
                //--------------------------------------
                // \\// splits the essayon ...
                //--------------------------------------

            });
            //ccc( sconf.submenus[ 'proof' ]);
            continueAppInit_cb();
            return;






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
                          //if no im in header, then id is common
                          'common' :
                          //if null in head., then set to keyword "empty"
                          ( imgId === null ? 'empty' : imgId );
                if( !ns.h( pr, imgId ) ) {
                    var cssId = 'bg'+bgImages.bgImgCount;
                    bgImages.cssId2rk[ cssId ] = pr[ imgId ] =
                    {
                        cssId : cssId,
                        src: imgId === 'empty' ?
                             'images/empty.png' :
                             'contents/' + fconf.sappId + '/img/' +
                                ( imgId === 'common' ?

                                    //it turns out that "common" means "from conf"
                                    sconf.contentConfig.mediaBgImage :

                                    imgId
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


    ///returns fixed color or black
    function getFixedColor( ptype )
    {
        var cleared = sDomF.topicIdUpperCase_2_underscore( ptype || ' ' );
        var color = ns.haz( ssD[ 'fixed-colors' ], cleared );
        return ns.arr2rgba( color );
    }


}) ();

