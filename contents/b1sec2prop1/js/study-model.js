(function(){
    const { sn, haff, hafff, haz, globalCss,
            sconf, ssF, ssD, stdMod, amode, toreg, rg,
    } = window.b$l.apptree({ stdModExportList : {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;


    function init_model_parameters (){
        ccc( 'init_model_parameters' );
        stdMod.sconf_2_svg8rg();
        ssF.doesSchedule_A_B_V_sliders_in_init_pars();
        stdMod.creates_sliderDomModel__4__time();
        stdMod.creates_delta_time_slider();
    }

    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function model_upcreate()
    {
        //console.log('model_upcreate');
        //for case if captured click does not have curtime set
        stdMod.protects_curTime_ranges();

        ssF.solvesTrajectoryMath__O();
        //what is this? haff( stdMod, 'model_upcreate_addon' );
        //what is this? ssF.ABVpos_2_trajectory();

        //apparently all of this is virtual
        stdMod.path2rgModelPlaceholders__I();
        stdMod.traj2decs__II();
        stdMod.trajectoryShapes_2_groups__III();
    }
})();