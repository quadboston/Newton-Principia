( function() {
    var { fconf, stdMod, sconf, } = window.b$l.apptree({ stdModExportList : {
            recreates_q2xy,
            recalculateOrbitStartAndEnd,
            calculateMAFandMEF,
        }, });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        const center = sconf.diagramOrigin;
        const op     = sconf.orbitParameters;
        stdMod.q2xy  = q2xy;
        stdMod.computeOrbitXCenter = computeOrbitXCenter;
        return;
        
        function q2xy( q )
        {
            //denomenator
            var den = 1 - op.eccentricity * Math.cos(q);
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

        function computeOrbitXCenter() {
            const xSide1 = q2xy(0)[0];
            const xSide2 = q2xy(Math.PI)[0];
            return (xSide1 + xSide2) / 2;
        }
    }


    function recalculateOrbitStartAndEnd() {
        //Set start and end of orbit so the ends are the needed distance to S
        const op = sconf.orbitParameters;
        const r = sconf.DISTANCE_ORBIT_ENDS_TO_S;

        const cosValue = (1 - op.latus / r) / op.eccentricity;
        if (cosValue < -1 || cosValue > 1) {
            console.error("Error: Couldn't calculate orbit start and end.");
            return;
        }
        const q = Math.acos(cosValue);

        sconf.orbit_q_start = q;
        sconf.orbit_q_end = 2 * Math.PI - q;
    }


    function calculateMAFandMEF() {
        if (fconf.sappId === 'b1sec3prop12') {
            const op = sconf.orbitParameters;
            const eccentricityStored = op.eccentricity;

            //The highest forces for this model occur when eccentricity is max,
            //therefore temporarily adjust it and calculate the maximum forces.
            stdMod.establishesEccentricity(op.eccentricityMax);
            stdMod.rebuilds_orbit(null, true);
            
            //Reset eccentricity
            stdMod.establishesEccentricity(eccentricityStored);

        } else if (fconf.sappId === 'b1sec3prop13') {
            //No adjustments needed, just calculate maximum forces.
            stdMod.rebuilds_orbit(null, true);
        }
    };
}) ();

