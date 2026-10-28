(function(){
const {
    sn, nspaste, capture, toreg, mat,
    sDomF, ssF, fconf, sf, stdMod, amode, rg, sconf,
} = window.b$l.atree({
    ssFList : { amode2rgstate_model, },
});
const op = sn( 'orbitParameters', sf );
return;


///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate_model (){
    if( "b1sec3prop16" === fconf.sappId ) {
        op.cosOmega = op.cosOmega_initial;
        op.om       = op.om_initial;
    }
    //note: 17 is already excluded
    if( fconf.effId === "prop_from_14_to_17" ){
        rg.P.abs = mat.unitVector( rg.P.pos ).abs;
        nspaste( rg.Fi.pos, [
            sconf.Fi_distance * Math.cos( op.mainAxisAngle ),
            sconf.Fi_distance * Math.sin( op.mainAxisAngle ),
        ]);
    }
}
})();