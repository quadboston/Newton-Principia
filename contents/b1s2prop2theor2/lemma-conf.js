( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        let route = '../../b1s2prop1theor1/'
        return {
            codesList :
            [
                { src : 'sconf-addon.js' },
                { src : 'study-model-addon.js' },
                { src : 'extra-images.js' },
                { src : 'resize-main-scene.js' },

                  //configures initial constants
                { src : route+'common/sconf.js' },
                { src : route+'common/decs-conf.js' },
                { src : route+'common/global-css-overrider.js' },

                //structures core execution
                { src : route+'common/sets-user-touch-detector.js' },
                { src : route+'common/study-model.js' },
                { src : route+'common/media-model.js' },

                //model-media solving routine
                { src : route+'common/solves-path.js' },
                { src : route+'common/model-groupify-steps.js' },
                { src : route+'common/path-2-path-model-racks.js' },
                { src : route+'common/path-2-custom-decs.js' },
                { src : route+'common/path-model-racks-2-svg.js' },
                { src : route+'common/decs-2-svg.js' },
                { src : route+'common/does-mask-all-svg.js' },
                { src : route+'common/unmasks-visible-path-svg.js' },

                //sliders
                { src : route+'common/time-slider.js' },
                { src : route+'common/delta-time-slider.js' },
                { src : route+'common/model-of-ABV-sliders.js' },

                //model and media subroutimes
                { src : route+'common/model8media-lib.js' },
                { src : route+'common/main-legend.js' },

                //projectile model
                { src : route+'projectile-model/sconf.js' },
                { src : route+'projectile-model/study-model.js' },
                { src : route+'projectile-model/media-model.js' },
            ],

            "contents-list" :
            [
                './txt/latin.txt',
                './txt/english.txt',
                './txt/addendum-comment.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : ``,
        };
    }

}) ();

