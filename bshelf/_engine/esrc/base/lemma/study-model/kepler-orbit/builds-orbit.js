{
const {
        sn, has, haz, mcurve, fldo, flcs, amode, rg, sconf, ssD,
    } = window.b$l.atree({ ssFList:{ buildsOrbit} });
const NON_SOLVABLE_THRESHOLD = 0.05;
const qix2orb = sn( 'qix2orb', ssD, [] );


function buildsOrbit (rgOrb){
    const QS = sconf.Q_STEPS;
    const qrange = sconf.curveQRange;
    const qgrid_step = sconf.qgrid_step;
    const orbit_q_start = sconf.curve.orbit_q_start;
    const qix2o = qix2orb; //local for speed
    qix2o.length = 0;
    const dyn_q2xy = rgOrb.bodyq2xy;
    //this parameter is for orbit painting on svg,
    //we don't want to pant all of QS points, 1000 points is enough,
    const orbitXYToDraw_LIMIT = Math.min( 1000, QS );
    const orbitXY = sn( 'orbitXY', rgOrb, [] );

    fldo.solvable_orbit = true;
    flcs['flcs--off-solvable_orbit'] = false;
    var foldPoints = [];

    for (var qix = 0; qix<QS; qix++ ){
        var bP = qix2o[ qix ] = mcurve.planeCurveDerivatives(
            dyn_q2xy,
            orbit_q_start + qix * qgrid_step,
            rg.S.pos,
        );
        bP.qix = qix;
        var {
            rr,
            ds_dq, //|d𝗿/dq|
            r2,
            Mu,
            sinOmega, //for Kepler's motion, f = vₜ²/R/sin(w)
        } = bP;

        //patch: provides positive speed ds_dt and positive time,
        //especially when orbit curve has gaps,
        //otherwise, in prop6 causes bug of negative time index
        //todm polish theoretical framework, do avoid "abs" patch:
        Mu = Math.abs(Mu);

        // Kepler's motion: rvₜcos(w) = M
        // f = M²/(Rr²cos³(w))
        //cosAbs = Math.abs( sinOmega );
        if( NON_SOLVABLE_THRESHOLD > Math.abs( sinOmega ) ) {
            foldPoints.push( [ rr[0], rr[1] ] );
            bP.nonSolvablePoint = true;
            fldo.solvable_orbit = false;
            flcs['flcs--off-solvable_orbit'] = true;
        }

        //------------------------------------------
        // //\\ preparing time array
        //------------------------------------------
        //meaning: dq_dt = dq/dt
        if( 0 === qix ) {
            //setting ds_dt to any value v0
            //var ds_dt = v0
            //established initial body speed v0 for
            //an entire lemma
            var ds_dt = 1;

            var M_v0 = ssD.M_v0 = Mu * ds_dt;
            var tQ = 0;
            var pathAtQ = 0;
            var dq_dt = ds_dt/ds_dq;
        } else {
            var ds_dt = M_v0 / Mu;
            var pathAtQ = pathAtQ + qgrid_step * ds_dq;
            //in real word, the solution can be with dq_dt < 0,
            //backward in time in respect to parameter q,
            //we excluded this
            //case making Mu > 0,
            var dq_dt = ds_dt/ds_dq;
            var tQ = tQ + qgrid_step / dq_dt;
        }
        bP.tQ = tQ;
        bP.pathAtQ = pathAtQ;
        bP.ds_dt = ds_dt;
        bP.dq_dt = dq_dt;
        //------------------------------------------
        // \\// preparing time array
        //------------------------------------------
    }

    // //\\ one or many shapes
    if( !has( sconf, 'RESHAPABLE_ORBIT' ) ){
        sconf.RESHAPABLE_ORBIT = 1;
    }
    //todo apparen duplicate with other builder or
    //svg object duplicates and leaks, this is seen when,
    //we do not add ...P11 in media_upcreate basic,
    if( sconf.RESHAPABLE_ORBIT ){
        if( sconf.RESHAPABLE_ORBIT === 1 ){
            ////blocks redraw forever
            sconf.RESHAPABLE_ORBIT = 0;
        }
        ///for static orbit shapes shoult build once per launch,
        ///decoration: builds pivots for scalable decorational orbit
        const ORBIT_STEP = QS/orbitXYToDraw_LIMIT;
        for( let oix=0; oix<orbitXYToDraw_LIMIT; oix++ ){
            let qix = Math.floor( oix * ORBIT_STEP );
            orbitXY[ oix ] = qix2o[qix].rr;
        }
    }
    // \\// one or many shapes
    ssD.foldPoints = foldPoints;
}
}