// //\\// Simple matrix operations.
//        (c) 2017 Konstantin Kirillov. License MIT.
//        Origin taken from: /var/www/html/bids/done/SMALL/ww/calibrator/now/vendor/btb/matrix.js. Nov. 2014.


( function ( window ) {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );





    /*
    //subtracts vectors
    function mn( A, B ) { return [ A[0] - B[0], A[1] - B[1] ]; }
    */
    mat.rotatesVect         = rotatesVect;
    mat.unitVector          = unitVector;
    mat.vector2normalOrts   = vector2normalOrts;
    mat.p1_to_p2            = p1_to_p2;
    mat.linesCross          = linesCross;
    mat.dropPerpendicular   = dropPerpendicular;
    mat.dropPerpendicularDetails = dropPerpendicularDetails;
    mat.dropLine            = dropLine;
    mat.pointPlusTVector    = dropLine;
    mat.lineSegmentsCross   = lineSegmentsCross;
    mat.angleBetweenLines   = angleBetweenLines;
    mat.sm                  = sm;
    mat.sm3                 = sm3;
    mat.scalarProduct       = scalarProduct;
    mat.angleBetweenLineSegments = angleBetweenLines; //todm remove aliasing
    return;




    /*
        Purpose:    to get aA+bB,  combination of vectors A and B,
        Action:     returns vectors linear combination aA+bB
        Condition:  for 2 dimensional vectors by default,
                    if A.length === 3, then A,B treatead as 3 dimensional.
        Input:
            arguments signature options:
                A,B     - sum of A,B
                a,A     - product aA
                A,b,B   - comb A+bB
                a,A,b,B - comb aA+bB
    */
    function sm( arg )
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
        var ret = [
                    a*A[0]+b*B[0],
                    a*A[1]+b*B[1]
               ];
        if( A.length === 3 ) {
            ret.push( a*A[2]+b*B[2], );
        }
        return ret;
    }






    ///Output: lin. comb. of two 3d vect.
    function sm3( a1, v1, a2, v2 )
    {
        return [
            a1 * v1[0] + a2 * v2[0],
            a1 * v1[1] + a2 * v2[1],
            a1 * v1[2] + a2 * v2[2],
        ];
    }


    ///gets vector's abs value and its direction:
    ///for 2d and 3d vectors
    function unitVector(
        vector,
        doDenullify //optional, makes vector non zero
    ){
        var is3d = vector.length === 3;
        var v2 = vector[0]*vector[0] + vector[1]*vector[1];
        if( is3d ) {
            v2 += vector[2]*vector[2];
        }
        var abs = Math.sqrt( v2 );
        if( abs < 1e-100 && doDenullify ) {
                var unitVec = [1e-100,0,0];
                var abs = 1e-100;
                var v2 = abs * abs;
        } else {
            if( is3d ) {
                var unitVec = abs < 1e-40 ? [0,0,0] :
                    [ vector[0]/abs, vector[1]/abs, vector[2]/abs, ];
            } else {
                var unitVec = abs < 1e-40 ? [0,0] : [ vector[0]/abs, vector[1]/abs ];
            }
        }
        return {
            abs,
            v2, //square of vector, todo minor discrepancy: must be abs*abs
            unitVec,
            //vector,  //must be good extension to story original in this wrapper
        };
    }



    ///gets scalar product of two vectors,
    ///mostly for shortening names of variables
    function scalarProduct(
        v1,
        v2,
    ){
        return v1[0]*v2[0] + v1[1]*v2[1];
    }

    ///rotates two-dimenstional vector anti-clockwidse
    function rotatesVect( v, angle,
        sn, cs // sin or cos - alternative arguments
    ){
        if( typeof angle !== 'undefined' ) {
            sn = Math.sin( angle );
            cs = Math.cos( angle );
        }
        return [
            v[0] * cs - v[1] * sn,
            v[0] * sn + v[1] * cs,
        ];
    }




    ///Given 2d-vector in input, returns unit normal to it.
    ///Normal = anticlockwise-PI/2-turned-given-vector.
    ///If abs < 1e-100, then norm and unit are constructed arbitrarily,
    ///
    ///
    ///3d functionality is not enough tested:
    ///Given 3d-vector in input, returns two unit normals to it.
    ///     which both normals are orhtogonal.
    function vector2normalOrts( vector )
    {
        var is2d = vector.length == 2;
        var v2 = vector[0]*vector[0] + vector[1]*vector[1];
        if( !is2d ) {
            v2 += vector[2]*vector[2];
        }
        var abs = Math.sqrt( v2 );
        if( abs < 1e-100 ) {
            var unit = [1,0];
            vector[2] = 0;
        } else {
            var unit = [ vector[0]/abs, vector[1]/abs, ];
        }
        if( is2d ) {
            //vector in plane
            var norm = [ -unit[1], unit[0] ];
            var ret = { abs, norm, unit };
        } else {
            //vector in 3d space
            abs = abs < 1e-100 ? 1e-100 : abs;
            unit.push( vector[2]/abs );
            var normSeed = [];
            for( var mIx=0; mIx<3; mIx++ ) {
                var uCur = Math.abs( unit[ mIx ] );
                if( uCur < uMin || mIx === 0 ) {
                    if( mIx > 0 ) {
                        normSeed[ minIx ] = 0;
                    }
                    var minIx = mIx;
                    var uMin = uCur;
                    normSeed[ mIx ] = 1;
                } else {
                    normSeed[ mIx ] = 0;
                }
            }
            //ccc( 'minIx=' + minIx + ' uMin=' + uMin );
            var norm1 = [
                unit[1]*normSeed[2] - unit[2]*normSeed[1],
                -unit[0]*normSeed[2] - unit[2]*normSeed[0],
                unit[0]*normSeed[1] - unit[1]*normSeed[0],
            ];
            norm1 = unitVector( norm1 ).unitVec;
            var norm2 = [
                unit[1]*norm1[2] - unit[2]*norm1[1],
                -unit[0]*norm1[2] - unit[2]*norm1[0],
                unit[0]*norm1[1] - unit[1]*norm1[0],
            ];
            var ret = { abs, orts : [ norm1, norm2, ], unit };
            //ccc( 'ret=', ret );
        }
        return ret;
    }





    ///gets vector's abs value and it's direction for vector p2-p1
    function p1_to_p2(
        p1,
        p2,
        doDenullify //makes vector non zero
    ){
        const vector = [ p2[0]-p1[0], p2[1]-p1[1] ];
        const res = unitVector( vector );
        res.vector = vector;
        return res;
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
        const inverse = mat.inverse2x2([
            [u[0], -us[0]],
            [u[1], -us[1]]]);
        var A = inverse[0][0];
        var B = inverse[0][1];

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

    function dropPerpendicularDetails( S, A, B )
    {
        //direction of line AB = line segment from start point A to end point B
        var lineForPerp = [ B[0] - A[0], B[1] - A[1] ];
        var lAbs = Math.sqrt( lineForPerp[0]*lineForPerp[0] + lineForPerp[1]*lineForPerp[1] );
        lAbs = Math.max( lAbs, 1.e-150 );
        var unitLine = [ lineForPerp[0]/lAbs, lineForPerp[1]/lAbs, ]

        //start point of line AB
        var v = [        A[0],        A[1] ];

        //direction of the perpendicular to line AB
        var us = [ lineForPerp[1], -lineForPerp[0] ];             
        //start point of the perpendicular
        var vs = S;
        var crossPoint = linesCross( lineForPerp,v,us,vs );
        var hx = crossPoint[0] - S[0];
        var hy = crossPoint[1] - S[1];
        var perpAbs = Math.sqrt( hx*hx + hy*hy );
        return {
            crossPoint,
            perp : [ hx, hy ],
            perpAbs,
            lineForPerp,
            unitLine,
        };
    }


    ///*****************************************
    /// possible mess:
    /// compare: this may replace this sub:
    ///         mat.dropLine( 1, null, null, rg.p.pos, uu, udir * sop.Kepler_v )
    ///         mat.sm( sop.Kepler_v*udir, uu, 1, rg.p.pos )
    ///*****************************************
    ///adds t*vector to point start
    ///inputs:    A,B,start - 2-dim. vectors,
    ///           t - distance parameter,
    ///returns:   u = start + (B-A)*t
    ///
    ///variant: canonical: res = dropLine(... = A + (B-A)t,
    ///variant: res = dropLine(... = A + direction * directionLength
    ///variant: res = dropLine(... = start + direction * directionLength
    ///variant: res = dropLine(... = start + direction * t
    function dropLine(
        t,      //t - distance parameter,
        A,
        B,
        start, //optional
        direction, //direction with scale instead of A, B
        directionLength, //superceedes t, "direction" and "B-A": sets distance
                         //from point A
    ){
        start = start || A;
        var u = direction || [ B[0] - A[0], B[1] - A[1] ];
        if( directionLength ) {
            u = unitVector( u ).unitVec;
            t = directionLength;
        }
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
    ///outputs: angele from vector1 to vector2 in range (-PI,PI],
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

