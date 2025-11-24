( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;


    function lemmaConfig()
    {
        var ref = '../../b1sec1lemma2/js/';

        return {
            codesList :
            [
                //todm: automate this list
                { src: ref + 'sconf-common.js' },
                { src: 'sconf.js' },
                { src: ref + 'init-datareg.js' },
                { src: ref + 'init-model-parameters.js' },
                { src: ref + "transform-functions.js" },
                { src: ref + "curve-functions.js" },

                { src: "gui-figure.js" },
                { src: ref + "dom.js" },
                { src: "main-legend.js" },
                { src: ref + "d8d-model.js" },
                { src: ref + "gui-construct.js" },
                { src: ref + "gui-slider.js" },

                { src: ref + "model-upcreate.js" },
                { src: ref + "model-aux.js" },
                { src: ref + "media-upcreate.js" },
                { src: ref + "gui-update.js" },
                { src: "gui-sync-points.js" },
                { src: ref + "amode2captures.js" },
            ],
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

