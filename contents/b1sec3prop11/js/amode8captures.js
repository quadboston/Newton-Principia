( function() {
    var {
        toreg,
        sDomF, ssF,
        stdMod, amode, rg, sconf,
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
		const { logic_phase, aspect, subessay } = amode;
        toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );
        rg.S.pos[0] = -sconf.ellipseFocus;
        rg.S.pos[1] = 0;

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        rg.H.pos[0] = sconf.ellipseFocus;
        rg.H.pos[1] = 0;

		rg.Q.hideD8Dpoint = subessay !== 'solution';

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();
