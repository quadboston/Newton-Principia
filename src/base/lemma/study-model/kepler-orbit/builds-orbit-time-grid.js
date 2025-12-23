( function() {
    var { sn, sconf, ssD, } = window.b$l.apptree({
        stdModExportList : { builds_orbit_time_grid, }, });
    var qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    //this array speeds up conversion between q and t grids:
    //it elimiantes extra calculations and loops:
    var tIndexToOrbit = sn( 'tIndexToOrbit', ssD, [] );
    return;


    function builds_orbit_time_grid()
    {
        const Q_STEPS = sconf.Q_STEPS;
        const TIME_STEPS = sconf.TIME_STEPS;
        tIndexToOrbit.length = 0;
        console.time("builds_orbit_time_grid");
        {
            ssD.timeRange =qIndexToOrbit[ Q_STEPS ].timeAtQ -qIndexToOrbit[0].timeAtQ;
            const delta_t_between_steps = ssD.timeRange/TIME_STEPS;
            ssD.delta_t_between_steps = delta_t_between_steps;
            let timeAtT = 0;
            let timeAtQ = 0;
            let qix = 0;
            let qix_former = qix;
            let timeAtQ_former = timeAtQ;
            tIndexToOrbit.length = 0; 
            tIndexToOrbit[0] = [ {timeAtT, qix, timeAtQ, timeReminder:0} ];
            for( let tix = 0; tix<TIME_STEPS; tix++ )
            {
                timeAtT = tix*delta_t_between_steps;
                while( timeAtT > timeAtQ ) {
                    qix_former = qix;
                    timeAtQ_former = timeAtQ;
                    //this must not happen because of tix < TIME_STEPS:
                    //if( qix > Q_STEPS ) break;
                    qix++;
                    timeAtQ =qIndexToOrbit[qix].timeAtQ;
                }
                const dt4dqix = qIndexToOrbit[qix_former+1].timeAtQ - timeAtQ_former;
                tIndexToOrbit[tix] = {
                     timeAtT,
                     qix : qix_former,
                     timeAtQ : timeAtQ_former, //extra
                     timeReminder :
                        Math.max( //prevents floating poit errors
                            0,timeAtT - timeAtQ_former ),
                     dt4dqix,
                };

                //this qix will never grow if qix reached toppest time,
                //hence no need to do this check:
                //if( qix_former < Q_STEPS-1 ){

                qix = qix_former+1;
                timeAtQ = qIndexToOrbit[qix].timeAtQ;
            }
        }
        console.timeEnd("builds_orbit_time_grid");
    }
}) ();

