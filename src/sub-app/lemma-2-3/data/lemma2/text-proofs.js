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
    var drg_own     = sn('lemma2', drg);
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
            For the difference of the inscribed and circumscribed figures is the sum of the parallelograms Kl, Lm, Mn, and Do, that is
            (because they all have equal bases), the |widthest-rectangular|rectangle|| having as base Kb (the base of one of them) and as altitude
            Aa (the sum of the altitudes), that is, the rectangle ABla. But this rectangle, because its width AB is diminished
            indefinitely, becomes less than any given rectangle. Therefore (by lem. 1) the inscribed figure and the circumscribed
            figure and, all the more, the intermediate curvilinear figure become ultimately equal. Q.E.D.    −Cohen translation

`,







///// next text: ////////////////////
hypertext : `
            The diffference in area between the
            |inscribed-rectangles|inscribed rectangles|| and
            |circumscribed-rectangles|circumscribed rectangles|| is equal to the area of a
            |widthest-rectangular|single rectangle|| on the end. As the number of rectangles is increased indefinitely, the width of each
            decreases indefinitely. This includes the |widthest-rectangular|single rectangle|| just mentioned. Since its width decreases indefinitely,
            its area decreases indefinitely, becoming as close to 0 as you like. So the difference between the areas
            of all the
            |inscribed-rectangles|inscribed rectangles|| and
            |circumscribed-rectangles|circumscribed rectangles|| becomes as close to 0 as you like. For the current shape, that
            |widthest-rectangular|single rectangle|| is on the left.

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

