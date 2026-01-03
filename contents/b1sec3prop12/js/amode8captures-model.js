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
        const sappId = fconf.sappId;
        //=============================================================
        // //\\ model
        //=============================================================
        var op           = sconf.orbitParameters;
        op.mainAxisAngle = op.mainAxisAngle_initial;

        // //\\ "draws" conics and P
        //1
        op.latus         = op.latusInitial;
        //2
        stdMod.establishesEccentricity( op.initialEccentricity )
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

        if( "b1sec3prop16" === fconf.sappId ) {
            op.cosOmega = op.cosOmega_initial;
            op.om       = op.om_initial;
        }

        if( fconf.effId === "prop_from_14_to_17" ) {
            //op.Dt = op.Dt0;
            rg.P.abs = mat.unitVector( rg.P.pos ).abs;
            nspaste( rg.Fi.pos, [
                sconf.Fi_distance * Math.cos( op.mainAxisAngle ),
                sconf.Fi_distance * Math.sin( op.mainAxisAngle ),
            ]);
        } else {
            nspaste( rg.Fi.pos, [
                sconf.Fi_distance * Math.cos( rg.P.q ),
                sconf.Fi_distance * Math.sin( rg.P.q ),
            ]);
        }
    }
})();