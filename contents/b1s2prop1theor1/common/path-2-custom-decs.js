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
        [ 'C', 'D', 'E', 'F' ].forEach( kname => {
            var rgP = rg[ kname ];
            var decStart = rgP.decStart;
            nspaste( rgP.pos, path[ ( decStart - decStart%4 ) / 4 ] );
        });
        nspaste( rg.B.pos, path[1] );
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
        //-------------------------------------------------
        // \\// refills corollary pos
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

