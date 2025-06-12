( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    

    function lemmaConfig() {
        var ref = '../../b1sec1lemma6/js/';
        return {
            "contents-list" : [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/video.txt',
            ],

            codesList : [
                //todm: automate this list
                { src : 'sconf.js' },
                { src : ref + 'model-functions.js' },
                { src : 'init-model-parameters.js' },
                { src : 'media-upcreate.js' },
                { src : ref + 'state-capturer.js' },
                { src : 'main-legend.js' },
                { src : 'amode8captures.js' },
            ],

            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

