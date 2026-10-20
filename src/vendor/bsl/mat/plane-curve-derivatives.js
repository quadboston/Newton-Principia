( function() {
    var { mat, mcurve, ssD, } = window.b$l.apptree({});
    mcurve.planeCurveDerivatives = planeCurveDerivatives;

    ssD.delta_q_finite_difference = 0.0001;
    return;


    //Notation: ii,jj,kk right-coordinate-system orts,
    function planeCurveDerivatives({
        // **api-input---plane-curve-derivatives

        //2d curve function: q|-> posBody,
        //  inputs: parameter q
        //  outputs: position = 2d-vector = posBody
        pointAt,

        q, //param q, not to be confused with point Q

        //optional: chosen position for center of forces
        posCenterOfForces = [0, 0],
    }){
        const delta_q = ssD.delta_q_finite_difference;

        //note: protects values against being ∞,
        //      can do 1e-300,
        const INFINITY_PROTECTOR = 1e-200;


        //These vectors are positions on the diagram, relative to the diagram
        //origin.  Note they use a different origin than the r (position)
        //vectors, that are relative to the center of forces.
        const posBody   = pointAt( q );
        //Two points on the orbit offset slightly from the body
        const posPlus   = pointAt( q + delta_q );
        const posMinus  = pointAt( q - delta_q );


        //Note for the dr/dq and d²r/dq² calculations:
        //-Relative positions are used, meaning the origin of the vectors must
        // be the same, however it doesn't matter what origin is used.
        //-The central difference method is used to improve accuracy (two points
        // offset from the body, rather than one and the body).  An example is
        // calculating the direction of the tangent.  If the body is on the
        // right side of an ellipse, two points results in a vertical line,
        // which is the same as the actual tangent.  However one point results
        // in a line that's only near vertical, which is less accurate.
        //-They calculate (approximate) instantaneous values.  While average
        // values are calculated, given delta_q is very small, they approach
        // instantaneous values for example:
        //   Δr/Δq  ~=  dr/dq
        //   Δs/Δq  ~=  ds/dq
        //  |dr/dq| ~= |ds/dq|


        //Calculate dr/dq (not the same as dr/dt)
        //Know dr/dq = (r₂ - r₁) / delta_q
        //Sub the following values (delta_q apart from each other)
        //r₂ = (posPlus + posBody) / 2
        //r₁ = (posBody + posMinus) / 2
        //dr/dq = ((posPlus + posBody) / 2 - (posBody + posMinus) / 2) / delta_q
        //dr/dq = ((posPlus + posBody) - (posBody + posMinus)) / (2 * delta_q)
        const dr_dq = [ (posPlus[0] - posMinus[0])/(2*delta_q),
				        (posPlus[1] - posMinus[1])/(2*delta_q), ];
        const ds_dq_squared = dr_dq[0]**2 + dr_dq[1]**2;
        const ds_dq         = Math.sqrt(ds_dq_squared);
        const uTangential   = [dr_dq[0] / ds_dq, dr_dq[1] / ds_dq];


        //Calculate d²r/dq² (not the same as d²r/dt²)
        //Know d²r/dq² = ((dr/dq)₂ − (dr/dq)₁) / delta_q
        //Sub the following values (delta_q apart from each other)
        //(dr/dq)₂ = (posPlus - posBody) / delta_q
        //(dr/dq)₁ = (posBody - posMinus) / delta_q
        //
        //d²r/dq² = ((posPlus - posBody) - (posBody - posMinus)) / delta_q**2
        //d²r/dq² = ((posPlus - posBody) + (posMinus - posBody)) / delta_q**2

        //Know sagitta = midpointChord - midpointArc
        //Know midpointChord = (posPlus + posMinus) / 2
        //Know midpointArc   = posBody
        //sagitta   = (posPlus + posMinus) / 2 - posBody
        //sagitta*2 = (posPlus + posMinus) - 2 * posBody
        //sagitta*2 = (posPlus - posBody) + (posMinus - posBody)
        const sagittaX2 = [(posPlus[0]-posBody[0])+(posMinus[0]-posBody[0]),
                           (posPlus[1]-posBody[1])+(posMinus[1]-posBody[1])];
        const d2r_dq2 = [sagittaX2[0]/(delta_q**2), sagittaX2[1]/(delta_q**2)];
        const d2s_dq2_squared = d2r_dq2[0]**2 + d2r_dq2[1]**2;
        const d2s_dq2         = Math.sqrt(d2s_dq2_squared);


        //projection of [dr_dq*d2r_dq2] on ort kk,
        var cv3     = dr_dq[0]*d2r_dq2[1]-dr_dq[1]*d2r_dq2[0];
        //curvature abs. value
        var c       = Math.abs( cv3 ) / (ds_dq_squared*ds_dq);
        var bk      = Math.sign( cv3 ); //=orientation = [𝘂𝗻]𝗸

        //normal vector, correctly oriented in respect to ort 𝗸,
        //if vector product is along 𝗸, then curvature is
        //rotated counter-clockwise from uTangential:
        var uNormal = bk < 0 ?
            [ uTangential[1], -uTangential[0], ] : //clockwise
            [ -uTangential[1], uTangential[0], ];  //counter-clockwise;
        //curvature vector
        var cc = [uNormal[0]*c, uNormal[1]*c];
        var R = c < INFINITY_PROTECTOR ? 1/INFINITY_PROTECTOR : 1/c;

        //vector from body to curvature circle center
        var RR = [ uNormal[0]*R, uNormal[1]*R ];
        //curvature circle center
        var RC = [ RR[0]+posBody[0], RR[1]+posBody[1], ];


        //Calculate r (position of body relative to center of forces), includes
        //vector and related values.
        const r = mat.p1_to_p2(posCenterOfForces, posBody);


        //the same:
        //var sinOmega = -(r.unitVec[0]*uNormal[0] + r.unitVec[1]*uNormal[1])*bk;
        var sinOmega = r.unitVec[0]*uTangential[1] - r.unitVec[1]*uTangential[0];
        var cosOmega = r.unitVec[0]*uTangential[0] + r.unitVec[1]*uTangential[1];


        ///todo slow code, do work around,
        ///fixing extreme cases:
        ///is this bug in JS?
        if( Math.abs( sinOmega - 1 ) < 1e-15 ) {
            angleRV = Math.PI/2;
        } else if( Math.abs( sinOmega + 1 ) < 1e-15 ) {
            angleRV = -Math.PI/2;
        } else {
            var angleRV = Math.asin( sinOmega );
        }

        angleRV = cosOmega > 0 ? angleRV :
            angleRV > 0 ? Math.PI-angleRV : -Math.PI-angleRV;

        //:gets "chord second point V", which is
        //a point V in Newton's Prop6, Theor 5,
        //      projection-of-radius-of-curvature-to-radius-vector
        //      = projection of RR on r.unitVec:
        var ww = mat.scalarProduct(r.unitVec, RR);
        //      projection-of-diameter-of-curvature-to-radius-vector,
        var ww = mat.scaleV(ww*2, r.unitVec);
        //      this is a point V:
        var curvatureChordSecondPoint = [ ww[0]+posBody[0], ww[1]+posBody[1] ];


        //Projection of radius vector on tangent:
        var ww = mat.scalarProduct(r.vector, uTangential) * -1;
        // radius vector component along tangent:
        var ww = mat.scaleV(ww, uTangential);
        //this is point V in Newton's Prop6, Theor 5:
        var projectionOfCenterOnTangent = [ ww[0]+posBody[0], ww[1]+posBody[1] ];


        //Calculate specific angular momentum per speed
        //Know h = r x v
        //Sub  v = u * ds/dt
        //h = r x u * ds/dt
        //h / (ds/dt) = r x u
        //Sub hPerSpeed = h / (ds/dt)
        const hPerSpeed = r.vector[0]*uTangential[1] - r.vector[1]*uTangential[0];


        //****************************************************
        //excellent debug trick
        //if( mat.doPrint ) { c cc( 'm a t: ' + matt.do Print +
        //****************************************************
        return {
            q,
            posCenterOfForces,
            // **api-output---plane-curve-derivatives
            posBody,

            r2:  r.v2,
            r,

            vv: dr_dq,
            v2: ds_dq_squared,
            v:  ds_dq,
            ds_dq,
            uu: uTangential,

            aa: d2r_dq2,
            a2: d2s_dq2_squared,
            a:  d2s_dq2,

            c,
            nn: uNormal, //unit curvature vector
            bk, //=[uTangential,uNormal]
            cc, //curvature vector
            R,  //curvature radius
            RR,
            RC,
            curvatureChordSecondPoint,
            projectionOfCenterOnTangent,

            hPerSpeed,

            angleRV,    //in respect to posCenterOfForces
            sinOmega,   //in respect to posCenterOfForces
            cosOmega,   //in respect to posCenterOfForces

            //for Kepler's motion, f = 1/R vₜ² / sin(w)

            //todo Replace any code that uses this output variable, with the new
            //one stored in ssD.  Then remove this variable from the output.
            delta_q,
        };
    }
}) ();
