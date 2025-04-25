
( function() {
    var { //import from apptree
        ns, userOptions,
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

        //true enables framework zoom
        sconf.enableTools               = true;

        sconf.rgShapesVisible           = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //chose approximation of the curve
        sconf.APPROX = 'D'; //divided differences';
        sconf.APPROX = 'B'; //Beizier
        
        sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
        sconf.BESIER_PIVOTS = 0; //5; //otherwise assumed 9 pivots
        sconf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;

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

        sconf.TP_OPACITY_FROM_fixed_colors = true;
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
        
        //overrides hover_width for texts
        //for activation, needs class "hover-width" in element
        sconf.text_nonhover_width   = 0.2;
        sconf.text_hover_width      = 0.5; 
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

        //=============================================
        // //\\ points reused in config
        var S = [originX_onPicture, originY_onPicture];
        var P = [453, 177];
        //var Q = [346, 134];
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
        var estimatedForce = [200,0,200];
        var sagitta = estimatedForce;
        var given   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var result  = [200,150,0,1];
        var curvature  = [200,   40,  200, 1];
        var timeColor  = [200,  0,  255, 1];
        var body    = [0,     150,  200,   1];
        var dtime   = [0,     150,  200,  1];
        var hidden  = [0,     0,   0,      0];
        var context = [0,     0,   0,      1];

        var invalid = [255,    0,  0,      1];
        var force   = [200,  150,  0,      1];
        if( userOptions.showingBonusFeatures() ) {
            ////swaps colors
            var force = invalid;
            var invalid = [0,     0,   0,      1];;
            result = [255,0,0,1];
        }
        
        //var chord = [0,0,255, 0.5]; //no dice
        var chord = [0,0,255, 1];
        var predefinedTopics =
        {
            estimatedForce,
            given,
            proof,
            result,
            hidden,
            context,
            curvature,
            dtime,
            time    : timeColor,
            curvatureCircle : curvature,
            body,
            orbit   : given,
            timearc : proof,
            APQ     : given,
            force,
            invalid,
            sagitta,
            chord,
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
        if( sconf.APPROX === 'B' ) {
            sconf.rgPq = 0.270;
            curvePivots.push( [22,315] );
        }
        sconf.tForSagitta0 = 0.168;
        if( sconf.BESIER_PIVOTS === 5 ) {
            ////adjustements of initial positions
            sconf.tForSagitta0 = 0.172;
            sconf.rgPq = 0.28;
            let wwcp = [];
            for( var i=0; i<curvePivots.length; i++ ) {
                if( (i-1)%2 ) {
                    let cp = curvePivots[i];
                    if( i!==0 && i!==curvePivots.length-1 ) {
                        let x = cp[0] - originX_onPicture;
                        let y = cp[1] - originY_onPicture;
                        x *=1.1
                        y *= i==6 ? 1.45 : ( i==4 ? 1.05 : 1.1 );
                        cp=[ x+originX_onPicture, y+originY_onPicture  ];
                    }
                    wwcp.push( cp );
                }
            }
            curvePivots = wwcp;
        }
        curvePivots = curvePivots.map( pivot => ({
            pos         : pivot,
            pcolor      : given,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname : false,
        }));

        var foldPoints  = (new Array(200)).fill({}).map( fp => ({
            pcolor      : invalid,
            doPaintPname : false,
        }));

        //---------------------------------------------------
        var originalPoints =
        {
            curvePivots,
            foldPoints,
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
                draggableY  : true,
                initialR    : 5,
            },

            Q : {
                //pos: Q,
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : true,
            },
            QtimeDecor : {
                undisplayAlways : true,
                //pos: will be as Q, 
                cssClass : 'tp-dtime',
                pcolor : dtime, //proof,
                fontSize : 20,
                letterAngle : 225,
                letterShift : [10,0],
                letterRotRadius : 40,
            },

            T : {
                pos: [0,0],
                pcolor : proof,
                letterAngle : 180,
            },

            R : {
                //pos: Q,
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
                //pos: Q,
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
            },

            sagitta : {
                caption : 'I',
                //pos: Q,
                pcolor : sagitta,
                letterAngle : 270,
                letterRotRadius : 35,
                //initial setting does not work well bs poor code design
                //undisplay : true,
            },


            Y : {
                //pos: Q,
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
                caption : 'Orbits are disconnected.',
                fontSize : '25',
                /*
                //no dice:
                title : 'Kepler force does not exist ' +
                        'in neighborhood of this point.',
                */
                undisplayAlways : true,
                pcolor : invalid,
                letterAngle : 0,

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
            { 'P,sagitta' : { pcolor : sagitta, vectorTipIx : 1 } },
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

