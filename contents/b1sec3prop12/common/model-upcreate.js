( function() {
    var {
        sn, $$, nsmethods, nspaste, nssvg, mcurve, integral, mat, has,
        fconf, ssF, sData,
        stdMod, amode, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
        },
    });
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
            RC,
            R,
            curvatureChordSecondPoint,
            projectionOfCenterOnTangent,
            uu,
            nn,
            rr,
            sinOmega,
            //staticSectorialSpeed_rrrOnUU,
        } = diff;
        var Rc = R; //curvature radius
        rg.P.sinOmega = sinOmega;
        rg.P.uu = uu;

        //================================================
        // //\\ arc, sagittae and related
        //================================================
        if( fconf.effId === "b1sec3prop14" ) {
            var {
                rr, //for pos for Q
                sagittaDeltaQ,
            } = deltaT_2_arc();
            rg.Q.pos[0] = rr[0];
            rg.Q.pos[1] = rr[1];
            var sagittaDelta_q = op.sagittaDelta_q = sagittaDeltaQ;
            //rg.R.caption = fconf.sappId === "b1sec3prop15" ?
            //    'R' : 'Δt = ' + op.Kepler_v.toFixed(3);
            rg.PR.caption = fconf.sappId === "b1sec3prop15" || fconf.effId !== 'b1sec3prop14' ?
                '' :  'v = ' + op.Kepler_v.toFixed(3);
            rg.SY.caption = fconf.sappId === "b1sec3prop16" ?
                'SY = ' + (rg.P.sinOmega * rg.P.abs ).toFixed(3) :
                '';
        } else {
            var sagittaDelta_q = op.sagittaDelta_q;
            {
                //--------------------------------------------
                // //\\ validates sagitta q
                //--------------------------------------------
                if( op.conicSignum === -1 ) {

                    //-pi,+pi locating is irrelevant for move
                    let move = Math.abs( sagittaDelta_q + q );

                    let absParP = Math.abs( q );
                    ////keeps hyperbola's saggita in the same branch as hyperbola branch
                    let sing = op.SINGULARITY_ANGLE;
                    if( ( move - sing ) * ( absParP - sing ) <= 0 ){
                        sagittaDelta_q = Math.abs( sing - absParP )
                                     / 3; //this factor is random
                        if( ( q < 0 && absParP < sing ) || ( absParP > sing && q > 0 ) ){
                            sagittaDelta_q = -sagittaDelta_q;
                        }
                    }
                }
                //--------------------------------------------
                // \\// validates sagitta q
                //--------------------------------------------
            }
            nspaste( rg.Q.pos, fun( q + sagittaDelta_q ) );
        }

        //R = parallel-projection of Q to tangent
        var wwR = mat.linesCross(
            uu, rr0, //direction, start
            [rr0[0]-rrc[0], rr0[1]-rrc[1]], rg.Q.pos, //direction, start
        );
        rg.R.pos[0] = wwR[0];
        rg.R.pos[1] = wwR[1];

        //T = perp. from Q to radius-vector
        var wwT = mat.dropPerpendicular( rg.Q.pos, rrc, rr0 )
        rg.T.pos[0] = wwT[0];
        rg.T.pos[1] = wwT[1];

        var Z = mat.linesCross(
            uu,
            rg.P.pos,
            [ rg.Q.pos[0]-rg.T.pos[0], rg.Q.pos[1]-rg.T.pos[1], ],
            rg.T.pos,
        );
        rg.Z.pos[0] = Z[0];
        rg.Z.pos[1] = Z[1];
        //================================================
        // \\// arc, sagittae and related
        //================================================






        //================================================
        // //\\ curvature circle
        //================================================
        var RCmedpos = ssF.mod2inn( RC, stdMod );
        var RRmedpos = sconf.mod2inn_scale * Rc;
        rg.Y.pos[0] = projectionOfCenterOnTangent[0];
        rg.Y.pos[1] = projectionOfCenterOnTangent[1];
        //================================================
        // \\// curvature circle
        //================================================

        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------
        ///for initial launch only
        if( fconf.effId !== "b1sec3prop14" ) {
            stdMod.buildsforceGraphArray();
            stdMod.graphFW.drawGraph_wrap();
        }
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------



        //------------------------------------------------
        // //\\ PZminus
        //------------------------------------------------
        var wwZ = mat.dropLine(
            -1.3,
            rg.P.pos,
            null,
            null,
            uu,
        );
        rg.Zminus.pos[0] = wwZ[0];
        rg.Zminus.pos[1] = wwZ[1];
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
        var wwR = mat.linesCross(
            uu, rg.Q.pos, //direction, start
            PG, rg.P.pos, //direction, start
        );
        rg.v.pos[0] = wwR[0];
        rg.v.pos[1] = wwR[1];

        //extra points
        nspaste( rg.F.pos, mat.dropPerpendicular( rg.P.pos, rg.D.pos, rg.K.pos ) );

        //==========================================================================
        // was: now fixed: remove this comment:
        //      possibly outdated: get rid,
        //----------------------------------------------------------------
        // this needs (?only for B?)
        // a bit of work for case when fi between A,AA and horizontal axis
        // changes: need to rotate semiaxes:
        // in mean time, this rotation is disabled for prop. 15:
        //nspaste( rg.B.pos, [rg.C.pos[0], op.B, ] );
        //nspaste( rg.BB.pos, [rg.C.pos[0], -op.B, ] );
        //==========================================================================

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
        if( "b1sec3prop17" === fconf.sappId ) {
            //solved orbit hyperbola or ellipse
            if( amode.subessay === 'corollary1' || amode.subessay === 'corollary2'  ) {
                nspaste( rg.D.pos, rg.P.pos );
            } else {
                nspaste( rg.D.pos, fun( 0 ) );
            }
            nspaste( rg.K.pos, mat.dropPerpendicular( rg.O.pos, rg.H.pos, rg.P.pos ) );
            {
                ////sample orbit
                let fun = rg[ 'approximated-curve-sample' ].t2xy;
                //orbit
                let rrc = rg.S.pos;
                var {
                    rr,
                    uu,
                    ee,
                } = mcurve.planeCurveDerivatives({
                    fun,
                    q   : rg.p.q,
                    rrc,
                });
                nspaste( rg.p.pos, rr );
                //sample speed vector
                nspaste( rg.vSample.pos, mat.sm( sop.Kepler_v, uu, 1, rg.p.pos ) );
                //sample's decorational dt arc
                var {
                    rr,
                } = mcurve.planeCurveDerivatives({
                    fun,
                    q : rg.p.q + sop.sagittaDelta_q_initial,
                    rrc,
                });
                nspaste( rg.q.pos, rr );
                rg.p.abs = mat.unitVector( rg.p.pos ).abs;
            }
            const cosAxis   = Math.cos( sop.mainAxisAngle );
            const sinAxis   = Math.sin( sop.mainAxisAngle );

            //----------------------------------
            // //\\ force, gamma, and latus
            //----------------------------------
            rg.l.pos[0]  = -sinAxis * sop.latus;
            rg.l.pos[1]  =  cosAxis * sop.latus;
            rg.ll.pos[0] =  sinAxis * sop.latus;
            rg.ll.pos[1] = -cosAxis * sop.latus;
            rg[ 'l,ll' ].caption = 'l=' + (2*sop.latus).toFixed(3);
            {
                ////force and gamma
                let relativeGamma = op.Kepler_g / sop.Kepler_gInitial;
                var newLen = relativeGamma * sop.forceHandleInitial;
                nspaste( rg.f.pos,
                         mat.sm( rg.p.pos, -1*newLen, ee )
                );
                rg[ 'p,f' ].caption = 'f = ' + relativeGamma.toFixed(2);
            }
            //----------------------------------
            // \\// force, gamma, and latus
            //----------------------------------
            rg[ 'p,vSample' ].caption = 'v = ' + op.Kepler_v.toFixed(3);
        }
        //=============================================================
        // \\// prop. 17
        //=============================================================
    }



    ///calculates arc's delta q depending on delta_t by
    ///integrating delta_q and reaching delta_t,
    function deltaT_2_arc()
    {
        const INTEGRATION_STEPS = 1000;

        op          = sconf.orbitParameters;
        const STEP  = op.delta_t / INTEGRATION_STEPS;
        const rrc   = rg.S.pos;
        const fun   = rg[ 'approximated-curve' ].t2xy;
        var q       = rg.P.q;
        var {
                staticSectorialSpeed_rrrOnUU,
                v,
                uu,
            } = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
            });
        var sectorialSpeed0 = staticSectorialSpeed_rrrOnUU; 
        var intervalT = 0;
        var deltaT_isReached = false;
        for( var it = 0; it <= INTEGRATION_STEPS; it++ ) {
            var {
                staticSectorialSpeed_rrrOnUU,
                v,
                rr,
            } = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
            });
            //assumes central force, i.e. constant sectorial speed
            var Kepler_v_instant = op.Kepler_v * sectorialSpeed0 / staticSectorialSpeed_rrrOnUU;
            var intervalQ = STEP * Kepler_v_instant / v;
            q += intervalQ;
        }
        return {
            rr,
            sagittaDeltaQ : q - rg.P.q,
        };
    }


}) ();

