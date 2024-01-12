( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            sappCodeReference : 'b1sec1lemma6',
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/video.txt',
                'txt/addendum-comment.txt',
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

