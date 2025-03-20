
( function() {
    var { ns, fconf, sconf } =
    window.b$l.apptree({ ssFExportList : { init_conf } });

    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //overrides "global", lemma.conf.js::sconf
        sconf.TP_OPACITY_LOW_POINT = 1; // opacity of slider circles
        sconf.default_tp_lightness = 22; // darkness of lines, curves
        sconf.default_tp_stroke_width = 8; //size of slider circles
        sconf.pointDecoration.r= 5; // radius of all points, both static and slider

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false; // true to include options as in Book 3 Lemma 5
        sconf.enableTools               = false;
        sconf.rgShapesVisible           = false; // false to show only relevant lines, points, labels
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 858; // size of svg div
        var pictureHeight = 566;
        var modorInPicX = 166; // affect the shape of ACB
        var modorInPicY = 63;

        //model's spacial unit in pixels of the picture:
        var mod2inn_scale = 239; // conversion factor to calc values displayed in data table
        
        var A = [modorInPicX, modorInPicY];
        var B = [358, 165];
        var D = [496, modorInPicY];

        sconf.b_per_B_original = 1.931578947; // determines distance between B and b

        //-----------------------------------
        // //\\ svg model colors
        //-----------------------------------
        var context = [0,   0,   0]; // used only if sconf.rgShapesVisible === true
        var result  = [200, 40,  0];
        var given   = [0,   150, 0]; // claim green, used for lines, points, and text (not data tables)
        var proof   = [0,   0,   255]; // proof blue
        var shadow  = [150, 150, 150]; // colour of φ both point and label
        var hidden  = [0,   0,   0,   0];
        var red = [255,0,0]; //for debugging

        var predefinedTopics = { 
            //:basic topics
            proof,
            given,
            result,
            hidden,

            //given (claim)
            "curve-AB"      : given, // ACB and curve segment after B
            "left-curve-AB" : given, // curve segment before A
            "arc-AB"        : given, // ACB (redundant?)

            //proof
            "arc-Ab"        : proof, // Acb

            
            // the rest are only used when rgShapesVisible === true
            // todo: maybe some are not used at all
            "curve-Ab"      : proof, 

            //addendum
            "phi0"          : given,
            "deltaphi"      : given,
            "tangentPhi"    : result,
            'angleBAD'      : given,
            'conterminousRatio' : proof,
        };

        var originalPoints = { 

            // colours of points and their labels
            //:originals from Book
            A : {
                //assigment by reference to pos is safe: no parasite links,
                //pos is recalculated later
                pos         : A,
                letterAngle : 90,
                pcolor      : given,
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
            D : {
                pos: D,
                letterAngle : 90,
                pcolor      : given,
            },
            R : {
                letterAngle : 135,
                pcolor      : given,
                draggableX  : false,
                draggableY  : true,
            },            
            fi : {
                caption : "φ",
                pcolor : shadow,
                letterAngle : 180,
                draggableX  : true,
                draggableY  : true,
            },
            c : {
                letterAngle : 45,
                letterRotRadius : 18,
                pcolor      : proof,
            },
            b : {
                letterAngle : 0,
                pcolor      : proof,
            },
            
            // todo: these two only work when rgShapesVisible, where r and d defined?
            d : {
                caption : 'dₒ',
                letterAngle : 90,
                pcolor      : proof,
            },
            r : {
                caption : 'rₒ',
                letterAngle : 135,
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

            
            // the rest are only used when rgShapesVisible === true
            // todo: maybe some are not used at all

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

            DLeft : {
                letterAngle : 90,
                pcolor      : given,
                doPaintPname : false,
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

        var linesArray =
        [
            // given (shown in green)            
            { 'AB' : { pcolor : given } },
            { 'AR' : { pcolor : given } }, 
            { 'AD' : { pcolor : given } }, 
            { 'A,DLeft'  : { pcolor : given, 'stroke-width' : 2, } }, // to left of A            
            { 'RD' : { pcolor : given } },
            { 'BR' : { pcolor : given } },

            // proof (shown in blue) 
            { 'Ab' : { pcolor : proof } },   
            { 'A,imageOfR' : { pcolor : proof } }, // Ar      
            { 'A,imageOfD' : { pcolor : proof } }, // Ad  
            { 'imageOfR,imageOfD' : { pcolor : proof } }, // rd
            { 'imageOfR,b' : { pcolor : proof } }, //rb

            // questionable                       
            { 'Ad' : { pcolor : hidden } }, // todo: Ad dup
            { "rd" : { pcolor : hidden } }, // todo: this line should not exist
            { 'Ar' : { pcolor : hidden } }, // todo: this line should not exist


            // the rest of these are only use if rgShapesVisible
            // todo: maybe some not at all in L8?

            { "rb" : { pcolor : proof } },
            { 'dr-decorpoint,d' : { pcolor : proof } },
            { 'dr' : { pcolor : proof } },

            //l7
            { 'bd' : { pcolor : hidden } },
            { 'be' : { pcolor : hidden } },

            //l7
            { 'BD' : { pcolor : hidden } },  //lemma 7, coroll 1
            { 'BF' : { pcolor : hidden } },
            { 'AF' : { pcolor : hidden } },
            { 'AG' : { pcolor : hidden } },
            { 'AE' : { pcolor : hidden } },
            { 'BG' : { pcolor : hidden } },

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
        ]

        //----------------------------------
        // //\\ curve pars
        //     points for divided differences interpolation
        //
        // *** used only if sconf.rgShapesVisible === true
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

        var givenCurve_pivots = [
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
        fconf.LETTER_FONT_SIZE_PER_1000 = 20; //font size of labels

        ns.paste( sconf, { // adds these members to globally available sconf
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

