(function(){
const {
        ns, sn, has, nspaste, capture, toreg, mat,
        sDomF, ssD, ssF, fconf, stripp,
        stdMod, amode, rg, sconf
      } = window.b$l.atree({ ssFList: {
        amode2rgstate,
}});
return;


///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate( captured ){
    const { logic_phase, aspect, subessay } = amode;
    const rgn = 'force';
    {
        ////restores original pivots positions
        let ini = rg[rgn].cpivots_initial;
        rg[rgn].cpivots.forEach( (cp,ix) => {
            nspaste( cp.rgX.pos, ini[ix].rgX.pos );
        });
        //sets and paints initial orbit
        stdMod.pivotsDivDif_2_curve8svg({ rgn });
    }
    var op        = sconf.orbitParameters;
    op.angleOmega = op.angleOmega_initial;
    op.Kepler_v   = op.Kepler_v_initial;
    return captured;
}})();