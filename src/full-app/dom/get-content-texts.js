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
        nsmethods.loadAjaxFiles(
            [
                { id: 'texts', link:'contents/' + sapp.sappId + '/texts.txt' }
               ,{ id: 'references',
                  link:'contents/' + sapp.sappId + '/references.html'
                }
               ,{ id: 'topic-map',
                  link:'contents/' + sapp.sappId + '/topic-map.json'
                }
            ],
            onSuccess
        );

        function onSuccess( loadedFilesById )
        {
            references.text = loadedFilesById.references.text || references.text || '';

            if( loadedFilesById['topic-map'] ) {
                var tmRack = JSON.parse(loadedFilesById['topic-map'].text);
                var topics = sn('topics', ssD);
                topics.convert_lineFeed2htmlBreak = tmRack.convert_lineFeed2htmlBreak;
                topics.topicDef = tmRack.topicDef;
                sconf.mediaBgImage = tmRack.mediaBgImage;
            }
            var txt = loadedFilesById.texts.text;
            var parts = txt.split( /\*::\*/g );
            parts.forEach( function(part) {

                //.removes empty parts
                if( part.replace( /(\s|\n\r)*/g, '').length === 0 ) return;

                //--------------------------------------
                // //\\ splits the part ...
                //--------------------------------------
                //      part = proof|english precontent
                //             precontent = \nJSON*..*\n content 
                //             JSON part is optional                
                //              
                //      below: command[1] = proof
                //             command[2] = english
                //             command[3] = precontent
                //https://stackoverflow.com/questions/2429146/
                //      javascript-regular-expression-single-space-character
                var command = part.match( /^([^\|]*)\|([^\s]*)\s*\n([\s\S]*)$/);

                if( command && command[3] ) {
                    var wPreText = command[3];
                    var wIx = wPreText.indexOf("*..*");
                    if( wIx > -1 ) {
                        var wHeader = wPreText.substring(0, wIx-1);
                        var essayHeader = JSON.parse( wHeader );
                        wPreText = wPreText.substring( wIx+4 );
                    }
                    rawTexts[ command[1] ] = rawTexts[ command[1] ] || {};
                    rawTexts[ command[1] ][ command[2] ] =
                    {
                        text:wPreText,
                        header:essayHeader
                    };
                }
                //--------------------------------------
                // \\// splits the part ...
                //--------------------------------------

            });
            continueAppInit();
        }
    }


}) ();

