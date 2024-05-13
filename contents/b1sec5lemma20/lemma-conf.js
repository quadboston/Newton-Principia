( function() {
    window.b$l.sn( 'fapp' ).lemmaConfig = lemmaConfig;
    return;





    function lemmaConfig()
    {
        return {
            codesList :
            [
                { src:'sconf.js' },
                { src:'models/study-model.js' },
                { src:'models/media-model.js' },
                { src:'models/main-legend.js' },
                { src:'models/d8d-sliders.js' },
                //{ src:'models/dom8model-sliders.js' },
                //{ src:'models/state-capturer.js' },
            ],
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/english.txt',
                'txt/addendum.txt',
            ],

            /*
            //optional additional reference html
            referencesForAllLemmaEssays : `
                <br><br>
                Sources:
                <br>
                <br>
                <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338152" target="_blank">
                     3rd Edition: https://www.e-rara.ch/zut/wihibe/content/pageview/338152
                     Latin. Sectio V.
                     License: public domain.
                </a>
            `,
            */
        };
    }
}) ();

