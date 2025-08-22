( function() {
    var { sn, nspaste, mcurve, mat, fconf, ssF, amode, sconf, rg, }
        = window.b$l.apptree({ stdModExportList : { model_upcreate, }, });
    var sop = sn( 'sampleOrbitParameters', sconf );
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        const op        = sconf.orbitParameters;
        const cosAxis   = Math.cos( op.mainAxisAngle );
        const sinAxis   = Math.sin( op.mainAxisAngle );
        const fun       = rg[ 'approximated-curve' ].t2xy;
        const q         = rg.P.q;
        const rr0       = fun( q );
        const rrc       = rg.S.pos;
        nspaste( rg.P.pos, rr0 );

        //"caustics"
        const axisC     = op.conicSignum === -1 ? -op.C : op.C;
        rg.C.pos[0]     = cosAxis * axisC;
        rg.C.pos[1]     = sinAxis * axisC;
        rg.H.pos[0]     = 2*rg.C.pos[0];
        rg.H.pos[1]     = 2*rg.C.pos[1];

        // **api-input---plane-curve-derivatives
        var diff = mcurve.planeCurveDerivatives({
            fun,
            q,
            rrc,
        });
        var {
            R,
            r,
            curvatureChordSecondPoint,
            projectionOfCenterOnTangent,
            uu,
            ee,
            nn,
            rr,
            sinOmega,
            cosOmega,
            //staticSectorialSpeed_rrrOnUU,
        } = diff;
        var Rc = R; //curvature radius
        rg.P.sinOmega = sinOmega;
        rg.P.uu = uu;
        rg.P.ee = ee;
        rg.P.abs = r;

        //================================================
        // //\\ arc, sagittae and related
        //================================================
        ////delta q is derived from delta t
        var {
            rr, //for pos for Q
            sagittaDeltaQ,
        } = deltaT_2_arc();
        nspaste( rg.Q.pos, rr );
        op.sagittaDelta_q = sagittaDeltaQ;
        rg[ 'P,vb' ].caption = 'v = ' + op.Kepler_v.toFixed(3);
        rg.SY.caption = fconf.sappId === "b1sec3prop16" ?
            'SY = ' + (rg.P.sinOmega * rg.P.abs ).toFixed(3) :
            '';

        //R = parallel-projection of Q to tangent
        nspaste( rg.R.pos,
            mat.linesCross(
                uu, rr0, //direction, start
                [rr0[0]-rrc[0], rr0[1]-rrc[1]], rg.Q.pos, //direction, start
            )
        );
        {
            //dropLine(... = start + direction * t
            let udir = op.cosOmega * cosOmega + op.om * sinOmega;
            nspaste( rg.vb.pos, mat.dropLine( 1, null, null, rg.P.pos, uu, udir * op.Kepler_v ) );
        }
        //T = perp. from Q to radius-vector
        nspaste( rg.T.pos, mat.dropPerpendicular( rg.Q.pos, rrc, rr0 ) );

        nspaste( rg.Z.pos,
            mat.linesCross(
                uu,
                rg.P.pos,
                [ rg.Q.pos[0]-rg.T.pos[0], rg.Q.pos[1]-rg.T.pos[1], ],
                rg.T.pos,
            )
        );
        //================================================
        // \\// arc, sagittae and related
        //================================================

        nspaste( rg.Y.pos, projectionOfCenterOnTangent );

        //extra points

        nspaste( rg.A.pos, fun( Math.PI ) );
        nspaste( rg.AA.pos, fun( 0 ) );
        {
            let posBx = op.conicSignum === -1 ? -op.C : op.C;
            let posB = [posBx, op.B,];
            let ww = mat.rotatesVect( posB, op.mainAxisAngle, );
            nspaste( rg.B.pos, ww );
            posB = [posBx, -op.B,];
            ww = mat.rotatesVect( posB, op.mainAxisAngle, );
            nspaste( rg.BB.pos, ww );
        }
        
        nspaste( rg.Zminus.pos,
            mat.dropLine(
                -1.3,
                rg.P.pos,
                null,
                null,
                uu,
            )
        );

        //=============================================================
        // //\\ latus
        //=============================================================
        rg.L.pos[0]  = -sinAxis * op.latus;
        rg.L.pos[1]  =  cosAxis * op.latus;
        rg.LL.pos[0] =  sinAxis * op.latus;
        rg.LL.pos[1] = -cosAxis * op.latus;
        rg[ 'L,LL' ].value = (2*op.latus).toFixed(3);
        rg[ 'L,LL' ].caption = 'L=' + rg[ 'L,LL' ].value;
        //=============================================================
        // \\// latus
        //=============================================================

        //=============================================================
        // //\\ instant triangle
        //=============================================================
        {
            let pkey = 'instanttriangle';
            rg[ pkey ].vertices = [ rg.S.pos, rg.P.pos, rg.Q.pos ];
            ssF.paintTriangle(
                pkey,                       //triangleId,
                'tofill',                   //cssCls,
            );
        }
        //=============================================================
        // \\// instant triangle
        //=============================================================
    }

    ///calculates arc's delta q depending on Dt by
    ///integrating sag_delta_q and reaching Dt,
    function deltaT_2_arc()
    {
        const INTEGRATION_STEPS = 1000;

        op          = sconf.orbitParameters;
        const rrc   = rg.S.pos;
        const fun   = rg[ 'approximated-curve' ].t2xy;
        var q       = rg.P.q;
        var {
                staticSectorialSpeed_rrrOnUU,
                r,
                v,
                uu,
                sinOmega,
                cosOmega,
            } = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
            });
            var udir = op.cosOmega * cosOmega + op.om * sinOmega;
        var intervalT = 0;
        var deltaT_isReached = false;
        //path step
        const ds_by_dt = udir * op.Dt / INTEGRATION_STEPS * op.Kepler_v;
        for( var it = 0; it <= INTEGRATION_STEPS; it++ ) {
            var {
                v, //=ds_by_dfi
                rr,
            } = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
            });
            //assumes central force, i.e. constant sectorial speed
            //var Kepler_v_instant = op.Kepler_v * sectorialSpeed0 / staticSectorialSpeed_rrrOnUU;

            var intervalQ = ds_by_dt / v; //dfi
            q += intervalQ;
        }
        return {
            rr,
            sagittaDeltaQ : q - rg.P.q,
        };
    }


}) ();

