{
const { sn, nspaste, mat, fconf, sf, tprepo, tpelect,
        gshapes, apush, rg, stdMod, ssF, CONST,
      } = window.b$l.atree({ ssFList : { init_conf } });
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const op = sn( 'orbitParameters', sf );
const el = tpelect;

function init_conf(){
    //*****************************************************
    // //\\ original picture dimensions for svg scene
    //*****************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 884;
    sf.medHeight = 733;

    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sf.medsize_standard

    var F = [ 160, 410 ];
    var S = F;
    sf.diagramOrigin = [ 0, 0 ];

    sf.medposOfModOrigin_x = F[0]; //for model's axis x
    sf.medposOfModOrigin_y = F[1]; //for model's axis y
    sf.mod2med = 260;
    //*****************************************************
    // \\// original picture dimensions for svg scene
    //*****************************************************

    //*****************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at c onf/c onf.js or especally at
    //      c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //*****************************************************
    sf.default_tp_lightness = 30;
    //*****************************************************
    // \\// GUI cosmetics
    //*****************************************************

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
    fconf.effId = 'prop_from_14_to_17';  //to 15 only

    op.initialEccentricity = fconf.sappId === 'b1sec3prop16' ? 0.67 : 0.68;
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    op.latusInitial = 0.83;
    var PparQ = ( fconf.sappId === 'b1sec3prop16' ? 0.14 : 0.07 ) * Math.PI;
    {
        let sag_q = fconf.sappId === 'b1sec3prop16' ?
            //0.2 :
            0.4 :
            //0.19;
            0.62;
        op.sagittaDelta_q_initial     = sag_q;
        op.Dt0 = sag_q * 2.5;
    }
    op.Dt = op.Dt0;
    op.delta_t_LIMIT = op.Dt0 * 1.5;
    sf.Fi_distance = 1.8;

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
        'attention',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    //************************************************
    // \\// elected colors,
    //************************************************

    //*************************************
    // //\\ shapes
    //*************************************
    apush( gshapes, [
        {
            kind: ANGLE,
            isAngle : true,
            vertex_id : 'vertex-phi',
            rgn : 'phi',
            vertexTwin_rgn: 'S',
            angleCaption: 'φ',
            pcolor: el.dimShadow,
            ABString: 'S,Fi',
            CDString: 'SP',
            cssClass: 'aspect--addendum tofill',
        },
        {
            kind: CURVE,
            rgn : 'borbit',
            initShapes: ()=>{
                stdMod.init__borbitTripleShapes(op);
                //was in init_app
                rg.P.q = op.PparQ_initial;
                stdMod.completesSlidersCreation(); //in-diagram sliders
                stdMod.establishesEccentricity(
                    sf.orbitParameters.eccentricity );
            },
            //todm apparently needs implementation
            //cssClass: 'subessay--off-comparing-proof-steps',
        },
    ]);
    //*************************************
    // \\// shapes
    //*************************************


    //*************************************
    // //\\ original app lines
    //*************************************
    apush( gshapes, [
    //-----------------------------------------
    // //\\ Book's prop. 11
    //-----------------------------------------
    {
        kind: LINE,
        rgn: 'Qx', pcolor: el.proof
    },
    { rgn: 'Px', pcolor: el.proof },
    //todm: proliferation
    { rgn: 'EP', pcolor: el.proof },
    { rgn: 'PE', pcolor: el.proof },
    { rgn: 'ES', pcolor: el.proof },
    { rgn: 'EI', pcolor: el.proof },
    //poss rid:
    { rgn: 'EO', pcolor: el.proof },
    { rgn: 'EC', pcolor: el.proof },
    { rgn: 'PH',
                pcolor: el.proof,
                vectorTipIx : 0,
    },
    //poss rid:
    { rgn: 'PK', pcolor: el.attention },
    { rgn: 'DK', pcolor: el.attention },
    { rgn: 'SK', pcolor: el.proof },
    { rgn: 'HI', pcolor: el.proof },
    { rgn: 'BH', pcolor: el.proof },
    //{ OS : { pcolor: el.proof }, },
    { rgn: 'OH', pcolor: el.proof }, //poss rid
    { rgn: 'PI', pcolor: el.proof },
    //-----------------------------------------
    // \\// Book's prop. 11
    //-----------------------------------------
    { rgn: 'PC', pcolor: el.proof },
    //{ rgn: 'S,Fi', pcolor: el.shadow },
    { rgn: 'Q,Fi', pcolor: el.shadow },
    { rgn: 'ST', pcolor: el.proof, },
    { rgn: 'SY', pcolor: el. proof,
                captionShiftNorm : -28 },
    { rgn: 'S,Ys', pcolor: el.proof,
                captionShiftNorm : -28 },
    { rgn: 'PY', pcolor: el.body },
    { rgn: 'CS', pcolor: el.proof },
    { rgn: 'CH', pcolor: el.proof },
    { rgn: 'P,Zminus', pcolor: el.body },
    { rgn: 'P,omegaHandle', pcolor: el.context },
    { rgn: 'PZ', pcolor: el.body },
    { rgn: 'ZR', pcolor: el.body },

    { rgn: 'PR', pcolor: el.body,
        'stroke-width' : 2,
        captionShiftNorm : -18,
    },
    { rgn: 'P,vb',
        pcolor: el.body,
        'stroke-width' : 2,
        captionShiftNorm : -18,
                vectorTipIx : 1
    },


    {
      //// poss rid
      rgn: 'p,vSample',
      pcolor: el.given,
      'stroke-width' : 1.1,
      captionShiftNorm : -18,
      vectorTipIx : 1
    },
    {
      //// poss rid
      rgn: 'p,f',
      pcolor: el.force,
      'stroke-width' : 1.1,
      captionShiftNorm : -18,
      vectorTipIx : 1
    },
    { rgn: 'QR', pcolor: el.proof },
    { rgn: 'QT', pcolor: el.proof },
    { rgn: 'PT', pcolor: el.proof },
    /*
     //// poss rid
        { DK : { pcolor: el.proof }, },
        { DS : { pcolor: el.proof }, },
    { DH : { pcolor: el.proof }, },
        { PM : { pcolor: el.body }, },
        { SM : { pcolor: el.body }, },

        { OM : { pcolor: el.proof }, },
        { ON : { pcolor: el.proof }, },
        { NS : { pcolor: el.proof }, },
    { SA : { pcolor: el.proof }, },
        { NP : { pcolor: el.proof }, },
    */

    { rgn: 'DS', pcolor: el.proof },
    { rgn: 'DH', pcolor: el.proof },
    { rgn: 'SA', pcolor: el.proof },
    { rgn: 'GP', pcolor: el.proof },
    { rgn: 'Qv', pcolor: el.proof },
    { rgn: 'Pv', pcolor: el.proof },
    { rgn: 'Tv', pcolor: el.proof },
    { rgn: 'xv', pcolor: el.proof },
    { rgn: 'Tx', pcolor: el.proof },

    { rgn: 'Gv', pcolor: el.proof },
    { rgn: 'PF', pcolor: el.proof },
    { rgn: 'A,AA', pcolor: el.borbit },
    { rgn: 'B,BB', pcolor: el.borbit },
    { rgn: 'AT', pcolor: el.proof },
    { rgn: 'CA', pcolor: el.proof },
    { rgn: 'CB', pcolor: el.proof },
    { rgn: 'L,LL', pcolor: el.borbit,
                    captionShiftNorm : 22, lposYSugar : 3 },
    { rgn: 'l,ll', pcolor: el.given,
                    captionShiftNorm : 44, lposYSugar : -5, },
    { rgn: 'SL', pcolor: el.borbit, },
    { rgn: 'CD', pcolor: el.proof },
    { rgn: 'SP',
        pcolor: el.body,
        vectorTipIx : 1
    },
    /*
     ////poss rid
        { PO : { pcolor: el.proof }, },
        //{ GO : { pcolor: el.proof }, },
        { FO : { pcolor: el.proof }, },

        { 'Sp' : { pcolor: el.given, 'stroke-width' : 1.1,
            captionShiftNorm : -18,
            vectorTipIx : 1 }, },
    */
    //Book's "another solution"
    { rgn: 'Tu', pcolor: el.proof },
    { rgn: 'u,VV', pcolor: el.proof },
    { rgn: 'uP', pcolor: el.proof },
    { rgn: 'PQ', pcolor: el.proof },
    { rgn: 'P,VV', pcolor: el.proof },
    { rgn: 'ZetaStart,ZetaEnd', pcolor: el.borbit },
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
        //todm possibly rid
        kind: POINT,
        rgn: 'O',
        pcolor: el.context,
        caption : 'O',
        pos: F,
        letterAngle : 45,
        letterRotRadius : 20,
    },
    {
        rgn: 'E',
        pcolor: el.proof,
        letterRotRadius : 20,
        cssClass: 'logic_phase--proof',
    },
    {   rgn: 'H',
        pcolor: el.proof,
        letterAngle : -90,
    },
    {   rgn: 'I',
        pcolor: el.proof,
        letterRotRadius : 20,
    },
    //-----------------------------------------
    // \\// Book's prop. 11
    //-----------------------------------------
    {   rgn: 'B',
        letterRotRadius : 20,
        pcolor: el.borbit,
    },
    {   rgn: 'BB',
        letterAngle : 90,
        undisplayAlways : true,
        doPaintPname : false,
        pcolor: el.borbit,
    },
    {   rgn: 'L',
        //no need: will be dynamic: caption : 'mmm',
        pcolor: el.borbit,
        letterAngle : -45,
        letterRotRadius : 20,
        draggableX  : true,
        draggableY  : true,
    },
    {   rgn: 'LL',
        pcolor: el.borbit,
        doPaintPname : false,
    },
    {   rgn: 'l',
        //no need: will be dynamic: caption : 'mmm',
        pcolor: el.given,
        letterAngle : -45,
        letterRotRadius : 20,
    },
    {   rgn: 'll',
        pcolor: el.given,
        doPaintPname : false,
    },
    {   rgn: 'A',
        pcolor: el.borbit,
        letterRotRadius : 20,
        letterAngle : -90,
    },
    {   rgn: 'AA',
        undisplayAlways : true,
        doPaintPname : false,
        pcolor: el.borbit,
    },
    {   rgn: 'D',
        pcolor: el.proof,
        letterRotRadius : 20,
        //letterAngle : 135,
    },
    {   rgn: 'K',
        pcolor: el.proof,
        letterRotRadius : 20,
        letterAngle : -60,
    },
    {
        //todm possibly rid
        rgn: 'M',
        pcolor: el.proof,
        letterRotRadius : 20,
        letterAngle : -45,
    },
    {
        //todm possibly rid
        rgn: 'N',
        pcolor: el.proof,
        letterRotRadius : 20,
        letterAngle : -45,
    },
    {
        //todm possibly rid
        rgn: 'p',
        pcolor: el.given,
        letterAngle : 120,
    },
    {
        //todm possibly rid
        rgn: 'vSample',
        ////prop17
        caption : 'r',
        pcolor: el.given,
        letterAngle : 135,
        letterRotRadius : 20,
        draggableX  : true,
        draggableY  : true,
    },
    {   rgn: 'G',
        pcolor: el.proof,
        letterRotRadius : 20,
        letterAngle : -45,
    },
    {   rgn: 'T',
        pcolor: el.proof,
        //letterAngle : 180,
        letterRotRadius : 20,
    },
    {   rgn: 'R',
        pcolor: el.proof,
        letterAngle : -45,
        letterRotRadius : 20,
    },
    {   rgn: 'Y',
        pcolor: el.proof,
        letterAngle : 45,
    },
    //speed of the body
    {   rgn: 'vb',
        caption : '',
        pcolor: el.proof,
        letterAngle : 135,
        letterRotRadius : 20,
        draggableX  : true,
        draggableY  : true,
    },
    {   rgn: 'omegaHandle',
        caption : 'ω',
        pcolor: el.shadow,
        letterAngle : 90,
        letterRotRadius : 17,
        draggableX  : true,
        draggableY  : true,
        fontSize : 20,
    },
    {   rgn: 'f',
        caption : '𝛾',
        pcolor: el.force,
        letterAngle : 90,
        letterRotRadius : 17,
        draggableX  : true,
        draggableY  : true,
        fontSize : 20,
    },
    {   rgn: 'Z',
        pcolor: el.body,
        letterAngle : 45,
        undisplayAlways : true,
        doPaintPname : false,
    },
    {   rgn: 'Zminus',
        caption : 'Z',
        pcolor: el.body,
        letterAngle : 145,
        letterRotRadius : 20,
        doPaintPname : "b1sec3prop13" !== fconf.sappId,
    },
    {   rgn: 'Ys',
        caption : '',
        pcolor: el.proof,
        letterAngle : 45,
    },
    {   rgn: 'v',
        caption : '𝑣',
        pcolor: el.proof,
        letterAngle : -45,
        letterRotRadius : 15,
    },
    {   rgn: 'F',
        pcolor: el.proof,
        letterRotRadius : 20,
        letterAngle : 135,
    },
    {   rgn: 'VV',
        caption : 'V',
        pcolor: el.proof,
        letterAngle : -45,
    },

    //center symmetry of orbit
    {   rgn: 'C',
        pcolor: el.borbit,
        letterAngle : -45,
    },

    //----------------------------------------
    // //\\ Prop. 10 Book's "another solution"
    //----------------------------------------
    {   rgn: 'u',
        caption : '𝑢',
        pcolor: el.proof,
        letterAngle : -45,
        letterRotRadius : 15,
    },
    //----------------------------------------
    // \\// Prop. 10 Book's "another solution"
    //----------------------------------------

    //----------------------------------------
    // //\\ Prop. 11
    //----------------------------------------
    {   rgn: 'x',
        caption : "𝑥",
        pcolor: el.proof,
        letterAngle : -45,
        letterRotRadius : 20,
    },
    //----------------------------------------
    // \\// Prop. 11
    //----------------------------------------

    //---------------------------------------
    // //\\ draggable points
    //---------------------------------------
    {   rgn: 'S',
        pcolor: el.result,
        letterAngle : -115,
        letterRotRadius : 20,
    },
    {   rgn: 'P',
        pcolor: el.body,
        letterAngle : 120,
    },
    {   rgn: 'Fi',
        caption : "φ",
        pcolor: el.shadow, //body,
        letterAngle : 120,
        draggableX  : true,
        draggableY  : true,
    },

    { rgn: 'Q',
        pcolor: el.proof,
        letterAngle : 225,
        letterRotRadius : 20,
        draggableX  : true,
        draggableY  : true,
    },
    { rgn: 'q',
        ////prop17
        pcolor: el.given,
        letterAngle : -65,
        letterRotRadius : 20,
    },
    // //\\ eccentricity slider
    { rgn: 'Zeta',
        caption : 'eccentricity, e',
        pos : [ sf.medWidth * 0.5, sf.medHeight * 0.92 ],
        pcolor: el.borbit,
        letterAngle : 90,
        letterRotRadius : 20,
        draggableX  : true,
        undisplayAlways  : false,
        doPaintPname : true,
        unscalable  : true,
    },
    { rgn: 'ZetaCaption',
        pos : [ sf.medWidth * 0.5, sf.medHeight * 0.97 ],
    pcolor: el.borbit,
        undisplayAlways : true,
        letterAngle : 90,
        letterRotRadius : 20,
        doPaintPname : true,
        unscalable  : true,
        cssClass: 'logic_phase--proof',
    },
    {   rgn: 'ZetaStart',
        pos : [ sf.medWidth * 0.1, sf.medHeight * 0.92 ],
        pcolor: el.borbit,
        undisplayAlways : true,
        doPaintPname : false,
        unscalable  : true,
        cssClass: 'logic_phase--proof',
    },
    {   rgn: 'ZetaEnd',
        pos : [ sf.medWidth * 0.9, sf.medHeight * 0.92 ],
        pcolor: el.borbit,
        undisplayAlways : true,
        doPaintPname : false,
        unscalable  : true,
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
}
}