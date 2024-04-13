( function() {
    var { fapp, } = window.b$l.apptree({});
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            codesList :
            [
                { src : '../common/sconf.js' },
                { src : '../common/global-css-overrider.js' },
                { src : '../common/study-model.js' },
                { src : '../common/model-of-ABV-sliders.js' },
                { src : '../common/solves-trajectory-math.js' },
                { src : '../common/time-2-pos8media.js' },
                { src : '../common/traj-2-trshapes.js' },
                { src : '../common/traj-2-decs.js' },

                { src : '../common/media-model.js' },
                { src : '../common/path-2-media.js' },
                { src : '../common/dec-2-media.js' },
                { src : '../common/main-legend.js' },

                { src : '../common/time-slider.js' },
                { src : '../common/delta-time-slider.js' },
                { src : '../common/state-capturer.js' },
                { src : '../common/unmasks-visib.js' },
                { src : '../common/masks-visib.js' },
                { src : '../common/model-groupify-steps.js' },
                { src : '../common/decor-conf.js' },
                { src : '../common/finalizes-subessay-relaunch.js' },


                { src : '../projectile-model/sconf.js' },
                { src : '../projectile-model/study-model.js' },
                { src : '../projectile-model/media-model.js' },
            ],
            "contents-list" :
            [
                'texts.claim-proof.txt',
                'texts.corollary-scholium.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : ``,
        };
    }

}) ();

