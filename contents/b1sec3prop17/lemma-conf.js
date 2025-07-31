( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
        return {
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
            ],

            codesList : [
                { src : 'sconf.js' },
                { src : 'init-model-parameters.js' },
                { src : 'amode8captures.js' },
                { src : 'main-legend.js' },
                { src : 'model-upcreate.js' },
                { src : 'media-upcreate.js' },
                { src : 'makes-orbit.js' },
                { src : 'completes-sliders-creation.js' },
            ],

        };
    }

}) ();

