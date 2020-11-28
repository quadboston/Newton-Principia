( function() {
    var {
        ns, sn, paste, capture, amode, rg, sDomF, ssD, ssF, fconf,
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
        paste( capture,
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


    function amode2rgstate( captured )
    {
        var { theorion, aspect, submodel, subessay } = amode;
        //----------------------------------
        // //\\ common values
        //----------------------------------
        /*
        rg.A.undisplay              = false;
        ns.paste( rg.curveStart.pos, ssD.curveStartInitialPos );
        ssD.repoConf.customFunction = 0;
        */
        var media_scale = ssF.toreg( 'media_scale' )();
        //----------------------------------
        // \\// common values
        //----------------------------------


        if( theorion === 'proof' ){
            rg.media_scale.value = 0.7;
            ssF.scaleValue2app( rg.media_scale.value );
            sDomF.detected_user_interaction_effect( !'doUndetected' );
        } else {
            rg.media_scale.value = 1;
            ssF.scaleValue2app( rg.media_scale.value );
        }
        //*****************************************************************************
        // \\// lemma 7
        //*****************************************************************************

        return captured;
    }

}) ();

