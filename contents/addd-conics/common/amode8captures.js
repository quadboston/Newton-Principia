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

        rg.VV.undisplay = true;
        rg[ 'P,VV' ].undisplay = true;
        rg[ 'FF,P' ].undisplay = true;

        rg.VV.undisplay = true;
        rg.u.undisplay = true;

        rg.u.undisplay = true;
        rg.Tv.undisplay = true;
        rg.FO.undisplay = true;
        rg.PQ.undisplay = true;
        rg.ZR.undisplay = true;
        rg.EO.undisplay = true;

        rg.Tu.undisplay = true;
        rg[ 'u,VV' ].undisplay = true;
        rg.uP.undisplay = true;
        rg.OS.undisplay = true;

        // //\\ another solution
        rg.PI.undisplay = true;
        rg.R.undisplay = true;
        // \\// another solution

        rg[ 'FF,O' ].undisplay = true;
        rg[ 'S,FF' ].undisplay = true;
        rg[ 'FF' ].undisplay = true;

        //=====================================================
        // //\\ alternates for hideExtras
        //=====================================================
        var hideExtras = true;
        rg.G.undisplay = hideExtras;
        rg.GP.undisplay = hideExtras;
        rg.GO.undisplay = hideExtras;
        rg.K.undisplay = hideExtras;
        rg.D.undisplay = hideExtras;
        rg.F.undisplay = hideExtras;
        rg.PF.undisplay = hideExtras;
        rg.B.undisplay = hideExtras;
        rg.T.undisplay = hideExtras;
        rg.Q.undisplay = hideExtras;
        rg.Z.undisplay = hideExtras;
        rg.Zminus.undisplay = hideExtras;
        rg.ES.undisplay = hideExtras;
        rg.EI.undisplay = hideExtras;

        rg.v.undisplay = hideExtras;
        rg.x.undisplay = hideExtras;
        rg.Qx.undisplay = hideExtras;
        rg.Pv.undisplay = hideExtras;
        rg.Qv.undisplay = hideExtras;
        rg.vG.undisplay = hideExtras;
        rg.QT.undisplay = hideExtras;
        rg.PT.undisplay = hideExtras;
        rg.QR.undisplay = hideExtras;
        rg.SQ.undisplay = hideExtras;

        rg.DO.undisplay = hideExtras;
        rg.BO.undisplay = hideExtras;
        rg.PC.undisplay = hideExtras;
        rg[ 'P,tCircleCenter' ].undisplay = hideExtras;
        rg.tCircleCenter.undisplay = hideExtras;
        rg.tangentCircle.undisplay = hideExtras;

        rg.HI.undisplay = hideExtras;
        rg.PH.undisplay = hideExtras;
        rg.I.undisplay = hideExtras;
        rg.H.undisplay = hideExtras;
        //=====================================================
        // \\// alternates for hideExtras
        //=====================================================

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( !'doUndetected' );
        return captured;
    }

}) ();

