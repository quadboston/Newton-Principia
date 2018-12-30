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
latin : `
        Eædem rationes ultimæ sunt etiam rationes æqualitatis, ubi parallelogrammorum latitudines AB, BC, CD, &c. 
        sunt inæquales, & omnes minuuntur in infinitum.
`,





///// next text: ////////////////////
english : `
        <dense class='orig';>The same ultimate ratios are also ratios of equality when the widths AB, BC, CD,... 
        of the parallelograms are unequal and are all diminished indefinitely.</dense>
`,




///// next text: ////////////////////
hypertext : `
        Even if the lengths of the |base|bases|| are unequal, the areas of the |figure|figure||, 
        the |inscribed-rectangles|inscribed rectangles||,
        and the |circumscribed-rectangles|circumscribed rectangles|| 
        <i>still</i> all converge to the same value.
`
//=================================================
// \\// Do fill texts here
//=================================================




};}
}) ();

