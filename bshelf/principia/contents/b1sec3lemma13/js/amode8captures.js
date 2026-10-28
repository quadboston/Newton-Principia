(function(){
const {
        ns, sn, nspaste, capture, toreg, sDomF,
        ssD, ssF, fconf, stdMod, amode, rg, sconf,
    } = window.b$l.atree({ssFList: {
        amode2rgstate,
}});
return;


///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate( captured ){
    var { logic_phase, aspect, subessay } = amode;
    toreg( 'sForSagitta' )( 'val', sconf.sForSagitta_valQ );
    nspaste( rg.P.pos, rg.borbit.dyn_q2xy( sconf.curve.PparT ));
    //won't work in study model
    //because is overriden in in_subessay_launch____amode2lemma by
    //sconf.rgShapesVisible

    rg.S.pos[0] = -sconf.curve.ellipseFocus;
    rg.S.pos[1] = 0;
    rg.H.pos[0] = sconf.curve.ellipseFocus;
    rg.H.pos[1] = 0;

    var isAdden = aspect === 'addendum';

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
    var hideExtras = true; //isAdden || subessay === 'another-solution';

    // //\\ another solution
    rg.DK.undisplay = isAdden;
    rg.PI.undisplay = isAdden;
    rg.E.undisplay = isAdden;
    rg.EP.undisplay = isAdden;
    rg.EO.undisplay = isAdden;
    rg.EO.undisplay = isAdden;
    rg.E.undisplay = isAdden;
    rg.R.undisplay = isAdden;
    rg.PO.undisplay = isAdden;
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
    rg.T.undisplay = hideExtras;
    rg.Q.undisplay = hideExtras;
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
    rg[ 'P,tCircleCenter' ].undisplay = hideExtras;
    rg.tCircleCenter.undisplay = hideExtras;
    rg.tangentCircle.undisplay = hideExtras;

    rg.HI.undisplay = hideExtras;
    rg.PH.undisplay = hideExtras;
    rg.I.undisplay = hideExtras;
    rg.H.undisplay = hideExtras;
    //=====================================================
    // \\// alternates for addendum
    //=====================================================
    return captured;
}
})();