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
    var op = sn( 'orbitParameters', sconf );
    return;













    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        //var op = sconf.orbitParameters;
        toreg( 'approximated-curve' );
        //toreg( 'orbitarea' );
        sconf.originalPoints.curvePivots_initial = nspaste( {}, sconf.originalPoints.curvePivots );

        //sets and paints initial orbit
        stdMod.pointsArr_2_singleDividedDifferences(
            false, 'force', false, false, 'swap' );

        stdMod.completesSlidersCreation();      //in-diagram sliders

        let omega = Math.sin( op.angleOmega );
        let vv = [ -op.Kepler_v * omega,        //"-" bs x and y swapped in media-model
                    op.Kepler_v * Math.cos( op.angleOmega ) ];

        //initial speed
        nspaste( rg.v.pos,         mat.sm( rg.V.pos, vv ) ); 
        nspaste( rg.Vangle.pos,     mat.sm( 1, rg.V.pos, 2, vv ) ); 
    }

}) ();

