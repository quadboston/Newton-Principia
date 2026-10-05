( function() {
    var { ns, fconf, sData, sconf, topicColors_repo,} = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //***************************************************************
        // //\\ geometrical scales
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 630;
        var pictureHeight = 400;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize;
        //***************************************************************
        // \\// geometrical scales
        //***************************************************************

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;

        sconf.TP_OPACITY_FROM_fixed_colors = true;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;
        
        fconf.DRAGGER_TOLERANCE = 10; // distance where crosshair appears
        sconf.enableStudylab = false;

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 8 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3.5 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius; // todo: this doesn't seem to do anything...

        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 9*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );

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
        // \\// decorational parameters
        //***************************************************************

        //:diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360;

        var originX_onPicture = 117; //for model's axis x
        var originY_onPicture = 322; //for model's axis y

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
        sconf.BESIER_PIVOTS = 0; //5; //otherwise assumed 9 pivots
        sconf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;

        const FT = sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = false; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = FT ? null : 0.69;
        sconf.DT_SLIDER_MAX = FT ? 0.25 : null;
        sconf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
        var Q_STEPS = 1500;
        var DATA_GRAPH_STEPS = 200;
        sconf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many
        sData.PLOT_BY_PATH = true;
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------

        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        const orbit_q_start = 0;
        sconf.orbit_q_end = 1;
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------

        //intervals of dt or dq to construct an arc for estimated force
        //Sets initial distance of point Q from P
        if( FT ){
            var Dt0 = 0.2276;
        } else {
            sconf.Dq0 = 0.2;
        }

        //pos of P
        sconf.parQ = 0.283;

        //=============================================
        // //\\ points reused in config
        //=============================================
        var posS = [originX_onPicture, originY_onPicture];
        var posA = [540, 338];
        //=============================================
        // \\// points reused in config
        //=============================================

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            givenColor,
            bodyColor,
            proofColor,
            forceColor,
            invalid,
            infoColor,
            estimatedForceColor,
            curvature,
            sunColor
        } = topicColors_repo;


        var topicColors_elected =
        {
            estimatedForceColor,
            givenColor,
            proofColor,
            curvature,
            curvatureCircle : curvature,
			time: estimatedForceColor,
            orbit: bodyColor,
            timearc : bodyColor,
            APQ     : bodyColor,
            force: forceColor,
            invalid,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var curvePivots =
        [
            posA,
            [ 523.3, 252 ],
            [ 510.9, 193.2 ],
            [ 385.6, 156.7 ],
            [300, 137.2], //near Q
            [217,132],
            [102, 180.1],
            [51,238 ],
			[24.2, 315] 
        ];
        sconf.rgPq = 0.270;
        //sconf.tForSagitta0 = 0.168;
        if( sconf.BESIER_PIVOTS === 5 ) {
            ////adjustements of initial positions
            //sconf.tForSagitta0 = 0.172;
            Dt0 = 0.172;
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
            pcolor      : infoColor,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname : false,
        }));

        var foldPoints  = (new Array(200)).fill({}).map( () => ({
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
                pcolor : bodyColor,
				draggableX  : true,
                draggableY  : true,
				cssClass: 'logic_phase--corollary',
            },

            S : {
                pos: posS,
                pcolor : sunColor,
                letterAngle : -90,
                draggableX  : true,
                draggableY  : true,
            },

            P : {
                pcolor : bodyColor,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                pcolor : estimatedForceColor,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : true,
            },

            T : {
                pcolor : estimatedForceColor,
                letterAngle : 180,
				cssClass: 'subessay--corollary1 subessay--corollary5',
            },

            R : {
                pcolor : estimatedForceColor,
                letterAngle : 45,
				cssClass: 'logic_phase--corollary',
            },

            Z : {
                pcolor : proofColor,
                letterAngle : 45,
				cssClass: 'subessay--corollary1',
            },

            // Q's counterpart at other end of arc
            rrminus : {
                caption : '',
                pcolor : givenColor,
				cssClass: 'logic_phase--claim logic_phase--proof subessay--corollary1',
            },

            sagitta : {
                caption : 'I',
                pcolor : estimatedForceColor,
                letterAngle : 270,
                letterRotRadius : 35,
                //initial setting does not work well bs poor code design
                //undisplay : true,
            },

            Y : {
                pcolor : estimatedForceColor,
                letterAngle : 80,
				cssClass: 'subessay--corollary3 subessay--corollary5',
            },

            V : {
                pcolor : estimatedForceColor,
                letterAngle : -45,
				cssClass: 'subessay--corollary3 subessay--corollary5',
            },

            //center of instant curvature circle
            C : {
                //pos will be calculated
                caption : '',
                pcolor : curvature,
                letterAngle : -45,
				cssClass: 'subessay--corollary3',
            },

            nonSolvablePoint : {
                //pos will be calculated
                caption : '',
                fontSize : '25',
                undisplayAlways : true,
                pcolor : invalid,
                letterAngle : 0,
            },
            errorMessage : { // nonSolvablePoint message shown at to of canvas
				// caption assigned in model-upcreate by const set in builds-orbit.js
                pos : [20, 20],
                fontSize : '25',
                pcolor : invalid,
                unscalable  : true,
            },
            infoMessage : {
                pos : [20, 20],
                caption: "In the limit, the sagitta will pass through the center of forces",
                fontSize : '25',
                pcolor : infoColor,
                letterAngle : 0,
                unscalable  : true,
            }
        });

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = ( posA[0] - posS[0] );

        var linesArray =
        [
            { 'PV' : { pcolor : estimatedForceColor,
				cssClass: 'subessay--corollary3 subessay--corollary5',
			 }, },
            { 'SP' : { pcolor : estimatedForceColor,
			 }, },
            { 'PY' : { pcolor : bodyColor,
				cssClass: 'subessay--corollary3 subessay--corollary5',
			 }, },
            { 'PZ' : { pcolor : proofColor,
				cssClass: 'subessay--corollary1 subessay--corollary3',
			 }, },
            { 'PR' : { pcolor : proofColor,
				cssClass: 'logic_phase--corollary',
			 }, },
            { 'SY' : { pcolor : estimatedForceColor,
				cssClass: 'subessay--corollary3 subessay--corollary5',
			 }, },
            { 'QR' : { pcolor : estimatedForceColor,
				cssClass: 'logic_phase--corollary',
			 }, },
            { 'QP' : { pcolor : proofColor }, },
            { 'SQ' : { pcolor : proofColor,
				cssClass: 'subessay--corollary1',
			 }, },
            { 'QT' : { pcolor : estimatedForceColor,
				cssClass: 'subessay--corollary1 subessay--corollary5',
			 }, },
            { 'PC' : { pcolor : curvature,
				cssClass: 'subessay--corollary3',
			 }, },
            { 'Q,rrminus' : { pcolor : givenColor,
				cssClass: 'logic_phase--claim logic_phase--proof subessay--corollary1',
			 }, },
            { 'P,sagitta' : { pcolor : estimatedForceColor,
				cssClass: 'logic_phase--claim logic_phase--proof subessay--corollary1',
			 }, },
            { 'S,nonSolvablePoint' : { pcolor : invalid,
				undisplayAlways : true,
			 }, },
        ];

        ns.paste( sconf, {
            orbit_q_start,
            Dt0,
            Q_STEPS,
            DATA_GRAPH_STEPS,
            mediaBgImage : "diagram.png",
            topicColors_elected,
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
