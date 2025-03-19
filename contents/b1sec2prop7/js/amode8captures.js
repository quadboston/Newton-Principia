( function() {
    var {
        ns, sn, nspaste, capture, userOptions,
        amode, toreg, stdMod, rg, sDomF, ssD, ssF, fconf, sconf,
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
        var { logic_phase, aspect, subessay } = amode;
        sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
            fp.rgX.undisplay = true;
        });

        //----------------------------------
        // //\\ common values
        //----------------------------------
        rg[ 'sagitta' ].undisplay = true;
        rg.curvatureCircle.undisplay = false;
        var media_scale = toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value );

        //interval of t to construct an arc for
        //Newton's sagitta
        //toreg( 'sForSagitta' )( 'val', 0.210 );
        toreg( 'sForSagitta' )( 'val', 0.310 );

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible
        if( !userOptions.showingBonusFeatures() ) {
            rg[ 'S,nonSolvablePoint' ].undisplay = true;
            rg[ 'nonSolvablePoint' ].undisplay = true;
        }


        rg.SQ.undisplay = true;
        rg[ 'sagitta' ].undisplay = true;
        rg[ 'rrminus' ].undisplay = true;
        rg[ 'Q,rrminus' ].undisplay = true;
        rg[ 'P,rrminus' ].undisplay = true;
        rg.curvatureCircle.undisplay = true;
        rg.C.undisplay = false;
        rg.PC.undisplay = true;
        rg.timearc.undisplay = true;
        rg.Q.hideD8Dpoint = false;
        rg.Q.d8d_find_is_LOCKED = false;
        //----------------------------------
        // \\// common values
        //----------------------------------


        if( subessay === 'corollary2' || subessay === 'corollary3' ){
            sDomF.detected_user_interaction_effect( !'doUndetected' );
            nspaste( rg.A.pos, rg[ 'approximated-curve' ].t2xy(
                -0.5, //chosen value for A
            ));
            nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy(
                0.5, //chosen value for P
            ));
            var Ss = Math.PI * 1.2;
            var S = rg[ 'approximated-curve' ].t2xy( Ss );
            rg.S.pos[0] = S[0]*0.4;
            rg.S.pos[1] = S[1]*0.4;

            var Rcol2_s = Math.PI * 0.75;
            var Rcol2 = rg[ 'approximated-curve' ].t2xy( Rcol2_s );
            rg.Rcol2.pos[0] = Rcol2[0]*0.4;
            rg.Rcol2.pos[1] = rg.P.pos[1]; //Rcol2[1]*0.4;
            setsCoroll2( !!'yes0not' );

        } else {
            nspaste( rg.A.pos,
                [-0.6030729600066013, 0.13447833820836858] //Book's value
            );
            nspaste( rg.S.pos,
                [-0.6030729600066013, 0.13447833820836858] //Book's value
            );
            nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy(
                0.7262954797868 // Book's value for P
            ));
            setsCoroll2( !'yes0not' );
            if( subessay === 'corollary1' ) {
                ////placing S to the circle
                nspaste( rg.S.pos, [-0.9997779468574, -0.0210731450212] );
            }
            sDomF.detected_user_interaction_effect( subessay !== 'corollary1' );
        }

        ssD.stashedVisibility = null;
        stdMod.curveIsSolvable();
        sDomF.detected_user_interaction_effect( 'doShowDiagram' );
        return captured;
    }



    function setsCoroll2( yes0not )
    {
        rg.QP.undisplay = yes0not;
        rg.Q.undisplay = yes0not;
        rg.Y.undisplay = yes0not;
        rg.L.undisplay = yes0not;
        rg.R.undisplay = yes0not;
        rg.Z.undisplay = yes0not;
        rg.T.undisplay = yes0not;

        rg.QR.undisplay = yes0not;
        rg.QT.undisplay = yes0not;
        rg.PT.undisplay = yes0not;
        rg.ZQ.undisplay = yes0not;
        rg.RL.undisplay = yes0not;
        rg.SY.undisplay = yes0not;
        rg.AP.undisplay = yes0not;
        rg.AV.undisplay = yes0not;
        rg.QP.undisplay = yes0not;
        rg[ 'P,sagitta' ].undisplay = yes0not;

        rg.Tcol2.undisplay = !yes0not;
        rg.Rcol2.undisplay = !yes0not;
        rg.Gcol2.undisplay = !yes0not;
        rg[ 'Rcol2,Tcol2' ].undisplay = !yes0not;
        rg[ 'Tcol2,V' ].undisplay = !yes0not;
        rg[ 'Gcol2,S' ].undisplay = !yes0not;
        rg[ 'Gcol2,P' ].undisplay = !yes0not;
        rg[ 'Rcol2,P' ].undisplay = !yes0not;
    }

}) ();

