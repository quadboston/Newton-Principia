(function () {
    var {
        sn, nspaste, mcurve, mat,
        fconf, ssF, amode, sconf, rg,
    } = window.b$l.apptree({ stdModExportList : {
            model_upcreate,
        },
    });
    var sop = sn('sampleOrbitParameters', sconf);

    // to keep track of tab switches
    var subessay = ''; // todo: is this already tracked somewhere?
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        //console.log('model_upcreate');

        //================================================
        // //\\ op (brown orbit)
        //================================================
        const op        = sconf.orbitParameters;
        var cosAxis     = Math.cos(op.mainAxisAngle);
        var sinAxis     = Math.sin(op.mainAxisAngle);
        const pointAt       = rg[ 'approximated-curve' ].t2xy; //returns [x, y], defined in makes-orbit.js
        const q         = rg.P.q; //PparQ (position of P,Q,R on conic), gets set to initial, then updated with sliders Pv and f

        const rr0 = pointAt(q); // rg.P.pos
        // rg.S.pos is [0,0] as defined in amode8captures.js
        const posCenterOfForces = rg.S.pos;
        //nspaste( rg.P.pos, rr0 ); // rg.P.pos does not move

        // **api-input---plane-curve-derivatives
        var diff = mcurve.planeCurveDerivatives({
            pointAt,
            q,
            posCenterOfForces,
        });
        var {
            projectionOfCenterOnTangent,
            uTangential,
            r,
            sinOmega,
            cosOmega,
        } = diff;

        //"caustics"
        const axisC     = op.conicSignum === -1 ? -op.C : op.C;
        rg.C.pos[0]     = cosAxis * axisC;
        rg.C.pos[1]     = sinAxis * axisC;
        rg.H.pos[0]     = 2*rg.C.pos[0];
        rg.H.pos[1]     = 2*rg.C.pos[1];

        nspaste(rg.A.pos, pointAt(Math.PI));

        ////hyperbola or ellipse
        if (amode.subessay === 'corollary1' || amode.subessay === 'corollary2') {
            nspaste(rg.D.pos, rg.P.pos);
        } else {
            nspaste(rg.D.pos, pointAt(0));
        }

        nspaste(rg.K.pos, mat.dropPerpendicular(rg.S.pos, rg.H.pos, rg.P.pos));

        // point B
        {
            let posBx = op.conicSignum === -1 ? -op.C : op.C;
            let posB = [posBx, op.B,];
            let ww = mat.rotatesVect(posB, op.mainAxisAngle,);
            nspaste(rg.B.pos, ww);
        }

        // point Q
        var {
            posBody,
        } = deltaT_2_arc();
        nspaste(rg.Q.pos, posBody);

        // dragger R
        {
            //dropLine(... = start + direction * t
            let udir = op.cosOmega * cosOmega + op.om * sinOmega;
            nspaste(
                rg.R.pos,
                mat.sm(op.Kepler_v*udir, uTangential, 1, rg.P.pos)
            );
        }

        //perpendicular dropped from PR to S
        nspaste(rg.Y.pos, projectionOfCenterOnTangent);

        // latus rectum
        rg.L.pos[0]  = -sinAxis * op.latus;
        rg.L.pos[1]  =  cosAxis * op.latus;
        rg.LL.pos[0] =  sinAxis * op.latus;
        rg.LL.pos[1] = -cosAxis * op.latus;
        rg[ 'L,LL' ].value = (2*op.latus).toFixed(3);

        //================================================
        // \\// op (brown orbit)
        //================================================

        //=============================================================
        // //\\ sop (green orbit)
        //=============================================================
        {
            ////sample orbit
            let pointAt = rg[ 'approximated-curve-sample' ].t2xy;
            var {
                posBody,
                uTangential,
                r,
                projectionOfCenterOnTangent,
                sinOmega,
                cosOmega,
            } = mcurve.planeCurveDerivatives({
                pointAt,
                q   : rg.p.q,
                posCenterOfForces,
            });

            // only set position of p once, it does not move
            if (amode.subessay !== subessay) {
                subessay = amode.subessay;
                nspaste(rg.p.pos, posBody);
            }

            //sample speed vector
            {
                //dropLine(... = start + direction * t
                let udir = sop.cosOmega * cosOmega + sop.om * sinOmega;
                nspaste(
                    rg.point_r.pos,
                    mat.sm(sop.Kepler_v*udir, uTangential, 1, rg.p.pos)
                );
            }
            //sample's decorational dt arc
            var {
                posBody,
            } = mcurve.planeCurveDerivatives({
                pointAt,
                q : rg.p.q + sop.sagittaDelta_q_initial,
                posCenterOfForces,
            });
            nspaste(rg.q.pos, posBody);
            rg.p.abs = mat.unitVector(rg.p.pos).abs;
        }

        cosAxis   = Math.cos(sop.mainAxisAngle);
        sinAxis   = Math.sin(sop.mainAxisAngle);

        // latus
        rg.l.pos[0]  = -sinAxis * sop.latus;
        rg.l.pos[1]  =  cosAxis * sop.latus;
        rg.ll.pos[0] =  sinAxis * sop.latus;
        rg.ll.pos[1] = -cosAxis * sop.latus;

        {
            ////force and gamma
            let relativeGamma = op.Kepler_g / sop.Kepler_gInitial;
            var newLen = relativeGamma * sop.forceHandleInitial;
            nspaste(rg.f.pos, mat.sm(rg.p.pos, -1*newLen, r.unitVec));
        }

        //perpendicular dropped from pr to S
        rg.Ys.pos[0] = projectionOfCenterOnTangent[0];
        rg.Ys.pos[1] = projectionOfCenterOnTangent[1];

        // highlight arc (segment of sop around p)
        sop.highlightSeg = true;
        sop.segStart = rg.p.q + 0.4;
        sop.segEnd = sop.segStart - 0.8;

        //=============================================================
        // \\// sop (green orbit)
        //=============================================================
    }

    ///calculates arc's delta q depending on delta_t by
    ///integrating delta_q and reaching delta_t,
    function deltaT_2_arc()
    {
        const INTEGRATION_STEPS = 1000;

        op = sconf.orbitParameters;
        const posCenterOfForces = rg.S.pos;
        const pointAt = rg[ 'approximated-curve' ].t2xy;
        var q = rg.P.q;
        var {
            ds_dq,
            sinOmega,
            cosOmega,
        } = mcurve.planeCurveDerivatives({
            pointAt,
            q,
            posCenterOfForces,
        });
        var udir = op.cosOmega * cosOmega + op.om * sinOmega;
        //path step
        const ds_by_dt  = udir * op.delta_t / INTEGRATION_STEPS * op.Kepler_v;
        for (var it = 0; it <= INTEGRATION_STEPS; it++) {
            var {
                ds_dq, //=ds_by_dfi
                posBody,
            } = mcurve.planeCurveDerivatives({
                pointAt,
                q,
                posCenterOfForces,
            });
            //assumes central force, i.e. constant specific angular momentum
            //var Kepler_v_instant = op.Kepler_v * h0 / hPerSpeed;

            var intervalQ = ds_by_dt / ds_dq; //dfi
            q += intervalQ;
        }
        return {
            posBody,
            sagittaDeltaQ : q - rg.P.q,
        };
    }
})();
