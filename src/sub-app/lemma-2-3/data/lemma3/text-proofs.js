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
latin : `
            Sit enim AF æqualis latitudini maximæ 
            & compleatur |widthest-rectangular|parallelogrammum FAaf||. 
            Hoc erit majus quam differentia 
            |inscribed-rectangles|figuræ inscriptæ|| & |circumscribed-rectangles|figuræ circumscripta||;
            at latitudine sua AF in infinitum diminuta, 
            minus fiet dato quovis rectangulo. Q. E. D.
`,

english : `
            <dense class='orig';>For let AF be equal to the greatest width, 
            and let the |widthest-rectangular|parallelogram FAaf|| be completed. 
            This parallelogram will be greater than the difference of 
            the |inscribed-rectangles|inscribed|| and |circumscribed-rectangles|circumscribed|| figures; 
            but if its width AF is diminished indefinitely, 
            it will become less than any given rectangle.  Q.E.D.</dense><attribution> −Cohen translation</attribution>
`,

hypertext :
[   `
            We can create a |widthest-rectangular|new end rectangle|| whose area is greater or equal to 
            the difference in area between the 
            |inscribed-rectangles|inscribed|| and |circumscribed-rectangles|circumscribed|| rectangles. 
            We guarantee it is no smaller than the difference by making its base equal 
            to the greatest width. 

            As the number of rectangles is increased indefinitely, the width of each 
            decreases indefinitely, including the |widthest-rectangular|rectangle|| just mentioned. 
            Since its width decreases indefinitely, its area decreases indefinitely, 
            becoming arbitrarily close to 0. So the difference between the areas of the 
            |inscribed-rectangles|inscribed rectangles||, the
            |circumscribed-rectangles|circumscribed rectangles||, and the |figure|figure|| in between them becomes arbitrarily close to 0. 
            For the current figure, that |widthest-rectangular|single rectangle|| is on the `,
            {
                'default' : 'left',
                'highest y is on the right' : 'right',
            },

            `.`
]


///// next text: ////////////////////

//=================================================
// \\// Do fill texts here
//=================================================



};}
}) ();

