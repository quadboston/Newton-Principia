( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig() {
        let pre = '../../b1sec3prop14/js/';
        return {       
            codesList : [
                { src: pre + 'sconf.js' },
                { src: pre + 'amode8captures.js' },
                { src: pre + 'completes-sliders-creation.js' },
                { src: pre + 'init-model-parameters.js' },
                { src: pre + 'model-upcreate.js' },
                { src: pre + 'media-upcreate.js' },
            ],
            "contents-list" : [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/addendum.txt',
            ],
        };
    }
}) ();