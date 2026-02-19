( function() {
    var { stdMod, toreg, } = window.b$l.apptree({
        stdModExportList : { init_model_parameters, }, });
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        stdMod.initiates_orbit8graph();
        stdMod.creates_Zeta_slider();
    }

}) ();

