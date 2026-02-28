( function() {
    const { nspaste, fconf, sf,
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
        sf.pictureWidth = 922;
        sf.pictureHeight = 705;

        //to comply standard layout, one must add these 2 lines:
        let realSvgSize = 2 * ( sf.pictureWidth + sf.pictureHeight ) / 2;
        let controlsScale = realSvgSize / sf.standardSvgSize

        let C = [443, 375 ];
        let S = C;

        sf.originX_onPicture = C[0]; //for model's axis x
        sf.originY_onPicture = C[1]; //for model's axis y
        sf.diagramOrigin = [ 0, 0 ];

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        sf.mod2med = 360;
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
        sf.parQ = 0.255 * Math.PI;
        sf.tForSagitta0 = 0.168;

        sf.ellipseA  = 1.03;
        sf.ellipseB  = 0.86;
        sf.orbit_q_start = 0;
        sf.orbit_q_end = 2.0 * Math.PI;


       //to be studied in given proposition:
        sf.force_law_function = sf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN ?
            null :
            //can be
            //bp.r
            bp => 1/(bp.R*bp.r2*(bp.sinOmega**3));

        //******************************************
        // \\// model principals parameters
        //******************************************


        //***************************************************************
        // //\\ math model auxilaries
        //***************************************************************
        const FT = sf.TIME_IS_FREE_VARIABLE = false; //vs q is free variable
        sf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN = false;
        sf.CURVE_REVOLVES = true; //true for cyclic orbit
        sf.DQ_SLIDER_MAX = FT ? null : 1.0;
        sf.DQ_SLIDER_MIN = FT ? null : 0.0001;
        sf.DT_SLIDER_MAX = FT ? 0.66 : null;
        sf.TIME_STEPS = FT ? 1000 : null;;
        sf.Q_STEPS = 1500;
        sf.DATA_GRAPH_STEPS = 500;

        //intervals of dt or dq to construct an arc for
        //displacement or sagitta,
        //Sets initial distance of point Q from P
        if( FT ){
            sf.Dt0 = 0.36;
        } else {
            sf.Dq0 = 0.42;
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
        var given   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var result  = [200,   40,  0,      1];
        var curvature  = [200,   40,  200, 1];
        var body    = [0,     150,  200,   1];
        var hidden  = [0,     0,   0,      0];
        var context = [0,     0,   0,      1];
        var invalid = [200,  150,  0,      1];

        ///does export topic colors
        nspaste( tpid2arrc_elect, { //need deep copy
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
        });
        //*************************************
        // \\// topic group colors,
        //*************************************


        //*************************************
        // //\\ original app points
        //*************************************
        Object.assign( originalPoints, {
            // //\\ no visibility cssClass
            AA : {
                undisplayAlways : true,
                doPaintPname : false,
            },

            BB : {
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
            },

            O : {
                pcolor : context,
                caption : 'C',
                pos: C,
                letterAngle : 120,
                letterRotRadius : 35,
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
            // \\// no visibility cssClass

            B : {
                pcolor : proof,
                letterAngle : 90,
                cssClass: 'aspect--english',
            },

            A : {
                pcolor : proof,
                cssClass: 'aspect--english',
            },

            // //\\ proof
            D : {
                pcolor : proof,
                letterAngle : 70,
                cssClass: 'logic_phase--proof',
            },

            K : {
                pcolor : proof,
                letterAngle : 70,
                cssClass: 'logic_phase--proof',
            },

            G : {
                pcolor : proof,
                letterAngle : 90,
                letterRotRadius : 25,
                cssClass: 'logic_phase--proof',
            },

            T : {
                pcolor : proof,
                letterAngle : 180,
                letterRotRadius : 15,
                cssClass: 'logic_phase--proof',
            },

            R : {
                pcolor : proof,
                letterAngle : 45,
                cssClass: 'logic_phase--proof',
            },

            v : {
                caption : '𝑣',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
                cssClass: 'logic_phase--proof',
            },

            F : {
                pcolor : proof,
                letterAngle : -135,
                cssClass: 'logic_phase--proof',
            },

            VV : {
                caption : 'V',
                pcolor : proof,
                letterAngle : -45,
                cssClass: 'logic_phase--proof',
            },

            Q : {
                pcolor : proof,
                letterAngle : 180,
                letterRotRadius : 25,
                draggableX  : true,
                draggableY  : true,
                cssClass: 'logic_phase--proof',
                conditionalDrag : 'logic_phase--proof' +
                                  ' aspect--addendum subessay--corollary2',
            },
            // \\// proof


            //Book's "another solution"
            u : {
                caption : '𝑢',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
                cssClass: 'subessay--another-solution',
            },

            tCircleCenter : {
                pos : C,
                caption : "C'",
                pcolor : curvature,
                letterAngle : -45,
                cssClass: 'subessay--another-solution',
            },

            //center of instant curvature circle
            C : {
                pos : C,
                caption : 'Rc',
                pcolor : curvature,
                letterAngle : -45,
                undisplayAlways : true,
                cssClass: 'logic_phase--addendum',
                doPaintPname : false,
            },

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
        });
        //*************************************
        // \\// original app points
        //*************************************


        //*************************************
        // //\\ original app lines
        //*************************************
        sf.linesArray = nspaste( {},
        [
            { 'A,AA' : { pcolor : proof, }, },
            { 'B,BB' : { pcolor : proof }, },
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },


            { AO : { pcolor : proof,
                     cssClass: 'aspect--english',
            }, },
            { BO : { pcolor : proof,
                     cssClass: 'aspect--english',
            }, },
            { PO : { pcolor : proof,
                     cssClass: 'aspect--english',
            }, },

            // //\\ proof
            { 'P,VV' : { pcolor : proof,
                         cssClass: 'logic_phase--proof',
            }, },

            { 'PC' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },

            { 'SP' : { pcolor : result }, },

            { 'PR' : { pcolor : body,
                       cssClass: 'logic_phase--proof',
            }, },
            { 'QR' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },
            { 'SQ' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },
            { 'QT' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },
            { 'PT' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },

            { DK : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { GP : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { Qv : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { Pv : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { Tv : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },

            { vG : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { PF : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { DO : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },

            { GO : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { FO : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            // \\// proof

            //Book's "another solution"
            { Tu : { pcolor : proof,
                     cssClass: 'subessay--another-solution',
            }, },
            { 'u,VV' : { pcolor : proof,
                         cssClass: 'subessay--another-solution',
            }, },
            { uP : { pcolor : proof,
                     cssClass: 'subessay--another-solution',
            }, },
            { PQ : { pcolor : proof,
                     cssClass: 'subessay--another-solution',
            }, },
            { 'P,tCircleCenter' : { pcolor : curvature,
                                    cssClass: 'subessay--another-solution',
            }, },
        ]);
        //*************************************
        // \\// original app lines
        //*************************************
    }
})();
