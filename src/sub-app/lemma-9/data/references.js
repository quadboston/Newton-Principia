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
    var drg_own     = sn('lemma9', drg);
    var drg_modules = sn('modules', drg_own);

    drg_modules.referencesModule = referencesModule;
    return;






    function referencesModule()
    {
        references.text = ` 
        <br><br>
        Sources:
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338107">
            Lemma 9 Latin text and Figure. 3rd Edition.
        </a>
        <br>
        <a href="https://en.wikisource.org/wiki/The_Mathematical_Principles_of_Natural_Philosophy_(1729)/Book_1/Section_1#Lem9">
            3rd Edition to English translation by Andrew Motte.
        </a>


        `;
    }

}) ();
