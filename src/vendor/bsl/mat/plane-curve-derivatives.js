( function() {
    var { mat, mcurve, ssD, } = window.b$l.apptree({});
    mcurve.planeCurveDerivatives = planeCurveDerivatives;

    ssD.delta_q_finite_difference = 0.0001;
    return;


    //TEMP Don't forget to adjust function name
    //Notation: ii,jj,kk right-coordinate-system orts,
    function planeCurveDerivativesNew({
        // **api-input---plane-curve-derivatives

        //2d curve function: q|-> posBody,
        //  inputs: parameter q
        //  outputs: position = 2d-vector = posBody
        pointAt,

        q, //param q, not to be confused with point Q

        //optional: chosen position for center of forces
        sunXY = [0, 0],
    }){
        //todo Remove when input sunXY renamed
        const posCenterOfForces = sunXY;

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
            sunXY: posCenterOfForces,
            // **api-output---plane-curve-derivatives
            planetXY: posBody,

            rrr: r.vector,
            r2:  r.v2,
            r:   r.abs,
            ee:  r.unitVec,

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

            staticSectorialSpeed_rrrOnUU: hPerSpeed,

            angleRV,    //in respect to posCenterOfForces
            sinOmega,   //in respect to posCenterOfForces
            cosOmega,   //in respect to posCenterOfForces

            //for Kepler's motion, f = 1/R vₜ² / sin(w)

            //todo Replace any code that uses this output variable, with the new
            //one stored in ssD.  Then remove this variable from the output.
            delta_q,
        };
    }


    //TEMP The following is a simple test to help check the changes in the
    //planeCurveDerivatives function.  Note it's draft code, may not be perfect,
    //and is only part of the test process.  It compares the output of the old
    //function to the new function, to see if the values match or not.
    function planeCurveDerivatives({
        pointAt,
        q,
        sunXY,
    }){
        const dataNew = planeCurveDerivativesNew({pointAt, q, sunXY});
        const dataOld = planeCurveDerivativesOld({pointAt, q, sunXY});

        for (const [key, valueNew] of Object.entries(dataNew)) {
            const valueOld = dataOld[key];
            let message = "";

            if (valueNew == null || valueOld == null)
                message = "null value";

            if (typeof valueNew != typeof valueOld)
                message = "types differ";

            switch (typeof valueNew) {
                case "object":
                    const lengthNew = valueNew.length;
                    const lengthOld = valueOld.length;
                    if (lengthNew != lengthOld)
                        message = "lengths differ";
                    for (let i = 0; i < Math.min(lengthNew, lengthOld); i++)
                        message = compareValues(valueNew[i], valueOld[i], message);
                    break;

                case "number":
                    message = compareValues(valueNew, valueOld, message);
                    break;

                default:
                    message = "type not listed";
                    break;
            }

            if (message != "") {
                console.error(`Error: ${message}  ` +
                        `key = ${key}  ` +
                        `valueNew = ${valueNew}  ` +
                        `valueOld = ${valueOld}  ` +
                        `typeof valueNew = ${typeof valueNew}  ` +
                        `typeof valueOld = ${typeof valueOld}`);
            }
        }
        console.log("Finished comparing planeCurveDerivatives old to new");
        return dataNew;


        function compareValues(valueNew, valueOld, message) {
            const error = (valueNew - valueOld);
            if (error != 0)
                return `not equal  error = ${error}`;
            return message;
        }
    }



    function planeCurveDerivativesOld({
        // **api-input---plane-curve-derivatives

        //2d curve function: q|-> planetXY,
        //  inputs: parameter q
        //  outputs: position = 2d-vector = planetXY
        //requirement: drr/dt = vv != 0 (whne q is a time, then
        //  speed cannot be 0 )
        pointAt,

        q, //param q, not to be confused with point Q

        //optional: chosen point of reference for polar system of coodinates
        //by default rcenter = [0,0]
        sunXY,

        //optional: "delta q", numerical differentiation step
        delta_q,
    }){
        delta_q         = delta_q || 0.0001;

        //note: protects values against being ∞,
        //      can do 1e-300,
        const INFINITY_PROTECTOR = 1e-200;

        //radius-vector in respect to coord. syst. origin:
        var planetXY      = pointAt( q );
        var rOrAbs  = Math.sqrt( planetXY[0]*planetXY[0] + planetXY[1]*planetXY[1] );
        var rplus   = pointAt( q + delta_q );
        var rminus  = pointAt( q - delta_q );
        //speed along q
        var vv
			= [ (rplus[0] - rminus[0])/(2*delta_q),
				 (rplus[1] - rminus[1])/(2*delta_q), ];
        var v2      = vv[0]*vv[0] + vv[1]*vv[1];
        var v       = Math.sqrt( v2 );
        //unit speed
        var uu      = [ vv[0]/v, vv[1]/v, ];
        
        //aa is exaclty a sagitta*2 divided to (dt)^2 and
        //is exaclty an acceleration,
        //this sagitta is a sagitta of chord taken
        //from rmin to rmax
        var sagitta2x= (rplus[0]-planetXY[0])+(rminus[0]-planetXY[0]);
        var sagitta2y= (rplus[1]-planetXY[1])+(rminus[1]-planetXY[1]);
        var aa      = [ sagitta2x/(delta_q**2), sagitta2y/(delta_q**2) ];
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
        //curvature circle center
        var RC = [ RR[0]+planetXY[0], RR[1]+planetXY[1], ];

        //*********************************************************
        // //\\// adjusts radius vector to offset sunXY: rrr = planetXY-sunXY
        //        if offset sunXY is supplied
        var rrr     = sunXY ? [ planetXY[0]-sunXY[0], planetXY[1]-sunXY[1] ] : planetXY;
        //*********************************************************
        var r2      = rrr[0]*rrr[0] + rrr[1]*rrr[1];
        var r       = Math.sqrt( r2 );
        r           = r<INFINITY_PROTECTOR ? INFINITY_PROTECTOR : r;
        //TEMP ee should probably be eg. renamed or combined in an object with
        //the above variables.
        var ee      = [ rrr[0]/r, rrr[1]/r, ];

        //:angle between norm n and radius vector rrr

        //the same: var sinOmega = -( ee[0]*nn[0] + ee[1]*nn[1] ) * bk;
        var sinOmega = ee[0]*uu[1] - ee[1]*uu[0];
        var cosOmega = ee[0]*uu[0] + ee[1]*uu[1];

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
        //      = projection of RR on ee:
        var ww = ee[0]*RR[0] + ee[1]*RR[1];
        //      projection-of-diameter-of-curvature-to-radius-vector,
        var ww = [ ee[0]*ww*2, ee[1]*ww*2 ];
        //      this is a point V:
        var curvatureChordSecondPoint = [ ww[0]+planetXY[0], ww[1]+planetXY[1] ];

        //: gets projection of rrr to tangent
        //  radius vector rrr projection on tangent: 
        var ww      = -rrr[0]*uu[0] - rrr[1]*uu[1];
        // radius vector component along tangent:
        var ww = [ uu[0]*ww, uu[1]*ww ];
        //this is point V in Newton's Prop6, Theor 5:
        var projectionOfCenterOnTangent = [ ww[0]+planetXY[0], ww[1]+planetXY[1] ];

        //------------------------------------------------
        // //\\ "static" Sectorial Speed as = [rrr,uu]
        //      assuming ds/dt = 1 and omitting 1/2
        //------------------------------------------------
        //bound to fail: depend on direction of normal:
        //  gets projection of rrr to normal
        //  var staticSectorialSpeed_rrrOnUU = -rrr[0]*nn[0] - rrr[1]*nn[1];

        //sect. speed if ds/dt === 1:
        //(this does not depend on direction of normal)
        var staticSectorialSpeed_rrrOnUU = rrr[0]*uu[1] - rrr[1]*uu[0];
        //------------------------------------------------
        // \\// "static" Sectorial Speed as = [rrr,uu]
        //------------------------------------------------
        
        //****************************************************
        //excellent debug trick
        //if( mat.doPrint ) { c cc( 'm a t: ' + matt.do Print + 
        //****************************************************
        return {
            q,
            sunXY, //force center if supplied
            // **api-output---plane-curve-derivatives
            planetXY, //body pos in respect to coord system origin
            rOrAbs,
  
            //in respect to chosen polar center sunXY, if sunXY presented
            rrr,
            r2,
            r,  //abs value of offset radius
            ee,

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
            RC,
            curvatureChordSecondPoint,
            projectionOfCenterOnTangent,

            //this name is too long we need shorter name,
            //sectspeed_ru=momentum0 = [𝗿𝘂] = [𝗿𝘃]/v; for v=ds/dq or v=ds/dt
            staticSectorialSpeed_rrrOnUU, //=algebraic momentum0

            angleRV,    //in respect to sunXY
            sinOmega,   //in respect to sunXY
            cosOmega,   //in respect to sunXY

            //sagitta2 : [sagitta2x, sagitta2y],
            //for Kepler's motion, f = 1/R vₜ² / sin(w)

            //TEMP
            delta_q,
        };
    }
}) ();
