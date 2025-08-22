( function() {
    var {
        ns, nspaste, mcurve, mat,
        fconf, ssD,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList : {
            init_model_parameters,
        },
    });
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        var op = sconf.orbitParameters;
        toreg( 'approximated-curve' );
        toreg( 'instanttriangle' );

        rg.P.q = op.PparQ_initial;
        ////creates both curve and its area
        stdMod.creates_orbitRack();
        {
            let {
                rr,
                projectionOfCenterOnTangent,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q : op.PparQ_initial,
                rrc : rg.S.pos,
            });
            nspaste( rg.P.pos, rr );
            nspaste( rg.Y.pos, projectionOfCenterOnTangent );
            ////establishes rg.omegaHandle.pos
            let excess = -0.2;
            rg.omegaHandle.initialPos = mat.sm( 1+excess, rg.Y.pos, -excess, rg.P.pos );
            nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );
        }

        stdMod.completesSlidersCreation();      //in-diagram sliders
        stdMod.establishesEccentricity( sconf.orbitParameters.eccentricity );

    }

}) ();

