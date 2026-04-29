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


    function builds_orbit_data_graph()
    {
        const Q_STEPS = sconf.Q_STEPS;
        const DATA_GRAPH_STEPS = sconf.DATA_GRAPH_STEPS;
        //TEMP
        // const force_law_function = sconf.force_law_function;
        const IS_ESTIMATED_SCALED_BY_ACTUAL_FORCE_MAX =
            sconf.IS_ESTIMATED_SCALED_BY_ACTUAL_FORCE_MAX;
        //TEMP
        const ESTIMATED_SCALE_FACTOR = 1;
        // const ESTIMATED_SCALE_FACTOR = sconf.ESTIMATED_SCALE_FACTOR || 1;
        const dataPeriod = Math.max( 1, Math.floor( Q_STEPS/DATA_GRAPH_STEPS ) );

        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        const gstart = ssD.qix_graph_start;
        const gend = ssD.qix_graph_end;
        let estimatedForceMax = 0;
        let actualForceMax = 0;
        //var fullPath = qIndexToOrbit[ gend ].pathAtQ;
        for( let qix=gstart; qix<=gend; qix++ ){
            const bP = qIndexToOrbit[ qix ];
            const estimatedForce = bP.estimatedForce;
            //TEMP
            // if( force_law_function ){
            //     var actualForce = force_law_function(bP);
            // } else {
            //     var actualForce = bP.actualForce;
            // }
            var actualForce = bP.actualForce;
            //TEMP//
            bP.actualForce = actualForce;
            if( !(qix%dataPeriod) || qix===Q_STEPS ){
                actualForceMax = Math.max(Math.abs(actualForce), actualForceMax);
                estimatedForceMax = Math.max(Math.abs(estimatedForce), estimatedForceMax);
                let graphColumn = {
                    qix,
                    rr : bP.rr,
                    x : sData.PLOT_BY_PATH ? bP.pathAtQ : bP.r,
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
        const estimatedForceScale = (IS_ESTIMATED_SCALED_BY_ACTUAL_FORCE_MAX ?
            actualForceMax * ESTIMATED_SCALE_FACTOR : estimatedForceMax);
        var arrLen = graphArray.length;
        for( var gix = 0; gix<arrLen; gix++ ){
            const ga = graphArray[ gix ];
            const qix = ga.qix;
            const bP = qIndexToOrbit[ qix ];
            bP.gix = gix;
            const actualForce = Math.abs(bP.actualForce) / actualForceMax;
            const estimatedForce = Math.abs(bP.estimatedForce) / estimatedForceScale;
            ga.y = [
                actualForce,
                estimatedForce,
            ];
        }
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

        //TEMP
        calculateTimeBtwQixPointsTemp();
    }



    function calculateTimeBtwQixPointsTemp() {
        //TEMP For each point on qIndexToOrbit, calculate the time between that
        //point and a point offset from it.
        //-This code is temporary to help with testing and probably has issues
        const offset = 1;
        const Q_STEPS = sconf.Q_STEPS;

        //TEMP Note it looks like ssD.timeRange hasn't been updated at this
        //point yet, so use temporary calculation below.
        const timeS = qIndexToOrbit[0].timeAtQ;
        const timeE = qIndexToOrbit[Q_STEPS].timeAtQ;
        const timeRange = timeE - timeS;

        const deltaTimes = [];
        const qixS = ssD.qix_graph_start;
        const qixE = ssD.qix_graph_end+1;
        for (let qix = qixS; qix < qixE; qix++) {
            const qixP = qix;
            let qixQ = (qixP + offset);
            if (sconf.CURVE_REVOLVES)
                //TEMP Skip last qix value (because technically the same point)
                qixQ %= (qIndexToOrbit.length - 1);

            const timeP = qIndexToOrbit[qixP].timeAtQ;
            const timeQ = qIndexToOrbit[qixQ].timeAtQ;
            let Dt = (timeQ - timeP)
            if (qixQ < qixP)
                Dt += timeRange;
            // console.log(`qixP = ${qixP}  qixQ = ${qixQ}  ` +
            //             `timeP = ${timeP}  timeQ = ${timeQ}  ` +
            //             `Dt = ${Dt}`);
            deltaTimes.push({Dt, qixP});
        }

        deltaTimes.sort((a, b) => (a.Dt - b.Dt));
        console.log(`**Time between qix points  offset = ${offset}`);
        console.log(`Lowest`);
        for(let i = 0; i < 3; i++) {
            const data = deltaTimes[i];
            const message = `Dt = ${data.Dt} (qixP = ${data.qixP}`;
            if (data.Dt < sData.DtSubstituteActualForce) {
                console.warn(message);
            } else {
                console.log(message);
            }
            // console.log(`Dt = ${data.Dt} (qixP = ${data.qixP}`);
        }
        console.log(`Highest`);
        for(let i = deltaTimes.length-3; i < deltaTimes.length; i++) {
            const data = deltaTimes[i];
            const message = `Dt = ${data.Dt} (qixP = ${data.qixP}`;
            if (data.Dt < sData.DtSubstituteActualForce) {
                console.warn(message);
            } else {
                console.log(message);
            }
            // console.log(`Dt = ${data.Dt} (qixP = ${data.qixP}`);
        }
        // for(let i = deltaTimes.length-3; i < deltaTimes.length; i++) {
        //     const data = deltaTimes[i];
        //     console.log(`Dt = ${data.Dt} (qixP = ${data.qixP}`);
        // }

        // const dataMin = deltaTimes[0];
        // const dataMax = deltaTimes[deltaTimes.length-1];
        // console.log(`Time between qix points  offset = ${offset},  ` +
        //             `min = ${dataMin.Dt} (qixP = ${dataMin.qixP}),  ` +
        //             `max = ${dataMax.Dt} (qixP = ${dataMax.qixP})`);
    }
}) ();