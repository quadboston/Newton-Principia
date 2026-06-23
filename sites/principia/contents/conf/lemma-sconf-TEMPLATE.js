(function(){
const {
        nspaste, hafa, haff, fconf, sf, tprepo, ssF, stripp,
        CONST, rg, stdMod, tpelect, originalPoints, ssD, gshapes,
      } = window.b$l.atree({ ssFList: { init_conf } });
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
return;


function init_conf (){
    //navigation
    //sf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;

    //====================================================
    // //\\ user scenarios
    //====================================================
    //====================================================
    // \\// user scenarios
    //====================================================

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 690;
    sf.medHeight = 836;

    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sf.medsize_standard

    var F = [ 492, 565 ];
    var S = F;
    sf.diagramOrigin = [ 0, 0 ];

    sf.medposOfModOrigin_x = F[0]; //for model's axis x
    sf.medposOfModOrigin_y = F[1]; //for model's axis y
    sf.mod2med = 145;
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
    sf.allLettersAreHidden = true;
    sf.default_tp_lightness = 30;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    //sets model offset
    op.rgn = 'borbit';
    op.mainAxisAngle_initial = 0;
    op.mainAxisAngle = op.mainAxisAngle_initial;
    op.delta_v_increase_LIMIT = 1.5;

    //sets cinematics
    var Kepler_g        = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
    op.Kepler_g         = Kepler_g;
    op.Kepler_gInitial  = Kepler_g;
    fconf.effId = fconf.sappId;

    //conic pars
    op.initialEccentricity = 1.365; //hyperbola
    op.latusInitial = 0.90;
    var PparQ = 0.49 * Math.PI;
    //decorations
    op.sagittaDelta_q_initial = 1;
    sf.Fi_distance = 3;

    op.PparQ_initial        = PparQ;
    op.PparQ_initial_essay  = PparQ;
    op.sagittaDelta_q       = op.sagittaDelta_q_initial;
    op.sagittaDelta_q_instant = 0.001;

    //-----------------------------------------------------
    // //\\ sets Kepler_v
    //-----------------------------------------------------
    op.latus = op.latusInitial;
    stdMod.establishesEccentricity( op.initialEccentricity );
    var { Kepler_v, cosOmega, om } =
        mat.conics.innerPars2innerPars({
            lat         : op.latusInitial,
            fi          : PparQ,
            e           : op.initialEccentricity,
            Kepler_g    : op.Kepler_g,
    });
    //saves initial speed
    op.cosOmega             = cosOmega;
    op.om                   = om;
    op.cosOmega_initial     = cosOmega;
    op.om_initial           = om;
    op.Kepler_v_initial     = Kepler_v;
    op.Kepler_v             = op.Kepler_v_initial;
    //-----------------------------------------------------
    // \\// sets Kepler_v
    //-----------------------------------------------------
    //******************************************
    // \\// model principals parameters
    //******************************************

    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
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
    // //\\ elected colors,
    //*************************************
    ///does import topic colors
    const {
        force,
        curvature,

        body,
        borbit,

        given,
        proof,
        result,

        hidden,
        context,
        invalid,
        shadow,
    } = tprepo;
    const attention = [200,  200,  0,      1];

    ///does export topic colors
    nspaste( tpelect, { //need deep copy
        force,
        curvature,
        given,
        proof,
        result,
        hidden,
        context,
        body,
        borbit,
        borbitdq : given,
        shadow,
        orbitarea : [0,     150, 0,  0.001, 0.5],
        instanttriangle : [0, 150, 200, 0.001, 0.5 ],
    });
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    //*************************************
    // //\\ bricks for originalPoints
    //*************************************
    //*************************************
    // \\// bricks for originalPoints
    //*************************************
    //-------------------------------------
    // //\\ prepares points
    //-------------------------------------
    //-------------------------------------
    // \\// prepares points
    //-------------------------------------

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
            /*
            ///solution for dynamic bodyq2xy
            create_bodyq2xy_functions: (rgShape) => {
                rgShape.recreates__bodyq2xy = function (cconf){ const {
                        ellipseA, ellipseB, diagramOrigin, orbit_q_start
                    } = stripp( cconf );
                    rgShape.bodyq2xy = function ( q ){
                        q += orbit_q_start;
                        return [
                            ellipseA * Math.cos( q ) + diagramOrigin[0],
                            ellipseB * Math.sin( q ) + diagramOrigin[1],
                        ];
                    }
                }
            },
            */
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
        //t/ X : {
        //t/    cssClass : 'tp-dtime',
        //t/    cssClass: 'aspect--addendum',
        //t/    pos: S,
        //t/    pcolor : force,
        //t/    letterAngle : -90,
        //t/    letterRotRadius : 40,
        //t/    draggableX  : true,
        //t/    draggableY  : fconf.sappId === 'b1sec2prop7',
        //t/    hideD8Dpoint : true,
        //      very powerful dynamic option:
        //t/    conditionalDrag : 'logic_phase--proof' +
        //t/                      ' aspect--addendum',
        //t/    initialR    : 5 * medsizeScale,
        //t/    fontSize : 30,
        //t/    undisplayAlways : true,
        //t/    doPaintPname : false,
        //t/},
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
