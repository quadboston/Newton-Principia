( function() {
    var { ns, sn, fconf, sconf, stdMod, topicColors_repo, } = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    var op = sn( 'orbitParameters', sconf );
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
        var pictureWidth = 938;
        var pictureHeight = 611;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize;
        //***************************************************************
        // \\// geometical scales
        //***************************************************************

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
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
        handleRadius            = Math.floor( 3.5 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius;
        sconf.default_tp_lightness = 30;

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
        // \\// do override engine defaults,
        // \\// decorational parameters
        //***************************************************************

        //=============================================
        // //\\ points reused in config
        //=============================================
        var posF = [ 560, 554 ]; //x,y of whole svg model
        //=============================================
        // \\// points reused in config
        //=============================================

        //:diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 145;
        var originX_onPicture = posF[0]; //for model's axis x
        var originY_onPicture = posF[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = false; //true for cyclic orbit
        sconf.DT_SLIDER_MAX = 1.84;
        var Q_STEPS = 500;
        var DATA_GRAPH_STEPS = 500;
        //Scale estimated force curve by actual force max
        sconf.IS_ESTIMATED_SCALED_BY_ACTUAL_FORCE_MAX = true;
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------

        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        sconf.DISTANCE_ORBIT_ENDS_TO_S = 5.75;
        //The following are set by recalculateOrbitStartAndEnd
        sconf.orbit_q_start = null;
        sconf.orbit_q_end = null;

        //sets model offset
        op.mainAxisAngle = 0;

        //conic pars
        op.initialEccentricity = 1; //parabola
        op.latus = 2.10;
        stdMod.establishesEccentricity( op.initialEccentricity );
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------

        //interval of dt to construct an arc for estimated force
        //Sets initial distance of point Q from P
        sconf.Dt0 = 1.06;

        //pos of P
        sconf.parQ = 0.33;

        //-----------------------------------
        // //\\ topic group colors
        //-----------------------------------
        const {
            bodyColor,
			supplementHover,
			proofHover,
            proofColor,
			estimatedForceColor,
            forceColor,
			sunColor,
        } = topicColors_repo;

        var topicColors_elected =
        {
            estimatedForceColor,
            proofColor,
            bodyColor,
            orbit               : bodyColor,
            force : forceColor,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        var originalPoints = {};
        Object.assign( originalPoints, {
            L : {
				doPaintPname : false,
 				undisplayAlways : true,
            },
            LL : {
                doPaintPname : false,
				undisplayAlways : true,
            },

            A : {
                pcolor : bodyColor,
				letterRotRadius : 28,
                letterAngle : -124,
 				cssClass: 'subessay--solution',
            },
            M : {
                pcolor : proofColor,
				letterRotRadius : 25,
                letterAngle : -90,
 				cssClass: 'subessay--solution',
            },
            N : {
                pcolor : proofColor,
                letterRotRadius : 25,
                letterAngle : 125,
 				cssClass: 'subessay--solution',
            },
            T : {
                pcolor : estimatedForceColor,
                letterRotRadius : 20,
 				cssClass: 'subessay--solution subessay--corollary2',
            },
            R : {
                pcolor : estimatedForceColor,
                letterAngle : 135,
                letterRotRadius : 25,
 				cssClass: 'subessay--solution logic_phase--corollary',
            },
            v : {
                caption : '𝑣',
                pcolor : proofColor,
                letterAngle : -45,
                letterRotRadius : 15,
 				cssClass: 'subessay--solution',
           },            
            x : {
                caption : "𝑥",
                pcolor : proofColor,
                letterAngle : -45,
                letterRotRadius : 20,
				cssClass: 'subessay--solution',
            },
            S : {
                undisplayAlways : true,
                doPaintPname : false,
            },
            P : {
                pcolor : bodyColor,
                letterAngle : 120,
                draggableY  : true,
            },
            Q : {
                pcolor : estimatedForceColor,
                letterAngle : -90,
                letterRotRadius : 25,
                draggableX  : true,
                draggableY  : true,
				cssClass: 'subessay--solution subessay--corollary2',
                conditionalDrag: 'subessay--solution subessay--corollary2',
            },
            AA : {
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : bodyColor,
            },
            G : {
                pcolor : proofColor,
                letterRotRadius : 20,
                letterAngle : -45,
				cssClass: 'subessay--solution',
            },
            Zminus : { // only here for Prop 12 code?
                doPaintPname : false,
 				undisplayAlways  : true,
            },


            // not used but calculated in model-upcreate for P12
            // todo: if splitting P12 from P13 model-upcreate, can delete
            C : { //center symmetry of orbit
                pcolor : bodyColor,
                letterAngle : -45,
            },
            H : {
                pcolor : proofColor,
                letterAngle : -90,
            },
            Z : {
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
 				cssClass: 'subessay--solution',
            },
            O : {
                pos: posF,
                doPaintPname : false,
				undisplayAlways : true,
            },
            D : {
                pcolor : proofColor,
                letterRotRadius : 20,
                //letterAngle : 135,
            },
            K : {
                pcolor : proofColor,
                letterRotRadius : 20,
                letterAngle : -60,
            },
            B : {
                letterRotRadius : 20,
                pcolor : bodyColor,
            },             
            BB : { // opposite B
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : bodyColor,
            },
            E : {
                pcolor : proofColor,
                letterRotRadius : 20,
            }, 
            I : {
                pcolor : proofColor,
                letterRotRadius : 20,
            },

        });

		const proofSolution = { pcolor : proofColor,
 				cssClass: 'subessay--solution', };
		const showProofColor = { pcolor : proofColor,
 				cssClass: 'subessay--diameter-parabola', };

        var linesArray =
        [

            { GP : showProofColor },


            // tangent
   
            { PZ : { pcolor : proofColor,
 				cssClass: 'subessay--diameter-parabola', }, },
			{ 'P,Zminus' : { pcolor : proofColor,
 				cssClass: 'subessay--diameter-parabola', }, },
			{ SA :  showProofColor },

        ];

        ns.paste( sconf, {
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
