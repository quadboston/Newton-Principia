( function() {
    window.b$l.sn( 'fapp' ).lemmaConfig = lemmaConfig;
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
                'txt/cohen.txt',
            ],
        };
    }
}) ();

