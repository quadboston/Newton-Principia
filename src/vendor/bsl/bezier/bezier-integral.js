( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn('mat');
    var integral    = sn('integral', mat);
    var bezier      = sn('bezier');




    //bezier.zbezier2integralY = zbezier2integralY;
    bezier.zbezier2areas = zbezier2areas;
    
    ///Returns: integral on [0,t] S = I[0,t]y*dx
    ///Context: P = 2t(1-t)P1 + ttP2 = att + bt; 
    ///         P is zero-based bezier curve;
    ///         S = Iyx'dt
    function zbezier2integralY( pivots, t )
    {
        var P1 = pivots[0];
        var P2 = pivots[1];
        var ay = P2[1] - 2*P1[1];
        var by = 2*P1[1];
        var ax = P2[0] - 2*P1[0];
        var bx = 2*P1[0];
        var bxs = 2*ax;
        var cxs = bx;  

        var S = integral.polynomial( ay*bxs, ay*cxs + bxs*by, by*cxs, 0, t );
        return S;
    }

    //:tests
    //c cc( zbezier2integralY( [[0.5,0.5],[1,1]], 1 ) ); //0.5
    //c cc( zbezier2integralY( [[0.5,1],[1,1]], 1 ) );   //1-1/3
    //c cc( zbezier2integralY( [[1,0.5],[1,1]], 1 ) );   //1/3

    ///Returns: S = Ix(y)dy
    function zbezier2integralX( pivots, t )
    {
        return zbezier2integralY(
            [
                [ pivots[0][1],
                  pivots[0][0]
                ], 
                [ pivots[1][1],
                  pivots[1][0]
                ]
            ],
            t
        );
    }
    //c cc( zbezier2integralX( [[0.5,1],[1,1]], 1 ) );   //1/3
    
    function zbezier2areas( pivots, t, tanT, tanCross, scale )
    {
        scale = scale || 1;
        var end = bezier.parT2point( t, [[0,0], pivots[0], pivots[1]] );
        var endX = end[0];
        var endY = end[1];

        var tan1 = pivots[0][0]/pivots[0][1];
        var fullAreaBetweenBx8axisY   = zbezier2integralX( pivots, t );

        //---------------------------------------
        // //\\ development prints
        //---------------------------------------
        /*
        var compareWithTriangularArea = endX * endY / 2;
        c cc( '****\nfull=' + (fullAreaBetweenBx8axisY*scale).toFixed(6) );
        //c cc( 'endX=' + endX.toFixed(2) + ' crossX=' + tanCross[0].toFixed(2) +
        //     ' crossY=' + tanCross[1].toFixed(2) );
        //c cc( 'endY=' + endY.toFixed(2) );
        c cc( 'triangle=' + (compareWithTriangularArea*scale).toFixed(6) );
        */
        //---------------------------------------
        // \\// development prints
        //---------------------------------------


        var areaUnderTangentLine_tanT = 0.5 * tanT * endX * endX;
        var areaBetweenTanT_8_curve     = fullAreaBetweenBx8axisY - areaUnderTangentLine_tanT;
        //ccc('under_tanT=' + (areaUnderTangentLine_tanT*scale).toFixed(6),
        //    'diff=1/12=' + (areaBetweenTanT_8_curve*scale).toFixed(6) // 1/12 );

        // //\\ under tan1
        var total = tanCross[0]*tanCross[1]/2;      //1/9 = 0.1111
        var delta = tanCross[0]*tanCross[0]/2*tanT; //1/9/2/2 = 1/36 
        var areaUnderTan1 = total - delta;          //1/12
        //c cc( 'total=' + total.toFixed(6) + ' tan1= ' + tan1.toFixed(6) );
        //c cc( '1/12 = areaUnderTan1=' + areaUnderTan1.toFixed(6) + ' rev= ' + ( 1/areaUnderTan1).toFixed(6) );
        // \\// under tan1

        var result =
        {
            areaBetweenTanT_8_curve: areaBetweenTanT_8_curve * scale,
            areaUnderTan1: areaUnderTan1 * scale,
            //.sugar
            areaBetween_Tan1_Tan2_Curve: ( areaBetweenTanT_8_curve - areaUnderTan1 ) * scale
        };
        return result;
    }

    //:tests
    //c cc( zbezier2areas( [[0.5,1],[1,1]], 1, 0.5, [ 1/4 + 1/12, 1/2+2/12 ] ) );   //1/3 - 1/4 = 1/12, 
    //c cc( zbezier2areas( [[0.5,1],[1,1]], 1, 0.5, [ 1/3, 2/3 ] ) );   //1/3 - 1/4 = 1/12, 


}) ();

