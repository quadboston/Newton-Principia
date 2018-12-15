( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var integral    = sn( 'integral', mat );



    ///calculates integral from 0 to x of dx^3+ax^2+bx+c
    integral.polynomial = function( d, a, b, c, x )
    {
        return ( ( ( d/4*x + a/3 ) * x + b/2 ) * x + c ) * x;
    }

    //:test
    //ccc( integral.polynomial( 0, 1, 1, 1, 1 ) ); //11/6 = 1.8333...
    //ccc( integral.polynomial( 1, 1, 1, 1, 1 ) ); //2.0833...

}) ();


