( function() {
    var { sn, $$, nsmethods, nspaste, nssvg, mcurve, integral, mat, has, fconf,
        ssF, sData, ssD, stdMod, amode, sconf, rg, toreg, }
            = window.b$l.apptree({ stdModExportList : { model_upcreate, }, });
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        stdMod.builds_force_plusQ_minusQ_and_related();
        const q2xy = stdMod.q2xy;
        var Porb = ssD.qIndexToOrbit[ rg.P.qix ];
        var parQ = Porb.q;
        rg.P.pos[0] = Porb.rr[0];
        rg.P.pos[1] = Porb.rr[1];
        var rr0 = rg.P.pos;
        var rrc = rg.S.pos;
        var Qpos = q2xy( Porb.plusQ );
        rg.Q.pos[0] = Qpos[0];
        rg.Q.pos[1] = Qpos[1];

        // **api-input---plane-curve-derivatives
        var {
            uu,
            nn,
        } = Porb;

        //================================================
        // //\\ arc, sagittae and related
        //================================================
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

        var Z = mat.dropLine(
            0.6,
            rg.P.pos,
            null,
            null,
            uu,
        );
        rg.Z.pos[0] = Z[0];
        rg.Z.pos[1] = Z[1];
        //================================================
        // \\// arc, sagittae and related
        //================================================


        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------

        {
            let graphArg = {
            }


            //TEMP Test constraining the bounds of the graph as follows
            graphArg.xMin = 0;
            // //TEMP If too small, when point A is moved to the right, the curves
            // //can easily leave the graph
            // graphArg.xMax = 1.6; //1.4;
            // console.log("ssD.xMaxCurrentForGraphTemp =",
            //     ssD.xMaxCurrentForGraphTemp);
            //TEMP Is 1.1 too low, would it be easier to compare arrangements if
            //this was larger?
            const xMaxLowest = 1.1;
            graphArg.xMax = Math.max(xMaxLowest, ssD.xMaxCurrentForGraphTemp);

            graphArg.yMin = 0;
            //TEMP A bit of space above the curves, when Q furthest from P
            graphArg.yMax = 1.5;//1.3;


            stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
        }
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------


        //conjugate diameters
        nspaste( rg.G.pos, q2xy( parQ + Math.PI ) );
        nspaste( rg.D.pos, q2xy( parQ + Math.PI/2 ) );
        nspaste( rg.K.pos, q2xy( parQ + 3/2*Math.PI ) );


        //vuFV
        //v = parallel-projection of Q to tangent
        var DK = [ rg.K.pos[0]-rg.D.pos[0], rg.K.pos[1]-rg.D.pos[1] ];
        var PG = [ rg.P.pos[0]-rg.G.pos[0], rg.P.pos[1]-rg.G.pos[1] ];
        var wwR = mat.linesCross(
            DK, rg.Q.pos, //direction, start
            PG, rg.C.pos, //direction, start
        );
        rg.v.pos[0] = wwR[0];
        rg.v.pos[1] = wwR[1];

        rg.u.pos[0] = 2*rg.T.pos[0] - rg.v.pos[0];
        rg.u.pos[1] = 2*rg.T.pos[1] - rg.v.pos[1];

        //getting V
        var DCsq_PCsq = mat.unitVector( DK ).v2 / mat.unitVector( PG ).v2;
        var wwu = mat.pointPlusTVector(
            DCsq_PCsq, //t,
            rg.v.pos, //A,
            rg.G.pos, //B,
            rg.u.pos, //start, //optional
        );
        rg.V.pos[0] = wwu[0];
        rg.V.pos[1] = wwu[1];

        //extra points
        nspaste( rg.F.pos, mat.dropPerpendicular( rg.P.pos, rg.D.pos, rg.K.pos ) );
        nspaste( rg.A.pos, q2xy( 0 ) );
        nspaste( rg.AA.pos, q2xy( Math.PI ) );
        nspaste( rg.B.pos, q2xy( Math.PI/2 ) );
        nspaste( rg.BB.pos, q2xy( Math.PI*3/2 ) );

        //=============================================================
        // //\\ tan. cir.
        //=============================================================
        //Calculate and set the parameters for the circle that touches the conic
        //section at P and passes through point Q.  Note if P and Q are used to
        //calculate the circle, when Q is at P it can't be calculated correctly.
        //Therefore use V instead of Q, as the circle also passes through V.

        //The distance from P to center, and V to center are both the radius.
        //Therefore triangle P, V, center will be isosceles, meaning triangle P,
        //midpoint of P and V, center will be a right angle triangle.  Therefore
        //the center will be at the intersection of the following two lines...
        //-Starting at P in the direction perpendicular to the tangent at P
        //-Starting at the midpoint of P and V in the direction perpendicular
        // to PV

        const P = rg.P.pos;
        const V = rg.V.pos;
        const midpointPV = [(P[0] + V[0]) / 2, (P[1] + V[1]) / 2];
        const negativeReciprocalPV = [-(V[1] - P[1]), V[0] - P[0]];

        const center = mat.linesCross(
            nn,  //direction-1 (perpendicular to tangent at P)
            rg.P.pos,  //start-1
            negativeReciprocalPV, //direction-2'
            midpointPV  //start-2'
        )

        //Set circle parameters
        rg.tCircleCenter.pos[0] = center[0];
        rg.tCircleCenter.pos[1] = center[1];
        var rgTCir = rg.tangentCircle;
        rgTCir.tangentCircleRadiusVector = [
            rg.P.pos[0] - rg.tCircleCenter.pos[0],
            rg.P.pos[1] - rg.tCircleCenter.pos[1],
        ];
        rgTCir.tangentCircleRadius =
            mat.unitVector( rgTCir.tangentCircleRadiusVector ).abs;
        //=============================================================
        // \\// tan. cir.
        //=============================================================
    }
}) ();

