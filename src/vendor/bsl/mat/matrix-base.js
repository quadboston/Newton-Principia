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
    mat.dropLine            = dropLine;
    mat.pointPlusTVector    = dropLine;
    mat.lineSegmentsCross   = lineSegmentsCross;
    mat.angleBetweenLines   = angleBetweenLines;
    mat.angleBetweenLineSegments = angleBetweenLines; //todm remove aliasing
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

    //intersection of two lines to be found:
    //u,u' are (non necessarily unit) vectors, v,v' initial positions,
    //q,q' line parameters:
    //q*u + v = q'*u' + v' needs to be solved against q,q' to find the cross
    //or xu - yus = vs - v = z, when q,q' are renamed with x,y
    function linesCross(
        u,  //direction-1
        v,  //start-1
        us, //direction-2'
        vs  //start-2'
    ) {
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


    ///returns intersection of two lines built upon line segments
    ///(A,B) and (AS,BS)
    function lineSegmentsCross( A, B, AS, BS ) {
        var u = [ B[0] - A[0], B[1] - A[1] ];
        var us = [ BS[0] - AS[0], BS[1] - AS[1] ];
        return linesCross( u,A,us,AS );
    }

    ///drops perpendicular which starts at point S and is
    ///a perpendicular to line segment AB,
    ///input:   point S and two points A,B
    ///returns: endPoint of perpendicular which is a point at cross of perpendicular and line AB
    function dropPerpendicular( S, A, B )
    {
        //direction of line AB = line segment from start point A to end point B
        var u = [ B[0] - A[0], B[1] - A[1] ];
        //start point of line AB
        var v = [        A[0],        A[1] ];

        //direction of the perpendicular to line AB
        var us = [ u[1], -u[0] ];             
        //start point of the perpendicular
        var vs = S;

        return linesCross( u,v,us,vs );
    }

    ///adds t*(vector-AB) to point start
    ///inputs:    A,B,start - 2-dim. vectors,
    ///           t - distance parameter,
    ///returns:   u = start + (B-A)*t
    function dropLine(
        t,
        A,
        B,
        start, //optional
    ){
        start = start || A;
        var u = [ B[0] - A[0], B[1] - A[1] ];
        return [ start[0] + u[0]*t, start[1] + u[1]*t ];
    }

    /*
    ///inputs:  vector1=[ startPoint, endPoint ],
    ///         vector2=[ startPoint, endPoint ],
    ///outputs: angele between 0 and PI,
    function positiveAngleBetweenLines([
        vector1,
        vector2,
    ]) {
        var unitVector1 = p1_to_p2( vector1[0], vector1[1] ).unitVec;
        var unitVector2 = p1_to_p2( vector2[0], vector2[1] ).unitVec;
        var cos = unitVector1[0]*unitVector2[0] + unitVector1[1]*unitVector2[1];
        return { cos, angle:Math.acos( cos ) };
    }
    */

    ///partially tested
    ///inputs:  vector1=[ startPoint, endPoint ],
    ///         vector2=[ startPoint, endPoint ],
    ///outputs: angele from vector1 to vector2 in range -PI to PI,
    ///         counterclockwise direction is positive,
    function angleBetweenLines([
        vector1,
        vector2,
    ]) {
        var unitVector1 = p1_to_p2( vector1[0], vector1[1] ).unitVec;
        var unitVector2 = p1_to_p2( vector2[0], vector2[1] ).unitVec;
        var cos = unitVector1[0]*unitVector2[0] + unitVector1[1]*unitVector2[1];
        var sin = unitVector1[0]*unitVector2[1] - unitVector1[1]*unitVector2[0];
        return { cos, sin, angle:Math.atan2( sin, cos ) };
    }


}) ( window );

