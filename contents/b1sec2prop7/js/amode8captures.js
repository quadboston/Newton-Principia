( function() {
    var { ns, sn, nspaste, capture, userOptions, amode, toreg, stdMod, rg, sDomF, ssD, ssF, 
        fconf, sconf, } = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    setCapture();
    return;


    function setCapture()
    {
        nspaste( capture,
        {
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
        rg[ 'S,nonSolvablePoint' ].undisplay = true;
        rg[ 'nonSolvablePoint' ].undisplay = true;


        rg.SQ.undisplay                 = true;
        rg[ 'sagitta' ].undisplay       = true;
        rg[ 'rrminus' ].undisplay       = true;
        rg[ 'Q,rrminus' ].undisplay     = true;
        rg[ 'P,rrminus' ].undisplay     = true;
        rg.curvatureCircle.undisplay    = true;
        rg.PC.undisplay                 = true;
        rg.timearc.undisplay            = true;
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

    function showOnly(...args) {
        for (const item in rg) {
            rg[item].undisplay = !args.includes(item);
        }
    }

    /**
     * Show or hide components according to whether they are used
     */
    function modifyDecorationVisibility() {
        const { logic_phase, aspect, subessay } = amode;

        rg.Q.hideD8Dpoint = rg.Q.d8d_find_is_LOCKED = logic_phase === 'claim';

        if (logic_phase === 'claim') {
            showOnly(
                'S',
                'P'
            );
        } else if (subessay === 'solution') {
            showOnly(
                'A',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'L',
                'V',
                'Z',
                'AP',
                'AV',
                'PR',
                'PT',
                'PV',
                'PZ',
                'QR',
                'QT',
                'RL',
                'SP',
                'ZQ',
                'ZR',
            );
        } else if (subessay === 'another-solution') {
            showOnly(
                'A',
                'P',
                'R',
                'S',
                'V',
                'Y',
                'AP',
                'AV',
                'PR',
                'PV',
                'PY',
                'PZ',
                'SP',
                'SY'
            );
        } else if (subessay === 'corollary1') {
            showOnly(
                'P',
                'S',
                'V',
                'SP',
            );
        } else if (subessay === 'corollary2') {
            showOnly(
                'A',
                'Gcol2',
                'P',
                'PV',
                'Rcol2',
                'S',
                'Tcol2',
                'V',
                'Gcol2,P',
                'Gcol2,S',
                'Rcol2,P',
                'Rcol2,Tcol2',
                'SP',
                'Tcol2,V',
            );
        } else if (subessay === 'corollary3') {
            showOnly(
                'A',
                'Gcol2',
                'P',
                'Rcol2',
                'S',
                'Gcol2,P',
                'Gcol2,S',
                'Rcol2,P',
                'SP',
            );
        }
    }

}) ();

