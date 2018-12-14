// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma3', drg);
    var drg_modules = sn('modules', drg_own);
    drg_modules.textProofs = textProofs;
    return;




    function textProofs()
    {
        rawTexts.proof = { 



//=================================================
// //\\ Do fill texts here
//=================================================
//        Dont use backtick "`" in the text content.

///// next text: ////////////////////
english : `
            <dense class='orig';>For let AF be equal to the greatest width, 
            and let the parallelogram FAaf be completed. This parallelogram will 
            be greater than the difference of the inscribed and circumscribed figures; 
            but if its width AF is diminished indefinitely, it will become less than 
            any given rectangle. Q.E.D.</dense><attribution> −Cohen translation</attribution>
`,

hypertext : `
            not yet entered
`,


///// next text: ////////////////////
latin : `
            not yet entered
`

//=================================================
// \\// Do fill texts here
//=================================================



};}
}) ();

