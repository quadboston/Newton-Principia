( function() {
    var { mat, stdMod, sconf, } = window.b$l.apptree({
        stdModExportList : { recreates_q2xy, }, });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        const center = sconf.diagramOrigin;
        const op     = sconf.orbitParameters;
        const q0     = sconf.orbit_q_start;
        stdMod.q2xy  = q2xy;
        return;
        
        function q2xy( q )
        {
            //TEMP It seems that different models use different variables for
            //example P9 "q0", P10/11 "fi0"
            //TEMP This or something similar should probably be kept.
            //q += q0;

            //TEMP The following was copied from
            //"src\base\lemma\study-model\kepler-orbit\makes-orbit.js"
            //and has a few quick adjustments so far.
            //denomenator
            var den = 1 - op.eccentricity * Math.cos(q);
            // var den = 1 + op.eccentricity * Math.cos(q);
            if( den === 0 ) {
                den = 1e-20; // avoid singularity (can't divide by zero)
            }

            // radial distance
            var r = op.latus / den;

            return [
                r * Math.cos( q + op.mainAxisAngle ) + center[0],
                r * Math.sin( q + op.mainAxisAngle ) + center[1],
            ];
        }

        //TEMP Are any othe functions needed?
    }
}) ();

