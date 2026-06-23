(function(){
const {
        nspaste, hafa, haff, fconf, sf, tprepo, tpelect, stripp,
        CONST,  ssF, rg, stdMod,  ssD, gshapes,
      } = window.b$l.atree({ ssFList: {
        init_conf
}});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
return;


function init_conf (){
    sf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 630;
    sf.medHeight = 400;

    //to comply standard layout, one must add these 2 lines:
    let medsize = sf.medWidth + sf.medHeight;
    let medsizeScale = medsize / sf.medsize_standard

    let S = [117, 322 ];
    let P = [453, 177];
    let Y = [263,66];
    let A = [540, 338];

    sf.medposOfModOrigin_x = S[0]; //for model's axis x
    sf.medposOfModOrigin_y = S[1]; //for model's axis y

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = A[0] - S[0];
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
    //----------------------------
    // //\\ sconf.curve
    //----------------------------
    sf.curve = stripp({
        orbit_q_start: 0,
        orbit_q_end: 1,
        //diagramOrigin: sf.diagramOrigin,
    });
    //----------------------------
    // \\// sconf.curve
    //----------------------------
    sf.parQ = 0.250;
    //pos of P
    sf.rgPq = 0.270;

    //the law to be studied in given lemma:
    //fe: for 1/r^2, the assigment is
    //    sf.force_law = bP => 1/(bP.r2);
    //null means that program will calculated the law
    //based on dt -> 0:
    //sf.force_law = null;
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
    sf.FORCE_PARAM_IS_ALONG_CURVE = false;
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
    //***************************************************************
    sf.SHOW_FORMULAS = [
        //usually, bP is aka context of "plane-cureve-derivatives"
        { label : '1/r²',
          fun:(bP) => 1/bP.r2,
          //t// cssclass : 'tp-context tostroke etc',
        },
    ];
    //***************************************************************
    // \\// model comparison demo
    //***************************************************************

    //*************************************
    // //\\ elected colors,
    //*************************************
    ///does import topic colors from conf/lemma.conf.js
    const {
        force,
        estimatedForce,
        fQR,
        //displacement
        curvature,
        curvatureCircle,
        sagitta,
        distanceToCenter,

        borbit,
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
    } = tprepo;

    ///does export topic colors
    nspaste( tpelect, { //need deep copy
        force,
        estimatedForce,
        fQR,
        //t/displacement
        curvature,
        curvatureCircle,
        sagitta,
        distanceToCenter,

        borbit,
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

        timearc : time,
        APQ     : borbit,
    });
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ shapes
    //*************************************
    gshapes.splice( gshapes.length, 0,
    {
        rgn: 'foldPoints',
        cpivots: (new Array(200)).fill({}).map( fp => ({
            pcolor: [255,255,255,1],
            doPaintPname: false,
            singleTpClass: 'fold-point',
        })),
        //todm implement: this will remove code from
        //amode8captures,
        //flagcss: 'solvable_orbit',
        //flagcss: 'solvable_orbit-not-',
    },
    {
        kind: CURVE,
        rgn: 'borbit',
        cpivots: [
                A,
                [ 527,248 ],
                [ 485,203 ],
                //P,
                [ 396, 148 ],
                [300, 130], //near Q
                //for gaps test: [217,472],
                [217,132],

                [51,238 ],
                [51,238 ],
                [22,315],
            ].map( medpos => ({
                pos         : medpos,
                pcolor      : given,
                letterAngle : 45,
                draggableX  : true,
                draggableY  : true,
                doPaintPname : false,
            })),
        initShapes: (gshape, rgn)=>{
            //todm this should happen eaarlier, in expand-conf.js
            stdMod.init_lemma__p6patch();
            //does not create dynamic
            //rgShape.recreates__bodyq2xy(conf),
            //and does not create prametrized function
            //rgShape.bodyq2xy
            rg[rgn].bodyq2xy = ssD.bezio.fun;

            stdMod.init__orbit8graph( rgn );
            stdMod.init__curve_pivots_sliders();
            rg.P.q = sf.rgPq;
            rg.A.pos = rg[ rgn + '-0' ].pos;
        },
    },
    {
        isCurve: true,
        rgn: 'timearc',
        start_eval : 'rg.Q.q_minus',
        step_eval: '(rg.Q.q - rg.Q.q_minus ) / 100',
        stepsCount : 101,
        gshape2svg : (gshape)=> {
            gshape.fun = rg.borbit.bodyq2xy,
            ssF.gcurve2svg( gshape );
        },
        flagdo: 'solvable_orbit',
        flagcss: 'solvable_orbit',
    },
    {
        //curve from A to Q
        //todm this is a redundant step, graphArray is already
        //built and can be used
        isCurve: true,
        rgn: 'APQ',
        start: 0,
        step_eval: 'rg.Q.q / 100',
        stepsCount: 101,
        gshape2svg: (gshape)=> {
            gshape.fun = rg.borbit.bodyq2xy,
            ssF.gcurve2svg( gshape );
        },
        flagdo: 'solvable_orbit',
        flagcss: 'solvable_orbit',
    },
    {
        kind: 'not yet defined, until gshape2svg missed',
        rgn: 'curvatureCircle',
        cssClass: 'subessay--corollary3',
    }
    );
    //*************************************
    // \\// shapes
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    gshapes.splice( gshapes.length, 0,
    {
        kind: LINE,
        rgn: 'P,sagitta',
        pcolor : sagitta,
        vectorTipIx : 1,
        flagcss: 'solvable_orbit',
    },
    {
        rgn: 'Q,rrminus',
        pcolor : proof,
        flagcss: 'solvable_orbit',
    },
    {
        rgn:'SP', pcolor : distanceToCenter
    },
    {
        rgn:'PV',
        pcolor : curvature,
        cssClass: 'subessay--corollary3 subessay--corollary5',
    },
    {
        rgn: 'PR',
        pcolor : body,
        cssClass: 'subessay--corollary1',
    },
    {
        rgn: 'SY',
        pcolor : proof,
        cssClass: 'subessay--corollary5 subessay--corollary3',
    },
    {
        rgn: 'QR',
        pcolor : fQR,
        cssClass:
            'subessay--corollary3 subessay--corollary1 ' +
            'logic_phase-not-addendum',
    },
    {
        rgn: 'QP',
        pcolor: proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'SQ',
        pcolor: proof,
        cssClass: 'subessay--corollary1',
    },
    {
        rgn: 'QT',
        pcolor : fQR,
        cssClass: 'subessay--corollary1 subessay--corollary5',
    },
    {
        rgn: 'PC',
        pcolor : curvature,
        cssClass: 'subessay--corollary3',
    },
    {
        rgn: 'PY',
        pcolor : body,
        cssClass: 'subessay--corollary3 subessay--corollary5',
    },
    {
        rgn: 'PZ',
        pcolor : body,
        cssClass:
            'subessay--corollary1 ' +
            'subessay--corollary3 subessay--corollary5',
    },
    {
        rgn: 'P,rrminus',
        pcolor : proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'S,nonSolvablePoint',
        pcolor: invalid,
        undisplayAlways: true,
    },
    );
    //*************************************
    // \\// lines
    //*************************************}

    //*************************************
    // //\\ points
    //*************************************
    gshapes.push.apply( gshapes, [
    {
        kind: POINT,
        rgn: 'Q',
        pcolor : proof,
        letterAngle : 225,
        letterRotRadius : 40,
        draggableX  : true,
        draggableY  : true,
        flagcss: 'solvable_orbit',
        conditionalDrag:
            'logic_phase--proof logic_phase--corollary ' +
            'logic_phase--claim',
     },
     {
        rgn: 'S',
        pos: S,
        pcolor : force,
        letterAngle : -90,
        draggableX  : true,
        draggableY  : true,
        initialR    : 5,
     },
     {
        rgn: 'P',
        pos: P,
        pcolor : body,
        letterAngle : 70,
        draggableX  : true,
        draggableY  : true,
        initialR    : 5,
     },
     {
        rgn: 'rrminus',
        caption: 'Q-',
        pcolor: proof,
        letterAngle: 225,
        letterRotRadius: 40,
        flagcss: 'solvable_orbit',
        doPaintPname: false,
     },
     {
        rgn: 'sagitta',
        caption : 'I',
        pcolor : sagitta,
        letterAngle : 270,
        letterRotRadius : 35,
        doPaintPname : false,
     },
     {
        rgn: 'QtimeDecor',
        undisplayAlways : true,
        cssClass : 'tp-dtime',
        pcolor : dtime, //proof,
        fontSize : 20,
        letterAngle : 225,
        letterShift : [10,0],
        letterRotRadius : 40,
        flagcss: 'solvable_orbit',
        cssClass: 'logic_phase-not-claim',
     },
     {
         rgn: 'R',
         pcolor : fQR,
         letterAngle : 45,
         cssClass:
            'subessay--corollary1 subessay--corollary3 ' +
            'logic_phase-not-addendum',
      },
      {
        rgn: 'T',
        pos: [0,0],
        pcolor : proof,
        letterAngle : 180,
        cssClass: 'subessay--corollary1 subessay--corollary5',
      },
      {
         rgn: 'Z',
         pos: [111111,111111],
         pcolor : body,
         letterAngle : 45,
         cssClass: 'subessay--corollary1',
      },
      {
         rgn: 'V',
         pos: S,
         pcolor : curvature,
         letterAngle : -45,
         cssClass: 'subessay--corollary3 subessay--corollary5',
      },
      //center of instant curvature circle
      {
         rgn: 'C',
         pos: [0,0], //will be calculated
         caption : 'Rc',
         pcolor : curvature,
         letterAngle : -45,
         cssClass: 'subessay--corollary3',
      },
      {
         rgn: 'Y',
         pcolor : proof,
         letterAngle : 80,
         cssClass: 'subessay--corollary3 subessay--corollary5',
      },
      {
         rgn: 'A',
         pos: A,
         pcolor : given,
         cssClass: 'logic_phase--dummy',
      },
      {
         rgn: 'nonSolvablePoint' ,
         pos: [0,0], //will be calculated
         caption : 'Orbits are disconnected where curve`s' +
                   'tangent passes through center of force.',
         fontSize : '25',
         undisplayAlways : true,
         pcolor : invalid,
         letterAngle : 0,
      }
    ]);
    //*************************************
    // \\// points
    //*************************************
}
})();