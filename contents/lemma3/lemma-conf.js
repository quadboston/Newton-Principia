( function() {
    var ns = window.b$l;
    var fapp = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            sappCodeReference : 'lemma2',
            "contents-list" :
            [
                "claim-latin.content.txt",
                "claim-mix.content.txt",
                "claim-xixcentury.content.txt",
                "proof-mix.content.txt",
                "proof-xixcentury.content.txt",
                "proof-xix-century-II.content.txt",
                "proof-xix-century-II.svg.txt",
                "proof-xix-century-III.content.txt",
            ],

        };
    }

}) ();

