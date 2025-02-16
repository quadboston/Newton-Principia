
( function() {
    var { ns, fconf, sconf } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;









    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        sconf.TP_OPACITY_LOW_POINT = 1;
        sconf.default_tp_lightness = 22;
        sconf.rgShapesVisible = false;
        sconf.default_tp_stroke_width = 8;
        sconf.text_nonhover_width = 1;
        sconf.text_hover_width = 2; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),
        //sconf.nonhover_width = 4;
        //sconf.hover_width = 114; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 5;


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
        var pictureWidth = 858;
        var pictureHeight = 566;
        var modorInPicX = 166;
        var modorInPicY = 63;

        //model's spacial unit in pixels of the picture:
        var mod2inn_scale = 239; //was?: originalPoints.R.pos[1] - originalPoints.A.pos[1];
        
        var A = [modorInPicX, modorInPicY];
        var B = [358, 165];
        var D = [496, modorInPicY];

        var M = [140, modorInPicY];

        sconf.b_per_B_original = 1.931578947;


        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var context = [0,     0,   0];
        var given   = [0,     150, 0];
        var proof   = [0,     0,   255];
        var result  = [200,   40,  0];
        var shadow  = [150,  150,  150];
        var hidden  = [0,     0,   0,     0];


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

            ///modified point r, closer to d
            "imageOfR" : {
                caption : "r",
                pcolor      : proof,
                letterAngle : -45,
                letterRotRadius : 30,
            },

            ///modified point r, closer to d
            "imageOfD" : {
                caption : "d",
                pos : D,
                pcolor      : proof,
                letterAngle : -90,
                letterRotRadius : 30,
            },


            c : {
                letterAngle : 45,
                letterRotRadius : 18,
                pcolor      : proof,
            },

            //proof
            b : {
                letterAngle : 0,
                pcolor      : proof,
            },
            d : {
                caption : 'dₒ',
                letterAngle : 90,
                pcolor      : proof,
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
                //assigment by reference to pos is safe: no parasite links,
                //pos is recalculated later
                pos         : A,
                letterAngle : 90,
                pcolor      : given,
            },

            r : {
                caption : 'rₒ',
                letterAngle : 135,
                pcolor      : given,
            },

            R : {
                letterAngle : 135,
                pcolor      : given,
                draggableX  : false,
                draggableY  : true,
            },

            B : {
                pos: B,
                letterAngle : 0,
                pcolor      : given,
            },

            C : {
                letterAngle : 45,
                letterRotRadius : 13,
                pcolor      : given,
            },


            M : {
              pos: M,
              letterAngle : 90,
              pcolor      : given,
            },

            /*
            'B-kernelx' : {
               cssClass : 'hover-width',
            },
            */
            D : {
                pos: D,
                letterAngle : 90,
                pcolor      : given,
            },

            curveStart  : {
                pos : [ A[0]-80, 0 ],
            },
            curveEnd : {
                pos : [B[0]+50,0],
            },
            curveLeftEnd : {
                pos : [250,100],
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

            fi : {
                caption : "",
                pcolor : given,
                letterAngle : 180,
                draggableX  : true,
                draggableY  : true,
            },

        };
        ///alternatively to this, you can set own colors for originalPoints
        ///by your own
        ns.eachprop( originalPoints, (point,pname) => {
            point.pcolor = ns.haz( point, 'pcolor' ) || predefinedTopics[ pname ];
        });

        var linesArray =
        [
            { "rd" : { pcolor : proof } },
            { "rb" : { pcolor : proof } },

            { 'dr-decorpoint,d' : { pcolor : proof } },
            { 'dr' : { pcolor : proof } },
            { 'imageOfR,imageOfD' : { pcolor : proof } },
            { 'A,imageOfD' : { pcolor : proof } },
            { 'A,imageOfR' : { pcolor : proof } },
            { 'imageOfR,b' : { pcolor : proof } },

            { 'Ad' : { pcolor : proof } },
            { 'Ar' : { pcolor : given } },

            //l7
            { 'bd' : { pcolor : proof } },
            { 'be' : { pcolor : proof } },

            { 'Ab' : { pcolor : proof } },
            { 'AR' : { pcolor : given } },
            { 'AD' : { pcolor : given } },

            //l7
            { 'BD' : { pcolor : given } },  //lemma 7, coroll 1
            { 'BF' : { pcolor : given } },
            { 'AF' : { pcolor : given } },
            { 'AG' : { pcolor : given } },
            { 'AE' : { pcolor : given } },
            { 'BG' : { pcolor : given } },


            //l8
            { 'RD' : { pcolor : given } },
            { 'BR' : { pcolor : given } },

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
            
            { 'AM' : { pcolor : given, 'stroke-width' : 2 } },
        ]

        //----------------------------------
        // //\\ curve pars
        //      points for divided
        //      differences interpolation
        //----------------------------------
        var ww1 = [204,67];
        var ww1 = [244,82];
        var ww2 = [272,94];
        var ww2 = [300,110];
        var ww3 = B;

        originalPoints.t1 = {
                pos: ww1,
                letterAngle : 90,
                pcolor      : given,
        };
        originalPoints.t2 = {
                pos: ww2,
                letterAngle : 90,
                pcolor      : given,
        };

        var givenCurve_pivots =
        [
            //make curve symmetrical in respect to axis Y
            [2*A[0]-ww3[0],ww3[1]],
            [2*A[0]-ww2[0],ww2[1]],
            [2*A[0]-ww1[0],ww1[1]],

            [A[0], A[1]],
            ww1,
            ww2,
            [ww3[0], ww3[1]],
            [377,206],
        ];
        var ww_MONITOR_Y_FLIP = -1;
        var ww_inn2mod_scale = 1/mod2inn_scale;
        var ww_factor = ww_MONITOR_Y_FLIP * ww_inn2mod_scale;
        var givenCurve_pivots_inModel = givenCurve_pivots.map( opoint =>
            [ ( opoint[0] - modorInPicX ) * ww_inn2mod_scale,
              ( opoint[1] - modorInPicY
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
            mediaBgImage : "../../b1sec1lemma8/img/d.png",
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

