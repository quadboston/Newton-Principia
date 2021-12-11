( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            codesList :
            [
                { src : 'sconf-addon.js' },
                { src : 'study-model-addon.js' },
                { src : 'extra-images.js' },
                { src : 'resize-main-scene.js' },

                { src : '../../b1s2prop1theor1/common/global-css-overrider.js' },
                { src : '../../b1s2prop1theor1/common/sconf.js' },
                { src : '../../b1s2prop1theor1/common/decor-conf.js' },
                { src : '../../b1s2prop1theor1/common/dec-2-media.js' },
                { src : '../../b1s2prop1theor1/common/dom8model-sliders.js' },
                { src : '../../b1s2prop1theor1/common/main-legend.js' },
                { src : '../../b1s2prop1theor1/common/masks-visib.js' },
                { src : '../../b1s2prop1theor1/common/media-model.js' },
                { src : '../../b1s2prop1theor1/common/model-groupify-steps.js' },
                { src : '../../b1s2prop1theor1/common/model-of-ABV-sliders.js' },
                { src : '../../b1s2prop1theor1/common/solves-trajectory-math.js' },
                { src : '../../b1s2prop1theor1/common/path-2-media.js' },
                { src : '../../b1s2prop1theor1/common/traj-2-trshapes.js' },
                { src : '../../b1s2prop1theor1/common/traj-2-decs.js' },
                { src : '../../b1s2prop1theor1/common/state-capturer.js' },
                { src : '../../b1s2prop1theor1/common/study-model.js' },
                { src : '../../b1s2prop1theor1/common/time-2-pos8media.js' },
                { src : '../../b1s2prop1theor1/common/unmasks-visib.js' },
                //{ src : 'finalizes-subessay-relaunch.js' },
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

