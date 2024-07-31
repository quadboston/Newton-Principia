( function() {
    var { sconf, paste, fconf, rg } =
    window.b$l.apptree(
        {
            ssFExportList : { init_conf }
        }
    );
    return;









    function init_conf()
    {
        //----------------------------------
        // //\\ study model parameters
        //----------------------------------
        var APP_MODEL_Y_RANGE = 1000;
        //----------------------------------
        // \\// study model parameters
        //----------------------------------

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = false;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //----------------------------------
        // //\\ paper diagram parameters
        //----------------------------------
        var pictureWidth    = 504;
        var pictureHeight   = 495;

        var pointA          = [ 28, 456 ];
        var pointe          = [ 28, 46 ];

        var modorInPicX = pointA[0];
        var modorInPicY = pointA[1]; 
        //.set it from graph editor
        var pictureActiveArea = pointA[1] - 46;
 
        var mod2inn_scale = pictureActiveArea / APP_MODEL_Y_RANGE;
        var originX_onPicture = pointA[0];
        var originY_onPicture = pointA[1];
        //----------------------------------
        // \\// paper diagram parameters
        //----------------------------------

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        //gives bar full range of opacity for tp machine
        sconf.TOPIC_FILL_OPACITY_IN_FOCUS = 1;
        //makes idle bars brighter
        sconf.TOPIC_FILL_OPACITY_NOT_IN_FOCUS = 0.6;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 3;

        //--------------------------------------
        // //\\ does override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3 * controlsScale ),
        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
        sconf.text_hover_width      = 1.5;
        // \\// principal tp-css pars

        sconf.default_tp_lightness = 30;
        //--------------------------------------
        // \\// does override engine defaults,
        // \\// decorational parameters
        //***************************************************************


        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var given   = [0,     150, 0,      ]; //0.5];
        var proof   = [0,     0,   255,    ]; //0.5];
        var result  = [200,   40,  0,      ]; //0.5];
        var hidden  = [0,     0,   0,      ]; //0];


        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,

            //:curves
            "ABC"               : given,
            "mainCurve"         : given,
            "Abc"               : proof,
            "remoteCurve"       : proof,

            //:areas
            "ABD"               : given,
            "ACE"               : given,
            "area-ABD"               : given,
            "area-ACE"               : given,
            "Abd"               : proof,
            "Ace"               : proof,
            "area-Abd"               : proof,
            "area-Ace"               : proof,
            //:linear areas
            "Afd"               : result,
            "Age"               : result,

            "ABDPerACE"         : given,
            "AD2PerAE2"         : result,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------


        var originalPoints =
        {
            'A' : { 
                pos         : pointA,
                pcolor      : given,
                letterAngle : -90,
            },
            'e' : { 
                pos         : pointe,
                pcolor      : proof,
                letterAngle : 90,
            },

            'B' : { 
                pcolor      : given,
                letterAngle : 0,
            },
            'C' : { 
                pcolor      : given,
                letterAngle : -45,
            },
            'D' : { 
                pcolor      : given,
                letterAngle : 215,
            },
            'E' : { 
                pcolor      : given,
                letterAngle : 180,
            },
            'b' : { 
                pcolor      : proof,
                letterAngle : 0,
            },
            'c' : { 
                pcolor      : proof,
                letterAngle : -90,
            },
            'd' : { 
                pcolor      : proof,
                letterAngle : 180,
            },

            'F' : { 
                pcolor      : given,
                letterAngle : 135,
            },
            'G' : { 
                pcolor      : given,
                letterAngle : 45,
            },
            'f' : { 
                pcolor      : proof,
                letterAngle : 90,
            },
            'g' : { 
                pcolor      : proof,
                letterAngle : 90,
            },

            'pivotPoint1' : { 
                pcolor      : result,
                doPaintPname : false,
                letterAngle : 90,
            },

            'pivotPoint2' : {
                pcolor      : given,
                letterAngle : 90,
                doPaintPname : false,
            },
        };

        var linesArray =
        [
            { 'Ab' : { pcolor : proof } },
            { 'Ac' : { pcolor : proof } },
            { 'Ad' : { pcolor : result } },
            { 'Ae' : { pcolor : result, 'stroke-width' : 3, } },

            { 'Ag' : { pcolor : result, 'stroke-width' : 3, } },

            { 'ec' : { pcolor : proof } },
            { 'db' : { pcolor : proof } },

            { 'AB' : { pcolor : given } },
            { 'AC' : { pcolor : given } },
            { 'AD' : { pcolor : given } },
            { 'AE' : { pcolor : given, 'stroke-width' : 3, } },
            { 'AG' : { pcolor : given } },
            { 'EC' : { pcolor : given } },
            { 'DB' : { pcolor : given } },
        ];


        to_sconf =
        {
            //----------------------------------
            // //\\ scenario
            //----------------------------------
            hideProofSlider : true, // false,
            hideProofSliderCompletely : false,
            //----------------------------------
            // \\// scenario
            //----------------------------------


            //----------------------------------
            // //\\ original lemma parameters
            //----------------------------------
            curvePivots :
            [
                [0, 0],
                //[326.8, 715.3],
                //[326.8*1.05, 742*1.05],

                [270.19, 612.8],

                //[72.29, 621.2],

                //[1516.1, 569.9]
                //[1516.1, 495] //tmp
                [ 1060, 567 ]
                /* very good for debug: simple curve
                [0, 0],
                [500, 1000],
                [1000, 0]
                */
            ],


            //*************************************************
            // //\\ lemma model parameters
            //*************************************************
            APP_MODEL_Y_RANGE,
            //:ranges
            tanA_min : 0.1, //pivot1x/pivot1y minimum
            pivot1y_max : APP_MODEL_Y_RANGE * 0.99,
            pivot2x_max : APP_MODEL_Y_RANGE * 1.8,
            pivot2y_min : APP_MODEL_Y_RANGE * 0.3,
            pivot2y_max : APP_MODEL_Y_RANGE * 0.99,


            //bezier parameter t of point C on principal curve
            //tC : 0.5, //good for debug
            tC : 0.50077 / 0.79 ,

            claimRatio : 0.74081,
            //range:
            claimRatio_max : 0.9, //Dy_per_Ey


            tiltRatio : 1,   //controls DB-line tilt: 
                             //1 is perpendicular; < 1 dy/dx is negative, > 1 is positive
            //:ranges
            tiltRatio_min   : 0.4,
            tiltRatio_max   : 1.5,
            Ep2yrange_max   : 0.8,
            Cx_min          : 0.1,
            //*************************************************
            // \\// lemma model parameters
            //*************************************************
            //----------------------------------
            // \\// original lemma parameters
            //----------------------------------



            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            //100; //display in "percents" of Ae
            LEGEND_NUMERICAL_SCALE : 100,

            modorInPicX,
            modorInPicY,
            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,

            thickness           : 4,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------
        };
        to_sconf.areaScale = 1 / to_sconf.APP_MODEL_Y_RANGE / to_sconf.APP_MODEL_Y_RANGE;
        //----------------------------------
        // \\// prepares sconf data holder
        //----------------------------------------------------



        //----------------------------------------------------
        // //\\ copy-pastes to sconf
        //----------------------------------------------------
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;

        paste( sconf,
            paste( to_sconf,
            {
                //double back step ../../ is to reuse this path in code for twin-lemma
                mediaBgImage : "../../b1sec1lemma9/img/lemma9-original.png",

                linesArray,
                predefinedTopics,
                originalPoints,
                originX_onPicture,
                originY_onPicture,
                pictureWidth,
                pictureHeight,
                mod2inn_scale,
            })
        );
        //----------------------------------------------------
        // \\// copy-pastes to sconf
        //----------------------------------------------------
    };
}) ();

