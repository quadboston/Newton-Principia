
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
        var pictureWidth = 892; //630;  //892, 1.4158
        var pictureHeight = 840; //400; //840, 2.1

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
        //true enables framework zoom
        sconf.enableTools               = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================


        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;

        sconf.TP_OPACITY_FROM_fixed_colors = true;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;

        fconf.DRAGGER_TOLERANCE = 20; // distance where crosshair appears

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
        //overrides hover_width for texts
        //for activation, needs class "hover-width" in element

        //sconf.text_nonhover_width   = 1000; //todm why such a big value?
        //sconf.text_hover_width      = 2000;
        sconf.text_nonhover_width   = 1;
        sconf.text_hover_width      = 1;
        // \\// principal tp-css pars
        // \\// do override engine defaults,
        // \\// decorational parameters
        //***************************************************************

        //=============================================
        // //\\ points reused in config
        //=============================================
        var A = [785, 441];
        var V = [64, 462 ];
        var C = [425, 452];//[ V[0] + ww1/2, V[1] + ww2/2, ];
        var S = [207, 403];
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
        sconf.CURVE_REVOLVES = true; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = FT ? null : 1.0;
        sconf.DT_SLIDER_MAX = FT ? 0.50 : null;
        var Q_STEPS = 1000;
        var TIME_STEPS = 1000;
        var DATA_GRAPH_STEPS = 500;
        sconf.IS_DEVIATION_SCALED_BY_FORCE_MAX = true;
        sconf.DEVIATION_SCALE_FACTOR = 4;
        sconf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------

        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        const prop7R = 1;
        sconf.orbit_q_start = 0;
        sconf.orbit_q_end = 2.0 * Math.PI;
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------

        //to be studied in given proposition:
        sconf.force_law_function = bp => 1/(bp.r2*(2*prop7R*bp.sinOmega)**3);

        //intervals of dt or dq to construct an arc for
        //displacement or sagitta,
        //Sets initial distance of point Q from P
        if( FT ){
            sconf.Dt0 = 0.168;
        } else {
            sconf.Dq0 = 0.42;
        }

        //pos of P
        sconf.parQ = 0.235 * Math.PI;

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            body,
            orbit,
            time,
            dtime,
            proof,
            force,
            invalid,
            hidden,
            estimatedForce,
            sagitta,
            curvature,
            context,
            chord,
        } = topicColors_repo;


        var topicColors_elected =
        {
            estimatedForce,
            body,
            force,
            sagitta,
            chord,
            invalid,
            proof,
            hidden,
            context,
            curvature,
            dtime,
            time,
            curvatureCircle : curvature,
            orbit,
            APQ     : orbit,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var foldPoints  = (new Array(200)).fill({}).map( fp => ({
            pcolor      : invalid,
            doPaintPname : false,
        }));

        //---------------------------------------------------
        var originalPoints =
        {
            foldPoints,
        };
        // \\// points to approximate and draw original curve
        //---------------------------------------------------

        Object.assign( originalPoints, {
            A : {
                pos: A,
                pcolor : orbit,
                //letterAngle : -90,
                //undisplayAlways : true,
                //doPaintPname : false,
            },

            S : {
                pos: S,
                pcolor : force,
                letterAngle : -90,
                draggableX  : true,
                draggableY  : true,
            },

            P : {
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : true,

                //scenario needs peer review:
                //conditionalDrag : 'logic_phase--proof logic_phase--corollary',
                conditionalDrag : 'logic_phase--proof',

            },
            QtimeDecor : {
                undisplayAlways : true,
                //pos: will be as Q, 
                cssClass : 'tp-dtime',
                pcolor : dtime, //proof,
                fontSize : 30,
                letterAngle : 225,
                letterShift : [30,0],
                letterRotRadius : 180,
            },

            T : {
                pcolor : proof,
                letterAngle : 180,
            },

            R : {
                pcolor : proof,
                letterAngle : 45,
            },

            Z : {
                pcolor : body,
                letterAngle : 45,
            },

            Zminus : {
                pcolor : body,
                letterAngle : 45,
                //undisplay : true,
                undisplayAlways : true,
                doPaintPname : false,
            },

            rrminus : {
                caption : 'Q-',
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
            },

            sagitta : {
                caption : 'I',
                //pos: Q,
                pcolor : sagitta,
                letterAngle : 270,
                letterRotRadius : 35,
                //initial setting does not work well bs poor code design
                //undisplay : true,
            },

            Y : {
                pcolor : proof,
                letterAngle : -90,
            },

            V : {
                pos: V,
                pcolor : curvature,
                letterAngle : -45,
            },

            L : {
                pcolor : curvature,
                letterAngle : -45,
            },

            //center of instant curvature circle
            C : {
                pos : C,
                caption : 'Rc',
                pcolor : curvature,
                letterAngle : -45,
                undisplayAlways : true, // not respected?
            },

            nonSolvablePoint : {
                pos: [0,0], //will be calculated
                caption : '',
                fontSize : '25',
                undisplayAlways : true,
                pcolor : invalid,
                letterAngle : 0,
            },
            errorMessage : { // nonSolvablePoint message shown at to of canvas
                pos : [20, 20],
                caption: "error state", // value get overwritten in model-upcreate by const set in builds-orbit.js
                fontSize : '25',
                pcolor : invalid,
                letterAngle : 0,
            },

            //corollary 2
            Tcol2 : {
                caption : 'T',
                pcolor : curvature,
                letterAngle : -45,
            },
            Rcol2 : {
                caption : 'R',
                pcolor : curvature,
                letterAngle : -45,
                draggableX  : true,
                draggableY  : true,
            },
            Gcol2 : {
                caption : 'G',
                pcolor : curvature,
                letterAngle : -45,
            },
        });


        var linesArray =
        [
            { 'PV' : { pcolor : proof }, },
            { 'AV' : { pcolor : proof }, },
            { 'SP' : { pcolor : orbit }, },
            { 'AP' : { pcolor : proof }, },

            { 'PY' : { pcolor : body }, },
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'PR' : { pcolor : body }, },
            { 'ZQ' : { pcolor : body }, },


            { 'RL' : { pcolor : proof }, },

            { 'SY' : { pcolor : proof }, },
            { 'QR' : { pcolor : proof }, },
            { 'QP' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },

            { 'PC' : { pcolor : curvature }, },
            { 'P,rrminus' : { pcolor : proof }, },
            { 'P,sagitta' : { pcolor : sagitta, vectorTipIx : 1 } },
            { 'Q,rrminus' : { pcolor : proof }, },

            //corollary 2
            { 'Rcol2,P' : { pcolor : proof }, },
            { 'Rcol2,Tcol2' : { pcolor : proof }, },
            { 'Tcol2,V' : { pcolor : proof }, },
            { 'Gcol2,S' : { pcolor : proof }, },
            { 'Gcol2,P' : { pcolor : proof }, },
            { 'S,nonSolvablePoint' : { pcolor : invalid }, },
        ];

        ns.paste( sconf, {
            prop7R,
            Q_STEPS,
            DATA_GRAPH_STEPS,
            TIME_STEPS,

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
        sconf.pointDecoration.r = sconf.handleRadius;
        //***************************************************************
        // \\// geometics parameters
        //***************************************************************
    }
}) ();

