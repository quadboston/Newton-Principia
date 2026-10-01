( function() {
    var { nspaste, mat, fconf, ssD, stdMod, sconf, rg, 
    } = window.b$l.apptree({ stdModExportList : { model_upcreate, }, });
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        stdMod.builds_force_plusQ_minusQ_and_related();
        const op        = sconf.orbitParameters;
        const cosAxis   = Math.cos( op.mainAxisAngle );
        const sinAxis   = Math.sin( op.mainAxisAngle );
        const q2xy = stdMod.q2xy;
        var Porb = ssD.qIndexToOrbit[ rg.P.qix ];
        rg.P.pos[0] = Porb.planetXY[0];
        rg.P.pos[1] = Porb.planetXY[1];
        var Qpos = q2xy( Porb.plusQ );
        rg.Q.pos[0] = Qpos[0];
        rg.Q.pos[1] = Qpos[1];

        var {
            uu,
        } = Porb;

        //"caustics"
        const axisC     = op.conicSignum === -1 ? -op.C : op.C;
        rg.C.pos[0]     = cosAxis * axisC;
        rg.C.pos[1]     = sinAxis * axisC;
        rg.H.pos[0]     = 2*rg.C.pos[0];
        rg.H.pos[1]     = 2*rg.C.pos[1];

        //================================================
        // //\\ arc, sagittae and related
        //================================================
        //R = parallel-projection of Q to tangent
        nspaste( rg.R.pos,
            mat.linesCross(
                uu, rg.P.pos, //direction, start
                [rg.P.pos[0]-rg.S.pos[0], rg.P.pos[1]-rg.S.pos[1]], rg.Q.pos, //direction, start
            )
        );

        //T = perp. from Q to radius-vector
        nspaste( rg.T.pos, mat.dropPerpendicular( rg.Q.pos, rg.S.pos, rg.P.pos ) );

		nspaste( rg.Z.pos,
            mat.dropLine(
                1.3,
                rg.P.pos,
                null,
                null,
                uu,
            )
        );
        //================================================
        // \\// arc, sagittae and related
        //================================================

        // Zminus
        nspaste( rg.Zminus.pos,
            mat.dropLine(
                -1.3,
                rg.P.pos,
                null,
                null,
                uu,
            )
        );
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

        ////hyperbola or ellipse
		const sqAC = mat.squaredDistance( rg.A, rg.C );
		const sqBC = mat.squaredDistance( rg.B, rg.C );
		const sqDiameterConstant = sqAC - sqBC;
		const SqDC = mat.squaredDistance( rg.P, rg.C ) - sqDiameterConstant;
		const DC = Math.sqrt(Math.abs(SqDC ));
        let D = mat.sm( rg.C.pos, -DC, uu );
        nspaste( rg.D.pos, D );    
        let K = mat.sm( rg.C.pos,  DC, uu );
        nspaste( rg.K.pos, K );    
        //is this a numerical glitch in the Book?:
        //nspaste( rg.K.pos, mat.dropLine(  2.13, rg.C.pos, rg.P.pos, null, uu) );
        
        //conjugate diameters and tangents
		stdMod.customizePoints(rg, op, uu);

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
            DK, rg.H.pos, //direction, start
            mat.sm( rg.S.pos, -1, rg.P.pos ), rg.S.pos, //direction, start
        ));
        // latus rectum
        rg.L.pos[0]  = -sinAxis * op.latus;
        rg.L.pos[1]  =  cosAxis * op.latus;
        rg.LL.pos[0] =  sinAxis * op.latus;
        rg.LL.pos[1] = -cosAxis * op.latus;


		// graph
		if (stdMod.graphFW_lemma) {
            let graphArg = {
            }


            if (fconf.sappId === 'b1sec3prop12') {
                //The bounds of the graph are fixed as follows.  This allows
                //different arrangements of curves to easily be compared to one
                //another (eg. different eccentricities).  Note when the axes
                //are variable, the curves are distorted when compared, which is
                //misleading for this model.

                graphArg.xMin = 0;
                //Ensure x max is fixed to the correct value
                graphArg.xMax = sconf.DISTANCE_ORBIT_ENDS_TO_S;

                graphArg.yMin = 0;
                //Largest possible y value for all curves, for all arrangements
                graphArg.yMax = ssD.MEF / ssD.MAF;


            } else if (fconf.sappId === 'b1sec3prop13') {
                //The bounds of the graph are mostly fixed as follows.  The
                //exception being the y max which is variable, which allows the
                //student to see how big it grows.

                //Ensure x min and max are fixed to the correct values
                graphArg.xMin = ssD.xMinFixedGraphAxis;
                graphArg.xMax = sconf.DISTANCE_ORBIT_ENDS_TO_S;

                graphArg.yMin = 0;
                //yMax varies between MAF and MEF.  It's automatically set to
                //the current maximum y value for all curves.  When Q is at P it
                //equals MAF, and when Q is furthest from P it equals MEF.
            }


            stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
		}
    }
}) ();
