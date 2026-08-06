( function() {
    var { stdMod, sconf, } = window.b$l.apptree({ stdModExportList : {
        recreates_q2xy,
        calculateMaxGraphValues,
    }, });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        var center  = sconf.diagramOrigin;
        const A     = sconf.ellipseA;
        const B     = sconf.ellipseB;
        const fi0   = sconf.orbit_q_start;
        stdMod.q2xy = q2xy;
        stdMod.forceCorrectionScale = forceCorrectionScale;
        return;

        function q2xy( q )
        {
            q += fi0;
            return [
                A * Math.cos( q ) + center[0],
                B * Math.sin( q ) + center[1],
            ];
        }

        function forceCorrectionScale() {
            return 2 * B * B * A * A;
        }
    }


    function calculateMaxGraphValues() {
        //TEMP For now just calculate maximum forces, however further
        //adjustments will likely be needed.
        stdMod.rebuilds_orbit(true);
    }
}) ();
