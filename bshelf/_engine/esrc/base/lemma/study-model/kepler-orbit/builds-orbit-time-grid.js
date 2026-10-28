{
const { sn, sconf, ssD } =
    window.b$l.atree({ ssFList: { builds_orbit_time_grid }});
//this array speeds up conversion between q and t grids:
//it elimiantes extra calculations and loops:
sn( 'tix2orb', ssD, [] );

function builds_orbit_time_grid(){
    const qix2o = ssD.qix2orb;
    const tix2o = ssD.tix2orb;
    const QS1 = sconf.Q_STEPS-1;
    const TS = sconf.TIME_STEPS;
    ssD.trange = qix2o[ QS1 ].tQ - qix2o[0].tQ;
    const tStep = ssD.trange/(TS-1);
    ssD.tStep = tStep;

    let tT = 0; //time at time grid nodes
    let tQ = 0; //time at q grid nodes
    let qix = 0;
    let qix_former = 0;
    let tQ_former = 0;
    tix2o.length = 0;
    tix2o[0] = {tT, qix, tQ };
    for( let tix = 0; tix<TS; tix++ ){
        tT = tix*tStep;
        ///looping qix until its time does not exceed tT
        while( tT > tQ && qix < QS1 ){
            qix_former = qix;
            tQ_former = tQ;
            qix++;
            tQ = qix2o[qix].tQ;
        }
        tix2o[tix] = {
            //tT, //can be good
            qix: qix_former,
            tQ: tQ_former,
            qQ: qix2o[qix_former].q
        };
        qix = qix_former;
        tQ = tQ_former;
    }
}
}
