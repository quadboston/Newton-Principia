( function() {
    var { 
        toreg, sDomF, ssF, stdMod, amode, rg, 
    } = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        const { subessay } = amode;
        toreg( 'media_scale' )();
        if(!rg.media_scale.value) {
            rg.media_scale.value = 1;
        }
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        rg.tangentCircle.undisplay = subessay !== 'another-solution';

        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }
})();
