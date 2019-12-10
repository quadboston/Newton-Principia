( function() {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );

    mat.calculate_divided_differences = calculate_divided_differences;
    return;





    ///constructs Newton's polynomial
    function calculate_divided_differences( pointsXY )
    {
        var n = pointsXY.length;

        //Newton's divided differences indexed by levels:
        //F[level][index]=[ x, dd ]
        var F = [];

        //F[0] = pointsXY.map( p => [p[1], p[0], p[0]];
        F[0] = pointsXY.concat( [] );

        ///constructs levels interactively
        for( var level=1; level<n; level++ ) {
            F[ level ] = Flow_2_Ftop( F[ level-1 ] );
        }
        return { coefficients:F, calculate_polynomial }; 



        function Flow_2_Ftop( Flow )
        {
            var Ftop = [];
            var m1 = Flow.length-1;
            for( var i=0; i<m1; i++ ) {
                var F2 = Flow[i+1];
                var F1 = Flow[i];

                var x2 = F2[0];
                var x1 = F[0][i][0];
                var dif = x2-x1;
                var dd = ( F2[1] - F1[1] ) / dif;
                Ftop[ i ] = [ x2, dd ];
            }
            return Ftop;
        }

        //calculates Newton's polynomial at point x
        function calculate_polynomial( x )
        {
            var x0 = F[0][0][0];
            var factors = 1;
            var poly = F[0][0][1];
            for( var i=1; i<n; i++ ) {
                factors *= ( x - F[i-1][0][0] );
                poly += F[i][0][1]*factors;
            }
            return poly;
        }
    }

}) ();


