( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    
    function lemmaConfig() {
        var ref = '../../b1sec1lemma6/js/';

        return {
            "contents-list" : [
                'txt/latin.txt',
                'txt/cohen-donahue.txt',
                'txt/video.txt',
                'txt/addendum-comment.txt',
            ],

            codesList : [
                //todm: automate this list
                { src : 'sconf.js' },
                { src : ref + 'model-functions.js' },
                { src : ref + 'init-model-parameters.js' },
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

