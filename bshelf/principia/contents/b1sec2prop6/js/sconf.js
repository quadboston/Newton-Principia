(function(){
const {
        nspaste, hafa, haff, fconf, sf, tprepo, tpelect, stripp,
        bezier, CONST,  ssF, rg, stdMod,  ssD, gshapes, apush,
      } = window.b$l.atree({ ssFList: {
        init_conf
}});
const el = tpelect;
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
return;


function init_conf (){
    sf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
    sf.DO_THROTTLE_MEDIA_UPCREATE = true;

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
    //      look at c onf/c onf.js or especally at c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //this works for graph, not for curve: sf.nonhover_width   = 10;
    sf.nonhover_width   = 4;
    sf.hover_width   = 10;
    //***************************************************************
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
    sf.Q_STEPS = 2000;
    sf.TIME_STEPS = 2000;
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
    //      does import topic colors to 
    //      elected colors from
    //      c onf/lemma.c onf.js
    //*************************************
    [
        'force',
        'estimatedForce',
        'fQR',
        'curvature',
        'curvatureCircle',
        'sagitta',
        'distanceToCenter',

        'borbit',
        'body',
        'distance',
        'chord',

        'time',
        'dtime',

        'given',
        'proof',
        'result',

        'hidden',
        'context',
        'invalid',
        'shadow',
        'attention',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    el.timearc = nspaste( tprepo.time );
    el.APQ = nspaste( tprepo.borbit );
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ shapes
    //*************************************
    apush( gshapes, [
    {
        kind: CURVE,
        rgn: 'foldPoints',
        cpivots: (new Array(200)).fill({}).map( fp => ({
            pcolor: el.attention,
            initialR: 1,
            doPaintPname: false,
        })),
        //todm implement: this will remove code from
        //amode8captures,
        //flcs: 'solvable_orbit',
        //flcs: 'flcs--off-solvable_orbit',
    },
    {
        kind: CURVE,
        rgn: 'borbit',
        cssClass: 'hover-width',
        cpivots: [
            [540,341],
            [535,218],
            [485,179],
            [396,113],
            [300,127],
            [217,45],
            [51,211],
            [44,216],
            [22,314],
        ].map( medpos => ({
            pos         : medpos,
            pcolor      : el.given,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname : false,
        })),
        initShapes: (gshape, rgn)=>{
            let cps = gshape.cpivots;
            let pivots_modelPos = cps.map( (cp,cpix) => {
                const rgPivot = rg[ rgn + '-' + cpix ];
                //sets up besier curve parameter:
                rgPivot.q = cpix / (cps.length-1);
                //model's rgPivot.pos is already done in "extender",
                //this shoudl be
                //return rgPivot.pos;
                //but not yet programmed in other code,
                return [ rgPivot.pos[0], rgPivot.pos[1] ];
            });
            //generates framework:
            const bezio = ssD.bezio =
                bezier.preparesOptimizedBezier( pivots_modelPos );
            bezio.pivotsPos = pivots_modelPos;
            ssD.initialPivots = nspaste( pivots_modelPos );
            //fixes small pivots and curve displacements,
            //todm why do they exist in the first place?
            stdMod.bp2cp();

            rg[rgn].bodyq2xy = ssD.bezio.fun;
            stdMod.init__orbit8graph( rgn );
            stdMod.init__curve_pivots_sliders();
            rg.P.q = sf.rgPq;
            rg.A.pos = rg[ rgn + '-0' ].pos;
        },
    },
    {
        kind: CURVE,
        rgn: 'timearc',
        start_eval : 'rg.Q.q_minus',
        step_eval: '(rg.Q.q - rg.Q.q_minus ) / 100',
        stepsCount : 101,
        gshape2svg : (gshape)=> {
            gshape.fun = rg.borbit.bodyq2xy;
            ssF.gcurve2svg( gshape );
        },
        fldo: 'solvable_orbit',
        cssClass: 'flcs--solvable_orbit hover-width',
        //low precedence svg-attribute style,
        //overriden with tp hover-width
        //strokeWidth: 33,
    },
    {
        //curve from A to Q
        //todm this is a redundant step, graphArray is already
        //built and can be used
        kind: CURVE,
        rgn: 'APQ',
        start: 0,
        step_eval: 'rg.Q.q / 100',
        stepsCount: 101,
        gshape2svg: (gshape)=> {
            gshape.fun = rg.borbit.bodyq2xy,
            ssF.gcurve2svg( gshape );
        },
        fldo: 'solvable_orbit',
        cssClass: 'flcs--valid-p',
    },
    {
        kind: 'not yet defined, until gshape2svg missed',
        rgn: 'curvatureCircle',
        cssClass: 'subessay--corollary3',
    }
    ]);
    //*************************************
    // \\// shapes
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
    {
        kind: LINE,
        rgn: 'P,sagitta',
        pcolor : el.sagitta,
        vectorTipIx : 1,
        cssClass: 'flcs--off-valid-p',
    },
    {
        rgn: 'Q,rrminus',
        pcolor : el.proof,
        cssClass: 'flcs--off-valid-p',
    },
    {
        rgn:'SP', pcolor : el.distanceToCenter
    },
    {
        rgn:'PV',
        pcolor : el.curvature,
        cssClass: 'subessay--corollary3 subessay--corollary5',
    },
    {
        rgn: 'PR',
        pcolor : el.body,
        cssClass: 'subessay--corollary1',
    },
    {
        rgn: 'SY',
        pcolor : el.proof,
        cssClass: 'subessay--corollary5 subessay--corollary3',
    },
    {
        rgn: 'QR',
        pcolor : el.fQR,
        cssClass:
            'subessay--corollary3 subessay--corollary1 ' +
            'logic_phase--off-addendum',
    },
    {
        rgn: 'QP',
        pcolor: el.proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'SQ',
        pcolor: el.proof,
        cssClass: 'subessay--corollary1',
    },
    {
        rgn: 'QT',
        pcolor : el.fQR,
        cssClass: 'subessay--corollary1 subessay--corollary5',
    },
    {
        rgn: 'PC',
        pcolor : el.curvature,
        cssClass: 'subessay--corollary3',
    },
    {
        rgn: 'PY',
        pcolor : el.body,
        cssClass: 'subessay--corollary3 subessay--corollary5',
    },
    {
        rgn: 'PZ',
        pcolor : el.body,
        cssClass:
            'subessay--corollary1 ' +
            'subessay--corollary3 subessay--corollary5',
    },
    {
        rgn: 'P,rrminus',
        pcolor : el.proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'S,nonSolvablePoint',
        pcolor: el.attention,
        undisplayAlways: true,
    },
    ]);
    //*************************************
    // \\// lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    {
        kind: POINT,
        rgn: 'Q',
        pcolor : el.proof,
        letterAngle : 225,
        letterRotRadius : 40,
        draggableX  : true,
        draggableY  : true,
        cssClass: 'flcs--solvable_orbit',
        conditionalDrag:
            'logic_phase--proof logic_phase--corollary ' +
            'logic_phase--claim',
     },
     {
        rgn: 'S',
        pos: S,
        pcolor : el.force,
        letterAngle: -90,
        draggableX: true,
        draggableY: true,
        initialR: 5,
        initShapes: (gshape, rgn)=>{
            rg[rgn].DRAGGEE_HALF_SIZE = 15;
            rg[rgn].acceptPos = newPos => {
                //does this for decorational purposes
                rg.borbit.rebuilds_orbit( ssD.Dt );
                //this permits an orbitrary move
                return true;
            }
        }
     },
     {
        rgn: 'P',
        pcolor : el.body,
        letterAngle : 70,
        draggableX  : true,
        draggableY  : true,
        initialR    : 5,
     },
     {
        rgn: 'rrminus',
        caption: 'Q-',
        pcolor: el.proof,
        letterAngle: 225,
        letterRotRadius: 40,
        cssClass: 'flcs--solvable_orbit',
        doPaintPname: false,
     },
     {
        rgn: 'sagitta',
        caption : 'I',
        pcolor : el.sagitta,
        letterAngle : 270,
        letterRotRadius : 35,
        doPaintPname : false,
        cssClass: 'flcs--off-valid-p',
     },
     {
        rgn: 'QtimeDecor',
        undisplayAlways : true,
        pcolor : el.dtime,
        fontSize : 20,
        letterAngle : 225,
        letterShift : [10,0],
        letterRotRadius : 40,
        cssClass: 'tp-dtime flcs--solvable_orbit ' +
            'logic_phase--off-claim',
     },
     {
         rgn: 'R',
         pcolor : el.fQR,
         letterAngle : 45,
         cssClass:
            'subessay--corollary1 subessay--corollary3 ' +
            'logic_phase--off-addendum',
      },
      {
        rgn: 'T',
        pos: [0,0],
        pcolor : el.proof,
        letterAngle : 180,
        cssClass: 'subessay--corollary1 subessay--corollary5',
      },
      {
         rgn: 'Z',
         pos: [111111,111111],
         pcolor : el.body,
         letterAngle : 45,
         cssClass: 'subessay--corollary1',
      },
      {
         rgn: 'V',
         pos: S,
         pcolor : el.curvature,
         letterAngle : -45,
         cssClass: 'subessay--corollary3 subessay--corollary5',
      },
      //center of instant curvature circle
      {
         rgn: 'C',
         pos: [0,0], //will be calculated
         caption : 'Rc',
         pcolor : el.curvature,
         letterAngle : -45,
         cssClass: 'subessay--corollary3',
      },
      {
         rgn: 'Y',
         pcolor : el.proof,
         letterAngle : 80,
         cssClass: 'subessay--corollary3 subessay--corollary5',
      },
      {
         rgn: 'A',
         pos: A,
         pcolor : el.given,
         cssClass: 'logic_phase--dummy',
      },
      {
         rgn: 'nonSolvablePoint' ,
         pos: [0,0], //will be calculated
         //caption : '<text><tspan>Orbits are disconnected where curve`s</tspan>' +
         //          '<tspan>tangent passes through center of force.</tspan></text>',
         fontSize : '25',
         undisplayAlways : true,
         pcolor: el.attention,
         letterAngle : 0,
         captionConf : [
            {
                caption: 'Orbits are disconnected where curve`s',
                x:0, //in font size units:
                y:0, //in font size units:
            },
            {
                caption: 'tangent passes through center of force.',
                x:0,
                y:0.7,
            }
         ],
      }
    ]);
    //*************************************
    // \\// points
    //*************************************
}
})();
