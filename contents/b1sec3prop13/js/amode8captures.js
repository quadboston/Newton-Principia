( function() {
    var { nspaste, toreg, mat, sDomF, ssD, ssF, stdMod, rg, sconf, }
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;
    //TEMP This file seems to be 100% the same as the P12 version.  If it stays
    //that way then couldn't they share the P12 one to reduce duplicate code.
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

        // //\\ "draws" conics
        stdMod.establishesEccentricity( op.initialEccentricity )
        // \\// "draws" conics

        rg.S.pos[0] = 0;
        rg.S.pos[1] = 0;

        //=============================================================
        // \\// model
        //=============================================================

        stdMod.rebuilds_orbit(ssD.Dt);
        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();
