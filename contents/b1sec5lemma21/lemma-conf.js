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
            ],
        };
    }

}) ();

