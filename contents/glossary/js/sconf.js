( function() {
    const { ns, fconf, sconf, topicColors_repo, amode} = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //***************************************************************
        // //\\ geometrical scales
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 841;
        var pictureHeight = 728;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize
        //***************************************************************
        // \\// geometrical scales
        //***************************************************************

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;
        
        fconf.DRAGGER_TOLERANCE = 15; // distance where crosshair appears

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3.1 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius;
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
        var posC = [409, 408 ];
        //=============================================
        // \\// points reused in config
        //=============================================


        //diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360;

        var originX_onPicture = posC[0]; //for model's axis x
        var originY_onPicture = posC[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = true; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = null;
        sconf.DT_SLIDER_MAX = 99;
        sconf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
        var Q_STEPS = 1500;
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

        //intervals of dt or dq to construct an arc for estimated force
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
            proofColor,
            supplementHover,
			proofHover,
            forceColor,
            hidden,
            estimatedForceColor,
            curvature,
			sunColor,
			proofLight,
        } = topicColors_repo;


        var topicColors_elected =
        {
            estimatedForceColor,
            given,
            proofColor,
            hidden,
            curvature,
            body,
            orbit,
            force : forceColor,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------
        const { logic_phase, aspect, subessay } = amode;
        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var originalPoints =
        {
            C : {
                pcolor : proofColor,
				caption: "",
                pos: posC,
                letterAngle : -99,
                letterRotRadius : 35,
				cssClass: 'subessay--diameter',
            },
            E : {
                pcolor : proofColor,
                letterAngle : 90,
				cssClass: 'logic_phase--proof',
            },
            H : {
                pcolor : proofColor,
                letterAngle : -90,
				cssClass: 'subessay--solution',
            },
            I : {
                pcolor : proofColor,
                letterAngle : 90,
				cssClass: 'subessay--solution',
            },
            B : {
                pcolor : proofColor,
                letterAngle : 90,
				cssClass: 'subessay--solution',
            },

            AA : {
                //undisplayAlways : true,
				pcolor : proofColor,
                doPaintPname : false,
				cssClass: 'subessay--latus-rectum',
            },

            D : {
                pcolor : proofColor,
                letterAngle : 70,
                cssClass: 'subessay--',
            },

            K : {
				caption : '',
                pcolor : proofColor,
				cssClass: 'subessay--',
            },

            G : {
                pcolor : proofColor,
                letterAngle : 90,
				cssClass: 'subessay--',
            },

            T : {
                pcolor : estimatedForceColor,
                letterAngle : 180,
				cssClass: 'subessay--solution subessay--goal',
            },

            R : {
                pcolor : estimatedForceColor,
                letterAngle : 45,
				cssClass: 'subessay--goal logic_phase--proof',
            },

            Zminus : {
                undisplayAlways : true,
                doPaintPname : false,
				cssClass: 'subessay--solution',
            },

            Z : {
                pcolor : proofColor,
                letterAngle : -45,
                cssClass: 'subessay--solution',
            },

            v : {
                caption : '𝑣',
                pcolor : proofColor,
                letterAngle : -45,
                letterRotRadius : 15,
				cssClass: 'subessay--latus-rectum',
            },

            F : {
                pcolor : proofColor,
                letterAngle : -135,
				cssClass: 'subessay--solution',
            },

            x : {
                caption : "𝑥",
                pcolor : proofColor,
                letterAngle : 100,
                letterRotRadius : 20,
				cssClass: 'subessay--solution subessay--goal',
            },

            // latus rectum
            L : {
                cssClass : 'hidden',
                letterAngle : -45,
                letterRotRadius : 20,
            },
            LL : {
                cssClass : 'hidden',
                doPaintPname : false,
            },


            //---------------------------------------
            // //\\ draggable points
            //---------------------------------------
            S : {
				caption : '',
				pcolor : proofColor,
				cssClass: 'subessay--latus-rectum',
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
                pcolor : proofColor,
                letterAngle : 250,
                letterRotRadius : 25,
                draggableX  : true,
                draggableY  : true,
                cssClass: 'subessay--latus-rectum subessay--conics',
                conditionalDrag : 'subessay--latus-rectum subessay--conics',
            }, 

			Qemphasis : {
                 pcolor : estimatedForceColor,
 				caption: 'Q',
                 letterAngle : 250,
                 letterRotRadius : 25,
                 draggableX  : true,
                 draggableY  : true,
                cssClass: 'subessay--ordinate',
                conditionalDrag : 'subessay--ordinate',
            }, 

            q : { // will be put across from Q
                pcolor : proofColor,
				caption: '',
				undisplayAlways : true,
                cssClass: 'subessay--ordinate',
            },         

            A : {
                pcolor : proofColor,
                draggableX  : true,
                draggableY  : false,
				cssClass: 'logic_phase--claim',
            },
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        };

        var linesArray =
        [
			{ 'A,AA' : { pcolor : proofColor,
					 cssClass: 'subessay--latus-rectum',
			}, },
            { Qx : { pcolor : proofColor,
				cssClass: 'subessay--solution subessay--goal',
			 },},
			{ xP : { pcolor : proofHover,
				cssClass: 'subessay--solution',
			 },},
            { EP : { pcolor : proofHover, 
				cssClass: 'logic_phase--proof',
			},},
            { ES : { pcolor : proofHover, 
				cssClass: 'logic_phase--proof',
			},},
            { EI : { pcolor : proofHover,
				cssClass: 'subessay--solution',
			 },},
            { CE : { pcolor : proofColor, 
				cssClass: 'logic_phase--proof',
			},},
            { PH : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},
            { HI : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},
            { CS : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},
            { CH : { pcolor : proofHover,
				cssClass: 'subessay--solution',
			 },},
            { PI : { pcolor : proofHover,
				cssClass: 'subessay--solution',
			 },},
			{ 'PT' : { pcolor : proofHover,
				cssClass: 'subessay--solution',
			 },},

            { 'SP' : { pcolor : estimatedForceColor, 
				cssClass: 'subessay--goal logic_phase--proof',
			},},
			{ 'SQ' : { pcolor : proofColor, 
				cssClass: 'subessay--goal',
			},},

            { 'L,LL' : { 
			    pcolor : proofHover,
                captionShiftNorm : 22, lposYSugar : 3
			}, },

            { 'P,Zminus' : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 }, },
            { 'PZ' : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 }, },
            { 'PR' : { pcolor : proofColor,
				cssClass: 'subessay--goal logic_phase--proof',
			 }, },
            { 'QR' : { pcolor : estimatedForceColor,
				cssClass: 'subessay--solution subessay--goal',
			 }, },
            { 'QT' : { pcolor : proofColor,
                     cssClass: 'subessay--',
			 },},

            { CK : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},
            { CG : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			}, },
			{ DK : { pcolor : proofColor,
                    cssClass: 'subessay--conjugatediameter',
             }, },

			{ GP : { pcolor : proofColor,
                     cssClass: 'subessay--latus-rectum subessay--ordinate subessay--diameter subessay--conjugatediameter',
            }, },
			{ qv : { pcolor : proofLight,
                     cssClass: 'subessay--ordinate',
            }, },
			{ Qv : { pcolor : proofColor,
                     cssClass: 'subessay--latus-rectum subessay--conics',
            }, },
			{ 'Qemphasis,v' : { pcolor : estimatedForceColor,
                     cssClass: 'subessay--ordinate',
            }, },

            { Pv : { pcolor : proofHover,
				cssClass: 'subessay--latus-rectum',
			 },},
            { Tv : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},

            { vG : { pcolor : proofHover,
				cssClass: 'subessay--solution',
			 },},
            { PF : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},
            { AC : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},
            { CD : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},
            { BC : { pcolor : proofColor,
				cssClass: 'subessay--solution',
			 },},
            { PC : { pcolor : proofColor,
				cssClass: 'logic_phase--proof',
			}, },
        ];

        ns.paste( sconf, {
            curveParA,
            Q_STEPS,
            DATA_GRAPH_STEPS,

            mediaBgImage : "diagram.png",
            topicColors_elected,
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
