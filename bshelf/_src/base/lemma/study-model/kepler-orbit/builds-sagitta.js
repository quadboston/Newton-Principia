{const {   sn, nspaste, has, flcs, stdMod, sconf,
           rg, ssD, ssF,
       } = window.b$l.atree({ ssFList: {
           builds_sagitta8fQR,
           updatesPNeighbours,
       }});

function builds_sagitta8fQR( rgOrb ){
    const bodyq2xy = rgOrb.bodyq2xy;
    const CR = sconf.CURVE_REVOLVES;
    const tix2qnode = ssD.tix2qnode;
    const qix2o = ssD.qix2orb;
    const qPOINTS = sconf.qPOINTS;
    const tPOINTS = sconf.tPOINTS;
    const qSTEP = sconf.qSTEP;
    const tSTEP = ssD.tSTEP;
    const tRANGE = ssD.tRANGE;

    for( let qix=0; qix<qPOINTS; qix++ ) {
        const bP = qix2o[ qix ]; //bodyPoint
        bP.skipPoint = bP.nonSolvablePoint;
        if( bP.skipPoint ) continue;
        if( sconf.FORCE_CALCULATION_IS_BASED_ON_TIME ){
            if( !buildsSagitta( bP ) ){
                bP.skipPoint = true;
                continue;
            }
        } else {
            bP.qplus = bP.q + ssD.Dq;
            bP.rrplus = bodyq2xy( bP.qplus );
        }
        // //\\ fQR
        bP.fQR = stdMod.calcs_fQR({
            qplus: bP.qplus,
            bP,
            bodyq2xy,
        });
        // \\// fQR
    }
    updatesPNeighbours();
    ssF.lemmaState2draggabilityFlags(); //only for flcs
    return;

    function buildsSagitta( bP ){
        const Dt = ssD.Dt;
        const qnode_t = bP.qnode_t;
        //--------------------------------
        // //\\ interpolates_t2q
        //--------------------------------
        var qplus = interpolates_t2q( qnode_t + Dt );
        if( !qplus ) return false;
        bP.qplus = qplus;
        const rrplus = bodyq2xy( qplus );

        var qminus = interpolates_t2q( qnode_t - Dt );
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

    ///tInt - time in which to interpolate
    function interpolates_t2q( tInt ){
        if( CR ) {
            tInt = ( 2*tRANGE + tInt ) % tRANGE;
            var tix = Math.floor( tInt/tSTEP );
            tix = ( tPOINTS + tix ) % tPOINTS;
        } else {
            ////checks overlap for non-CR orbits
            var tix = Math.floor( tInt/tSTEP );
            if( tInt <= 0 || tix >= tPOINTS ) return;
        }
        const tOrb = tix2qnode[tix];
        const tLow = tOrb.qnode_t;
        const qLow = tOrb.qnode_q;

        let qixHigh = tOrb.qix + 1;
        qixHigh = CR ? (qixHigh + qPOINTS ) % qPOINTS : qixHigh;
        const bHigh = qix2o[qixHigh];
        const tHigh = bHigh.qnode_t;
        const qHigh= bHigh.q;

        const qT = qLow + (tInt - tLow)*
            ( qHigh - qLow ) / (tHigh-tLow);
        return qT;
    }
}

function updatesPNeighbours(){
    const rgP = rg.P;
    const Porb = ssD.qix2orb[ rgP.qix ];
    rgP.qplus = Porb.qplus;
    nspaste( rgP.pos, Porb.rr );
    nspaste( rg.Q.pos, Porb.rrplus );
    if( sconf.FORCE_CALCULATION_IS_BASED_ON_TIME ){
        nspaste( rg.rrminus.pos, Porb.rrminus );
        rgP.qminus = Porb.qminus;
    }
}
}
