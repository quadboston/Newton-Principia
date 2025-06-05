( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            codesList :
            [
                //todm: automate this list
                { src:'sconf.js' },
                { src:'study-model.js' },
                { src:'defines-model-functions.js' },
                { src:'does-paint-model-functions.js' },
                { src:'media-upcreate.js' },
                { src:'amode8captures.js' },
                { src:'media-paint-all-curves.js' },
            ],
            "contents-list" :
            [
                'texts.content.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

