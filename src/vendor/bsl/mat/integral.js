( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var integral    = sn( 'integral', mat );



    ///calculates integral from 0 to x of dx^3+ax^2+bx+c
    integral.polynomial = function( d, a, b, c, x )
    {
        return ( ( ( d/4*x + a/3 ) * x + b/2 ) * x + c ) * x;
    }

    //:test
    //ccc( integral.polynomial( 0, 1, 1, 1, 1 ) ); //11/6 = 1.8333...
    //ccc( integral.polynomial( 1, 1, 1, 1, 1 ) ); //2.0833...


    integral.simpleIntegration = simpleIntegration;
    integral.equalizeAreas = equalizeAreas;
    return;




    function simpleIntegration( fun, baseArray, returnAll )
    {
        //API
        var startX = baseArray[0];
        var endX = baseArray[1];

        var INTEGRATION_POINTS = 1000;

        var rangeX  = endX - startX;
        var stepX   = rangeX / INTEGRATION_POINTS; 
        var fun1    = fun( startX );
        var x1      = startX;
        var sum     = 0;

        if( returnAll ) {
            resultX = [ x1 ];
            resultF = [ fun1 ];
            integrals = [ 0 ];
        }

        for( var ix=0; ix<INTEGRATION_POINTS; ix++ ){
            var x2 = (ix+1)*stepX;
            var fun2 = fun( x2 );
            sum += (fun1 + fun2) * 0.5 * stepX;
            fun1 = fun2;
            if( returnAll ) {
                resultX.push( x2 );
                resultF.push( fun2 );
                integrals.push( sum );
            }
        }
        if( returnAll ) {
            return {
                integral : sum,
                resultX,
                resultF,
                integrals,
                rangeX,
                INTEGRATION_POINTS,
                stepX,
            };
        } else {
            return sum;
        }
    }


    function testFun( x )
    {
        return 2*x;
    }


    function testFunG( x )
    {
        return 3*x*x;
    }



    function equalizeAreas({
        fun,
        partition,
        startFX,
        endFX,
        startFY,
        endFY,

        funG,
        startGX,
        endGX,
    }) {
        var INTEGRATION_POINTS = 100;

        //test
        //funG    = testFunG;
        //fun     = testFun;

        /*
        startFX = 0;
        endFX   = 1;
        startGX = 0;
        endGX   = 1;
        partition = [
            { pos : [0,0], },
            { pos : [0.25,0], },
            { pos : [0.5,0], },
            { pos : [0.75,0], },
            { pos : [0.9,0], },
            { pos : [1,0], },
        ];
        */

        var origin = simpleIntegration(
                fun,
                [ startFX, endFX ],
                !!'returnAll'
        );
        //ccc( origin );
        var rangeX = origin.rangeX;
        var oStepX = origin.stepX;

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

            var posX = rgX.pos[0];
            var argX = origin.INTEGRATION_POINTS * posX / rangeX;
            var gIx = Math.floor( argX );
            if( gIx >= origin.INTEGRATION_POINTS ) {
                rgX.area = origin.integral;
            } else {
                var grals = origin.integrals;
                rgX.area  = grals[ gIx ] +
                    ( grals[ gIx + 1 ] - grals[ gIx ] ) *
                    ( posX - origin.resultX[ gIx ] ) / oStepX
                    ;
            }
        });
        //ccc( partition )


        var originG = simpleIntegration(
                funG,
                [ startGX, endGX ],
                !!'returnAll'
        );

        var z           = startGX;
        var gXindex     = 1;
        var ratioGF     = originG.integral / origin.integral;
        var GPOINTS     = originG.INTEGRATION_POINTS;
        var resultGX    = originG.resultX;
        var integralsG  = originG.integrals;
        var gStartIx    = 1;
        //ccc( 'originG=', originG );


        partition.forEach( ( point, pixDeb ) => {
            //var rgX = point.rgX;
            var rgX = point;

            var searchAreaG = rgX.area * ratioGF;
            for( var gix=gStartIx; gix<=GPOINTS; gix++ ) {
                var currentArea = integralsG[ gix ];
                var formerArea = integralsG[ gix-1 ];
                if( gix === GPOINTS ) {
                    rgX.gX = resultGX[ gix ];
                    //ccc( 'found at the end: gix=', gix + ' app:z=' + rgX.gX.toFixed(4) );
                    gStartIx = gix;
                } else if( currentArea >= searchAreaG ) {
                    ////map z-point found for rgX.pos
                    rgX.gX = resultGX[ gix-1 ] +
                                (searchAreaG - formerArea) *
                                ( resultGX[ gix ] - resultGX[ gix-1 ] )
                                / (currentArea - formerArea)
                                ;

                    // //\\ debug
                    /*
                    var posGX_d = gix/originG.INTEGRATION_POINTS;
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

                    //rgX.gX = resultGX[ gix ];
                    //ccc( pixDeb + ' x='+rgX.pos[0].toFixed(4) + ' z=' + rgX.gX.toFixed(4) );
                    gStartIx = gix;
                    break;
                }
            }
        });
        //ccc( 'partition array with full results for z: ', partition );
    }


}) ();


