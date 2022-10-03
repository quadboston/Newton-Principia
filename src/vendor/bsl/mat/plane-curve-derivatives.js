( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var mcurve      = sn( 'mcurve', mat );

    //----------------------------------------------------
    // //\\ test,
    //
    //----------------------------------------------------
    /*
    var der = planeCurveDerivatives({
        //circle
        fun             : (x) => Math.sqrt( Math.abs( 1 - x*x ) ),
    });
    ccc( der )
    */
    //----------------------------------------------------
    // \\// test
    //----------------------------------------------------
    mcurve.planeCurveDerivatives = planeCurveDerivatives;
    return;








    //Notation: ii,jj,kk right-coordinate-system orts,
    function planeCurveDerivatives({
        // **api-input---plane-curve-derivatives

        //2d curve function: q|-> rr,
        //  inputs: parameter q
        //  outputs: position = 2d-vector = rr
        //requirement: drr/dt = vv != 0 (whne q is a time, then
        //  speed cannot be 0 )
        fun,

        //param q
        q,

        //optional: chosen point of reference for polar system of coodinates
        //by default rcenter = [0,0]
        rrc,

        //optional: "delta q", numerical differentiation step
        DDD,
    }){
        DDD         = DDD || 0.0001;

        //note: protects values against being oo,
        //      can do 1e-300,
        const INFINITY_PROTECTOR = 1e-200;

        var DDD1    = 1/DDD;
        var DDD2    = 0.5 * DDD1;
        //radius-vector in respect to coord. syst. origin:
        var rr      = fun( q );
        var rOrAbs  = Math.sqrt( rr[0]*rr[0] + rr[1]*rr[1] );
        var rplus   = fun( q + DDD );
        var rminus  = fun( q - DDD );
        //speed along q
        var vv      = [ (rplus[0] - rminus[0])*DDD2, (rplus[1] - rminus[1])*DDD2, ];
        var v2      = vv[0]*vv[0] + vv[1]*vv[1];
        var v       = Math.sqrt( v2 );
        //unit speed
        var uu      = [ vv[0]/v, vv[1]/v, ];
        var aa      = [
                        (rplus[0]+rminus[0]-2*rr[0])*DDD1*DDD1,
                        (rplus[1]+rminus[1]-2*rr[1])*DDD1*DDD1,
                      ];
        var a2      = aa[0]*aa[0] + aa[1]*aa[1];
        var a       = Math.sqrt( a2 );

        //projection of [vv*aa] on ort kk,
        var cv3     = vv[0]*aa[1]-vv[1]*aa[0];
        //curvature abs. value
        var c       = Math.abs( cv3 ) / (v2*v);
        var bk      = Math.sign( cv3 ); //=orientation = [𝘂𝗻]𝗸

        //normal vector, correctly oriented in respect to ort 𝗸,
        //if vector product is along 𝗸, then curvature is
        //rotated counter-clockwise from 𝘂:
        var nn = bk < 0 ?
            [ uu[1], -uu[0], ] : //clockwise
            [ -uu[1], uu[0], ];  //counter-clockwise;
        //curvature vector
        var cc = [nn[0]*c, nn[1]*c];
        var R = c < INFINITY_PROTECTOR ? 1/INFINITY_PROTECTOR : 1/c;
        //vector from body to curvature circle center
        var RR = [ nn[0]*R, nn[1]*R ];
        var RC = [ RR[0]+rr[0], RR[1]+rr[1], ];





        //*********************************************************
        // //\\// adjusts radius vector to offset rrc: rrr = rr-rrc
        //        if offset rrc is supplied
        rrr         = rrc ? [ rr[0]-rrc[0], rr[1]-rrc[1] ] : rr;
        //*********************************************************
        var r2      = rrr[0]*rrr[0] + rrr[1]*rrr[1];
        var r       = Math.sqrt( r2 );
        r           = r<INFINITY_PROTECTOR ? INFINITY_PROTECTOR : r;
        var ee      = [ rrr[0]/r, rrr[1]/r, ];



        //:angle between norm n and radius vector rrr
        var sinOmega = -( ee[0]*nn[0] + ee[1]*nn[1] ) * bk;
        var cosOmega = ee[0]*uu[0] + ee[1]*uu[1];
        var angleRV = Math.asin( sinOmega );
        angleRV = cosOmega > 0 ? angleRV :
            angleRV > 0 ? Math.PI-angleRV : -Math.PI-angleRV;

        //: gets chord second point V, which
        // is a point V in Newton's Prop6, Theor 5,
        // gets projection of RR on ee:
        var ww = ee[0]*RR[0] + ee[1]*RR[1];
        // gets chord's vector = ww taken twice:
        var ww = [ ee[0]*ww*2, ee[1]*ww*2 ];
        //this is point V:
        var curvatureChordSecondPoint = [ ww[0]+rr[0], ww[1]+rr[1] ];


        //: gets projection of rrr to tangent
        //  radius vector rrr projection on tangent: 
        var ww      = -rrr[0]*uu[0] - rrr[1]*uu[1];
        // radius vector component along tangent:
        var ww = [ uu[0]*ww, uu[1]*ww ];
        //this is point V in Newton's Prop6, Theor 5:
        var projectionOfCenterOnTangent = [ ww[0]+rr[0], ww[1]+rr[1] ];

        //------------------------------------------------
        // //\\ static Sectorial Speed = [rrr,uu]
        //------------------------------------------------
        //bound to fail: depend on direction of normal:
        //  gets projection of rrr to normal
        //  var staticSectorialSpeed_rrrOnUU = -rrr[0]*nn[0] - rrr[1]*nn[1];

        //this does not depend on direction of normal
        var staticSectorialSpeed_rrrOnUU = rrr[0]*uu[1] - rrr[1]*uu[0];
        //------------------------------------------------
        // \\// static Sectorial Speed = [rrr,uu]
        //------------------------------------------------

        return {
            q,
            // **api-output---plane-curve-derivatives
            rr, //body pos in respect to coord system origin
            rOrAbs,

            //in respect to chosen polar center rrc, if rrc presented
            rrr,
            r2,
            r,
            ee,

            vv, //vector = dr/dq
            v2, //square of above
            v,  //abs of above
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
            RC,
            curvatureChordSecondPoint,
            projectionOfCenterOnTangent,
            staticSectorialSpeed_rrrOnUU, //=sectorialSpeedDividedByArcSpeed

            //angle between norm n and radius vector rrr
            angleRV,
            sinOmega,
            cosOmega,

            //for Kepler's motion, f = 1/R vₜ² / sin(w)
        };
    }

}) ();


