
( function() {
    var { ns, fconf, sconf, fixedColors, userOptions } =
    window.b$l.apptree({ ssFExportList : { init_conf } });

    function init_conf()
    {
        sconf.BONUS = userOptions.showingBonusFeatures(); //addendum options ticked

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

        sconf.TP_OPACITY_LOW_POINT = 1;
        sconf.TP_OPACITY_LOW = 1; // applied to points, lines, and table data
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 5;

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        sconf.default_tp_lightness = 22;
        sconf.default_tp_stroke_width = 8;
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3 * controlsScale ),

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

        // *** used only if BONUS || rgShapesVisible (todo: maybe not at all)
        //sets position of axis-y for Calculus-framework, not for model axis-y
        var ytop = [-151, 50];        
        
        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var context = [0, 0, 0];
        var given   = fixedColors.given;        
        var proof   = fixedColors.proof;
        var result  = fixedColors.result;
        var hidden  = fixedColors.hidden;
        var red = [255,0,0]; //for debugging

        var predefinedTopics =
        {
            //:basic topics
            proof,
            given,
            result,
            hidden,

            //claim
            "curve-AB"      : given,
            "left-curve-AB" : given, //extends curve ACB to the left of A
            "arc-AB"        : given, //curve-AB plus extension past B
            "claimRatio"    : given, //data table

            //proof
            "curve-Ab"      : proof, // todo: unused?
            "arc-Ab"        : proof, // this is the one rendered in proof
            "proofRatio"    : proof, //data table
        };

        var originalPoints =
        {
            A : { 
                //assigment by reference to pos is safe: no parasite links, pos is recalculated later
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
                draggableX  : sconf.BONUS? false : true, // this adds animation and allows dragging along x
                draggableY  : false,
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
            e : {
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

        addBonusVars(); // todo: would be great if we only called this if BONUS === true, but as is that would break the page
        function addBonusVars() {            
            // *** these are only used if BONUS || rgShapesVisible (some maybe not at all)

            var predefinedTopicsBonus = {
                //addendum
                "phi0"          : given,
                "deltaphi"      : given,
                "tangentPhi"    : result,
                'angleBAD'      : given,
                'conterminousRatio' : proof,
            }
            predefinedTopics = {...predefinedTopics, ...predefinedTopicsBonus};

            var originalPointsBonus = {
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

                L : { 
                    letterAngle : -45,
                    pcolor      : result,
                },
            }
            originalPoints = {...originalPoints, ...originalPointsBonus};

            var linesArrayBonus = [
                { 'Ar' : { pcolor : given } },
                { 'dr-decorpoint,d' : { pcolor : proof } },
                { 'dr' : { pcolor : proof } },

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
            ];
            linesArray = [...linesArray, ...linesArrayBonus];
        }

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
            //lines,
            modorInPicX,
            modorInPicY,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
        });
    }
}) ();

