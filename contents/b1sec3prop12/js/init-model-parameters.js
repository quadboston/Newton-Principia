( function() {
    var {
        ns, sn, $$, nsmethods, nspaste, nssvg, mcurve, integral, mat,
        fconf, ssF, ssD, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
        },
    });
    var sop = sn( 'sampleOrbitParameters', sconf );
    return;













    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        var op = sconf.orbitParameters;
        toreg( 'approximated-curve' );
        toreg( 'approximated-curve-sample' );
        toreg( 'orbitarea' );
        toreg( 'orbitarea-sample' );
        toreg( 'instanttriangle' );
        toreg( 'instanttriangle-sample' );

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
            let excess = fconf.sappId === "b1sec3prop17" ?
                0.5 :
                -0.2
            ;
            rg.omegaHandle.initialPos = mat.sm( 1+excess, rg.Y.pos, -excess, rg.P.pos );
            nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );
        }
        if( fconf.sappId === 'b1sec3prop17' ) {
            //---------------------------------
            // //\\ sop initials
            //      stashes some values
            //---------------------------------
            stdMod.creates_orbitRack( sop );
            let {
                rr,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve-sample' ].t2xy,
                q   : sop.PparQ_initial,
                rrc : rg.S.pos,
            });
            nspaste( rg.p.pos, rr );
            rg.p.proofPos = nspaste( [], rr );

            //cor2.
            let Dpos = rg[ 'approximated-curve' ].t2xy( 0 );
            let DVect = mat.unitVector( Dpos );
            sop.corII_speed = Math.sqrt( op.Kepler_g / DVect.abs );
            sop.corII_Dpos = Dpos;
            sop.corII_DVect = DVect;
            //---------------------------------
            // \\// sop initials
            //---------------------------------
        }

        stdMod.completesSlidersCreation();      //in-diagram sliders
        stdMod.establishesEccentricity( sconf.orbitParameters.eccentricity );
        //creates placeholder
        //toreg( 'curvatureCircle' );
        //toreg( 'tangentCircle' );

        //==================================================
        // //\\ decoration graph
        //==================================================
        ssD.zebraCols = {};
        [ false, ns.rgbaArr2hsla( [0,     0,   255,    1] )[0] ].forEach(
            ( monoColorHue ) => {
                var wwCols = ns.builds_zebraNColors_array({
                    maxColors : 10,
                    SATUR       : sconf.DEFAULT_TP_SATUR,  //site setting

                    //40 seems better than 40 for distinct graph lines
                    LIGHT       : 40,  //sconf.default_tp_lightness ||
                    OPACITY     : 0.8, //apparently irrelevant; sconf.DEFAULT_TP_OPACITY,
                    zebraNumber : 4,
                    monoColorHue, //true is for mono, false is for multy,
                });
                if( monoColorHue ) {
                    ssD.zebraCols.monocolor = wwCols;
                } else {
                    ssD.zebraCols.multicolor = wwCols;
                }
            });
        if( fconf.effId !== "b1sec3prop14" ) {
            stdMod.createsGraphFW( stdMod.legendRoot$ );
        }
        //==================================================
        // \\// decoration graph 
        //==================================================

        //too early: overriden later by sconf.rgShapesVisible
        //rg[ 'S,nonSolvablePoint' ].undisplay = true;
    }

}) ();

