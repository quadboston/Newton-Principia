( function() {
    var {
        mat,
        rg, ssD, stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            recreates_q2xy,
            q2qix,
            bp2cp,
        },
    });
    return;

    
    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        //nothing todo stdMod.q2xy = bezio.fun;
        return;
    }
    
    ///todm fix or rename to q2qix,
    ///this function must be initiated out of scope isSolvable()
    ///     these vars must be done in small closure:
    ///     start_q ) / ( end_q - start_q ) * qixMax
    function q2qix(){
        var q = rg.P.q;
        var qixMax = stdMod.graphArray.length-1;
        const qs = sconf.orbit_q_start;
        const qe = sconf.orbit_q_end;
        var qix = Math.floor( ( q - qs ) / ( qe - qs ) * qixMax );
        return Math.max( 0, Math.min( qixMax, qix ) );
    }
    
    ///besier pivots to curve pivots
    function bp2cp() {
        const bezio = ssD.bezio;
        bezio.pivotsPos.map( (pos,ix) => {
            let cp = rg[ 'curvePivots-' + ix ];
            let posNew = bezio.fun( cp.q );
            cp.pos[0] = posNew[0];
            cp.pos[1] = posNew[1];
        });
    }
})();

