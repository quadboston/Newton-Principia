( function() {
    var { fapp, } = window.b$l.apptree({});
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            codesList :
            [
                //configures initial constants
                { src : '../common/sconf.js' },
                { src : '../common/decs-conf.js' },
                { src : '../common/global-css-overrider.js' },

                //structures core execution
                { src : '../common/sets-user-touch-detector.js' },
                { src : '../common/study-model.js' },
                { src : '../common/media-model.js' },

                //model-media solving routine
                { src : '../common/solves-path.js' },
                { src : '../common/model-groupify-steps.js' },
                { src : '../common/path-2-path-model-racks.js' },
                { src : '../common/path-2-custom-decs.js' },
                { src : '../common/path-model-racks-2-svg.js' },
                { src : '../common/decs-2-svg.js' },
                { src : '../common/does-mask-all-svg.js' },
                { src : '../common/unmasks-visible-path-svg.js' },

                //sliders
                { src : '../common/time-slider.js' },
                { src : '../common/delta-time-slider.js' },
                { src : '../common/model-of-ABV-sliders.js' },

                //model and media subroutimes
                { src : '../common/model8media-lib.js' },
                { src : '../common/main-legend.js' },

                //projectile model
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

