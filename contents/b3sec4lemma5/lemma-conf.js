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
                { src:'models/study-model.js' },
                { src:'models/media-model.js' },
                { src:'models/main-legend.js' },
                { src:'models/dom8model-sliders.js' },
                { src:'models/d8d-sliders.js' },
                { src:'models/state-capturer.js' },
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

