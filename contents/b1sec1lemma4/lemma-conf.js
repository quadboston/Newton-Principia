( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            mediaBgImage : "l4-diagram.png",
            codesList :
            [
                //todm: automate this list
                { src:'sconf.js' },
                { src:'model-functions.js' },
                { src:'study-model.js' },
                { src:'model-statistify.js' },
                { src:'master-n-slider.js' },
                { src:'model-helpers.js' },
                { src:'media-upcreate.js' },
                { src:'main-legend.js' },
                { src:'amode8captures.js' },
                { src:'state-capturer.js' },
                { src:'convergence-graph-framework.js' },
                { src:'lib.js' },
            ],
            "contents-list" :
            [
                'texts.content.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

