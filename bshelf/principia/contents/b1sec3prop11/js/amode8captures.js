(function(){
const {
        ns, sn, nspaste, userOptions, capture, toreg,
        sDomF, ssD, ssF, fconf, stdMod, amode, rg, sconf,
    } = window.b$l.atree({ ssFList: {
        amode2rgstate,
}});
return;


///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate( captured ){
    var { logic_phase, aspect, subessay } = amode;
    rg.S.pos[0] = -sconf.curve.ellipseFocus;
    rg.S.pos[1] = 0;
    rg.SS.undisplay = true;

    rg.H.pos[0] = sconf.curve.ellipseFocus;
    rg.H.pos[1] = 0;
    return captured;
}
})();
