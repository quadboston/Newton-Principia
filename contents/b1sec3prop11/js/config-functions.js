( function() {
    var { mat, rg, ssD, stdMod, sconf, } = window.b$l.apptree({
        stdModExportList : {
            recreates_q2xy,
            recreatesPosCorrector,
            calculateMaxGraphValues,
        }, });
    return;

    
    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        const ellipseA = sconf.ellipseA;
        const ellipseB = sconf.ellipseB;
        const fi0 = sconf.orbit_q_start;
        const center = sconf.diagramOrigin;
        stdMod.q2xy = q2xy;
        return;
        
        function q2xy( q )
        {
            q += fi0;
            return [
                ellipseA * Math.cos( q ) + center[0],
                ellipseB * Math.sin( q ) + center[1],
            ];
        }
    }    
    
    function recreatesPosCorrector()
    {
        const dor = sconf.diagramOrigin;
        const ellA = 1/sconf.ellipseA;
        const ellB = 1/sconf.ellipseB;
        const fi0 = sconf.curveParFi0;
        stdMod.correctApproxMousePosToExact = correctApproxMousePosToExact;
        return;
        
        ///pos to "virtual" andle
        function pos2t( newPos )
        {
            return mat.pos2angle([
                (newPos[0] - dor[0])*ellA,
                (newPos[1] - dor[1])*ellB,
            ])-fi0; //sconf.curveParFi0 is not a real angle, but
                    //"virtueal" inner_angle fi0
        }
        ///corrects approximate mouse point to exact point on the circle
        function correctApproxMousePosToExact( pname, newPos, inner_angle ){
            let rgX = rg[pname];
            if( typeof inner_angle === 'undefined' ){
                inner_angle = pos2t( newPos );
            }
            if( inner_angle < Math.PI*0.01 || inner_angle > sconf.orbit_q_end ){
                inner_angle = ( inner_angle + sconf.orbit_q_end ) % sconf.orbit_q_end;
            }
            let qix = Math.floor( inner_angle/sconf.delta_q_between_steps );
            rgX.qix = qix;
            rgX.parQ = qix * sconf.delta_q_between_steps;
            var newP = ssD.qIndexToOrbit[ qix ].rr;
            let pos = rgX.pos;
            pos[0] = newP[0];
            pos[1] = newP[1];
            return pos;
        }
    }


    function calculateMaxGraphValues() {
        //Calculate initial value on page load
        stdMod.rebuilds_orbit(null, false);
        //TEMP Should the following be moved to eg. "builds-orbit-data-graph.js"
        ssD.estimatedForceMaxInitial = ssD.estimatedForceMaxCurrent;


        //The highest forces for this model occur when eccentricity is max,
        //therefore temporarily adjust it and calculate the maximum forces.
        const eccentricityStored = sconf.eccentricity;
        setEccentricityAndRelated(sconf.eccentricityMax);
        stdMod.rebuilds_orbit(null, true);

        //Reset eccentricity
        setEccentricityAndRelated(eccentricityStored);


        function setEccentricityAndRelated(eccentricity) {
            //Set eccentricity and related values needed for above calculations
            sconf.eccentricity = eccentricity;

            const lambda = Math.sqrt(Math.abs(1 - sconf.eccentricity**2));
            const b = sconf.ellipseB;
            sconf.ellipseA = b / lambda;

            const a = sconf.ellipseA;
            sconf.ellipseFocus = Math.sqrt(a*a - b*b);

            rg.S.pos[0] = -sconf.ellipseFocus;
            rg.H.pos[0] = sconf.ellipseFocus;
        }
    }
}) ();

