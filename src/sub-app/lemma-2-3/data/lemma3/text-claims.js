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
    drg_modules.textClaims = textClaims;
    return;






    function textClaims()
    {
        rawTexts.claim = { 



//=================================================
// //\\ Do fill texts here
//=================================================
//        Dont use backtick "`" in the text content.


///// next text: ////////////////////
hypertext : `
        Even if the lengths of the |base|bases|| are unequal, the area of the |figure|figure||, 
        the area of all the |inscribed-rectangles|inscribed rectangles||,
        and the area of all the |circumscribed-rectangles|circumscribed rectangles|| 
        <i>still</i> become essentially equal to each other; their difference becomes as close to 0 as you like.
`,





///// next text: ////////////////////
english : `
        <dense class='orig';>The same ultimate ratios are also ratios of equality when the widths AB, BC, CD,... 
        of the parallelograms are unequal and are all diminished indefinitely.</dense>
        <attribution> −Cohen translation</attribution>
`,




///// next text: ////////////////////
latin : `
no text entered
`
//=================================================
// \\// Do fill texts here
//=================================================




};}
}) ();

