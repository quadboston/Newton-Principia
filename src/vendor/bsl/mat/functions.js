( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    mat.poly = poly;
	mat.squaredDistance = squaredDistance;
    return;


    ///Calculates polynomial.
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


	function squaredDistance(p1, p2) {
		const dx = p1.pos[0] - p2.pos[0];
		const dy = p1.pos[1] - p2.pos[1];
		return dx * dx + dy * dy;
	}
}) ();
