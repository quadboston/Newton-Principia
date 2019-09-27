( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var methods     = sn('methods');

    methods.loadScripts = loadScripts;
    //000000000000000000000000000000
    return;
    //000000000000000000000000000000







    //===============================================================================
    // //\\ microAPI to load list of scripts
    //
    //      Loads scripts from list and calls callbacks per
    //      scripts and per list-completion
    //
    //      Every time this function is called it manages new scripts list separately
    //      from other calls lists
    //
    //      Input: scriptList
    //                  scriptItem.src - link or path
    //                  scriptItem.cb - optional callback for individual script load
    //             lastCb - optional callback called when all scripts loaded
    //===============================================================================
    function loadScripts( scriptList, lastCb )
    {
        var completionCount = 0;

        scriptList.forEach( function( scriptItem, ix ) {

            //https://developer.mozilla.org/en-US/docs/Web/HTTP/
            //      Basics_of_HTTP/MIME_types#JavaScript_types
            type = scriptItem.type || 'text/javascript';
            var scrip = document.createElement('script');
            scrip.onload = function() {
                completionCount++;
                //ccc( completionCount + ' loaded ' + scriptItem.src );
                scriptItem.cb && scriptItem.cb( loadedItem );
                checkCompletion();
            }
            document.head.appendChild( scrip );
            //https://medium.com/@vschroeder/javascript-how-to-execute-code-from-an-
            //asynchronously-loaded-script-although-when-it-is-not-bebcbd6da5ea
            scrip.src = scriptItem.src;
        });
        return; //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

        function checkCompletion()
        {
            if( completionCount === scriptList.length ) {
                lastCb && lastCb();
            }
        }
    }
    //===============================================================================
    // \\// microAPI to load list of images.
    //===============================================================================

}) ();

