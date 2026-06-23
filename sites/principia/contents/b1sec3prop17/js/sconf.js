(function(){
const {
        sn, nspaste, mat, fconf, sf, mcurve, tprepo,
        tpelect, originalPoints, rg, stdMod,
      } = window.b$l.atree({ ssFList: {
        init_conf }
});
const op = sn( 'orbitParameters', sf );
const sop = sn( 'sampleOrbitParameters', sf );
return;


function init_conf(){
    //*****************************************************
    // //\\ original picture dimensions for svg scene
    //*****************************************************
    sf.medWidth = 1037;
    sf.medHeight = 765;

    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sf.medsize_standard

    var forceHandleInitial = 0.8; //todm fix
    var F = [ 350, 410 ];
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
    //      look at conf/conf.js or especally at
    //      conf/lemma.conf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //*****************************************************
    sf.mediaBgImage = "diagram.png";
    sf.default_tp_lightness = 30;
    sf.LETTER_FONT_SIZE_PER_1000 = 20;
    sf.pointDecoration.r = 5;
    //no effect: sf.handleRadius = 5;
    //sf.text_hover_width = 1;
    //******************************************
    // \\// GUI cosmetics
    //******************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    fconf.effId = 'prop_from_14_to_17';
    var Kepler_g = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
    //sets model offset

    //--------------------------------
    // //\\ inner defaults
    //--------------------------------
    op.rgn = 'borbit'
    op.dqName = 'borbitdq';
    op.body = 'P'; //for rg.P
    //--------------------------------
    // \\// inner defaults
    //--------------------------------

    op.mainAxisAngle_initial = 0;
    op.mainAxisAngle = op.mainAxisAngle_initial;
    op.delta_v_increase_LIMIT = 1.5;
    op.Kepler_g = Kepler_g;
    op.Kepler_gInitial  = Kepler_g;

    //sets cinematics
    sop.rgn = 'borbit-sample';
    sop.areaName = 'borbitarea-sample';
    sop.dqName = 'borbitdq-sample';
    sop.body = 'p'; //for rg.p

    sop.Kepler_g = Kepler_g;
    sop.Kepler_gInitial = Kepler_g;

    //media
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.Fi_distance = 1.8;

    //-------------------------------------------
    // //\\ sop
    //-------------------------------------------
    //sets cinematics
    sop.latusInitial       = 1;
    sop.latus              = sop.latusInitial;
    sop.forceHandleInitial = forceHandleInitial;
    sop.forceHandle        = forceHandleInitial;
    {
        //Book's diagram values
        let r             = 1.30307;
        let r2axisX_angle = 2.24;
        let sin2speed     = 0.999;
        //Book's derivative values
        let eta = sop.latus / r;
        let e   = Math.sqrt( eta*eta / sin2speed / sin2speed - 2 * eta + 1 );
        let fi  = Math.acos( (1-eta)/e );

        //sop.latusInitial is already saved
        sop.r = r;
        sop.PparQ_initial = fi;
        sop.initialEccentricity = e;
        //diagram valuse:
        sop.r2axisX_angle = r2axisX_angle;
        sop.r2axisX_angle_initial = r2axisX_angle;
        //derived
        sop.mainAxisAngle = sop.r2axisX_angle - sop.PparQ_initial;
    }
    stdMod.establishesEccentricity( sop.initialEccentricity, null, sop );

    //decoration
    sop.sagittaDelta_q_initial = 0.4;
    //-------------------------------------------
    // \\// sop
    //-------------------------------------------

    //-------------------------------------------
    // //\\ op
    //-------------------------------------------
    op.latusInitial         = 0.93;
    op.latus                = op.latusInitial;
    op.initialEccentricity  = 0.60;
    var PparQ = 0.39 * Math.PI;
    {
        let sag_init                    = 0.16;
        op.sagittaDelta_q_initial       = sag_init;
        //in this prop, using Dt instead of sag_delta_q
        op.Dt0              = sag_init * 2.5;
        op.Dt                      = op.Dt0;
        op.delta_t_LIMIT                = op.Dt0 * 1.5;
    }
    stdMod.establishesEccentricity( op.initialEccentricity );
    //-------------------------------------------
    // \\// op
    //-------------------------------------------
    //todm get r and then e:
    //var neededG = 0.975339131380;

    //-----------------------------------------
    // //\\ defines sample speed
    //-----------------------------------------
    var { Kepler_v, cosOmega, om } =
        mat.conics.innerPars2innerPars({
            lat         : sop.latusInitial,
            fi          : sop.PparQ_initial,
            e           : sop.initialEccentricity,
            Kepler_g    : sop.Kepler_g,
    })
    sop.Kepler_v         = Kepler_v;
    sop.Kepler_v_initial = Kepler_v;
    sop.cosOmega         = cosOmega;
    sop.om               = om;
    sop.cosOmega_initial = cosOmega;
    sop.om_initial       = om;
    //-----------------------------------------
    // \\// defines sample speed
    //-----------------------------------------
    stdMod.establishesEccentricity( op.initialEccentricity );

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

    //*************************************
    // //\\ topic group colors,
    //      to see templates what to override here, do
    //      look at conf/lemma.conf.js:
    //*************************************
    ///does import topic colors
    let {
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
        dimShadow,
    } = tprepo;
    orbitSample = given;

    //orbit to be calculated based on sample orbit
    const resultingOrbit = [100,  0, 0, 1];
    borbit = resultingOrbit;
    body = resultingOrbit;
    const borbitdq = resultingOrbit;
    let latusR = resultingOrbit.concat();
    latusR[3] = 0.4; //weak inactive color
    latusR[4] = 1;
    let latusRgiven = orbitSample.concat();
    latusRgiven[3] = 0.4; //weak inactive color
    latusRgiven[4] = 1;

    //for proof key point, segment PK
    const attention = [200,  200, 0, 1];

    //second part of the proof,
    //possibly redundant,
    result = proof;

    var proofHidden = [0, 0,   255, 0.05, 1];

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
        borbitdq,
        shadow,
        dimShadow,

        //PQS
        //sample:
        'borbitarea-sample' : [0,     150, 0,  0.05],
        'borbit-sample' : orbitSample,
        'borbitdq-sample' : orbitSample, //todm remove
    });
    //*************************************
    // \\// topic group colors,
    //*************************************

    //*************************************
    // //\\ bricks for originalPoints
    //*************************************
    //empty section is kept
    //for modules comparision
    //*************************************
    // \\// bricks for originalPoints
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    //-------------------------------------
    // //\\ prepares points
    //-------------------------------------
    // empty section for comparisions
    //-------------------------------------
    // \\// prepares points
    //-------------------------------------

    Object.assign( originalPoints, {
        //-----------------------------------------
        // //\\ Book's prop. 11
        //-----------------------------------------
        E : {
            pcolor : proof,
            letterRotRadius : 20,
            cssClass: 'logic_phase--none',
        },
        H : {
            pcolor : resultingOrbit,
            letterAngle : -90,
            cssClass: 'logic_phase--proof logic_phase--corollary',
        },
        I : {
            pcolor : proof,
            letterRotRadius : 20,
            //cssClass: 'logic_phase--none',
            doPaintPname : false,
            undisplayAlways : true,
        },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        B : {
            letterRotRadius : 20,
            pcolor : proof,
            cssClass: 'logic_phase--proof',
        },
        L : {
            //no need: will be dynamic: caption : 'mmm',
            pcolor : borbit,
            letterAngle : -45,
            letterRotRadius : 20,
            doPaintPname : false,
            undisplayAlways : true,
        },
        LL : {
            undisplayAlways : true,
            pcolor : borbit,
            doPaintPname : false,
        },
        l : {
            //no need: will be dynamic: caption : 'mmm',
            pcolor : given,
            letterAngle : -45,
            letterRotRadius : 20,
            doPaintPname : false,
            undisplayAlways : true,
        },
        ll : {
            pcolor : given,
            doPaintPname : false,
            undisplayAlways : true,
        },
        A : {
            pcolor : resultingOrbit,
            letterRotRadius : 20,
            letterAngle : -90,
            doPaintPname : false,
            undisplayAlways : true,
        },
        D : {
            pcolor : resultingOrbit,
            letterRotRadius : 20,
            cssClass: 'logic_phase--corollary',
        },
        K : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -60,
            cssClass: 'logic_phase--proof',
        },
        G : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'logic_phase--scholium',
        },
        T : {
            pcolor : proof,
            //letterAngle : 180,
            letterRotRadius : 20,
            undisplayAlways : true,
            doPaintPname : false,
        },
        R : {
            pcolor : body,
            letterAngle : -45,
            letterRotRadius : 20,
            cssClass: 'logic_phase--proof',
            undisplayAlways : true,
            doPaintPname : false,
        },
        vSample : {
            ////prop17
            caption : 'r',
            pcolor : given,
            letterAngle : 135,
            letterRotRadius : 20,
            draggableX  : true,
            draggableY  : true,
            cssClass: 'logic_phase--claim logic_phase--proof ' +
                      'subessay--corollary1',
            conditionalDrag : 'subessay--corollary2',
        },
        Y : {
            pcolor : proof,
            letterAngle : 45,
            doPaintPname : false,
            undisplayAlways : true,
        },
        //speed of the body
        vb : {
            caption : 'R',
            pcolor : body,
            letterAngle : 135,
            letterRotRadius : 20,
            draggableX  : true,
            draggableY  : true,
            cssClass: 'tp-_r',
        },
        omegaHandle : {
            caption : 'ω',
            pcolor : shadow,
            letterAngle : 90,
            letterRotRadius : 17,
            draggableX  : true,
            draggableY  : true,
            fontSize : 20,
            doPaintPname : false,
            undisplayAlways : true,
        },
        f : {
            caption : '𝛾',
            pcolor : force,
            letterAngle : 90,
            letterRotRadius : 17,
            draggableX  : true,
            draggableY  : true,
            fontSize : 20,
        },

        Z : {
            pcolor : body,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
        },
        //defined only to comply with code of P12
        Zminus : {
            caption : 'Z',
            pcolor : body,
            letterAngle : 145,
            letterRotRadius : 20,
            doPaintPname : false,
            undisplayAlways : true,
        },
        Ys : {
            caption : '',
            pcolor : proof,
            letterAngle : 45,
            doPaintPname : false,
            undisplayAlways : true,
        },
        //defined only to comply with code of P12
        v : {
            caption : '𝑣',
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 15,
            doPaintPname : false,
            undisplayAlways : true,
        },
        F : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : 135,
            doPaintPname : false,
            undisplayAlways : true,
        },
        VV : {
            caption : 'V',
            pcolor : proof,
            letterAngle : -45,
            doPaintPname : false,
            undisplayAlways : true,
        },
        //center symmetry of orbit
        C : {
            pcolor : proof,
            letterAngle : -45,
            cssClass: 'logic_phase--proof',
        },

        //----------------------------------------
        // //\\ Prop. 10 Book's "another solution"
        //----------------------------------------
        //defined only to comply with code of P12
        u : {
            caption : '𝑢',
            pcolor : body,
            letterAngle : -45,
            letterRotRadius : 15,
            doPaintPname : false,
            undisplayAlways : true,
        },
        //----------------------------------------
        // \\// Prop. 10 Book's "another solution"
        //----------------------------------------

        //----------------------------------------
        // //\\ Prop. 11
        //----------------------------------------
        //defined only to comply with code of P12
        x : {
            caption : "𝑥",
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 20,
            doPaintPname : false,
            undisplayAlways : true,
        },
        //----------------------------------------
        // \\// Prop. 11
        //----------------------------------------

        //---------------------------------------
        // //\\ draggable points
        //---------------------------------------
        S : {
            pcolor : force,
            letterAngle : -115,
            letterRotRadius : 20,
        },
        P : {
            pcolor : body,
            letterAngle : 225,
        },
        p : {
            pcolor : given,
            letterAngle : 120,
        },
        //defined only to not break P12 code
        Fi : {
            caption : "φ",
            pcolor : shadow, //body,
            letterAngle : 120,
            undisplayAlways : true,
            doPaintPname : false,
            //draggableX  : true,
            //draggableY  : true,
        },
        Q : {
            pcolor : resultingOrbit,
            letterAngle : 225,
            letterRotRadius : 20,
            cssClass: 'logic_phase--proof',
            //draggableX  : true,
            //draggableY  : true,
        },
        q : {
            ////prop17
            pcolor : given,
            letterAngle : -65,
            letterRotRadius : 20,
            cssClass: 'logic_phase--proof',
        },
        // //\\ eccentricity slider
        Zeta : {
            caption : 'eccentricity, e',
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.92 ],
            pcolor : proof,
            letterAngle : 90,
            letterRotRadius : 20,
            //draggableX  : true,
            doPaintPname : true,
            unscalable  : true,
            cssClass: 'logic_phase--proof',
        },
        ZetaCaption : {
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.97 ],
            pcolor : proof,
            undisplayAlways : true,
            letterAngle : 90,
            letterRotRadius : 20,
            doPaintPname : true,
            cssClass: 'logic_phase--proof',
            unscalable  : true,
        },
        ZetaStart : {
            pos : [ sf.medWidth * 0.1, sf.medHeight * 0.92 ],
            pcolor : proof,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
        },
        ZetaEnd : {
            pos : [ sf.medWidth * 0.9, sf.medHeight * 0.92 ],
            pcolor : proof,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
        },
        // \\// eccentricity slider
        //---------------------------------------
        // \\// draggable points
        //---------------------------------------
    });
    //*************************************
    // \\// original app points
    //*************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = nspaste( {},
    [
        { PH : {
                    pcolor : proof,
                    vectorTipIx : 0,
                    cssClass: 'logic_phase--proof subessay--corollary1',
                },
        },
        { PK : { pcolor : attention,
                 cssClass: 'logic_phase--proof subessay--corollary1',
        }, },
        { SK : { pcolor : proof,
                 cssClass: 'logic_phase--proof',
        }, },
        { BH : { pcolor : proof,
                 cssClass: 'logic_phase--proof',
        }, },
        { 'SY' : { pcolor : proofHidden,
                   captionShiftNorm : -28,
                   cssClass: 'logic_phase--proof',
        }, },
        { 'S,Ys' : { pcolor : proofHidden,
                     captionShiftNorm : -28,
                     cssClass: 'logic_phase--proof',
        }, },
        { 'PY' : { pcolor : body,
                   cssClass: 'logic_phase--claim',
        }, },
        { 'CS' : { pcolor : proof,
                   cssClass: 'logic_phase--latin aspect--addendum',
        }, },
        { 'CH' : { pcolor : proof,
                   cssClass: 'logic_phase--proof',
        }, },
        { 'P,omegaHandle' : {
            pcolor : context,
            cssClass: 'logic_phase--none',
        }, },
        { 'ZR' : { pcolor : body,
                   cssClass: 'logic_phase--none',
        }, },
        { 'PR' : { pcolor : body,
                   'stroke-width' : 2,
                   captionShiftNorm : -18,
                   cssClass: 'logic_phase--none',
        }, },
        { 'P,vb' : {
            pcolor : body, 'stroke-width' : 2,
            captionShiftNorm : -18,
            vectorTipIx : 1,
            cssClass: 'tp-_p_r',
        }, },
        { 'p,vSample' : {
            pcolor : given, 'stroke-width' : 1.1,
            captionShiftNorm : -18,
            vectorTipIx : 1
        }, },
        { 'p,f' : {
            pcolor : force,
            'stroke-width' : 1.1,
            captionShiftNorm : -18,
            vectorTipIx : 1,
        }, },
        { DS : { pcolor : proof,
                 cssClass: 'logic_phase--corollary',
        }, },
        { SD : { pcolor : proof,
                 cssClass: 'logic_phase--none',
        }, },
        { DH : { pcolor : resultingOrbit,
            cssClass: 'logic_phase--corollary',
        }, },
        { CB : { pcolor : resultingOrbit,
            cssClass: 'logic_phase--proof',
        }, },
        { 'L,LL' : {
            pcolor : latusR,
            captionShiftNorm : 22,
            lposYSugar : 3,
            cssClass: 'logic_phase--proof subessay--corollary2',
        }, },
        { 'l,ll' : {
            pcolor : latusRgiven,
            captionShiftNorm : 44,
            lposYSugar : -5,
            cssClass: 'logic_phase--proof aspect--addendum',
        }, },
        { 'SP' : {
                pcolor : body,
                vectorTipIx : 1 },
        },
        { 'Sp' : {
            pcolor : given,
            'stroke-width' : 1.1,
            captionShiftNorm : -18,
            vectorTipIx : 1,
            cssClass: 'subessay--self-test logic_phase--claim',
        }, },

        //to comply p12
        { Tu : {
            pcolor : proof,
            cssClass: 'subessay--none',
        }, },
        { 'u,VV' : {
            pcolor : proof,
            cssClass: 'subessay--none',
        }, },
        { uP : { pcolor : proof,
            cssClass: 'subessay--none',
        }, },
        { 'P,VV' : {
            pcolor : proof,
            cssClass: 'subessay--none',
        }, },
        { 'ZetaStart,ZetaEnd' :
            { pcolor : result,
              cssClass: 'logic_phase--proof',
        }, },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ shapes
    //*************************************
    sf.shapesArray = [
        {
          isAngle: true,
          vertex_id : 'vertex-Omega',
          rgn : 'Omega',
          angleCaption: 'ω',
          pcolor : dimShadow,
          cssClass: 'aspect--addendum tofill ' +
              'subessay-not-corollary1 subessay-not-corollary2',
          vertexTwin_rgn: 'P',
          ABString: 'SP',
          CDString: 'PR',
          ANGLE_SIZE  : 0.7,
        },
        {
          isAngle: true,
          vertex_id : 'vertex-phi',
          rgn : 'phi',
          angleCaption: 'φ',
          pcolor : dimShadow,
          cssClass: 'subessay--comparing-proof-steps tofill',
          vertexTwin_rgn: 'S',
          ABString: 'SP',
          //todo this is possibly wrong for hyperbola
          //and for vector calculus
          CDString: 'SD',

          ANGLE_SIZE  : 1.5,
        },
        {
          isCurve: true,
          rgn : 'borbit',
          initShapes: ()=>{
            const op = sf.orbitParameters;
            stdMod.init__borbitTripleShapes( op );
            let {
                rr,
                projectionOfCenterOnTangent,
            } = mcurve.planeCurveDerivatives({
                fun : rg.borbit.dyn_q2xy,
                q : op.PparQ_initial,
                rrc : rg.S.pos,
            });
            nspaste( rg.P.pos, rr );
            nspaste( rg.Y.pos, projectionOfCenterOnTangent );
            ////establishes rg.omegaHandle.pos
            let excess = 0.5;
            rg.omegaHandle.initialPos =
                mat.sm( 1+excess, rg.Y.pos, -excess, rg.P.pos );
            nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );

            //was in init_app
            rg.P.q = op.PparQ_initial;
            //todm: do move this line to borbit-sample?
            stdMod.completesSlidersCreation(); //in-diagram sliders
            stdMod.establishesEccentricity( op.eccentricity );
          },
        },
        {
          isCurve: true,
          rgn : 'borbit-sample',
          initShapes: ()=>{
            stdMod.init__borbitTripleShapes(sop);
            let { rr } = mcurve.planeCurveDerivatives({
                fun : rg[ 'borbit-sample' ].dyn_q2xy,
                q   : sop.PparQ_initial,
                rrc : rg.S.pos,
            });
            nspaste( rg.p.pos, rr );
            rg.p.proofPos = nspaste( [], rr );

            //cor2.
            let Dpos = rg.borbit.dyn_q2xy( 0 );
            let DVect = mat.unitVector( Dpos );
            sop.corII_speed = Math.sqrt( op.Kepler_g / DVect.abs );
            sop.corII_Dpos = Dpos;
            sop.corII_DVect = DVect;
          },
          //cssClass: 'subessay-not-comparing-proof-steps',
        },

        { rgn : 'borbitdq',
          //cssClass: 'subessay-not-comparing-proof-steps',
        },        { rgn : 'borbitarea-sample',
          cssClass: 'subessay-not-comparing-proof-steps',
        },
        // \\// not automated in common media_upcreate

        { rgn : 'borbitdq-sample',
          cssClass: 'subessay-not-comparing-proof-steps',
        },
    ];
    //*************************************
    // \\// shapes
    //*************************************
}
})();
