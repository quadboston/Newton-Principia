( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
        return {
            codesList : [
                { src: 'sconf.js' },
                { src: 'config-functions.js' },
                { src: 'init-model-parameters.js' },
                { src: 'model-upcreate.js' },
                { src: 'state-capturer.js' },
				{ src: 'model-customizer.js' },
                { src: 'completes-sliders-creation.js' },
				{ src: '../../kepler-orbit-models/main-legend.js' },
            ],
            "contents-list" : [
                'txt/latin.txt',
                'txt/cohen.txt',
            ],
        };
    }
}) ();
