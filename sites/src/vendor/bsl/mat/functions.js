( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );

    mat.taylorPoly = taylorPoly;
    mat.poly = poly;
    return;



    ///Calculates Taylor polinomial.
    ///Loops from low-coefficients to high which gives inaccurate accuracy for long polynomials.
    function taylorPoly( x, coefficients )
    {
        var fun = coefficients[0];
        var factorial = 1;
        var power = 1;
        var length = coefficients.length;
        for( ix=1; ix<length; ix++ ) {
            factorial /= ix;
            power *= x;

            //todm: speed:
            //var coef = coefficients[ix];
            //if( coef === 0 ) continue;

            fun += power * factorial * coefficients[ix];
        }
        return fun;
    }
    //:Taylor expansion test
    /*
    ccc( mat.taylorPoly( 1, [2, 3] ) ); //5
    ccc( mat.taylorPoly( 2, [3, 5, 1] ) ); //15
    var x = 0.1;
    var sine = [ 0, 1, 0, -1, 0,  1, 0, -1, 0,  1, 0, -1, 0, ];
    ccc( Math.sin( x ), mat.taylorPoly( x, sine) );
    var x = Math.PI/2;
    ccc( Math.sin( x ), mat.taylorPoly( x, sine) );
    */





    ///Calculates polinomial.
    ///Loops from low-coefficients to high which gives inaccurate accuracy for long polynomials.
    function poly( x, coefficients )
    {
        var fun = coefficients[0];
        var power = 1;
        var length = coefficients.length;
        for( ix=1; ix<length; ix++ ) {
            power *= x;
            var coef = coefficients[ix];
            if( coef === 0 ) continue;
            fun += power * coef;
        }
        return fun;
    }

}) ();


