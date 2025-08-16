( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
        return {
            codesList : [
                { src: 'sconf.js' },
                { src: 'init-model-parameters.js' },
                { src: 'amode8captures.js' },
                //{ src: 'main-legend.js' }, // not used for now
                { src: 'model-upcreate.js' },
                { src: 'media-upcreate.js' },
                { src: 'makes-orbit.js' },
                { src: 'completes-sliders-creation.js' },
                
                { src: 'state-capturer.js' },
                { src: 'graph-array.js' },
                { src: 'graph-fw-lib.js' },

                { src : 'inits/finalizes-subessay-relaunch.js' },
                { src : 'learner-scenario/activity-scenario-I.conf.js' },
            ],
            "contents-list" : [
                'txt/latin.txt',
                'txt/cohen.txt',
            ],
        };
    }
}) ();

