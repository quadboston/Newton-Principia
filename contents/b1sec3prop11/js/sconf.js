
( function() {
    var { ns, fconf, sconf, fixedColors, } = 
        window.b$l.apptree({  ssFExportList : { init_conf } });
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //***************************************************************
        // //\\ geometical scales
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 841;
        var pictureHeight = 728;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize
        //***************************************************************
        // \\// geometical scales
        //***************************************************************

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab = false;
        //true enables framework zoom
        sconf.enableTools = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================


        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;

        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 3;

        //--------------------------------------
        // //\\ do override engine defaults,
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
        sconf.text_nonhover_width   = 1000;
        sconf.text_hover_width      = 2000;
        // \\// principal tp-css pars
        // \\// do override engine defaults,
        // \\// decorational parameters
        //***************************************************************

        //=============================================
        // //\\ points reused in config
        //=============================================
        var Cxy = [409, 408 ];
        //=============================================
        // \\// points reused in config
        //=============================================


        //:diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360;

        var originX_onPicture = Cxy[0]; //for model's axis x
        var originY_onPicture = Cxy[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = true; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = null;
        sconf.DT_SLIDER_MAX = 0.48;
        sconf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
        var Q_STEPS = 1500;
        var TIME_STEPS = 1500;
        var DATA_GRAPH_STEPS = 500;
        sconf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------

        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        sconf.eccentricity  = 0.59498295;
        sconf.ellipseA  = 1.07;
        sconf.ellipseAOriginal  = sconf.ellipseA;
        sconf.ellipseB  =
            Math.sqrt( Math.abs( 1 - sconf.eccentricity*sconf.eccentricity ) ) //Lambda
            * sconf.ellipseA; //0.86;
        var curveParA   = -0.64;
        sconf.orbit_q_start = 0.0 * Math.PI;
        sconf.orbit_q_end = 2 * Math.PI;

        {
            // gets ellipse parameters
            let ellB2 = sconf.ellipseB*sconf.ellipseB;
            let ellA2 = sconf.ellipseA*sconf.ellipseA;
            let excentris2 = 1 - ellA2/ellB2;
            let excentris = Math.sqrt( excentris2 );
            sconf.ellipseFocus = Math.sqrt( ellA2 - ellB2 );
        }
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------

        //to be studied in given proposition:
        sconf.force_law_function = bP => 1/(bP.r2);

        //intervals of dt or dq to construct an arc for
        //displacement or sagitta,
        //Sets initial distance of point Q from P
        sconf.Dt0 = 0.39;

        //pos of P
        sconf.parQ = 0.250 * Math.PI;

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            given,
            body,
            orbit,
            proof,
            force,
            result,
            hidden,
            curvature,
            context,
            displacement,
        } = fixedColors;


        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            context,
            curvature,
            body,
            orbit,
            force,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var originalPoints =
        {
            C : {
                pcolor : proof,
                pos: Cxy,
                letterAngle : -120,
                letterRotRadius : 35,
				cssClass: 'logic_phase--proof',
            },
            E : {
                pcolor : proof,
                letterAngle : 90,
				cssClass: 'logic_phase--proof',
            },
            H : {
                pcolor : proof,
                letterAngle : -90,
				cssClass: 'subessay--solution',
            },
            I : {
                pcolor : proof,
                letterAngle : 90,
				cssClass: 'subessay--solution',
            },
            B : {
                pcolor : proof,
                letterAngle : 90,
				cssClass: 'subessay--solution',
            },

            A : {
                pcolor : proof,
				cssClass: 'subessay--solution',
            },

            AA : {
                undisplayAlways : true,
                doPaintPname : false,
            },

            D : {
                pcolor : proof,
                letterAngle : 70,
				cssClass: 'subessay--solution',
            },

            K : {
                pcolor : proof,
                letterAngle : 70,
				cssClass: 'subessay--solution',
            },

            G : {
                pcolor : proof,
                letterAngle : 70,
				cssClass: 'subessay--solution',
            },

            T : {
                pcolor : proof,
                letterAngle : 180,
				cssClass: 'subessay--solution',
            },

            R : {
                pcolor : proof,
                letterAngle : 45,
				cssClass: 'logic_phase--proof',
            },

            Z : {
                pcolor : body,
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
				cssClass: 'subessay--solution',
            },

            Zminus : {
                caption : 'Z',
                pcolor : body,
                letterAngle : 45,
                cssClass: 'subessay--solution',
            },

            v : {
                caption : '𝑣',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
				cssClass: 'subessay--solution',
            },

            F : {
                pcolor : proof,
                letterAngle : -135,
				cssClass: 'subessay--solution',
            },

            x : {
                caption : "𝑥",
                pcolor : proof,
                letterAngle : 100,
                letterRotRadius : 20,
				cssClass: 'subessay--solution',
            },


            //---------------------------------------
            // //\\ draggable points
            //---------------------------------------
            S : {
                pcolor : given,
                letterAngle : -115,
                letterRotRadius : 35,
                draggableX  : true,
                draggableY  : false,
            },

            P : {
                //pos: set by sconf.parQ
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                //pos: set in amode8captures
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : true,
				cssClass: 'subessay--solution',
            },
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        };

        var linesArray =
        [
            { Qx : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
			{ xP : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { EP : { pcolor : proof, 
				cssClass: 'logic_phase--proof',
			},},
            { ES : { pcolor : proof, 
				cssClass: 'logic_phase--proof',
			},},
            { EI : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { EC : { pcolor : proof, 
				cssClass: 'logic_phase--proof',
			},},
            { PH : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { HI : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { CS : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { CH : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { PI : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},

            { 'SP' : { pcolor : proof, 
				cssClass: 'logic_phase--proof',
			},},

            { 'P,Zminus' : { pcolor : body,
				cssClass: 'logic_phase--proof',
			 }, },
            { 'PZ' : { pcolor : body,
				cssClass: 'logic_phase--proof',
			 }, },
            { 'ZR' : { pcolor : body,
				cssClass: 'logic_phase--proof',
			 }, },

            { 'PR' : { pcolor : body,
				cssClass: 'logic_phase--proof',
			 }, },
            { 'QR' : { pcolor : displacement,
				cssClass: 'subessay--solution',
			 }, },
            { 'QT' : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { 'PT' : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},

            { DK : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { GP : { pcolor : proof,
				cssClass: 'subessay--solution',
			}, },
            { Qv : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { Pv : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { Tv : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},

            { vG : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { PF : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { AC : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { DC : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { BC : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { PC : { pcolor : proof,
				cssClass: 'logic_phase--proof',
			}, },
            { GC : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
            { FC : { pcolor : proof,
				cssClass: 'subessay--solution',
			 },},
        ];

        ns.paste( sconf, {
            curveParA,
            Q_STEPS,
            DATA_GRAPH_STEPS,
            TIME_STEPS,

            mediaBgImage : "diagram.png",
            predefinedTopics,
            originalPoints,
            linesArray,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,

            default_tp_stroke_width,
            defaultLineWidth,
            handleRadius,
        });
    }
}) ();
