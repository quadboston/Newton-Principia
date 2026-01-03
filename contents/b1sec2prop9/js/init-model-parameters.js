( function() {
    const { stdMod, ssF, rg, toreg, } = window.b$l.apptree({
        stdModExportList : { init_model_parameters, }, });
    return;


    function init_model_parameters() {
        stdMod.initiates_orbit8graph();
        //body moves backward on x,
        toreg( 'vt' )( 'val', 1 );
        toreg( 'curvatureCircle' );
        rg.allLettersAreHidden = true;
    }
})();