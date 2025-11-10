( function() {
    const { nspaste, fconf, sconf } = window.b$l.apptree({
        ssFExportList : { init_conf }
    });
    return;


    function init_conf()
    {
        //tools
        sconf.enableStudylab = false;
        //true enables framework zoom:
        sconf.enableTools = true;

        //navigation
        //e/sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
        //e/sconf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;


        //***************************************************************
        // //\\ original picture dimensions for svg scene
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        let pictureWidth = 1000;
        let pictureHeight = 600;

        //to comply standard layout, one must add these 2 lines:
        let realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        let controlsScale = realSvgSize / sconf.standardSvgSize

        var V = [64, 462 ];
        RR = 360; //Math.sqrt( RR ) / 2;
        var C = [510, 311 ]; // V[0] + ww1/2, V[1] + ww2/2, ];
        //pos of point P
        var S = C;

        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360; //RR;
        //***************************************************************
        // \\// original picture dimensions for svg scene
        //***************************************************************


        //***************************************************************
        // //\\ GUI cosmetics
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;

        //?/sconf.TP_OPACITY_FROM_fixed_colors = true;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 3;

        //--------------------------------------
        // //\\ these do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 8 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 4 * controlsScale ),

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
        sconf.text_nonhover_width   = 1000;
        sconf.text_hover_width      = 2000;
        // \\// principal tp-css pars

        //?/sconf.default_tp_lightness = 30;
        //--------------------------------------
        // \\// these do override engine defaults,
        //***************************************************************
        // \\// GUI cosmetics
        //***************************************************************


        //******************************************
        // //\\ model principals parameters
        //******************************************
        sconf.orbit_q_start = -0.05 * Math.PI;
        sconf.orbit_q_end = 1.3 * Math.PI;
        //pos of P
        sconf.parQ = -sconf.orbit_q_start*2;
        sconf.ro0 = 1.17; //spiral's ro0
        sconf.curveParA = -0.64;

        //the law to be studied in given lemma:
        //  fe: for 1/r^2, the assigment is
        //    sconf.force_law = bP => 1/(bP.r2);
        //  null means that program will calculated the law
        //  based on dt -> 0:
        sconf.force_law = bP => 1/(bP.r2*bP.r);
        //******************************************
        // \\// model principals parameters
        //******************************************


        //***************************************************************
        // //\\ math model auxilaries
        //***************************************************************
        const FT = sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = false; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = FT ? null : 0.69;
        sconf.DQ_SLIDER_MIN = FT ? null : 0.0001;
        sconf.DT_SLIDER_MAX = FT ? 0.32 : null;
        sconf.Q_STEPS = 1000;
        sconf.TIME_STEPS = 1000;
        sconf.DATA_GRAPH_STEPS = 200;

        //intervals of dt or dq to construct an arc for
        //fQR or sagitta,
        if( FT ){
            sconf.Dt0 = 0.3;
        } else {
            sconf.Dq0 = 0.19;
        }
        //***************************************************************
        // \\// math model auxilaries
        //***************************************************************


        //***************************************************************
        // //\\ model comparison demo
        //***************************************************************
        //e/sconf.SHOW_FORMULAS = [
        //e/    //usually, bP is aka context of "plane-cureve-derivatives"
        //e/    { label:'1/r²',
        //e/      fun:(bP) => 1/bP.r2,
        //e/      //e// cssclass : 'tp-formula-1 tostroke',
        //e/    },
        //e/];
        //***************************************************************
        // \\// model comparison demo
        //***************************************************************


        //*************************************
        // //\\ topic group colors,
        //*************************************
        var estimatedForce = [100,50,0];
        //e/var fQR = estimatedForce;
        //e/var sagitta = [100,0,100];
        var orbit   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var result  = [200,   40,  0,      1];
        var curvature  = [200,   40,  200, 1];
        //e/var timeColor  = [200,  0,  255, 1];
        var displacement = [200,   0,  200, 1];
        var body    = [0,     150,  200,   1];
        //e/var dtime   = [0,     150,  200,  1];
        var hidden  = [0,     0,   0,      0];
        var context = [0,     0,   0,      1];
        var force =   [255,    0,  0,      1];
        var invalid = [200,  150,  0,      1];
        //e/var chord = [0,0,255, 1];

        var predefinedTopics =
        {
            //e/given,
            proof,
            result,
            displacement,
            hidden,
            context,
            curvature,
            curvatureCircle : curvature,
            body,
            orbit,
            force,
        };
        //*************************************
        // \\// topic group colors,
        //*************************************


        //*************************************
        // //\\ locals to reuse locally
        //*************************************
        //*************************************
        // \\// locals to reuse locally
        //*************************************


        //*************************************
        // //\\ original app points
        //*************************************
        var originalPoints =
        {
        };

        Object.assign( originalPoints, {
            //e/ X : {
            //e/    cssClass : 'tp-dtime',
            //e/    pos: S,
            //e/    pcolor : force,
            //e/    letterAngle : -90,
            //e/    letterRotRadius : 40,
            //e/    draggableX  : true,
            //e/    draggableY  : fconf.sappId === 'b1sec2prop7',
            //e/    initialR    : 5 * controlsScale,
            //e/    fontSize : 30,
            //e/    undisplayAlways : true,
            //e/    doPaintPname : false,
            //e/},
            S : {
                pos: S,
                pcolor : force,
                letterAngle : -90,
                //draggableX  : true,
                //draggableY  : true,
                //initialR    : 5 * controlsScale,
            },
            P : {
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
            },
            Q : {
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : fconf.sappId === 'b1sec2prop7',
            },
            R : {
                pcolor : proof,
                letterAngle : 45,
            },
            T : {
                pcolor : proof,
                letterAngle : 180,
            },
            Z : {
                pcolor : body,
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
            },
            Zminus : {
                pcolor : body,
                letterAngle : 45,
                //undisplay : true,
                undisplayAlways : true,
                doPaintPname : false,
            },
            V : {
                pos: V,
                pcolor : curvature,
                letterAngle : -45,
            },
            //?center of instant curvature circle
            C : {
                pos : C,
                caption : 'Rc',
                pcolor : curvature,
                letterAngle : -45,
            },
            Y : {
                pcolor : proof,
                letterAngle : -90,
            },
            Or : {
                doPaintPname : false,
                pos: C,
            },
        });
        //*************************************
        // \\// original app points
        //*************************************


        //*************************************
        // //\\ original app lines
        //*************************************
        var linesArray =
        [
            { 'SP' : { pcolor : body }, },
            { 'PV' : { pcolor : proof }, },
            { 'PR' : { pcolor : body }, },
            { 'SY' : { pcolor : proof }, },

            { 'QR' : { pcolor : proof }, },
            { 'QP' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },

            { 'PC' : { pcolor : curvature }, },
            { 'PY' : { pcolor : body }, },
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'CV' : { pcolor : curvature }, },
        ];
        //*************************************
        // \\// original app lines
        //*************************************


        //*************************************
        // //\\ passing locals to sconf
        //*************************************
        nspaste( sconf, {
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
        //e/ sconf.pointDecoration.r = sconf.handleRadius;
        //*************************************
        // \\// passing locals to sconf
        //*************************************
    }
})();
