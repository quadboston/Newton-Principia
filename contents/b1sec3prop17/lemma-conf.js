( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
        return {
            sappCodeReference : 'b1sec3prop12',
            "contents-list" :
            [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/addendum.txt',
            ],

            codesList : [
                { src : 'main-legend.js' },
            ],

            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

