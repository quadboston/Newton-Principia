
( function() {
    var { ns, fconf, sconf, fixedColors, userOptions } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;


    function init_conf()
    {

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = false;
        sconf.rgShapesVisible           = false;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 839;
        var pictureHeight = 563;

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;        
        
        fconf.DRAGGER_TOLERANCE = 10; // distance where crosshair appears
        
        sconf.TP_OPACITY_LOW_POINT = sconf.TP_OPACITY_LOW = 0.85;

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        sconf.default_tp_lightness = 22;
        sconf.default_tp_stroke_width = 8;
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3.5 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius;

        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        //sconf.nonhover_width = 4;
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );
        //sconf.hover_width = 114;  //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        //sconf.text_nonhover_width = 1;
        sconf.text_hover_width = 2; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),
        // \\// principal tp-css pars
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------        
        //***************************************************************
        // \\// decorational parameters
        //***************************************************************

        //fixes direction of line BE as constant
        //can be any number from -oo to +oo
        sconf.BXBE_per_BY = 0.5;

        //to avoid rounding errors as B gets very close to A
        sconf.NON_ZERO_A_PREVENTOR = 0.0002;

        //================================================================
        // //\\ original positions
        //================================================================
        var modorInPicX = 140; //model origin X (position of A considered 0, 0)
        var modorInPicY = 61; //model origin Y

        var A = [modorInPicX, modorInPicY];
        var B = [323, 156];
        var D = [474, modorInPicY];
        var d = [778, modorInPicY];
        var b = [514, 254];

        var r = [modorInPicX, 531];
        var R = [modorInPicX, 302];

        //================================================================
        // \\// original positions
        //================================================================      
        
        //: topic group colors
        var context = [0, 0, 0];
        var given   = fixedColors.given;        
        var proof   = fixedColors.proof;
        var result  = fixedColors.result;
        var hidden  = fixedColors.hidden;

        var predefinedTopics =
        {
            //:basic topics
            proof,
            given,
            result,
            hidden,

            //claim
            "curve-AB"      : given, //arc-AB plus extension past B
            "left-curve-AB" : given, //extends curve ACB to the left of A
            "arc-AB"        : given, 
            "claimRatio"    : given, //data table

            //proof
            "curve-Ab"      : proof, // todo: unused?
            "arc-Ab"        : proof, // this is the one rendered in proof
            "proofRatio"    : proof, //data table

            //corollaries            
            'BF-data' : given, // used to style BF in data table (sometimes we don't want it linked to model BF line for mouseover highlighting)
        };

        var originalPoints =
        {
            A : { 
                //assigment by reference to pos is safe: no parasite links, pos is recalculated later
                pos         : A,
                letterAngle : 90,
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
                draggableY  : false,
            },
            
            B : {
                pos: B,
                letterAngle : 0,
                pcolor      : given,                
                draggableX  : true,
                draggableY  : true,
            }, 

            DLeft : {
                letterAngle : 90,
                pcolor      : given,
                doPaintPname : false,
            },
            E : {
                letterAngle : 90,
                pcolor      : given,
            },
            F : {
                letterAngle : 90,
                pcolor      : given,
            },
            G : {
                letterAngle : 90,
                pcolor      : given,
            },

            b : {
				caption: "𝑏",
                pos: b,
                letterAngle : 0,
                pcolor      : proof,
            },
            c : {
				caption: "𝑐",
                letterAngle : 45,
                letterRotRadius : 20,
                pcolor      : proof,
            },  
            d : {
				caption: "𝑑",
                pos         : d,
                letterAngle : 90,
                pcolor      : proof,
            },


            r : { //hidden but used to calc pos of b
                pos: r,
                letterAngle : 135,
                pcolor      : given,
            },
            R : {
                pos: R,
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
        };

        var linesArray =
        [            
            { "rd" : { pcolor : hidden } }, // used for calcs

            { 'Ad' : { pcolor : proof } },
            { 'Ab' : { pcolor : proof } },

            { 'bd' : { pcolor : proof } },
            { 'BD' : { pcolor : given } },  //lemma 7, coroll 1
            { 'BF' : { pcolor : given } },
            { 'AF' : { pcolor : given } },
            { 'AG' : { pcolor : given } },
            { 'AE' : { pcolor : given } },
            { 'BG' : { pcolor : given } },
            { 'AE' : { pcolor : given } },
            { 'BE' : { pcolor : given } },
            { 'AB' : { pcolor : given } },
            { 'AD' : { pcolor : given } },

            { 'A,DLeft'  : { pcolor : given, 'stroke-width' : 2, } },
        ]


        //----------------------------------
        // //\\ curve pars
        //      points for divided
        //      differences interpolation
        //----------------------------------
        
        //model's spacial unit in pixels of the picture:
        var mod2inn_scale = originalPoints.R.pos[1] - originalPoints.A.pos[1];

        var givenCurve_pivots =
        [
            //extending the curve to the left is quite a work bs
            //we need to change hard-coded tangent
            // [86,75],
            // [135,64],
            // [100,75],
            // [10,151],

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
                modorInPicY - 61.08569

              ) * ww_factor,
            ]
        );
        //----------------------------------
        // \\// curve pars
        //----------------------------------

        ns.paste( sconf, {
            //double back step ../../ is to reuse this path in code for lemma7
            mediaBgImage : "../../b1sec1lemma6/img/b1s1l6-diagram-3rded-b.png",
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
    }
}) ();