( function() {
    const { nspaste, capture, toreg, sDomF, ssF, stdMod, amode, rg, sconf, } =
            window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    setCapture();
    return;


    function setCapture()
    {
        nspaste( capture,
        {
            /*
            "reset-to-origin": {
                    "curveRotationAngle": {
                        "angle": 0,
                        "sin": 0,
                        "cos": 1
                    },
                    "media-mover": {
                        "achieved": {
                            "achieved": [
                                140,
                                61
                            ]
                        }
                    },
                    "B": {
                            "unrotatedParameterX": 0.7745228215767634
                    }
            },
            */
        });
    }

    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        const { logic_phase, aspect, subessay } = amode;
        const media_scale = toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        //todo sort out why this is commented out,
        // toreg( 'sForSagitta' )( 'val', sconf.sForSagitta_valQ );
        // nspaste( rg.P.pos, rg.approxer.t2xy( sconf.PparT ));

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        rg.S.pos[0] = 0;
        rg.S.pos[1] = 0;
        rg.tangentCircle.undisplay = subessay !== 'another-solution';

        //=====================================================
        // //\\ alternates for addendum
        //=====================================================
        var isAdden = aspect === 'addendum';
        rg.S.undisplayAlways = !isAdden;
        rg.S.doPaintPname = isAdden;
        //=====================================================
        // \\// alternates for addendum
        //=====================================================

        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }
})();