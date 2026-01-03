(function(){
    const { ns, sn, nspaste, mcurve, mat,
          ssD, stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({ stdModExportList : {
            init_model_parameters,
        },
    });
    const sop = sn( 'sampleOrbitParameters', sconf );
    const graphArray = sn( 'graphArray', stdMod, [] );
    return;


    function init_model_parameters()
    {
        var op = sconf.orbitParameters;
        toreg( 'approxer' );
        toreg( 'approxer-sample' );
        toreg( 'orbitarea' );
        toreg( 'orbitarea-sample' ); //prop17
        toreg( 'instanttriangle' );  //todo ?
        toreg( 'instanttriangle-sample' );

        rg.P.q = op.PparQ_initial;
        ////creates both curve and its area
        stdMod.creates_orbitRack();
        {
            let {
                rr,
                projectionOfCenterOnTangent,
            } = mcurve.planeCurveDerivatives({
                fun : rg.approxer.t2xy,
                q : op.PparQ_initial,
                rrc : rg.S.pos,
            });
            nspaste( rg.P.pos, rr );
            nspaste( rg.Y.pos, projectionOfCenterOnTangent );
            ////establishes rg.omegaHandle.pos
            let excess = 0.5;
            rg.omegaHandle.initialPos = mat.sm( 1+excess, rg.Y.pos, -excess, rg.P.pos );
            nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );
        }
        {
            //---------------------------------
            // //\\ sop initials
            //      stashes some values
            //---------------------------------
            stdMod.creates_orbitRack( sop );
            let {
                rr,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approxer-sample' ].t2xy,
                q   : sop.PparQ_initial,
                rrc : rg.S.pos,
            });
            nspaste( rg.p.pos, rr );
            rg.p.proofPos = nspaste( [], rr );

            //cor2.
            let Dpos = rg.approxer.t2xy( 0 );
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
                    OPACITY     : 0.8, //apparently irrelevant;
                                       //sconf.DEFAULT_TP_OPACITY,
                    zebraNumber : 4,
                    monoColorHue, //true is for mono, false is for multy,
                });
                if( monoColorHue ) {
                    ssD.zebraCols.monocolor = wwCols;
                } else {
                    ssD.zebraCols.multicolor = wwCols;
                }
            });
        //==================================================
        // \\// decoration graph
        //==================================================
    }
})();
