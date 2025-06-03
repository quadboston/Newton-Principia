( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        let route = '../../b1sec2prop1/'
        return {
            codesList :
            [
                { src : 'sconf-addon.js' },
                //{ src : 'study-model-addon.js' },
                //{ src : 'extra-images.js' },
                //{ src : 'resize-main-scene.js' },

                  //configures initial constants
                { src : route+'js/sconf.js' },
                { src : route+'js/decs-conf.js' },
                { src : route+'js/global-css-overrider.js' },

                //structures core execution
                { src : route+'js/sets-user-touch-detector.js' },
                { src : route+'js/study-model.js' },
                { src : route+'js/media-model.js' },

                //model-media solving routine
                { src : route+'js/solves-path.js' },
                { src : route+'js/model-groupify-steps.js' },
                { src : route+'js/path-2-path-model-racks.js' },
                { src : route+'js/path-2-custom-decs.js' },
                { src : route+'js/path-model-racks-2-svg.js' },
                { src : route+'js/decs-2-svg.js' },
                { src : route+'js/does-mask-all-svg.js' },
                { src : route+'js/unmasks-visible-path-svg.js' },

                //sliders
                { src : route+'js/time-slider.js' },
                { src : route+'js/delta-time-slider.js' },
                { src : route+'js/model-of-ABV-sliders.js' },

                //model and media subroutimes
                { src : route+'js/model8media-lib.js' },
                { src : route+'js/main-legend.js' },

                /*
                //projectile model
                { src : route+'projectile-model/sconf.js' },
                { src : route+'projectile-model/study-model.js' },
                { src : route+'projectile-model/media-model.js' },
                */
            ],

            "contents-list" :
            [
                './txt/latin.txt',
                './txt/cohen.txt',
                './txt/addendum-comment.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : ``,
        };
    }

}) ();

