( function() {
    const { nspaste, fconf, sf, fixedColors, originalPoints } =
            window.b$l.apptree({ ssFExportList : { init_conf }
    });
    return;


function init_conf()
{
    //navigation
    sf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
    sf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.pictureWidth = 630;
    sf.pictureHeight = 400;

    //to comply standard layout, one must add these 2 lines:
    let realSvgSize = sf.pictureWidth + sf.pictureHeight;
    let controlsScale = realSvgSize / sf.standardSvgSize

    let S = [117, 322 ];
    let P = [453, 177];
    let Y = [263,66];
    let A = [540, 338];

    sf.originX_onPicture = S[0]; //for model's axis x
    sf.originY_onPicture = S[1]; //for model's axis y

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2inn_scale = ( A[0] - S[0] );
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at conf/conf.js or especally at conf/lemma.conf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.mediaBgImage = "diagram.png";
    sf.default_tp_lightness = 30;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    sf.parQ = 0.250;
    sf.orbit_q_start = 0;
    sf.orbit_q_end = 1;
    //pos of P
    sf.rgPq = 0.270;

    //the law to be studied in given lemma:
    //fe: for 1/r^2, the assigment is
    //    sf.force_law = bP => 1/(bP.r2);
    //null means that program will calculated the law
    //based on dt -> 0:
    sf.force_law = null;
    //******************************************
    // \\// model principals parameters
    //******************************************

    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
    sf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN = true; //only for non addendum
    const FT = sf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
    sf.CURVE_REVOLVES = false; //true for cyclic orbit
    sf.ADDENDUM_NORM_BY_MIN = false;
    sf.DQ_SLIDER_MAX = FT ? null : 0.69;
    //sf.DQ_SLIDER_MIN = FT ? null : 0.0001;
    sf.DT_SLIDER_MAX = FT ? 0.18 : null;
    sf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
    sf.Q_STEPS = 1500;
    sf.TIME_STEPS = 1000;
    sf.DATA_GRAPH_STEPS = 200;
    sf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many

    //calculation decoration and quality
    sf.BESIER_PIVOTS = 0; //5; //otherwise assumed 9 pivots
    //true can be in effect only for not-"addendum":
    sf.GRAPH_PATH = false;
    //intervals of dt or dq to construct an arc for
    //fQR or sagitta,
    if( FT ){
        sf.Dt0 = 0.168; //0.1;
    } else {
        sf.Dq0 = 0.2;
    }
    //***************************************************************
    // \\// math model auxilaries
    //***************************************************************

    //***************************************************************
    // //\\ model comparison demo
    //      , even if no sf.SHOW_FORMULAS, do preserve this as
    //      a commented template,
    //***************************************************************
    sf.SHOW_FORMULAS = [
        //usually, bP is aka context of "plane-cureve-derivatives"
        { label:'1/r²',
          fun:(bP) => 1/bP.r2,
          //t/ cssclass : 'tp-formula-1 tostroke',
        },
    ];
    //***************************************************************
    // \\// model comparison demo
    //***************************************************************

    //*************************************
    // //\\ topic group colors,
    //      to see templates what to override here, do
    //      look at conf/lemma.conf.js:
    //*************************************
    ///does import topic colors
    const {
        force,
        estimatedForce,
        fQR,
        //displacement
        curvature,
        curvatureCircle,
        sagitta,
        distanceToCenter,

        orbit,
        body,
        distance,
        chord,

        time,
        dtime,

        given,
        proof,
        result,

        hidden,
        context,
        invalid,
        shadow,
    } = fixedColors;

    ///does export topic colors
    sf.predefinedTopics = nspaste( {}, { //need deep copy
        force,
        estimatedForce,
        fQR,
        //t/displacement
        curvature,
        curvatureCircle,
        sagitta,
        distanceToCenter,

        orbit,
        body,
        distance,
        chord,

        time,
        dtime,

        given,
        proof,
        result,

        hidden,
        context,
        invalid,
        shadow,

        timearc : [...time],
        APQ     : [...orbit],
    });
    //*************************************
    // \\// topic group colors,
    //*************************************

    //*************************************
    // //\\ bricks for originalPoints
    //*************************************
    let curvePivots =
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

    if( sf.BESIER_PIVOTS === 5 ) {
        ////adjustements of initial positions
        //sf.tForSagitta0 = 0.172;
        Dt0 = 0.172;
        sf.rgPq = 0.28;
        let wwcp = [];
        for( let i=0; i<curvePivots.length; i++ ) {
            if( (i-1)%2 ) {
                let cp = curvePivots[i];
                if( i!==0 && i!==curvePivots.length-1 ) {
                    let x = cp[0] - sf.originX_onPicture;
                    let y = cp[1] - sf.originY_onPicture;
                    x *=1.1
                    y *= i==6 ? 1.45 : ( i==4 ? 1.05 : 1.1 );
                    cp=[ x+sf.originX_onPicture,
                         y+sf.originY_onPicture ];
                }
                wwcp.push( cp );
            }
        }
        curvePivots = wwcp;
    }
    //*************************************
    // \\// bricks for originalPoints
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    curvePivots = curvePivots.map( pivot => ({
        pos         : pivot,
        pcolor      : given,
        letterAngle : 45,
        draggableX  : true,
        draggableY  : true,
        doPaintPname : false,
    }));

    const foldPoints  = (new Array(200)).fill({}).map( fp => ({
        pcolor      : invalid,
        doPaintPname : false,
    }));

    Object.assign( originalPoints, {
        curvePivots,
        foldPoints,

        //t/ X : {
        //t/    cssClass : 'tp-dtime',
        //t/    pos: S,
        //t/    pcolor : force,
        //t/    letterAngle : -90,
        //t/    letterRotRadius : 40,
        //t/    draggableX  : true,
        //t/    draggableY  : fconf.sappId === 'b1sec2prop7',
        //t/    initialR    : 5 * controlsScale,
        //t/    fontSize : 30,
        //t/    undisplayAlways : true,
        //t/    doPaintPname : false,
        //t/},
        S : {
            pos: S,
            pcolor : force,
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
    sf.linesArray = nspaste( {},
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
    ]);
    //*************************************
    // \\// original app lines
    //*************************************
}
})();
