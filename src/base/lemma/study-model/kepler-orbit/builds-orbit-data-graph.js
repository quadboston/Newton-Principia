( function() {
    var { sn, rg, stdMod, sconf, ssD, sData, } 
        = window.b$l.apptree({ stdModExportList : {
            builds_orbit_data_graph,
            qIndexFromPointPToGraphIndex,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    const qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    return;


    function qIndexFromPointPToGraphIndex(){
        const qix = rg.P.qix;
        const gix = qIndexToOrbit[ qix ]?.gix;
        return gix;
    }


    function builds_orbit_data_graph(setMaxGraphValues)
    {
        const Q_STEPS = sconf.Q_STEPS;
        const DATA_GRAPH_STEPS = sconf.DATA_GRAPH_STEPS;
        const IS_ESTIMATED_SCALED_BY_ACTUAL_FORCE_MAX =
            sconf.IS_ESTIMATED_SCALED_BY_ACTUAL_FORCE_MAX;
        const dataPeriod = Math.max( 1, Math.floor( Q_STEPS/DATA_GRAPH_STEPS ) );

        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        const gstart = ssD.qix_graph_start;
        const gend = ssD.qix_graph_end;
        let actualForceMax = 0;
        let estimatedForceMax = 0;
        let estimatedForceLargestMax = 0;
        let xMaxGraphAxis = 0;
        if (setMaxGraphValues) {
            ssD.MAF = 0;
            ssD.MEF = 0;
            ssD.xMaxFixedGraphAxis = 0;
        }
        //var fullPath = qIndexToOrbit[ gend ].pathAtQ;
        for( let qix=gstart; qix<=gend; qix++ ){
            const bP = qIndexToOrbit[ qix ];
            const actualForce = bP.actualForce;
            const estimatedForce = bP.estimatedForce;
            const estimatedForceLargest = bP.estimatedForceLargest;

            if( !(qix%dataPeriod) || qix===Q_STEPS ){
                actualForceMax = Math.max(Math.abs(actualForce), actualForceMax);
                estimatedForceMax = Math.max(Math.abs(estimatedForce), estimatedForceMax);
                estimatedForceLargestMax = Math.max(
                    Math.abs(estimatedForceLargest), estimatedForceLargestMax);
                if (setMaxGraphValues) {
                    ssD.MAF = Math.max(Math.abs(actualForce), ssD.MAF);
                    const forceE = bP.estimatedForceLargest;
                    ssD.MEF = Math.max(Math.abs(forceE), ssD.MEF);
                }

                let graphColumn = {
                    qix,
                    rr : bP.rr,
                    x : sData.PLOT_BY_PATH ? bP.pathAtQ : bP.r,
                };
                graphArray.push( graphColumn );

                const x = graphColumn.x;
                xMaxGraphAxis = Math.max(x, xMaxGraphAxis);
            }
            bP.gix = Math.max(0,graphArray.length-1);
        }
        if (setMaxGraphValues) {
            ssD.xMaxFixedGraphAxis = xMaxGraphAxis;
        }
        ssD.xMaxCurrentGraphAxis = xMaxGraphAxis;

        //Sometimes solvable is true at this point but just barely.  When this
        //is the case it's possible graphArray can still be empty, meaning no
        //valid position for point P exists.
        if (ssD.solvable && graphArray.length === 0)
            ssD.solvable = false;

        //------------------------------------------
        // //\\ resets graphArray
        //------------------------------------------
        const estimatedForceScale = (IS_ESTIMATED_SCALED_BY_ACTUAL_FORCE_MAX ?
            actualForceMax : estimatedForceMax);
        var arrLen = graphArray.length;
        for( var gix = 0; gix<arrLen; gix++ ){
            const ga = graphArray[ gix ];
            const qix = ga.qix;
            const bP = qIndexToOrbit[ qix ];
            bP.gix = gix;

            //todo Once all the graphs are adjusted update the following
            let actualForce = Math.abs(bP.actualForce);
            let estimatedForce = Math.abs(bP.estimatedForce);
            if (ssD.MAF) {
                //For graphs that have been adjusted
                actualForce /= ssD.MAF;
                estimatedForce /= ssD.MAF;
            } else {
                //For graphs that have not been adjusted yet, to ensure they
                //stay the same and don't get broken.
                actualForce /= actualForceMax;
                estimatedForce /= estimatedForceScale;
            }

            ga.y = [
                actualForce,
                estimatedForce,
            ];
        }
        //todo The following variables should probably be renamed, as well as
        //other similar ones related to the graph.  There are starting to be so
        //many that store data eg. on page load, when the orbit is adjusted for
        //the highest forces etc.  One possibility could be to store them in an
        //object similar to what's shown below, however likely with further
        //adjustments.
        //ssD.maxGraphValues.initial.estimatedForceMax
        //ssD.maxGraphValues.current.estimatedForceMax
        ssD.estimatedForceLargestMaxCurrent = estimatedForceLargestMax;

        ///this is a common graph lines, but this mask can be
        ///overriden in model_upcreate()
        stdMod.graphFW_lemma.graphArrayMask = 
            [ 
                'force',
                'estimatedForce',
            ];
        //------------------------------------------
        // \\// resets graphArray
        //------------------------------------------
    }
}) ();