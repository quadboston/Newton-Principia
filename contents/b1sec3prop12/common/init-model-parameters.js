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
    return;













    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        var op = sconf.orbitParameters;
        toreg( 'approximated-curve' );
        toreg( 'orbitarea' );
        toreg( 'instanttriangle' );

        rg.P.q = op.PparQ_initial;
        stdMod.creates_orbitRack();
        {
            var {
                rr,
                projectionOfCenterOnTangent,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q : op.PparQ_initial,
                rrc : rg.S.pos,
            });
            nspaste( rg.P.pos, rr );
            nspaste( rg.Y.pos, projectionOfCenterOnTangent );
            {
                ////establishes rg.Yhandle.pos
                let excess = fconf.sappId === "b1sec3prop17" ?
                    0.5 :
                    -0.2
                ;
                rg.Yhandle.initialPos = mat.sm( 1+excess, rg.Y.pos, -excess, rg.P.pos );
                nspaste( rg.Yhandle.pos, rg.Yhandle.initialPos );
            }
        }

        stdMod.completesSlidersCreation();      //in-diagram sliders
        stdMod.establishesEccentricity( sconf.orbitParameters.eccentricity );
        //creates placeholder
        //toreg( 'curvatureCircle' );
        toreg( 'tangentCircle' );

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
                                       //sconf.DEFAULT_TP_LIGHT,
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

