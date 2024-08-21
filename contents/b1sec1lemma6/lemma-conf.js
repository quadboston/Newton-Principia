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
                { src:'model-functions.js' },
                { src:'init-model-parameters.js' },
                { src:'media-upcreate.js' },
                { src:'state-capturer.js' },
                { src:'main-legend.js' },
                { src:'amode8captures.js' },
            ],
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/video.txt',
                'txt/addendum-comment.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

