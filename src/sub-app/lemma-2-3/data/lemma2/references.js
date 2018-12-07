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
    var drg_own     = sn('lemma2', drg);
    var drg_modules = sn('modules', drg_own);

    drg_modules.referencesModule = referencesModule;
    return;






    function referencesModule()
    {
        references.text = ` 
        <br><br>
        Sources:
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102">
            Lemma 2 Latin text and Lemma 2 Figure. 3rd Edition.
        </a>
        <br>

        `;
    }

}) ();

