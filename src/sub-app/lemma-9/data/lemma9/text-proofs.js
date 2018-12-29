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
For while points |point_B|B|| and |point_C|C|| approach point |point_A|A||,
let |AD|AD|| be understood always to be produced to the distant points |point_d|d|| and |point_e|e||,
so that |Ad|Ad|| and |Ae|Ae|| are proportional to |AD|AD|| and |AE|AE||;

and erect ordinates |db|db|| and |ec|ec||
parallel to ordinates |DB|DB|| and |EC|EC||
and meeting |AB|AB|| and |AC|AC||, produced, at |point_b|b|| and |point_c|c||.

Understand the curve |Abc|Abc|| to be drawn similar to |ABC|ABC||, and
the straight line |Ag|Ag|| to be drawn touching both curves at |point_A|A|| and
cutting the ordinates |DB|DB||, |EC|EC||, |db|db||, and |ec|ec|| at F, G, |point_f|f||, and |point_g|g||.

Then, with the length |Ae|Ae|| remaining the same,
let points |point_B|B|| and |point_C|C|| come together with point |point_A|A||; and as the angle cAg vanishes,

the curvilinear areas |Abd|Abd|| and |Ace|Ace|| will coincide with the
rectilinear areas |Afd|Afd|| and |Age|Age||,
and thus (by lem. 5) will be in the squared ratio of the sides |Ad|Ad|| and |Ae|Ae||.

But areas |ABD|ABD|| and |ACE|ACE|| are always proportional to these areas,
and sides |AD|AD|| and |AE|AE|| to these sides.

Therefore areas |ABD|ABD|| and |ACE|ACE|| also are ultimately 
in the squared ratio of the sides |AD|AD|| and |AE|AE||.  Q.E.D.


`,







///// next text: ////////////////////
hypertext : `
Make an |Abd Ace|enlargement|| of the |ABD ACE|two original triangles||, and place them such that they still share the same |point_A|point|| and |Ae|straight line|| shared by the |ABD ACE|original triangles||.

As the |ABD ACE|two original triangles|| shrink, keep the length of the |Ae|shared line|| for the |Ace|largest triangle|| the same length, and adjust the |Ab Ac db ec|other sides|| and |Abc|curve|| of the |Abd Ace|enlarged triangles|| as necessary so that they continue to be |Abd Ace|enlarged versions|| of the |ABD ACE|shrinking triangles||.

In the limit, as the |ABD ACE|two original triangles|| shrink, the |Abc|curve|| that bounds the |Abd Ace|two enlarged curvilinear triangles|| flattens to a |Ag|straight line||, meaning the |Abd Ace|two enlarged curvilinear triangles|| become |Afd Age|two linear triangles||. By Lemma 5, we know the ratio of the areas of these |Afd Age|two linear triangles|| will be equal to the squared ratio of their |Ad Ae|matching sides||.

We also know that |Ad Ae|matching sides|| of the |Abd Ace|enlarged triangles|| must have the same ratio to each other as |AD AE|matching sides|| of the |ABD ACE|original triangles||.

So in the limit, the |ABDPerACE|ratio of the areas|| of the |ABD ACE|original triangles|| converge to the same |AD2AE|ratio as the squares|| of their |AD AE|sides||.
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

