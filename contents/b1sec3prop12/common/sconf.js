
( function() {
    var { //import from apptree
        ns,
        fconf,
        sconf, rg, stdMod,
    } = window.b$l.apptree({ //export to apptree
        ssFExportList : { init_conf }
    });
    return;









    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;
        sconf.rgShapesVisible           = true;
        //fconf.timeToShowOriginalDiagram = 11111111;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        var op = sconf.orbitParameters = {};
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 145;
        op.mainAxisAngle_initial = 0;
        op.mainAxisAngle = op.mainAxisAngle_initial;
        switch ( fconf.sappId ) {
            case "b1sec3prop14" :
                    op.initialEccentricity = 0.68;   //ellipse
                    sconf.insertDelayedBatch = true;
                    //for real picture if diagram's picture is supplied or
                    //for graphical-media work-area if not supplied:
                    var pictureWidth = 884;
                    var pictureHeight = 733; //728;
                    var mod2inn_scale = 260;
                    var F = [ 160, 410 ];
                    op.latusInitial = 0.83;
                    var PparQ = 0.07 * Math.PI;
                    op.sagittaDelta_q_initial = 0.19;
                  break;
            case "b1sec3prop13" :
                    op.initialEccentricity = 1; //parabola
                    var pictureWidth = 938;
                    var pictureHeight = 611;
                    var F = [ 560, 554 ];
                    op.latusInitial = 2.10;
                    var PparQ = 0.386 * Math.PI;
                    op.sagittaDelta_q_initial = 0.39;
                  break;
            case "b1sec3prop12" :
                    op.initialEccentricity = 1.365; //hyperbola
                    var pictureWidth = 690;
                    var pictureHeight = 836; //728;
                    var F = [ 492, 565 ];
                    op.latusInitial = 0.90;
                    var PparQ = 0.49 * Math.PI;
                    op.sagittaDelta_q_initial = 1;
                  break;
        }
        op.latus = op.latusInitial;
        stdMod.establishesEccentricity( op.initialEccentricity );

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;

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
        sconf.text_nonhover_width   = 1;
        sconf.text_hover_width      = 2;
        // \\// principal tp-css pars
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------
        //***************************************************************
        // \\// decorational parameters
        //***************************************************************



        //=============================================
        // //\\ points reused in config
        //=============================================
        var S = F;
        var P = [0, 0 ]; //set bu sconf.PparQ
        var Q = [0, 0 ]; //set in amode8captures
        sconf.diagramOrigin = [ 0, 0 ];
        var originX_onPicture = F[0]; //for model's axis x
        var originY_onPicture = F[1]; //for model's axis y
        //=============================================
        // \\// points reused in config
        //=============================================

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var given   = [0,     150, 0,      1];
        var orbit   = given;
        var proof   = [0,     0,   255,    1];
        var result  = [200,   40,  0,      1];
        var curvature  = [200,   40,  200, 1];
        var body    = [0,     150,  200,   1];
        var hidden  = [0,     0,   0,      0];
        var context = [0,     0,   0,      1];
        var shadow  = [150,  150,  150,    1];
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
            orbit,
            shadow,
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
                caption : 'O',
                pos: F,
                letterAngle : 45,
                letterRotRadius : 20,
            },

            //-----------------------------------------
            // //\\ Book's prop. 11
            //-----------------------------------------
            E : {
                pcolor : proof,
                letterRotRadius : 20,
                //letterAngle : 90,
            },
            H : {
                pcolor : proof,
                letterAngle : -90,
            },
            I : {
                pcolor : proof,
                letterRotRadius : 20,
            },
            //-----------------------------------------
            // \\// Book's prop. 11
            //-----------------------------------------



            B : {
                letterRotRadius : 20,
                pcolor : proof,
            },

            BB : {
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
            },

            L : {
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 20,
            },

            LL : {
                doPaintPname : false,
            },


            A : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -90,
            },

            AA : {
                undisplayAlways : true,
                doPaintPname : false,
            },


            D : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : 135,
            },

            K : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
            },

            M : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
            },

            N : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
            },
            G : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
            },


            T : {
                pcolor : proof,
                //letterAngle : 180,
                letterRotRadius : 20,
            },

            R : {
                pcolor : proof,
                letterAngle : 135,
                letterRotRadius : 20,
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
                letterAngle : 145,
                letterRotRadius : 20,
                doPaintPname : "b1sec3prop13" !== fconf.sappId,
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
                letterRotRadius : 20,
                letterAngle : 135,
            },

            VV : {
                caption : 'V',
                pcolor : proof,
                letterAngle : -45,
            },


            //center symmetry of orbit
            C : {
                pcolor : orbit,
                letterAngle : -45,
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
                letterAngle : -45,
                letterRotRadius : 20,
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
                letterRotRadius : 20,
                draggableX  : fconf.sappId !== "b1sec3prop14",
                draggableY  : fconf.sappId !== "b1sec3prop14",
            },

            P : {
                pos: P,
                pcolor : body,
                letterAngle : 120,
                //draggableX  : true,
                //draggableY  : true,
            },


            Fi : {
                caption : "φ",
                pcolor : shadow, //body,
                letterAngle : 120,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                pos: Q,
                pcolor : proof,
                letterAngle : -65,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },


            // //\\ eccentricity slider
            Zeta : {
                caption : 'eccentricity, e',
                pos : [ pictureWidth * 0.5, pictureHeight * 0.92 ],
                pcolor : orbit,
                letterAngle : 90,
                letterRotRadius : 20,
                draggableX  : 'b1sec3prop13' !== fconf.sappId,
                undisplayAlways  : 'b1sec3prop13' === fconf.sappId,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
            },

            ZetaCaption : {
                pos : [ pictureWidth * 0.5, pictureHeight * 0.97 ],
                pcolor : orbit,
                undisplayAlways : true,
                letterAngle : 90,
                letterRotRadius : 20,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
            },

            ZetaStart : {
                pos : [ pictureWidth * 0.1, pictureHeight * 0.92 ],
                pcolor : orbit,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },

            ZetaEnd : {
                pos : [ pictureWidth * 0.9, pictureHeight * 0.92 ],
                pcolor : orbit,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },
            // \\// eccentricity slider
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        });


        var linesArray =
        [
            //-----------------------------------------
            // //\\ Book's prop. 11
            //-----------------------------------------
            { Qx : { pcolor : proof }, },
            { Px : { pcolor : proof }, },
            //todm: proliferation
            { EP : { pcolor : proof }, },
            { PE : { pcolor : proof }, },
            { ES : { pcolor : proof }, },
            { EI : { pcolor : proof }, },
            { EO : { pcolor : proof }, },
            { EC : { pcolor : proof }, },
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
            { 'O,Fi' : { pcolor : shadow }, },

            { 'SP' : { pcolor : result }, },
            { 'CS' : { pcolor : proof }, },
            { 'CH' : { pcolor : proof }, },

            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'PR' : { pcolor : body }, },
            { 'QR' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },

            { DK : { pcolor : proof }, },
            { PM : { pcolor : body }, },
            { SM : { pcolor : body }, },
            { OM : { pcolor : proof }, },
            { ON : { pcolor : proof }, },
            { NS : { pcolor : proof }, },
            { SA : { pcolor : proof }, },
            { NP : { pcolor : proof }, },

            { GP : { pcolor : proof }, },
            { Qv : { pcolor : proof }, },
            { Pv : { pcolor : proof }, },
            { Tv : { pcolor : proof }, },
            { xv : { pcolor : proof }, },
            { Tx : { pcolor : proof }, },

            { Gv : { pcolor : proof }, },
            { PF : { pcolor : proof }, },
            { 'A,AA' : { pcolor : proof }, },
            { 'B,BB' : { pcolor : proof }, },
            { AO : { pcolor : proof }, },
            { AT : { pcolor : proof }, },
            { CA : { pcolor : proof }, },

            { DO : { pcolor : proof }, },
            { BO : { pcolor : proof }, },
            { CB : { pcolor : proof }, },
            //{ 'L,LL' : { pcolor : proof, caption : 'L/2',
            //             captionShiftNorm : -18, fontSize : 20, }, },
            { 'L,LL' : { pcolor : proof, }, },
            { CD : { pcolor : proof }, },

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
            { 'ZetaStart,ZetaEnd' : { pcolor : orbit }, },
        ];

        //stdMod.init_sliders_conf();
        ns.paste( sconf, {
            PparQ,

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

