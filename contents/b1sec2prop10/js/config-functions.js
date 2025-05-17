( function() {
    var { mat, stdMod, sconf, } 
        = window.b$l.apptree({ stdModExportList : { recreates_q2xy, recreates_pos2q, }, });
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

    function recreates_pos2q()
    {
        const dor    = sconf.diagramOrigin;
        const A      = sconf.ellipseA;
        const B      = sconf.ellipseB;
        const fi0    = sconf.orbit_q_start;
        stdMod.pos2q = pos2q;
        return;
        
        ///pos to parameter: "virtual" angle
        function pos2q( newPos )
        {
            return mat.pos2angle([
                (newPos[0] - dor[0])/A,
                (newPos[1] - dor[1])/B,
            ])-fi0;
        }
    }
}) ();

