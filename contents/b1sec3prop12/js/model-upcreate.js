( function() {
    var { 
        nspaste, mat, fconf, ssF, ssD, stdMod, sconf, rg, 
    } = window.b$l.apptree({ stdModExportList : { model_upcreate, }, });
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        stdMod.builds_dq8sagit8displace({});
        const op        = sconf.orbitParameters;
        const cosAxis   = Math.cos( op.mainAxisAngle );
        const sinAxis   = Math.sin( op.mainAxisAngle );
        const q2xy = stdMod.q2xy;
        var Porb = ssD.qIndexToOrbit[ rg.P.qix ];
        var parQ = Porb.q;
        // const q         = rg.P.q; //TEMP Old
        //TEMP The following code to set the position for point P may get added
        rg.P.pos[0] = Porb.rr[0];
        rg.P.pos[1] = Porb.rr[1];
        //TEMP The following may get replaced with "var rr0 = rg.P.pos;"
        var rr0 = rg.P.pos;
        // const rr0       = fun( q );
        var rrc = rg.S.pos;
        //TEMP If the code to set P.pos is added above then the following can
        //be removed.
        // nspaste( rg.P.pos, rr0 );
        //TEMP It seems that P9/10/11 have the following as well.  It also
        //looks like P12/13 already have code that sets Q.pos below.
        var Qpos = q2xy( Porb.plusQ );
        rg.Q.pos[0] = Qpos[0];
        rg.Q.pos[1] = Qpos[1];
        //TEMP To check Q.pos
        console.log(`model_upcreate  rg.Q.pos = [${rg.Q.pos[0]}, ${rg.Q.pos[1]}]`);

        //TEMP This should be P12/13 (Etc.) specific (not P9/10/11).  Should it
        //be kept in this spot or moved lower down?  Does it need any changes?
        //"caustics".  Is seems in P11 there is some code for "latus rectum"
        //placed just before "arc, sagittae and related".  Might this be the
        //correct spot?  It looks like it was added after PR 66.
        //TEMP It probably makes sense to move this code to be consistent.
        const axisC     = op.conicSignum === -1 ? -op.C : op.C;
        rg.C.pos[0]     = cosAxis * axisC;
        rg.C.pos[1]     = sinAxis * axisC;
        rg.H.pos[0]     = 2*rg.C.pos[0];
        rg.H.pos[1]     = 2*rg.C.pos[1];

        // **api-input---plane-curve-derivatives
        //TEMP The following should probably be removed and replaced by "Porb"
        // var diff = mcurve.planeCurveDerivatives({
        //     fun,
        //     q,
        //     rrc,
        // });
        var {
            r,
            uu,
            ee,
            sinOmega,
        //TEMP ""diff should probably be switched to "Porb"
        } = Porb;
        // } = diff;
        //TEMP Is "var Rc = R; //curvature radius" needed here or only for
        //other models?  It seems to exist for P9/10 but not P11.  It seems
        //this existed for P11 in PR 66, however got removed at some point.

        //***TEMP Do these still need to be set for P?  If so is this the correct
        //spot, or is this already done in the new standardized code?
        rg.P.sinOmega = sinOmega;
        rg.P.uu = uu;
        rg.P.ee = ee;
        rg.P.abs = r;

        //================================================
        // //\\ arc, sagittae and related
        //================================================

        //TEMP Will the following code that checks "Q" still be needed once the
        //standardized code is used?  If so is this the correct spot for it?
        //Note is seems there was some somewhat similar code that referenced
        //"conicSignum" function "dQisInBranch" "completes-sliders-creation.js"
        ////delta q is set not from delta t
        // let sag_delta_q = op.sagittaDelta_q;
        // //TEMP "q" below will likely get switched to "parQ"
        // //-pi,+pi locating is irrelevant for move
        // let Q = q + sag_delta_q;
        // {
        //     //--------------------------------------------
        //     // //\\ validates sagitta q
        //     //      and sets it to op.sagittaDelta_q,
        //     //      does this job for any slider which
        //     //      affects q and Q
        //     //--------------------------------------------
        //     if( op.conicSignum === -1 ) {
        //         let abs_Q = Math.abs( Q );
        //         let abs_q = Math.abs( q );
        //         let sing = op.SINGULARITY_ANGLE;
        //         ////keeps hyperbola's saggita in the same branch as hyperbola branch
        //         if( ( abs_Q - sing ) * ( abs_q - sing ) <= 0 ){
        //             ////singularity is between q and abs_Q,
        //             ////changes Q making it in the same singularity sector,
        //             //creates new sag_delta_q unrelated to value of the former sag_delta_q
        //             var new_sag_delta_q = Math.abs( sing - abs_q )
        //                                 / 3; //factor 3 is an arbitraty > 1
        //             ////shifts q down if increment is negative
        //             new_sag_delta_q *= Math.sign( sag_delta_q );
        //             Q = q + new_sag_delta_q;
        //             op.sagittaDelta_q = new_sag_delta_q;
        //         }
        //     }
        //     //--------------------------------------------
        //     // \\// validates sagitta q
        //     //--------------------------------------------
        // }
        // //TEMP Should the code that sets Q.pos be moved to above to be more
        // //similar to P9/10/11?
        // nspaste( rg.Q.pos, fun(Q) );

        //TEMP The following seems similar to the code in P11, just shorter.
        //R = parallel-projection of Q to tangent
        nspaste( rg.R.pos,
            mat.linesCross(
                uu, rr0, //direction, start
                [rr0[0]-rrc[0], rr0[1]-rrc[1]], rg.Q.pos, //direction, start
            )
        );

        //TEMP The following seems similar to the code in P11, just shorter.
        //T = perp. from Q to radius-vector
        nspaste( rg.T.pos, mat.dropPerpendicular( rg.Q.pos, rrc, rr0 ) );

        //TEMP The following seems similar to the code in P11, just shorter.
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


        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------
        //TEMP The following should probably be switched to
        {
            let graphArg = {
            }
            stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
        }
        //TEMP/
        ///for initial launch only
        // stdMod.graphFW.drawGraph_wrap();
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------


        //------------------------------------------------
        // //\\ PZminus
        //------------------------------------------------
        //TEMP The following seems similar to the code in P9/11 just shorter,
        //and in addition the first number is different (-0.6 for P9 and P11).
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

        //TEMP It seems that the following is specific to P12/13
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

        //TEMP The following seems similar to the code in P10/11 just shorter.
        //I suppose the inputs are a bit different than those other models.
        //
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

        //TEMP It seems that the following is specific to P12/13
        nspaste( rg.A.pos, q2xy( Math.PI ) );
        nspaste( rg.AA.pos, q2xy( 0 ) );
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
        //TEMP The following seems to be the same as the code in P11
        //point x
        nspaste( rg.x.pos, mat.lineSegmentsCross(
            rg.T.pos, rg.P.pos,
            rg.Q.pos, rg.v.pos,
        ));
        //point E
        nspaste( rg.E.pos, mat.lineSegmentsCross(
            rg.D.pos, rg.K.pos,
            rg.S.pos, rg.P.pos,
        ));

        //TEMP The following seems similar to the code in P11
        nspaste( rg.I.pos, mat.linesCross(
            DK, rg.H.pos, //direction, start
            mat.sm( rg.S.pos, -1, rg.P.pos ), rg.S.pos, //direction, start
        ));
        //=============================================================
        // \\// for prop. 11,12
        //=============================================================


        //TEMP It seems that the following is specific to P12/13
        //=============================================================
        // //\\ latus
        //=============================================================
        rg.L.pos[0]  = -sinAxis * op.latus;
        rg.L.pos[1]  =  cosAxis * op.latus;
        rg.LL.pos[0] =  sinAxis * op.latus;
        rg.LL.pos[1] = -cosAxis * op.latus;
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

}) ();

