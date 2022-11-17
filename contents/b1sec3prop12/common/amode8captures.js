( function() {
    var {
        ns, sn, has, nspaste, capture, toreg, mat,
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

        var media_scale         = toreg( 'media_scale' )();
        rg.media_scale.value    = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        var op           = sconf.orbitParameters;
        op.mainAxisAngle = op.mainAxisAngle_initial;

        // //\\ "draws" conics and P
        //1
        op.latus         = op.latusInitial;
        //2
        stdMod.establishesEccentricity( op.initialEccentricity )
        if( fconf.sappId === "b1sec3prop17" ) {
            op.PparQ_initial = op.PparQ_initial_essay
            if( theorion === 'corollary' &&
                ( amode.subessay === 'corollary1' || amode.subessay === 'corollary2' )
            ){
                op.PparQ_initial = 0;
            }
        }
        //3
        rg.P.q      = op.PparQ_initial;
        //4
        nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( op.PparQ_initial ));
        // \\// "draws" conics and P

        rg.P.posInitialUnitVector = mat.unitVector( rg.P.pos );
        op.Kepler_g = op.Kepler_gInitial; //todo who is redundant?
        op.Kepler_v = op.Kepler_v_initial; //todo who is redundant?
        op.delta_t  = op.delta_t_initial;
        nspaste( rg.Yhandle.pos, rg.Yhandle.initialPos );
        op.sagittaDelta_q = op.sagittaDelta_q_initial;

        if( fconf.sappId === "b1sec3prop17" ) {
            var sop = sconf.sampleOrbitParameters;
            sop.latus = sop.latusInitial;
            sop.Kepler_g = op.Kepler_gInitial;
            sop.Kepler_v = sop.Kepler_v_initial;
            if( theorion === 'corollary' && amode.subessay === 'corollary2' ){
                sop.latus = sop.corII_DVect.abs;
                stdMod.establishesEccentricity(
                    0, //sop.initialEccentricity,
                    null,
                    sop,
                );
                sop.corII_speed = Math.sqrt( op.Kepler_g / sop.corII_DVect.abs );
                sop.Kepler_v    = sop.corII_speed;
                rg.p.q          = 0;
                //nspaste( rg.p.pos, sop.corII_Dpos );
                sop.mainAxisAngle = 0;

            } else {
                rg.p.q      = sop.PparQ_initial;
                sop.latus   = sop.latusInitial;
                stdMod.establishesEccentricity(
                    sop.initialEccentricity,
                    null,
                    sop,
                );
                //nspaste( rg.p.pos, rg.p.proofPos );
                sop.mainAxisAngle = sop.r2axisX_angle - rg.p.q;
            }
            sop.delta_t  = sop.delta_t_initial;
        }
        rg.S.pos[0] = 0;
        rg.S.pos[1] = 0;

        if( fconf.effId === "b1sec3prop14" ) {
            op.delta_t = op.delta_t_initial;
            rg.P.abs = mat.unitVector( rg.P.pos ).abs;
            rg.instanttriangle.undisplay = fconf.sappId === "b1sec3prop15" ? true : false;
            nspaste( rg.Fi.pos, [
                sconf.Fi_distance * Math.cos( op.mainAxisAngle ),
                sconf.Fi_distance * Math.sin( op.mainAxisAngle ),
            ]);
        } else {
            //nspaste( rg.Fi.pos, [ rg.P.pos[0] * 1.2, rg.P.pos[1] * 1.2, ] );
            rg.instanttriangle.undisplay = true;
            nspaste( rg.Fi.pos, [
                sconf.Fi_distance * Math.cos( rg.P.q ),
                sconf.Fi_distance * Math.sin( rg.P.q ),
            ]);
        }

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible


        var isAdden = aspect === 'addendum';









        // //\\ hiding
        rg.DS.undisplay = true;
        rg.DH.undisplay = true;
        rg.PK.undisplay = true;
        rg.SK.undisplay = true;
        rg.K.hideD8Dpoint = true;

        rg[ 'L,LL' ].undisplay = true;
        rg.L.undisplay = true;
        rg.L.hideD8Dpoint = true;

        rg.Y.undisplay = true;
        rg.Yhandle.undisplay = true;
        rg.Yhandle.hideD8Dpoint = true;
        rg[ 'P,Yhandle' ].undisplay = true;

        rg.VV.undisplay = true;
        rg[ 'P,VV' ].undisplay = true;
        rg.VV.undisplay = true;
        rg.u.undisplay = true;

        rg.Tv.undisplay = true;
        rg.FO.undisplay = true;
        rg.PQ.undisplay = true;
        rg.SL.undisplay = true;
        rg.SY.undisplay = true;
        rg.PY.undisplay = true;
        rg.BH.undisplay = true;

        rg.f.caption = '';
        rg.q.undisplay = true;
        rg.p.undisplay = true;
        rg.vSample.undisplay = true;
        rg.vSample.hideD8Dpoint = true;
        rg.f.hideD8Dpoint = true;
        rg.l.undisplay = true;
        rg.ll.undisplay = true;
        rg[ 'l,ll' ].undisplay = true;
        rg[ 'orbitarea-sample' ].undisplay = true;

        rg.orbitarea.undisplay = false;
        rg[ 'orbitarea' ].undisplay = true;

        rg.Tu.undisplay = true;
        rg[ 'u,VV' ].undisplay = true;
        rg.uP.undisplay = true;
        // \\// hiding

        var un0display = false;
        if( fconf.effId === "b1sec3prop14" ) {
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
        rg.R.undisplay = rg.R.hideD8Dpoint = false;
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
        rg.R.hideD8Dpoint = true;
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
            rg.S.hideD8Dpoint = true;
            rg.O.undisplay = true;
        }

        if( fconf.effId === "b1sec3prop14" || "b1sec3prop13" === fconf.sappId ) {
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

        if( fconf.effId === "b1sec3prop14" ) {
            rg.DH.undisplay = true;
            rg.Y.undisplay = false;
            rg.PY.undisplay = false;
            rg.SL.undisplay = false;
            rg.C.undisplay = false;
            rg.R.undisplay = rg.R.hideD8Dpoint = false;
            rg.Q.undisplay = false;
            rg.Q.hideD8Dpoint = true;

            rg.QR.undisplay = false;
            rg.T.undisplay = false;
            rg.QT.undisplay = false;
            rg[ 'L,LL' ].undisplay = false;
            rg.L.undisplay = false;
            //apparently this is not needed: rg.L.hideD8Dpoint = false;

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

        if( fconf.sappId === "b1sec3prop15" ) {
            rg.Y.undisplay = true;
            rg.PY.undisplay = true;
            rg.PR.undisplay = true;
            rg.SP.undisplay = true;
            rg.QT.undisplay = true;
            rg.QR.undisplay = true;
            rg.PQ.undisplay = true;
            rg.ST.undisplay = true;
            rg.ST.undisplay = true;
            rg['P,Zminus'].undisplay = true;
            rg.Z.undisplay = true;
            rg.Zminus.undisplay = true;
            rg.R.undisplay = true;
            rg.R.undisplay = rg.R.hideD8Dpoint = true;
            rg.Q.undisplay = true;
            rg.Q.hideD8Dpoint = true;

            rg.P.undisplay = true;
            rg.Fi.undisplay = true;
            rg.Fi.hideD8Dpoint = true;
            rg.T.undisplay = true;
            rg.Px.undisplay = true;
            rg.PZ.undisplay = true;
            rg.ZR.undisplay = true;

            rg.A.undisplay = false;
            rg.AA.undisplay = false;
            rg.B.undisplay = false;
            rg.BB.undisplay = false;
            rg[ 'A,AA' ].undisplay = false;
            rg[ 'B,BB' ].undisplay = false;

            rg.L.hideD8Dpoint = false; //causes main axes rotation, so is disabled
        }


        if( fconf.sappId === 'b1sec3prop16' ) {
            rg.orbitarea.undisplay = true;
            rg.SY.undisplay = false;
            rg.PY.undisplay = false;

            rg.Y.undisplay = false;
            rg.Yhandle.undisplay = false;
            rg.Yhandle.hideD8Dpoint = false;
            rg[ 'P,Yhandle' ].undisplay = false;

            rg.L.hideD8Dpoint = false;
            rg.R.hideD8Dpoint = true;
            stdMod.imgRk.dom$.css( 'visibility', 'visible' );
            stdMod.svgScene$.css( 'visibility', 'visible' );
            if( theorion === 'corollary' ) {
                if( subessay === "corollary1" ) {
                    ////latus on others: swaps latus and speed
                    rg.R.hideD8Dpoint = false;
                    rg.L.hideD8Dpoint = true;
                } else {
                    stdMod.imgRk.dom$.css( 'visibility', 'hidden' );
                    stdMod.svgScene$.css( 'visibility', 'hidden' );
                }
            }
        }

        if( fconf.sappId === 'b1sec3prop17' ) {
            nspaste( rg.Yhandle.pos, rg.Yhandle.initialPos );

            rg.instanttriangle.undisplay = true;
            rg.orbitarea.undisplay = true;
            rg[ 'orbitarea-sample' ].undisplay = false;

            //rg.omega.undisplay = false;
            rg.K.undisplay = false;
            rg.D.undisplay = false;
            rg.CD.undisplay = false;

            rg.A.undisplay = false;
            rg.B.undisplay = false;
            rg.CB.undisplay = false;

            rg.Y.undisplay = true;
            rg.Yhandle.undisplay = false;
            rg.Yhandle.hideD8Dpoint = false;
            rg[ 'P,Yhandle' ].undisplay = false;
            rg.SY.undisplay = false;
            rg.PY.undisplay = false;
            rg.T.undisplay = true;
            rg.Q.undisplay = false;
            rg.QT.undisplay = true;
            rg.QR.undisplay = true;
            rg.Fi.undisplay = true;
            rg.Fi.hideD8Dpoint = true;
            rg.H.undisplay = false;
            rg.PH.undisplay = false;
            rg.BH.undisplay = false;
            rg.PK.undisplay = false;
            rg.SK.undisplay = false;
            rg.DS.undisplay = false;
            rg.DH.undisplay = false;

            rg.Q.hideD8Dpoint = true;
            rg.R.hideD8Dpoint = true;
            rg.L.hideD8Dpoint = true;
            rg.L.undisplay = true;
            rg.LL.undisplay = true;

            rg[ 'l,ll' ].undisplay = false;
            rg.q.undisplay = false;
            rg.p.undisplay = false;
            rg.vSample.undisplay = false;
            rg.vSample.hideD8Dpoint = false;
            rg[ 'p,vSample' ].undisplay = false;
            rg.f.hideD8Dpoint = false;

            rg.SL.undisplay = true;
            rg.Zeta.hideD8Dpoint = true;
            rg.Sp.undisplay = false;
            //rg[ 'ZetaStart,ZetaEnd' ].undisplay = true;
            //rg[ 'ZetaEnd' ].undisplay = true;
            //rg[ 'ZetaStart' ].undisplay = true;
            rg['P,Zminus'].undisplay = true;
            rg['Zminus'].undisplay = true;
            rg['ZR'].undisplay = true;
            rg['PZ'].undisplay = true;
            rg['PR'].undisplay = false;

            if( theorion === 'corollary' &&
                ( amode.subessay === 'corollary1' || amode.subessay === 'corollary2' )
            ){
                rg.Q.undisplay = true;
                rg.P.q      = 0;;
                //op.Kepler_v = op.Kepler_v_initial;
                //op.delta_t = op.delta_t_initial;
                nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( rg.P.q ));

                rg.Yhandle.undisplay = true;
                rg.Yhandle.hideD8Dpoint = true;
                nspaste( rg.Yhandle.pos, [ rg.P.pos[0], 0.7 ] );
                //nspaste( rg.Yhandle.pos, rg.Yhandle.initialPos );
                //stdMod.setsOmegaHandle( op.omega, sliderAbs );

                rg.P.abs = mat.unitVector( rg.P.pos ).abs;

                if( amode.subessay === 'corollary2' ) {
                    rg.vSample.hideD8Dpoint = true;
                }
            }

            if( aspect === 'addendum' ) {
                rg.SY.undisplay = false;
                rg.PY.undisplay = false;
            }
            {
                //// addendum. comparision.
                let rgXX = rg[ 'approximated-curve-sample' ];
                let disp = aspect === 'addendum' && subessay === 'comparing-proof-steps' ?
                'none' : 'block';
                if( has( rgXX, 'polylineSvg$' ) ) {
                    rgXX.polylineSvg$.css( 'display', disp );
                }
                if( has( rgXX, 'areaSvg$' ) ) {
                    rgXX.areaSvg$.css( 'display', disp );
                }
                if( subessay === 'comparing-proof-steps' ) {
                    rg.q.undisplay = true;
                    rg.SY.undisplay = true;
                    rg.PY.undisplay = true;
                    rg.vSample.undisplay = true;
                    rg.vSample.hideD8Dpoint = true;
                    rg.Sp.undisplay = true;
                    rg[ 'orbitarea-sample' ].undisplay = true;
                    rg[ 'p,vSample' ].undisplay = true;
                    rg[ 'l,ll' ].undisplay = true;
                }
            }

            {
                //// scholium
                let imgVisib = 'hidden';
                if( theorion === 'scholium' ||
                    ( amode.subessay === 'corollary3' || amode.subessay === 'corollary4' )
                ){
                    rg.Yhandle.hideD8Dpoint = true;
                    rg[ 'P,Yhandle' ].undisplay = true;
                } else {
                    imgVisib = 'visible';
                    rg.R.hideD8Dpoint = false;
                }
                stdMod.imgRk.dom$.css( 'visibility', imgVisib );
                stdMod.svgScene$.css( 'visibility', imgVisib );
            }
        }

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();

