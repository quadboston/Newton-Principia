( function() {
    var { toreg, sDomF, ssF, stdMod, amode, rg,  } 
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    function hide(...items) {
        for (const item of items) {
            rg[item].undisplay = true;
        }
    }

    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        const { subessay } = amode;
        toreg( 'media_scale' );
        if(!rg.media_scale.value) {
            rg.media_scale.value = 1;
        }
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        //Modify visibility for the below decorations based on the following settings.
		 if (subessay !== 'another-solution') {
			hide('curvatureCircle');
		 }

        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();
