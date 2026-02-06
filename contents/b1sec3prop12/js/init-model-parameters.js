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

        //TEMP Is the following still needed?
        toreg( 'instanttriangle' );

        //TEMP Does this need to be added here?  Probably not?
        // rg.allLettersAreHidden = true;
    }

}) ();

