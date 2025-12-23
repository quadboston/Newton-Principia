( function() {
    var { mcurve, nspaste, ssD, stdMod, rg, } = window.b$l.apptree({
        stdModExportList : { creates_Zeta_slider, }, });
    return;


    function creates_Zeta_slider()
    {
        //=========================================================================
        // //\\ eccentricity slider
        //=========================================================================
        rg.Zeta.acceptPos = newPos => {
            var scale = ( rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0] );
            var modelPar = ( newPos[0] - rg.ZetaStart.pos[0] )
                           / scale;
            modelPar = Math.max( 0.0000000001, Math.min( 0.99999999, modelPar ) );  //validates
            var zeta = Math.PI / 2 * modelPar;
            var eccentricity = Math.tan( zeta );
            stdMod.establishesEccentricity( eccentricity, false );
            newPos[0] = rg.Zeta.pos[0];         //corrects
            newPos[1] = rg.ZetaStart.pos[1];    //corrects
            //TEMP The following may need to be updated to use different
            //standardized code.
            // var { angleRV, rr } = mcurve.planeCurveDerivatives({
            //     fun : rg[ 'approximated-curve' ].t2xy,
            //     q : rg.P.q,
            //     rrc : rg.S.pos,
            // });
            // nspaste( rg.P.pos, rr );
            //TEMP Temporary replacement for the above (similar to the code in
            //"model-upcreate.js").
            var Porb = ssD.qIndexToOrbit[ rg.P.qix ];
            rg.P.pos[0] = Porb.rr[0];
            rg.P.pos[1] = Porb.rr[1];

            //TEMP Copied from P11
            stdMod.rebuilds_orbit();
            stdMod.model8media_upcreate();
            return true;
        }
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================
    }
}) ();

