( function() {
    var { nspaste, mat, fconf, ssF, ssD, stdMod, sconf, rg, 
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
        rg.P.pos[0] = Porb.rr[0];
        rg.P.pos[1] = Porb.rr[1];
        var rr0 = rg.P.pos;
        var rrc = rg.S.pos;
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
                uu, rr0, //direction, start
                [rr0[0]-rrc[0], rr0[1]-rrc[1]], rg.Q.pos, //direction, start
            )
        );

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


        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------
        {
            let graphArg = {
            }
            // stdMod.graphFW_lemma.drawGraph_wrap(graphArg);


            //TEMP
            if (fconf.sappId === 'b1sec3prop12') {
                console.log("ssD.Dt =", ssD.Dt);
                //TEMP x
                graphArg.xMin = 0;
                //TEMP May be best to keep this here to ensure the x max is
                //always correct.
                graphArg.xMax = sconf.DISTANCE_ORBIT_ENDS_TO_S;


                switch (sconf.Y_AXIS_OPTION_SELECTED) {
                    case sconf.Y_AXIS_OPTIONS.VARIABLE:
                        break;

                    case sconf.Y_AXIS_OPTIONS.FIXED:
                        graphArg.yMax = sconf.MEFTemp / sconf.MAFTemp;
                        break;

                    case sconf.Y_AXIS_OPTIONS.COMBINATION:
                        const yMaxH = sconf.MEFTemp / sconf.MAFTemp;
                        const yMaxL = sconf.FORCE_Y_AXIS_FIXED_TO_VARIABLE / sconf.MAFTemp;//1.368;
                        
                        const MEF2CurrentTemp = stdMod.calculateMaxDisplacementTemp();
                        const estimatedForceMaxCurrent = MEF2CurrentTemp / sconf.MAFTemp;
                        graphArg.yMax = Math.max(Math.min(estimatedForceMaxCurrent, yMaxH), yMaxL);
                        break;
                }
                //TEMP y
                // graphArg.yMax = sconf.MEFTemp / sconf.MAFTemp;



                // graphArg.yMax = sconf.MEFTemp / sconf.MAFTemp / 2;

                
                // graphArg.yMax = sconf.MEFTemp / sconf.MAFTemp;



                //TEMP Should be for combination of fixed and variable
                // const yMaxH = sconf.MEFTemp / sconf.MAFTemp;
                // const yMaxL = 1.368;//1.65;//1.4;//1.0;//1.6485;//1.4;//1.0;
                
                // const MEF2CurrentTemp = stdMod.calculateMaxDisplacementTemp();
                // const estimatedForceMaxCurrent = MEF2CurrentTemp / sconf.MAFTemp;
                // // const estimatedForceMaxCurrent = MEF2CurrentTemp / ssD.MAF;
                // // graphArg.yMax = Math.min(estimatedForceMaxCurrent, yMaxH);
                // graphArg.yMax = Math.max(Math.min(estimatedForceMaxCurrent, yMaxH), yMaxL);




                // // const MAFManualTemp = 10.973936187350242;
                // // const MEFManualTemp = 32.24671975584604;
                // // graphArg.yMax = MEFManualTemp / MAFManualTemp;

                // // graphArg.yMax = MEFManualTemp / ssD.MAF;
                // // // graphArg.yMax = ssD.MEF / ssD.MAF;


            } else if (fconf.sappId === 'b1sec3prop13') {
                //Options...
                console.log(`ssD.MAF = ${ssD.MAF}  ssD.MEF = ${ssD.MEF}  ` +
                            `ssD.MEF / ssD.MAF = ${ssD.MEF / ssD.MAF}`);
                const MEF2CurrentTemp = stdMod.calculateMaxDisplacementTemp();
                const estimatedForceMaxCurrent = MEF2CurrentTemp / ssD.MAF;
                console.log(`MEF2CurrentTemp = ${MEF2CurrentTemp}`);
                console.log(`estimatedForceMaxCurrent = ${estimatedForceMaxCurrent}`);


                graphArg.yMax = ssD.MEF / ssD.MAF;
            }
            //TEMP//


            stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
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
    }

}) ();

