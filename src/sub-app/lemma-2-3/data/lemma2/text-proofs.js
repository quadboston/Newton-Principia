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
latin : `
            Nam figuræ |inscribed-rectangles|inscriptæ|| & |circumscribed-rectangles|circumscriptæ|| differentia 
            est summa parallelogrammorum Kl + Lm + Mn + Do, 
            hoc est (ob æquales omnium bases)
            rectangulum sub unius basi Kb 
            & altitudinum summa Aa, id est rectangulum |widthest-rectangular|ABla||. 
            
            Sed hoc rectangulum, eo quod latitudo ejus AB in infinitum minuitur, sit minus quovis dato. 
            Ergo per Lemma I, figura |inscribed-rectangles|inscripta|| & |circumscribed-rectangles|circumscripta|| & 
            multo magis |figure|figura curvilinea|| intermedia fiunt ultimo æquales. Q. E. D.
`,


///// next text: ////////////////////
english : `
            For the difference of the |inscribed-rectangles|inscribed|| and |circumscribed-rectangles|circumscribed|| figures 
            is the sum of the parallelograms Kl, Lm, Mn, and Do, 
            that is (because they all have equal bases), 
            the rectangle having as base Kb (the base of one of them) 
            and as altitude |wall|Aa|| (the sum of the altitudes), that is, the rectangle |widthest-rectangular|ABla||.

            But this rectangle, because its width AB is diminished indefinitely, becomes less than any given rectangle. 
            Therefore (by lem. 1) the |inscribed-rectangles|inscribed figure|| and the |circumscribed-rectangles|circumscribed figure|| and, 
            all the more, the intermediate |figure|curvilinear figure|| become ultimately equal.  Q.E.D.

`,


///// next text: ////////////////////
hypertext :
[
     `
            The diffference in area between the |inscribed-rectangles|inscribed rectangles|| and |circumscribed-rectangles|circumscribed rectangles|| 
            is equal to the area of a |widthest-rectangular|single rectangle|| on the end. 
            As the number of rectangles is increased indefinitely, the width of each
            decreases indefinitely, including the |widthest-rectangular|single rectangle|| just mentioned. 
            Since its width decreases indefinitely,
            its area decreases indefinitely, becoming arbitrarily close to 0. So the difference between the areas of the
            |inscribed-rectangles|inscribed rectangles||, the
            |circumscribed-rectangles|circumscribed rectangles||, and the |figure|figure|| in between them becomes arbitrarily close to 0. For the current figure, 
            that |widthest-rectangular|single rectangle|| is on the `,

            //this is a sample how to set dependency on application mode:
            //application modes store is in the JS-object: ns.fapp.ss.ssData.ssModes'
            //see, for example, how ssModes is set in module gui-update.js:
            //  ssModes[ 'highest y is on the right' ] =  wfirst[1] > wlast[1];
            //  in other words format is: ssModes[key]=boolean-value
            //  the same key is used below
            //if no key is set, then 'default' is in use:
            {
                'default' : 'left',
                'highest y is on the right' : 'right',
            },

            `.`
]

//=================================================
// \\// Do fill texts here
//=================================================



};}
}) ();
