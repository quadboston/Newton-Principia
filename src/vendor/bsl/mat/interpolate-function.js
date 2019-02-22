// this coding has been suspended because of no need now ...

( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );

    mat.interpolateFunction = interpolateFunction;
    //00000000000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000000000




    function interpolateFunction( x, controlPoints )
    {
        var pts = controlPoints;
        var cplen = controlPoints.length;
        var sum = 0;

        for (var i=0; i<cplen; i++) {
	        var num = pts[i].y;
	        var den = 1;
	        for (var j = 0; j < cplen; j++ ) {
		        if (j == i) {
			        continue;
		        }
		        num *= (x - pts[j].x);
	        }
	        for (var j=0; j<pts.length; j++) {
		        if (j == i) {
			        continue;
		        }
		        var diff = pts[i].x - pts[j].x;
		        if (diff != 0) {
			        den *= diff;
		        } else {
			        den = .4;
		        }
	        }
	        sum += (num/den);
        }
        return sum;
    }

    //:test
    //ccc( integral.polynomial( 0, 1, 1, 1, 1 ) ); //11/6 = 1.8333...
    //ccc( integral.polynomial( 1, 1, 1, 1, 1 ) ); //2.0833...

}) ();


