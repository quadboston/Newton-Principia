( function() {
    var sn      = window.b$l.sn;
    var mat     = sn('mat');
    var bezier  = sn('bezier');

    

    bezier.weightify        = weightify;
    bezier.weightify        = weightify;
    bezier.points2bezier    = points2bezier;
    bezier.parT2point       = parT2point;
    bezier.line2bezier      = line2bezier;
    bezier.zeroBezier2zeroSubbezier = zeroBezier2zeroSubbezier;
    bezier.bezier2upper     = bezier2upper;
    bezier.bezier2lower     = bezier2lower;
    bezier.t_2_3Dpoint      = t_2_3Dpoint;
    
    bezier.preparesOptimizedBezier = preparesOptimizedBezier;
    return;

    ///performance-optimized
    ///standalone framework for multidimensional Beizier pivots
    function preparesOptimizedBezier( pivots )
    {
        let rack = {};
        rack.pivots = pivots;
        rack.dimension = 1;
        if( Array.isArray(pivots[0]) ) {
            rack.dimension = pivots[0].length;
        }
        let dim = rack.dimension;
        let factorial = [1];
        let rank = pivots.length-1;
        let rankBase = 0;
        {
            let fraction = rank;
            while( fraction >1 ) {
                rankBase++;
                fraction /= 2;
            }
        }
        rack.rankBase = rankBase;
        for( i=1; i<=rank; i++ ) {
            factorial[i] = factorial[i-1]*i;
        }
        let binom = rack.binom = [];
        let coefficients = rack.coefficients = [];
        let ix2parameter = [];
        for( i=0; i<=rank; i++ ) {
            ix2parameter.push( i/rank );
            binom[i] = factorial[rank]
                / (factorial[rank-i] * factorial[i]);
            if( dim === 1 ) {
                coefficients[i] = pivots[i] * binom[i];
            } else {
                coefficients[i] = [];
                for( j=0; j<dim; j++ ) {
                    coefficients[i][j] = pivots[i][j] * binom[i];
                }
            }
        }
        rack.ix2parameter = ix2parameter;
        rack.fun = fun;
        rack.updatesPivot = updatesPivot;
        rack.updatesArrayOfPoints = updatesArrayOfPoints;
        rack.curvePivots2bezierPivots = curvePivots2bezierPivots();
        return rack;
        
        
        function fun( t )
        {
            let pivots = rack.pivots;
            let rank = pivots.length-1
            let dim = rack.dimension;
            if( dim === 1 ) {
                var result = 0;
            } else {
                var result = [];
                for( j=0; j<dim; j++ ) {
                    result[j] = 0;
                }
            }

            ///flag for subalgorithm to prevent loss of
            ///accuracy in summation from small polinom members,
            ///will change the order of summation,
            var large_t = t > 0.5;
            
            let rankBase = rack.rankBase;
            var polScale = large_t ? t : (1-t);
            var multiplier = (1-polScale)/polScale;
            for( var i=0; i<rankBase; i++ ) {
                polScale *=polScale;
            }

            let coefficients = rack.coefficients;
            for( let ii=0; ii<=rank; ii++ ) {
                //changes order of summation to from small members first
                let i = large_t ? ii : rank-ii; 
                ////algo: Poly = ((( a*x + b)*x+...
                if( dim === 1 ) {
                    result = result * multiplier + coefficients[i];
                } else {
                    for( j=0; j<dim; j++ ) {
                        result[j] = result[j] * multiplier + coefficients[i][j];
                    }
                }
            }
            if( dim === 1 ) {
                result *= polScale;
            } else {
                for( j=0; j<dim; j++ ) {
                    result[j]  *= polScale;
                }
            }
            return result;
        }

        function updatesPivot( pivot, i )
        {
            let pivots = rack.pivots;
            let coefficients = rack.coefficients;
            let binom = rack.binom;
            if( dim === 1 ) {
                pivots[i] = pivot;
                coefficients[i] = pivot * binom[i];
            } else {
                for( j=0; j<dim; j++ ) {
                    pivots[i][j] = pivot[j];
                    coefficients[i][j] = pivot[j] * binom[i];
                }
            }
        }
        
        ///calculates partial derivatives d(BezierPivot)/d(CurvePivot),
        ///their dependency is actually linear
        function curvePivots2bezierPivots()
        {
            let binom = rack.binom;
            let rank = pivots.length-1;
            let ix2parameter = rack.ix2parameter;
            let step = 1/rank;
            var res = Array(rank+1);
            for( var tix=0; tix<=rank; tix++ ) {
                var t = ix2parameter[tix];
                if( tix===rank ) {
                    res[tix] = 1;
                } else {
                    let ct = 1-t;
                    //fails on Safari:
                    //let rs = binom[tix]*Array(rank).keys().reduce(acc => (acc * ct),1);
                    let rs = binom[tix]*((new Array(rank)).fill(1)).reduce(acc => (acc * ct),1);
                    new Array(4).fill(1)
                    let multiplier = t/ct;
                    for( var j=0; j<tix; j++ ) {
                         rs *=multiplier;
                    }
                    res[tix]=1/rs;
                }
            }
            return res;
        }
        
        ///"sugar-function"
        ///makes points uniformely distributed
        function updatesArrayOfPoints( arr, n )
        {
            arr.length = 0;
            let step = 1/(n-1);
            let fun = rack.fun;
            for(i=0; i<n; i++ ) {
                arr.push( fun(i*step) );
            }
        }
    }
    
    ///Here is another work platform, based on recurrent formula
    ///for calculation.
    ///
    ///Calculates point on n-points, m-dimentional Bezier curve,
    ///m - dimension of enclosing space,
    ///Constracts Bernstein's polynomial with Newton Binomial coefficients,
    ///Input:  dim = m
    ///        pivotPoints = points, pivotPoints.length = n
    ///        tt = point parameter <- [0,1]
    ///        start = 0 initially
    ///        len = pivotPoints.length initially
    function weightify( tt, pivotPoints, dim, start, len )
    {
        if(  len === 2 ) {
            return (1-tt)*pivotPoints[start][dim] + tt*pivotPoints[start+1][dim];
        } else {
            return  (1-tt) * weightify( tt, pivotPoints, dim, start,   len - 1 ) +
                    tt     * weightify( tt, pivotPoints, dim, start+1, len - 1 )
        }
    }

    ///Sugar subroutine.
    ///Calculates array of points on besier curve,
    ///Input:   points - array of t-parameters on besier curve
    function points2bezier( points, pivots )
    {
        var plen = pivots.length;
        return points.map( function( paramT ) {
                    return [ weightify( paramT, pivots, 0, 0, plen ), 
                             weightify( paramT, pivots, 1, 0, plen )
                    ];
        });
     }

    ///=============================================================
    ///Calculates point on bezier curve by given point's t-parameter
    ///=============================================================
    function parT2point( parT, pivots )
    {
        return [ weightify( parT, pivots, 0, 0, pivots.length ), 
                 weightify( parT, pivots, 1, 0, pivots.length )
        ];
    }


    ///=============================================================
    ///3d poiont
    ///=============================================================
    function t_2_3Dpoint( parT, pivots )
    {
        return [
            weightify( parT, pivots, 0, 0, pivots.length ), 
            weightify( parT, pivots, 1, 0, pivots.length ),
            weightify( parT, pivots, 2, 0, pivots.length )
        ];
    }





    /*
        ///=============================================================
        /// Calculates: crossing of line and bezier curve.
        ///=============================================================
        Input: Q,D line pivots
               B,C second and third bezier pivots; 
                   first must be A = [0,0]
        Returns: [t0, t1] - bezier parameters of crossing, sorted by
                            ascending,
                            t0,t1 <- [0,1]
                 if no solution, returns [].
        Context:

            P = 2B(1-t)t + Ctt;   bezier: Bz(A,B,C), A,B,C - pivots, A=(0,0)
            P = Q + Dq;           line
            Dx^2 + Dy^2 != 0      line is not a point
            -----------------------------------------

            x = 2*Bx*(1-t)*t + Cx t*t = Qx + Dx*q
              = Fx*t*t + Gx*t where
                Fx = Cx - 2Bx, Gx = 2Bx;
            analogiously:
            y = Fy*t*t + Gy*t = Qy + Dy*q

            then multiplying above by Dx:
            Dx*Fy*t*t + Dx*Gy*t - Dx*Qy = Dy * Dx*q
            
            F'x*t*t + G'x*t - Q'x = Dx*Dy*q =
            F'y*t*t + G'y*t - Q'y
            where
                F'x = Fx*Dy
                ...
                Q'y = Qy*Dx

            finally:
            att + bt + c = 0

            which is to be solved against t

            where a = F'x - F'y,
                  b = G'x - G'y,
                  c = Q'y - Q'x

    */
    function line2bezier( Q, D, B, C )
    {
        var Fx = C[0] - 2*B[0];
        var Gx = 2*B[0];
        var Fy = C[1] - 2*B[1];
        var Gy = 2*B[1];

        var Qx = Q[0];
        var Qy = Q[1];
        var Dx = D[0];
        var Dy = D[1];

        var Fsx = Fx*Dy;
        var Gsx = Gx*Dy;
        var Qsx = Qx*Dy;

        var Fsy = Fy*Dx;
        var Gsy = Gy*Dx;
        var Qsy = Qy*Dx;

        var a = Fsx - Fsy;
        var b = Gsx - Gsy;
        var c = Qsy - Qsx;

        var solution = mat.squarePolyRoot( a, b, c );
        //c cc( a, b, c, solution )
        if( solution.length === 1 ) {
            var t = solution[0];
            if( t < 0 || t > 1 ) { solution = []; }
        } else if( solution.length === 2 ) {
            if( solution[0].length ) { 
                ////complex solution
                solution = [];
            } else {
                var t0 = solution[0];
                var t1 = solution[1];
                var result = [];
                if( t0 >=0 && t0 <= 1 ) {result.push( t0 );}
                if( t1 >=0 && t1 <= 1 ) {result.push( t1 );}
                solution = result.length < 2 ? result :
                           t0 > t1 ? [ t1, t0 ] : result;
            }
        }
        return solution;
    }

    /*
        Input: zero-based bezier A,B,C, first-pivot A = [0,0]
               tS - splitter
        Returns: B', C' pivots of zero-based subbezier

        Context: 
                P = 2t(1-t)B + ttC = tt(C-2B) + 2Bt = att+bt
            Sought: 
                P = 2s(1-s)B' + ssC' (*)
            Proof:
                Let: t' = tS, then s = t/t'
                Sought: P=a'ss+b's
                Should: b'/t' = b = 2B => B' = Bt'
                (C'-2Bt') = t't'(C-2B) =>
                C' = t't'(C-2B) + 2Bt'
                Driving these steps backward
                does prove (*).
    */
    function zeroBezier2zeroSubbezier( B, C, tS )
    {
        var sm = mat.sm;
        var u = tS;
        return [ 
            sm(tS,B),
            sm(u*u, sm(C,-2,B), 2*u, B)
        ];

        /*
        ///explicit working variant
        return [ 
            [ B[0]*tS, B[1]*tS ],
            [ tS*(tS*(C[0]-2*B[0])+2*B[0]),
              tS*(tS*(C[1]-2*B[1])+2*B[1])
            ]  
        ];
        */
    }





    //***********************************************************
    // //\\ zeroBezier2upperSubbezier
    //***********************************************************
    /*
        Action:     creates fragment of bezier curve above the 
                    division parameter T
        Inputs:     T - division point
                    B,C - poivots of zero-based-bezier Bz,
        Returns:    three bezier pivots for the fragment above T for
                    parameter s<-[0,1] where
                        0 is mapped to Bz(T),
                        1 is mapped to C
    */
    /*
    function zeroBezier2upperSubbezier( B, C, T )
    {
        var sm = mat.sm;
        //:converts to coordinate system with origin in C
        var Cq = sm(-1,C);
        var Bq = sm(B,Cq);

        var Q  = 1-T;
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, Q );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var As = sm(newPivots[1],C);
        var Bs = sm(newPivots[0],C);
        var Cs = C;
        return [As,Bs,Cs];
    }
    */
    //***********************************************************
    // \\// zeroBezier2upperSubbezier
    //***********************************************************



    ///The same as zeroBezier2upperSubbezier( B, C, T ), but
    ///with 3 input pivots with A in an orbitrary position     
    function bezier2upper( pivots, T )
    {
        var sm = mat.sm;
        var A = pivots[0];
        var B = pivots[1];
        var C = pivots[2];

        //:converts to coordinate system with origin in C
        var Cq = sm(A,-1,C);
        var Bq = sm(B,-1,C);
        var Q  = 1-T;
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, Q );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var As = sm(newPivots[1],C);
        var Bs = sm(newPivots[0],C);
        var Cs = C;
        return [As,Bs,Cs];
    }



    ///The same as zeroBezier2zeroSubbezier( B, C, T ), but
    ///with 3 input pivots with A in an orbitrary position     
    function bezier2lower( pivots, T )
    {
        var sm = mat.sm;
        var A = pivots[0];
        var B = pivots[1];
        var C = pivots[2];

        //:converts to coordinate system with origin in C
        var Cq = sm(C,-1,A);
        var Bq = sm(B,-1,A);
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, T );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var Bs = sm(newPivots[0],A);
        var Cs = sm(newPivots[1],A);
        return [A,Bs,Cs];
    }
    // //\\// helpers

}) ();


