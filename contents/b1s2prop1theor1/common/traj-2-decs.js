( function() {
    var {
        ns, sn, haz, nspaste, mat,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            traj2decs,
        },
    });
    return;








    ///at current ver, runs at every model_upcreate
    function traj2decs()
    {
        var path            = rg.path.pos;

        //-----------------------------------------------------
        // //\\ recalculates CDEF points pos
        //-----------------------------------------------------
        ( function() {
            [ 'C', 'D', 'E', 'F' ].forEach( kname => {
                var rgP = rg[ kname ];
                var decStart = rgP.decStart;
                nspaste( rgP.pos, path[ ( decStart - decStart%4 ) / 4 ] );
            });
        })();
        //-------------------------------------------------
        // \\// recalculates CDEF points pos
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


        //-------------------------------------------------
        // //\\ refills corollary pos
        //-------------------------------------------------
        rg.h.pos[0] = rg.c.pos[0];
        rg.h.pos[1] = rg.c.pos[1];
        rg.g.pos[0] = rg.f.pos[0];
        rg.g.pos[1] = rg.f.pos[1];
        rg.j.pos[0] = rg.d.pos[0];
        rg.j.pos[1] = rg.d.pos[1];
        //-------------------------------------------------
        // \\// refills corollary pos
        //-------------------------------------------------

        nspaste( rg.Caracc.pos, rg.pathAracc.pos[ 2 ] );
        nspaste( rg.Paracc.pos, mat.dropPerpendicular( rg.C.pos, rg.S.pos, rg.B.pos ) );

        rg.Varacc.pos[0] = rg.Caracc.pos[0]-rg.C.pos[0]+rg.V.pos[0];
        rg.Varacc.pos[1] = rg.Caracc.pos[1]-rg.C.pos[1]+rg.V.pos[1];
    }


}) ();

