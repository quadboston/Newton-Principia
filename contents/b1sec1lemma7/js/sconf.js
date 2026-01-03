
( function() {
    var { ns, fconf, sconf, topicColors_repo, userOptions } =
    window.b$l.apptree({ ssFExportList : { init_conf } });

    function init_conf()
    {
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = false;
        sconf.rgShapesVisible           = false;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 839;
        var pictureHeight = 563;

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        sconf.TP_OPACITY_LOW_POINT = 1;
        sconf.TP_OPACITY_LOW = 1; // applied to points, lines, and table data
        //making size to better fit lemma's diagram
        sconf.LETTER_FONT_SIZE_PER_1000 = 20;
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 5;

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        sconf.default_tp_lightness = 22;
        sconf.default_tp_stroke_width = 8;
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3 * controlsScale ),

        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        //sconf.nonhover_width = 4;
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );
        //sconf.hover_width = 114;  //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        //sconf.text_nonhover_width = 1;
        sconf.text_hover_width = 2; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),
        // \\// principal tp-css pars
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------

        //--------------------------------------
        // //\\ lemma 7
        //--------------------------------------
        //fixes direction of line BE as constant
        //can be any number from -oo to +oo
        sconf.BXBE_per_BY = 0.5;
        //todm ... bug: when decreasing then ratio begins worse:
        sconf.NON_ZERO_A_PREVENTOR = 0.0001;
        //--------------------------------------
        // \\// lemma 7
        //--------------------------------------

        //=============================================
        // //\\ points reused in config
        //=============================================
        sconf.diagramOrigin = [ 0, 0 ];


        //todo non-used, why
        //var originX_onPicture = C[0]; //for model's axis x
        //var originY_onPicture = C[1]; //for model's axis y

        //var modOrigin_inPictureSystem_x;
        //var modorInPicX;
        //var modelOriginInPictureLayoutCoordinates_x = 140;
        //var originX_onPicture = modelOriginInPictureLayoutCoordinates_x;
        //var originY_onPicture = 61;
        //=============================================
        // \\// points reused in config
        //=============================================

        //================================================================
        // //\\ we need good names ...
        //================================================================
        var modorInPicX = 140;
        var modorInPicY = 61;
        //================================================================
        // \\// we need good names ...
        //================================================================


        var A = [modorInPicX, modorInPicY];
        var r = [modorInPicX, 531];
        var R = [modorInPicX, 302];
        var B = [323, 156];

        var D = [474, modorInPicY];
        var d = [778, modorInPicY];
        var b = [514, 254];
        //var M = [50, modorInPicY];

        //sets position of axis-y for Calculus-framework, not for model axis-y
        var ytop = [-151, 50];



        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var context = [0, 0, 0];
        var given   = topicColors_repo.given;
        var proof   = topicColors_repo.proof;
        var result  = topicColors_repo.result;
        var hidden  = topicColors_repo.hidden;


        var topicColors_elected =
        {
            //:basic topics
            proof,
            given,
            result,
            hidden,

            //:given
            "curve-AB"      : given,
            "left-curve-AB" : given, //patch for left branch
            "arc-AB"        : given,
            "claimRatio"    : given,

            //proof
            "curve-Ab"      : proof,
            "arc-Ab"        : proof,
            "proofRatio"    : proof,

            //addendum
            "phi0"          : given,
            "deltaphi"      : given,
            "tangentPhi"    : result,
            'angleBAD'      : given,
            'conterminousRatio' : proof,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        var originalPoints =
        {
            //:context
            //axis-y addendum
            'ytop' : {
                pos             : ytop,
                letterAngle     : 90,
                caption         : 'axis y',
                letterRotRadius : 35,
                pcolor          : context,
            },
            "ylow" : {
                letterAngle : 90,
            },
            O : {
                letterAngle : -90,
                pcolor : given,
            },
            'axis-y_X_rd' : {
            },

            //axis-x addendum
            'xtop' : {
                letterAngle     : 130,
                caption         : 'axis x',
                letterRotRadius : 40,
                //pcolor : given,
            },
            "xlow" : {
                letterAngle : 90,
            },

            //beyond X and L to enable show of tangent angle
            "line-AL-end" : {
            },

            //extends rd to show an angle
            "line-dr-start" : {
                letterAngle : 30,
            },
            ///modified point r, closer to d
            "dr-decorpoint" : {
                caption : 'r',
                pcolor      : proof,
                letterAngle : -90,
                letterRotRadius : 20,
            },

            "y0" : {
                caption     : 'yₒ',
                letterAngle : 225,
                pcolor      : given,
            },
            //By
            'y' : {
                caption     : 'y',
                letterAngle : 45,
                pcolor      : given,
            },
            //Ax
            x : {
                caption     : 'x',
                letterAngle : -45,
                pcolor      : given,
            },
            //Bx
            x0 : {
                caption     : 'xₒ',
                letterAngle : 135,
                pcolor      : given,
            },

            // //\\ magnified points
            'Y0' : {
                pos             : A,
                caption         : 'Yₒ',
                letterAngle     : 210,
                letterRotRadius : 50,
                pcolor          : proof,
            },
            //BY
            'Y' : {
                caption         : 'Y',
                letterAngle     : 180,
                letterRotRadius : 35,
                pcolor          : proof,
            },
            //AX0
            'X0' : {
                caption         : 'Xₒ',
                letterAngle     : -90,
                pcolor          : proof,
            },
            //BX
            'X' : {
                caption         : 'X',
                letterAngle     : -90,
                pcolor          : proof,
            },
            // \\// magnified points


            //:originals from Book
            A : {
                //assigment by reference to pos is safe: no parasite links, pos is recalculated later
                pos         : A,
                letterAngle : 90,
                pcolor      : given,
            },
            r : {
                pos: r,
                letterAngle : 135,
                pcolor      : given,
            },
            R : {
                pos: R,
                letterAngle : 135,
                pcolor      : given,
            },
            B : {
                pos: B,
                letterAngle : 0,
                pcolor      : given,
            },
            /*
            'B-kernelx' : {
               cssClass : 'hover-width',
            },
            */

            C : {
                letterAngle : 45,
                letterRotRadius : 13,
                pcolor      : given,
            },

            D : {
                pos: D,
                letterAngle : 90,
                pcolor      : given,
                // this adds animation and allows dragging along x
                draggableX  : false,
                draggableY  : false,

            },
            DLeft : {
                letterAngle : 90,
                pcolor      : given,
                doPaintPname : false,
            },

            //proof
            b : {
                pos: b,
                letterAngle : 0,
                pcolor      : proof,
            },

            c : {
                letterAngle : 45,
                letterRotRadius : 13,
                pcolor      : proof,
            },


            d : {
                pos         : d,
                letterAngle : 90,
                pcolor      : proof,
            },

            curveStart  : {
                pos : [ A[0]-80, 0 ],
            },

            curveEnd : {
                pos : [B[0]+50,0],
            },
            curveLeftEnd : {
                pos : [250,100],
            },

            //lemma 7, coroll 1
            F : {
                letterAngle : 90,
                pcolor      : given,
            },
            G : {
                letterAngle : 90,
                pcolor      : given,
            },
            E : {
                letterAngle : 90,
                pcolor      : given,
            },
            e : {
                letterAngle : 90,
                pcolor      : proof,
            },
            L : {
                letterAngle : -45,
                pcolor      : result,
            },

        };
        ///alternatively to this, you can set own colors for originalPoints
        ///by your own
        ns.eachprop( originalPoints, (point,pname) => {
            point.pcolor = ns.haz( point, 'pcolor' ) || topicColors_elected[ pname ];
        });

        //model's spacial unit in pixels of the picture:
        var mod2inn_scale = originalPoints.R.pos[1] - originalPoints.A.pos[1];
        var linesArray =
        [
            { 'Ad' : { pcolor : proof } },
            { 'Ar' : { pcolor : given } },
            { 'Ab' : { pcolor : proof } },
            { "rd" : { pcolor : hidden } },

            { 'dr-decorpoint,d' : { pcolor : proof } },
            { 'dr' : { pcolor : proof } },


            //l7
            { 'bd' : { pcolor : proof } },
            { 'BD' : { pcolor : given } },  //lemma 7, coroll 1
            { 'BF' : { pcolor : given } },
            { 'AF' : { pcolor : given } },
            { 'AG' : { pcolor : given } },
            { 'AE' : { pcolor : given } },
            { 'BG' : { pcolor : given } },
            { 'be' : { pcolor : proof } },

            //sin(x)/x
            { 'Br' : { pcolor : given } },


            { 'line-dr-start,dr-decorpoint' : { pcolor : proof, undisplay : true } },

             //:context
            { 'ylow,ytop' : { pcolor : context, } },
            { 'xlow,xtop' : { pcolor : context, } },
            { 'O,ytop'    : { pcolor : context, } },

            //cirle radius
            { 'AO'    : { pcolor : given, 'stroke-width' : 1, } },
            { 'A,DLeft'  : { pcolor : given, 'stroke-width' : 2, } },

            //cirle radius
            { 'BO'    : { pcolor : given, 'stroke-width' : 1, } },

             //x-drops to axix x
            { 'A,x0'  : { pcolor : given, 'stroke-width' : 1, } },
            { 'Bx'    : { pcolor : given, 'stroke-width' : 1, } },
             //y-drops to axix y
            { 'A,y0'  : { pcolor : given, 'stroke-width' : 1, } },
            { 'By'    : { pcolor : given, 'stroke-width' : 1, } },



            //dy
            { 'y0,y' : { pcolor : given, 'stroke-width' : 8, } },
            //dx
            { 'x0,x' : { pcolor : given, 'stroke-width' : 8, } },

            { 'A,line-AL-end' : { pcolor : result } },

            //DY
            { 'A,Y' : { pcolor : proof, 'stroke-width' : 8, } },
            //DX
            { 'X0,X' : { pcolor : proof, 'stroke-width' : 8, } },

            //tangent
            { 'AL' : { pcolor : result } },
            { 'Ae' : { pcolor : proof } },

            { 'AE' : { pcolor : given } },
            { 'BE' : { pcolor : given } },
            { 'AB' : { pcolor : given } },
            { 'AD' : { pcolor : given } },
        ]

        //----------------------------------
        // //\\ curve pars
        //      points for divided
        //      differences interpolation
        //----------------------------------
        var minusX1 = 148 - modorInPicX;
        var minusX2 = 161 - modorInPicX;
        var minusX3 = 202 - modorInPicX;
        var minusX4 = 259 - modorInPicX;
        var minusX5 = 305 - modorInPicX;
        var minusX6 = B[0] - modorInPicX;
        var minusX7 = 353 - modorInPicX;
        var minusX8 = 360.5 - modorInPicX;


        var givenCurve_pivots =
        [
            //extending the curve to the left is quite a work bs
            //we need to change hard-coded tangent
            // [86,75],
            // [135,64],
            // [100,75],
            // [10,151],

            [148,62],
            [161,64],
            [202,75],
            [259,100],
            [305,135],
            [B[0], B[1]],
            [353,203],
            //[360.5, 239.0], //"oversampling"
        ];
        var ww_MONITOR_Y_FLIP = -1;
        var ww_inn2mod_scale = 1/mod2inn_scale;
        var ww_factor = ww_MONITOR_Y_FLIP * ww_inn2mod_scale;
        var givenCurve_pivots_inModel = givenCurve_pivots.map( opoint =>
            [ ( opoint[0] - modorInPicX ) * ww_inn2mod_scale,
              ( opoint[1] - modorInPicY +

                //additional tune-up: shifting curve exactly into origin A
                modorInPicY - 61.08569

              ) * ww_factor,
            ]
        );
        //----------------------------------
        // \\// curve pars
        //----------------------------------


        //making size to better fit lemma's diagram
        sconf.LETTER_FONT_SIZE_PER_1000 = 20;

        ns.paste( sconf, {
            //double back step ../../ is to reuse this path in code for lemma7
            mediaBgImage : "../../b1sec1lemma6/img/b1s1l6-diagram-3rded-b.png",
            givenCurve_pivots_inModel,
            topicColors_elected,
            originalPoints,
            linesArray,
            //lines,
            modorInPicX,
            modorInPicY,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
        });
    }
}) ();

