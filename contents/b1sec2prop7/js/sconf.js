( function() {
    const { nspaste, fconf, sf, fixedColors, originalPoints } =
            window.b$l.apptree({
                ssFExportList : { init_conf }
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
    sf.pictureWidth = 892;
    sf.pictureHeight = 840;
    //to comply standard layout, one must add these 2 lines:
    let realSvgSize = sf.pictureWidth + sf.pictureHeight;
    let controlsScale = realSvgSize / sf.standardSvgSize

    let A = [785, 441];
    let V = [64, 462 ];
    let S = [207, 403];
    let P = [693, 213];
    let Q = [646.0, 168.0 ];

    let C;
    let RR;
    {
        const ww1 = A[0]-V[0];
        RR = ww1*ww1;
        const ww2 = A[1]-V[1];
        RR += ww2*ww2;
        RR = Math.sqrt( RR ) / 2;
        C = [ V[0] + ww1/2, V[1] + ww2/2, ];
    }

    sf.originX_onPicture = C[0]; //for model's axis x
    sf.originY_onPicture = C[1]; //for model's axis y

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2inn_scale = RR;

    sf.prop7R = 1;
    sf.prop7Center = [ 0, 0 ];
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
    sf.tForSagitta0 = 0.168;
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
    sf.ADDENDUM_NORM_BY_MIN = true;
    //calculation decoration and quality
    sf.BESIER_PIVOTS = 0; //5; //otherwise assumed 9 pivots
    //***************************************************************
    // \\// math model auxilaries
    //***************************************************************

    //***************************************************************
    // //\\ model comparison demo
    //      , even if no sf.SHOW_FORMULAS, do preserve this as
    //      a commented template,
    //***************************************************************
    sf.SHOW_FORMULAS = [
        //usually, bP is context of "plane-cureve-derivatives"  
        { label:'1/r⁵',
            fun:(bP) => { const r2 = bP.r2;  return 1/(r2*r2*bP.r);},
            //t// cssclass : 'tp-context tostroke',
        }, 
        { label:'1/r²',
            fun:(bP) => 1/bP.r2,
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
        estimatedForce,
        fQR,
        sagitta,
        orbit,
        proof,
        curvature,
        time,
        dtime,
        body,
        hidden,
        context,
        force,
        invalid,
        chord,
    } = fixedColors;

    ///does export topic colors
    sf.predefinedTopics = nspaste( {}, { //need deep copy
        force,
        curvature,
        curvatureCircle : [...curvature, 1],
        fQR,
        estimatedForce,
        sagitta,
        body,
        orbit,
        chord,
        invalid,
        proof,
        hidden,
        context,
        dtime,
        time,
        timearc : proof,
        APQ     : orbit,
    });
    //*************************************
    // \\// topic group colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    originalPoints.foldPoints = (new Array(200)).fill({}).map( fp => ({
        pcolor      : invalid,
        doPaintPname : false,
    }));

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
        },
        Q : {
            pos: Q,
            pcolor : proof,
            letterAngle : 225,
            letterRotRadius : 40,
            draggableX  : true,
            draggableY  : fconf.sappId === 'b1sec2prop7',
        },
        QtimeDecor : {
            undisplayAlways : true,
            //pos: will be as Q, 
            cssClass : 'tp-dtime',
            pcolor : dtime, //proof,
            fontSize : 30,
            letterAngle : 225,
            letterShift : [30,0],
            letterRotRadius : 180,
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
            pos: Q,
            pcolor : proof,
            letterAngle : -90,
        },
        L : {
            pcolor : curvature,
            letterAngle : -45,
        },
        A : {
            pos: A,
            pcolor : orbit,
            //letterAngle : -90,
            //undisplayAlways : true,
            //doPaintPname : false,
        },
        rrminus : {
            caption : 'Q-',
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
        },

        //col2
        Tcol2 : {
            caption : 'T',
            pcolor : curvature,
            letterAngle : -45,
        },
        Rcol2 : {
            ////for corollary2, second center of force
            caption : 'R',
            pcolor : curvature,
            letterAngle : -45,
            draggableX  : true,
            draggableY  : true,
        },
        Gcol2 : {
            caption : 'G',
            pcolor : curvature,
            letterAngle : -45,
        },
    });
    //*************************************
    // \\// original app points
    //*************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray =
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

        { 'ZQ' : { pcolor : body }, },
        { 'AV' : { pcolor : proof }, },
        { 'AP' : { pcolor : proof }, },
        { 'RL' : { pcolor : proof }, },
        { 'P,rrminus' : { pcolor : proof }, },
        { 'P,sagitta' : { pcolor : sagitta, vectorTipIx : 1 } },
        { 'Q,rrminus' : { pcolor : proof }, },

        //col2
        { 'Rcol2,P' : { pcolor : [150, 0, 150] }, },
        { 'Rcol2,Tcol2' : { pcolor : proof }, },
        { 'Tcol2,V' : { pcolor : proof }, },
        { 'Gcol2,S' : { pcolor : proof }, },
        { 'Gcol2,P' : { pcolor : proof }, },
        { 'S,nonSolvablePoint' : { pcolor : invalid }, },
    ];
    //*************************************
    // \\// original app lines
    //*************************************
}
})();
