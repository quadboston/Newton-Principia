( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            dontRun_ExpandConfig : true,
            mediaBgImage : "diagram.png",
            codesList :
            [
                { src:'sconf.js' },
                { src:'models/study-model.js' },
                { src:'models/media-model.js' },
                { src:'models/main-legend.js' },
                { src:'models/d8d-sliders.js' },
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
                <br>
                <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338152" target="_blank">
                     3rd Edition: https://www.e-rara.ch/zut/wihibe/content/pageview/338152
                     Latin. Sectio V.
                     License: public domain.
                </a>
            `,
        };
    }

}) ();

