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
                { src : '../js/sconf.js' },
                { src : '../js/decs-conf.js' },
                { src : '../js/global-css-overrider.js' },

                //structures core execution
                { src : '../js/sets-user-touch-detector.js' },
                { src : '../js/study-model.js' },
                { src : '../js/media-model.js' },

                //model-media solving routine
                { src : '../js/solves-path.js' },
                { src : '../js/model-groupify-steps.js' },
                { src : '../js/path-2-path-model-racks.js' },
                { src : '../js/path-2-custom-decs.js' },
                { src : '../js/path-model-racks-2-svg.js' },
                { src : '../js/decs-2-svg.js' },
                { src : '../js/does-mask-all-svg.js' },
                { src : '../js/unmasks-visible-path-svg.js' },

                //sliders
                { src : '../js/time-slider.js' },
                { src : '../js/delta-time-slider.js' },
                { src : '../js/model-of-ABV-sliders.js' },

                //model and media subroutimes
                { src : '../js/model8media-lib.js' },
                { src : '../js/main-legend.js' },

                //projectile model
                /*
                { src : '../projectile-model/sconf.js' },
                { src : '../projectile-model/study-model.js' },
                { src : '../projectile-model/media-model.js' },
                */
            ],
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/addendum-comment.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : ``,
        };
    }

}) ();

