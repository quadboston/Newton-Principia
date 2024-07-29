( function() {
    var {
        ns, sn, nspaste, capture, toreg,
        sDomF, ssD, ssF, fconf,
        studyMods, amode, rg, sconf,
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
        var { theorion, aspect, submodel, subessay } = amode;
        var stdMod = studyMods[ submodel ];

        var media_scale = toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );
        toreg( 'sForSagitta' )( 'val', sconf.sForSagitta_valQ );
        nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( sconf.PparT ));

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        rg.S.pos[0] = -sconf.ellipseFocus*1.2;
        rg.S.pos[1] = sconf.ellipseFocus*0.3; //0;
        rg.FF.pos[0] = -sconf.ellipseFocus;
        rg.FF.pos[1] = 0;

        rg.H.pos[0] = sconf.ellipseFocus;
        rg.H.pos[1] = 0;


        [
            'VV',
            'P,VV',
            'FF,P',
            'u',
            'Tv',
            'FO',
            'PQ',
            'ZR',
            'EO',
            'Tu',
            'u,VV',
            'uP',
            'OS',

            // //\\ another solution
            'PI',
            'R',
            // \\// another solution

            'FF,O',
            'S,FF',
            'FF',
        ].forEach( nam => {
            rg[ nam ].undisplay = true;
        });



        //=====================================================
        // //\\ alternates for hideExtras
        //=====================================================
        [
            'G',
            'GP',
            'GO',
            'K',
            'D',
            'F',
            'PF',
            'B',
            'T',
            'Q',
            'Z',
            'Zminus',
            'ES',
            'EI',

            'v',
            'x',
            'Qx',
            'Pv',
            'Qv',
            'vG',
            'QT',
            'PT',
            'QR',
            'SQ',

            'DO',
            'BO',
            'PC',
            'P,tCircleCenter',
            'tCircleCenter',
            'tangentCircle',

            'HI',
            'PH',
            'I',
            'H',
        ].forEach( nam => {
            rg[ nam ].undisplay = true;
        });
        //=====================================================
        // \\// alternates for hideExtras
        //=====================================================

        {
            let vis = subessay === 'interval' ? 'visible' : 'hidden';
            stdMod.svgScene$.css( 'visibility', vis );
            stdMod.graphFW.container$.css( 'visibility', vis );
        }

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( !'doUndetected' );
        return captured;
    }

}) ();

