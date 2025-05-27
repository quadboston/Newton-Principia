( function() {
    var {
        mat,
        rg, ssD, stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            recreates_q2xy,
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

