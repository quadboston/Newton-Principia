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
        var { textSection, aspect, subessay } = amode;
        var media_scale = toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );
        toreg( 'sForSagitta' )( 'val', sconf.sForSagitta_valQ );
        nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( sconf.PparT ));

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        //rg.Q.hideD8Dpoint = false;
        //rg.Q.d8d_find_is_LOCKED = false;
        //nspaste( rg.S.pos, [ 0., 0.] ); //Book's value

        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();

