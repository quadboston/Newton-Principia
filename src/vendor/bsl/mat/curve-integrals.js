( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var integral    = sn( 'integral', mat );

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

    integral.curveLength = curveLength;
    return;









    ///for not more than 2^61 base points
    ///2^26 is a memory crash?
    function curveLength({
        fun,
        curveStartParam,
        curveEndParam,

        //optionals:
        funIsAVector,           //true for t |-> [x,y], false for y=f(x) 
        INTEGRATION_POINTS_LIM,
        calculationAccuracy,
        STARTING_EXPONENT_FOR_2,
        SAFETY_INTERACTIONS_LIM,
    }){

        //value 10 gives limit = 2^10, possibly accuracy = 0.001
        //SAFETY_INTERACTIONS_LIM = 25; //experiment: 25 seems ~ 180 Meg, accuracy ~ 10^-11
        //SAFETY_INTERACTIONS_LIM = 23; //23 must be safe, 30 - danger
        SAFETY_INTERACTIONS_LIM = SAFETY_INTERACTIONS_LIM || 20;   //30 - danger

        INTEGRATION_POINTS_LIM  = INTEGRATION_POINTS_LIM    || 1000;
        calculationAccuracy     = calculationAccuracy        || 0.000000001;
        STARTING_EXPONENT_FOR_2 = STARTING_EXPONENT_FOR_2   || 4;


        var expo                = STARTING_EXPONENT_FOR_2;
        var basePointsCount     = mat.powersOf2[ expo ];
        basePoints              = [];
        funPoints               = [];
        var currentBasePoints   = basePoints[ expo ] = [];
        funPoints[ expo ]       = [];
        var currentStep         = ( curveEndParam - curveStartParam ) / basePointsCount;

        for( var it=0; it<=basePointsCount; it++ ) {
            currentBasePoints[ it ] = curveStartParam + currentStep * it;
            var tt              = currentBasePoints[ it ];
            var funPoint        = fun( currentBasePoints[ it ] );
            if( !funIsAVector ) {
                funPoint = [ tt, funPoint ];
            }
            funPoints[ expo ][ it ] = funPoint;
        }
        var prevLen = calculates_curvePoints2chordsSum( funPoints[ expo ] );


        function calculates_curvePoints2chordsSum( curvePoints )
        {
            var lenSum = 0;
            var curPLen = curvePoints.length;
            for( var it=1; it<curPLen; it++ ) {
                var prevP = curvePoints[ it-1 ];
                var curP  = curvePoints[ it ];
                var dx    = curP[0]-prevP[0];
                var dy    = curP[1]-prevP[1];
                lenSum   += Math.sqrt( dx*dx + dy*dy );
            }
            return lenSum;
        }

        for( var expo = STARTING_EXPONENT_FOR_2 + 1;
             expo < SAFETY_INTERACTIONS_LIM; expo++
        ) {
            var prevPC              = mat.powersOf2[ expo-1 ];
            var prevBP              = basePoints[ expo-1 ];
            var prevFP              = funPoints[ expo-1 ];
            var currentBasePoints   = basePoints[ expo ] = [];
            var funP                = funPoints[ expo ] = [];

            for( var ip = 0; ip <= prevPC; ip++ ) {
                var it          = ip*2;
                var fP          = funP[ it ] = prevFP[ ip ];
                var tLeft       = currentBasePoints[ it ] = prevBP[ ip ];
                var tRight      = prevBP[ ip + 1 ];

                if( ip === prevPC ) break;
                var tMiddle     = currentBasePoints[ it + 1 ] =
                                  ( tLeft + tRight ) * 0.5;
                var funPoint    = fun( tMiddle );
                if( !funIsAVector ) {
                    funPoint = [ tMiddle, funPoint ];
                }
                funP[ it + 1 ] = funPoint;
            }
            var newLen = calculates_curvePoints2chordsSum( funP );

            var reachedAccuracy = Math.abs( prevLen - newLen );
            if( calculationAccuracy > reachedAccuracy ) {
                /*
                ccc( 'reached accuracy=' + reachedAccuracy +
                     'value=', newLen, 'expo=', expo, 'memory~' + funP.length
                );
                */
                return newLen;
            }
            prevLen = newLen;
        }

        /*
        ccc( 'missed accuracy: reached only this =' + reachedAccuracy +
             'value=', newLen, 'expo=', expo, 'memory~' + funP.length
        );
        */

        //we did not reach preset accuracy, so do return
        //what we have:
        return prevLen;
    }

}) ();


