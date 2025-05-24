( function() {
    var {
        sn, nspaste, haff, haz,
        rg, stdMod, sconf, ssD,
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
        if( sconf.TIME_IS_FREE_VARIABLE ) {
            stdMod.builds_orbit_time_grid();
            const Dt_stashed = keepThisDt || sn( ssD, 'Dt', sconf.Dt0 );
          
            //establishes limit for q:
            ssD.qix_graph_lim = null;
            ssD.Dt = sconf.DT_SLIDER_MAX;
            //c cc( 'DT_MAX='+ssD.Dt.toFixed(8) );
            stdMod.builds_dq8sagitta8deviation();
            
            //gets instant sagitta
            ssD.Dt = ssD.tgrid_step*(SACC+1);
            //c cc( 'DT_MIN='+ssD.Dt.toFixed(8) );
            stdMod.builds_dq8sagitta8deviation();
            for( var ix = 0; ix<=QS; ix++ ){
                const bP = qix2orb[ ix ];
                bP.instant_sagitta = bP.sagitta;
                //not in use yet:
                //bP.instant_sagittaVector= bP.sagittaVector;
            }
           
            //restores current Dt:
            ssD.Dt = Dt_stashed;
            //c cc( 'DT='+ssD.Dt.toFixed(8) );
            stdMod.builds_dq8sagitta8deviation();
        } else {
            ssD.qix_graph_lim = null;
            ssD.Dq = sconf.Dq0;
            stdMod.builds_dq8sagitta8deviation();
        }
        stdMod.builds_orbit_data_graph();
    }
}) ();