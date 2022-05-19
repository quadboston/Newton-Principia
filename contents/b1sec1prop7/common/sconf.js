
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
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================

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
        default_tp_stroke_width = Math.floor( 8 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 5 * controlsScale ),
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
        var A = [785, 441];
        var V = [64, 462 ];
        var ww1 = A[0]-V[0];
        var RR = ww1*ww1;
        var ww2 = A[1]-V[1];
        RR += ww2*ww2;
        RR = Math.sqrt( RR ) / 2;
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = RR;
        var C = [ V[0] + ww1/2, V[1] + ww2/2, ];

        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y

        var S = [207, 403];
        var P = [693, 213];
        var Q = [646.0, 168.0 ];

        sconf.prop7R = 1;
        sconf.prop7Center = [ 0, 0 ];
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
            timearc : proof,
            APQ     : given,
            force   : result,
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
            A : {
                pos: A,
                pcolor : given,
                //letterAngle : -90,
                //undisplayAlways : true,
                //doPaintPname : false,
            },


            S : {
                pos: S,
                pcolor : result,
                letterAngle : -90,
                draggableX  : true,
                draggableY  : true,
                //initialR    : 5 * controlsScale,
            },

            P : {
                pos: P,
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
            },

            Q : {
                pos: Q,
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : fconf.sappId === 'b1sec1prop7',
            },

            T : {
                pcolor : proof,
                letterAngle : 180,
            },

            K : {
                pcolor : proof,
                letterAngle : -90,
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
                pcolor : proof,
                letterAngle : 270,
                letterRotRadius : 35,
                //initial setting does not work well bs poor code design
                //undisplay : true,
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
            },


            //col2
            Tcol2 : {
                caption : 'T',
                pcolor : curvature,
                letterAngle : -45,
            },
            Rcol2 : {
                caption : 'R',
                pcolor : curvature,
                letterAngle : -45,
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
            { 'SP' : { pcolor : result }, },
            { 'AP' : { pcolor : proof }, },

            { 'PY' : { pcolor : body }, },
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'PR' : { pcolor : body }, },
            { 'ZQ' : { pcolor : body }, },
            { 'PK' : { pcolor : proof }, },


            { 'RL' : { pcolor : proof }, },

            { 'SY' : { pcolor : proof }, },
            { 'QR' : { pcolor : proof }, },
            { 'QP' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },

            { 'PC' : { pcolor : curvature }, },
            { 'P,rrminus' : { pcolor : proof }, },
            { 'P,sagitta' : { pcolor : proof, vectorTipIx : 1 } },
            { 'Q,rrminus' : { pcolor : proof }, },

            //col2
            { 'Rcol2,P' : { pcolor : proof }, },
            { 'Rcol2,Tcol2' : { pcolor : proof }, },
            { 'Tcol2,V' : { pcolor : proof }, },
            { 'Gcol2,S' : { pcolor : proof }, },
            { 'Gcol2,P' : { pcolor : proof }, },
        ];

        ns.paste( sconf, {
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

