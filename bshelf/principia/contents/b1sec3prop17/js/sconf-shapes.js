{const{
    sn, apush, mcurve, mat, eachprop, nspaste, tpelect,
    CONST, sf, amode, rg, stdMod, ssF, gshapes,
}=window.b$l.atree();

const { ANGLE, CURVE } = CONST;
const op = sn( 'orbitParameters', sf );
const sop = sn( 'sampleOrbitParameters', sf );
const el = tpelect;

ssF.init_conf_shapes=function(){
    const {
        dimShadow,
    }=el;
    apush( gshapes, [
        {
          kind: ANGLE,
          vertex_id : 'vertex-Omega',
          rgn : 'Omega',
          angleCaption: 'ω',
          pcolor : dimShadow,
          cssClass: 'aspect--addendum tofill ' +
              'subessay--off-corollary1 subessay--off-corollary2',
          vertexTwin_rgn: 'P',
          ABString: 'SP',
          CDString: 'PR',
          ANGLE_SIZE  : 0.7,
        },
        {
          kind: ANGLE,
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
          kind: CURVE,
          rgn : 'borbit',
          initShapes: ()=>{
            const op = sf.orbitParameters;
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
          resetsLesson: (gshape, rgn)=>{
            const logic_phase = amode.logic_phase;
            op.mainAxisAngle = op.mainAxisAngle_initial;
            // //\\ "draws" conics and P
            //1
            op.latus         = op.latusInitial;
            //2
            stdMod.establishesEccentricity( op.initialEccentricity )
            op.PparQ_initial = op.PparQ_initial_essay
            if( logic_phase === 'corollary' &&
                ( amode.subessay === 'corollary1' ||
                amode.subessay === 'corollary2' )
            ){
                op.PparQ_initial = 0;
            }
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

            //op.Dt = op.Dt0;
            rg.P.abs = mat.unitVector( rg.P.pos ).abs;
            nspaste( rg.Fi.pos, [
                sf.Fi_distance * Math.cos( op.mainAxisAngle ),
                sf.Fi_distance * Math.sin( op.mainAxisAngle ),
            ]);
            //won't work in study model
            //because is overriden in in_subessay_launch____amode2lemma by
            //sf.rgShapesVisible
            {
                //-------------------------------------------------
                // //\\ op
                //-------------------------------------------------
                op.cosOmega = op.cosOmega_initial;
                op.om       = op.om_initial;
                if( logic_phase === 'corollary' &&
                    ( amode.subessay === 'corollary1' || amode.subessay === 'corollary2' )
                ){
                    op.om = 1;
                    op.cosOmega = 0;

                    rg.Q.undisplay = true;
                    rg.P.q      = 0;;
                    //op.Kepler_v = op.Kepler_v_initial;
                    //op.Dt = op.Dt0;
                    nspaste( rg.P.pos, rg.borbit.dyn_q2xy( rg.P.q ));

                    rg.omegaHandle.undisplay = true;
                    rg.omegaHandle.hideD8Dpoint = true;
                    nspaste( rg.omegaHandle.pos, [ rg.P.pos[0], 0.7 ] );
                    rg.P.abs = mat.unitVector( rg.P.pos ).abs;
                }
                //-------------------------------------------------
                // \\// op
                //-------------------------------------------------
            }
            rg.f.caption = '';
            //op.Dt = op.Dt0;
            rg.P.abs = mat.unitVector( rg.P.pos ).abs;
            nspaste( rg.Fi.pos, [
                sf.Fi_distance * Math.cos( op.mainAxisAngle ),
                sf.Fi_distance * Math.sin( op.mainAxisAngle ),
            ]);
        },
        },
        {
          kind: CURVE,
          rgn : 'borbit-sample',
          initShapes: ()=>{
            stdMod.init__borbitTripleShapes(sop);
            let { rr } = mcurve.planeCurveDerivatives(
                rg[ 'borbit-sample' ].dyn_q2xy,
                sop.PparQ_initial,
                rg.S.pos,
            );
            nspaste( rg.p.pos, rr );
            rg.p.proofPos = nspaste( [], rr );

            //cor2.
            let Dpos = rg.borbit.dyn_q2xy( 0 );
            let DVect = mat.unitVector( Dpos );
            sop.corII_speed = Math.sqrt( op.Kepler_g / DVect.abs );
            sop.corII_Dpos = Dpos;
            sop.corII_DVect = DVect;
          },
          resetsLesson: (gshape, rgn)=>{
                //-------------------------------------------------
                // //\\ sop
                //-------------------------------------------------
                const logic_phase = amode.logic_phase;
                sop.latus    = sop.latusInitial;
                sop.Kepler_g = op.Kepler_gInitial;
                sop.Kepler_v = sop.Kepler_v_initial;
                sop.cosOmega = sop.cosOmega_initial;
                sop.om       = sop.om_initial;
                if( logic_phase === 'corollary' &&
                    amode.subessay === 'corollary2'
                ){
                    sop.om = 1;
                    sop.cosOmega = 0;
                    sop.latus = sop.corII_DVect.abs;
                    stdMod.establishesEccentricity(
                        0,
                        null,
                        sop,
                    );
                    sop.corII_speed =
                        Math.sqrt( op.Kepler_g / sop.corII_DVect.abs );
                    sop.Kepler_v    = sop.corII_speed;
                    rg.p.q          = 0;
                    sop.mainAxisAngle = 0;
                    sop.r2axisX_angle = 0;
                } else {
                    rg.p.q      = sop.PparQ_initial;
                    sop.latus   = sop.latusInitial;
                    stdMod.establishesEccentricity(
                        sop.initialEccentricity,
                        null,
                        sop,
                    );
                    sop.r2axisX_angle = sop.r2axisX_angle_initial;
                    sop.mainAxisAngle = sop.r2axisX_angle - rg.p.q;
                }
                sop.Dt  = sop.Dt0;
                //-------------------------------------------------
                // \\// sop
                //-------------------------------------------------
          },
          //cssClass: 'subessay--off-comparing-proof-steps',
        },
        {
            kind: CURVE,
            rgn : 'borbitdq',
            //cssClass: 'subessay--off-comparing-proof-steps',
        },
        {
          kind: CURVE,
          rgn : 'borbitarea-sample',
          cssClass: 'subessay--off-comparing-proof-steps',
        },
        // \\// not automated in common media_upcreate
        {
          kind: CURVE,
          rgn : 'borbitdq-sample',
          cssClass: 'subessay--off-comparing-proof-steps',
        },
    ]);
}}