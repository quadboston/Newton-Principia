( function() {
    var { mat, stdMod, sconf, } = window.b$l.apptree({
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
        stdMod.xyToQ = xyToQ;
        return;
        
        // points of the spiral
        function q2xy( q )
        {
            q += q0;
            var ro = ro0*Math.exp( A*q );
            return [
                ro * Math.cos( q ) + center[0],
                ro * Math.sin( q ) + center[1],
            ];
        }

        // map given end points to draw arc segment along spiral
        function xyToQ(x, y) {
            const dx = x - center[0];
            const dy = y - center[1];
            const r = Math.sqrt(dx * dx + dy * dy);
            const q_angle = Math.atan2(dy, dx);
            const q_radius = Math.log(r / ro0) / A;
            return q_radius - q0; // this is the original q before offset
        }
    }
}) ();

