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

        {
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
        //if( sappId === 'b1sec3prop16' )
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
            stdMod.medScene$.css( 'visibility', 'visible' );
            if( logic_phase === 'corollary' ) {
                if( subessay === "corollary1" ) {
                    ////latus on others: swaps latus and speed
                    rg.vb.hideD8Dpoint = false;
                    rg.L.hideD8Dpoint = true;
                } else {
                    stdMod.imgRk.dom$.css( 'visibility', 'hidden' );
                    stdMod.medScene$.css( 'visibility', 'hidden' );
                }
            }
        }
    }
})();