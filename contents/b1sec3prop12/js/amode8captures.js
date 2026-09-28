( function() {
    var { sDomF, stdMod, rg, sconf, }
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        sDomF.resetModelPos();

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

        stdMod.rebuilds_orbit();
        return captured;
    }

}) ();
