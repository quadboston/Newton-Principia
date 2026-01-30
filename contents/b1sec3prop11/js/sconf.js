( function() {
    const { nspaste, fconf, sf, tpid2arrc_repo,
            tpid2arrc_elect, originalPoints } =
            window.b$l.apptree({ ssFExportList : { init_conf }
    });
    return;


    function init_conf()
    {
        //tools
        sf.enableStudylab = false;
        //true enables framework zoom:
        sf.enableTools = true;

        //navigation
        //t/sf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
        //t/sf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;

        //***************************************************************
        // //\\ original picture dimensions for svg scene
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        sf.pictureWidth = 841;
        sf.pictureHeight = 728;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( sf.pictureWidth + sf.pictureHeight ) / 2;
        var controlsScale = realSvgSize / sf.standardSvgSize

        var C = [409, 408 ];

        sf.originX_onPicture = C[0]; //for model's axis x
        sf.originY_onPicture = C[1]; //for model's axis y
        sf.diagramOrigin = [ 0, 0 ];

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        sf.mod2inn_scale = 360;
        //***************************************************************
        // \\// original picture dimensions for svg scene
        //***************************************************************


        //***************************************************************
        // //\\ GUI cosmetics
        //***************************************************************
        sf.mediaBgImage = "diagram.png";
        //sf.default_tp_lightness = 30;

        //sconf.LETTER_FONT_SIZE_PER_1000 = 30;
        //sf.pointDecoration.r= 3;

        //--------------------------------------
        // //\\ these do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        /*
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3 * controlsScale ),
        // //\\ principal tp-css pars
        sf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

        sf.text_nonhover_width   = 1000;
        sf.text_hover_width      = 2000;
        */
        // \\// principal tp-css pars

        //--------------------------------------
        // \\// these do override engine defaults,
        //***************************************************************
        // \\// GUI cosmetics
        //***************************************************************

        //******************************************
        // //\\ model principals parameters
        //******************************************
        //pos of P
        sf.parQ = 0.250 * Math.PI;
        sf.eccentricity  = 0.59498295;
        sf.ellipseA  = 1.07;
        sf.ellipseAOriginal  = sf.ellipseA;
        sf.ellipseB  =
            Math.sqrt( Math.abs( 1 - sf.eccentricity*sf.eccentricity ) ) //Lambda
            * sf.ellipseA; //0.86;
        sf.curveParA   = -0.64;
        sf.orbit_q_start = 0;
        sf.orbit_q_end = 2 * Math.PI;

        {
            // gets ellipse parameters
            let ellB2 = sf.ellipseB*sf.ellipseB;
            let ellA2 = sf.ellipseA*sf.ellipseA;
            let excentris2 = 1 - ellA2/ellB2;
            let excentris = Math.sqrt( excentris2 );
            sf.ellipseFocus = Math.sqrt( ellA2 - ellB2 );
        }

        sf.force_law = bP => 1/(bP.r2);
        //******************************************
        // \\// model principals parameters
        //******************************************


        //***************************************************************
        // //\\ math model auxilaries
        //***************************************************************
        const FT = sf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sf.CURVE_REVOLVES = true; //true for cyclic orbit
        sf.DQ_SLIDER_MAX = FT ? null : 0.69;
        sf.DT_SLIDER_MAX = FT ? 0.32 : null;
        sf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
        sf.Q_STEPS = 1500;
        sf.TIME_STEPS = 1500;
        sf.DATA_GRAPH_STEPS = 500;
        sf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------


        //intervals of dt or dq to construct an arc for
        //displacement or sagitta,
        if( FT ){
            sf.Dt0 = 0.39;
        } else {
            sf.Dq0 = 0.19;
        }
        //***************************************************************
        // \\// math model auxilaries
        //***************************************************************


        //***************************************************************
        // //\\ model comparison demo
        //***************************************************************
        //t/sf.SHOW_FORMULAS = [
        //***************************************************************
        // \\// model comparison demo
        //***************************************************************

        //*************************************
        // //\\ topic group colors,
        //*************************************
    ///does import topic colors
    const {
        force,
        estimatedForce,
        fQR,
        displacement,
        curvature,
        curvatureCircle,
        sagitta,
        distanceToCenter,

        orbit,
        body,
        distance,
        chord,

        time,
        dtime,

        given,
        proof,
        result,

        hidden,
        context,
        invalid,
        shadow,
    } = tpid2arrc_repo;

        ///does export topic colors
        nspaste( tpid2arrc_elect, { //need deep copy
            given,
            proof,
            result,
            displacement,
            hidden,
            context,
            curvature,
            body,
            orbit   : given,
            force   : result,
            tangentCircle : curvature,
        });
        //*************************************
        // \\// topic group colors,
        //*************************************


        //*************************************
        // //\\ original app points
        //*************************************
        Object.assign( originalPoints, {
            O : {
                pcolor : context,
                caption : 'C',
                pos: C,
                letterAngle : 155,
                letterRotRadius : 35,
            },

            //-----------------------------------------
            // //\\ Book's prop. 11
            //-----------------------------------------
            E : {
                pcolor : proof,
                letterAngle : 90,
            },
            H : {
                pcolor : proof,
                letterAngle : -90,
            },
            I : {
                pcolor : proof,
                letterAngle : 90,
            },
            //-----------------------------------------
            // \\// Book's prop. 11
            //-----------------------------------------



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
                letterAngle : 70,
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
                undisplayAlways : true,
                doPaintPname : false,
            },

            Zminus : {
                caption : 'Z',
                pcolor : body,
                letterAngle : 45,
                //undisplay : true,
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

            //----------------------------------------
            // //\\ Prop. 10 Book's "another solution"
            //----------------------------------------
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
            //----------------------------------------
            // \\// Prop. 10 Book's "another solution"
            //----------------------------------------


            //----------------------------------------
            // //\\ Prop. 11
            //----------------------------------------
            x : {
                caption : "𝑥",
                pcolor : proof,
                letterAngle : 100,
                letterRotRadius : 20,
            },
            SS : { //focus
                caption : 'Sₛ',
                pcolor : result,
                letterAngle : -45,
                letterRotRadius : 35,
            },
            //----------------------------------------
            // \\// Prop. 11
            //----------------------------------------


            //---------------------------------------
            // //\\ draggable points
            //---------------------------------------
            S : {
                pcolor : result,
                letterAngle : -115,
                letterRotRadius : 35,
                draggableX  : true,
                draggableY  : true,
            },

            P : {
                //set by sf.parQ
                //pos: P,

                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                //set in amode8captures
                //pos: Q,

                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : true,
            },
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        });
        //*************************************
        // \\// original app points
        //*************************************


        //*************************************
        // //\\ original app lines
        //*************************************
        sf.linesArray = nspaste( {},
        [
            //-----------------------------------------
            // //\\ Book's prop. 11
            //-----------------------------------------
            { Qx : { pcolor : proof }, },
            { EP : { pcolor : proof }, },
            { ES : { pcolor : proof }, },
            { EI : { pcolor : proof }, },
            { EO : { pcolor : proof }, },
            { PH : { pcolor : proof }, },
            { HI : { pcolor : proof }, },
            { OS : { pcolor : proof }, },
            { OH : { pcolor : proof }, },
            { PI : { pcolor : proof }, },
            //-----------------------------------------
            // \\// Book's prop. 11
            //-----------------------------------------

            //{ 'CV' : { pcolor : curvature }, },
            { 'PC' : { pcolor : proof }, },

            { 'SP' : { pcolor : result }, },

            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'PR' : { pcolor : body }, },
            { 'QR' : { pcolor : displacement }, },
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

        ]);
        //*************************************
        // \\// original app lines
        //*************************************
    }
})();
