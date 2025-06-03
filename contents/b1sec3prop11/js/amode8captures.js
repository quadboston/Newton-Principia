( function() {
    var {
        ns, sn, nspaste, userOptions, capture, toreg,
        sDomF, ssD, ssF, fconf,
        stdMod, amode, rg, sconf,
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
        });
    }


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        var { logic_phase, aspect, subessay } = amode;
        var ADDENDUM = aspect === 'addendum';
        var media_scale = toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );
        rg.S.pos[0] = -sconf.ellipseFocus;
        rg.S.pos[1] = 0;
        rg.SS.undisplay = true;
        
        /*
        //too much general?:
        if( ADDENDUM ) {
            rg.SS.undisplay = false;
            rg.SS.pos[0] = -sconf.ellipseFocus;
            rg.SS.pos[1] = 0;
        }
        */

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        rg.H.pos[0] = sconf.ellipseFocus;
        rg.H.pos[1] = 0;


        if( fconf.sappId === 'b1sec3prop11' ) {
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
            
            //rg.R.undisplay = ADDENDUM;
            //rg.T.undisplay = hideExtras;
            //rg.Q.undisplay = hideExtras;
            
            var hideExtras = ADDENDUM || subessay === 'another-solution';

            // //\\ another solution
            rg.DK.undisplay = ADDENDUM;
            rg.PI.undisplay = ADDENDUM;
            rg.E.undisplay = ADDENDUM;
            rg.EP.undisplay = ADDENDUM;
            rg.EO.undisplay = ADDENDUM;
            rg.EO.undisplay = ADDENDUM;
            rg.E.undisplay = ADDENDUM;

            rg.PO.undisplay = ADDENDUM;
            // \\// another solution

            //=====================================================
            // //\\ alternates for addendum
            //=====================================================
            rg.GP.undisplay = hideExtras;
            rg.G.undisplay = hideExtras;
            rg.K.undisplay = hideExtras;
            rg.D.undisplay = hideExtras;
            rg.F.undisplay = hideExtras;
            rg.PF.undisplay = hideExtras;
            rg.A.undisplay = hideExtras;
            rg.B.undisplay = hideExtras;
            rg.G.undisplay = hideExtras;
            rg.Z.undisplay = hideExtras;
            rg.Zminus.undisplay = hideExtras;
            rg.ES.undisplay = hideExtras;
            rg.EI.undisplay = hideExtras;
            rg.OS.undisplay = hideExtras;

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
            rg.GO.undisplay = hideExtras;
            rg.GP.undisplay = hideExtras;

            rg.AO.undisplay = hideExtras;
            rg.DO.undisplay = hideExtras;
            rg.BO.undisplay = hideExtras;
            rg[ 'PC' ].undisplay = hideExtras;
            
            // //\\ we don't know why one needs chorde-scribed circle
            //      so we disable it forever here
            rg[ 'P,tCircleCenter' ].undisplay = true; //hideExtras;
            rg.tCircleCenter.undisplay = true; //hideExtras;
            rg.tangentCircle.undisplay = true; //hideExtras;
            // \\// we don't know why one needs chorde-scribed circle

            rg.HI.undisplay = hideExtras;
            rg.PH.undisplay = hideExtras;
            rg.I.undisplay = hideExtras;
            rg.H.undisplay = hideExtras;
            //=====================================================
            // \\// alternates for addendum
            //=====================================================

        } else {
            rg.S.d8d_find_is_LOCKED = rg.S.hideD8Dpoint = !ADDENDUM;
            var hideAnother = subessay !== 'another-solution';
            rg.u.undisplay = hideAnother;
            rg.Tu.undisplay = hideAnother;
            rg[ 'u,VV' ].undisplay = hideAnother;
            rg.uP.undisplay = hideAnother;
            rg.PQ.undisplay = hideAnother;
            rg.tangentCircle.undisplay = hideAnother;

            stdMod.medRoot$.css( 'display',
                logic_phase === 'corollary' || logic_phase === 'scholium' ? 'none' : 'block'
            )

            //hides prop11
            rg.HI.undisplay = false;
            rg.PH.undisplay = false;
            rg.EO.undisplay = false;
            rg.E.undisplay = false;
            rg.I.undisplay = false;
            rg.H.undisplay = false;

            //=====================================================
            // //\\ alternates for addendum
            //=====================================================
            rg.PF.undisplay = ADDENDUM;
            rg.GP.undisplay = ADDENDUM;
            rg.G.undisplay = ADDENDUM;
            rg.DK.undisplay = ADDENDUM;
            rg.K.undisplay = ADDENDUM;
            rg.D.undisplay = ADDENDUM;
            rg.F.undisplay = ADDENDUM;
            rg.A.undisplay = ADDENDUM;
            rg.B.undisplay = ADDENDUM;
            rg.G.undisplay = ADDENDUM;
            rg.T.undisplay = ADDENDUM;
            rg.Q.undisplay = ADDENDUM;
            rg.R.undisplay = ADDENDUM;

            rg.VV.undisplay = ADDENDUM;
            rg.v.undisplay = ADDENDUM;
            rg.u.undisplay = ADDENDUM;
            rg.Pv.undisplay = ADDENDUM;
            rg.Qv.undisplay = ADDENDUM;
            rg.Tv.undisplay = ADDENDUM;
            rg.vG.undisplay = ADDENDUM;
            rg.QT.undisplay = ADDENDUM;
            rg.PT.undisplay = ADDENDUM;
            rg.QR.undisplay = ADDENDUM;
            rg.SQ.undisplay = ADDENDUM;
            rg.GO.undisplay = ADDENDUM;
            rg.GP.undisplay = ADDENDUM;

            rg.AO.undisplay = ADDENDUM;
            rg.DO.undisplay = ADDENDUM;
            rg.BO.undisplay = ADDENDUM;
            rg.PO.undisplay = ADDENDUM;
            rg[ 'P,VV' ].undisplay = ADDENDUM;
            //=====================================================
            // \\// alternates for addendum
            //=====================================================

        }


        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();

