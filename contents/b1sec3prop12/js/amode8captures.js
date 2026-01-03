(function(){
    const {
        nspaste, capture, toreg, mat,
        sDomF, ssF, fconf, stdMod, amode, rg, sconf,
    } = window.b$l.apptree({
        ssFExportList : { amode2rgstate, },
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
        const sappId = fconf.sappId;
        const { logic_phase, aspect, subessay } = amode;
        //------------------------------------------------
        // //\\ returns diagram back at every menu click
        //      todm: this is a patch: do streamline
        //------------------------------------------------
        {
            nspaste( rg[ "media-mover" ].achieved,
                {
                    "achieved": [
                        sconf.originX_onPicture, //492,
                        sconf.originY_onPicture, //565
                    ]
                }
            );
            //todm: without this diagram does not return back
            //immediately, only after a click
            var ach = rg[ "media-mover" ].achieved.achieved;
            sconf.modorInPicX = ach[0];
            sconf.modorInPicY = ach[1];
        }
        //------------------------------------------------
        // \\// returns diagram back at every menu click
        //------------------------------------------------

        var media_scale         = toreg( 'media_scale' )();
        rg.media_scale.value    = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );
        rg.f.caption = '';

        //==================================================
        // //\\ decorations
        // //\\ hiding
        //==================================================
        [
        //sample
        //'q',
        //'p',
        //'vSample',
        //'l',
        //'ll',
        //'l,ll',
        //'Ys',
        //'S,Ys',

        //body
        'DS',
        'DH',
        'PK',
        'SK',

        //body local
        'Y',
        'SY',
        'PY',
        'vb',
        'P,vb',
        'omegaHandle',
        'P,omegaHandle',

        'VV',
        'P,VV',
        'VV',
        'u',

        'Tv',
        'FO',
        'PQ',
        'SL',
        'BH',
        'instanttriangle',

        //orbit as a whole
        'L,LL',
        'L',
        'orbitarea',
        'Tu',
        'u,VV',
        'uP',
        ].forEach( i => {
            rg[i].undisplay = true;
        });

        [
            'f',
            'L',
            'K',
            'omegaHandle',
            'vb',
        ].forEach( i => {
            rg[i].hideD8Dpoint = true;
        });
        //==================================================
        // \\// hiding
        //==================================================
        ssF.amode2rgstate_decorator();
        //==================================================
        // \\// decorations
        //==================================================

        ssF.amode2rgstate_model();
        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }
})();