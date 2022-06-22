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

        var op = sconf.orbitParameters;

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        rg.S.pos[0] = 0; //-2*op.ellipseFocus;
        rg.S.pos[1] = 0;
        rg.H.pos[0] = 2 * op.ellipseFocus;
        rg.H.pos[1] = 0;
        rg.C.pos[0] = op.ellipseFocus;
        rg.C.pos[1] = 0;

        var isAdden = aspect === 'addendum';

        // //\\ hiding
        rg.VV.undisplay = true;
        rg[ 'P,VV' ].undisplay = true;
        rg.VV.undisplay = true;
        rg.u.undisplay = true;

        rg.u.undisplay = true;
        rg.Tv.undisplay = true;
        rg.FO.undisplay = true;
        rg.PQ.undisplay = true;

        rg.Tu.undisplay = true;
        rg[ 'u,VV' ].undisplay = true;
        rg.uP.undisplay = true;
        var hideExtras = true; //isAdden || subessay === 'another-solution';
        // \\// hiding

        rg.PI.undisplay = false;
        rg.E.undisplay = false;
        rg.EP.undisplay = false;
        rg.DK.undisplay = false;
        rg.EO.undisplay = false;
        rg.E.undisplay = false;
        rg.PO.undisplay = false;
        rg.GP.undisplay = false;
        rg.G.undisplay = false;
        rg.K.undisplay = false;
        rg.D.undisplay = false;
        rg.A.undisplay = false;
        rg.B.undisplay = false;
        rg.G.undisplay = false;
        rg.T.undisplay = false;
        rg.Q.undisplay = false;
        rg.ES.undisplay = false;
        rg.EI.undisplay = false;
        rg.v.undisplay = false;
        rg.x.undisplay = false;
        rg.Qx.undisplay = false;
        rg.Pv.undisplay = false;
        rg.Qv.undisplay = false;
        rg.Gv.undisplay = false;
        rg.QT.undisplay = false;
        rg.PT.undisplay = false;
        rg.QR.undisplay = false;
        rg.GP.undisplay = false;
        rg.HI.undisplay = false;
        rg.PH.undisplay = false;
        rg.I.undisplay = false;
        rg.H.undisplay = false;
        rg.F.undisplay = false;
        rg.PF.undisplay = false;
        rg.Z.undisplay = false;
        rg.Zminus.undisplay = false;
        rg.R.undisplay = false;
        rg.PC.undisplay = false;
        rg.C.undisplay = false;

        //=====================================================
        // //\\ alternates for addendum
        //=====================================================
        rg.OS.undisplay = hideExtras;

        rg.SQ.undisplay = hideExtras;
        rg.GO.undisplay = hideExtras;

        rg.AO.undisplay = hideExtras;
        rg.DO.undisplay = hideExtras;
        rg.BO.undisplay = hideExtras;

        rg[ 'P,tCircleCenter' ].undisplay = hideExtras;
        rg.tCircleCenter.undisplay = hideExtras;
        rg.tangentCircle.undisplay = hideExtras;
        //=====================================================
        // \\// alternates for addendum
        //=====================================================



        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();

