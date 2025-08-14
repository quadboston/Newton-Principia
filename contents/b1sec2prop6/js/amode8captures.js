( function() {
    var { ns, sn, nspaste, has, paste, capture, userOptions, sDomF, ssD, ssF,
        fconf, sData, sconf, amode, toreg, stdMod, rg, }
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    setCapture();
    foldPointsRemovedFromTp = false;
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
        sData.GRAPH_PATH = sconf.GRAPH_PATH;
        
        sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
            fp.rgX.undisplay = true;
        });

        //----------------------------------
        // //\\ common values
        //----------------------------------
        rg[ 'sagitta' ].undisplay = true;
        rg.curvatureCircle.undisplay = false;
        var media_scale = toreg( 'media_scale' )();


        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible
		rg[ 'S,nonSolvablePoint' ].undisplay = true;
		rg[ 'nonSolvablePoint' ].undisplay = true;
        
        rg[ 'QP' ].undisplay = false;
        rg[ 'Q,rrminus' ].undisplay = true;
        rg[ 'P,rrminus' ].undisplay = true;
        rg.APQ.undisplay = false;

        //rg.VQ.undisplay = true;
        rg.Q.hideD8Dpoint = false;
        rg.Q.d8d_find_is_LOCKED = false;
        //----------------------------------
        // \\// common values
        //----------------------------------


        if( logic_phase === 'claim' || logic_phase === 'proof' ){

            rg.media_scale.value = 1;

            ssF.scaleValue2app( rg.media_scale.value, );

            rg.A.undisplay = true;
            rg.T.undisplay = true;
            rg.QT.undisplay = true;
            rg.V.undisplay = true;
            rg.PV.undisplay = true;
            rg.PR.undisplay = true;
            rg.PZ.undisplay = true;
            rg.Z.undisplay = true;

            rg.R.undisplay = true;
            rg.QR.undisplay = true;
            rg.SQ.undisplay = true;
            rg.Y.undisplay = true;
            rg.PV.undisplay = true;
            rg.SY.undisplay = true;
            rg.PY.undisplay = true;
            rg.curvatureCircle.undisplay = true;
            rg.C.undisplay = true;
            rg.PC.undisplay = true;
            rg[ 'Q,rrminus' ].undisplay = false;
            /*
            fapp.captureState(
                ns.paste(
                    {
                        curvePivots_points : cpPoints,
                        curveRightPivots_points : rpPoints,
                    },
                    ast
                )
            );
            */
            if( logic_phase === 'proof' ){
                rg[ 'Q,rrminus' ].undisplay = false;
            }

        } else if( logic_phase === 'corollary' && subessay === 'corollary1' ){
            rg.SY.undisplay = true;
            rg.Y.undisplay = true;
            rg.PY.undisplay = true;
            rg.V.undisplay = true;
            rg.PV.undisplay = true;

            rg.curvatureCircle.undisplay = true;
            rg.C.undisplay = true;
            rg.PC.undisplay = true;
            rg[ 'Q,rrminus' ].undisplay = false;
            rg[ 'rrminus' ].undisplay = false;
            //rg.sagitta.undisplay = false;
            rg[ 'P,sagitta' ].undisplay = false;

        } else if( logic_phase === 'corollary' && subessay === 'corollary3' ){
            rg.Q.hideD8Dpoint = false;
            rg.Q.d8d_find_is_LOCKED = false;
            rg.Q.undisplay = false;
            rg.QP.undisplay = false;
            rg.QR.undisplay = false;
            rg.R.undisplay = false;

            rg.APQ.undisplay = false;
            rg.Z.undisplay = true;
            rg.V.undisplay = false;
            rg.PV.undisplay = false;
            rg[ 'P,sagitta' ].undisplay = true;

            rg.Y.undisplay = false;
            rg.SY.undisplay = false;
            rg.SQ.undisplay = true;
            rg.T.undisplay = true;
            rg.QT.undisplay = true;
            rg[ 'Q,rrminus' ].undisplay = true;
            rg[ 'rrminus' ].undisplay = true;
            rg.timearc.undisplay = true;

        } else if( logic_phase === 'corollary' && subessay === 'corollary5' ){
            rg.SY.undisplay = false;
            rg.Y.undisplay = false;
            rg.PY.undisplay = false;
            rg.V.undisplay = false;
            rg.PV.undisplay = false;
            rg.SQ.undisplay = true;
            //rg.sagitta.undisplay = true;
            rg[ 'P,sagitta' ].undisplay = true;
            rg.PZ.undisplay = true;
            rg.Z.undisplay = true;

            rg.curvatureCircle.undisplay = false;
            rg.C.undisplay = true;
            rg.PC.undisplay = true;
            rg[ 'rrminus' ].undisplay = true;
            rg[ 'Q,rrminus' ].undisplay = true;
            rg[ 'QP' ].undisplay = false;
            rg.APQ.undisplay = true;
        } else {
            rg.media_scale.value = 1;
            ssF.scaleValue2app( rg.media_scale.value, );
        }

        ////this refreshes scnenario of
        ////non-Kepler shapes visibility
        ssD.stashedVisibility = null;

        stdMod.rebuilds_orbit();
        sDomF.detected_user_interaction_effect( 'doShowDiagram' );
        return captured;
    }

}) ();

