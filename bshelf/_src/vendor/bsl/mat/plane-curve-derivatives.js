{

const sn = window.b$l.sn;
const mat = sn( 'mat' );
const mcurve = sn( 'mcurve', mat );
const PI2 = Math.PI*0.5;
const PI = Math.PI;
mcurve.planeCurveDerivatives = planeCurveDerivatives;


//Notation: ii,jj,kk right-oriented-orts (coordinate-system),
//  policy: rr, ee ... are for vectors 𝗿, 𝗲, ...
//          r,e for lengths: r = |𝗿|, e=|𝗲|
//          rrr = rr - rrc,
//Requirement: d𝗿/dt = drr/dt = 𝘃 != 0 (when q is a time, then
//             speed cannot be 0 )
function planeCurveDerivatives(
    //2d curve function: q|-> rr,
    //  inputs: parameter q
    //  outputs: position = 2d-vector = rr
    fun,
    //param q
    q,
    //optional: chosen point of reference for polar system of coodinates
    //by default rcenter = [0,0]
    rrc,
    //optional: "delta q", numerical differentiation interval
    DDD,
){
    DDD = DDD || 0.00001;
    //note: protects values against being oo,
    //      can do 1e-300,
    const INFINITY_PROTECTOR = 1e-200;

    //differentiation intervals optimized for performance
    const DDD1    = 1/DDD;
    const DDD2    = 0.5 * DDD1;
    const DDDA    = DDD1 * DDD1;

    //radius-vector in respect to coord. syst. origin:
    const rr      = fun( q );
    const rOrAbs  = Math.sqrt( rr[0]*rr[0] + rr[1]*rr[1] );
    const rplus   = fun( q + DDD );
    const rminus  = fun( q - DDD );
    //speed along q
    const vv      = [ (rplus[0] - rminus[0])*DDD2,
                    (rplus[1] - rminus[1])*DDD2,
                  ];
    const v2      = vv[0]*vv[0] + vv[1]*vv[1];
    const v       = Math.sqrt( v2 );
    //unit speed
    const uu      = [ vv[0]/v, vv[1]/v, ];

    //aa is exaclty a sagitta*2 divided to (dq)^2 and
    //is exaclty an acceleration,
    //(acceleration by q and not by t),
    //this sagitta is a sagitta of chord taken
    //from rmin to rmax
    const sagitta2x= (rplus[0]-rr[0])+(rminus[0]-rr[0]);
    const sagitta2y= (rplus[1]-rr[1])+(rminus[1]-rr[1]);
    //acceleration by q
    const aa      = [ sagitta2x*DDDA, sagitta2y*DDDA ];
    const a2      = aa[0]*aa[0] + aa[1]*aa[1];
    const a       = Math.sqrt( a2 );

    //projection of [𝘃𝗮]=[vv*aa] on ort 𝗸,
    //(𝗸 = [ij]-chosen and fixed towards orbit plane human viewer),
    const cv3 = vv[0]*aa[1]-vv[1]*aa[0];
    //curvature abs. value
    const c = Math.abs( cv3 ) / (v2*v);

    //bk=orientation = [𝘂𝗻]𝗸, 𝗻=𝘂˙ₛ/|𝘂˙ₛ|
    const bk = Math.sign( cv3 );

    //normal vector, right-ort-oriented in respect to ort 𝗸,
    //if vector product is along 𝗸, then curvature is
    //rotated counter-clockwise from 𝘂:
    const nn = bk < 0 ?
        [ uu[1], -uu[0], ] : //clockwise
        [ -uu[1], uu[0], ];  //counter-clockwise;
    //curvature vector
    const cc = [nn[0]*c, nn[1]*c];
    const R = c < INFINITY_PROTECTOR ? 1/INFINITY_PROTECTOR : 1/c;

    //vector from body to curvature circle center
    const RR = [ nn[0]*R, nn[1]*R ];
    //curvature circle center
    const RC = [ RR[0]+rr[0], RR[1]+rr[1], ];
    //*********************************************************
    // //\\// adjusts radius vector to offset rrc: rrr = rr-rrc
    //        if offset rrc is supplied
    const rrr     = rrc ? [ rr[0]-rrc[0], rr[1]-rrc[1] ] : rr;
    //*********************************************************
    const r2      = rrr[0]*rrr[0] + rrr[1]*rrr[1];
    let r         = Math.sqrt( r2 );
    r             = r<INFINITY_PROTECTOR ? INFINITY_PROTECTOR : r;
    const ee      = [ rrr[0]/r, rrr[1]/r, ];

    //angle between radius vector rrr and speed uu
    const sinOmega = ee[0]*uu[1] - ee[1]*uu[0];
    //for any curve:
    //  𝛚 = 𝗸sin(ω) = [𝗲𝘂] = [𝗲[bₖ𝗻𝗸]] = b(ac)-c(ab) =
    //    = 0 - 𝗸(𝗲𝗻)bₖ
    //  sinOmega = -bk*( ee[0]*nn[0] + ee[1]*nn[1] ) =
    //           = -bₖcos(𝗲^𝗻);
    //this notation is notational bug: instead of cosOmega it
    //should be cos( complimentary omega );
    const cosOmega = ee[0]*uu[0] + ee[1]*uu[1];

    ///todm slow code, do work around,
    ///fixing extreme cases:
    ///is this a bug in JS?
    if( Math.abs( sinOmega - 1 ) < 1e-15 ) {
        var angleRV = PI2;
    } else if( Math.abs( sinOmega + 1 ) < 1e-15 ) {
        var angleRV = -PI2;
    } else {
        var angleRV = Math.asin( sinOmega );
    }
    //minimizes abs value of sinOmega,
    //useless
    //angleRV = cosOmega > 0 ? angleRV :
    //    angleRV > 0 ? PI-angleRV : -PI-angleRV;

    //----------------------------------------------
    // //\\ convenience values
    //      for Principia, b1sec2prop5, cor. 3,
    //      gets chord SV, which is
    //      projection-of-diameter-of-curvature-to-radius-vector
    //----------------------------------------------
    {
        //projection of curvature-diameter to radius vector SP
        const proj = 2*(ee[0]*RR[0] + ee[1]*RR[1]);
        //projection vector
        const vectPV = [ ee[0]*proj, ee[1]*proj ];
        //this is point's V position in prop6, corr.:
        var curvatureChordSecondPoint =
            [ vectPV[0]+rr[0], vectPV[1]+rr[1] ];
    }
    {
        //projection of radius vector to tangent
        const proj = -rrr[0]*uu[0] - rrr[1]*uu[1];
        //projection vector
        const vectPY = [ uu[0]*proj, uu[1]*proj ];
        //this is point's Y position
        var projectionOfCenterOnTangent =
            [ vectPY[0]+rr[0], vectPY[1]+rr[1] ];
    }
    //----------------------------------------------
    // \\// convenience values
    //----------------------------------------------

    //------------------------------------------------
    // //\\ "static" Sectorial Speed as = [rrr,uu]
    //      assuming ds/dt = 1 and omitting 1/2
    //------------------------------------------------
    //sect. speed if ds/dt === 1:
    //(this does not depend on direction of normal)
    var Mu = rrr[0]*uu[1] - rrr[1]*uu[0];
    //------------------------------------------------
    // \\// "static" Sectorial Speed as = [rrr,uu]
    //------------------------------------------------

    //****************************************************
    //excellent debug trick
    //if( mat.doPrint ) { c cc( 'm a t: ' + matt.do Print +
    //****************************************************
    return {
        __proto__: null,
        q,

        //------------------------------------------------
        // //\\ in respect to origin of coordinate system
        //------------------------------------------------
        rr, //body pos in respect to coord system origin
        rOrAbs,
        curvatureChordSecondPoint,
        projectionOfCenterOnTangent,
        rrc, //force center if supplied
        RC, //curvature circle center
        //------------------------------------------------
        // \\// in respect to origin of coordinate system
        //------------------------------------------------

        //------------------------------------------------
        // //\\ in respect to rrc
        //------------------------------------------------
        //in respect to chosen polar center rrc, if rrc presented
        rrr,
        r2,
        r,  //abs value of offset radius
        ee,
        //"geometrical momentum" = M/v = [𝗿𝘂] = [𝗿𝘃]/v;
        //where v=ds/dq or v=ds/dt
        Mu,

        //===========================================
        //for Kepler orbits:
        //bonus value: not in use yet
        //ds_dt_M : 1/Mu,
        //
        //spatial speed abs value in units of momentum M
        //which is constant:
        //ds_dt = ds_dt_M * M.
        //
        //note, if to take the same orbit, but
        //at some point q, M is increased by k,
        //then full time is decreased by k and
        //acceleration at each point is increased
        //by k^2
        //===========================================
        //------------------------------------------------
        // \\// in respect to rrc
        //------------------------------------------------

        //------------------------------------------------
        // //\\ non-dependent on rrc
        //------------------------------------------------
        vv, //vector = dr/dq
        v2, //square of above
        v,  //abs of above
        ds_dq : v, //todm revert all to this name
        uu, //direction of above
        aa,
        a2,
        a,
        c,
        nn, //unit curvature vector
        bk, //=[uu,nn]
        cc, //curvature vector
        R,  //curvature radius
        RR,

        angleRV,    //in respect to center rrc
        sinOmega,   //in respect to center rrc
        cosOmega,   //in respect to center rrc

        //sagitta2: [sagitta2x, sagitta2y],
        //does not appear to have a value for real
        //time-based sagitta:
        //------------------------------------------------
        // \\// non-dependent on rrc
        //------------------------------------------------
    };
}
}