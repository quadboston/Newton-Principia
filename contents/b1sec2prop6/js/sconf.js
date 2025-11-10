( function() {
    const { nspaste, fconf, sconf } = window.b$l.apptree({
        ssFExportList : { init_conf }
    });
    return;


    function init_conf()
    {
        //tools
        sconf.enableStudylab = false;
        //true enables framework zoom:
        sconf.enableTools = true;

        //navigation
        sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
        sconf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;


        //***************************************************************
        // //\\ original picture dimensions for svg scene
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        let pictureWidth = 630;
        let pictureHeight = 400;

        //to comply standard layout, one must add these 2 lines:
        let realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        let controlsScale = realSvgSize / sconf.standardSvgSize

        let S = [117, 322 ];
        let P = [453, 177];
        let Y = [263,66];
        let A = [540, 338];

        let originX_onPicture = S[0]; //for model's axis x
        let originY_onPicture = S[1]; //for model's axis y

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        let mod2inn_scale = ( A[0] - S[0] );
        //***************************************************************
        // \\// original picture dimensions for svg scene
        //***************************************************************


        //***************************************************************
        // //\\ GUI cosmetics
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;

        sconf.TP_OPACITY_FROM_fixed_colors = true;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 3;

        //--------------------------------------
        // //\\ these do override engine defaults,
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
        // \\// these do override engine defaults,
        //***************************************************************
        // \\// GUI cosmetics
        //***************************************************************


        //******************************************
        // //\\ model principals parameters
        //******************************************
        //pos of P
        sconf.parQ = 0.250;
        sconf.orbit_q_start = 0;
        sconf.orbit_q_end = 1;
        sconf.rgPq = 0.270;
        //sconf.tForSagitta0 = 0.168;

        //the law to be studied in given lemma:
        //fe: for 1/r^2, the assigment is
        //    sconf.force_law = bP => 1/(bP.r2);
        //null means that program will calculated the law
        //based on dt -> 0:
        sconf.force_law = null;

        //******************************************
        // \\// model principals parameters
        //******************************************


        //***************************************************************
        // //\\ math model auxilaries
        //***************************************************************
        const FT = sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = false; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = FT ? null : 0.69;
        //sconf.DQ_SLIDER_MIN = FT ? null : 0.0001;
        sconf.DT_SLIDER_MAX = FT ? 0.18 : null;
        sconf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
        sconf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN = true;
        sconf.Q_STEPS = 1500;
        sconf.TIME_STEPS = 1000;
        sconf.DATA_GRAPH_STEPS = 200;
        sconf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many

        //calculation decoration and quality
        sconf.BESIER_PIVOTS = 0; //5; //otherwise assumed 9 pivots
        sconf.GRAPH_PATH = true; //only for not-"addendum"

        //intervals of dt or dq to construct an arc for
        //fQR or sagitta,
        if( FT ){
            sconf.Dt0 = 0.168; //0.1;
        } else {
            sconf.Dq0 = 0.2;
        }
        //***************************************************************
        // \\// math model auxilaries
        //***************************************************************


        //***************************************************************
        // //\\ model comparison demo
        //***************************************************************
        sconf.SHOW_FORMULAS = [
            //usually, bP is aka context of "plane-cureve-derivatives"
            { label:'1/r²',
              fun:(bP) => 1/bP.r2,
              //e// cssclass : 'tp-formula-1 tostroke',
            },
        ];
        //***************************************************************
        // \\// model comparison demo
        //***************************************************************


        //*************************************
        // //\\ topic group colors,
        //*************************************
        var estimatedForce  = [200,0,200];
        var fQR             = [200,   0,  200, 1];

        var sagitta         = [100,50,0];
        var given           = [0,     150, 0,      1];
        var proof           = [0,     0,   255,    1];
        var result          = [200,150,0,1];
        var curvature       = [200,   40,  200, 1];
        var timeColor       = [200,  0,  255, 1];
        var body            = [0,     150,  200,   1];
        var dtime           = [0,     150,  200,  1];
        var hidden          = [0,     0,   0,      0];
        var context         = [0,     0,   0,      1];
        var invalid         = [255,    0,  0,      1];
        var chord           = [0,0,255, 1];

        var force           = [200,  70,  70,      1];
        ////swaps colors
        var force           = invalid;
        var invalid         = [0,     0,   0,      1];
        result              = [255,0,0,1];
        distanceToCenter    = body; //[ 70,100,0, 1];

        var predefinedTopics =
        {
            estimatedForce,
            fQR,
            body,
            force,
            sagitta,
            given,
            proof,
            result,
            hidden,
            context,
            curvature,
            dtime,
            time    : timeColor,
            curvatureCircle : curvature,
            orbit   : given,
            timearc : proof,
            APQ     : given,
            invalid,
            chord,
            distanceToCenter,
        };
        //*************************************
        // \\// topic group colors,
        //*************************************


        //*************************************
        // //\\ bricks for originalPoints
        //*************************************
        //e/eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        //e/var curvePivots = [];
        //e/curvePivots.push( [22,315] );
        //e/if( sconf.BESIER_PIVOTS === 5 ) {
        //e/curvePivots = curvePivots.map( pivot => ({
        //e/ pos         : pivot,
        //e/ pcolor      : given,
        //e/}));
        //e/var foldPoints  = (new Array(200)).fill({}).map( fp => ({
        //e/eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

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
 
        curvePivots.push( [22,315] );

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
        //*************************************
        // \\// bricks for originalPoints
        //*************************************


        //*************************************
        // //\\ original app points
        //*************************************
        var originalPoints =
        {
            curvePivots,
            foldPoints,
        };

        Object.assign( originalPoints, {
            //e/ X : {
            //e/    cssClass : 'tp-dtime',
            //e/    pos: S,
            //e/    pcolor : force,
            //e/    letterAngle : -90,
            //e/    letterRotRadius : 40,
            //e/    draggableX  : true,
            //e/    draggableY  : fconf.sappId === 'b1sec2prop7',
            //e/    initialR    : 5 * controlsScale,
            //e/    fontSize : 30,
            //e/    undisplayAlways : true,
            //e/    doPaintPname : false,
            //e/},
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

            R : {
                //pos: Q,
                pcolor : fQR,
                letterAngle : 45,
            },
            T : {
                pos: [0,0],
                pcolor : proof,
                letterAngle : 180,
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
            Y : {
                //pos: Q,
                pcolor : proof,
                letterAngle : 80,
            },
           A : {
                pos: A,
                pcolor : given,
                //letterAngle : -90,
                //undisplayAlways : true,
                //doPaintPname : false,
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
        //*************************************
        // \\// original app points
        //*************************************


        //*************************************
        // //\\ original app lines
        //*************************************
        var linesArray =
        [
            { 'SP' : { pcolor : distanceToCenter }, },
            { 'PV' : { pcolor : curvature }, },
            { 'PR' : { pcolor : body }, },
            { 'SY' : { pcolor : proof }, },

            { 'QR' : { pcolor : fQR }, },
            { 'QP' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : fQR }, },

            { 'PC' : { pcolor : curvature }, },
            { 'PY' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },

            { 'P,rrminus' : { pcolor : proof }, },
            { 'P,sagitta' : { pcolor : sagitta, vectorTipIx : 1 } },
            { 'Q,rrminus' : { pcolor : proof }, },
            { 'S,nonSolvablePoint' : { pcolor : invalid }, },
        ];
        //*************************************
        // \\// original app lines
        //*************************************


        //*************************************
        // //\\ passing locals to sconf
        //*************************************
        nspaste( sconf, {
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
        //e/ sconf.pointDecoration.r = sconf.handleRadius;
        //*************************************
        // \\// passing locals to sconf
        //*************************************
    }
})();
