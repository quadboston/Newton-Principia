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
        Consider any |figure|figure|| bounded by a |curve|curve||, a |base|base||, and a |wall|side||. 
        Its |base|base|| can be divided into any number of equal-length bases
        for |inscribed-rectangles|inscribed rectangles|| and |circumscribed-rectangles|circumscribed rectangles||. 
        If we increase the number of these rectangles indefinitely, 
        then the areas of the |figure|figure||, the |inscribed-rectangles|inscribed rectangles||, and the
        |circumscribed-rectangles|circumscribed rectangles|| all converge to the same value.
`,





///// next text: ////////////////////
english : `
        If in any figure |figure|AacE||, 
        comprehended by the straight lines |wall|Aa|| and |base|Ae|| and the |curve|curve acE||, 
        any number of parallelograms |inscribed-rectangles|Ab, Bc, Cd||, ... 
        are inscribed upon equal bases AB, BC, CD, ...

        and have sides Bb, Cc, Dd, ... 
        parallel to the |wall|side Aa|| of the figure; 
        and if the parallelograms aKbl, bLcm, cMdn, ... are completed; 
        if then the width of these parallelograms is diminished and their number increased indefinitely, 

        I say that the ultimate ratios which the |inscribed-rectangles|inscribed figure AKbLcMdD||, 
        the |circumscribed-rectangles|circumscribed figure AalbmcndoE||, 
        and the |figure|curvilinear figure AabcdE|| 
        have to one another are ratios of equality.    −Cohen translation

`,


///// next text: ////////////////////
latin : `
        Si in figura quavis |figure|AacE|| 
        rectis |wall|Aa||, |base|AE||, & |curve|curva acE|| comprehensa, 
        inscribantur parallelogramma quotcunq; |inscribed-rectangles|Ab, Bc, Cd||, 
        &c. sub basibus AB, BC, CD, &c. æqualibus, 

        & lateribus Bb, Cc, Dd, &c. 
        figuræ |wall|lateri Aa|| parallelis contenta; 
        & compleantur parallelogramma aKbl, bLcm, cMdn, &c. 
        Dein horum parallelogrammorum latitudo minuatur, & numerus augeatur in infinitum: 

        dico quod ultimæ rationes, quas habent ad se invicem figura |inscribed-rectangles|inscripta AKbLcMdD||, 
        |circumscribed-rectangles|circumscripta AalbmcndoE||, 
        & |figure|curvilinea AabcdE||, 
        sunt rationes æqualitatis.
`
//=================================================
// \\// Do fill texts here
//=================================================




};}
}) ();

