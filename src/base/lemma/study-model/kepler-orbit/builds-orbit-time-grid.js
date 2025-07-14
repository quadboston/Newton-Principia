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
        const q2o = qix2orb;
        const t2o = tix2orbit;
        const QS = sconf.Q_STEPS;
        const TS = sconf.TIME_STEPS;
        t2o.length = 0;
        {
            ssD.trange =q2o[ QS ].timeAtQ -q2o[0].timeAtQ;
            const tgrid_step = ssD.trange/TS;
            ssD.tgrid_step = tgrid_step;
            const trange = ssD.trange;
            let timeAtT = 0;
            let timeAtQ = 0;
            let qix = 0;
            let qix_former = qix;
            let timeAtQ_former = timeAtQ;
            t2o.length = 0; 
            t2o[0] = [ {timeAtT, qix, timeAtQ, timeReminder:0} ];
            for( let tix = 0; tix<TS; tix++ )
            {
                timeAtT = tix*tgrid_step;
                while( timeAtT > timeAtQ ) {
                    qix_former = qix;
                    timeAtQ_former = timeAtQ;
                    //this must not happen because of tix < TS:
                    //if( qix > QS ) break;
                    qix++;
                    timeAtQ =q2o[qix].timeAtQ;
                }
                const dt4dqix = q2o[qix_former+1].timeAtQ - timeAtQ_former;
                t2o[tix] = {
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
                //if( qix_former < QS-1 ){

                qix = qix_former+1;
                timeAtQ = q2o[qix].timeAtQ;
            }
        }
    }
}) ();

