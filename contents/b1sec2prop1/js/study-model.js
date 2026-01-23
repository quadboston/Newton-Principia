(function(){
    const { sn, haff, hafff, nspaste, haz, globalCss, mat,
            rg, sconf, ssF, stdMod,
    } = window.b$l.apptree({ stdModExportList : {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;


    function init_model_parameters (){
        stdMod.sconf_2_shapes();
        stdMod.shapeSconf_2_svg();
        rg.displayTime = { value : '' };
        rg.thoughtStep = { value : '' };
        stdMod.creates_sliderDomModel__4__time();
        stdMod.creates_delta_time_slider();
    }

    function model_upcreate (){
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
        {
            let v = rg.speeds.vect[0];
            var pos = mat.addV( v, rg.A.pos );
            nspaste( rg.v.pos, pos );
        }
    }
})();
