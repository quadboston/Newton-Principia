(function(){
    const { sn, $$, nspaste, mcurve, mat, haff, has, fconf,
            ssF, stdMod, sconf, rg,
    } = window.b$l.apptree({ stdModExportList : {
            model_upcreate,
        },
    });
    return;


    function model_upcreate()
    {
        const op        = sconf.orbitParameters;
        const cosAxis   = Math.cos( op.mainAxisAngle );
        const sinAxis   = Math.sin( op.mainAxisAngle );
        const fun       = rg.approxer.t2xy;
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
        if( fconf.effId === "prop_from_14_to_17" ) {
            ////delta q is derived from delta t
            var {
                rr, //for pos for Q
                sagittaDeltaQ,
            } = deltaT_2_arc();
            nspaste( rg.Q.pos, rr );
            op.sagittaDelta_q = sagittaDeltaQ;
            //rg.R.caption = fconf.sappId === "b1sec3prop15" ?
            //    'R' : 'Δt = ' + op.Kepler_v.toFixed(3);
            rg[ 'P,vb' ].caption = fconf.sappId === "b1sec3prop15" ||
                fconf.effId !== 'prop_from_14_to_17' ?
                '' :  'v = ' + op.Kepler_v.toFixed(3);
            rg.SY.caption = fconf.sappId === "b1sec3prop16" ?
                'SY = ' + (rg.P.sinOmega * rg.P.abs ).toFixed(3) :
                '';
        } else {
            ////delta q is set not from delta t
            let sag_delta_q = op.sagittaDelta_q;
            //-pi,+pi locating is irrelevant for move
            let Q = q + sag_delta_q;
            {
                //--------------------------------------------
                // //\\ validates sagitta q
                //      and sets it to op.sagittaDelta_q,
                //      does this job for any slider which
                //      affects q and Q
                //--------------------------------------------
                if( op.conicSignum === -1 ) {
                    let abs_Q = Math.abs( Q );
                    let abs_q = Math.abs( q );
                    let sing = op.SINGULARITY_ANGLE;
                    ////keeps hyperbola's saggita in the same branch as hyperbola branch
                    if( ( abs_Q - sing ) * ( abs_q - sing ) <= 0 ){
                        ////singularity is between q and abs_Q,
                        ////changes Q making it in the same singularity sector,
                        //creates new sag_delta_q unrelated to value
                        //of the former sag_delta_q
                        var new_sag_delta_q = Math.abs( sing - abs_q )
                                          / 3; //factor 3 is an arbitraty > 1
                        ////shifts q down if increment is negative
                        new_sag_delta_q *= Math.sign( sag_delta_q );
                        Q = q + new_sag_delta_q;
                        op.sagittaDelta_q = new_sag_delta_q;
                    }
                }
                //--------------------------------------------
                // \\// validates sagitta q
                //--------------------------------------------
            }
            nspaste( rg.Q.pos, fun(Q) );
        }

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
            nspaste( rg.vb.pos, mat.dropLine( 1, null, null,
                     rg.P.pos, uu, udir * op.Kepler_v ) );
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

        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------
        if( fconf.effId !== "prop_from_14_to_17" ) {
            stdMod.makesGraphArray_8_drawsPlots();
        }
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------

        //------------------------------------------------
        // //\\ PZminus
        //------------------------------------------------
        nspaste( rg.Zminus.pos,
            mat.dropLine(
                -1.3,
                rg.P.pos,
                null,
                null,
                uu,
            )
        );
        //------------------------------------------------
        // \\// PZminus
        // \\// decorations
        //================================================

        //conjugate diameters and tangents
        if( "b1sec3prop13" === fconf.sappId ) {
            nspaste( rg.G.pos, mat.dropLine(
                null, rg.P.pos, rg.C.pos, null, null, 0.4 * op.latus ) );
            nspaste( rg.M.pos, mat.linesCross(
                    uu,
                    rg.P.pos,
                    [ 1, 0 ],
                    rg.O.pos,
                )
            );
            nspaste( rg.N.pos, mat.dropPerpendicular( rg.O.pos, rg.M.pos, rg.P.pos ) );
        } else {
            nspaste( rg.G.pos, mat.dropLine( -1, rg.C.pos, rg.P.pos, ) );
        }

        ////hyperbola or ellipse
        let D = mat.sm( rg.C.pos, -1, uu );
        nspaste( rg.D.pos, D );
        let K = mat.sm( rg.C.pos,  1, uu );
        nspaste( rg.K.pos, K );
        //is this a numerical glitch in the Book?:
        //nspaste( rg.K.pos, mat.dropLine(  2.13, rg.C.pos, rg.P.pos, null, uu) );

        //vuFV
        //v = parallel-projection of Q to tangent
        var DK = [ rg.K.pos[0]-rg.D.pos[0], rg.K.pos[1]-rg.D.pos[1] ];

        var PG = [ rg.P.pos[0]-rg.G.pos[0], rg.P.pos[1]-rg.G.pos[1] ];

        nspaste( rg.v.pos,
            mat.linesCross(
                uu, rg.Q.pos, //direction, start
                PG, rg.P.pos, //direction, start
            )
        );

        //extra points
        nspaste( rg.F.pos, mat.dropPerpendicular( rg.P.pos, rg.D.pos, rg.K.pos ) );

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

        //=============================================================
        // //\\ for prop. 11,12
        //=============================================================
        //point x
        nspaste( rg.x.pos, mat.lineSegmentsCross(
            rg.T.pos, rg.P.pos,
            rg.Q.pos, rg.v.pos,
        ));
        //point E
        nspaste( rg.E.pos, mat.lineSegmentsCross(
            rg.D.pos, rg.K.pos,
            rg.O.pos, rg.P.pos,
        ));
        nspaste( rg.I.pos, mat.linesCross(
            DK, rg.H.pos, //direction, start
            mat.sm( rg.O.pos, -1, rg.P.pos ), rg.O.pos, //direction, start
        ));
        //=============================================================
        // \\// for prop. 11,12
        //=============================================================

        //=============================================================
        // //\\ latus
        //=============================================================
        rg.L.pos[0]  = -sinAxis * op.latus;
        rg.L.pos[1]  =  cosAxis * op.latus;
        rg.LL.pos[0] =  sinAxis * op.latus;
        rg.LL.pos[1] = -cosAxis * op.latus;
        rg[ 'L,LL' ].caption = 'L=' + (2*op.latus).toFixed(3);
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

        //=============================================================
        // //\\ prop. 17
        //=============================================================
        haff( stdMod, 'model_upcreate_addon' );
        //=============================================================
        // \\// prop. 17
        //=============================================================
    }

    ///calculates arc's delta q depending on Dt by
    ///integrating sag_delta_q and reaching Dt,
    function deltaT_2_arc()
    {
        const INTEGRATION_STEPS = 1000;

        op          = sconf.orbitParameters;
        const rrc   = rg.S.pos;
        const fun   = rg.approxer.t2xy;
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
        const ds_by_dt  = udir * op.Dt / INTEGRATION_STEPS * op.Kepler_v;
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
            //var Kepler_v_instant = op.Kepler_v *
            //sectorialSpeed0 / staticSectorialSpeed_rrrOnUU;

            var intervalQ = ds_by_dt / v; //dfi
            q += intervalQ;
        }
        return {
            rr,
            sagittaDeltaQ : q - rg.P.q,
        };
    }
})();