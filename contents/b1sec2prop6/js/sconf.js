
( function() {
    var { ns, fconf, sconf, fixedColors,} = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
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
        var pictureWidth = 630;
        var pictureHeight = 400;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize;
        //***************************************************************
        // \\// geometical scales
        //***************************************************************

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab = false;
        //true enables framework zoom
        sconf.enableTools = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================


        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;

        sconf.TP_OPACITY_FROM_fixed_colors = true;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;
        
        fconf.DRAGGER_TOLERANCE = 10; // distance where crosshair appears

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 8 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3.5 * controlsScale ),
        //console.log(handleRadius);
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
        sconf.DT_SLIDER_MAX = FT ? 0.18 : null;
        sconf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
        var Q_STEPS = 1500;
        var DATA_GRAPH_STEPS = 200;
        sconf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many
        sconf.GRAPH_PATH = true; //only for not-bonus
        //-------------------------------------------
        //TEMP This probably needs adjustments.  Eg. perhaps something else
        //should be used?  Should look at the code specific to Q minus.
        sconf.Q_MINUS_EXISTS = true;
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

        //the law to be studied in given lemma:
        //fe: for 1/r^2, the assigment is
        //    sconf.force_law_function = bP => 1/(bP.r2);
        //null means that program will calculated the law
        //based on dt -> 0:
        sconf.force_law_function = null;

        //intervals of dt or dq to construct an arc for
        //displacement or sagitta,
        //Sets initial distance of point Q from P
        if( FT ){
            var Dt0 = 0.168; //0.1;
        } else {
            sconf.Dq0 = 0.2;
        }

        //pos of P
        sconf.parQ = 0.250;

        //=============================================
        // //\\ points reused in config
        //=============================================
        var posS = [originX_onPicture, originY_onPicture];
        var posP = [453, 177];
        var posA = [540, 338];
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
            time,
            dtime,
            proof,
            force,
            invalid,
            hidden,

            estimatedForce,
            sagitta,
            curvature,
            context,
            chord,
            displacement,
        } = fixedColors;


        var predefinedTopics =
        {
            estimatedForce,
            given,
            proof,
            hidden,
            context,
            curvature,
            dtime,
            time,
            curvatureCircle : curvature,
            body,
            orbit,
            timearc : proof,
            APQ     : orbit,
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
            posA,
            [ 527,248 ],
            [ 485,203 ],
            //P,
            [ 396, 148 ],
            [300, 130], //near Q
            [217,132],
            [102,184],
            [51,238 ],
        ];
        sconf.rgPq = 0.270;
        curvePivots.push( [22,315] );
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
                pos: posA,
                pcolor : given,
				cssClass: 'logic_phase--corollary',
            },

            S : {
                pos: posS,
                pcolor : given,
                letterAngle : -90,
                draggableX  : true,
                draggableY  : true,
            },

            P : {
                pos: posP,
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : true,
                conditionalDrag : 'logic_phase--proof logic_phase--claim',
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
				cssClass: 'subessay--corollary1 subessay--corollary5',
            },

            R : {
                //pos: Q,
                pcolor : displacement,
                letterAngle : 45,
				cssClass: 'logic_phase--corollary',
            },

            Z : {
                pos: [111111,111111],
                pcolor : body,
                letterAngle : 45,
				cssClass: 'subessay--corollary1',
            },

            // Q's counterpart at other end of arc
            rrminus : {
                caption : '',
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
				cssClass: 'logic_phase--claim logic_phase--proof subessay--corollary1',
            },

            sagitta : {
                caption : 'I',
                pcolor : sagitta,
                letterAngle : 270,
                letterRotRadius : 35,
                //initial setting does not work well bs poor code design
                //undisplay : true,
            },

            Y : {
                pcolor : proof,
                letterAngle : 80,
				cssClass: 'subessay--corollary3 subessay--corollary5',
            },

            V : {
                pos: posS,
                pcolor : curvature,
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
                caption : 'Orbits are disconnected.',
                fontSize : '25',
                undisplayAlways : true,
                pcolor : invalid,
                letterAngle : 0,
            }
        });

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = ( posA[0] - posS[0] );

        var linesArray =
        [
            { 'PV' : { pcolor : curvature,
				cssClass: 'subessay--corollary3 subessay--corollary5',
			 }, },
            { 'SP' : { pcolor : given,
				cssClass: 'subessay--corollary1 subessay--corollary5',
			 }, },
            { 'PY' : { pcolor : body,
				cssClass: 'subessay--corollary3 subessay--corollary5',
			 }, },
            { 'PZ' : { pcolor : body,
				cssClass: 'subessay--corollary1 subessay--corollary3',
			 }, },
            { 'PR' : { pcolor : body,
				cssClass: 'logic_phase--corollary',
			 }, },
            { 'SY' : { pcolor : proof,
				cssClass: 'subessay--corollary3 subessay--corollary5',
			 }, },
            { 'QR' : { pcolor : displacement,
				cssClass: 'logic_phase--corollary',
			 }, },
            { 'QP' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof,
				cssClass: 'subessay--corollary1',
			 }, },
            { 'QT' : { pcolor : displacement,
				cssClass: 'subessay--corollary1 subessay--corollary5',
			 }, },
            { 'PC' : { pcolor : curvature,
				cssClass: 'subessay--corollary3',
			 }, },
            { 'Q,rrminus' : { pcolor : proof,
				cssClass: 'logic_phase--claim logic_phase--proof subessay--corollary1',
			 }, },
            { 'P,sagitta' : { pcolor : sagitta,
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
    }
}) ();