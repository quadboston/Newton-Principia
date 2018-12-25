// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var references  = sn('references', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma3', drg);
    var drg_modules = sn('modules', drg_own);

    drg_modules.referencesModule = referencesModule;
    return;






    function referencesModule()
    {
        references.text = ` 
        <br><br>
        Sources:
        <br>
        <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z">
            3rd Edition English translation by I. Bernard Cohen.
        </a>
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338103">
            Lemma 3 Latin text, 3rd Edition.
        </a>
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102">
            Lemma 2 and 3 figure, 3rd Edition.
        </a>
        `;
    }

}) ();

