///builds (estimated) force as displacement/area^2,
///notations are from Prop6, cor. 5,
///displacement = QR, area = QT*SP,
( function() {
    var { mat, stdMod, } = window.b$l.apptree({
        stdModExportList : { calculateForce, calculateActualForceTemp, }, });
    return;


    function calculateForce({
        parq, //orbit argument
        bP    //orbit point P rack
    }){
       const q2xy = stdMod.q2xy;
       const Q = q2xy( parq );
       const P = bP.rr;
       const S = bP.rrc;
       const R = mat.linesCross(
            bP.uu, P, //direction, start
            [P[0]-S[0], P[1]-S[1]], Q, //direction, start
       );
       const QR0 = Q[0]-R[0];
       const QR1 = Q[1]-R[1];
       const QR = Math.sqrt( QR0*QR0 + QR1*QR1 );
       
       //when displacement is parallel to rrr, then sign > 0
       const rrr = bP.rrr;
       const sign = Math.sign( rrr[0]*QR0 + rrr[1]*QR1 );
       
       const T = mat.dropPerpendicular( Q, S, P )
       const QT0 = Q[0]-T[0];
       const QT1 = Q[1]-T[1];
       const QT = Math.sqrt( QT0*QT0 + QT1*QT1 );
       const SP = bP.r;
       const area = SP*QT;
       const force = QR/(area*area);
       return sign * force;
    }


    //TEMP Testing P6 actual force equation
    function calculateActualForceTemp({
        bP    //orbit point P rack
    }){
        // const q2xy = stdMod.q2xy;
        // const Q = q2xy( parq );
        const P = bP.rr;
        const S = bP.rrc;
        const V = bP.curvatureChordSecondPoint;
        const Y = bP.projectionOfCenterOnTangent;
        // const R = bP.R;

        const SY0 = S[0]-Y[0];
        const SY1 = S[1]-Y[1];
        const SY = Math.sqrt( SY0*SY0 + SY1*SY1 );
       
        const PV0 = P[0]-V[0];
        const PV1 = P[1]-V[1];
        const PV = Math.sqrt( PV0*PV0 + PV1*PV1 );

        const force = 1 / (SY ** 2 * PV);
        return force;

    //    const QR0 = Q[0]-R[0];
    //    const QR1 = Q[1]-R[1];
       
       //when displacement is parallel to rrr, then sign > 0
    //    const rrr = bP.rrr;
    //    const sign = Math.sign( rrr[0]*QR0 + rrr[1]*QR1 );

    //    return sign * force;
    }
}) ();

