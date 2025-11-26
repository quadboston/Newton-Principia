( function() {
    const { nspaste, fconf, sf, fixedColors, originalPoints } =
            window.b$l.apptree({ ssFExportList : { init_conf }
    });
    return;


function init_conf()
{
    //navigation
    //t/sf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
    //t/sf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.pictureWidth = 1000;
    sf.pictureHeight = 600;

    //to comply standard layout, one must add these 2 lines:
    let realSvgSize = sf.pictureWidth + sf.pictureHeight;
    let controlsScale = realSvgSize / sf.standardSvgSize

    const  V = [64, 462 ];
    const  C = [510, 311 ]; // V[0] + ww1/2, V[1] + ww2/2, ];
    //pos of point P
    const  S = C;

    sf.originX_onPicture = C[0]; //for model's axis x
    sf.originY_onPicture = C[1]; //for model's axis y
    sf.diagramOrigin = [ 0, 0 ];

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2inn_scale = 360; //RR;
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
    //t/sf.default_tp_lightness = 30;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    sf.orbit_q_start = -0.05 * Math.PI;
    sf.orbit_q_end = 1.3 * Math.PI;
    //pos of P
    sf.parQ = -sf.orbit_q_start*2;
    sf.ro0 = 1.17; //spiral's ro0
    sf.curveParA = -0.64;

    //the law to be studied in given lemma:
    //  fe: for 1/r^2, the assigment is
    //    sf.force_law = bP => 1/(bP.r2);
    //  null means that program will calculated the law
    //  based on dt -> 0:
    sf.force_law = bP => 1/(bP.r2*bP.r);
    //******************************************
    // \\// model principals parameters
    //******************************************

    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
    const FT = sf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
    sf.CURVE_REVOLVES = false; //true for cyclic orbit
    sf.DQ_SLIDER_MAX = FT ? null : 0.69;
    sf.DQ_SLIDER_MIN = FT ? null : 0.0001;
    sf.DT_SLIDER_MAX = FT ? 0.32 : null;
    sf.Q_STEPS = 1000;
    sf.TIME_STEPS = 1000;
    sf.DATA_GRAPH_STEPS = 200;

    //intervals of dt or dq to construct an arc for
    //fQR or sagitta,
    if( FT ){
        sf.Dt0 = 0.3;
    } else {
        sf.Dq0 = 0.19;
    }
    //***************************************************************
    // \\// math model auxilaries
    //***************************************************************

    //***************************************************************
    // //\\ model comparison demo
    //***************************************************************
    //t/sf.SHOW_FORMULAS = [
    //t/    //usually, bP is aka context of "plane-cureve-derivatives"
    //t/    { label:'1/r²',
    //t/      fun:(bP) => 1/bP.r2,
    //t/      cssclass : 'tp-formula-1 tostroke',
    //t/    },
    //t/];
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
        displacement,
        curvature,
        curvatureCircle,
        //sagitta,
        distanceToCenter,

        orbit,
        body,
        distance,
        //chord,

        time,
        //dtime,

        //given,
        proof,
        result,

        hidden,
        context,
        //invalid,
        //shadow,
    } = fixedColors;

    ///does export topic colors
    sf.predefinedTopics = nspaste( {}, { //need deep copy
        force,
        estimatedForce,
        fQR,
        displacement,
        curvature,
        curvatureCircle,
        //t/sagitta,
        distanceToCenter,

        orbit,
        body,
        distance,
        //t/chord,

        time,
        //t/dtime,

        //t/given,
        proof,
        result,

        hidden,
        context,
        //t/invalid,
        //t/shadow,
    });
    //*************************************
    // \\// topic group colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    Object.assign( originalPoints, {
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
        },
        P : {
            pcolor : body,
            letterAngle : 70,
            draggableX  : true,
        },
        Q : {
            pcolor : proof,
            letterAngle : 225,
            letterRotRadius : 40,
            draggableX  : true,
            draggableY  : fconf.sappId === 'b1sec2prop7',
        },
        R : {
            pcolor : proof,
            letterAngle : 45,
        },
        T : {
            pcolor : proof,
            letterAngle : 180,
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
        V : {
            pos: V,
            pcolor : curvature,
            letterAngle : -45,
        },
        //?center of instant curvature circle
        C : {
            pos : C,
            caption : 'Rc',
            pcolor : curvature,
            letterAngle : -45,
        },
        Y : {
            pcolor : proof,
            letterAngle : -90,
        },
        Or : {
            doPaintPname : false,
            pos: C,
        },
    });
    //*************************************
    // \\// original app points
    //*************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = nspaste( {}, 
    [
        { 'SP' : { pcolor : body }, },
        { 'PV' : { pcolor : proof }, },
        { 'PR' : { pcolor : body }, },
        { 'SY' : { pcolor : proof }, },

        { 'QR' : { pcolor : proof }, },
        { 'QP' : { pcolor : proof }, },
        { 'SQ' : { pcolor : proof }, },
        { 'QT' : { pcolor : proof }, },
        { 'PT' : { pcolor : proof }, },

        { 'PC' : { pcolor : curvature }, },
        { 'PY' : { pcolor : body }, },
        { 'P,Zminus' : { pcolor : body }, },
        { 'PZ' : { pcolor : body }, },
        { 'ZR' : { pcolor : body }, },

        { 'CV' : { pcolor : curvature }, },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************
}
})();
