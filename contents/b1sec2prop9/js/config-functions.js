( function() {
    const { mat, stdMod, sconf, } = window.b$l.apptree({
        stdModExportList : { recreates_q2xy, }, });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        var center  = sconf.diagramOrigin;
        const ro0   = sconf.ro0;
        const A     = sconf.curveParA;
        const q0    = sconf.orbit_q_start;
        stdMod.q2xy = q2xy;
        return;
        
        function q2xy( q )
        {
            q += q0;
            var ro = ro0*Math.exp( A*q );
            return [
                ro * Math.cos( q ) + center[0],
                ro * Math.sin( q ) + center[1],
            ];
        }
    }
}) ();

