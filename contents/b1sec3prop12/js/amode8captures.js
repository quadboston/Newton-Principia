( function() {
    var { ns, sn, has, nspaste, capture, toreg, mat, sDomF, ssD, ssF, fconf, stdMod, amode,
        rg, sconf, } = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
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
        var { logic_phase, aspect, subessay } = amode;
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



        var isAdden = aspect === 'addendum';

        //==================================================
        // //\\ decorations
        //==================================================

        rg.f.caption = '';

        //==================================================
        // //\\ hiding
        //==================================================
        [

        //sample
        'q',
        'p',
        'vSample',
        'l',
        'll',
        'l,ll',
        'orbitarea-sample',
        'Ys',
        'S,Ys',

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
            'vSample',
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





        //==================================================
        // //\\ decorations alternating
        //==================================================
        var undisplay14 = fconf.effId === "b1sec3prop14";
        [
            ////hides all of them in this effId
            'PI',
            'E',
            'EP',
            'DK',
            'EO',
            'E',
            'PO',
            'GP',
            'G',
            'K',
            'D',
            'A',
            'B',
            'T',
            'ES',
            'EI',
            'v',
            'x',
            'Qx',
            'Pv',
            'Qv',
            'Gv',
            'PT',
            'HI',
            'PH',
            'I',
            'H',
            'F',
            'PF',
            'Z',
            'Zminus',
            'PC',
            'C',
        ].forEach( i => {
            rg[i].undisplay = undisplay14;
        });

        if( fconf.effId === "b1sec3prop14" ) {
            rg.Y.undisplay = false;

            rg.PY.undisplay = false;
            rg.SL.undisplay = false;
            rg.C.undisplay = false;
            rg.R.undisplay = false;
            rg.Q.hideD8Dpoint = true;

            rg.T.undisplay = false;
            rg[ 'L,LL' ].undisplay = false;
            rg.L.undisplay = false;

            rg.I.undisplay = true;
            rg.F.undisplay = true;

            rg.CD.undisplay = true;
            rg.EC.undisplay = true;
            rg.xv.undisplay = true;
            rg.O.undisplay = true;
            rg.instanttriangle.undisplay = fconf.sappId === "b1sec3prop15" ? true : false;
        }

        if( fconf.effId === "b1sec3prop14" || "b1sec3prop13" === fconf.sappId ) {
            rg.G.undisplay = true;
            rg.AT.undisplay = true;
            rg.AA.undisplay = true;
            rg.B.undisplay = true;
            rg.BB.undisplay = true;
            rg[ 'B,BB' ].undisplay = true;
            rg[ 'CB' ].undisplay = true;

            rg.D.undisplay = true;
            rg.K.undisplay = true;
            rg.DK.undisplay = true;
            rg.PH.undisplay = true;
            rg.H.undisplay = true;
            rg.OH.undisplay = true;
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


        //=========================================
        // //\\ parabola: b1sec3prop12
        //=========================================
        if( "b1sec3prop12" === fconf.sappId ) {
            rg.Fi.undisplay = true;
            rg.Fi.hideD8Dpoint = true;
            rg['O,Fi'].undisplay = true;
        }
        //=========================================
        // \\// parabola: b1sec3prop12
        //=========================================


        //=========================================
        // //\\ parabola: b1sec3prop13
        //=========================================
        if( "b1sec3prop13" === fconf.sappId ) {
            ////parabola hiding
            rg[ 'ZetaStart,ZetaEnd' ].undisplay = true;
            rg.S.hideD8Dpoint = true;
            rg.O.undisplay = true;
            
            rg.Fi.undisplay = true;
            rg.Fi.hideD8Dpoint = true;
            rg['O,Fi'].undisplay = true;
        }
        {
            ////parabola showing
            let und = "b1sec3prop13" !== fconf.sappId;
            [
                'M',
                'N',
                'PM',
                'OM',
                'ON',
                'SA',
                'Tx',
                'SM',
                'NP',
            ].forEach( i => {
                rg[i].undisplay = und;
            });
        }
        //=========================================
        // \\// parabola: b1sec3prop13
        //=========================================

        if( "b1sec3prop14" === fconf.sappId ) {
            rg.vb.hideD8Dpoint = false;
            rg.vb.undisplay = false;
            rg[ 'P,vb' ].undisplay = false;
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
            rg.Q.undisplay = true;

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
            rg.SY.undisplay = false;
            rg.vb.hideD8Dpoint = true;
            rg.vb.undisplay = true;
            rg.PY.undisplay = false;

            rg.Y.undisplay = false;
            rg.omegaHandle.undisplay = false;
            rg.omegaHandle.hideD8Dpoint = false;
            rg[ 'P,omegaHandle' ].undisplay = false;

            rg.L.hideD8Dpoint = false;
            stdMod.imgRk.dom$.css( 'visibility', 'visible' );
            stdMod.svgScene$.css( 'visibility', 'visible' );
            if( logic_phase === 'corollary' ) {
                if( subessay === "corollary1" ) {
                    ////latus on others: swaps latus and speed
                    rg.vb.hideD8Dpoint = false;
                    rg.L.hideD8Dpoint = true;
                } else {
                    stdMod.imgRk.dom$.css( 'visibility', 'hidden' );
                    stdMod.svgScene$.css( 'visibility', 'hidden' );
                }
            }
        }


        if( fconf.sappId === 'b1sec3prop17' ) {
            //-------------------------------------------------
            // //\\ decorations 
            //-------------------------------------------------
            rg.instanttriangle.undisplay = true;
            rg[ 'orbitarea-sample' ].undisplay = false;
            rg['S,Ys'].undisplay = false;

            //rg.omega.undisplay = false;
            rg.K.undisplay = false;
            rg.D.undisplay = false;
            rg.CD.undisplay = false;

            rg.A.undisplay = false;
            rg.B.undisplay = false;
            rg.CB.undisplay = false;

            rg.Y.undisplay = true;
            rg.omegaHandle.undisplay = true;
            rg.omegaHandle.hideD8Dpoint = true;
            rg[ 'P,omegaHandle' ].undisplay = true;
            rg.SY.undisplay = false;
            rg.PY.undisplay = false;
            rg.T.undisplay = true;
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
            rg['P,Zminus'].undisplay = true;
            rg['Zminus'].undisplay = true;
            rg['ZR'].undisplay = true;
            rg['PZ'].undisplay = true;
            rg['PR'].undisplay = false;
            //-------------------------------------------------
            // \\// decorations 
            //-------------------------------------------------



            //-------------------------------------------------
            // //\\ conditional decorations
            //-------------------------------------------------
            {
                //// addendum. comparision.
                let rgSam = rg[ 'approximated-curve-sample' ];
                let disp = aspect === 'addendum' && subessay === 'comparing-proof-steps' ?
                           'none' : 'block';
                if( has( rgSam, 'polylineSvg$' ) ) {
                    rgSam.polylineSvg$.css( 'display', disp );
                }
                let rgA = rg[ 'orbitarea-sample' ];
                if( has( rgA, 'areaSvg$' ) ) {
                    rgA.areaSvg$.css( 'display', disp );
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

            if( aspect === 'addendum' ) {
                rg.SY.undisplay = false;
                rg.PY.undisplay = false;
                rg[ 'P,omegaHandle' ].undisplay = false;
                rg.omegaHandle.undisplay = false;
                rg.omegaHandle.hideD8Dpoint = false;
                rg.f.caption = '𝛾';
            }
            if( logic_phase === 'scholium' ||
                    ( amode.subessay === 'corollary3' || amode.subessay === 'corollary4' )
            ){
                var imgVisib = 'hidden';
                //// scholium
                rg.omegaHandle.hideD8Dpoint = true;
                rg[ 'P,omegaHandle' ].undisplay = true;
            } else {
                var imgVisib = 'visible';
                rg.vb.hideD8Dpoint = false;
                rg.vb.undisplay = false;
                rg['P,vb'].undisplay = false;
            }
            stdMod.imgRk.dom$.css( 'visibility', imgVisib );
            stdMod.svgScene$.css( 'visibility', imgVisib );
            if( logic_phase === 'corollary' && amode.subessay === 'corollary2' ){
                rg.vSample.hideD8Dpoint = true;
            }
            //-------------------------------------------------
            // \\// conditional decorations
            //-------------------------------------------------
        }
        //==================================================
        // \\// decorations alternating
        //==================================================
        // \\// decorations
        //==================================================






        //=============================================================
        // //\\ model
        //=============================================================
        var op           = sconf.orbitParameters;
        op.mainAxisAngle = op.mainAxisAngle_initial;

        // //\\ "draws" conics and P
        //1
        op.latus         = op.latusInitial;
        //2
        stdMod.establishesEccentricity( op.initialEccentricity )
        if( fconf.sappId === "b1sec3prop17" ) {
            op.PparQ_initial = op.PparQ_initial_essay
            if( logic_phase === 'corollary' &&
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

        rg.S.pos[0] = 0;
        rg.S.pos[1] = 0;

        rg.P.posInitialUnitVector = mat.unitVector( rg.P.pos );
        op.Kepler_g = op.Kepler_gInitial;
        op.Kepler_v = op.Kepler_v_initial; //this supposed to be redundant
        op.delta_t  = op.delta_t_initial;
        nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );
        op.sagittaDelta_q = op.sagittaDelta_q_initial;

        if( fconf.sappId === "b1sec3prop16" ) {
            op.cosOmega = op.cosOmega_initial;
            op.om       = op.om_initial;
        }

        if (sconf.Fi_distance != null) {
            if( fconf.effId === "b1sec3prop14" ) {
                //op.delta_t = op.delta_t_initial;
                rg.P.abs = mat.unitVector( rg.P.pos ).abs;
                nspaste( rg.Fi.pos, [
                    sconf.Fi_distance * Math.cos( op.mainAxisAngle ),
                    sconf.Fi_distance * Math.sin( op.mainAxisAngle ),
                ]);
            } else {
                nspaste( rg.Fi.pos, [
                    sconf.Fi_distance * Math.cos( rg.P.q ),
                    sconf.Fi_distance * Math.sin( rg.P.q ),
                ]);
            }
        }
        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible


        if( fconf.sappId === 'b1sec3prop17' ) {
            //-------------------------------------------------
            // //\\ op 
            //-------------------------------------------------
            op.cosOmega = op.cosOmega_initial;
            op.om       = op.om_initial;
            if( logic_phase === 'corollary' &&
                ( amode.subessay === 'corollary1' || amode.subessay === 'corollary2' )
            ){
                op.om = 1;
                op.cosOmega = 0;

                rg.Q.undisplay = true;
                rg.P.q      = 0;;
                //op.Kepler_v = op.Kepler_v_initial;
                //op.delta_t = op.delta_t_initial;
                nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( rg.P.q ));

                rg.omegaHandle.undisplay = true;
                rg.omegaHandle.hideD8Dpoint = true;
                nspaste( rg.omegaHandle.pos, [ rg.P.pos[0], 0.7 ] );
                rg.P.abs = mat.unitVector( rg.P.pos ).abs;
            }
            //-------------------------------------------------
            // \\// op 
            //-------------------------------------------------



            //-------------------------------------------------
            // //\\ sop 
            //-------------------------------------------------
            var sop      = sconf.sampleOrbitParameters;
            sop.latus    = sop.latusInitial;
            sop.Kepler_g = op.Kepler_gInitial;
            sop.Kepler_v = sop.Kepler_v_initial;
            sop.cosOmega = sop.cosOmega_initial;
            sop.om       = sop.om_initial;
            if( logic_phase === 'corollary' && amode.subessay === 'corollary2' ){
                sop.om = 1;
                sop.cosOmega = 0;
                sop.latus = sop.corII_DVect.abs;
                stdMod.establishesEccentricity(
                    0,
                    null,
                    sop,
                );
                sop.corII_speed = Math.sqrt( op.Kepler_g / sop.corII_DVect.abs );
                sop.Kepler_v    = sop.corII_speed;
                rg.p.q          = 0;
                sop.mainAxisAngle = 0;
                sop.r2axisX_angle = 0;
            } else {
                rg.p.q      = sop.PparQ_initial;
                sop.latus   = sop.latusInitial;
                stdMod.establishesEccentricity(
                    sop.initialEccentricity,
                    null,
                    sop,
                );
                sop.r2axisX_angle = sop.r2axisX_angle_initial;
                sop.mainAxisAngle = sop.r2axisX_angle - rg.p.q;
            }
            sop.delta_t  = sop.delta_t_initial;
            //-------------------------------------------------
            // \\// sop 
            //-------------------------------------------------
        }
        //=============================================================
        // \\// model
        //=============================================================

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();

