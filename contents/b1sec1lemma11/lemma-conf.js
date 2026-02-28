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
                { src:'study-model.js' },
                { src:'media-upcreate.js' },
                { src:'main-legend.js' },
            ],
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/english.txt',
                'txt/addendum.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

