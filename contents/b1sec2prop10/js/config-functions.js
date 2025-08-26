( function() {
    const { stdMod, sconf, } 
        = window.b$l.apptree({ stdModExportList : { recreates_q2xy, }, });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        var center  = sconf.diagramOrigin;
        const A     = sconf.ellipseA;
        const B     = sconf.ellipseB;
        const fi0   = sconf.orbit_q_start;
        stdMod.q2xy = q2xy;
        return;
        
        function q2xy( q )
        {
            q += fi0;
            return [
                A * Math.cos( q ) + center[0],
                B * Math.sin( q ) + center[1],
            ];
        }
    }
}) ();

