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

        rg.S.pos[0] = -sconf.ellipseFocus;
        rg.S.pos[1] = 0;

        var hideAnother = subessay !== 'another-solution';
        rg.u.undisplay = hideAnother;
        rg.Tu.undisplay = hideAnother;
        rg[ 'u,VV' ].undisplay = hideAnother;
        rg.uP.undisplay = hideAnother;
        rg.PQ.undisplay = hideAnother;
        rg.tangentCircle.undisplay = hideAnother;

        stdMod.medRoot$.css( 'display',
            theorion === 'corollary' || theorion === 'scholium' ? 'none' : 'block'
        )

        //=====================================================
        // //\\ alternates for addendum
        //=====================================================
        var isAdden = aspect === 'addendum';
        //rg.S.d8d_find_is_LOCKED = rg.S.hideD8Dpoint = !isAdden;

        rg.PF.undisplay = isAdden;
        rg.GP.undisplay = isAdden;
        rg.G.undisplay = isAdden;
        rg.DK.undisplay = isAdden;
        rg.K.undisplay = isAdden;
        rg.D.undisplay = isAdden;
        rg.F.undisplay = isAdden;
        rg.A.undisplay = isAdden;
        rg.B.undisplay = isAdden;
        rg.G.undisplay = isAdden;
        rg.T.undisplay = isAdden;
        rg.Q.undisplay = isAdden;
        rg.R.undisplay = isAdden;

        rg.VV.undisplay = isAdden;
        rg.v.undisplay = isAdden;
        rg.u.undisplay = isAdden;
        rg.Pv.undisplay = isAdden;
        rg.Qv.undisplay = isAdden;
        rg.Tv.undisplay = isAdden;
        rg.vG.undisplay = isAdden;
        rg.QT.undisplay = isAdden;
        rg.PT.undisplay = isAdden;
        rg.QR.undisplay = isAdden;
        rg.SQ.undisplay = isAdden;
        rg.GO.undisplay = isAdden;
        rg.GP.undisplay = isAdden;


        rg.AO.undisplay = isAdden;
        rg.DO.undisplay = isAdden;
        rg.BO.undisplay = isAdden;
        rg.PO.undisplay = isAdden;
        rg.FO.undisplay = isAdden;
        rg[ 'P,VV' ].undisplay = isAdden;
        //rg[ 'A,AA' ].undisplay = isAdden;
        //rg[ 'B,BB' ].undisplay = isAdden;
        //=====================================================
        // \\// alternates for addendum
        //=====================================================

        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();

