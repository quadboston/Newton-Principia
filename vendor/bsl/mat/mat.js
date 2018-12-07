( function() {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );




    ///Returns:  [] if no solutions
    ///          [ number ] if one solution
    ///          [ number, number ] if real solutions
    ///          [ [...], [...] ] if complex solutions
    ///
    ///Version history: similar to used in .../square/...
    ///                 /march18-98-bezier-threads-predelivey/js/paint-bubbles-and-threads.js
	mat.squarePolyRoot = function( aa, bb, cc )
    {
        if( aa === 0 ) {
            if( bb === 0 ) {
                return cc === 0 ? [1,2,3] : [];
            } else {
                return [ -cc/bb ];
            }
        } else {
            var scale = 1 / ( 2 * aa );
            var center = -bb * scale;
            var discr = bb*bb - 4*aa*cc;
            if( discr < 0 ) {
                var complex = 1;
                discr = -discr;
            }
            var main = Math.sqrt( discr ) * scale;
            return complex ?
                [ [ center, main ], [ center, -main ] ] :
                [ center+main, center-main ];
        }
    };

    //:tests it by not going too far
    //ccc( '0, 0, -2: []        =', mat.squarePolyRoot( 0, 0, -2 ) );
    //ccc( '0, 1, -2: [2]       =', mat.squarePolyRoot( 0, 1, -2 ) );
    //ccc( '1,-2,  0: [0,2]     =', mat.squarePolyRoot( 1, -2, 0 ) );
    //ccc( '1,-2,  2: [1+i, 1-i]=', mat.squarePolyRoot( 1, -2, 2 ) );

}) ();


