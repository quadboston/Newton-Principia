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
function amode2rgstate(){
    if( fconf.sappId !== 'b1sec3prop17' &&
        fconf.sappId !== 'b1sec3prop12' &&
        fconf.sappId !== 'b1sec3prop13'
    ){
        ////need 14,`15, 16 but not for compact ver
        rg.f.caption = '';
        ssF.amode2rgstate_model();
    }
}})();