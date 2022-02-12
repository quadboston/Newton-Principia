( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        var sm = '../common/'; //study model path
        return {
            codesList :
            [
                //todm: automate this list
                { src: sm + 'sconf.js' },
                { src: sm + 'study-model.js' },
                { src: sm + 'completes-sliders-creation.js' },
                { src: sm + 'media-upcreate.js' },
                { src: sm + 'main-legend.js' },
                { src: sm + 'amode8captures.js' },
                { src: sm + 'state-capturer.js' },
                { src: sm + 'lib.js' },
            ],
            "contents-list" :
            [
                'texts.content.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

