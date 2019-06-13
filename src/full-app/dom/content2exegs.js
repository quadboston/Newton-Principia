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
    var references  = sn('references', ssD);
    var exegs    = sn('exegs', ssD);
    sDomF.ajax_2_prepopulated_exegsMatrix = ajax_2_prepopulated_exegsMatrix;
    return; //0000000000000000000000000000000000








    ///==========================================
    ///creates html for text pane
    ///==========================================
    function ajax_2_prepopulated_exegsMatrix( continueAppInit )
    {
        var allEssaions;
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
            on_auxiliaryLoad_success
        );

        ///This ajax-load takes contents-files, concatenates them, and calls
        ///final subroutine, on_contentFilesLoad_Success.
        function on_auxiliaryLoad_success( loadedFilesById_I )
        {
            var list = loadedFilesById_I[ 'contents-list.txt' ].text.split(/\r\n|\n|\r/);

            //------------------------------------
            // //\\  making the list for ajax-load
            //------------------------------------
            //."nothing is loaded yet:
            var listForAjax = [];
            list.forEach( function( listItem ) {
                if( !listItem.match( /^\s*$/ ) ) {
                    listForAjax.push({
                          id: listItem,
                          link:'contents/' + fconf.sappId + '/' + listItem
                    });
                }
            });
            //------------------------------------
            // \\//  making the list for ajax-load
            //------------------------------------

            ///fires ajax-load for listForAjax
            nsmethods.loadAjaxFiles( listForAjax, function( loadedFilesById_II ) {
                    listForAjax.forEach( function( listItem ) {
                        allEssaions += loadedFilesById_II[ listItem.id ].text;
                    });
                    on_contentFilesLoad_Success( loadedFilesById_I );
                }
            );
        }


        
        //====================================================
        // //\\ on content Files Load Success
        //====================================================
        function on_contentFilesLoad_Success( loadedFilesById )
        {
            references.text = loadedFilesById.references.text || references.text || '';
            if( loadedFilesById['content-config'] ) {
                var tmRack = JSON.parse(loadedFilesById['content-config'].text);
                var topics = sn('topics', ssD);
                topics.convert_lineFeed2htmlBreak = tmRack.convert_lineFeed2htmlBreak;
                sconf.contentConfig = tmRack;
            }
            var txt = allEssaions; //loadedFilesById.texts.text;

            var ESSAYON_DIVIDOR = /\*::\*/g;
            var essayons = txt.split( ESSAYON_DIVIDOR );
            sconf.submenus = {};
            var bgImgCount = 0;
            var bgImages = {};
            bgImages.cssId2rk = {};
            bgImages.path2rk = {};
            essayons.forEach( function(essayon) {

                //.removes empty essayons
                if( essayon.replace( /(\s|\n\r)*/g, '').length === 0 ) return;

                //--------------------------------------
                // //\\ splits the essayon ...
                //--------------------------------------
                //      essayon = proof|english precontent
                //             precontent = \nJSON*..*\n content 
                //             JSON essayon is optional                
                //              
                //      below: ess_instructions[1] = teaf_id: claim, proof,
                //                                            theorems, neutral, ... 
                //             ess_instructions[2] = leaf_id: english,... latin, ...
                //             ess_instructions[3] = precontent
                //https://stackoverflow.com/questions/2429146/
                //      javascript-regular-expression-single-space-character
                var ess_instructions = essayon.match( /^([^\|]*)\|([^\s]*)\s*\n([\s\S]*)$/);

                if( ess_instructions && ess_instructions[3] ) {
                    var teaf_id = ess_instructions[1];
                    var leaf_id = ess_instructions[2];
                    var wPreText = ess_instructions[3];
                    var wIx = wPreText.indexOf("*..*");
                    if( wIx > -1 ) {
                        var wHeader = wPreText.substring(0, wIx-1);
                        wPreText = wPreText.substring( wIx+4 );
                    }
                    var essayHeader = wHeader ? JSON.parse( wHeader ) : {};

                    //.todm: patch: missed submodel property does default to 'common'
                    //              empty string denotes absence of submodel
                    essayHeader.submodel = ns.h( essayHeader, 'submodel' ) ?
                                           essayHeader.submodel :
                                           'common';
                    exegs[ teaf_id ] = exegs[ teaf_id ] || {};
                    var exeg = exegs[ teaf_id ][ leaf_id ] =
                    {
                        bodyscript:wPreText, essayHeader:essayHeader
                    };
                    collectBgImg( essayHeader, exeg );

                    sconf.submenus = sconf.submenus || {};
                    setMenu( teaf_id, 'theorion' )
                    setMenu( leaf_id, 'aspect' )

                    // //\\ media-drag-decoration-enabled-aspect
                    //      currently unlocks all aspects in content for
                    //      being able to have dragged points and other elements in model,
                    //      todm: looks like useless artifact.
                    var wDecArr = fconf.dragPointDecoratorClasses =
                                  fconf.dragPointDecoratorClasses || [];
                    var wDecorAspect = 'aspect--' + leaf_id;
                    if( wDecArr.indexOf( wDecorAspect ) < 0 ) {
                        wDecArr.push( wDecorAspect );
                    }
                    // \\// media-drag-decoration-enabled-aspect


                    //ccc( teaf_id, leaf_id, essayHeader );

                    //=======================================
                    // //\\ parses and sets menu
                    //=======================================
                    function setMenu( leafId, teaf_id )
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
                        if( essayHeader["default"] === "1" ) {
                            men["default"] = leafId;
                        }
                        if( essayHeader.menuCaption && teaf_id === 'aspect' ) {
                            men.duplicates[ leafId ].caption = essayHeader.menuCaption;
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
            continueAppInit();
            return;






            // //\\ bg images
            function collectBgImg( essayHeader, exeg ) {
                var pr = bgImages.path2rk;
                var imgId = essayHeader.mediaBgImage;
                imgId = !ns.h( essayHeader, 'mediaBgImage' ) ?
                          'common' :
                          ( imgId === null ? 'empty' : imgId );
                if( !ns.h( pr, imgId ) ) {
                    var cssId = 'bg'+bgImgCount;
                    bgImages.cssId2rk[ cssId ] = pr[ imgId ] =
                    {
                        cssId : cssId,
                        src: imgId === 'empty' ?
                             'images/empty.png' :
                             'contents/' + fconf.sappId + '/img/' +
                                ( imgId === 'common' ?
                                    sconf.contentConfig.mediaBgImage :
                                    imgId
                                )
                    };
                    bgImgCount++;
                }
                exeg.imgRk = pr[ imgId ];
            }
            // \\// bg images
        }
        //====================================================
        // \\// on content Files Load Success
        //====================================================

    }


}) ();

