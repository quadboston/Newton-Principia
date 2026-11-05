( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var mcurve      = sn( 'mcurve', mat );

    //----------------------------------------------------
    // //\\ test,
    //      calculates PI
    //----------------------------------------------------
    /*
    var len = curveLength({

        //circle
        fun             : (x) => Math.sqrt( Math.abs( 1 - x*x ) ),

        curveStartParam : -1,
        curveEndParam   : 1,
        calculationAccuracy : 1e-19, //practical? is 1e-10
    });
    ccc( len )
    */
    //----------------------------------------------------
    // \\// test
    //----------------------------------------------------

    mcurve.creFrenetSerret = creFrenetSerret;
    return;









    ///object which calculates f.s. orts triplet along the curve
    ///misses a lot of things, curvature vector and value, ...
    function creFrenetSerret({

        //2d/3d curve function
        //inputs: parameter t
        //outputs: position = 3d-vector
        fun,

        //param t range, 2 numbers array,
        tRange,

        //numerical differentiation step
        D_ST,
        D2_ST
    }){
        var fsRack = {};
        fsRack.getsTangnetAndNormal = getsTangnetAndNormal;

        //assuming JS mantissa has 15 digits
        //frankly, conscise info on JS mantissa does not exist,
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Precision_range
        //if was: Number.EPSILON = 2.220446049250313e-16 for Cr.
        D_ST  = D_ST || 1e-10;
        D2_ST = D2_ST || 1e-8;

        D_ST_HALF = D_ST / 2;
        D2_ST_HALF = D2_ST / 2;
        return fsRack;




        function getsTangnetAndNormal( t )
        {
            var rt = fun( t );
            var rA = fun( t-D_ST_HALF );
            var rB = fun( t+D_ST_HALF );
            var dxdt = ( rB[0]-rA[0] ) / D_ST;
            var dydt = ( rB[1]-rA[1] ) / D_ST;
            var dzdt = ( rB[2]-rA[2] ) / D_ST;
            //speed = first derivative
            var dr_dt = [ dxdt, dydt, dzdt ];
            var drdt_unit = mat.unitVector( dr_dt );
            var uu = drdt_unit.unitVec;

            //second derivative point before
            var t_A = t-D2_ST_HALF;
            var r_AA = fun( t_A-D_ST_HALF );
            var r_AB = fun( t_A+D_ST_HALF );
            var d1xdt = ( r_AB[0]-r_AA[0] ) / D_ST;
            var d1ydt = ( r_AB[1]-r_AA[1] ) / D_ST;
            var d1zdt = ( r_AB[2]-r_AA[2] ) / D_ST;

            //second derivative point after
            var t_B = t+D2_ST_HALF;
            var r_BA = fun( t_B-D_ST_HALF );
            var r_BB = fun( t_B+D_ST_HALF );
            var d2xdt = ( r_BB[0]-r_BA[0] ) / D_ST;
            var d2ydt = ( r_BB[1]-r_BA[1] ) / D_ST;
            var d2zdt = ( r_BB[2]-r_BA[2] ) / D_ST;

            //accelelation = second derivative
            var d2rdx2 = ( d2xdt-d1xdt ) / D2_ST;
            var d2rdy2 = ( d2ydt-d1ydt ) / D2_ST;
            var d2rdz2 = ( d2zdt-d1zdt ) / D2_ST;
            var d2r_dt2 = [ d2rdx2, d2rdy2, d2rdz2 ];

            //secod derivative unit vector
            var dr2dt2_unit = mat.unitVector( d2r_dt2 );
            var nn = dr2dt2_unit.unitVec;

            var binorm = [
                //t*dr2dt2
                uu[1]*nn[2] - uu[2]*nn[1],
                -uu[0]*nn[2] + uu[2]*nn[0],
                uu[0]*nn[1] - uu[1]*nn[0],
            ];
            //ccc( uu, nn, binorm );

            return {
                rt,
                dr_dt,
                drdt_unit,
                d2r_dt2,
                dr2dt2_unit,
                binorm,
            }
        }
    }

}) ();


