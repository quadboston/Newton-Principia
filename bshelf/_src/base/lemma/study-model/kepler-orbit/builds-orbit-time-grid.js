{
const { sn, sconf, ssD } =
    window.b$l.atree({ ssFList: { builds_orbit_time_grid }});
//this array speeds up conversion between q and t grids:
//it elimiantes extra calculations and loops:
sn( 'tix2qnode', ssD, [] );

function builds_orbit_time_grid(){
    const qix2o = ssD.qix2orb;
    const tix2qnode = ssD.tix2qnode;
    const qSTEPS = sconf.qPOINTS-1;
    const tPOINTS = sconf.tPOINTS;
    ssD.tRANGE = qix2o[ qSTEPS ].qnode_t - qix2o[0].qnode_t;
    const tSTEP = ssD.tRANGE/(tPOINTS-1);
    ssD.tSTEP = tSTEP;

    let tnode_t = 0; //time at time grid nodes
    let qnode_t = 0; //time at q grid nodes
    let qix = 0;
    let qix_former = 0;
    let t_former = 0;
    tix2qnode.length = 0;
    tix2qnode[0] = {tnode_t, qix, qnode_t };
    for( let tix = 0; tix<tPOINTS; tix++ ){
        tnode_t = tix*tSTEP;
        ///looping qix until qnode_t exceed tnode_t
        while( tnode_t > qnode_t && qix < qSTEPS ){
            qix_former = qix;
            t_former = qnode_t;
            qix++;
            qnode_t = qix2o[qix].qnode_t;
        }
        tix2qnode[tix] = {
            qix: qix_former,
            qnode_t: t_former,
            qnode_q: qix2o[qix_former].q
        };
        qix = qix_former;
        qnode_t = t_former;
    }
}
}
