( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
        return {
            sappCodeReference : 'b1sec3prop12',
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/addendum.txt',
            ],

            codesList : [
                { src : 'sconf.js' },
                { src : 'init-model-parameters.js' },
                { src : 'amode8captures.js' },
                { src : 'main-legend.js' },
                { src : 'model-upcreate.js' },
                { src : 'makes-orbit.js' },
                { src : 'completes-sliders-creation.js' },
            ],

            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

