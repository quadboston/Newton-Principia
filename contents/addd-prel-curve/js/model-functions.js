( function() {
    var {
        ssF,
        ssD,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            createModelFunctions,
            doesPaintCurve,
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
            funDef.fun = funDef.fun.bind( funDef );
            doesPaintCurve( funDef.rgKeyname )
        });

        //----------------------------------------------------
        // //\\ sets and paints left and right circle branches
        //      uses the same 'curveCircle' function
        //----------------------------------------------------
        var ix = 1;
        var kName = 'curveRightCircle';
        var fd = ssD.repoConf[ ix ];
        ssD.funKeyname2funIx[ kName ] = ix;
        doesPaintCurve( kName );
        var kName = 'curveLeftCircle';
        var fd = ssD.repoConf[ ix ];
        ssD.funKeyname2funIx[ kName ] = ix;
        doesPaintCurve( kName );
        //----------------------------------------------------
        // \\// sets and paints left and right circle branches
        //----------------------------------------------------

    }
    //=================================================
    // \\// defines curves
    //=================================================



    function doesPaintCurve( keyName )
    {
        var curveIx     = ssD.funKeyname2funIx[ keyName ];
        var theFun    = ssD.repoConf[ curveIx ];

        //-------------------------------------------------
        // //\\ curve IF
        //-------------------------------------------------
        switch( keyName )
        {
            case 'curveIF' :
                //-------------------------------------------------
                // //\\ original arc and curve
                //-------------------------------------------------
                ssF.paintsCurve({
                        rgName      : keyName,
                        //addedCssClass   : '....',
                        fun         : theFun.fun,

                        /*
                        pointA      : { pos :
                            [
                                //free var. t starts from Math.PI/2
                                //to make y === 1,
                                //see fun. def., ind. of comp. 6,
                                1 / Math.pow( Math.PI/2, 1/6 ),

                                null
                            ]
                        },

                        pointB      : { pos : [0.00000001, null] },
                        */

                        pointA      : { pos :
                            [
                                //free var. t starts from Math.PI/2
                                //to make y === 1,
                                //see fun. def., ind. of comp. 6,
                                -1 / Math.pow( Math.PI/2, 1/5 ),

                                null
                            ]
                        },

                        pointB      : { pos :
                            [
                                //free var. t starts from Math.PI/2
                                //to make y === 1,
                                //see fun. def., ind. of comp. 6,
                                1 / Math.pow( Math.PI/2, 1/5 ),

                                null
                            ]
                        },


                        mmedia      : stdMod.mmedia,
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 20000,    //40000 worked as well too
                });
                break;
            //-------------------------------------------------
            // \\// curve IF
            //-------------------------------------------------

            case 'curveCIF' :
                //-------------------------------------------------
                // //\\ original arc and curve
                //-------------------------------------------------
                ssF.paintsCurve({
                        rgName      : keyName,
                        //addedCssClass   : '....',
                        fun         : theFun.fun,

                        pointA      : { pos :
                            [
                                //free var. t starts from Math.PI/2
                                //to make y === 1,
                                //see fun. def., ind. of comp. 6,
                                1 / Math.pow( Math.PI/2, 1/5 ),

                                null
                            ]
                        },

                        //pointB      : { pos : [0.00000001, null] },
                        pointB      : { pos :
                            [
                                //free var. t starts from Math.PI/2
                                //to make y === 1,
                                //see fun. def., ind. of comp. 6,
                                -1 / Math.pow( Math.PI/2, 1/5 ),

                                null
                            ]
                        },

                        mmedia      : stdMod.mmedia,
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 20000,    //40000 worked as well too
                });
                break;
            //-------------------------------------------------
            // \\// curve IF
            //-------------------------------------------------


            //=================================================
            // //\\ curveCircle
            //=================================================
            case 'curveCircle' :
                ssF.paintsCurve({
                        rgName      : keyName,
                        //addedCssClass   : '....',
                        fun         : theFun.fun,

                        pointA      : { pos :
                            [
                                -0.9,
                                null
                            ]
                        },
                        pointB      : { pos :
                            [
                                0.9,
                                null
                            ]
                        },

                        mmedia      : stdMod.mmedia,
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 1000,
                });
                break;
            //=================================================
            // \\// curveCircle
            //=================================================


            //=================================================
            // //\\ curveRightCircle
            //=================================================
            case 'curveRightCircle' :
                ssF.paintsCurve({
                        rgName      : keyName,
                        //addedCssClass   : '....',
                        fun         : theFun.fun,

                        pointA      : { pos :
                            [
                                0,
                                null
                            ]
                        },
                        pointB      : { pos :
                            [
                                0.9,
                                null
                            ]
                        },

                        mmedia      : stdMod.mmedia,
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 1000,
                });
                break;
            //=================================================
            // \\// curveRightCircle
            //=================================================

            //=================================================
            // //\\ curveLeftCircle
            //=================================================
            case 'curveLeftCircle' :
                ssF.paintsCurve({
                        rgName      : keyName,
                        //addedCssClass   : '....',
                        fun         : theFun.fun,

                        pointA      : { pos :
                            [
                                -0.9,
                                null
                            ]
                        },
                        pointB      : { pos :
                            [
                                0,
                                null
                            ]
                        },

                        mmedia      : stdMod.mmedia,
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 1000,
                });
                break;
            //=================================================
            // \\// curveLeftCircle
            //=================================================

            //=================================================
            // //\\ curveRightCircle
            //=================================================
            case 'curveParabola' :
                ssF.paintsCurve({
                        rgName      : keyName,
                        //addedCssClass   : '....',
                        fun         : theFun.fun,

                        pointA      : { pos :
                            [
                                0,
                                null
                            ]
                        },
                        pointB      : { pos :
                            [
                                0.9,
                                null
                            ]
                        },

                        mmedia      : stdMod.mmedia,
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 1000,
                });
                break;
            //=================================================
            // \\// curveRightCircle
            //=================================================


        }
    }

}) ();

