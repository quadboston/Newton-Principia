{
const { sn, nspaste, has, fldo, flcs, stdMod, amode, sconf,
        stripp, rg, ssD, sData,
      } = window.b$l.atree({ ssFList: {
        builds_dq8sagit8displace,
        updatesPNeighbours,
      }});

function builds_dq8sagit8displace(args){
    let { calculateInstantForce, rgOrb } = stripp(args);

    const bodyq2xy = rgOrb.bodyq2xy;
    const CR = sconf.CURVE_REVOLVES;
    const tix2o = sn( 'tix2orb', ssD, [] );
    const qix2o = sn( 'qix2orb', ssD, [] );
    const QS = sconf.Q_STEPS;
    const TS = sconf.TIME_STEPS;
    const tStep = ssD.tStep;
    const qgrid_step = sconf.qgrid_step;
    const q_start = qix2o[0].q;
    const trange = ssD.trange;

    for( let qix=0; qix<QS; qix++ ) {
        const bP = qix2o[ qix ]; //body point data
        //this point qix === QS-1 cannot be P-point,
        //because of it cannot have Q on qix+1
        bP.skipPoint = bP.nonSolvablePoint || qix === QS-1;
        if( bP.skipPoint ) continue;
        if( calculateInstantForce ){
            bP.trajectorialForce=stdMod.calcs_trajectorial_force(bP);
            continue;
        }
        if( sconf.TIME_IS_FREE_VARIABLE ){
            if( !buildsSagitta( bP ) ){
                bP.skipPoint = true;
                continue;
            }
        } else {
            bP.qplus = bP.q + ssD.Dq;
        }
        //intervals accepted for chosen
        //time scenario for point P
        // //\\ fQR
        const fQR = stdMod.calcs_fQR({
            qplus: bP.qplus,
            bP,
            bodyq2xy,
        });
        bP.fQR = fQR;
        // \\// fQR
    }
    updatesPNeighbours();
    return;

    function buildsSagitta( bP ){
        const Dt = ssD.Dt;
        const tQ = bP.tQ;
        //--------------------------------
        // //\\ interpolates_t2q
        //--------------------------------
        var qplus = interpolates_t2q( tQ + Dt );
        if( !qplus ) return false;
        bP.qplus = qplus;
        const rrplus = bodyq2xy( qplus );

        var qminus = interpolates_t2q( tQ - Dt );
        if( !qminus ) return false;
        bP.qminus = qminus;
        const rrminus = bodyq2xy( qminus );

        const rr = bP.rr; //origin to P
        const r2 = bP.r2; //S to P
        bP.rrplus = rrplus;
        bP.rrminus = rrminus;
        //--------------------------------
        // \\// interpolates_t2q
        //--------------------------------
        const s0 = (rrplus[0]+rrminus[0]-2*rr[0])*0.5;
        const s1 = (rrplus[1]+rrminus[1]-2*rr[1])*0.5;
        const rrr = bP.rrr;
        //when sagitta is collinear to rrr, then sign > 0
        const sign = Math.sign( rrr[0]*s0 + rrr[1]*s1 );
        const sagittaAbs = Math.sqrt( s0*s0+s1*s1 );
        bP.sagitta = sign * sagittaAbs;
        bP.sagittaVector = [s0, s1];
        return true;
    }

    function interpolates_t2q( tO ){
        if( CR ) {
            tO = ( 2*trange + tO ) % trange;
            var tix = Math.floor( tO/tStep );
            tix = ( TS + tix ) % TS;
        } else {
            ////checks overlap for non-CR orbits
            var tix = Math.floor( tO/tStep );
            if( tO <= 0 || tix >= TS ) return;
        }
        const tOrb = tix2o[tix];
        const tLow = tOrb.tQ;
        const qLow = tOrb.qQ;

        let qixHigh = tOrb.qix + 1;
        qixHigh = CR ? (qixHigh + QS ) % QS : qixHigh;
        const bHigh = qix2o[qixHigh];
        const tHigh = bHigh.tQ;
        const qHigh= bHigh.q;

        const qT = qLow + (tO - tLow)*
            ( qHigh - qLow ) / (tHigh-tLow);
        return qT;
    }
}

function updatesPNeighbours(){
    const Porb = ssD.qix2orb[ rg.P.qix ];
    nspaste( rg.P.pos, Porb.rr );
    flcs['flcs--off-valid-p'] = Porb.skipPoint;
    if( Porb.skipPoint ) return;
    //rg.Q.qix = Porb.bQ.qix; //todo do check
    rg.Q.q = Porb.qplus;  //need?
    nspaste( rg.Q.pos, Porb.rrplus );
    if( sconf.TIME_IS_FREE_VARIABLE ){
        nspaste( rg.rrminus.pos, Porb.rrminus );
        //todo streamline and remove
        rg.Q.q_minus = Porb.qminus; //need?
    }
}
}
