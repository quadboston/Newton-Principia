{ const {
            sn, has, haz, mcurve, fldo, flcs, amode, rg, sconf, ssD,
        } = window.b$l.atree({ ssFList:{ buildsOrbit} });
const qix2orb = sn( 'qix2orb', ssD, [] );
//this value matters only for nice graphs, it is not principal
//is this value 10000 or 1e+200
const MAX_ACCEPTED_FORCE = 100000;


function buildsOrbit (rgOrb){
    fldo.solvable_orbit = true;
    flcs['flcs--non-solvable_orbit'] = false;
    flcs['flcs--solvable_orbit'] = true;
    const foldPoints = sn( 'foldPoints', ssD, [] );

    //local shortcuts
    const QS = sconf.qPOINTS;
    const qrange = sconf.CURVE_RANGE;
    const qSTEP = sconf.qSTEP;
    const ORBIT_Q_START = sconf.curve.ORBIT_Q_START;
    const dyn_q2xy = rgOrb.bodyq2xy;
    const qix2o = qix2orb; //local for speed

    qix2o.length = 0;
    foldPoints.length = 0;
    for (var qix = 0; qix<QS; qix++ ){
        var bP = qix2o[ qix ] = mcurve.planeCurveDerivatives(
            dyn_q2xy,
            ORBIT_Q_START + qix * qSTEP,
            rg.S.pos,
        );
        bP.qix = qix;
        var {
            rr,
            ds_dq, //|d𝗿/dq|
            r2,
            Mu,
            sinOmega, //for Kepler's motion, f = vₜ²/R/sin(w)
            c,
            bk,
        } = bP;

        //patch: provides positive speed ds_dt and positive time,
        //especially when orbit curve has gaps,
        //otherwise, in prop6 causes bug of negative time index
        //todm polish theoretical framework, do avoid "abs" patch:
        Mu = Math.abs(Mu);
        // Kepler's motion: rvₜsin(w) = M
        // f = M²/(Rr²cos³(P/2-w))

        //----------------------------------------------------------
        // //\\ ultimate Force
        //----------------------------------------------------------
        //for "kepler force" which shape is defined by curve geomety,
        //direction of force is honored,
        //ultForce = -bk * 1/(SY^2 * PV), in terms of prop6, cor.3:
        const ultForce = -bk * c / (r2*sinOmega*sinOmega*sinOmega)
            * 2; //2 is for exact numerical equality with cor. 3.
        //proof:
        //  c/sinOmega = 1/(Rc * sinOmega) = 2/PV,
        //  r2*sinOmega^2 = SY^2
        //  2f = ultForce = -bk / (SY^2*PV); 𝗳 = f * 𝗲.
        const absForce = Math.abs(ultForce);
        if( absForce === Infinity || MAX_ACCEPTED_FORCE < absForce ){
            foldPoints.push( [ rr[0], rr[1] ] );
            bP.nonSolvablePoint = true;
            fldo.solvable_orbit = false;
            flcs['flcs--non-solvable_orbit'] = true;
            flcs['flcs--solvable_orbit'] = false;
        }
        bP.ultForce = ultForce;
        //----------------------------------------------------------
        // \\// ultimate Force
        //----------------------------------------------------------

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
            var qnode_t = 0;
            var pathAtQ = 0;
            var dq_dt = ds_dt/ds_dq;
        } else {
            var ds_dt = M_v0 / Mu;
            var pathAtQ = pathAtQ + qSTEP * ds_dq;
            //in real word, the solution can be with dq_dt < 0,
            //backward in time in respect to parameter q,
            //we excluded this
            //case making Mu > 0,
            var dq_dt = ds_dt/ds_dq;
            var qnode_t = qnode_t + qSTEP / dq_dt;
        }
        bP.qnode_t = qnode_t; //time at curve par. q
        bP.pathAtQ = pathAtQ;
        bP.ds_dt = ds_dt;
        bP.dq_dt = dq_dt;
        //------------------------------------------
        // \\// preparing time array
        //------------------------------------------
    }
}
}