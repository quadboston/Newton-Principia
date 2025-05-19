( function() {
    var {
        sn, nspaste, haff,
        rg, stdMod, sconf, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            initiates_orbit8graph,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
    return;


    function initiates_orbit8graph() {
        stdMod.graphFW_lemma = stdMod.createsGraph_FW_lemma({
               digramParentDom$:stdMod.legendRoot$ });
        
        stdMod.recreates_q2xy();
        
        //order of these two lines  is significant
        haff( stdMod, 'recreates_pos2q' );
        //stdMod.recreates_q8pos_2_q8pos8qix( sconf.orbit_q_start );
        stdMod.creates_poly2svg_for_lemma();

        stdMod.buildsOrbit();
        ssD.qix_graph_lim = null;
        if( sconf.TIME_IS_FREE_VARIABLE ){
            ssD.Dt = sconf.DT_SLIDER_MAX;
            //establishes limit for q:
            stdMod.builds_dq8sagitta8deviation();
            ssD.Dt = sconf.Dt0;
            stdMod.builds_dq8sagitta8deviation();
        } else {
            ssD.Dq = sconf.Dq0;
            stdMod.builds_dq8sagitta8deviation();
        }
        stdMod.builds_orbit_data_graph( sconf.force_law );
        stdMod.creates__gets_orbit_closest_point();
        
        //:sets parameters of P
        rg.P.qix = Math.floor( sconf.parQ / sconf.qgrid_step );
        var Porb = ssD.qix2orb[ rg.P.qix ];
        nspaste( rg.P.pos, Porb.rr );

        // //\\ scenario: coincided P and Q: Q splits first
        rg.P.dragPriority = 10;
        rg.Q.dragPriority = 100;
        rg.P.DRAGGEE_HALF_SIZE = 50; //lets to catch P
        rg.Q.DRAGGEE_HALF_SIZE = 15; //usual default in fconf,
        // \\// scenario: coincided P and Q: Q splits first
        
        stdMod.creates_Q8P_sliders();
        if( rg.S.draggableX || rg.S.draggableY ) {
            stdMod.creates_S_slider();
        }
    }
}) ();