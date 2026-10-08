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
                { src: 'config-functions.js' },
                { src: 'model-upcreate.js' },
                { src: 'state-capturer.js' },
				{ src: '../../kepler-orbit-models/main-legend.js' },
            ],
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
            ],
        };
    }
}) ();
