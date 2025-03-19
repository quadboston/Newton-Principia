( function() {
    var {
        ns, sn, paste, capture, amode, toreg,
        stdMod, rg, sDomF, ssD, ssF, fconf,
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
        var { logic_phase, aspect, subessay } = amode;
        //----------------------------------
        // //\\ common values
        //----------------------------------
        /*
        rg.A.undisplay              = false;
        ns.paste( rg.curveStart.pos, ssD.curveStartInitialPos );
        ssD.repoConf.customFunction = 0;
        */
        var media_scale = toreg( 'media_scale' )();
        //----------------------------------
        // \\// common values
        //----------------------------------


        if( logic_phase === 'proof' ){

            //todo ... why was it 0.7? and not 1?
            //         this made problems with bars number > DONT_PAINT_BARS_MORE_THAN
            rg.media_scale.value = 1; //0.7;

            ssF.scaleValue2app( rg.media_scale.value, stdMod );
            sDomF.detected_user_interaction_effect( !'doUndetected' );

        } else {
            rg.media_scale.value = 1;
            ssF.scaleValue2app( rg.media_scale.value, stdMod );
        }
        //*****************************************************************************
        // \\// lemma 7
        //*****************************************************************************

        return captured;
    }

}) ();

