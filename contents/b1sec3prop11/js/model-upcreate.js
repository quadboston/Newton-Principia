( function() {
    var { nspaste, mat, sconf, 
        ssD, stdMod, rg, }
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
        rg.P.pos[0] = Porb.planetXY[0];
        rg.P.pos[1] = Porb.planetXY[1];
        var rr0 = rg.P.pos;
        var sunXY = rg.S.pos;
        var Qpos = q2xy( Porb.plusQ );
        rg.Q.pos[0] = Qpos[0];
        rg.Q.pos[1] = Qpos[1];
        
        // **api-input---plane-curve-derivatives
        var {
            RC,
            R,
            uu,
            nn,
        } = Porb;

        // latus rectum
        let semiAxisLen = sconf.ellipseA;
        let e = sconf.eccentricity;
        let latus = semiAxisLen * (1 - e * e); // length
        rg.L.pos[0] = rg.S.pos[0];
        rg.L.pos[1] = latus;
        rg.LL.pos[0] = rg.S.pos[0];
        rg.LL.pos[1] = -latus;

        //================================================
        // //\\ arc, sagittae and related
        //================================================
        //R = parallel-projection of Q to tangent
        var wwR = mat.linesCross(
            uu, rr0, //direction, start
            [rr0[0]-sunXY[0], rr0[1]-sunXY[1]], rg.Q.pos, //direction, start
        );
        rg.R.pos[0] = wwR[0];
        rg.R.pos[1] = wwR[1];

        //T = perp. from Q to radius-vector
        var wwT = mat.dropPerpendicular( rg.Q.pos, sunXY, rr0 )
        rg.T.pos[0] = wwT[0];
        rg.T.pos[1] = wwT[1];

        var Z = mat.dropLine(
                0.7,
                rg.P.pos,
                null,
                null,
                uu,
        );
        rg.Zminus.pos[0] = Z[0];
        rg.Zminus.pos[1] = Z[1];
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


            //TEMP
            // //The bounds of the graph are mostly fixed as follows.  The
            // //exception being the y axis which switches between a fixed and
            // //variable y max.  This allows most of the arrangements to be
            // //compared under conditions where the axes are fixed, without the
            // //curves appearing really zoomed in.  When variable the curves are
            // //fully visible for arrangements where the y axis grows.

            // graphArg.xMin = 0;
            // //Ensure x max is fixed to the correct value
            // //TEMP
            // // graphArg.xMax = ssD.xMaxFixedGraphAxis;

            // graphArg.yMin = 0;
            // //TEMP
            // // const yMaxFixed = ssD.estimatedForceMaxInitial / ssD.MAF;
            // const yMaxFixed = 3.5;
            // const yMaxVariable = ssD.estimatedForceMaxCurrent / ssD.MAF;
            // // graphArg.yMax = Math.max(yMaxFixed, yMaxVariable);
            // //TEMP
            // const yMaxCap = 50;
            // graphArg.yMax = Math.min(Math.max(yMaxFixed, yMaxVariable), yMaxCap);



            // //TEMP
            // const ratio = ssD.estimatedForceMaxStoredTemp / ssD.xMaxFixedGraphAxis;
            // // const ratio = 5;//ssD.MEF / ssD.xMaxFixedGraphAxis;

            // graphArg.xMin = 0;
            // //Set the lowest possible xMax, to be the xMax when the page loads
            // //plus a gap on the top and right sides of the graph.
            // const xMaxLowest = ssD.xMaxFixedGraphAxis;// * 1.3;
            // const xMaxCurrentX = ssD.xMaxCurrentGraphAxis;
            // // const xMaxFromY = ssD.estimatedForceLargestMaxCurrent / ratio;
            // const xMaxFromY = ssD.estimatedForceMaxCurrent / ratio;
            // const xMaxFromYCap = ssD.MAF / ratio * 20;//* 10;//* 50;
            // // // graphArg.xMax = Math.max(xMaxLowest, xMaxCurrentX, xMaxFromY);
            // //TEMP Space on top and right sides
            // // graphArg.xMax = Math.min(Math.max(xMaxLowest, xMaxCurrentX,
            // //     xMaxFromY), xMaxFromYCap);



            // //TEMP No gap on right or top
            // graphArg.xMin = 0;

            // const ratio = ssD.estimatedForceMaxInitial / ssD.xMaxInitialGraphAxis;
            // const xMaxLowest = ssD.xMaxInitialGraphAxis;
            // const xMaxCurrentX = ssD.xMaxCurrentGraphAxis;
            // const xMaxFromY = ssD.estimatedForceMaxCurrent / ratio;
            // const xMaxFromYCap = ssD.MAF / ratio * 20;//* 10;//* 50;
            // graphArg.xMax = Math.min(Math.max(xMaxLowest, xMaxCurrentX,
            //     xMaxFromY), xMaxFromYCap);



            // //TEMP
            // graphArg.xMin = 0;

            // const ratio = ssD.actualForceMaxInitial / ssD.xMaxInitialGraphAxis;
            // const xMaxLowest = ssD.xMaxInitialGraphAxis;
            // const xMaxCurrentX = ssD.xMaxCurrentGraphAxis;
            // const xMaxFromY = ssD.estimatedForceMaxCurrent / ratio;
            // const xMaxFromYCap = ssD.MAF / ratio * 20;//* 10;//* 50;
            // graphArg.xMax = Math.min(Math.max(xMaxLowest, xMaxCurrentX,
            //     xMaxFromY), xMaxFromYCap);


            // //TEMP
            // graphArg.xMin = 0;

            // // const ratio = 10 / 1.9 * ssD.MAF;
            // const ratio = 10 / 1.9 / 4 * ssD.MAF;
            // const xMaxLowest = 1.2;
            // const xMaxCurrentX = ssD.xMaxCurrentGraphAxis;
            // const xMaxFromY = ssD.estimatedForceMaxCurrent / ratio;
            // const xMaxFromYCap = ssD.MAF / ratio * 20;//* 10;//* 50;
            // graphArg.xMax = Math.min(Math.max(xMaxLowest, xMaxCurrentX,
            //     xMaxFromY), xMaxFromYCap);


            //TEMP
            graphArg.xMin = 0;


            //TEMP
            //***************************************************************\\
            //*************Adjust the following graph parameters*************\\
            //***************************************************************\\
            const ratio = 4.3573;
            const yMaxHighest = 35;

            //Lowest possible xMax value (when the graph axes start to grow)
            const xMaxLowest = 1.4;
            //***************************************************************//
            //***************************************************************//
            //***************************************************************//

            const ratio2Temp = ratio * ssD.MAF;


            const xMaxCurrentX = ssD.xMaxCurrentGraphAxis;
            const xMaxFromY = ssD.estimatedForceMaxCurrent / ratio2Temp;
            const xMaxFromYCap = ssD.MAF / ratio2Temp * yMaxHighest;
            graphArg.xMax = Math.min(Math.max(xMaxLowest, xMaxCurrentX,
                xMaxFromY), xMaxFromYCap);

            // //TEMP Always show entire actual force curve
            // const xMaxFromYAF = ssD.actualForceMaxCurrent / ratio;
            // graphArg.xMax = Math.max(graphArg.xMax, xMaxCurrentX, xMaxFromYAF);



            graphArg.yMin = 0;
            graphArg.yMax = graphArg.xMax * ratio2Temp / ssD.MAF;


            //TEMP
            // graphArg.xMax = xMaxCurrentX;
            // graphArg.yMax = Math.min(ssD.estimatedForceMaxCurrent / ssD.MAF, yMaxHighest);


            //TEMP
            // graphArg.xMax = Math.max(xMaxLowest, xMaxCurrentX);
            // graphArg.yMax = Math.min(50, Math.max(
            //     ssD.estimatedForceMaxCurrent / ssD.MAF,
            //     ssD.estimatedForceMaxStoredTemp / ssD.MAF));



            // //TEMP
            // graphArg.xMax = Math.max(xMaxLowest, xMaxCurrentX);
            // // graphArg.xMax = Math.max(xMaxLowest, (xMaxCurrentX + xMaxFromY)/2);
            // // graphArg.xMax = Math.max(xMaxLowest, xMaxCurrentX*1.2);
            // graphArg.yMax = graphArg.xMax * ratio / ssD.MAF;

            //TEMP
            console.log("**********");
            const percentQPMax = (ssD.Dt/sconf.DT_SLIDER_MAX*100).toFixed(2);
            console.log(`sconf.Dt0 = ${ssD.Dt} (${percentQPMax}%)`);
            console.log("sconf.ellipseA =", sconf.ellipseA);

            const percentWidthMax = (xMaxCurrentX/graphArg.xMax*100).toFixed(2);
            console.log(`width = ${percentWidthMax}%`);


            stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
        }
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------

        //------------------------------------------------
        // //\\ PZ
        //------------------------------------------------
        var wwZ = mat.dropLine(
            -0.45,
            rg.P.pos,
            null,
            null,
            uu,
        );
        rg.Z.pos[0] = wwZ[0];
        rg.Z.pos[1] = wwZ[1];
        //------------------------------------------------
        // \\// PZ
        // \\// decorations
        //================================================

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

        //getting V
        var DCsq_PCsq = mat.unitVector( DK ).v2 / mat.unitVector( PG ).v2;
        var wwu = mat.pointPlusTVector(
            DCsq_PCsq, //t,
            rg.v.pos, //A,
            rg.G.pos, //B,
        );

        //extra points
        nspaste( rg.F.pos, mat.dropPerpendicular( rg.P.pos, rg.D.pos, rg.K.pos ) );
        nspaste( rg.A.pos, q2xy( 0 ) );
        nspaste( rg.B.pos, q2xy( Math.PI/2 ) );

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
        //point I
        nspaste( rg.I.pos, mat.linesCross(
            mat.sm( rg.K.pos, -1, rg.D.pos ), rg.H.pos, //direction, start
            mat.sm( rg.S.pos, -1, rg.P.pos ), rg.S.pos, //direction, start
        ));
    }
}) ();
