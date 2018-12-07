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
    var drg_own     = sn('lemma9', drg);
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
Consider |ABD ACE|two triangles|| formed in the following way: they are bounded by a |AE|straight line|| and a |ABC|curved line|| which intersect at a certain |point_A|point||, and these lines are connected by two |BD EC|parallel lines||. As the |BD EC|parallel lines|| approach the mentioned |point_A|point||, in the limit, the |ABDPerACE|ratio of the triangles’ areas|| equals the |AD2AE|squared ratio|| of their |AD AE|sides||.
`,





///// next text: ////////////////////
english : `
If a right line |AE|AE|| and
a curve line |ABC|ABC||,
both given by position,
cut each other in a given angle; and
to that right line,
in another given angle, |BD|BD||, |EC|CE|| are ordinately applied,
meeting the curve in |point_B|B||, |point_C|C||;
and the points B and C together approach towards, and meet in, the point |point_A|A||:
I say that the areas of the triangles |ABD|ABD||, |ACE|ACE||, will ultimately be one to the other
in the |AD2AE|duplicate ratio|| of the sides.


`,




///// next text: ////////////////////
latin : `
Si recta |AE|AE|| &
If a right line |AE|AE|| and

curva |ABC|ABC||
a curve line |ABC|ABC||,

positione datæ
both given by position,

se mutio secent in angulo dato A, &
cut each other in a given angle; and

ad rectam illam
to that right line,

in alio dato angulo ordinatim applicentur |BD|BD||, |EC|CE||
in another given angle, |BD|BD||, |EC|CE|| are ordinately applied,

curvæ occurrentes in |point_B|B||, |point_C|C||,
meeting the curve in |point_B|B||, |point_C|C||;

dein puncta |point_B|B||, |point_C|C|| simul accedant and punctum |point_A|A||:
and the points |point_B|B|| and |point_C|C|| together approach towards, and meet in, the point |point_A|A||:

dico quod areæ triangulorum |ABD|ABD||, |ACE|ACE|| erunt ul[t]imo invicem 
I say that the areas of the triangles |ABD|ABD||, |ACE|ACE||, will ultimately be one to the other

in |AD2AE|duplicata ratione|| laterum.
in the |AD2AE|duplicate ratio|| of the sides.

`
//=================================================
// \\// Do fill texts here
//=================================================




};}
}) ();

