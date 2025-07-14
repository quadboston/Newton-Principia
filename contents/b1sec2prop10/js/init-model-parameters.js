( function() {
    var {
        ns, sn, $$, nsmethods, nssvg, mcurve, integral, mat,
        fconf, ssF, ssD, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
        },
    });
    return;


    function init_model_parameters()
    {
        toreg( 'vt' )( 'val', 1 );
        toreg( 'approximated-curve' );
        stdMod.creates_orbitRack();
        stdMod.completesSlidersCreation();
        toreg( 'tangentCircle' );
        stdMod.createsGraphFW( stdMod.legendRoot$ );

        //too early: overriden later by sconf.rgShapesVisible
        //rg[ 'S,nonSolvablePoint' ].undisplay = true;

        rg.allLettersAreHidden = true;
    }
})();

