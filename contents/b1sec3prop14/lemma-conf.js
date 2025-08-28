( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig() {
        return {       
            codesList : [
                { src: 'sconf.js' },
                { src: 'amode8captures.js' },
                { src: 'init-model-parameters.js' },
                { src: 'completes-sliders-creation.js' },
                { src: 'model-upcreate.js' },
                { src: 'media-upcreate.js' },
            ],
            "contents-list" : [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/addendum.txt',
            ],
        };
    }
}) ();