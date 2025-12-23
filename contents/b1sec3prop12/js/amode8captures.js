( function() {
    var { nspaste, toreg, mat, sDomF, ssF, stdMod, rg, sconf, }
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        sDomF.resetModelPos();

        toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

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
        //nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( op.PparQ_initial ));
        // \\// "draws" conics and P

        rg.S.pos[0] = 0;
        rg.S.pos[1] = 0;

        rg.P.posInitialUnitVector = mat.unitVector( rg.P.pos );
        op.Kepler_g = op.Kepler_gInitial;
        op.Kepler_v = op.Kepler_v_initial; //this supposed to be redundant
        op.Dt = op.Dt0;
        op.sagittaDelta_q = op.sagittaDelta_q_initial;

        if (sconf.Fi_distance != null) {
            nspaste( rg.Fi.pos, [
                sconf.Fi_distance * Math.cos( rg.P.q ),
                sconf.Fi_distance * Math.sin( rg.P.q ),
            ]);
        }

        //=============================================================
        // \\// model
        //=============================================================

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();
