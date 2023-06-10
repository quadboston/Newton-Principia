( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        var ref = '../../b1sec1lemma6/js/';
        return {
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/addendum.txt',
                //'txt/video.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',

            codesList :
            [
                //todm: automate this list
                { src : 'sconf.js' },
                { src : ref + 'model-functions.js' },
                { src : ref + 'study-model.js' },
                { src : ref + 'media-upcreate.js' },
                { src : ref + 'state-capturer.js' },
                { src : ref + 'main-legend.js' },
                { src : ref + 'amode8captures.js' },
            ],
        };
    }

}) ();

