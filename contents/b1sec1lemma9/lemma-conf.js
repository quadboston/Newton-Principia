( function() {
    window.b$l.sn('fapp' ).lemmaConfig = function() { return {

        codesList :
        [
            { src:'sconf.js' },
            { src:'main.js' },
            { src:'create-proof-slider.js' },
            { src:'init-model-parameters.js' },
            { src:'model-upcreate.js' },
            { src:'media-upcreate.js' },
            { src:'main-legend.js' },
            { src:'d8d-model.js' },
            { src:'amode8captures.js' },
        ],
        "contents-list" :
        [
            'txt/latin.txt',
            'txt/english.txt',
            'txt/video.txt',
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





    }; }
}) ();

