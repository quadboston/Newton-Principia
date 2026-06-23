(function(){
const {
        nspaste, capture, toreg, mat, stripp,
        sDomF, ssF, fconf, stdMod, amode, rg, sconf,
    } = window.b$l.atree({ ssFList: {
        amode2rgstate,
}});
return;


///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate( captured ){
    const sappId = fconf.sappId;
    const { logic_phase, aspect, subessay } = amode;
    rg.f.caption = '';
    ssF.amode2rgstate_model();
    return captured;
}})();