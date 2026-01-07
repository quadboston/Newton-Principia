( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            mediaBgImage : "lemma1.jpg",
            codesList :
            [
                { src:'sconf.js' },
                { src:'main.js' },
                { src:'main.css.js' },

                { src:"core/limit-demos.js" },


                { src:"models/sconf.js" },
                { src:"models/study-model-limit-definition.js" },
                { src:"models/media-model-limit-definition.js" },
                { src:"models/d8d-model-limit-definition.js" },
                { src:"models/media-model-limit-definition-labels.js" },

                { src:"models/proof-xix/sconf.js" },
                { src:"models/proof-xix/study-model.js" },
                { src:"models/proof-xix/d8d-model.js" },
                { src:"models/proof-xix/media-model.js" },
            ],
            "contents-list" :
            [
                "claim-latin.content.txt",
                "claim-inglish-proof-latin.content.txt",
                "claim-xixcenture.content.txt",
                "proof-english.content.txt",
                "proof-xixcentury.content.txt",
            ],

            /*
            ///lemma-specific references           
            references :
            {
            }
            */

        };
    }

}) ();

