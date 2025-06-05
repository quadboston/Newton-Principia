
( function() {
    var { ns, fconf, sconf } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;









    ///====================================================
    /// inits and sets config pars
    ///====================================================
    function init_conf()
    {
        fconf.ESSAY_FRACTION_IN_WORKPANE = 0.7;
        fconf.timeToShowOriginalDiagram  = null;

        sconf.rgShapesVisible = true;

        //max diagram magnitude for scale
        //mouse-wheel sliders
        sconf.MAX_MAGNITUDE = 10;

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true; //false;
        sconf.GENERIC_SLIDERS_COUNT     = 0;
        sconf.SLIDERS_LEGEND_HEIGHT     = 0;
        //====================================================
        // \\// subapp regim switches
        //====================================================


        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        sconf.default_tp_lightness = 30;
        var pictureWidth = 1500;
        var pictureHeight = 1200;

        var originX_onPicture = 400;
        var originY_onPicture = 150;

        var A       = [originX_onPicture, originY_onPicture];
        var B       = [originX_onPicture+400, originY_onPicture];
        var axisX   = [originX_onPicture, 1100];
        var axisY   = [1300, originY_onPicture];
        var T       = [1000, originY_onPicture];
        var Tleft   = [originX_onPicture-350, originY_onPicture];
        var X       = [1000, originY_onPicture+100];

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var context = [50,   0,   100,    1];
        var given   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var result  = [200,   40,  0,      1];
        var hidden  = [0,     0,   0,      0];

        var predefinedTopics =
        {
            //:basic topics
            proof,
            given,
            result,
            hidden,
            curveIF             : given,
            curveCIF            : given,
            curveIFC            : given,
            curveIFCleft        : given,
            curveCircle         : given,
            curveLeftCircle     : given,
            curveRightCircle    : given,
            curveParabola       : given,
            curvatureCircle     : result,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        var originalPoints =
        {
            /*
            //:originals from Book
            A : { 
                //assigment by reference to pos is safe: no parasite links, pos is recalculated later
                pos         : A,
                letterAngle : 90,
                pcolor      : given,
            },


            //---------------------------------------
            // //\\ curvature related
            //---------------------------------------
            B : { 
                pos         : B,
                letterAngle : 0,
                pcolor      : proof,
                draggableX  : true,
            },

            //for circumscribed circle
            D : { 
                pos         : A,
                letterAngle : 0,
                pcolor      : proof,
            },
            R : { 
                pos         : A,
                letterAngle : 0,
                pcolor      : result,
            },
            //curvature center
            Rc : { 
                pos         : A,
                letterAngle : 180,
                letterRotRadius : 50,
                pcolor      : result,
            },
            N : { 
                pos         : [ A[0], 1100*0.9 ],
                letterAngle : 180,
                letterRotRadius : 50,
                pcolor      : proof,
            },

            //---------------------------------------
            // \\// curvature related
            //---------------------------------------


            axisX : {
                pos         : axisX,
                caption     : 'axis x',
                letterAngle : 135,
                pcolor      : context,
            },
            axisY : {
                pos         : axisY,
                caption     : 'axis y',
                letterAngle : 0,
                pcolor      : context,
            },
            T : {

                //apparently UTF misses "g" and "f", funny ...
                //caption     : 'Tᵣᵢₒₕₜ',
                caption     : 'Tright',

                pos         : T,
                letterAngle : 90,
                pcolor      : result,
            },

            Tleft : {

                //apparently UTF misses "g" and "f", funny ...
                //caption     : 'Tᵣᵢₒₕₜ',
                caption     : 'Tleft',

                pos         : Tleft,
                letterAngle : 90,
                pcolor      : result,
            },

            X : {
                pos         : X,
                letterAngle : 0,
                pcolor      : proof,
                draggableY  : true,
            },
            */
        };

        ///alternatively to this, you can set own colors for originalPoints
        ///by your own
        ns.eachprop( originalPoints, (point,pname) => {
            point.pcolor = ns.haz( point, 'pcolor' ) || predefinedTopics[ pname ];
        });

        //model's spacial unit in pixels of the picture:
        var mod2inn_scale = 1000;

        var linesArray =
        [
            /*
            { 'A,axisX' : { pcolor : context } },
            { 'A,axisY' : { pcolor : context } },
            { 'AT'      : { pcolor : result, },}, // zOrderAfter:true } },
            { 'A,Tleft' : { pcolor : result, },}, // zOrderAfter:true } },
            { 'AX'      : { pcolor : proof,  },}, // zOrderAfter:true } },
            { 'AB'      : { pcolor : proof,  },}, // zOrderAfter:true } },
            { 'AD'      : { pcolor : proof,  },}, // zOrderAfter:true } },
            { 'BR'      : { pcolor : result,  },}, // zOrderAfter:true } },
            { 'BD'      : { pcolor : proof,  },}, // zOrderAfter:true } },
            { 'AN'      : { pcolor : proof,  },}, // zOrderAfter:true } },
            { 'A,Rc'    : { pcolor : result, },}, // zOrderAfter:true } },
            //{ 'H1,H2'   : { pcolor : context } },
            */
        ];


        ///*********************************************
        ///don't do both lines and linesArray in config
        ///if this is done, lines will be ignored
        ///*********************************************
        ///var lines = {};
        ns.paste( sconf, {
            mediaBgImage : "lemma-theoremII-corollary1.jpg",
            predefinedTopics,
            originalPoints,
            linesArray,
            //lines,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
            
            default_tp_stroke_width : 12,
        });
        //--------------------------------------
        // \\// geometics parameters
        //--------------------------------------
    }
}) ();

