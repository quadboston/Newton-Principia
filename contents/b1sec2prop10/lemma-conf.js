( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
        return {
            codesList :
            [
                //todm: automate this list
                { src: 'sconf.js' },
                { src: 'config-functions.js' },
                { src: 'init-model-parameters.js' },
                { src: 'model-upcreate.js' },
                { src: 'media-upcreate.js' },
                { src: 'amode8captures.js' },
                { src: 'graph-customization.js' },
				{ src: '../../force-law-models/main-legend.js' },
            ],
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
            ],
        };
    }
}) ();
