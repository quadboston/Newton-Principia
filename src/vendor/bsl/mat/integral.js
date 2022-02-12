( function() {
    var {
        sn, mat,
        haz,
    } = window.b$l.nstree();
    var integral = sn( 'integral', mat );


    /*
    //----------------------------------------------------
    // //\\ test
    //----------------------------------------------------
    function testFun( x )
    {
        return 2*x;
    }
    function testFunG( x )
    {
        return 3*x*x;
    }
    ccc( integral.polynomial( 0, 1, 1, 1, 1 ) ); //11/6 = 1.8333...
    ccc( integral.polynomial( 1, 1, 1, 1, 1 ) ); //2.0833...
    //----------------------------------------------------
    // \\// test
    //----------------------------------------------------
    */

    integral.polynomial = polynomial;
    integral.simpleIntegration = simpleIntegration;
    //integral.integral_f_of_x_dx = simpleIntegration;

    integral.equalizeAreas = equalizeAreas;
    return;








    ///calculates integral from 0 to x of dx^3+ax^2+bx+c
    function polynomial( d, a, b, c, x )
    {
        return ( ( ( d/4*x + a/3 ) * x + b/2 ) * x + c ) * x;
    }


    function simpleIntegration({
        fun,
        baseArray, //two start and end points
        returnAll,
        INTEGRATION_POINTS_LIM,
    }){
        //API
        var startX = baseArray[0];
        var endX = baseArray[1];

        var rangeX  = endX - startX;
        var stepX   = rangeX / INTEGRATION_POINTS_LIM; 
        var fun1    = fun( startX );
        var x1      = startX;
        var sum     = 0;

        if( returnAll ) {
            resultX = [ x1 ];
            resultF = [ fun1 ];
            integrals = [ 0 ];
            var fmin = fun1;
            var fmax = fun1;
        }

        for( var ix=0; ix<INTEGRATION_POINTS_LIM; ix++ ){
            var x2 = (ix+1)*stepX;
            var fun2 = fun( x2 );
            sum += (fun1 + fun2) * 0.5 * stepX;
            fun1 = fun2;
            if( returnAll ) {
                resultX.push( x2 );
                resultF.push( fun2 );
                integrals.push( sum );
                if( fmin > fun2 ) {
                    fmin = fun2;
                }
                if( fmax < fun2 ) {
                    fmax = fun2;
                }
            }
        }
        if( returnAll ) {
            return {
                integral : sum,
                resultX,
                resultF,
                integrals,
                rangeX,
                INTEGRATION_POINTS_LIM,
                stepX,
                fmin,
                fmax,
            };
        } else {
            return sum;
        }
    }

    ///note, this function is based on integer arithmetics, so 
    ///this function can be done in integer arithmetics, so
    ///"drastically" speed up performance,
    function equalizeAreas({
        fun,

        //x-partition for function F (on "left" side)
        //this parameter implicitly returns partition[ ix ].rgX.gX
        //which is an z mapped to x,
        partition,

        startFX,   //first point in partition
        endFX,     //last point in partition

        funG,
        startGX,   //first point in partition for departure-domain-of-G
        endGX,
    }) {
        var INTEGRATION_POINTS_LIM = 10000;
        var origin = simpleIntegration({
            fun,
            baseArray : [ startFX, endFX ],
            returnAll : true,
            INTEGRATION_POINTS_LIM,
        });
        var { rangeX, resultF, resultX, stepX } = origin;
        var f0g = 'f';

        partition.forEach( point => {

            //***********************************
            // to make this a generic algo in bsl
            // these extra layers of props of
            // app must be removed: rgX, point,
            // these props are specific to
            // specific lemma,
            var rgX = point;
            //ccc( rgX)
            //***********************************

            var posX    = rgX.pos[0];
            var argX    = INTEGRATION_POINTS_LIM * posX / rangeX;
            var iIx     = Math.floor( argX );
            rgX.integ   = { f:{}, g:{} };
            var integF  = rgX.integ.f;
            integF.ix   = iIx;
            integF.x    = posX;
            if( iIx >= INTEGRATION_POINTS_LIM ) {
                integF.area = origin.integral;
                integF.fun = resultF[ resultF.length-1 ];
            } else {
                var grals = origin.integrals;
                integF.area  = grals[ iIx ] +
                    ( grals[ iIx + 1 ] - grals[ iIx ] ) *
                    ( posX - origin.resultX[ iIx ] ) / stepX
                    ;
                integF.fun = resultF[ iIx ] +
                    ( resultF[ iIx + 1 ] - resultF[ iIx ] ) *
                    ( posX - resultX[ iIx ] ) / stepX
                    ;
            }
        });



        var originG = simpleIntegration({
            fun         : funG,
            baseArray   : [ startGX, endGX ],
            returnAll   : true,
            INTEGRATION_POINTS_LIM,
        });

        var z           = startGX;
        var gStartIx    = 1;
        var ratioGF     = originG.integral / origin.integral;
        var resultGX    = originG.resultX;
        var resultGY    = originG.resultF;
        var integralsG  = originG.integrals;

        partition.forEach( ( point, pixDeb ) => {
            var rgX = point;
            var integG = rgX.integ.g;

            var searchAreaG = rgX.integ.f.area * ratioGF;
            integG.area = searchAreaG; 
            for( var gix=gStartIx; gix<=INTEGRATION_POINTS_LIM; gix++ ) {
                var currentArea = integralsG[ gix ];
                var formerArea = integralsG[ gix-1 ];
                if( gix === INTEGRATION_POINTS_LIM ) {
                    integG.ix = gix;
                    integG.x = resultGX[ gix ];
                    integG.fun = resultGY[ gix ];
                    gStartIx = gix;
                } else if( currentArea >= searchAreaG ) {
                    integG.ix = gix;
                    ////map z-point found for rgX.pos
                    integG.x = resultGX[ gix-1 ] +
                                (searchAreaG - formerArea) *
                                ( resultGX[ gix ] - resultGX[ gix-1 ] )
                                / (currentArea - formerArea)
                                ;
                    integG.fun = resultGY[ gix-1 ] +
                        ( resultGY[ gix ] - resultGY[ gix-1 ] ) *
                        ( integG.x - resultGX[ gix-1 ] ) / stepX
                        ;

                    // //\\ debug
                    /*
                    var posGX_d = gix/originG.INTEGRATION_POINTS_LIM;
                    ccc( '\n\n' + gix, 'z=posGX='+resultGX[ gix ]+ '(===)' + posGX_d );

                    var posFx_d = pixDeb / 4;
                    ccc( 'part bar ix='+pixDeb + ' posFx_d='+posFx_d+ '(===)' + rgX.pos[0] );

                    var searchArea_d = posFx_d*posFx_d;
                    ccc( 'search area true=' + searchArea_d.toFixed(4) +
                         ' (===) sa in prog='+ searchAreaG.toFixed(4) );

                    ccc( 'Garea=' + currentArea.toFixed(4) + '(===)' +
                         ' true=' + (gix/10).toFixed(4) + ' >= ' +
                         searchArea_d.toFixed(4) + ' z is between ' +
                        resultGX[ gix-1 ].toFixed(2) + ' and ' + posGX_d.toFixed(2)
                    );
                    */
                    // \\// debug

                    //ccc( pixDeb + ' x='+rgX.integ.f.x.toFixed(4) +
                    //              ' z=' + rgX.integ.g.x.toFixed(4) );
                    gStartIx = gix;
                    break;
                }
            }
        });

        findsMinOnIntervals( 'f' )
        findsMinOnIntervals( 'g' )
        return { originF : origin, originG, };



        function findsMinOnIntervals( f0g )
        {
            //finding fmin
            partition.forEach( (point,pix) => {
                var integX = point.integ[ f0g ];
                if( pix === partition.length - 1 ) {
                    integX.min = integX.fun;
                    return;
                }
                var point1 = partition[ pix+1 ];
                var integX1 = point1.integ[ f0g ];

                var startIx = integX.ix;
                var lim     = integX1.ix;
                var min    = integX.fun;
                for( var ix=startIx; ix<lim; ix++ ) {
                    var currF = f0g === 'f' ? resultF[ ix ] : resultGY[ ix ];
                    if( min > currF ) {
                        min = currF;
                    }
                }
                var lastF = integX1.min;
                if( min > lastF ) {
                    min = lastF;
                }

                integX.min = min;
                integX.barArea = min * ( integX1.x - integX.x );
                integX.figArea = integX1.area - integX.area;
            });
        }
    }


}) ();


