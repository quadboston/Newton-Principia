( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            codesList :
            [
                { src:'sconf.js' },
                { src:'init-model-parameters.js' },
                { src:'model-upcreate.js' },
                { src:'media-upcreate.js' },
                { src:'completes-sliders-creation.js' },
                { src:'main-legend.js' },
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

