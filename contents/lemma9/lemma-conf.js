( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            dontRun_ExpandConfig : true,
            mediaBgImage : "lemma9-original.png",
            codesList :
            [
                { src:'sconf.js' },
                { src:'main.js' },
                { src:'core/create-proof-slider.js' },
                { src:'models/study-model-common.js' },
                { src:'models/media-model-common.js' },
                { src:'models/main-legend.js' },
                { src:'models/d8d-model-common.js' }
            ],
            "contents-list" :
            [
                'texts.content.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : `
                <br><br>
                Sources:
                <br>
                <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z" target="_blank">
                    3rd Edition English translation by I. Bernard Cohen.
                </a>
                <br>
                <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338107">
                    Lemma 9 Latin text and figure. 3rd Edition.
                </a>
            `,
        };
    }

}) ();

