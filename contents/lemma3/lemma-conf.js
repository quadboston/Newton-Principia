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

            //optional
            referencesForAllLemmaEssays :
            `
            <div style="font-size:11px;">
                <br><br>
                Sources:
                <br>
                <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z" target="_blank">
                    3rd Edition English translation by I. Bernard Cohen.
                </a>
                <br>
                <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102">
                    Diagram. Latin, 3rd Edition.
                </a>
                <br>
                <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102">
                    Text. Latin, 3rd Edition.
                </a>
            </div>
            `,
        };
    }

}) ();

