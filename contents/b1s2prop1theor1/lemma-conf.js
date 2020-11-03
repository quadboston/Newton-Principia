( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            dontRun_ExpandConfig : true,
            mediaBgImage : "b1s2p1t1.png",
            codesList :
            [
                { src : 'sconf.js' },
                { src : 'models/study-model.js' },
                { src : 'models/media-model.js' },
                { src : 'models/main-legend.js' },
                { src : 'models/dom8model-sliders.js' },
                { src : 'models/state-capturer.js' },
                { src : 'models/media-model-draw-evol.js' },
                { src : 'models/media-model-clear-scenario.js' },
                { src : 'models/media-model-setup-show-scenario.js' },
                { src : 'models/media-model-declare-decorations.js' },
            ],
            "contents-list" :
            [
                'texts.content.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : ``,
        };
    }

}) ();

