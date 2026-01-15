( function() {
    var { mat, stdMod, sconf, } = window.b$l.apptree({
        stdModExportList : { recreates_q2xy, }, });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        const center = sconf.diagramOrigin;
        const op     = sconf.orbitParameters;
        //TEMP Should this be modified to be Math.PI?  Could add an explanation
        //Or maybe just have it below only?
        //Also should it be adjusted by orbit_q_start to be consistent, I
        //believe this is how the other models are setup?
        const q0     = sconf.orbit_q_start;
        stdMod.q2xy  = q2xy;
        //TEMP
        stdMod.computeQEndTemp  = computeQEndTemp;
        stdMod.computeOrbitXCenter = computeOrbitXCenter;
        return;
        
        function q2xy( q )
        {
            //TEMP It seems that different models use different variables for
            //example P9 "q0", P10/11 "fi0"
            //TEMP This or something similar should probably be kept.
            // q += q0;
            q += Math.PI;//TEMP

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


        //TEMP The below name is probably better
        // function compute_orbit_q_end() {
        function computeQEndTemp() {
            //TEMP If 3 then sometimes "3.000" is visible on right side of
            //graph, sometimes not depending on the eccentricity.
            const r = 2.4;//9;//36;//3;//10;//2.9;//3
            const q = Math.acos((1 - op.latus / r) / op.eccentricity);
            //TEMP Perhaps Math.PI should be replaced with q0 or similar?
            return Math.PI - q;
        }


        function computeOrbitXCenter() {
            const xSide1 = q2xy(0)[0];
            const xSide2 = q2xy(Math.PI)[0];
            return (xSide1 + xSide2) / 2;
        }
    }
}) ();

