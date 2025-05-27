( function() {
    var {
        sn, nspaste, haff, haz,
        rg, stdMod, sconf, ssD, sData,
    } = window.b$l.apptree({
        stdModExportList :
        {
            initiates_orbit8graph,
            rebuilds_orbit,
            initiates_kepler_config,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
    return;

    
    function initiates_kepler_config() {
        sconf.curveQRange = sconf.orbit_q_end - sconf.orbit_q_start;
        sconf.pointDecoration.r = sconf.handleRadius;
        sconf.qgrid_step = sconf.curveQRange / sconf.Q_STEPS;

        //todm competing aliases:
        sconf.qgrid_step1 = 1 / sconf.qgrid_step;
        sconf.q2qix = 1 / sconf.qgrid_step;

        sconf.ro02 = sconf.ro0*sconf.ro0 / 2;
        
        //3 and 5 make float noize on graph:
        sn( 'SAGITTA_ACCURACY_LIMIT', sconf, 10 );
    }    
    
    function initiates_orbit8graph() {
        initiates_kepler_config();
        stdMod.graphFW_lemma = stdMod.createsGraph_FW_lemma({
               digramParentDom$:stdMod.legendRoot$ });
        stdMod.creates_poly2svg_for_lemma();
        stdMod.rebuilds_orbit();
        
        stdMod.creates__gets_orbit_closest_point();
        
        //:sets parameters of P
        rg.P.qix = Math.floor( sconf.parQ * sconf.q2qix );
        var Porb = ssD.qix2orb[ rg.P.qix ];
        nspaste( rg.P.pos, Porb.rr );

        // //\\ scenario: coincided P and Q: Q splits first
        rg.P.dragPriority = 10;
        rg.Q.dragPriority = 100;
        rg.P.DRAGGEE_HALF_SIZE = 40; //lets to catch P before Q,
        rg.Q.DRAGGEE_HALF_SIZE = 15; //usual default in fconf,
        // \\// scenario: coincided P and Q: Q splits first
        
        stdMod.creates_Q8P_sliders();
        if( rg.S.draggableX || rg.S.draggableY ) {
            stdMod.creates_S_slider();
        }
    }
    
    function rebuilds_orbit( keepThisDt ) {
        const SACC = sconf.SAGITTA_ACCURACY_LIMIT;
        const QS = sconf.Q_STEPS;
        stdMod.recreates_q2xy();
        stdMod.buildsOrbit();
        stdMod.poly2svgP11();
        sconf.TIME_IS_FREE_VARIABLE && stdMod.builds_orbit_time_grid();
        ssD.Dq = sconf.Dq0;
        ssD.Dt = keepThisDt || sn( ssD, 'Dt', sconf.Dt0 );
        stdMod.builds_dq8sagit8displace({ ulitmacy:sData.ULTIM_MAX });
        stdMod.builds_dq8sagit8displace({ulitmacy:sData.ULTIM_INSTANT});
        stdMod.builds_dq8sagit8displace({});
        stdMod.builds_orbit_data_graph();
    }
}) ();