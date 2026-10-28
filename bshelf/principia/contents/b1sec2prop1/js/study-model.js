{
    const { sn, haff, hafff, nspaste, haz, globalCss, mat,
            rg, sconf, ssF, stdMod,
          } =
          window.b$l.atree({ stdModList: {
            init_lemma,
            model_upcreate,
        },
    });

    function init_lemma (){
        stdMod.sconf_2_shapes();
        stdMod.shapeSconf_2_svg();
        rg.displayTime = { value : '' };
        rg.thoughtStep = { value : '' };
    }

    function model_upcreate (){
        ssF.solvesTrajectoryMath__O();
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
}