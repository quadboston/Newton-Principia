( function() {
    var { 
        toreg, sDomF, ssF, stdMod, amode, rg, 
    } = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        const { logic_phase, aspect, subessay } = amode;
        toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        //todo sort out why this is commented out,
        // toreg( 'sForSagitta' )( 'val', sconf.sForSagitta_valQ );
        // nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( sconf.PparT ));

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        rg.tangentCircle.undisplay = subessay !== 'another-solution';

        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }
})();