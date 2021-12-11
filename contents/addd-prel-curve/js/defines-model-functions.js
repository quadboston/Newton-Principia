( function() {
    var {
        haz,
        ssF,
        ssD,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            createModelFunctions,
        },
    });
    return;







    //=================================================
    // //\\ defines curves
    //=================================================
    function createModelFunctions()
    {
        ssD.repoConf = [
            {
                fname : "Infinte frequences",
                rgKeyname : 'curveIF',
                fun : function( t ) {

                        //compresses axis x without changing functions character,
                        //to favour graph resolution of small t
                        //index of compression is 6,
                        var t2 = t*t;
                        t = t2*t;

                        //swaps axes: t will be y and y will be x
                        var yy = -t;
                        var xx = t === 0 ? 0 :
                                    (
                                        t > 0 ?  1 + Math.sin( 1/t ) :
                                                -1 + Math.sin( 1/t )
                                    );
                        return [
                            xx * 0.15,
                            yy * 1,
                        ];
                },
            },


            {
                fname : "Circle",
                rgKeyname : 'curveCircle',
                fun : function( t ) {
                        var xx = t;
                        var yy = Math.sqrt( 1 - t*t ) - 1;
                        return [
                            xx,
                            yy,
                        ];
                },
            },

            {
                fname : "curveIFC",
                rgKeyname : 'curveIFC',
                fun :
                    function( t ) {
                        //var absT = Math.abs( t );
                        var sign = Math.sign( t );
                        //if( absT < 1e-50 ) {
                        //    t = 0;
                        //} else { 
                        //    t += sign * 0.05 * 0.0001/t;
                        //}
                        var beta = Math.PI/20;
                        var R = 0.5;
                        var Ce = 4;
                        var Cf = 0.2;
                        var Cd = 1e+12;
                        var sign = Math.sign( t );

                        //compresses axis x without changing functions character,
                        //to favour graph resolution of small t
                        var t2 = t*t;
                        var t3 = t2;

                        var epsilon = Math.abs( t3 );

                        //lambda = 6
                        var delta = epsilon * epsilon;
                        var delta = Cd * delta * delta * delta;  

                        //ccc( 'delta=', delta.toFixed( 5 ), 't=',t.toFixed( 5 ) )
                        if( epsilon < 1e-100 ) {
                            var xx = 0;
                            var yy = 0;
                            var ret = [ xx, yy ];
                        } else {
                            var fi = Ce*epsilon + Cf * ( 1 + Math.sin( 1/t3 ) );
                            var ro = R * ( 1 - delta );
                            var xx = sign * ro * Math.sin( fi );
                            var yy = ro * Math.cos( fi );
                            var ret = [
                                xx,
                                yy - R,
                            ];
                        }
                        return ret;
                   },
            },

            {
                fname : "curvatureCircle",
                rgKeyname : 'curvatureCircle',
                funGen :
                        ///this is a generator of function
                        function( R, center ) {
                            return ( function( angle ) {
                                var xx = R*Math.sin( angle );
                                var yy = R*Math.cos( angle );
                                return [
                                    xx + center[0],
                                    yy + center[1],
                                ];
                            });
                        },
            },


            {
                fname : "Infinte frequences",
                rgKeyname : 'curveCIF',
                fun : function( t ) {

                        var alpha = 1/2;
                        var beta = 1/2;
                        var lambda = 1/5;

                        //compresses axis x without changing functions character,
                        //to favour graph resolution of small t
                        //index of compression is 6,
                        var t2 = t*t;
                        t = t2 * t;

                        var abst = Math.abs( t );
                        //swaps axes: t will be y and y will be x
                        var yy = -abst;
                        var xx = abst < 1e-100 ?
                                0 :
                                ( t>0 ? 1 : -1 ) * Math.pow( abst, alpha ) *
                                ( Math.pow( abst, beta ) + lambda * ( 1 + Math.sin( 1/abst ) ) )
                                ;                            
                        return [
                            xx * 1, //0.35,
                            yy * 1,
                        ];
                },
            },

            {
                fname : "Parabola",
                rgKeyname : 'curveParabola',
                fun : function( t ) {
                        var xx = t*0.8;
                        var yy = -t*t;
                        return [
                            xx,
                            yy,
                        ];
                },
            },



        ];

        //flag, its presence disables autopaint
        ssD.repoConf.customFunction = 0;
        ssD.funKeyname2funIx = {};
        ssD.repoConf.forEach( (funDef,ix)  => {
            ssD.funKeyname2funIx[ funDef.rgKeyname ] = ix;
            var fn = haz( funDef, 'fun' );
            fn && fn.bind( funDef );

            //needs? for first run in media_upcreate
            stdMod.doesPaintCurve(
                funDef.rgKeyname,
                {}, //smooths funGen functions run
            );
        });

        //----------------------------------------------------
        // //\\ sets and paints left and right circle branches
        //      uses the same 'curveCircle' function
        //----------------------------------------------------
        var ix = 1;
        var kName = 'curveRightCircle';
        var fd = ssD.repoConf[ ix ];
        ssD.funKeyname2funIx[ kName ] = ix;
        stdMod.doesPaintCurve( kName );
        var kName = 'curveLeftCircle';
        var fd = ssD.repoConf[ ix ];
        ssD.funKeyname2funIx[ kName ] = ix;
        stdMod.doesPaintCurve( kName );
        //----------------------------------------------------
        // \\// sets and paints left and right circle branches
        //----------------------------------------------------

    }
    //=================================================
    // \\// defines curves
    //=================================================

}) ();

