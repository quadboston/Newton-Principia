( function() {
    const { nspaste, fconf, sconf, topicColors_repo, } = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
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
        var pictureWidth = 922;
        var pictureHeight = 705;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize
        //***************************************************************
        // \\// geometical scales
        //***************************************************************

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;
        
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;
        
        fconf.DRAGGER_TOLERANCE = 17; // distance where crosshair appears

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3.2 * controlsScale ),        
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
        var posC = [443, 375 ];
        //=============================================
        // \\// points reused in config
        //=============================================


        //:diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360;
        var originX_onPicture = posC[0]; //for model's axis x
        var originY_onPicture = posC[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        const FT = sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = true; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = FT ? null : 1.0;
        sconf.DT_SLIDER_MAX = FT ? 0.66 : null;
        var Q_STEPS = 1000;
        var DATA_GRAPH_STEPS = 500;
        sconf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many
        sconf.IS_ESTIMATED_SCALED_BY_ACTUAL_FORCE_MAX = true;
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------

        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        sconf.ellipseA  = 1.03;
        sconf.ellipseB  = 0.86;
        sconf.orbit_q_start = 0;
        sconf.orbit_q_end = 2.0 * Math.PI;
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------

        //intervals of dt or dq to construct an arc for estimated force
        //Sets initial distance of point Q from P
        if( FT ){
            sconf.Dt0 = 0.36;
        } else {
            sconf.Dq0 = 0.42;
        }

        //pos of P
        sconf.parQ = 0.255 * Math.PI;

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            bodyColor,
            proofColor,
            forceColor,
            estimatedForceColor,
            infoColor,
			sunColor,
			proofHover,
			dtime,
        } = topicColors_repo;

        var topicColors_elected =
        {
			estimatedForceColor,
			body: bodyColor,
            orbit: bodyColor,
            force: forceColor,
            tangentCircle: infoColor,
			force: forceColor,
			dtime,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var originalPoints = {
            
            // //\\ no visibility cssClass            
            AA : {
                undisplayAlways : true,
                doPaintPname : false,
            },

            BB : {
                undisplayAlways : true,
                doPaintPname : false,
            },

            Z : {
                pcolor : proofColor,
                undisplayAlways : true,
                doPaintPname : false,
            },
            // \\// no visibility cssClass

            C : {
                pcolor : sunColor,
                pos: posC,
                letterAngle : 120,
                letterRotRadius : 35,
            },
			
            B : {
                pcolor : proofColor,
                letterAngle : 90,
				cssClass: 'subessay--solution',
            },

            // //\\ proof
            D : {
                pcolor : proofColor,
                letterAngle : 130,
                cssClass: 'logic_phase--proof',
            },

            K : {
                pcolor : proofColor,
                letterAngle : -45,
                cssClass: 'logic_phase--proof',
            },

            G : {
                pcolor : proofColor,
                letterAngle : 224,
                letterRotRadius : 40,
                cssClass: 'logic_phase--proof',
            },

            T : {
                pcolor : estimatedForceColor,
                letterAngle : -55,
                letterRotRadius : 32,
                cssClass: 'subessay--goal logic_phase--proof',
            },

            R : {
                pcolor : estimatedForceColor,
                letterAngle : 45,
                cssClass: 'subessay--goal subessay--solution',
            },

            v : {
                caption : '𝑣',
                pcolor : proofColor,
                letterAngle : -45,
                letterRotRadius : 22,
                cssClass: 'subessay--goal logic_phase--proof',
            },

            F : {
                pcolor : proofColor,
                letterAngle : -135,
                cssClass: 'logic_phase--proof',
            },

            V : {
                pcolor : proofColor,
                letterAngle : -45,
                cssClass: 'subessay--another-solution',
            },
            // \\// proof
  

            //Book's "another solution"
            u : {
                caption : '𝑢',
                pcolor : proofColor,
                letterAngle : -45,
                letterRotRadius : 15,
                cssClass: 'subessay--another-solution',
            },

            tCircleCenter : {
                pos : posC,
                caption : "",
                pcolor : infoColor,
                letterAngle : -45,
                cssClass: 'subessay--another-solution',
            },

			// to make kepler-orbit/builds-orbit happy, which assumes point S
            S : {
                pos: posC,
				undisplayAlways : true,
				doPaintPname : false,
            },

            //---------------------------------------
            // //\\ draggable points
            //---------------------------------------
            P : {
                pcolor : bodyColor,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },   

            Q : {
                pcolor : estimatedForceColor,
                letterAngle : 260,
                letterRotRadius : 35,
                draggableX  : true,
                draggableY  : true,
                cssClass: 'subessay--goal logic_phase--proof',
                conditionalDrag : 'subessay--goal logic_phase--proof',
            },         

            A : {
                pcolor : proofColor,
                draggableX  : true,
				cssClass: 'logic_phase--proof',
                conditionalDrag : 'logic_phase--proof',
            },
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        };


        var linesArray =
        [
            { 'A,AA' : { pcolor : proofColor,
					 cssClass: 'subessay--corollary2',
			}, },
            { 'B,BB' : { pcolor : proofColor,
					 cssClass: 'subessay--corollary2',
			 }, },
            { 'PZ' : { pcolor : proofColor,
					 cssClass: 'subessay--solution',
			}, },
            { 'ZR' : { pcolor : proofColor,
					 cssClass: 'subessay--solution',
			}, },
            { CA : { pcolor : proofColor,
                     cssClass: 'subessay--solution',
            }, },
            { CB : { pcolor : proofColor,
                     cssClass: 'subessay--solution',
            }, },

            // //\\ proof
			{ 'CV' : { pcolor : proofColor,
                         cssClass: 'subessay--another-solution',
            }, },
            { 'PR' : { pcolor : proofColor,
                       cssClass: 'subessay--goal subessay--solution',
            }, },
            { 'QR' : { pcolor : estimatedForceColor,
                       cssClass: 'subessay--goal subessay--solution',
            }, },
            { 'QT' : { pcolor : estimatedForceColor,
                       cssClass: 'subessay--goal logic_phase--proof',
            }, },
            { 'PT' : { pcolor : proofHover,
                       cssClass: 'logic_phase--proof',
            }, },
			{ 'TP' : { pcolor : proofColor,
                       cssClass: 'subessay--goal logic_phase--proof',
					   'stroke-width' : 1.5,
            }, },
            { DK : { pcolor : proofColor,
                     cssClass: 'logic_phase--proof',
            }, },
            { GP : { pcolor : proofHover,
                     cssClass: 'logic_phase--proof',
            }, },
            { Qv : { pcolor : proofColor,
                     cssClass: 'subessay--goal logic_phase--proof',
            }, },
            { Pv : { pcolor : proofHover,
                     cssClass: 'logic_phase--proof',
            }, },
            { Tv : { pcolor : proofHover,
                     cssClass: 'logic_phase--proof',
            }, },
            { vC : { pcolor : proofHover,                 
                     cssClass: 'logic_phase--proof',
            }, },
			{ CG : { pcolor : proofColor,                 
                     cssClass: 'logic_phase--proof',
            }, },
            { DC : { pcolor : proofHover,
                     cssClass: 'logic_phase--proof',
            }, },
            { CF : { pcolor : proofColor,
                     cssClass: 'logic_phase--proof',
            }, },
            // \\// proof

            //Book's "another solution"
            { Tu : { pcolor : proofHover,
                     cssClass: 'subessay--another-solution',
            }, },
            { 'uV' : { pcolor : proofHover,
                         cssClass: 'subessay--another-solution',
            }, },
            { uP : { pcolor : proofHover,
                     cssClass: 'subessay--another-solution',
            }, },
			{ Pu : { pcolor : proofColor,
                     cssClass: 'subessay--another-solution',
					 'stroke-width' : 1.5,
            }, },
            { PQ : { pcolor : proofColor,
                     cssClass: 'subessay--another-solution',
            }, },
            { 'P,tCircleCenter' : { pcolor : infoColor,
                     cssClass: 'subessay--another-solution',
            }, },
			{ PC : { pcolor : estimatedForceColor,
                cssClass: 
				'subessay--goal logic_phase--proof subessay--corollary1 logic_phase--scholium',
            }, },
			{ 'QC' : { pcolor : proofColor, 
				cssClass: 'subessay--goal',
			},},

			{ PF : { pcolor : proofColor,
                     cssClass: 'logic_phase--proof',
            }, },
        ];

        nspaste( sconf, {
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
})();
