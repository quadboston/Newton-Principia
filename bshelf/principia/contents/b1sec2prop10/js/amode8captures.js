(function(){
const { nspaste, capture, toreg, sDomF, ssF, stdMod, amode, rg, sconf, } =
        window.b$l.atree({ ssFList : { amode2rgstate, }, });
return;


///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate( captured ){
    const { logic_phase, aspect, subessay } = amode;
    //todo sort out why this is commented out,
    // toreg( 'sForSagitta' )( 'val', sconf.sForSagitta_valQ );
    // nspaste( rg.P.pos, rg.borbit.dyn_q2xy( sconf.PparT ));

    //won't work in study model
    //because is overriden in in_subessay_launch____amode2lemma by
    //sconf.rgShapesVisible

    rg.S.pos[0] = 0;
    rg.S.pos[1] = 0;

    //=====================================================
    // //\\ alternates for addendum
    //=====================================================
    var isAdden = aspect === 'addendum';
    rg.S.undisplayAlways = !isAdden;
    rg.S.doPaintPname = isAdden;
    //=====================================================
    // \\// alternates for addendum
    //=====================================================
    return captured;
}
})();