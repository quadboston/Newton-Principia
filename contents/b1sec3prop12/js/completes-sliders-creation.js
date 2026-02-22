( function() {
    var { sn, mcurve, nspaste, ssD, stdMod, sconf, rg, } = window.b$l.apptree({
        stdModExportList : { creates_Zeta_slider, }, });
    var op = sn( 'orbitParameters', sconf );
    return;


    function creates_Zeta_slider()
    {
        //=========================================================================
        // //\\ eccentricity slider
        //=========================================================================
        rg.A.acceptPos = newPos => {
            const eMin = op.eccentricityMin;
            const eMax = op.eccentricityMax;
            const delta = newPos[0] - rg.A.pos[0];            
            const k = 0.1; // proportionate change factor
            const prevE = op.eccentricity;
            let newEccentricity = prevE + delta * k;

            // clamp to bounds
            newEccentricity = Math.max(eMin, Math.min(eMax, newEccentricity));

            stdMod.establishesEccentricity(newEccentricity, false);
            stdMod.rebuilds_orbit();

            return true;
        };
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================
    }
}) ();

