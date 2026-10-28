///micro framework: sets ellipse calculator
///with parameter s proportional to curve's length
///see "setup()"
///copyright: MIT License, 2023 (c) Konstantin Kirillov
/*
Alternative solutions and links:

Full solution, via power series fi=F(dE).
https://www.authorea.com/users/5445/articles/176209-on-the-inverse-of-e-%CF%95-k/_show_article
based on inverting series:
https://archive.lib.msu.edu/crcmath/math/math/s/s214.htm
Has more refs.
(Dwight 1961, Abramowitz and Stegun 1972, p. 16). A derivation of the explicit formula for the $n$th term is given by Morse and Feshbach (1953),

https://duetosymmetry.com/code/elliptic-integrals-in-javascript/
https://math.stackexchange.com/questions/172766/calculating-equidistant-points-around-an-ellipse-arc

Generics:
https://en.wikipedia.org/wiki/Ellipse#Circumference
https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_second_kind

inverse of second kind E
https://math.stackexchange.com/questions/1123360/inverse-of-elliptic-integral-of-second-kind

relates?:
https://reference.wolfram.com/language/ref/InverseBetaRegularized.html

in depth: possible solutions:
https://www.semanticscholar.org/paper/On-the-Series-Expansion-Method-for-Computing-of-the-Vel-Vel/dc0e0759997c3cf4a6990ff3b602d868016bb884
        symmetric: https://www.semanticscholar.org/paper/Series-expansions-of-symmetric-elliptic-integrals-Fukushima/4e3af3ebb01f2ece0cf17d07f55ada6d0315f4fc


*/


( function() {
    var cc = console.log;

    //========================================================
    cc( '***** test 1: circle R=1;' );
    //========================================================
    //sets function s2xy up
    //5 digits accuracy:
    var { s2xy, is2ix, x2y, fullLength } = setup( 100000, 1, 1 )
    //now we can calculate the s2xy as many times as we want
    //for example, in following three points s=0, s=½, s=2/3:
    cc( s2xy( 0 ) );
    cc( '[1/√2,1/√2]=', s2xy( 1/2 ) );
    cc( '[½√3, ½]=',s2xy( 2/3 ) );
    cc( 's=1,  fullLength*2=π='+(2*fullLength) );
    //========================================================

    //========================================================
    cc( '\n***** test 2: ellipse: (x/2)²+ (x/3)² = 1:' );
    //========================================================
    //sets function s2xy up
    var { s2xy, is2ix, x2y, fullLength } = setup( 1000, 2, 3 )
    //now we can calculate the s2xy as many times as we want
    //for example, in following three points s=0, s=½, s=2/3:
    cc( s2xy( 0 ) );
    cc( 's=½', s2xy( 1/2 ) );
    cc( 's=2/3',s2xy( 2/3 ) );
    cc( 's=1,  fullLength = '+fullLength );
    //========================================================
    return;



    ///sets up a framework,
    ///Input: a = semiaxis x
    ///       b = semiaxis y
    function setup( ACCURACY, a, b ) {
        const A = ACCURACY;
        const dx = a/A;
        const alpha = 1/a;
        let fullLength;

        let is2ix = []; //working array, does map index of s to index of x
        let ss = [];    //temporary local array, length
        let y0 = b;
        let s = 0;
        for( ix=0; ix<=A; ix++ ) {
            let x = dx*ix;
            let y = x2y( x );
            let dy = y - y0;
            let ds = Math.sqrt( dx*dx + dy*dy );
            s += ds;
            ss[ix] = s;
            y0 = y;
        }
        s2rescaledIndex();
        return { s2xy, fullLength, is2ix, x2y };


        ///temporary function,
        ///rescales s to its index
        function s2rescaledIndex()
        {
            fullLength = ss[A];
            let scale = A/fullLength;
            let is = 0; //index of length
            for( ix=0; ix<=A; ix++ ) {
                s = ss[ix] * scale;
                while( is <= s ) {
                    is2ix[is] = ix;
                    is++;
                }
            }
        }
    
        ///Final production function. Maps parameter s to point [x,y].
        ///Input: s is in [0,1],
        ///s = 0 is for [x,y] = [0,b], s=1 is for [x,y] = [a,0], 
        ///Output: [x,y]
        function s2xy( s ) {
            let is = Math.floor( s*A );
            let x = dx * is2ix[ is ];
            return [ x, x2y(x) ];
        }

        ///ellipse itself as y(x)
        function x2y( x ) {
            let xx = x * alpha;
            return b * Math.sqrt( 1 - xx*xx );
        }
    }

}) ();


