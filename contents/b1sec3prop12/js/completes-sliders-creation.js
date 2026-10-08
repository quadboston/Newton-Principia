( function() {
    var { sn, stdMod, sconf, rg, } = window.b$l.apptree({
        stdModExportList : { creates_Zeta_slider, }, });
    var op = sn( 'orbitParameters', sconf );
    return;


    function creates_Zeta_slider()
    {
        //=========================================================================
        // //\\ eccentricity slider
        //=========================================================================
        rg.A.acceptPos = newPos => {
            //A is the vertex q2xy( Math.PI ), at distance latus / ( 1 + e )
            //from S along the axis, so the eccentricity that puts A under
            //the pointer follows directly from the pointer's distance
            const center = sconf.diagramOrigin;
            const axis = op.mainAxisAngle;
            const distance = -(
                ( newPos[0] - center[0] ) * Math.cos( axis ) +
                ( newPos[1] - center[1] ) * Math.sin( axis )
            );
            const eccentricity = distance > 0 ?
                op.latus / distance - 1 : op.eccentricityMax;

            stdMod.establishesEccentricity(
                Math.max( op.eccentricityMin,
                          Math.min( op.eccentricityMax, eccentricity ) ),
                false,
            );
            stdMod.rebuilds_orbit();

            return true;
        };
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================
    }
}) ();
