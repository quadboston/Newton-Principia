(function(){
    const { nspaste, has, capture, toreg, mat,
            sDomF, ssF, fconf, stdMod, amode, rg, sconf,
    } = window.b$l.apptree({
        ssFExportList : { amode2rgstate_decorator },
    });
    return;

///runs inside of amode2rgstate which
///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate_decorator (){
    const sappId = fconf.sappId;
    const { logic_phase, aspect, subessay } = amode;
    rg.Y.undisplay = false;
    rg.PY.undisplay = false;
    rg.SL.undisplay = false;
    rg.C.undisplay = false;
    rg.R.undisplay = false;
    rg.T.undisplay = false;
    rg[ 'L,LL' ].undisplay = false;
    rg.L.undisplay = false;

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

    rg.instanttriangle.undisplay = true;
    rg.Q.hideD8Dpoint = true;
    rg.I.undisplay = true;
    rg.F.undisplay = true;

    rg.CD.undisplay = true;
    rg.EC.undisplay = true;
    rg.xv.undisplay = true;
    rg.O.undisplay = true;

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

    //=========================================
    // //\\ parabola: b1sec3prop13
    //=========================================
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
    //=========================================
    // \\// parabola: b1sec3prop13
    //=========================================

    //-------------------------------------------------
    // //\\ decorations
    //-------------------------------------------------
    rg[ 'orbitarea-sample' ].undisplay = false;
    rg['S,Ys'].undisplay = false;

    //rg.omega.undisplay = false;
    rg.K.undisplay = false;
    rg.D.undisplay = false;
    rg.CD.undisplay = false;

    rg.A.undisplay = false;
    rg.B.undisplay = false;
    rg.CB.undisplay = false;

    rg.SY.undisplay = false;
    rg.PY.undisplay = false;

    rg.H.undisplay = false;
    rg.PH.undisplay = false;
    rg.BH.undisplay = false;
    rg.PK.undisplay = false;
    rg.SK.undisplay = false;
    rg.DS.undisplay = false;
    rg.DH.undisplay = false;

    rg[ 'l,ll' ].undisplay = false;
    rg.q.undisplay = false;
    rg.p.undisplay = false;
    rg.vSample.undisplay = false;
    rg.vSample.hideD8Dpoint = false;
    rg[ 'p,vSample' ].undisplay = false;
    rg.f.hideD8Dpoint = false;
    rg['PR'].undisplay = false;
    rg.Sp.undisplay = false;

    rg.instanttriangle.undisplay = true;
    rg.T.undisplay = true;
    rg.QT.undisplay = true;
    rg.QR.undisplay = true;
    rg.Fi.undisplay = true;
    rg.Fi.hideD8Dpoint = true;
    rg.SL.undisplay = true;
    rg.Y.undisplay = true;
    rg.omegaHandle.undisplay = true;
    rg.omegaHandle.hideD8Dpoint = true;
    rg[ 'P,omegaHandle' ].undisplay = true;
    rg.L.hideD8Dpoint = true;
    rg.L.undisplay = true;
    rg.LL.undisplay = true;
    rg.Zeta.hideD8Dpoint = true;
    rg['P,Zminus'].undisplay = true;
    rg['Zminus'].undisplay = true;
    rg['ZR'].undisplay = true;
    rg['PZ'].undisplay = true;
    //-------------------------------------------------
    // \\// decorations
    //-------------------------------------------------
    {
        //-------------------------------------------------
        // //\\ conditional decorations
        //-------------------------------------------------
        {
            //// addendum. comparision.
            let rgSam = rg[ 'approxer-sample' ];
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
}
})();