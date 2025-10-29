///builds estimated force as fQR/area^2,
///notations are from Prop6, cor. 5,
///fQR = QR, area = QT*SP,
( function() {
    var { sn, mat, stdMod, }
        = window.b$l.apptree({ stdModExportList : { calcs_fQR, }, });
    return;


    function calcs_fQR({
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
       
       //when fQR is parallel to rrr, then sign > 0
       const rrr = bP.rrr;
       const sign = Math.sign( rrr[0]*QR0 + rrr[1]*QR1 );
       
       const T = mat.dropPerpendicular( Q, S, P )
       const QT0 = Q[0]-T[0];
       const QT1 = Q[1]-T[1];
       const QT = Math.sqrt( QT0*QT0 + QT1*QT1 );
       const SP = bP.r;
       const area = SP*QT;
       const fQR = QR/(area*area);
       return sign * fQR;
    }
}) ();

