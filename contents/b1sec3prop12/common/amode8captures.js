( function() {
    var {
        ns, sn, nspaste, capture, toreg, mat,
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
            //todm: without this diagram does not return back immediately, only after a click
            var ach = rg[ "media-mover" ].achieved.achieved;
            sconf.modorInPicX = ach[0];
            sconf.modorInPicY = ach[1];
        }
        //------------------------------------------------
        // \\// returns diagram back at every menu click
        //------------------------------------------------

        var media_scale = toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        var op = sconf.orbitParameters;
        op.mainAxisAngle = op.mainAxisAngle_initial;
        op.latus = op.latusInitial;

        stdMod.establishesEccentricity( op.initialEccentricity )

        rg.P.q      = sconf.PparQ;
        nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( sconf.PparQ ));
        if( fconf.sappId === "b1sec3prop14" ) {
            nspaste( rg.Fi.pos, [
                0.3 * Math.cos( op.mainAxisAngle ),
                0.3 * Math.sin( op.mainAxisAngle ),
             ]);
             rg.P.abs = mat.unitVector( rg.P.pos ).abs;
        } else {
            nspaste( rg.Fi.pos, [ rg.P.pos[0] / 2, rg.P.pos[1] / 2, ] );
        }
        op.sagittaDelta_q = op.sagittaDelta_q_initial;

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        rg.S.pos[0] = 0;
        rg.S.pos[1] = 0;
        //rg.H.pos[0] = op.secondFocus;
        //rg.H.pos[1] = 0;
        //rg.C.pos[0] = op.secondFocus/2;
        //rg.C.pos[1] = 0;

        var isAdden = aspect === 'addendum';

        // //\\ hiding
        rg[ 'L,LL' ].undisplay = true;
        rg.L.undisplay = true;
        rg.VV.undisplay = true;
        rg[ 'P,VV' ].undisplay = true;
        rg.VV.undisplay = true;
        rg.u.undisplay = true;

        rg.Tv.undisplay = true;
        rg.FO.undisplay = true;
        rg.PQ.undisplay = true;

        rg.Tu.undisplay = true;
        rg[ 'u,VV' ].undisplay = true;
        rg.uP.undisplay = true;
        // \\// hiding

        var un0display = false;
        if( fconf.sappId === "b1sec3prop14" ) {
            var un0display = true;
        }

        rg.PI.undisplay = un0display;
        rg.E.undisplay = un0display;
        rg.EP.undisplay = un0display;
        rg.DK.undisplay = un0display;
        rg.EO.undisplay = un0display;
        rg.E.undisplay = un0display;
        rg.PO.undisplay = un0display;
        rg.GP.undisplay = un0display;
        rg.G.undisplay = un0display;
        rg.K.undisplay = un0display;
        rg.D.undisplay = un0display;
        rg.A.undisplay = un0display;
        rg.B.undisplay = un0display;
        rg.T.undisplay = un0display;
        rg.Q.undisplay = un0display;
        rg.ES.undisplay = un0display;
        rg.EI.undisplay = un0display;
        rg.v.undisplay = un0display;
        rg.x.undisplay = un0display;
        rg.Qx.undisplay = un0display;
        rg.Pv.undisplay = un0display;
        rg.Qv.undisplay = un0display;
        rg.Gv.undisplay = un0display;
        rg.QT.undisplay = un0display;
        rg.PT.undisplay = un0display;
        rg.QR.undisplay = un0display;
        rg.HI.undisplay = un0display;
        rg.PH.undisplay = un0display;
        rg.I.undisplay = un0display;
        rg.H.undisplay = un0display;
        rg.F.undisplay = un0display;
        rg.PF.undisplay = un0display;
        rg.Z.undisplay = un0display;
        rg.Zminus.undisplay = un0display;
        rg.R.undisplay = un0display;
        rg.PC.undisplay = un0display;
        rg.C.undisplay = un0display;

        //=====================================================
        // //\\ alternates for addendum
        //=====================================================
        rg.OS.undisplay = true;
        rg.SQ.undisplay = true;

        rg.GO.undisplay = true;
        rg.AO.undisplay = true;
        rg.DO.undisplay = true;
        rg.BO.undisplay = true;

        rg[ 'P,tCircleCenter' ].undisplay = true;
        rg.tCircleCenter.undisplay = true;
        rg.tangentCircle.undisplay = true;
        //=====================================================
        // \\// alternates for addendum
        //=====================================================

        rg.M.undisplay = true;
        rg.PM.undisplay = true;
        rg.OM.undisplay = true;
        rg.ON.undisplay = true;
        rg.SA.undisplay = true;
        rg.Tx.undisplay = true;
        rg.SM.undisplay = true;
        rg.NP.undisplay = true;
        rg.N.undisplay = true;
        rg[ 'ZetaStart,ZetaEnd' ].undisplay = false;

        if( "b1sec3prop13" === fconf.sappId ) {
            ////parabola
            rg.M.undisplay = false;
            rg.N.undisplay = false;
            rg.PM.undisplay = false;
            rg.OM.undisplay = false;
            rg.ON.undisplay = false;
            rg['P,Zminus'].undisplay = false;
            rg.SA.undisplay = false;
            rg.Tx.undisplay = false;
            rg.SM.undisplay = false;
            rg.NP.undisplay = false;
            rg[ 'ZetaStart,ZetaEnd' ].undisplay = true;
        }

        if( fconf.sappId === "b1sec3prop14" || "b1sec3prop13" === fconf.sappId ) {
            rg.G.undisplay = true;
            rg.AT.undisplay = true;
            rg.AA.undisplay = true;
            rg.B.undisplay = true;
            rg.BB.undisplay = true;
            rg[ 'B,BB' ].undisplay = true;
            rg[ 'CB' ].undisplay = true;

            rg.BO.undisplay = true;
            rg.D.undisplay = true;
            rg.K.undisplay = true;
            rg.DK.undisplay = true;
            rg.PH.undisplay = true;
            rg.H.undisplay = true;
            rg.OH.undisplay = true;
            rg.DO.undisplay = true;
            rg.EO.undisplay = true;
            rg.FO.undisplay = true;
            rg.EP.undisplay = true;
            rg.ES.undisplay = true;
            rg.PE.undisplay = true;

            rg.PF.undisplay = true;
            rg.PC.undisplay = true;
            rg[ 'P,VV' ].undisplay = true;
            rg.PI.undisplay = true;
            rg.Zminus.undisplay = true;
        }

        if( fconf.sappId === "b1sec3prop14" ) {
            rg.C.undisplay = false;
            rg.R.undisplay = false;
            rg.Q.undisplay = false;
            rg.QR.undisplay = false;
            rg.T.undisplay = false;
            rg.QT.undisplay = false;
            rg[ 'L,LL' ].undisplay = false;
            rg.L.undisplay = false;

            rg.G.undisplay = true;
            rg.I.undisplay = true;
            rg.F.undisplay = true;
            //rg.D.undisplay = true;

            rg.CD.undisplay = true;
            rg.EC.undisplay = true;
            rg.D.undisplay = true;
            rg.N.undisplay = true;
            //rg.u.undisplay = true;
            //rg.A.undisplay = true;
            rg.xv.undisplay = true;
            rg.M.undisplay = true;
            rg.O.undisplay = true;
        }

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();

