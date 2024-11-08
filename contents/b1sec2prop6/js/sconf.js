
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
        sconf.rgShapesVisible           = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //***************************************************************
        // //\\ geometical scales
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 630;
        var pictureHeight = 400;
        //***************************************************************
        // \\// geometical scales
        //***************************************************************



        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

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

        sconf.default_tp_lightness = 30;
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------
        //***************************************************************
        // \\// decorational parameters
        //***************************************************************


        //=============================================
        // //\\ points reused in config
        //=============================================
        //sconf.diagramOrigin = [ 0, 0 ];
        var originX_onPicture = 117; //for model's axis x
        var originY_onPicture = 322; //for model's axis y
        //=============================================
        // \\// points reused in config
        //=============================================

        //***************************************************************
        // //\\ geometics parameters
        //***************************************************************

        //chose approximation of the curve
        sconf.APPROX = 'D'; //divided differences';
        sconf.APPROX = 'B'; //Beizier
        
        //=============================================
        // //\\ points reused in config
        var S = [originX_onPicture, originY_onPicture];
        var P = [453, 177];
        var Q = [346, 134];
        var Y = [263,66];
        //var A = [540, 338];
        var A = sconf.APPROX === 'B' ? [540, 338] : [555, 338];
        //var A = [560, 338];
        //var A = [555, 338];
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
            curvatureCircle : curvature,
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
        var curvePivots =
        [
            A,
            [ 527,248 ],
            [ 485,203 ],
            //P,
            [ 396, 148 ],
            [300, 130], //near Q
            [217,132],
            [102,184],
            [51,238 ],
        ];
        sconf.tForSagitta0 = 0.168;
        if( sconf.APPROX === 'B' ) {
            sconf.rgPq = 0.270;
            curvePivots.push( [22,315] );
        }
        curvePivots = curvePivots.map( pivot => ({
            pos         : pivot,
            pcolor      : given,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname : false,
        }));


        //---------------------------------------------------
        var originalPoints =
        {
            curvePivots,
        };
        // \\// points to approximate and draw original curve
        //---------------------------------------------------

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
                initialR    : 5,
            },

            P : {
                pos: P,
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                initialR    : 5,
            },

            Q : {
                pos: Q,
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
            },

            T : {
                pos: [0,0],
                pcolor : proof,
                letterAngle : 180,
            },

            R : {
                pos: Q,
                pcolor : proof,
                letterAngle : 45,
            },

            Z : {
                pos: [111111,111111],
                pcolor : body,
                letterAngle : 45,
            },

            rrminus : {
                caption : 'Q-',
                pos: Q,
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
            },

            sagitta : {
                caption : 'I',
                pos: Q,
                pcolor : proof,
                letterAngle : 270,
                letterRotRadius : 35,
                //initial setting does not work well bs poor code design
                //undisplay : true,
            },


            Y : {
                pos: Q,
                pcolor : proof,
                letterAngle : 80,
            },

            V : {
                pos: S,
                pcolor : curvature,
                letterAngle : -45,
            },


            //center of instant curvature circle
            C : {
                pos: [0,0], //will be calculated
                caption : 'Rc',
                pcolor : curvature,
                letterAngle : -45,
            },

            nonSolvablePoint : {
                pos: [0,0], //will be calculated

                //caption : '!',
                caption : 'Central force does not exist ' +
                          'in this point neighborhood.',
                fontSize : '20',

                /*
                //no dice:
                title : 'Kepler force does not exist ' +
                        'in neighborhood of this point.',
                */
                pcolor : invalid,
                letterAngle : 90,

                //already toggled by amode8captures
                //undisplay : true,
            }

        });

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = ( A[0] - S[0] );

        var linesArray =
        [
            { 'PV' : { pcolor : curvature }, },
            //{ 'SA' : { pcolor : context }, },
            { 'SP' : { pcolor : result }, },

            { 'PY' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'PR' : { pcolor : body }, },

            { 'SY' : { pcolor : proof }, },
            { 'QR' : { pcolor : proof }, },
            { 'QP' : { pcolor : proof }, },
            //{ 'VQ' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PC' : { pcolor : curvature }, },
            { 'Q,rrminus' : { pcolor : proof }, },
            { 'P,rrminus' : { pcolor : proof }, },
            { 'P,sagitta' : { pcolor : proof, vectorTipIx : 1 } },
            { 'S,nonSolvablePoint' : { pcolor : invalid }, },
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

