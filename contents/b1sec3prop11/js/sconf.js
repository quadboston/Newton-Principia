
( function() {
    var { ns, userOptions, fconf, sconf, fixedColors, } = 
        window.b$l.apptree({  ssFExportList : { init_conf } });
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
        var pictureWidth = 841;
        var pictureHeight = 728;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize
        //***************************************************************
        // \\// geometical scales
        //***************************************************************

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab = false;
        sconf.enableTools = true;
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



        //***************************************************************
        // //\\ geometics parameters
        // //\\ points reused in config
        //=============================================
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360;

        var C = [409, 408 ];
        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y

        sconf.eccentricity  = 0.59498295;
        sconf.ellipseA  = 1.07;
        sconf.ellipseAOriginal  = sconf.ellipseA;
        sconf.ellipseB  =
            Math.sqrt( Math.abs( 1 - sconf.eccentricity*sconf.eccentricity ) ) //Lambda
            * sconf.ellipseA; //0.86;
        var parQ       = 0.250 * Math.PI;
        var curveParA   = -0.64;
        var curveParFi0 = 0.0 * Math.PI;
        var curveParFiMax = 2 * Math.PI;
        //interval of t to construct an arc for Newton's sagitta
        var saggitaDt = 0.39;
        sconf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
        
        /*
        //combination which is at the edge of accuracy:
        //0.01 gives noticeable sagitta error
        //0.02 does not give this error
        //DATA_GRAPH_ARRAY_LEN is irrelevant
        sconf.DT_MIN = 0.01;
        var FORCE_ARRAY_LEN = 1000;
        var TIME_STEPS = 1000;
        //however 0.01 and 2000 eliminates the error, but
        //for expense of twice large arrays,
        */
        
        sconf.DT_MIN = 0.001;
        var FORCE_ARRAY_LEN = 1000;
        var TIME_STEPS = 1000;
        var DATA_GRAPH_ARRAY_LEN = 200;
        {
            // gets ellipse parameters
            let ellB2 = sconf.ellipseB*sconf.ellipseB;
            let ellA2 = sconf.ellipseA*sconf.ellipseA;
            let excentris2 = 1 - ellA2/ellB2;
            let excentris = Math.sqrt( excentris2 );
            sconf.ellipseFocus = Math.sqrt( ellA2 - ellB2 );
        }

        sconf.diagramOrigin = [ 0, 0 ];
        //=============================================
        // \\// points reused in config
        //=============================================

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            given,
            body,
            orbit,
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
            body,
            orbit,
            force,
            tangentCircle : curvature,
            //curvatureCircle : curvature,
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

            /*
            V : {
                pcolor : proof,
                letterAngle : -45,
            },
            */

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
                pcolor : given,
                letterAngle : -115,
                letterRotRadius : 35,
                draggableX  : true,
                draggableY  : userOptions.showingBonusFeatures(),
            },

            P : {
                //set by sconf.parQ
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
        };

        var linesArray =
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

            { 'SP' : { pcolor : proof }, },

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
            parQ,
            curveParA,
            curveParFi0,
            curveParFiMax,
            curveQRange : curveParFiMax - curveParFi0,
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

