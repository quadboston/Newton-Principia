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
        const { logic_phase, aspect, subessay } = amode;
        var media_scale = toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );
        //toreg( 'sForSagitta' )( 'val', sconf.sForSagitta_valQ );
        //nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( sconf.PparT ));

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        //Modify visibility for the below decorations based on the following settings.
        if (logic_phase === 'claim') {
            hide(
                'PY',
                'R',
                'Y',
                'SY',
                'PZ',
                'ZR',
                'PR',
                'P,Zminus',
                'T', 
                'QT', 
                'PT',
                'PV',
                'QR',
                'V',
                'curvatureCircle',
                'arc-QP'
            );
        } else if (subessay === 'solution') {
            hide(
                'PV',
                'PY',
                'V',
                'Y',
                'SY',
                'curvatureCircle'
            );
        } else if (subessay === 'another-solution') {
            hide(
                'Q',
                'R',
                'SQ',
                'PZ',
                'ZR',
                'PR',
                'P,Zminus',
                'T', 
                'QT', 
                'PT',
                'QR',
                'V',
                'arc-QP'
            );
        }

        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();
