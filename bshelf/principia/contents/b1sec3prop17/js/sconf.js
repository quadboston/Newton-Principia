{
const{
        sn, arrover, nspaste, mat, fconf, sf, mcurve, tprepo,
        tpelect, CONST, amode, rg, stdMod, ssF,
     }=window.b$l.atree();
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const op = sn( 'orbitParameters', sf );
const sop = sn( 'sampleOrbitParameters', sf );
const tr = tprepo;
const el = tpelect;


ssF.init_conf=function(){
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
    //      look at c onf/c onf.js or especally at
    //      c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //*****************************************************
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
        'invalid',
        'shadow',
        'dimShadow',
        'attention',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    el.orbitSample = tprepo.given;
    el.resultingOrbit = [100,  0, 0, 1];
    Object.assign( el, {
        borbit:         el.resultingOrbit,
        body:           el.resultingOrbit,
        borbitdq:       el.resultingOrbit,
        latusR:         arrover( el.resultingOrbit, [,,, 0.4, 1] ),
        latusRgiven:    arrover( el.orbitSample, [,,, 0.4, 1] ),
        //second part of the proof,
        //possibly redundant,
        result:         el.proof,
        proofHidden:    [0, 0,   255, 0.05, 1],
        //PQS
        //sample:
        'borbitarea-sample':    [0,     150, 0,  0.2],
        'borbit-sample':        el.orbitSample,
        'borbitdq-sample' :     el.orbitSample, //todm remove
    });
    //************************************************
    // \\// elected colors,
    //************************************************
    ssF.init_conf_shapes();
    ssF.init_conf_lines();
    ssF.init_conf_points();
}}