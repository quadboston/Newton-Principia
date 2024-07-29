( function() {
    var {
        sn, haff, hafff, haz,
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
            );
        rg.force.inarray = ['B','C','D','E','F'].map( (pname, fix) => {
            return {
                'lawPower' : sconf.force[0][0],
                'lawConstant' : sconf.force[0][1],
            };
        });

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
        toreg( 'impulses' )( 'vectors', [] );
        toreg( 'impulsesAracc' )( 'vectors', [] );

        //spawnes path placeholder
        toreg( 'pathRacks' )( 'pathRacks', [] );
        toreg( 'pathRacksAracc' )( 'pathRacks', [] );
        //=========================================================
        // \\// placeholders for body states along trajectory,
        //=========================================================

        ssF.doesSchedule_A_B_V_sliders_in_init_pars( stdMod );
        stdMod.creates_sliderDomModel__4__time();
        stdMod.creates_delta_time_slider();
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================


    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function model_upcreate()
    {
        //for case if captured click does not have curtime set
        stdMod.protects_curTime_ranges();

        ssF.solvesTrajectoryMath__O();
        //what is this? haff( stdMod, 'model_upcreate_addon' );
        //what is this? ssF.ABVpos_2_trajectory( stdMod );

        //apparently all of this is virtual
        stdMod.path2rgModelPlaceholders__I();
        stdMod.traj2decs__II();
        stdMod.trajectoryShapes_2_groups__III();
    }
    
}) ();

