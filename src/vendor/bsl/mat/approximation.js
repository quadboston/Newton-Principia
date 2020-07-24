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
        //  j = level,
        //  F[ j ][ i ]=[ x, dd ] = [ xj, dij ]
        //  initial level = 
        //  F[0    ][i    ]=[ xi, yi ]
        var F = [];
        F[0] = pointsXY.concat( [] );

        ///constructs levels-above-initial interactively
        for( var level=1; level<n; level++ ) {
            F[ level ] = Flow_2_Ftop( F[ level-1 ] );
        }
        return { coefficients:F, calculate_polynomial, derivativeAtZero }; 



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
                //x2 = x[i+j+1],
                //dd = (d[j][i+1]-d[j][i]) / (x[i+j+1]-x[i]),
                //where j is a low-level;
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
        //checks the job;
        //var dd = mat.calculate_divided_differences( xy ).calculate_polynomial;
        //var Sx = sconf.pname2point.S.pos[0];
        //var rr = dd( Sx );
        //ccc( 'compare: xexp='+Sx + ' yexp=' + sconf.pname2point.R.pos[1] + ' res=' + rr);


        ///calculates_derivative_at_point_zero
        function derivativeAtZero()
        {
            var der = 0;
            var n = F.length; //polynomial's degree
            var xProduct = [ 1 ];       //index is level
            var reversalsSum = [ 1 ];   //index is level
            var unitDegree = [ -1 ];   //index is level
            ///loops via polynomial's derivative members
            for( var i = 1; i < n; i++ ) {
                //calculates common arrays:
                xProduct[i]     = xProduct[i-1] * F[0][i-1][0];
                reversalsSum[i] = reversalsSum[i-1] + ( 1/F[0][i-1][0] );
                unitDegree[ i ] = -unitDegree[ i-1 ];
                //calculates member's contribution:
                der += F[i][0][1] * xProduct[i] * reversalsSum[i] * unitDegree[i];
            }
            return der;
        }

    }

}) ();


