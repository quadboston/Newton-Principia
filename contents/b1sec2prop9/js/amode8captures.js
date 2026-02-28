( function() {
    var {
        ns, sn, nspaste, capture, toreg,
        sDomF, ssD, ssF, fconf,
        stdMod, amode, rg, sconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            amode2rgstate,
        },
    });
    setCapture();
    return;






    function setCapture()
    {
        nspaste( capture,{});
    }


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        const { logic_phase, aspect, subessay } = amode;
        toreg( 'medzoom' )();
        rg.medzoom.value = 1;
        ssF.newzoom2app( rg.medzoom.value, stdMod );
        //toreg( 'sForSagitta' )( 'val', sconf.sForSagitta_valQ );
        //nspaste( rg.P.pos, rg.approxer.t2xy( sconf.PparT ));

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }
})();

