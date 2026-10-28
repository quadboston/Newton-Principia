//todm graph is still negative whey force is repelling
{const{
    sn, apush, nspaste, mat, mcurve, fconf, sf, CONST, stdMod,
    tprepo, tpelect, amode, rg, ssF, gshapes,
}=window.b$l.atree();

const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const op = sn( 'orbitParameters', sf );
const tr = tprepo;
const el = tpelect;


ssF.init_conf=function(){
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
    //      look at c onf/c onf.js or especally at c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.default_tp_lightness = 30;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    //sets model offset
    op.rgn = 'borbit';
    op.dqName = 'borbitdq';

    op.mainAxisAngle_initial = 0;
    op.mainAxisAngle = op.mainAxisAngle_initial;
    op.delta_v_increase_LIMIT = 1.5;

    //sets cinematics
    var Kepler_g        = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
    op.Kepler_g         = Kepler_g;
    op.Kepler_gInitial  = Kepler_g;

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
    // \\// model principals parameters
    //******************************************

    //************************************************
    // //\\ elected colors,
    //      does import topic colors to elected colors
    //      from c onf/lemma.c onf.js
    //************************************************
    [
        'force',
        'curvature',
        'displacement',
        'given',
        'proof',
        'result',
        'hidden',
        'context',
        'body',
        'borbit',
        'borbitdq',
        'shadow',
        'dimShadow',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    //************************************************
    // \\// elected colors,
    //************************************************

    //*************************************
    // //\\ shapes
    //*************************************
    apush( gshapes, [
    {
        kind: POINT,
        isAngle: true,
        vertex_id: 'phi',
        rgn: 'phi-name',
        vertexTwin_rgn: 'S',
        CDString: 'S,Fi',
        angleStart: 0,
        pcolor: el.dimShadow,
        cssClass: 'aspect--addendum tofill',
        ANGLE_SIZE: 1.5,
        angleCaption: 'φ',
    },
    {
        kind: CURVE,
        rgn : 'borbit',
        initShapes: ()=>{
            stdMod.init__borbitTripleShapes( op );
            let {
                rr,
                projectionOfCenterOnTangent,
            } = mcurve.planeCurveDerivatives(
                rg.borbit.dyn_q2xy,
                op.PparQ_initial,
                rg.S.pos,
            );
            nspaste( rg.P.pos, rr );
            nspaste( rg.Y.pos, projectionOfCenterOnTangent );
            ////establishes rg.omegaHandle.pos
            let excess = -0.2;
            rg.omegaHandle.initialPos =
                mat.sm( 1+excess, rg.Y.pos, -excess, rg.P.pos );
            nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );

            //was in init_app
            rg.P.q = op.PparQ_initial;
            //massive sliders creation which stems from
            //borbit, initShapes
            stdMod.completesSlidersCreation(); //in-diagram sliders
            stdMod.establishesEccentricity( op.eccentricity );
            //==================================================
            // //\\ decoration graph
            //==================================================
            stdMod.graphFW_lemma = stdMod.creates_lemma_graph_fw({
                digramParentDom$:stdMod.legendRoot$
            });
            const graphArray = sn( 'graphArray', stdMod, [] );
            stdMod.graphFW_lemma.fw.content.pix2values = graphArray;
            //==================================================
            // \\// decoration graph
            //==================================================
        },
        resetsLesson: (gshape, rgn)=>{
            const { logic_phase, aspect, subessay } = amode;
            op.mainAxisAngle = op.mainAxisAngle_initial;
            // //\\ "draws" conics and P
            //1
            op.latus         = op.latusInitial;
            //2
            stdMod.establishesEccentricity( op.initialEccentricity )
            //3
            rg.P.q      = op.PparQ_initial;
            //4
            nspaste( rg.P.pos, rg.borbit.dyn_q2xy( op.PparQ_initial ));
            // \\// "draws" conics and P

            rg.S.pos[0] = 0;
            rg.S.pos[1] = 0;

            rg.P.posInitialUnitVector = mat.unitVector( rg.P.pos );
            op.Kepler_g = op.Kepler_gInitial;
            op.Kepler_v = op.Kepler_v_initial; //this supposed to be redundant
            op.Dt  = op.Dt0;
            nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );
            op.sagittaDelta_q = op.sagittaDelta_q_initial;

            nspaste( rg.Fi.pos, [
                sf.Fi_distance * Math.cos( rg.P.q ),
                sf.Fi_distance * Math.sin( rg.P.q ),
            ]);
            rg.f.caption = '';
        },
        //todo apparently needs implementation
        cssClass: 'subessay--off-comparing-proof-steps',
      },
    ]);
    //*************************************
    // \\// shapes
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
    //-----------------------------------------
    // //\\ Book's prop. 11
    //-----------------------------------------
    {
        kind: LINE,
        rgn: 'Qx',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'Px',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        //todm: proliferation
        rgn: 'EP',
        pcolor: el.result,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'ES',
        pcolor: el.result,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'EI',
        pcolor : el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'PE',
        pcolor: el.proof,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'EC',
        pcolor: el.proof,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'PH',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
        vectorTipIx: 0,
    },
    {
        rgn: 'HI',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'BH',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'PI',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    //-----------------------------------------
    // \\// Book's prop. 11
    //-----------------------------------------
    {
        rgn: 'PC',
        pcolor : el.proof,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'S,Fi',
        pcolor : el.shadow
    },
    {
        rgn: 'ST',
        pcolor: el.proof,
        cssClass: 'logic_phase--proof',
    },
   {
        rgn: 'SY',
        pcolor:  el.proof,
        captionShiftNorm : -28,
        cssClass: 'subessay--none',
   },
   {
        rgn: 'PY',
        pcolor: el.body,
        cssClass: 'subessay--none',
   },
   {
        rgn: 'CS',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
   },
   {
        rgn: 'CH',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
   },
   {
        rgn: 'P,Zminus',
        pcolor: el.body,
        cssClass: 'subessay--solution',
   },
   {
       rgn: 'P,omegaHandle',
       pcolor: el.context,
       cssClass: 'logic_phase--none',
   },
   {
       rgn: 'PZ',
       pcolor: el.body,
       cssClass: 'subessay--solution',
   },
   {
     rgn: 'ZR',
     pcolor: el.body,
     cssClass: 'subessay--solution',
   },
   {
     rgn: 'PR',
     pcolor: el.body, 'stroke-width' : 2,
     cssClass: 'subessay--solution',
     captionShiftNorm: -18,
   },
   {
       rgn: 'P,vb',
       pcolor : el.body, 'stroke-width' : 2,
       captionShiftNorm: -18,
       vectorTipIx: 1,
       cssClass: 'aspect--none',
    },
    {
        rgn: 'QR',
        pcolor: el.displacement,
        cssClass: 'subessay--solution',
     },
     {
         rgn: 'QT',
         pcolor: el.proof,
         cssClass: 'subessay--solution',
     },
    {
        rgn: 'PT',
        pcolor: el.proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'DK',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'DS',
        pcolor: el.proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'DH',
        pcolor: el.proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'PM',
        pcolor: el.body,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'SM',
        pcolor: el.body,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'NS',
        pcolor: el.proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'SA',
        pcolor : el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'NP',
        pcolor: el.proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'GP',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'Qv',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'Pv',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'Tv',
        pcolor: el.proof,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'xv',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
     },
     {
         rgn: 'Tx',
         pcolor: el.proof,
         cssClass: 'subessay--solution',
     },
     {
         rgn: 'Gv',
         pcolor : el.proof,
         cssClass: 'subessay--solution',
     },
     {
         rgn: 'PF',
         pcolor: el.proof,
         cssClass: 'subessay--solution',
     },
     {
         rgn: 'A,AA',
         pcolor : el.proof,
         cssClass: 'logic_phase--none',
     },
     {
         rgn: 'B,BB',
         pcolor: el.proof,
         cssClass: 'logic_phase--none'
     },
     {
         rgn: 'AT',
         pcolor: el.proof,
         cssClass: 'subessay--solution',
     },
     {
         rgn: 'CA',
         pcolor: el.proof,
         cssClass: 'subessay--solution',
     },
     {
         rgn: 'CB',
         pcolor: el.proof,
         cssClass: 'subessay--solution',
     },
     {
         rgn: 'L,LL',
         pcolor: el.borbit,
         cssClass: 'subessay--solution',
         captionShiftNorm : 22,
         lposYSugar : 3
     },
     {
         rgn: 'SL',
         pcolor: el.borbit,
         cssClass: 'logic_phase--none'
     },
     {
         rgn: 'CD',
         pcolor: el.proof,
         cssClass: 'subessay--solution',
     },
        /*
        { rgn: 'PO : { pcolor : el.proof,
                    cssClass: 'logic_phase--proof',
        },
        */
        /*
        { rgn: 'FO : { pcolor : el.proof,
                    cssClass: 'subessay--solution',
        },
        */
     {
         rgn: 'SP',
         pcolor: el.body,
         vectorTipIx: 1,
         cssClass: 'subessay--solution',
     },
    //Book's "another solution"
    {
        rgn: 'Tu',
        pcolor: el.proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'u,VV',
        pcolor: el.proof,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'uP',
        pcolor: el.proof,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'PQ',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'P,VV',
        pcolor: el.proof,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'ZetaStart,ZetaEnd',
        pcolor: el.borbit,
        cssClass: 'logic_phase--proof',
    },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    //-----------------------------------------
    // //\\ Book's prop. 11
    //-----------------------------------------
    {
        kind: POINT,
        rgn: 'E',
        pcolor: el.proof,
        letterRotRadius: 20,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'H',
        pcolor: el.proof,
        letterAngle: -90,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'I',
        pcolor: el.proof,
        letterRotRadius: 20,
        cssClass: 'subessay--solution',
    },
    //-----------------------------------------
    // \\// Book's prop. 11
    //-----------------------------------------
    {
        rgn: 'B',
        letterRotRadius: 20,
        pcolor: el.borbit,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'BB',
        letterAngle: 90,
        undisplayAlways: true,
        doPaintPname: false,
        pcolor: el.borbit,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'L',
        //no need: will be dynamic: caption : 'mmm',
        //draggableX  : true,
        //draggableY  : true,
        undisplayAlways : true,
        doPaintPname : false,
    },
    {
        rgn: 'LL',
        undisplayAlways : true,
        doPaintPname : false,
    },
    {
        rgn: 'A',
        pcolor: el.borbit,
        letterRotRadius: 20,
        letterAngle: -90,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'AA',
        pcolor: el.borbit,
        undisplayAlways: true,
        doPaintPname: false,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'D',
        pcolor: el.proof,
        letterRotRadius: 20,
        //letterAngle : 135,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'K',
        pcolor: el.proof,
        letterRotRadius: 20,
        letterAngle: -60,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'M',
        pcolor: el.proof,
        letterRotRadius: 20,
        letterAngle: -45,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'N',
        pcolor: el.proof,
        letterRotRadius: 20,
        letterAngle: -45,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'G',
        pcolor: el.proof,
        letterRotRadius: 20,
        letterAngle : -45,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'T',
        pcolor: el.proof,
        letterRotRadius: 20,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'R',
        pcolor: el.proof,
        letterAngle: -45,
        letterRotRadius : 20,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'Y',
        pcolor: el.proof,
        letterAngle: 45,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'vb',
        //speed of the body
        caption: '',
        pcolor : el.proof,
        letterAngle : 135,
        letterRotRadius : 20,
        draggableX  : false,
        draggableY  : false,
        cssClass: 'aspect--none',
    },
    {
        rgn: 'omegaHandle',
        caption: 'ω',
        pcolor: el.shadow,
        letterAngle: 90,
        letterRotRadius: 17,
        draggableX: false,
        draggableY: false,
        fontSize: 20,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'f',
        caption: '𝛾',
        pcolor: el.force,
        letterAngle: 90,
        letterRotRadius: 17,
        draggableX: false,
        draggableY: false,
        fontSize: 20,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'Z',
        pcolor: el.body,
        letterAngle: 45,
        undisplayAlways: true,
        doPaintPname: false,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'Zminus',
        caption: 'Z',
        pcolor: el.body,
        letterAngle: 145,
        letterRotRadius: 20,
        doPaintPname: true,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'v',
        caption: '𝑣',
        pcolor: el.proof,
        letterAngle: -45,
        letterRotRadius : 15,
        cssClass: 'subessay--solution',
    },
    {
        //F is possibly a tip of diameter
        //conjugate to Center-Body diameter
        rgn: 'F',
        pcolor: el.proof,
        letterRotRadius: 20,
        letterAngle: 135,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'VV',
        caption: 'V',
        pcolor: el.proof,
        letterAngle: -45,
        cssClass: 'logic_phase--none',
    },
    {
        //orbit's symmetry center
        rgn: 'C',
        pcolor: el.borbit,
        letterAngle: -45,
        cssClass: 'logic_phase--proof',
    },

    //----------------------------------------
    // //\\ Prop. 10 Book's "another solution"
    //----------------------------------------
    {
        rgn: 'u',
        caption: '𝑢',
        pcolor: el.proof,
        letterAngle: -45,
        letterRotRadius: 15,
        cssClass: 'logic_phase--none',
    },
    //----------------------------------------
    // \\// Prop. 10 Book's "another solution"
    //----------------------------------------
    //----------------------------------------
    // //\\ Prop. 11
    //----------------------------------------
    {
        rgn: 'x',
        caption: "𝑥",
        pcolor: el.proof,
        letterAngle : -45,
        letterRotRadius: 20,
        cssClass: 'subessay--solution',
    },
    //----------------------------------------
    // \\// Prop. 11
    //----------------------------------------
    //---------------------------------------
    // //\\ draggable points
    //---------------------------------------
    {
        rgn: 'S',
        pcolor: el.result,
        letterAngle: -115,
        letterRotRadius: 20,
    },
    {
        rgn: 'P',
        pcolor: el.body,
        letterAngle: 120,
    },
    {
        rgn: 'Fi',
        caption: "φ",
        pcolor: el.shadow, //body,
        letterAngle: 120,
        draggableX: true,
        draggableY: true,
    },
    {
        rgn: 'Q',
        pcolor: el.proof,
        letterAngle: 225,
        letterRotRadius: 20,
        draggableX: true,
        draggableY: true,
        cssClass: 'subessay--solution',
    },
    // //\\ eccentricity slider
    {
        rgn: 'Zeta',
        caption: 'eccentricity, e',
        medpos: [ sf.medWidth * 0.5, sf.medHeight * 0.92 ],
        pcolor: el.borbit,
        letterAngle: 90,
        letterRotRadius: 20,
        draggableX: true,
        unscalable: true,
        undisplayAlways: false,
        doPaintPname: true,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'ZetaCaption',
        medpos: [ sf.medWidth * 0.5, sf.medHeight * 0.97 ],
        pcolor: el.borbit,
        letterAngle: 90,
        letterRotRadius: 20,
        unscalable: true,
        undisplayAlways: true,
        doPaintPname: true,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'ZetaStart',
        medpos: [ sf.medWidth * 0.1, sf.medHeight * 0.92 ],
        pcolor: el.borbit,
        unscalable: true,
        undisplayAlways: true,
        doPaintPname: false,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'ZetaEnd',
        medpos: [ sf.medWidth * 0.9, sf.medHeight * 0.92 ],
        pcolor: el.borbit,
        undisplayAlways: true,
        doPaintPname: false,
        unscalable: true,
        cssClass: 'logic_phase--proof',
    },
    //---------------------------------------
    // \\// eccentricity slider
    // \\// draggable points
    //---------------------------------------
    ]);
    //*************************************
    // \\// points
    //*************************************
}}