
( function() {
    var { ns, fconf, sconf, fixedColors } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;


    //====================================================
    // //\\// inits and sets config pars
    //====================================================
    function init_conf()
    {

        //overrides "global", lemma.conf.js::sconf
        sconf.default_tp_lightness = 22; // darkness of lines, curves
        sconf.default_tp_stroke_width = 8; //size of slider circles
        sconf.pointDecoration.r= 5; // radius of all points, both static and slider
        sconf.b_per_B_original = 1.931578947; // determines distance between B and b

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false; // true to include options as in Book 3 Lemma 5
        sconf.enableTools               = false;
        sconf.rgShapesVisible           = false; // false to show only relevant lines, points, labels
        //====================================================
        // \\// subapp regim switches
        //====================================================
        
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20; //font size of labels

        sconf.TP_OPACITY_LOW_POINT = sconf.TP_OPACITY_LOW = 0.85;

        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------

        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 858; // size of svg div
        var pictureHeight = 566;
        var modorInPicX = 166; // affect the shape of ACB
        var modorInPicY = 63;
        
        var A = [modorInPicX, modorInPicY];
        var B = [358, 165];
        var D = [496, modorInPicY];

        //: svg model colors
        const {
            given,
            proof,
            hidden,
            result,
            givenArea,
            proofArea
        } = fixedColors;

        var predefinedTopics = { 
            //:basic topics
            proof,
            given,
            result,
            hidden,

            //given (claim)
            "curve-AB"      : given, // ACB and curve segment after B
            "left-curve-AB" : given, // curve segment before A
            "arc-AB"        : given, ////curve-AB plus extension past B

            //proof
            "arc-Ab"        : proof, // Acb
            
            // triangles
            'RAB' : given, 
            'RACB' : given, 
            'RAD' : given, 
            'RACB-RAB' : given, 
            'RAD-RAB' : given, 
            
            'rAb' : proof, 
            'rAcb' : proof, 
            'rAd' : proof, 
            'rAcb-rAb' : proof, 
            'rAd-rAb' : proof, 

            // areas
            'area-RAB' : givenArea,
            'area-RAD' : givenArea,
            'area-RACB' : givenArea,

            
            'area-rAb' : proofArea,
            'area-rAd' : proofArea,
            'area-rAcb' : proofArea
        };

        var originalPoints = { 

            // styles, positions, and animations of points and their labels
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
                draggableX  : true, // this adds animation and allows dragging along x
                draggableY  : false, // but not y
            },
            R : {
                letterAngle : 135,
                pcolor      : given,
                draggableX  : true, // this adds mouseover animation, but does not affect behaviour...?
                draggableY  : true,
            },            
            c : {
				caption: "𝑐",
                letterAngle : 45,
                letterRotRadius : 18,
                pcolor      : proof,
            },
            b : {
				caption: "𝑏",
                letterAngle : 0,
                pcolor      : proof,
            },

            ///modified point r, closer to d
            "r" : {
				caption : "𝑟",
                pcolor      : proof,
                letterAngle : -45,
                letterRotRadius : 30,
            },

            ///modified point r, closer to d
            "d" : {
                caption : "𝑑",
                pos : D,
                pcolor      : proof,
                letterAngle : -90,
                letterRotRadius : 30,
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
            DLeft : {
                letterAngle : 90,
                pcolor      : given,
                doPaintPname : false,
            },

        };

        var linesArray =
        [
            //** this defines render order */

            // proof (shown in blue) 
            { 'Ab' : { pcolor : proof } },  

            { 'A,d' : { pcolor : proof } }, // Ad  
            { 'A,r' : { pcolor : proof } }, // Ar   
            { 'r,d' : { pcolor : proof } }, // rd
            { 'r,b' : { pcolor : proof } }, //rb

            // claim (shown in green)            
            { 'AB' : { pcolor : given } },
            { 'AR' : { pcolor : given } }, 
            { 'AD' : { pcolor : given } }, 
            { 'A,DLeft'  : { pcolor : given, 'stroke-width' : 2, } }, // to left of A            
            { 'RD' : { pcolor : given } },
            { 'BR' : { pcolor : given } },

            // questionable                       
            { 'Ad' : { pcolor : hidden } }, // todo: Ad dup
            { 'Ar' : { pcolor : hidden } }, // todo: this line should not exist
            { "rd" : { pcolor : hidden } }, // todo: this line should not exist
            { "rb" : { pcolor : hidden } }, // todo: this doesn't seem to exist
        ];

        //----------------------------------
        // //\\ curve pars
        //     points for divided differences interpolation
        //----------------------------------
        var ww1 = [204,67];
        var ww1 = [244,82];
        var ww2 = [272,94];
        var ww2 = [300,110];
        var ww3 = B;
        
        //model's spacial unit in pixels of the picture:
        var mod2inn_scale = 239; // conversion factor to calc values displayed in data table

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

        ns.paste( sconf, { // adds these members to globally available sconf
            //double back step ../../ is to reuse this path in code for lemma7
            mediaBgImage : "../../b1sec1lemma8/img/d.png",
            givenCurve_pivots_inModel,
            predefinedTopics,
            originalPoints,
            linesArray,
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

