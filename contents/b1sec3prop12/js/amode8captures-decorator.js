(function(){
    const {
        nspaste, capture, toreg, mat,
        sDomF, ssF, fconf, stdMod, amode, rg, sconf,
    } = window.b$l.apptree({
        ssFExportList : { amode2rgstate_decorator },
    });
    return;



    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate_decorator (){
        const sappId = fconf.sappId;
        const { logic_phase, subessay } = amode;
        //==================================================
        // //\\ decorations alternating
        //==================================================
        if( fconf.effId === "prop_from_14_to_17" ){
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
                rg[i].undisplay = true;
            });
            rg.Q.hideD8Dpoint = true;
            rg.I.undisplay = true;
            rg.F.undisplay = true;

            rg.CD.undisplay = true;
            rg.EC.undisplay = true;
            rg.xv.undisplay = true;
            rg.O.undisplay = true;

            rg.Y.undisplay = false;
            rg.PY.undisplay = false;
            rg.SL.undisplay = false;
            rg.C.undisplay = false;
            rg.R.undisplay = false;

            rg.T.undisplay = false;
            rg[ 'L,LL' ].undisplay = false;
            rg.L.undisplay = false;

            rg.instanttriangle.undisplay =
                sappId === "b1sec3prop15" ? true : false;
        }

        if( fconf.effId === "prop_from_14_to_17" ||
            "b1sec3prop13" === sappId ) {
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
        // //\\ parabola: b1sec3prop13
        //=========================================
        if( "b1sec3prop13" === sappId ) {
            ////parabola hiding
            rg[ 'ZetaStart,ZetaEnd' ].undisplay = true;
            rg.S.hideD8Dpoint = true;
            rg.O.undisplay = true;
        } else {
            ////parabola showing
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
                rg[i].undisplay = true;
            });
        }
        //=========================================
        // \\// parabola: b1sec3prop13
        //=========================================
        if( sappId === 'b1sec3prop16' )
        {
            rg.SY.undisplay = false;
            rg.PY.undisplay = false;

            rg.Y.undisplay = false;
            rg.omegaHandle.undisplay = false;
            rg.omegaHandle.hideD8Dpoint = false;
            rg[ 'P,omegaHandle' ].undisplay = false;

            rg.L.hideD8Dpoint = false;

            rg.vb.hideD8Dpoint = true;
            rg.vb.undisplay = true;

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

        if( "b1sec3prop14" === sappId ) {
            rg.vb.hideD8Dpoint = false;
            rg.vb.undisplay = false;
            rg[ 'P,vb' ].undisplay = false;
        }

        if( sappId === "b1sec3prop15" ) {
            rg.A.undisplay = false;
            rg.AA.undisplay = false;
            rg.B.undisplay = false;
            rg.BB.undisplay = false;
            rg[ 'A,AA' ].undisplay = false;
            rg[ 'B,BB' ].undisplay = false;

            rg.L.hideD8Dpoint = false; //causes main axes rotation, so is disabled
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
        }
    }
})();