
( function() {
    var { //import from apptree
        ns,
        fconf,
        sconf,
    } = window.b$l.apptree({ //export to apptree
        ssFExportList : { init_conf }
    });
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
        fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;

        sconf.rgShapesVisible = true;

        //gives bar full range of opacity for tp machine
        sconf.TOPIC_FILL_OPACITY_IN_FOCUS = 1;
        //makes idle bars brighter
        sconf.TOPIC_FILL_OPACITY_NOT_IN_FOCUS = 0.6;

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
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------
        //***************************************************************
        // \\// decorational parameters
        //***************************************************************



        //***************************************************************
        // //\\ geometics parameters
        //***************************************************************
        //=============================================
        // //\\ points reused in config
        //=============================================
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360;

        var C = [443, 375 ];
        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y

        sconf.ellipseA  = 1.03;
        sconf.ellipseB  = 0.86;
        var PparT       = 0.255 * Math.PI;
        var curveParA   = -0.64;
        var curveParFi0 = 0.0 * Math.PI;
        var curveParFiMax = 2 * Math.PI;
        //interval of t to construct an arc for Newton's sagitta
        var sForSagitta_valQ = 0.36;

        var S = C;
        var P = [0, 0 ]; //set bu sconf.PparT
        var Q = [0, 0 ]; //set in amode8captures

        sconf.diagramOrigin = [ 0, 0 ];
        //=============================================
        // \\// points reused in config
        //=============================================

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
        };

        Object.assign( originalPoints, {
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
                draggableX  : true,
                draggableY  : true,
            },

            P : {
                pos: P,
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                pos: Q,
                pcolor : proof,
                letterAngle : 180,
                letterRotRadius : 25,
                draggableX  : true,
                draggableY  : true,
            },
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        });


        var linesArray =
        [
            //{ 'CV' : { pcolor : curvature }, },
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
            PparT,
            curveParA,
            curveParFi0,
            curveParFiMax,
            sForSagitta_valQ,

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
        //***************************************************************
        // \\// geometics parameters
        //***************************************************************
    }
}) ();

