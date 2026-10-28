///builds
/// 1) estimated force as f=fQR=QR/area², area= QT*SP,
/// 2) "geometrical force" as -bₖ𝑘/(r²*sin(ω))
(function() {
    const { sn, mat, stdMod, rg }
        = window.b$l.atree({ stdModList : {
            calcs_fQR,
            calcs_trajectorial_force,
        }});
    return;

    ///for "kepler force" which shape is defined by curve geomety,
    ///direction of force honored,
    ///return value is equal to prop6, cor.3: f~1/SV^2/PY,
    ///
    ///c/sinOmega = 1/(Rc * sinOmega) ~ PV,
    ///r2*sinOmega^2 = SV^2
    ///PY = r*sinOmega,
    ///f = -bk / SV^2 / PY; 𝗳 = f * 𝗲.
    function calcs_trajectorial_force( bP ){
        const { c, bk, r2, sinOmega } = bP;
        return -bk * c / (r2*sinOmega*sinOmega*sinOmega);
    }

    function calcs_fQR({
        qplus, //orbit argument
        bP,    //orbit point P rack
        bodyq2xy,
    }){
       const dyn_q2xy = bodyq2xy;
       const Q = dyn_q2xy( qplus );
       const P = bP.rr;
       const S = bP.rrc;
       const R = mat.linesCross(
            bP.uu, P, //direction, start
            [P[0]-S[0], P[1]-S[1]], Q, //direction, start
       );
       const QR0 = Q[0]-R[0];
       const QR1 = Q[1]-R[1];
       const QR = Math.sqrt( QR0*QR0 + QR1*QR1 );

       //when fQR is collinear with rrr, then sign > 0
       const rrr = bP.rrr;
       const sign = Math.sign( rrr[0]*QR0 + rrr[1]*QR1 );

       const T = mat.dropPerpendicular( Q, S, P )
       const QT0 = Q[0]-T[0];
       const QT1 = Q[1]-T[1];
       const QT2 = QT0*QT0 + QT1*QT1;
       const SP2 = bP.r2;
       const area2 = SP2*QT2;
       const fQR = QR/area2;
       return sign * fQR;
    }
})();