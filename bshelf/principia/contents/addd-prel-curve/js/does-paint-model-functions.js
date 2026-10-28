( function() {
    var {
        haz,
        ssF,
        ssD,
        stdMod,
    } = window.b$l.atree({
        stdModList :
        {
            doesPaintCurve,
        },
    });
    return;













    ///**************************************************
    /// doesPaintCurve
    ///**************************************************
    function doesPaintCurve( keyName, funArgs )
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
                ssF.gcurve2svg({
                        rgn      : keyName,
                        //cssClass   : '....',
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
                        addToStepCount : 1,
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
                ssF.gcurve2svg({
                        rgn      : keyName,
                        //cssClass   : '....',
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
                ssF.gcurve2svg({
                        rgn      : keyName,
                        //cssClass   : '....',
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

                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 1000,
                });
                break;
            //=================================================
            // \\// curveCircle
            //=================================================



            //=================================================
            // //\\ curveIFC
            //=================================================
            case 'curveIFC' :
                ssF.gcurve2svg({
                        rgn      : keyName,
                        fun         : theFun.fun,

                        pointA      : { pos :
                            [
                                0.05,
                                //-0.098,
                                null
                            ]
                        },
                        pointB      : { pos :
                            [
                                0.098,
                                null
                            ]
                        },
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 1000,
                });
                ssF.gcurve2svg({
                        rgn      : keyName + 'left',
                        fun         : theFun.fun,

                        pointA      : { pos :
                            [
                                -0.05,
                                null
                            ]
                        },
                        pointB      : { pos :
                            [
                                -0.098,
                                null
                            ]
                        },
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 1000,
                });
                break;
            //=================================================
            // \\// curveIFC
            //=================================================




            //=================================================
            // //\\ curvatureCircle
            //=================================================
            case 'curvatureCircle' :
                var R = haz( funArgs, 'R' ) || 1;
                var center = haz( funArgs, 'center' ) || [0,0];
                var gFun = theFun.funGen( R, center );
                ssF.gcurve2svg({
                        rgn      : keyName,
                        //cssClass   : '....',
                        fun         : gFun,

                        pointA      : { pos :
                            [
                                -Math.PI,
                                null
                            ]
                        },
                        pointB      : { pos :
                            [
                                Math.PI,
                                null
                            ]
                        },
                        addToStepCount : 1,
                        //stroke      : 'red',
                        stepsCount  : 1000,
                });
                break;
            //=================================================
            // \\// curvatureCircle
            //=================================================



            //=================================================
            // //\\ curveRightCircle
            //=================================================
            case 'curveRightCircle' :
                ssF.gcurve2svg({
                        rgn      : keyName,
                        //cssClass   : '....',
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
                ssF.gcurve2svg({
                        rgn      : keyName,
                        //cssClass   : '....',
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
                ssF.gcurve2svg({
                        rgn      : keyName,
                        //cssClass   : '....',
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

