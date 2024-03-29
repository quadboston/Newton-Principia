( function() {
    var {
        sn, haff, haz,
        sconf, ssF,
        stdMod, amode, toreg, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;










    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        // complimentary to and runs after
        // sconf.js::init_conf(),
        stdMod.decShapes_conf();

        //=========================================================
        // //\\ placeholders for body states along trajectory,
        //      Aracc postfix stands for "area-accelerating force"
        //=========================================================
        toreg( 'force' )
            ( 'lawPower', sconf.force[0][0] ) //-2
            ( 'lawConstant', sconf.force[0][1]
               /(sconf.initialTimieStep*sconf.initialTimieStep) )
            ;

        //awkward prop name. "pos"
        //area accelerating force
        toreg( 'forceAracc' )
            ( 'tangentialForcePerCentripetal_fraction',
               sconf.tangentialForcePerCentripetal_fraction )
            ;

        //path and speeds have master-index, pi, offset pi=0
        toreg( 'path' )( 'pos', [ rg.A.pos ] ); //awkward prop name. "pos"
        toreg( 'pathAracc' )( 'pos', [ rg.A.pos ] ); //awkward prop name. "pos"

        //:auxiliary params
        toreg( 'freePath' )( 'pos', [] ); //awkward prop name. "pos"
        toreg( 'freePathAracc' )( 'pos', [] ); //awkward prop name. "pos"

        //freeTriangles have master-index, pi, offset ... see media-model
        //tp( 'freeTriangles', [] );

        //keplerTriangles have master-index, pi, offset ... see media-model
        toreg( 'keplerTriangles' )( 'pos', [] );  //awkward prop name. "pos"
        toreg( 'keplerTrianglesAracc' )( 'pos', [] ); //awkward prop name. "pos"

        //forces have master-index, pi, offset  ... see media-model
        toreg( 'forces' )( 'vectors', [] );
        toreg( 'forcesAracc' )( 'vectors', [] );

        //spawnes path placeholder
        toreg( 'pathRacks' )( 'pathRacks', [] );
        toreg( 'pathRacksAracc' )( 'pathRacks', [] );
        //=========================================================
        // \\// placeholders for body states along trajectory,
        //=========================================================

        ssF.doesSchedule_A_B_V_sliders_in_init_pars( stdMod );
        stdMod.creates_delta_time_slider();
        stdMod.creates_sliderDomModel__4__time();
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================


    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function model_upcreate()
    {
        ccc( rg.slider_sltime.curtime );
        ssF.solvesTrajectoryMath();
        //haff( stdMod, 'model_upcreate_addon' );
        //ssF.ABVpos_2_trajectory( stdMod );

        //apparently all of this is virtual
        stdMod.traj2trshapes();
        stdMod.traj2decs();
        stdMod.trajectoryShapes_2_groups();
    }

}) ();

