
( function() {
    var { ns, fconf, sconf, topicColors_repo, } = 
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
        var pictureWidth = 1000;
        var pictureHeight = 600;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize
        //***************************************************************
        // \\// geometical scales
        //***************************************************************

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
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
        
        fconf.DRAGGER_TOLERANCE = 15; // distance where crosshair appears

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 8 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3.2 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius;
        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 9*controlsScale/1.6 ) );

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
        var V = [64, 462 ];
        RR = 360; //Math.sqrt( RR ) / 2;
        var C = [510, 311 ]; //V[0] + ww1/2, V[1] + ww2/2, ];
        //pos of point P
        var S = C; //[0, 0 ]; //not set in amode8captures
        //=============================================
        // \\// points reused in config
        //=============================================


        //:diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360; //RR;
        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        const FT = sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = false; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = FT ? null : 0.69;
        sconf.DQ_SLIDER_MIN = FT ? null : 0.0001;
        sconf.DT_SLIDER_MAX = FT ? 0.32 : null;
        var Q_STEPS = 1000;
        var DATA_GRAPH_STEPS = 200;
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------
        
        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        var ro0 = 1.17; //spiral's ro0
        var curveParA = -0.64;
        sconf.orbit_q_start = -0.05 * Math.PI;
        sconf.orbit_q_end = 1.3 * Math.PI;
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------

        //to be studied in given proposition:
        sconf.force_law_function = bP => 1/(bP.r2*bP.r);

        //intervals of dt or dq to construct an arc for estimated force
        //Sets initial distance of point Q from P
        if( FT ){
            sconf.Dt0 = 0.3;
        } else {
            sconf.Dq0 = 0.4;
        }

        //pos of P
        sconf.parQ = -sconf.orbit_q_start*2;

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            given,
			givenOnlyVisibleWhenHighlighted,
            orbit,
            body,
            proof,
            forceColor,
            hidden,
            estimatedForce,
            curvature,
            sunColor,
        } = topicColors_repo;


        var topicColors_elected =
        {
            estimatedForce,
            given,
            proof,
            hidden,
            curvatureCircle : curvature,
            body,
            orbit,
			force : forceColor,
            "arc-QP" : body
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var originalPoints = {
            Or : {
                doPaintPname : false,
                pos: C,
            },
            S : {
                pos: S,
                pcolor : sunColor,
                letterAngle : -90,
            },
            P : {
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
            },
            T : {
                pcolor : estimatedForce,
                letterAngle : 180,
				cssClass:  'subessay--solution',
            },
            R : {
                pcolor : estimatedForce,
                letterAngle : 45,
 				cssClass:  'subessay--solution',
           },
            Q : {
                pcolor : given,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : fconf.sappId === 'b1sec2prop7',
				cssClass:  'subessay--claim subessay--solution',
				conditionalDrag: 'subessay--claim subessay--solution',
            },
            Z : {
                pcolor : body,
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
            },
            Y : {
                pcolor : proof,
                letterAngle : -90,
				cssClass:'subessay--another-solution',
            },
            V : {
                pos: V,
                pcolor : proof,
                letterAngle : -45,
				cssClass:'subessay--another-solution',
            },

            //center of instant curvature circle
            C : {
                pos : C,
                caption : 'Rc',
                pcolor : proof,
                letterAngle : -45,
                undisplayAlways : true,
                doPaintPname : false,
            },
        };


        var linesArray =
        [
            { 'PV' : { pcolor : proof,
				cssClass:'subessay--another-solution',}, },
            { 'PY' : { pcolor : body }, },
            { 'PR' : { pcolor : givenOnlyVisibleWhenHighlighted,
				cssClass:'subessay--another-solution',}, },
            { 'SY' : { pcolor : proof,
				cssClass:'subessay--another-solution',}, },
            { 'QR' : { pcolor : estimatedForce,
				cssClass:'subessay--solution',}, },
            { 'SQ' : { pcolor : given,
				cssClass:  'subessay--claim subessay--solution',},},
            { 'QT' : { pcolor : estimatedForce,
				 cssClass:'subessay--solution',}, },
            { 'PT' : { pcolor : proof,
				cssClass:'subessay--another-solution',}, },
			{ 'SP' : { pcolor : estimatedForce }, },
        ];

        ns.paste( sconf, {
            ro0,
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