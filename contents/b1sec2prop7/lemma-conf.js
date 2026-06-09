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
                { src: 'init-model-parameters.js' },
                { src: 'model-upcreate.js' },
                { src: 'completes-sliders-creation.js' },
                { src: 'media-upcreate.js' },
                { src: 'amode8captures.js' },
                { src: 'state-capturer.js' },
                { src: 'config-functions.js' },
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
