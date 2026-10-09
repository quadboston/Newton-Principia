( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var mcurve      = sn( 'mcurve', mat );
    mcurve.planeCurveDerivatives = planeCurveDerivatives;
    return;


    //Notation: ii,jj,kk right-coordinate-system orts,
    function planeCurveDerivatives({
        // **api-input---plane-curve-derivatives

        //2d curve function: q|-> planetXY,
        //  inputs: parameter q
        //  outputs: position = 2d-vector = planetXY
        //requirement: drr/dt = vv != 0 (when q is a time, then
        //  speed cannot be 0 )
        pointAt,

        q, //param q, not to be confused with point Q

        //optional: chosen point of reference for polar system of coodinates
        //by default rcenter = [0,0]
        //TEMP
        sunXY = [0, 0],

        //optional: "delta q", numerical differentiation step
        delta_q,
    }){
        delta_q         = delta_q || 0.0001;

        //note: protects values against being ∞,
        //      can do 1e-300,
        const INFINITY_PROTECTOR = 1e-200;

        //Note these vectors are positions on the diagram.  They may or may not
        //be equal to the r (position) vectors, that are relative to the center
        //of forces, because the diagram origin may or may not be the same as
        //that center.

        //TEMP Other possible names are "posBodyP", "posBodyAtP"
        const posBody   = pointAt( q );

        //Two points on the orbit offset slightly from the body
        //TEMP Another possible name is eg. "posBodyPlus", however body probably
        //isn't needed here.
        const posPlus   = pointAt( q + delta_q );
        const posMinus  = pointAt( q - delta_q );

        //Note for the below calculations:
        //-Relative positions are used, which means the origin of the vectors
        // must be the same, however it doesn't matter what origin they used.
        //-Two points are used rather than one to increase accuracy.  As an
        // example let's think about calculating the direction of the tangent.
        // If the body was on the right side of an ellipse, two points results
        // in a vertical line, which is the same as the actual tangent.  However
        // one point results in a line that's only near vertical, which is less
        // accurate.
        //-They calculate (approximate) instantaneous values.  While average
        // values are calculated, given delta_q is very small, they approach
        // instantaneous values for example:
        //   Δr/Δq  ~=  dr/dq
        //   Δs/Δq  ~=  ds/dq
        //  |dr/dq| ~= |ds/dq|
        //TEMP The above may need adjustments


        //TEMP
        //**********Velocity**********
        //**********Calculate dr/dq (not the same as dr/dt)**********
        //Know dr/dq = (r2 - r1) / delta_q
        //Sub the following midpoints (delta_q apart from each other)
        //Know r2 = midpointPlusBody  = (posPlus + posBody) / 2
        //Know r1 = midpointBodyMinus = (posBody + posMinus) / 2

        //dr/dq = (midpointPlusBody - midpointBodyMinus) / delta_q
        //dr/dq = ((posPlus + posBody) / 2 - (posBody + posMinus) / 2) / delta_q
        //dr/dq = ((posPlus + posBody) - (posBody + posMinus)) / (2 * delta_q)
        const dr_dq = [ (posPlus[0] - posMinus[0])/(2*delta_q),
				        (posPlus[1] - posMinus[1])/(2*delta_q), ];
        const ds_dq_squared = dr_dq[0]**2 + dr_dq[1]**2;
        const ds_dq         = Math.sqrt(ds_dq_squared);
        const uTangential   = [dr_dq[0] / ds_dq, dr_dq[1] / ds_dq];



        //TEMP
        //**********Acceleration**********
        //Calculate d²r/dq² (not the same as d²r/dt²)
        //Use the following midpoints (delta_q apart from each other)
        //Know d²r/dq² = (dr2/dq - dr1/dq) / delta_q
        //Know midpointPlus  = (posPlus - posBody) / delta_q
        //Know midpointMinus = (posBody - posMinus) / delta_q
        //d²r/dq² = (midpointPlus - midpointMinus) / delta_q
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



        //projection of [vv*d2r_dq2] on ort kk,
        var cv3     = dr_dq[0]*d2r_dq2[1]-dr_dq[1]*d2r_dq2[0];
        //curvature abs. value
        var c       = Math.abs( cv3 ) / (ds_dq_squared*ds_dq);
        var bk      = Math.sign( cv3 ); //=orientation = [𝘂𝗻]𝗸

        //normal vector, correctly oriented in respect to ort 𝗸,
        //if vector product is along 𝗸, then curvature is
        //rotated counter-clockwise from 𝘂:
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

        //*********************************************************
        //TEMP Old comment
        // //\\// adjusts radius vector to offset sunXY: rrr = posBody-sunXY
        //        if offset sunXY is supplied

        //TEMP Should probably add a comment explaining how the following works,
        //eg. what origin is used.

        //TEMP Below are two possibilities for how this section could be setup.
        //There are some differences, therefore check which works best.
        const r = mat.p1_to_p2(sunXY, posBody);

        const r   = {};
        r.vector  = [ posBody[0]-sunXY[0], posBody[1]-sunXY[1] ];
        r.v2      = r.vector[0]**2 + r.vector[1]**2;
        r.abs     = Math.max(Math.sqrt(r.v2), INFINITY_PROTECTOR);
        r.unitVec = [ r.vector[0]/r.abs, r.vector[1]/r.abs, ];
        //*********************************************************


        //:angle between norm n and radius vector rrr

        //the same: var sinOmega = -( r.unitVec[0]*uNormal[0] + r.unitVec[1]*uNormal[1] ) * bk;
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

        //: gets projection of rrr to tangent
        //  radius vector rrr projection on tangent:
        var ww = mat.scalarProduct(r.vector, uTangential) * -1;
        // radius vector component along tangent:
        var ww = mat.scaleV(ww, uTangential);
        //this is point V in Newton's Prop6, Theor 5:
        var projectionOfCenterOnTangent = [ ww[0]+posBody[0], ww[1]+posBody[1] ];

        //TEMP It looks like the following may also be used in eg.
        //"contents\b1sec3prop17\js\model-upcreate.js" mentions sectorial speed
        //------------------------------------------------
        // //\\ "static" Sectorial Speed as = [rrr,uTangential]
        //      assuming ds/dt = 1 and omitting 1/2
        //------------------------------------------------
        //bound to fail: depend on direction of normal:
        //  gets projection of rrr to normal
        //  var staticSectorialSpeed_rrrOnUU = -rrr[0]*uNormal[0] - rrr[1]*uNormal[1];

        //sect. speed if ds/dt === 1:
        //(this does not depend on direction of normal)
        var staticSectorialSpeed_rrrOnUU = rrr[0]*uTangential[1] - rrr[1]*uTangential[0];
        //------------------------------------------------
        // \\// "static" Sectorial Speed as = [rrr,uTangential]
        //------------------------------------------------

        //****************************************************
        //excellent debug trick
        //if( mat.doPrint ) { c cc( 'm a t: ' + matt.do Print + 
        //****************************************************
        return {
            q,
            sunXY, //force center if supplied
            // **api-output---plane-curve-derivatives
            planetXY: posBody, //body pos in respect to coord system origin
            //TEMP The following isn't used anywhere and isn't needed
            // rOrAbs,

            //in respect to chosen polar center sunXY, if sunXY presented
            rrr: r.vector,
            r2:  r.v2,
            r:   r.abs,
            ee:  r.unitVec,

            vv: dr_dq,
            v2: ds_dq_squared, //square of above
            v:  ds_dq,
            ds_dq, //todm revert all to this name
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

            //TEMP Perhaps add some of the following text to the comment above?
            //this name is too long we need shorter name,
            //sectspeed_ru=momentum0 = [𝗿𝘂] = [𝗿𝘃]/v; for v=ds/dq or v=ds/dt
            staticSectorialSpeed_rrrOnUU, //=algebraic momentum0

            angleRV,    //in respect to sunXY
            sinOmega,   //in respect to sunXY
            cosOmega,   //in respect to sunXY

            //for Kepler's motion, f = 1/R vₜ² / sin(w)

            //TEMP
            delta_q,
        };
    }
}) ();
