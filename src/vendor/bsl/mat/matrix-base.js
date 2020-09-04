// //\\// Simple matrix operations.
//        (c) 2017 Konstantin Kirillov. License MIT.
//        Origin taken from: /var/www/html/bids/done/SMALL/ww/calibrator/now/vendor/btb/matrix.js. Nov. 2014.


( function ( window ) {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );




    /*
        Title:      summ of vectors with weights a,b
        Action:     returns vectors linear combination aA+bB
        Input:
            A,B     - sum of A,B
            a,A     - product aA
            A,b,B   - comb A+bB
            a,A,b,B - comb aA+bB
    */
    mat.sm = function( arg )
    {
        var a = 1;
        var b = 1;
        var B = [0,0];
        var A;
        var ar = arguments;

        if( typeof ar[0] === 'number' ) { 
            a = ar[0]; A = ar[1];
            if( ar.length === 4 ) { b = ar[2]; B = ar[3]; }
        } else {
            A = ar[0];
            if( ar.length === 3 ) {
                b = ar[1];
                B = ar[2];
            } else {
                B = ar[1];
            }
        }
        return [
                    a*A[0]+b*B[0],
                    a*A[1]+b*B[1]
               ];
    }

    /*
    //subtracts vectors
    function mn( A, B ) { return [ A[0] - B[0], A[1] - B[1] ]; }
    */

    mat.unitVector          = unitVector;
    mat.p1_to_p2            = p1_to_p2;
    mat.linesCross          = linesCross;
    mat.dropPerpendicular   = dropPerpendicular;
    return;



    ///gets vector's abs value and its direction:
    function unitVector( vector )
    {
        var v2 = vector[0]*vector[0] + vector[1]*vector[1];
        var v = Math.sqrt( v2 );
        return {
            abs     : v,
            unitVec : v < 1e-40 ? [0,0] : [ vector[0]/v, vector[1]/v ]
        };
    }


    ///gets vector's abs value and it's direction from
    ///vector tips p1, p2
    function p1_to_p2( p1, p2 )
    {
        return unitVector( [ p2[0]-p1[0], p2[1]-p1[1] ] );
    }

    //intersection of two lines u,v and u'v' has to be found:
    //u,u' are (non necessarily unit) vectors, v,v' initial positions,
    //q,q' line parameters:
    //q*u + v = q'*u' + v' needs to be solved against q,q' to find the cross
    //or xu - yus = vs - v = z, when q,q' are renamed with x,y
    function linesCross( u,v,us,vs ) {
        //ccc( 'u=', u, 'v=',v, 'us=', us, 'vs=', vs);
        //builds determinant
        var a = u[0];
        var b = -us[0];
        var c = u[1];
        var d = -us[1];
        var det = a*d - c*b;
        //ccc( 'a,b,c,d=', a,b,c,d );
        //builds inverse matrix
        var A = d/det;
        var B = -b/det;
        var C = -c/det;
        var D = a/det;
        //ccc( 'inverse=', A,B,C,D );

        //this must give 1,0,0,1 if program is correct:
        //ccc( 'checks im=',A*a + B*c, A*b + B*d, C*a + D*c, C*b+D*d );

        //var free members    
        var z0 = vs[0] - v[0];
        var z1 = vs[1] - v[1];
        //finds parameters x,y
        var x = A*z0 + B*z1;
        //var y = C*z0 + D*z1;
        var r = [x*u[0]+v[0], x*u[1]+v[1]];

        //to check the job, compare r and rs, they must be equal
        //var rs = [y*us[0]+vs[0], y*us[1]+vs[1]];
        //ccc( 'solution1=', r );
        //ccc( 'solution2=', rs );

        return r;
    }

    ///input:   point S and two points A,B
    ///returns: cross of perpendicular from S to line AB
    function dropPerpendicular( S, A, B )
    {
        var u = [ B[0] - A[0], B[1] - A[1] ];
        var v = [        A[0],        A[1] ];
        var us = [ u[1], -u[0] ];
        var vs = S;
        return linesCross( u,v,us,vs );
    }



}) ( window );

