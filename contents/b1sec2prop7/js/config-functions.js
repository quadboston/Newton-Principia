( function() {
    var { mat, stdMod, sconf, } 
        = window.b$l.apptree({ stdModExportList : { recreates_q2xy, }, });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        const R      = sconf.prop7R;
        const center = sconf.diagramOrigin;
        const q0 = sconf.orbit_q_start;
        stdMod.q2xy  = q2xy;
        return;
        
        function q2xy( q )
        {
            q += q0;
            return [
                R*Math.cos( q ) + center[0],
                R*Math.sin( q ) + center[1],
            ];
        }
    }
}) ();

