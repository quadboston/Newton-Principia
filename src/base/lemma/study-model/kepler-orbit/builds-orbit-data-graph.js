( function() {
    var { sn, haz, rg, amode, stdMod, sconf, ssD, sData, } 
        = window.b$l.apptree({ stdModExportList : {
            builds_orbit_data_graph,
            qIndexFromPointPToGraphIndex,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    const qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    const orbitXYToDraw = sn( 'orbitXYToDraw', ssD, [] );
    return;


    function qIndexFromPointPToGraphIndex(){
        const qix = rg.P.qix;
        const gix = qIndexToOrbit[ qix ]?.gix;
        return gix;
    }


    function builds_orbit_data_graph()
    {
        const DO_NORMALIZE_FORCE_BY_ULTIMATE_MAX = 
              haz( sconf, 'DO_NORMALIZE_FORCE_BY_ULTIMATE_MAX' );
        const TIME = sconf.TIME_IS_FREE_VARIABLE;
        const GRAPH_PATH = sData.GRAPH_PATH;
        const Q_STEPS = sconf.Q_STEPS;
        const DATA_GRAPH_STEPS = sconf.DATA_GRAPH_STEPS;
        const force_law_function = sconf.force_law_function;
        const dataPeriod = Math.max( 1, Math.floor( Q_STEPS/DATA_GRAPH_STEPS ) );

        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        const gstart = ssD.qix_graph_start;
        const gend = ssD.qix_graph_end;
        var displMax = 0;
        var sagittaMax = 0;
        var instantForceMax = 0;
        var speedMax = 0;
        //var fullPath = qIndexToOrbit[ gend ].pathAtQ;
        for( let qix=gstart; qix<=gend; qix++ ){
            const bP = qIndexToOrbit[ qix ];
            const displacement = bP.displacement;
            const sagitta = bP.sagitta;
            const ds_dt = bP.ds_dt;
            if( force_law_function ){
                var instantForce = force_law_function(bP);

            //this is a stub for non-Kepler orbits:    
            //} else if( sconf.TIME_IS_FREE_VARIABLE ){
            //    var instantForce = bP.instant_sagitta;

            } else {
                var instantForce = bP.instant_displacement;
            }
            bP.instantForce = instantForce;
            if( !(qix%dataPeriod) || qix===Q_STEPS ){
                if( TIME ){
                    sagittaMax = Math.max( Math.abs( sagitta ), sagittaMax );
                }
                instantForceMax = Math.max( Math.abs( instantForce ), instantForceMax );
                displMax = Math.max( Math.abs( displacement ), displMax );
                speedMax = Math.max( speedMax, ds_dt );
                let graphColumn = {
                    qix,
                    rr : bP.rr,
                    x : GRAPH_PATH ? bP.pathAtQ : bP.r,
                };
                graphArray.push( graphColumn );
            }
            bP.gix = Math.max(0,graphArray.length-1);
        }

        //Sometimes solvable is true at this point but just barely.  When this
        //is the case it's possible graphArray can still be empty, meaning no
        //valid position for point P exists.
        if (ssD.solvable && graphArray.length === 0)
            ssD.solvable = false;

        //------------------------------------------
        // //\\ resets graphArray
        //------------------------------------------
        var arrLen = graphArray.length;
        const instantForceMax1 = 1/instantForceMax;
        const displMax1 = DO_NORMALIZE_FORCE_BY_ULTIMATE_MAX ?
                          1/instantForceMax : 1/displMax;
        const sagittaMax1 = 1/sagittaMax;
        const speedMax1 = 1/speedMax;
        for( var gix = 0; gix<arrLen; gix++ ){
            const ga = graphArray[ gix ];
            const qix = ga.qix;
            const bP = qIndexToOrbit[ qix ];
            bP.gix = gix;
            let instf = bP.instantForce;
            instf = instf * instantForceMax1 * Math.sign(instf);
            let disp = bP.displacement;
            disp *= displMax1 * Math.sign(disp);
            let ds_dt = bP.ds_dt;
            ds_dt *= speedMax1;
            ga.y = [
                instf,
                disp,
                ds_dt,
            ];
            if( TIME ){
                let sagitta = bP.sagitta;
                sagitta *= sagittaMax1 * Math.sign(sagitta);
                ga.y[3]=sagitta;
            }
        }
        ///this is a common graph lines, but this mask can be
        ///overriden in model_upcreate()
        stdMod.graphFW_lemma.graphArrayMask = 
            [ 
                'force',
                'displacement',
            ];
        //------------------------------------------
        // \\// resets graphArray
        //------------------------------------------
    }
}) ();
