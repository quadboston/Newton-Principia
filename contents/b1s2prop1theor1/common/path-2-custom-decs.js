( function() {
    var {
        ns, sn, haz, nspaste, mat,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            traj2decs__II,
        },
    });
    return;








    ///at current ver, runs at every model_upcreate
    function traj2decs__II()
    {
        var path            = rg.path.pos;
        var freePath        = rg.freePath.pos;

        //-----------------------------------------------------
        // //\\ allocates positions for c,d,e,f
        //-----------------------------------------------------
        //      for c,d,e,f - "free" points
        nspaste( rg.c.pos, freePath[0] );
        nspaste( rg.d.pos, freePath[1] );
        nspaste( rg.e.pos, freePath[2] );
        nspaste( rg.f.pos, freePath[3] );
        //-----------------------------------------------------
        // \\// allocates positions for c,d,e,f
        //-----------------------------------------------------
        //-------------------------------------------------
        // //\\ refills corollary pos
        //-------------------------------------------------
        nspaste( rg.h.pos, rg.c.pos );
        nspaste( rg.g.pos, rg.f.pos );
        //-------------------------------------------------
        // \\// refills corollary pos
        //-------------------------------------------------

        //-----------------------------------------------------
        // //\\ recalculates BCDEF points pos
        //-----------------------------------------------------
        [ 'B', 'C', 'D', 'E', 'F' ].forEach( (kname,ix) => {
            nspaste( rg[ kname ].pos, path[ ix + 1 ] );
        });
        //-------------------------------------------------
        // \\// recalculates BCDEF points pos
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ recalculates sagittaes pos
        //-------------------------------------------------
        ( function() {
            nspaste( rg.U.pos, [
                ( rg.B.pos[0] + rg.V.pos[0] )*0.5,
                ( rg.B.pos[1] + rg.V.pos[1] )*0.5,
            ] );
            nspaste( rg.W.pos, [
                ( rg.E.pos[0] + rg.Z.pos[0] )*0.5,
                ( rg.E.pos[1] + rg.Z.pos[1] )*0.5,
            ] );
        })();
        //-------------------------------------------------
        // \\// recalculates sagittaes pos
        //-------------------------------------------------


        //top of the accelerated kepler-triangle
        nspaste( rg.Caracc.pos, rg.pathAracc.pos[ 2 ] );

        //"legacy"(non-accelerated) perpendicular form C to radii,
        //rg.Paracc.pos is perpendiculare base-point,
        nspaste( rg.Paracc.pos, mat.dropPerpendicular( rg.C.pos, rg.S.pos, rg.B.pos ) );

        //=== normal-to-radii-displacement - added to position "V"
        rg.Varacc.pos[0] =
                rg.Caracc.pos[0]-rg.C.pos[0]+ //normal displaysment
                rg.V.pos[0];                  //position "V"
        rg.Varacc.pos[1] = rg.Caracc.pos[1]-rg.C.pos[1]+rg.V.pos[1];
    }


}) ();

