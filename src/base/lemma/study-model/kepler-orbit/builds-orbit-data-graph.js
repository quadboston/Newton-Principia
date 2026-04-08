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
        //TEMP
        // const force_law_function = sconf.force_law_function;
        const dataPeriod = Math.max( 1, Math.floor( Q_STEPS/DATA_GRAPH_STEPS ) );

        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        const gstart = ssD.qix_graph_start;
        const gend = ssD.qix_graph_end;
        let estimatedForceMax = 0;
        //TEMP May be able to remove the following, it may get replaced by MAF
        let actualForceMax = 0;
        //TEMP
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
            //TEMP
            // if( force_law_function ){
            //     var actualForce = force_law_function(bP);
            // } else {
            //     var actualForce = bP.actualForce;
            // }
            // var actualForce = bP.actualForce;
            // bP.actualForce = actualForce;
            if( !(qix%dataPeriod) || qix===Q_STEPS ){
                actualForceMax = Math.max(Math.abs(actualForce), actualForceMax);
                estimatedForceMax = Math.max(Math.abs(estimatedForce), estimatedForceMax);
                //TEMP
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
                if (setMaxGraphValues) {
                    const x = graphColumn.x;
                    ssD.xMaxFixedGraphAxis = Math.max(x, ssD.xMaxFixedGraphAxis);
                }
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
        //TEMP
        console.log("resets graphArray");
        let output = `SP, Actual Force\n`;
        var arrLen = graphArray.length;
        for( var gix = 0; gix<arrLen; gix++ ){
            const ga = graphArray[ gix ];
            const qix = ga.qix;
            const bP = qIndexToOrbit[ qix ];
            bP.gix = gix;
            //TEMP
            const actualForce = Math.abs(bP.actualForce) / ssD.MAF;
            const estimatedForce = Math.abs(bP.estimatedForce) / ssD.MAF;
            output += `${bP.r}, ${actualForce}\n`;
            ga.y = [
                actualForce,
                estimatedForce,
            ];
        }
        //TEMP
        console.log("**********");
        console.log("actualForceMax =", actualForceMax);
        console.log("estimatedForceMax =", estimatedForceMax);
        // console.log("output =", output);
        //TEMP//
        ssD.estimatedForceMaxCurrent = estimatedForceMax;
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