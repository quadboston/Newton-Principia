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
        sconf.pointDecoration.r = sconf.handleRadius;
        sconf.ro0SquaredDivide2 = sconf.ro0*sconf.ro0 / 2;
        sData.GRAPH_PATH = false; //local lemma can change this
    }    
    
    function initiates_orbit8graph() {
        initiates_kepler_config();
        stdMod.graphFW_lemma = stdMod.createsGraph_FW_lemma({
               digramParentDom$:stdMod.legendRoot$ });
        stdMod.creates_createOrUpdateOrbit();
        stdMod.rebuilds_orbit();
        
        stdMod.creates__gets_orbit_closest_point();
        
        //:sets parameters of P
        rg.P.qix = Math.floor( sconf.parQ / sconf.delta_q_between_steps );
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
        const Q_STEPS = sconf.Q_STEPS;

        if (stdMod.recalculateOrbitStartAndEnd)
            stdMod.recalculateOrbitStartAndEnd();
        sconf.curveQRange = sconf.orbit_q_end - sconf.orbit_q_start;
        sconf.delta_q_between_steps = sconf.curveQRange / Q_STEPS;

        stdMod.recreates_q2xy();
        stdMod.buildsOrbit();
        stdMod.createOrUpdateOrbit();
        if (sconf.TIME_IS_FREE_VARIABLE) {
            const timeS = qIndexToOrbit[0].timeAtQ;
            const timeE = qIndexToOrbit[Q_STEPS].timeAtQ;
            ssD.timeRange = timeE - timeS;
        }
        ssD.Dq = sconf.Dq0;
        ssD.Dt = keepThisDt || sn( ssD, 'Dt', sconf.Dt0 );
        stdMod.builds_dq8sagit8displace({ ulitmacy:sData.ULTIM_MAX });
        stdMod.builds_dq8sagit8displace({ ulitmacy:sData.ULTIM_INSTANT });
        stdMod.builds_dq8sagit8displace({});
        stdMod.builds_orbit_data_graph();

        //Adjust point P if out of bounds
        const qixMin = ssD.qix_graph_start;
        const qixMax = ssD.qix_graph_end;
        rg.P.qix = Math.max(qixMin, Math.min(qixMax, rg.P.qix));
    }
}) ();