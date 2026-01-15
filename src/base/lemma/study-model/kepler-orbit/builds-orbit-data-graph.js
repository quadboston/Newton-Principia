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
        const GRAPH_PATH = sData.GRAPH_PATH;
        const Q_STEPS = sconf.Q_STEPS;
        const DATA_GRAPH_STEPS = sconf.DATA_GRAPH_STEPS;
        const force_law_function = sconf.force_law_function;
        const IS_DEVIATION_SCALED_BY_FORCE_MAX = sconf.IS_DEVIATION_SCALED_BY_FORCE_MAX;
        const DEVIATION_SCALE_FACTOR = sconf.DEVIATION_SCALE_FACTOR || 1;
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
        const maxSP = 1.5;//TEMP
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
                sagittaMax = Math.max( Math.abs( sagitta ), sagittaMax );
                instantForceMax = Math.max( Math.abs( instantForce ), instantForceMax );
                displMax = Math.max( Math.abs( displacement ), displMax );
                speedMax = Math.max( speedMax, ds_dt );
                let graphColumn = {
                    qix,
                    rr : bP.rr,
                    // x : GRAPH_PATH ? bP.pathAtQ : bP.r, //TEMP
                    x : GRAPH_PATH ? bP.pathAtQ : 
                        (sconf.USE_LOG_SCALE ? Math.log(bP.r) : bP.r),
                };
                //TEMP To limit how much of the graph is shown
                // if (bP.r <= maxSP)
                    graphArray.push( graphColumn );
            }
            //TEMP To hide black vertical line when it "leaves" the graph.
            // if (bP.r <= maxSP) {
                bP.gix = Math.max(0,graphArray.length-1);
            // } else {
            //     bP.gix = -1;
            // }
        }

        //Sometimes solvable is true at this point but just barely.  When this
        //is the case it's possible graphArray can still be empty, meaning no
        //valid position for point P exists.
        if (ssD.solvable && graphArray.length === 0)
            ssD.solvable = false;

        //------------------------------------------
        // //\\ resets graphArray
        //------------------------------------------
        // console.log("Graph Data");//TEMP
        // let output = `q, SP, instf, disp, P.x, P.y\n`;//TEMP
        var arrLen = graphArray.length;
        for( var gix = 0; gix<arrLen; gix++ ){
            const ga = graphArray[ gix ];
            const qix = ga.qix;
            const bP = qIndexToOrbit[ qix ];
            //TEMP Commented as part of hiding the black vertical line
            bP.gix = gix;
            const instf = Math.abs(bP.instantForce) / instantForceMax;
            const disp = Math.abs(bP.displacement) / instantForceMax;
            // const disp = Math.abs(bP.displacement) / (IS_DEVIATION_SCALED_BY_FORCE_MAX ?
            //             instantForceMax * DEVIATION_SCALE_FACTOR : displMax);
            const ds_dt = bP.ds_dt / speedMax;
            const sagitta = Math.abs(bP.sagitta) / sagittaMax;
            // output += `${bP.q}, ${bP.r}, ${instf}, ${disp}, ${bP.rr[0]}, ` +
            //           `${bP.rr[1]}\n`;//TEMP
            ga.y = [
                instf,
                disp,
                ds_dt,
                sagitta,
            ];
        }
        // console.log(output);//TEMP
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