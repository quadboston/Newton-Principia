( function() {
    var {
        rg, sconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            amode2rgstate,
        },
    });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        rg.S.pos[0] = -sconf.ellipseFocus;
        rg.S.pos[1] = 0;
        rg.H.pos[0] = sconf.ellipseFocus;
        rg.H.pos[1] = 0;

        return captured;
    }

}) ();
