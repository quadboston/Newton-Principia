
( function() {
    var { ns, fconf, sconf } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;









    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        sconf.default_tp_lightness = 22;
        sconf.rgShapesVisible = false;
        sconf.default_tp_stroke_width = 8;
        sconf.text_nonhover_width = 1;
        sconf.text_hover_width = 2; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),
        //sconf.nonhover_width = 4;
        //sconf.hover_width = 114; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),


        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = false;
        //====================================================
        // \\// subapp regim switches
        //====================================================


        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 839;
        var pictureHeight = 563;


        //================================================================
        // //\\ we need good names ...
        //================================================================
        //var modOrigin_inPictureSystem_x;
        //var modorInPicX;
        //var modelOriginInPictureLayoutCoordinates_x = 140;
        //var originX_onPicture = modelOriginInPictureLayoutCoordinates_x;
        //var originY_onPicture = 61;
        var modorInPicX = 140;
        var modorInPicY = 61;
        //================================================================
        // \\// we need good names ...
        //================================================================


        var A = [modorInPicX, modorInPicY];
        var r = [modorInPicX, 531];
        var R = [modorInPicX, 302];
        var B = [323, 156];

        var D = [474, modorInPicY];
        var d = [778, modorInPicY];
        var b = [514, 254];

        //sets position of axis-y for Calculus-framework, not for model axis-y
        var ytop = [-151, 50];

        // //\\ lemma 7
        //fixes direction of line BE as constant
        //can be any number from -oo to +oo
        sconf.BXBE_per_BY = 0.5;
        //todm ... bug: when decreasing then ratio begins worse:
        sconf.NON_ZERO_A_PREVENTOR = 0.01;
        // \\// lemma 7

        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 5;


        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var context = [0,     0,   0,      0.6];
        var given   = [0,     150, 0,      0.6];
        var proof   = [0,     0,   255,    0.6];
        var result  = [200,   40,  0,      0.6];
        var hidden  = [0,     0,   0,      0];


        var predefinedTopics =
        {
            //:basic topics
            proof,
            given,
            result,
            hidden,

            //:given
            "curve-AB"      : given,
            "left-curve-AB" : given, //patch for left branch
            "arc-AB"        : given,

            //proof
            "curve-Ab"      : proof,
            "arc-Ab"        : proof,

            //addendum
            "phi0"          : given,
            "deltaphi"      : given,
            "tangentPhi"    : result,
            'angleBAD'      : given,
            'conterminousRatio' : proof,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        var originalPoints =
        {
            //:context
            //axis-y addendum
            'ytop' : {
                pos             : ytop,
                letterAngle     : 90,
                caption         : 'axis y',
                letterRotRadius : 35,
                pcolor          : context,
            },
            "ylow" : {
                letterAngle : 90,
            },
            O : {
                letterAngle : -90,
                pcolor : given,
            },
            'axis-y_X_rd' : {
            },

            //axis-x addendum
            'xtop' : {
                letterAngle     : 130,
                caption         : 'axis x',
                letterRotRadius : 40,
                //pcolor : given,
            },
            "xlow" : {
                letterAngle : 90,
            },

            //beyond X and L to enable show of tangent angle
            "line-AL-end" : {
            },

            //extends rd to show an angle
            "line-dr-start" : {
                letterAngle : 30,
            },
            ///modified point r, closer to d
            "dr-decorpoint" : {
                caption : 'r',
                pcolor      : proof,
                letterAngle : -90,
                letterRotRadius : 20,
            },

            "y0" : {
                caption     : 'yₒ',
                letterAngle : 225,
                pcolor      : given,
            },
            //By
            'y' : {
                caption     : 'y',
                letterAngle : 45,
                pcolor      : given,
            },
            //Ax
            x : {
                caption     : 'x',
                letterAngle : -45,
                pcolor      : given,
            },
            //Bx
            x0 : {
                caption     : 'xₒ',
                letterAngle : 135,
                pcolor      : given,
            },
            
            // //\\ magnified points
            'Y0' : {
                pos             : A,
                caption         : 'Yₒ',
                letterAngle     : 210,
                letterRotRadius : 50,
                pcolor          : proof,
            },
            //BY
            'Y' : {
                caption         : 'Y',
                letterAngle     : 180,
                letterRotRadius : 35,
                pcolor          : proof,
            },
            //AX0
            'X0' : {
                caption         : 'Xₒ',
                letterAngle     : -90,
                pcolor          : proof,
            },
            //BX
            'X' : {
                caption         : 'X',
                letterAngle     : -90,
                pcolor          : proof,
            },
            // \\// magnified points


            //:originals from Book
            A : { 
                //assigment by reference to pos is safe: no parasite links, pos is recalculated later
                pos         : A,
                letterAngle : 90,
                pcolor      : given,
            },
            r : {
                pos: r,
                letterAngle : 135,
                pcolor      : given,
            },
            R : {
                pos: R,
                letterAngle : 135,
                pcolor      : given,
            },
            B : {
                pos: B,
                letterAngle : 0,
                pcolor      : given,
            },
            /*
            'B-kernelx' : {
               cssClass : 'hover-width',
            },
            */

            C : {
                letterAngle : 45,
                letterRotRadius : 13,
                pcolor      : given,
            },

            D : {
                pos: D,
                letterAngle : 90,
                pcolor      : given,
            },

            //proof
            b : {
                pos: b,
                letterAngle : 0,
                pcolor      : proof,
            },

            c : {
                letterAngle : 45,
                letterRotRadius : 13,
                pcolor      : proof,
            },
  
  
            d : {
                pos         : d,
                letterAngle : 90,
                pcolor      : proof,
            },

            curveEnd : {
                pos : [B[0]+50,0],
            },
            curveStart  : {
                pos : [ A[0]-80, 0 ],
            },

            //lemma 7, coroll 1
            F : {
                letterAngle : 90,
                pcolor      : given,
            },
            G : {
                letterAngle : 90,
                pcolor      : given,
            },
            E : {
                letterAngle : 90,
                pcolor      : given,
            },
            e : {
                letterAngle : 90,
                pcolor      : proof,
            },
            L : { 
                letterAngle : -45,
                pcolor      : result,
            },

        };
        ///alternatively to this, you can set own colors for originalPoints
        ///by your own
        ns.eachprop( originalPoints, (point,pname) => {
            point.pcolor = ns.haz( point, 'pcolor' ) || predefinedTopics[ pname ];
        });

        //model's spacial unit in pixels of the picture:
        var mod2inn_scale = originalPoints.R.pos[1] - originalPoints.A.pos[1];
        var linesArray =
        [
            { 'Ad' : { pcolor : proof } },
            { 'Ar' : { pcolor : given } },
            { 'Ab' : { pcolor : proof } },
            { "rd" : { pcolor : proof } },

            { 'dr-decorpoint,d' : { pcolor : proof } },
            { 'dr' : { pcolor : proof } },


            //l7
            { 'bd' : { pcolor : proof } },
            { 'BD' : { pcolor : given } },  //lemma 7, coroll 1
            { 'BF' : { pcolor : given } },
            { 'AF' : { pcolor : given } },
            { 'AG' : { pcolor : given } },
            { 'AE' : { pcolor : given } },
            { 'BG' : { pcolor : given } },
            { 'be' : { pcolor : proof } },

            //sin(x)/x
            { 'Br' : { pcolor : given } },


            { 'line-dr-start,dr-decorpoint' : { pcolor : proof, undisplay : true } },

             //:context
            { 'ylow,ytop' : { pcolor : context, } },
            { 'xlow,xtop' : { pcolor : context, } },
            { 'O,ytop'    : { pcolor : context, } },

            //cirle radius
            { 'AO'    : { pcolor : given, 'stroke-width' : 1, } },

            //cirle radius
            { 'BO'    : { pcolor : given, 'stroke-width' : 1, } },

             //x-drops to axix x
            { 'A,x0'  : { pcolor : given, 'stroke-width' : 1, } },
            { 'Bx'    : { pcolor : given, 'stroke-width' : 1, } },
             //y-drops to axix y
            { 'A,y0'  : { pcolor : given, 'stroke-width' : 1, } },
            { 'By'    : { pcolor : given, 'stroke-width' : 1, } },



            //dy
            { 'y0,y' : { pcolor : given, 'stroke-width' : 8, } },
            //dx
            { 'x0,x' : { pcolor : given, 'stroke-width' : 8, } },

            { 'A,line-AL-end' : { pcolor : result } },

            //DY
            { 'A,Y' : { pcolor : proof, 'stroke-width' : 8, } },
            //DX
            { 'X0,X' : { pcolor : proof, 'stroke-width' : 8, } },

            //tangent
            { 'AL' : { pcolor : result } },
            { 'Ae' : { pcolor : proof } },

            { 'AE' : { pcolor : given } },
            { 'BE' : { pcolor : given } },
            { 'AB' : { pcolor : given } },
            { 'AD' : { pcolor : given } },
        ]

        //----------------------------------
        // //\\ curve pars
        //      points for divided
        //      differences interpolation
        //----------------------------------
        var minusX1 = 148 - modorInPicX;
        var minusX2 = 161 - modorInPicX;
        var minusX3 = 202 - modorInPicX;
        var minusX4 = 259 - modorInPicX;
        var minusX5 = 305 - modorInPicX;
        var minusX6 = B[0] - modorInPicX;
        var minusX7 = 353 - modorInPicX;
        var minusX8 = 360.5 - modorInPicX;


        var givenCurve_pivots =
        [
            //extending the curve to the left is quite a work bs
            //we need to change hard-coded tangent
            //[86,75],
            //[135,64],
            //[100,75],
            //[10,151],

            [148,62],
            [161,64],
            [202,75],
            [259,100],
            [305,135],
            [B[0], B[1]],
            [353,203],
            //[360.5, 239.0], //"oversampling"
        ];
        var ww_MONITOR_Y_FLIP = -1;
        var ww_inn2mod_scale = 1/mod2inn_scale;
        var ww_factor = ww_MONITOR_Y_FLIP * ww_inn2mod_scale;
        var givenCurve_pivots_inModel = givenCurve_pivots.map( opoint =>
            [ ( opoint[0] - modorInPicX ) * ww_inn2mod_scale,
              ( opoint[1] - modorInPicY +

                //additional tune-up: shifting curve exactly into origin A
                modorInPicY - 61.0858

              ) * ww_factor,
            ]
        );
        //----------------------------------
        // \\// curve pars
        //----------------------------------


        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;

        ns.paste( sconf, {
            //double back step ../../ is to reuse this path in code for lemma7
            mediaBgImage : "../../b1sec1lemma6/img/b1s1l6-diagram-3rded-b.png",
            givenCurve_pivots_inModel,
            predefinedTopics,
            originalPoints,
            linesArray,
            //lines,
            modorInPicX,
            modorInPicY,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
        });
        //--------------------------------------
        // \\// geometics parameters
        //--------------------------------------
    }
}) ();

