( function() {
    var {
        sn, mat, stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList : { init_model_parameters, },
    });
    var sop = sn( 'sampleOrbitParameters', sconf ); //green conic
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        //called once on page load
        //console.log('init_model_parameters'); 

        var op = sconf.orbitParameters;

        //add objects to registry (rg)
        toreg( 'approximated-curve' );
        toreg( 'approximated-curve-sample' );
        toreg( 'orbitarea' );
        toreg( 'orbitarea-sample' );
        toreg( 'instanttriangle' );
        toreg( 'instanttriangle-sample' );

        ////creates both curve and its area (defined in makes-orbit.js)
        stdMod.creates_orbitRack();
        stdMod.creates_orbitRack( sop );

        //cor2.
        let Dpos = rg[ 'approximated-curve' ].t2xy( 0 );
        let DVect = mat.unitVector( Dpos );
        sop.corII_speed = Math.sqrt( op.Kepler_g / DVect.abs );
        sop.corII_Dpos = Dpos;
        sop.corII_DVect = DVect;
        //---------------------------------
        // \\// sop initials
        //---------------------------------

        stdMod.completesSlidersCreation();      //in-diagram sliders
    }

}) ();