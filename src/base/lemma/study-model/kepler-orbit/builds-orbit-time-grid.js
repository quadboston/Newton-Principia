( function() {
    var {
        sn,
        sconf, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            builds_orbit_time_grid,
        },
    });
    var qix2orb = sn( 'qix2orb', ssD, [] );
    //this array speeds up conversion between q and t grids:
    //it elimiantes extra calculations and loops:
    var tix2orbit = sn( 'tix2orbit', ssD, [] );
    return;


    function builds_orbit_time_grid()
    {
        tix2orbit.length = 0;
        const FORCE_ARRAY_LEN = sconf.FORCE_ARRAY_LEN;
        const TIME_STEPS = sconf.TIME_STEPS;
        {
            //------------------------------------------
            // //\\ distributing values in time arrays
            //------------------------------------------
            ssD.timeRange = qix2orb[ FORCE_ARRAY_LEN ].timeAtQ -
                            qix2orb[0].timeAtQ;
            ssD.timeDelta = ssD.timeRange/TIME_STEPS;
            let timeDelta = ssD.timeDelta
            let timeRange = ssD.timeRange;
            let timeAtT = 0;
            let timeAtQ = 0;
            let qix = 0;
            let qix_former = qix;
            let timeAtQ_former = timeAtQ;
            tix2orbit.length = 0; 
            tix2orbit[0] = [ {timeAtT, qix, timeAtQ, timeReminder:0} ];
            const FORCE_ARRAY_LEN1 = FORCE_ARRAY_LEN - 1;
            for( let tix = 0; tix<=TIME_STEPS; tix++ )
            {
                timeAtT = tix*timeDelta;
                while( timeAtT > timeAtQ ) {
                    qix_former = qix;
                    timeAtQ_former = timeAtQ;
                    if( qix >= FORCE_ARRAY_LEN1 ) break;
                    qix++;
                    timeAtQ = qix2orb[qix].timeAtQ;
                }
                let dt4dqix =  qix2orb[qix_former+1].timeAtQ - timeAtQ_former;
                tix2orbit[tix] = {
                     timeAtT,
                     qix:qix_former,
                     timeAtQ:timeAtQ_former, //extra
                     timeReminder:
                        Math.max( //prevents floating poit errors
                            0,timeAtT - timeAtQ_former ),
                     dt4dqix,
                };
                if( qix_former+1 <= FORCE_ARRAY_LEN1 ) {
                    qix = qix_former+1;
                    timeAtQ = qix2orb[qix].timeAtQ;
                }
            }
        }
    }
}) ();

