( function() {
    var { ns, sn, nspaste, capture, userOptions, amode, toreg, stdMod, rg, sDomF, ssD, ssF, 
        fconf, sconf, } = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
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


        rg.SQ.undisplay                 = true;
        rg[ 'sagitta' ].undisplay       = true;
        rg[ 'rrminus' ].undisplay       = true;
        rg[ 'Q,rrminus' ].undisplay     = true;
        rg[ 'P,rrminus' ].undisplay     = true;
        rg.curvatureCircle.undisplay    = true;
        rg.PC.undisplay                 = true;
        rg.timearc.undisplay            = true;
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
            if( subessay === 'corollary1' ) {
                ////placing S to the circle
                nspaste( rg.S.pos, [-0.9997779468574, -0.0210731450212] );
            }
            sDomF.detected_user_interaction_effect( subessay !== 'corollary1' );
        }

        modifyDecorationVisibility();

        ssD.stashedVisibility = null;
        stdMod.curveIsSolvable();
        sDomF.detected_user_interaction_effect( 'doShowDiagram' );
        return captured;
    }



    function modifyDecorationVisibility() {
        //Modify visibility for the below decorations based on the following settings.
        const { logic_phase, aspect, subessay } = amode;
        const isProblem2AndNotAddendum  = (logic_phase === 'claim' && aspect !== 'addendum');
        const isSolutionsAndNotAddendum = (logic_phase === 'proof' && aspect !== 'addendum');
        const isCorollary2OrCorollary3   = (subessay === 'corollary2' || subessay === 'corollary3');


        rg.Q.hideD8Dpoint       = isProblem2AndNotAddendum;
        rg.Q.d8d_find_is_LOCKED = isProblem2AndNotAddendum;
        [   'V',
            'A',
            'PV',
            'SP',
            'PR',
            'P,Zminus',
            'PY',
            'PZ',
            'ZR',
        ].forEach(decoration => {
            rg[decoration].undisplay = isProblem2AndNotAddendum;
        });


        rg.C.undisplay = (isProblem2AndNotAddendum || isSolutionsAndNotAddendum);


        [   'Q',
            'Y',
            'L',
            'R',
            'Z',
            'T',
            'QR',
            'QT',
            'PT',
            'ZQ',
            'RL',
            'SY',
            'AP',
            'AV',
            'QP',
        ].forEach(decoration => {
                rg[decoration].undisplay = (isProblem2AndNotAddendum || isCorollary2OrCorollary3);
        });


        rg[ 'P,sagitta' ].undisplay = isCorollary2OrCorollary3;

        [   'Tcol2',
            'Rcol2',
            'Gcol2',
            'Rcol2,Tcol2',
            'Tcol2,V',
            'Gcol2,S',
            'Gcol2,P',
            'Rcol2,P',
        ].forEach(decoration => {
            rg[decoration].undisplay = !isCorollary2OrCorollary3
        });
    }

}) ();

