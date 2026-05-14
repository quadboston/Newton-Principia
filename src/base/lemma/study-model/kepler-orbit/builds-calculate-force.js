///notations are from Prop6, cor. 5,
( function() {
    var { mat, stdMod, sData, } = window.b$l.apptree({
        stdModExportList : { calculateForce, }, });
    return;


    function calculateForce({
        parq, //orbit argument
        bP,   //orbit point P rack
        DtCheckForSubstitution,
        ulitmacy,
    }) {
        //When Q is close to P, the estimated force calculation can have issues
        //such as noise.  Therefore if close enough substitute actual force to
        //prevent issues.
        const substituteActualForce = (DtCheckForSubstitution < 0.0001);

        const isUlitmacyForActualForce = (ulitmacy === sData.ULTIM_ACTUAL);
        return (isUlitmacyForActualForce || substituteActualForce) ?
            calculateActualForce({bP}) :
            calculateEstimatedForce({parq, bP});
    }


    function calculateActualForce({
        bP    //orbit point P rack
    }) {
        const P = bP.rr;
        const S = bP.rrc;
        const V = bP.curvatureChordSecondPoint;
        const Y = bP.projectionOfCenterOnTangent;

        const SY0 = S[0]-Y[0];
        const SY1 = S[1]-Y[1];
        const SY = Math.sqrt( SY0*SY0 + SY1*SY1 );

        const PV0 = P[0]-V[0];
        const PV1 = P[1]-V[1];
        const PV = Math.sqrt( PV0*PV0 + PV1*PV1 );

        const force = 1 / (SY ** 2 * PV);

        const sign = calculateSign(bP, [-PV0, -PV1]);
        return sign * force;
    }


    function calculateEstimatedForce({
        parq, //orbit argument
        bP    //orbit point P rack
    }){
        ///builds estimated force as displacement/area^2,
        ///displacement = QR, area = QT*SP,
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

        const T = mat.dropPerpendicular( Q, S, P )
        const QT0 = Q[0]-T[0];
        const QT1 = Q[1]-T[1];
        const QT = Math.sqrt( QT0*QT0 + QT1*QT1 );
        const SP = bP.r;
        const area = SP*QT;
        const force = QR/(area*area);

        const sign = calculateSign(bP, [QR0, QR1]);
        return sign * force;
    }


    function calculateSign(bP, direction) {
        //Calculate by comparing directions of the following vectors
        const rrr = bP.rrr; //vector from S to P
        return Math.sign(rrr[0]*direction[0] + rrr[1]*direction[1]);
    }
}) ();

