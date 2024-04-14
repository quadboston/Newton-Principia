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

                { src : '../common/path-2-decs-array.js' },
                { src : '../common/path-2-custom-decs.js' },
                { src : '../common/decs-array-2-svg.js' },
                { src : '../common/decs-2-svg.js' },
                { src : '../common/main-legend.js' },

                { src : '../common/media-model.js' },

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
                'txt/latin.txt',
                'txt/english.txt',
                'txt/addendum-comment.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : ``,
        };
    }

}) ();

