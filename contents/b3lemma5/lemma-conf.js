( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' );
    fapp.lemmaConfig = lemmaConfig;
    return;



    function lemmaConfig()
    {
        return {
            codesList :
            [
                { src:'sconf.js' },
                { src:'init-model-parameters.js' },
                { src:'media-upcreate.js' },
                { src:'model-upcreate.js' },
                { src:'main-legend.js' },
                { src:'dom8model-sliders.js' },
                { src:'complete-sliders-creation.js' },
            ],
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/english.txt',
                'txt/addendum.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : ``,
        };
    }

}) ();

