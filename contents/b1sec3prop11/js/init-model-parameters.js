( function() {
    var { stdMod, sconf, rg, toreg, } = window.b$l.apptree({
        stdModExportList : { init_model_parameters, }, });
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        rg.S.pos[0] = -sconf.ellipseFocus;
        rg.S.pos[1] = 0;
        stdMod.initiates_orbit8graph();

        //body moves backward on x,
        toreg( 'vt' )( 'val', 1 );
        rg.allLettersAreHidden = true;
    }
}) ();