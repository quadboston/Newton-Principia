
( function() {
    var { ns, sn, mat, fconf, sconf, stdMod, fixedColors, } = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    var op = sn( 'orbitParameters', sconf );
    var sop = sn( 'sampleOrbitParameters', sconf );
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
        var pictureWidth = 690;
        var pictureHeight = 836; //728;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize;
        //***************************************************************
        // \\// geometical scales
        //***************************************************************

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;
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
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3.5 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius;
        //TEMP P9/10/11 don't seem to have the following.  Does the value for
        //this setting make sense, or should it be adjusted?
        sconf.default_tp_lightness = 30;

        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        //TEMP The values of the following are very different from P9/10/11,
        //should the values be adjusted?
        sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
        sconf.text_hover_width      = 1.5;
        // \\// principal tp-css pars
        // \\// do override engine defaults,
        // \\// decorational parameters
        //***************************************************************

        //=============================================
        // //\\ points reused in config
        //=============================================
        //TEMP What should go here?  It seems different models set different
        //variables.
        //TEMP The other models seem to use different variable names for the
        //following, is this name ok?
        var origin = [ 492, 565 ]; //x,y of whole svg model
        //=============================================
        // \\// points reused in config
        //=============================================

        //:diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 145;
        var originX_onPicture = origin[0]; //for model's axis x
        var originY_onPicture = origin[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        const FT = sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = false; //true for cyclic orbit
        sconf.DT_SLIDER_MAX = FT ? 0.8 : null;
        //TEMP P11 has the following is it needed for this model as well?
        // sconf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
        //TEMP Are the following values for STEPS correct, or do they need
        //adjustments?
        var Q_STEPS = 500;
        var DATA_GRAPH_STEPS = 500;
        sconf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many

        //Create left side of hyperbola by mirroring right side.  Results in a
        //curve that's visually identical to if the hyperbola equation was used
        //to create the left side, however is simpler to implement.  If that
        //equation was used, the start and end angle for the left side would
        //need to be computed, so that it matches the right side.
        sconf.MIRROR_ORBIT = true;
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------

        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        sconf.DISTANCE_HYPERBOLA_ENDS_TO_S = 2.4;
        //The following are set by recalculateOrbitStartAndEnd
        sconf.orbit_q_start = null;
        sconf.orbit_q_end = null;



        //TEMP Should the following be moved lower down?  For P9/10/11 the next
        //section seems to be ":diagram sandbox spatial parameters".
        //  -DONE
        //TEMP Are any changes needed for the following?  eg. rename "PparQ" or
        //similar?
        //gravitational constant
        var Kepler_g = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
        op.Kepler_g = op.Kepler_gInitial = Kepler_g;
        sop.Kepler_g = sop.Kepler_gInitial = Kepler_g;


        //sets model offset
        op.mainAxisAngle_initial = 0;
        op.mainAxisAngle = op.mainAxisAngle_initial;
        op.delta_v_increase_LIMIT = 1.5;

        //conic pars
        op.initialEccentricity = 1.365; //hyperbola
        op.latusInitial = 0.90;
        var PparQ = 0.49 * Math.PI;
        
        op.sagittaDelta_q_initial = 1;

        op.PparQ_initial        = PparQ;
        op.PparQ_initial_essay  = PparQ;
        op.sagittaDelta_q       = op.sagittaDelta_q_initial;

        //-----------------------------------------------------
        // //\\ sets Kepler_v
        //-----------------------------------------------------
        //TEMP Which of the following are still needed now that the code has
        //be updated?
        op.latus = op.latusInitial;
        stdMod.establishesEccentricity( op.initialEccentricity );
        var { Kepler_v, cosOmega, om } = mat.conics.innerPars2innerPars({
                lat         : op.latusInitial,
                fi          : PparQ,
                e           : op.initialEccentricity,
                Kepler_g    : op.Kepler_g,
        });
        //saves initial speed
        op.cosOmega             = cosOmega;
        op.om                   = om;
        op.cosOmega_initial     = cosOmega;
        op.om_initial           = om;
        op.Kepler_v_initial     = Kepler_v;
        op.Kepler_v             = op.Kepler_v_initial;
        //-----------------------------------------------------
        // \\// sets Kepler_v
        //-----------------------------------------------------
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------

        //interval of dt to construct an arc for
        //displacement or sagitta,
        //Sets initial distance of point Q from P
        sconf.Dt0 = 0.53;

        //pos of P
        sconf.parQ = 0.45;

        //-----------------------------------
        // //\\ topic group colors
        //-----------------------------------
        const {
            given,
            body,
            orbit,
            instanttriangleHiddenStart,
            resultOnlyVisibleWhenHighlighted,
            proof,
            force,
            result,
            shadow,
            hidden,
            curvature,
            context,
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
            orbit               : orbit,
            orbitdq             : orbit,
            shadow,
            force,//               : result,//TEMP
            // force               : result,
            instanttriangle     : instanttriangleHiddenStart,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //TEMP It's possible some changes may be needed for the following. eg.
        //set "pos" for some points?  I should check this over more.
        var originalPoints = {};
        Object.assign( originalPoints, {
            // hyperbola
            S : {
                pcolor : result,
                letterAngle : -90,
				letterRotRadius : 26,
            },
            P : {
                pcolor : body,
                letterAngle : 120,
                draggableY  : true,
            },
            LL : { // opposite of P, unlabelled
                doPaintPname : false,
				undisplayAlways : true,
            },
            A : {
                pcolor : orbit,
                letterAngle : -120,
				cssClass: 'subessay--solution',
            },            
            AA : { // opposite A
                undisplayAlways : true,
                doPaintPname : false,
            },
            B : {
                letterRotRadius : 20,
                pcolor : orbit,
				cssClass: 'subessay--solution',
            },            
            BB : { // opposite B
                doPaintPname : false,
                pcolor : orbit,
				cssClass: 'subessay--solution',
            },
            C : { //center symmetry of orbit
                pcolor : orbit,
                letterAngle : -45,
				cssClass: 'logic_phase--proof',
            },
            Zminus : {
                caption : 'Z',
                pcolor : body,
                letterAngle : 90,
				cssClass: 'subessay--solution',
            },
            Z : {
                undisplayAlways : true,
                doPaintPname : false,
				cssClass: 'subessay--solution',
            },
            Q : {
                pcolor : proof,
                letterAngle : 225,
                draggableX  : true,
                draggableY  : true,
				cssClass: 'subessay--solution',
				conditionalDrag: 'subessay--solution',
            },

            // triangle
            G : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
				cssClass: 'subessay--solution',
            },
            D : {
                pcolor : proof,
                letterRotRadius : 25,
                letterAngle : 135,
				cssClass: 'subessay--solution',
            },
            K : {
                pcolor : proof,
                letterAngle : 180,
				cssClass: 'subessay--solution',
            },
            F : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : 135,
				cssClass: 'subessay--solution',
            },
            v : {
                caption : '𝑣',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
				cssClass: 'subessay--solution',
            },
            E : {
                pcolor : proof,
                letterRotRadius : 20,
				cssClass: 'logic_phase--proof',
            },            
            x : {
                caption : "𝑥",
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 20,
				cssClass: 'subessay--solution',
            },
            R : {
                pcolor : proof,
                letterAngle : 120,
                letterRotRadius : 22,
				cssClass: 'subessay--solution',
            },
            
            H : {
                pcolor : proof,
                letterAngle : -90,
				cssClass: 'subessay--solution',
            },
            I : {
                pcolor : proof,
                letterRotRadius : 20,
				cssClass: 'subessay--solution',
            },
            T : {
                pcolor : proof,
                letterRotRadius : 20,
				cssClass: 'subessay--solution',
            },

            L : {
				undisplayAlways : true,
				doPaintPname : false,
            },

            // eccentricity slider
            Zeta : {
                caption : 'eccentricity',
                pos : [ pictureWidth * 0.5, pictureHeight * 1.05 ],
                pcolor : orbit,
                letterAngle : 150,
                letterRotRadius : 38,
                //TEMP If this "sconf.js" file is separate from the one for P13
                //then these conditionals should probably be switched to true.
                draggableX  : 'b1sec3prop13' !== fconf.sappId,
                undisplayAlways  : 'b1sec3prop13' === fconf.sappId,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
                fontSize : 16,
            },
            ZetaCaption : {
                pos : [ pictureWidth * 0.5, pictureHeight * 1.09 ],
                pcolor : orbit,
                undisplayAlways : true,
                letterAngle : 90,
                letterRotRadius : 20,
                doPaintPname : false, // set to true to show value
                unscalable  : true,
                fontSize : 16,
            },
            ZetaStart : {
                pos : [ pictureWidth * 0.3, pictureHeight * 1.05 ],
                pcolor : orbit,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },
            ZetaEnd : {
                pos : [ pictureWidth * 0.7, pictureHeight * 1.05 ],
                pcolor : orbit,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },
        });

        //TEMP It's possible some changes may be needed for the following, I
        //should check this over more.
        var linesArray =
        [
            // hyperbola
            { 'P,Zminus' : { pcolor : body,
						cssClass: 'subessay--solution',}, },
            { 'PZ' : { pcolor : body,
						cssClass: 'subessay--solution',}, },
            { 'PR' : { pcolor : body, 'stroke-width' : 2, 
                		captionShiftNorm : -18,
						cssClass: 'subessay--solution',}, },
            { 'SP' : { pcolor : body,
						cssClass: 'logic_phase--proof',}, },
            { 'B,BB' : { pcolor : orbit,
						cssClass: 'subessay--solution',}, },

            // triangle            
            { CA : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { CB : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { GP : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { DK : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { PF : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { Qv : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { QR : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { Qx : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { Px : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            
            { EP : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { HI : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { EC : { pcolor : proof,
						cssClass: 'logic_phase--proof',}, },
            { ES : { pcolor : proof,
						cssClass: 'logic_phase--proof',}, },
            { EI : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { CS : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { CH : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { PI : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { PH : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            
            { QT : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { PT : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { AT : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { Pv : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { xv : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { PC : { pcolor : proof,
						cssClass: 'logic_phase--proof',}, },
            { PE : { pcolor : proof,
						cssClass: 'logic_phase--proof',}, },
            { Gv : { pcolor : proof,
						cssClass: 'subessay--solution',}, },
            { CD : { pcolor : proof,
						cssClass: 'subessay--solution',}, },

            { 'L,LL' : { pcolor : resultOnlyVisibleWhenHighlighted,
               captionShiftNorm : 22, lposYSugar : 3 }, },

            // e slider
            { 'ZetaStart,ZetaEnd' :
              { pcolor : orbit } 
            },
        ];

        ns.paste( sconf, {
            Q_STEPS,
            DATA_GRAPH_STEPS,

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

