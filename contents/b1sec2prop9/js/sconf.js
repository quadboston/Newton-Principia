
( function() {
    var { ns, fconf, sconf, fixedColors, } = 
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

        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 3;

        //--------------------------------------
        // //\\ do override engine defaults,
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
        sconf.text_nonhover_width   = 1000;
        sconf.text_hover_width      = 2000;
        // \\// principal tp-css pars
        // \\// do override engine defaults,
        // \\// decorational parameters
        //***************************************************************



        //***************************************************************
        // //\\ geometics parameters
        // //\\ points reused in config
        //=============================================
        var V = [64, 462 ];

        RR = 360; //Math.sqrt( RR ) / 2;
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value

        var mod2inn_scale = 360; //RR;
        var C           = [510, 311 ]; //455]; //[ V[0] + ww1/2, V[1] + ww2/2, ];
        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y

        
        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        sconf.prop7R = 1;
        var ro0 = 1.17; //spiral's ro0
        var curveParA = -0.64;
        sconf.orbit_q_start = 0;
        sconf.orbit_q_end = 1.3 * Math.PI;
        
        sconf.curveQRange = sconf.orbit_q_end - sconf.orbit_q_start;
        //to be studied in given proposition:
        sconf.force_law = bP => 1/(bP.r2*bP.r);
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------


        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        
        /*
        //combination which is at the edge of accuracy:
        //0.01 gives noticeable sagitta error
        //0.02 does not give this error
        //DATA_GRAPH_ARRAY_LEN is irrelevant
        sconf.DT_SLIDER_MIN = 0.01;
        var FORCE_ARRAY_LEN = 1000;
        var TIME_STEPS = 1000;
        //however 0.01 and 2000 eliminates the error, but
        //for expense of twice large arrays,
        */
        
        sconf.CALCULATE_SUGITTA_ALONG_THE_PATH = false;
        sconf.CURVE_REVOLVES = false; //is cyclic
        sconf.DT_SLIDER_MIN = 0.001;
        sconf.DQ_SLIDER_MAX = 0.65;
        var FORCE_ARRAY_LEN = 1000;
        var TIME_STEPS = 1000;
        var DATA_GRAPH_ARRAY_LEN = 200;
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------
        
        //-------------------------------------------
        // //\\ P and Q points positions
        //-------------------------------------------
        //interval of t to construct an arc for
        //Newton's sagitta
        //interval of t to construct an arc for Newton's sagitta
        var saggitaDt = 0.19;
        var parQ = 0.250 * Math.PI;
        var P = null; //set in init_model_parameters
        var Q = null; //set in model
        //-------------------------------------------
        // \\// P and Q points positions
        //-------------------------------------------

        sconf.diagramOrigin = [ 0, 0 ];
        var S = C; //[0, 0 ]; //not set in amode8captures
        //=============================================
        // \\// points reused in config
        //=============================================

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            given,
            orbit,
            body,
            proof,
            force,
            result,
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
            curvatureCircle : curvature,    //Actually uses "rg.C.pcolor" see "model-upcreate.js" section "curvature circle"
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
        /*
            //apparently this is not enough, need following in study-model.js
                //except point P which will be user-slided along curve,
                //merges selected points with controls points
                var cPivots = sconf.originalPoints.curvePivots;
                //merges positions to help d8d
                rg.a.pos = cPivots[0].rgX.pos;
                rg.c.pos = cPivots[2].rgX.pos;
        */
        var originalPoints =
        {
        };

        Object.assign( originalPoints, {
            Or : {
                doPaintPname : false,
                pos: C,
            },

            S : {
                pos: S,
                pcolor : result,
                letterAngle : -90,
                //draggableX  : true,
                //draggableY  : true,
                //initialR    : 5 * controlsScale,
            },

            P : {
                pos: P,
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
            },


            T : {
                pcolor : proof,
                letterAngle : 180,
            },

            R : {
                pcolor : proof,
                letterAngle : 45,
            },

            Q : {
                pos: Q,
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : fconf.sappId === 'b1sec2prop7',
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

            Y : {
                pos: Q,
                pcolor : proof,
                letterAngle : -90,
            },

            V : {
                pos: V,
                pcolor : curvature,
                letterAngle : -45,
            },

            //center of instant curvature circle
            //C is always hidden, therefore could likely be removed eventually however...
            //-see comment in section "topic group colors" for curvatureCircle
            //-its position is set in "model-upcreate.js" section "curvature circle"
            //-may also be set and/or used elsewhere
            C : {
                pos : C,
                caption : 'Rc',
                pcolor : curvature,
                letterAngle : -45,
                undisplayAlways : true,
                doPaintPname : false,
            },
        });


        var linesArray =
        [
            { 'PV' : { pcolor : proof }, },

            { 'SP' : { pcolor : result }, },

            { 'PY' : { pcolor : body }, },
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'PR' : { pcolor : body }, },
            { 'SY' : { pcolor : proof }, },
            { 'QR' : { pcolor : proof }, },
            { 'QP' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },
        ];

        ns.paste( sconf, {
            parQ,
            ro0,
            curveParA,
            saggitaDt,
            FORCE_ARRAY_LEN,
            DATA_GRAPH_ARRAY_LEN,
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
        sconf.pointDecoration.r = sconf.handleRadius;
        sconf.deltaQ = sconf.curveQRange / sconf.FORCE_ARRAY_LEN;
        //***************************************************************
        // \\// geometics parameters
        //***************************************************************
    }
}) ();

