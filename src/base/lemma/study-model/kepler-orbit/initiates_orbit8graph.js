( function() {
    var { sn, nspaste, haff, haz, rg, stdMod, sconf, ssD, sData, }
        = window.b$l.apptree({ stdModExportList : {
            initiates_orbit8graph,
            rebuilds_orbit,
            initiates_kepler_config,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    const qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    return;

    
    function initiates_kepler_config() {
        sconf.curveQRange = sconf.orbit_q_end - sconf.orbit_q_start;
        sconf.pointDecoration.r = sconf.handleRadius;
        sconf.delta_q_between_steps = sconf.curveQRange / sconf.Q_STEPS;

        //todm competing aliases:
        //Update: Could replace this variable where used with (1 / sconf.delta_q_between_steps)
        sconf.delta_q_between_steps_reciprocal = 1 / sconf.delta_q_between_steps;
        //Update: q2qix was a function so could be confusing here, also duplicate of above
        //sconf.q2qix = 1 / sconf.delta_q_between_steps;

        sconf.ro0SquaredDivide2 = sconf.ro0*sconf.ro0 / 2;
        
        //3 and 5 make float noize on graph:
        sn( 'SAGITTA_ACCURACY_LIMIT', sconf, 10 );
        sData.GRAPH_PATH = false; //local lemma can change this
    }    
    
    function initiates_orbit8graph() {
        initiates_kepler_config();
        stdMod.graphFW_lemma = stdMod.createsGraph_FW_lemma({
               digramParentDom$:stdMod.legendRoot$ });
        stdMod.creates_poly2svg_for_lemma();
        stdMod.rebuilds_orbit();
        
        stdMod.creates__gets_orbit_closest_point();
        
        //:sets parameters of P
        rg.P.qix = Math.floor( sconf.parQ * sconf.delta_q_between_steps_reciprocal );
        var Porb = ssD.qIndexToOrbit[ rg.P.qix ];
        nspaste( rg.P.pos, Porb.rr );

        // //\\ scenario: coincided P and Q: Q splits first
        rg.P.dragPriority = 10;
        rg.Q.dragPriority = 100;
        // \\// scenario: coincided P and Q: Q splits first
        
        stdMod.creates_Q8P_sliders();
        if( rg.S.draggableX || rg.S.draggableY ) {
            stdMod.creates_S_slider();
        }
    }
    
    function rebuilds_orbit( keepThisDt ) {
        const SACC = sconf.SAGITTA_ACCURACY_LIMIT;
        const Q_STEPS = sconf.Q_STEPS;
        stdMod.recreates_q2xy();
        stdMod.buildsOrbit();
        stdMod.poly2svgP11();
        sconf.TIME_IS_FREE_VARIABLE && stdMod.builds_orbit_time_grid();
        ssD.Dq = sconf.Dq0;
        ssD.Dt = keepThisDt || sn( ssD, 'Dt', sconf.Dt0 );
        stdMod.builds_dq8sagit8displace({ ulitmacy:sData.ULTIM_MAX });
        stdMod.builds_dq8sagit8displace({ ulitmacy:sData.ULTIM_INSTANT });
        stdMod.builds_dq8sagit8displace({});
        stdMod.builds_orbit_data_graph();
    }
}) ();