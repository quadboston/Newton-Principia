(function(){
    const {
        nspaste, capture, toreg, mat,
        sDomF, ssF, fconf, stdMod, amode, rg, sconf,
    } = window.b$l.apptree({
        ssFExportList : { amode2rgstate_model, },
    });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate_model (){
        const logic_phase = amode.logic_phase;
        var op = sconf.orbitParameters;
        op.mainAxisAngle = op.mainAxisAngle_initial;

        // //\\ "draws" conics and P
        //1
        op.latus         = op.latusInitial;
        //2
        stdMod.establishesEccentricity( op.initialEccentricity )
        op.PparQ_initial = op.PparQ_initial_essay
        if( logic_phase === 'corollary' &&
            ( amode.subessay === 'corollary1' || amode.subessay === 'corollary2' )
        ){
            op.PparQ_initial = 0;
        }
        //3
        rg.P.q      = op.PparQ_initial;
        //4
        nspaste( rg.P.pos, rg.approxer.t2xy( op.PparQ_initial ));
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
            sconf.Fi_distance * Math.cos( op.mainAxisAngle ),
            sconf.Fi_distance * Math.sin( op.mainAxisAngle ),
        ]);
        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

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
                nspaste( rg.P.pos, rg.approxer.t2xy( rg.P.q ));

                rg.omegaHandle.undisplay = true;
                rg.omegaHandle.hideD8Dpoint = true;
                nspaste( rg.omegaHandle.pos, [ rg.P.pos[0], 0.7 ] );
                rg.P.abs = mat.unitVector( rg.P.pos ).abs;
            }
            //-------------------------------------------------
            // \\// op
            //-------------------------------------------------

            //-------------------------------------------------
            // //\\ sop
            //-------------------------------------------------
            var sop      = sconf.sampleOrbitParameters;
            sop.latus    = sop.latusInitial;
            sop.Kepler_g = op.Kepler_gInitial;
            sop.Kepler_v = sop.Kepler_v_initial;
            sop.cosOmega = sop.cosOmega_initial;
            sop.om       = sop.om_initial;
            if( logic_phase === 'corollary' && amode.subessay === 'corollary2' ){
                sop.om = 1;
                sop.cosOmega = 0;
                sop.latus = sop.corII_DVect.abs;
                stdMod.establishesEccentricity(
                    0,
                    null,
                    sop,
                );
                sop.corII_speed = Math.sqrt( op.Kepler_g / sop.corII_DVect.abs );
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
        }
    }
})();