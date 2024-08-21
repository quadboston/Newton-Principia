( function() {
    var {
        sconf, rg, toreg, ssD, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
        },
    });
    return;








    ///=============================================================
    /// at landing, copies study-model-pars from config to app model
    ///=============================================================
    function init_model_parameters()
    {
        ssD.curvePivots   = sconf.curvePivots.concat([]);
        ssD.tC            = sconf.tC;
        ssD.claimRatio    = sconf.claimRatio;
        toreg( 'tiltRatio' )( 'value', sconf.tiltRatio );
    }
}) ();

