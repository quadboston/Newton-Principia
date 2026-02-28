(function(){
    const { sconf, rg, toreg, ssD, stdMod, nspaste, } =
          window.b$l.apptree({
              stdModExportList: {init_lemma},
    });
    return;


    ///=============================================================
    /// at landing, copies study-model-pars from config to app model
    ///=============================================================
    function init_lemma (){
        ///reduces pivots back to simple array
        ssD.curvePivots   = ssD.curvePivots.map( cp =>
            [cp.rgX.medpos[0], cp.rgX.medpos[1]] );
        ssD.tC            = sconf.tC;
        ssD.claimRatio    = sconf.claimRatio;
        toreg( 'tiltAngle' )( 'value', sconf.tiltAngle );
    }
})();

