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
        rg.Zeta.acceptPos = newPos => {
            const zetaMin = op.ZETA_MIN;
            const zetaMax = op.ZETA_MAX;

            var scale = ( rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0] );
            var modelPar = ( newPos[0] - rg.ZetaStart.pos[0] )
                           / scale;
            modelPar = Math.max( 0.0000000001, Math.min( 0.99999999, modelPar ) );  //validates
            var zeta = (zetaMax - zetaMin) * modelPar + zetaMin;
            var eccentricity = Math.tan( zeta );
            stdMod.establishesEccentricity( eccentricity, false );
            newPos[0] = rg.Zeta.pos[0];         //corrects
            newPos[1] = rg.ZetaStart.pos[1];    //corrects

            stdMod.rebuilds_orbit();
            return true;
        }
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================
    }
}) ();

