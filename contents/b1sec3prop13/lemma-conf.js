( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
        return {          
            codesList : [
                { src: 'sconf.js' },
            ],
            "contents-list" : [
                'txt/latin.txt',
                'txt/cohen.txt',
            ],
            sappCodeReference : 'b1sec3prop12',  
        };
    }

}) ();
