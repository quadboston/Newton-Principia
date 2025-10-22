( function() {
    var { ns, sn, $$, nsmethods, nssvg, mcurve, integral, mat, fconf, ssF, 
        ssD, sData, stdMod, sconf, rg, toreg, } = window.b$l.apptree({ stdModExportList :
        { init_model_parameters, }, });
    return;


    function init_model_parameters() {
        stdMod.initiates_orbit8graph();
        //body moves backward on x,
        toreg( 'vt' )( 'val', 1 );
        //creates placeholder
        toreg( 'tangentCircle' );
        rg.allLettersAreHidden = true;
    }
})();

