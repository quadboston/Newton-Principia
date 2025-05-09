( function() {
    var {
        mat,
        stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            recreates_q2xy,
            recreates_pos2q,
        },
    });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        var R       = sconf.prop7R;
        var center  = sconf.diagramOrigin;
        const ro0   = sconf.ro0;
        const A     = sconf.curveParA;
        const fi0   = sconf.orbit_q_start;
        stdMod.q2xy = q2xy;
        return;
        
        function q2xy( q )
        {
            q += fi0;
            var ro = ro0*Math.exp( A*q );
            return [
                ro * Math.cos( q ) + center[0],
                ro * Math.sin( q ) + center[1],
            ];
        }
    }

    function recreates_pos2q()
    {
        const dor = sconf.diagramOrigin;
        const fi0 = sconf.orbit_q_start;
        stdMod.pos2q = pos2q;
        return;
        
        ///pos to parameter: "virtual" angle
        function pos2q( newPos )
        {
            return mat.pos2angle([
                (newPos[0] - dor[0]),
                (newPos[1] - dor[1]),
            ])-fi0;
        }
    }
}) ();

