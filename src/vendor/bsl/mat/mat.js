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


    mat.ellipse = ellipse;
    return;



    ///input:   ellipse = r = [ a*cos(t+t0) + x0, b*sin(t+t0) + y0 ];
    //          rotationRads rotates around position x0,y0;
    ///returns: point x,y at parameter t and other data
    function ellipse( args )
    {
        var { t, a, b, x0, y0, t0, rotationRads } = args;
        var rC = Math.cos( rotationRads );
        var rS = Math.sin( rotationRads );
        var t0 = t0 || 0;

        var cos = Math.cos(t+t0);
        var sin = Math.sin(t+t0);
        var xx = a*cos;
        var yy = b*sin;

        var tan = [ -sin*a, cos*b ]; //~dr/dt
        var wwt = Math.sqrt( tan[0]*tan[0] + tan[1]*tan[1] );
        tan = [ tan[0]/wwt, tan[1]/wwt ];
        var tanX = tan[0] * rC - tan[1] * rS;
        var tanY = tan[0] * rS + tan[1] * rC;

        var x = xx * rC - yy * rS + x0;
        var y = xx * rS + yy * rC + y0;

        return { x, y, cos, sin, tangent:[tanX,tanY], args};
    }

}) ();


