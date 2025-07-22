
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
        var pictureWidth = 922;
        var pictureHeight = 705;

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
        var C = [443, 375 ];
        var S = C;
        //=============================================
        // \\// points reused in config
        //=============================================


        //:diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360;
        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        const FT = sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = true; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = FT ? null : 1.0;
        sconf.DT_SLIDER_MAX = FT ? 0.66 : null;
        var Q_STEPS = 1000;
        var TIME_STEPS = 1000;
        var DATA_GRAPH_STEPS = 500;
        sconf.IS_DEVIATION_SCALED_BY_FORCE_MAX = true;
        sconf.DEVIATION_SCALE_FACTOR = 0.5;
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

        //to be studied in given proposition:
        sconf.force_law_function = bp => 1/(bp.R*bp.r2*(bp.sinOmega**3));

        //intervals of dt or dq to construct an arc for
        //displacement or sagitta,
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
        var given   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var result  = [200,   40,  0,      1];
        var curvature  = [200,   40,  200, 1];
        var body    = [0,     150,  200,   1];
        var hidden  = [0,     0,   0,      0];
        var context = [0,     0,   0,      1];
        var invalid = [200,  150,  0,      1];
        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            context,
            curvature,
            body,
            orbit   : given,
            force   : result,
            tangentCircle : curvature,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var originalPoints = {
            O : {
                pcolor : context,
                caption : 'C',
                pos: C,
                letterAngle : 120,
                letterRotRadius : 35,
            },

            B : {
                pcolor : proof,
                letterAngle : 90,
            },

            BB : {
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
            },

            A : {
                pcolor : proof,
            },

            AA : {
                undisplayAlways : true,
                doPaintPname : false,
            },

            D : {
                pcolor : proof,
                letterAngle : 70,
            },

            K : {
                pcolor : proof,
                letterAngle : 70,
            },

            G : {
                pcolor : proof,
                letterAngle : 90,
                letterRotRadius : 25,
            },

            T : {
                pcolor : proof,
                letterAngle : 180,
                letterRotRadius : 15,
            },

            R : {
                pcolor : proof,
                letterAngle : 45,
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

            v : {
                caption : '𝑣',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
            },

            F : {
                pcolor : proof,
                letterAngle : -135,
            },

            VV : {
                caption : 'V',
                pcolor : proof,
                letterAngle : -45,
            },

            //center of instant curvature circle
            C : {
                pos : C,
                caption : 'Rc',
                pcolor : curvature,
                letterAngle : -45,
                undisplayAlways : true,
                doPaintPname : false,
            },

            //Book's "another solution"
            u : {
                caption : '𝑢',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
            },

            tCircleCenter : {
                pos : C,
                caption : "C'",
                pcolor : curvature,
                letterAngle : -45,
            },


            //---------------------------------------
            // //\\ draggable points
            //---------------------------------------
            S : {
                pos: S,
                pcolor : result,
                letterAngle : -115,
                letterRotRadius : 25,
  
                //todo make S draggable if necessary
                //fix error in
                //        stdMod.creates_Q8P_sliders();
                //if( rg.S.draggableX || rg.S.draggableY ) {
                //    stdMod.creates_S_slider();
                //for this, take create sliders from prop 11, or other,
                //draggableX  : true,
                //draggableY  : true,
            },

            P : {
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                pcolor : proof,
                letterAngle : 180,
                letterRotRadius : 25,
                draggableX  : true,
                draggableY  : true,
            },
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        };


        var linesArray =
        [
            { 'PC' : { pcolor : proof }, },

            { 'SP' : { pcolor : result }, },

            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'PR' : { pcolor : body }, },
            { 'QR' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },

            { DK : { pcolor : proof }, },
            { GP : { pcolor : proof }, },
            { Qv : { pcolor : proof }, },
            { Pv : { pcolor : proof }, },
            { Tv : { pcolor : proof }, },

            { vG : { pcolor : proof }, },
            { PF : { pcolor : proof }, },
            { 'A,AA' : { pcolor : proof }, },
            { 'B,BB' : { pcolor : proof }, },
            { AO : { pcolor : proof }, },
            { DO : { pcolor : proof }, },
            { BO : { pcolor : proof }, },
            { PO : { pcolor : proof }, },
            { GO : { pcolor : proof }, },
            { FO : { pcolor : proof }, },

            //Book's "another solution"
            { Tu : { pcolor : proof }, },
            { 'u,VV' : { pcolor : proof }, },
            { uP : { pcolor : proof }, },
            { PQ : { pcolor : proof }, },
            { 'P,VV' : { pcolor : proof }, },
            { 'P,tCircleCenter' : { pcolor : curvature }, },
        ];

        ns.paste( sconf, {
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

