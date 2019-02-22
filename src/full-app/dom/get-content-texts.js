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
    var rawTexts    = sn('rawTexts', ssD);

    sDomF.get_content_texts = get_content_texts;
    //000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000








    ///==========================================
    ///creates html for text pane
    ///==========================================
    function get_content_texts( continueAppInit )
    {
        var allEssaions;
        ///this ajax load takes all aux. files and list of contents
        nsmethods.loadAjaxFiles(
            [
                { id: 'contents-list.txt', link:'contents/' + sapp.sappId + '/contents-list.txt' }
               ,{ id: 'references',
                  link:'contents/' + sapp.sappId + '/references.html'
                }
               ,{ id: 'topic-map',
                  link:'contents/' + sapp.sappId + '/topic-map.json'
                }
            ],
            on_auxiliaryLoad_success
        );

        ///This ajax load takes contents-files, concatenates them, and calls
        ///final subroutine, on_contentFilesLoad_Success.
        function on_auxiliaryLoad_success( loadedFilesById_I )
        {
            var list = loadedFilesById_I[ 'contents-list.txt' ].text.split(/\r\n|\n|\r/);
            var listForAjax = [];
            list.forEach( function( listItem ) {
                if( !listItem.match( /^\s*$/ ) ) {
                    listForAjax.push({
                          id: listItem,
                          link:'contents/' + sapp.sappId + '/' + listItem
                    });
                }
            });
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

            if( loadedFilesById['topic-map'] ) {
                var tmRack = JSON.parse(loadedFilesById['topic-map'].text);
                var topics = sn('topics', ssD);
                topics.convert_lineFeed2htmlBreak = tmRack.convert_lineFeed2htmlBreak;
                topics.topicDef = tmRack.topicDef;
                sconf.mediaBgImage = tmRack.mediaBgImage;
            }
            var txt = allEssaions; //loadedFilesById.texts.text;

            var ESSAYON_DIVIDOR = /\*::\*/g;
            var essayons = txt.split( ESSAYON_DIVIDOR );
            sconf.submenus = {};
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
                //      below: ess_instructions[1] = theophase: claim, proof, theorems, neutral, ... 
                //             ess_instructions[2] = essaspect: english,... latin, ...
                //             ess_instructions[3] = precontent
                //https://stackoverflow.com/questions/2429146/
                //      javascript-regular-expression-single-space-character
                var ess_instructions = essayon.match( /^([^\|]*)\|([^\s]*)\s*\n([\s\S]*)$/);

                if( ess_instructions && ess_instructions[3] ) {
                    var theophase = ess_instructions[1];
                    var essaspect = ess_instructions[2];
                    var wPreText = ess_instructions[3];
                    var wIx = wPreText.indexOf("*..*");
                    if( wIx > -1 ) {
                        var wHeader = wPreText.substring(0, wIx-1);
                        wPreText = wPreText.substring( wIx+4 );
                    }
                    var essayHeader = wHeader ? JSON.parse( wHeader ) : {};

                    rawTexts[ theophase ] = rawTexts[ theophase ] || {};
                    rawTexts[ theophase ][ essaspect ] =
                    {
                        bodyscript:wPreText, essayHeader:essayHeader
                    };

                    sconf.submenus = sconf.submenus || {};
                    setMenu( theophase, 'theorion' )
                    setMenu( essaspect, 'aspect' )
                    //ccc( theophase, essaspect, essayHeader );

                    //=======================================
                    // //\\ parses and sets menu
                    //=======================================
                    function setMenu( leafId, menu_tNod_id )
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
                        var men = sconf.submenus[ menu_tNod_id ] = sconf.submenus[ menu_tNod_id ] ||
                             {  list : [],
                                //.will be overriden if aspect-default is preset in script
                                "default" : leafId,
                                duplicates : {}
                             };
                        //ccc( 'checing dup ' + leafId + ' ' + menu_tNod_id  + ' men=', men); 
                        if( !men.duplicates[ leafId ] ) {
                            //var menuItem = { id:aspect, caption:essayHeader.menuCaption } 
                            var menuItem = { id:leafId };
                            men.duplicates[ leafId ] = menuItem;
                            men.list.push( menuItem );
                            if( menu_tNod_id === 'theorion' ) {
                                sDomN.theorionMenuMembersCount =
                                    ( sDomN.theorionMenuMembersCount || 0 ) + 1;
                            } else if( menu_tNod_id === 'aspect' ) {
                                sDomN.aspectionMenuMembersCount =
                                    ( sDomN.aspectionMenuMembersCount || 0 ) + 1;
                            }
                        }
                        if( essayHeader["default"] === "1" ) {
                            men["default"] = leafId;
                        }
                        if( essayHeader.menuCaption && menu_tNod_id === 'aspect' ) {
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
        }
        //====================================================
        // \\// on content Files Load Success
        //====================================================

    }


}) ();

