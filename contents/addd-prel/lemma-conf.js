( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            codesList :
            [
                //todm: automate this list
                { src:'sconf.js' },
                { src:'study-model.js' },
            ],
            "contents-list" :
            [
                'texts.content.txt',
                'texts.content-non-euclid.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

