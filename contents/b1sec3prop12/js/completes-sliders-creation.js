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
        let lastTime = 0;
        rg.A.acceptPos = newPos => {
            let now = performance.now();
            let deltaTime = now - lastTime;
            if(deltaTime < 60) return; // reduces jitter
            lastTime = now;

            const eMin = op.eccentricityMin;
            const eMax = op.eccentricityMax;
            const delta = newPos[0] - rg.A.pos[0];   

            if(Math.abs(delta) < 0.01) return; // to avoid jitter on Mac  

            const k = 1; // proportionate change factor
            const prevE = op.eccentricity;
            let newEccentricity = prevE + delta * k;

            // clamp to bounds
            newEccentricity = Math.max(eMin, Math.min(eMax, newEccentricity));

            stdMod.establishesEccentricity(newEccentricity, false);

            //Don't reset distance between Q and P
            stdMod.rebuilds_orbit(ssD.Dt);

            return true;
        };
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================
    }
}) ();

