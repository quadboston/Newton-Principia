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
    return;

















    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        const fun = rg[ 'approximated-curve' ].t2xy;
        var rr0 = rg.P.pos;
        var rrc = rg.S.pos;
        var parP = stdMod.pos2t( rr0 );

        // **api-input---plane-curve-derivatives
        var diff = mcurve.planeCurveDerivatives({
            fun,
            q : parP,
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
            //staticSectorialSpeed_rrrOnUU,
        } = diff;
        //rr0[1] = rr[1]; //=fun( rr0[0] )[1];
        var Rc = R; //curvature radius

        //================================================
        // //\\ arc, sagittae and related
        //================================================

        var { rr, side, intervalT, intervalS } = deltaT_2_arc(
            rr0,                    //P
            rg.vt.val,              //v0
            rg.sForSagitta.val,     //t for arc
        );
        var sidePlus = side;
        rg.Q.pos[0] = rr[0];
        rg.Q.pos[1] = rr[1];
        rg.Q.intervalS = intervalS;


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
        rg.C.pos[0] = RC[0];
        rg.C.pos[1] = RC[1];
        //rg.V.pos[0] = curvatureChordSecondPoint[0];
        //rg.V.pos[1] = curvatureChordSecondPoint[1];
        //rg.Y.pos[0] = projectionOfCenterOnTangent[0];
        //rg.Y.pos[1] = projectionOfCenterOnTangent[1];

        var RCmedpos = ssF.mod2inn( RC, stdMod );
        var RRmedpos = sconf.mod2inn_scale * Rc;

        /*
        //todo nearly bug: why create svg and set cls every time?
        var curvatureCircleName = 'curvatureCircle';
        var rgCurvatureCircle = toreg( curvatureCircleName )();
        rgCurvatureCircle.svgel = nssvg.u({
            svgel   : rgCurvatureCircle.svgel,
            parent  : stdMod.mmedia,
            type    : 'circle',
            stroke  : rg.C.pcolor,
            fill    : 'transparent',
            'stroke-width' : '1',
            cx : RCmedpos[0],
            cy : RCmedpos[1],
            r : RRmedpos,
        });
        $$.$( rgCurvatureCircle.svgel ).addClass(
            //tostroke thickable ... what is thickable
            'tostroke tp-' + nsmethods.camelName2cssName( curvatureCircleName )
        );
        rgCurvatureCircle.svgel.style.display =
            rgCurvatureCircle.undisplay ? 'none' : 'block';
        //================================================
        // \\// curvature circle
        //================================================
        */

        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------
        ///for initial launch only
        stdMod.buildsforceGraphArray();
        stdMod.graphFW.drawGraph_wrap();
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------



        //------------------------------------------------
        // //\\ PZminus
        //------------------------------------------------
        var wwZ = mat.dropLine(
            -0.6,
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

        //conjugate diameters
        nspaste( rg.G.pos, fun( parP + Math.PI ) );
        nspaste( rg.D.pos, fun( parP + Math.PI/2 ) );
        nspaste( rg.K.pos, fun( parP + 3/2*Math.PI ) );


        //vuFV
        //v = parallel-projection of Q to tangent
        var DK = [ rg.K.pos[0]-rg.D.pos[0], rg.K.pos[1]-rg.D.pos[1] ];
        var PG = [ rg.P.pos[0]-rg.G.pos[0], rg.P.pos[1]-rg.G.pos[1] ];
        var wwR = mat.linesCross(
            DK, rg.Q.pos, //direction, start
            PG, rg.O.pos, //direction, start
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
        rg.VV.pos[0] = wwu[0];
        rg.VV.pos[1] = wwu[1];

        //extra points
        nspaste( rg.F.pos, mat.dropPerpendicular( rg.P.pos, rg.D.pos, rg.K.pos ) );
        nspaste( rg.A.pos, fun( 0 ) );
        nspaste( rg.AA.pos, fun( Math.PI ) );
        nspaste( rg.B.pos, fun( Math.PI/2 ) );
        nspaste( rg.BB.pos, fun( Math.PI*3/2 ) );

        //=============================================================
        // //\\ tan. cir.
        //=============================================================
        var tangentDiameterPoint = mat.linesCross(
            nn,  //direction-1
            rg.P.pos,  //start-1
            [-rg.Q.pos[1] + rg.P.pos[1],
              rg.Q.pos[0] - rg.P.pos[0],
            ], //direction-2'
            rg.Q.pos  //start-2'
        )
        rg.tCircleCenter.pos[0] = (tangentDiameterPoint[0]+rg.P.pos[0])/2;
        rg.tCircleCenter.pos[1] = (tangentDiameterPoint[1]+rg.P.pos[1])/2;
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


        //=============================================================
        // //\\ for prop. 11
        //=============================================================
        if( fconf.sappId === 'b1sec3prop11' ) {
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
        //=============================================================
        // \\// for prop. 11
        //=============================================================

    }








    //builds two arcs, after and before instant position of moving body P
    function deltaT_2_arc(
        rr0,        //rg.P.pos[0],
        vt0,
        intervalS,   //rg.sForSagitta.val
        intervalT
    ){
        const INTEGRATION_STEPS = 500;
        const STEP_NGRAL = ( intervalS === null ? intervalT : intervalS )
                           / INTEGRATION_STEPS;
        const rrc = rg.S.pos;
        const fun = rg[ 'approximated-curve' ].t2xy;

        //: integration starting values
        var s = stdMod.pos2t( rr0 );
        var s0 = s;
        var {
                staticSectorialSpeed_rrrOnUU,
            } = mcurve.planeCurveDerivatives({
                fun,
                q : s,
                rrc,
            });
        var sectorialSpeed0 = staticSectorialSpeed_rrrOnUU

            //"fake" speed, no relation to actual speed,
            //real speed must change from point P to point P,
            //this speed only indicates negative direction of speed,
            //speed multiplied here for performance,
            * vt0; 

        var intervalT = 0;
        for( var ix = 0; ix <= INTEGRATION_STEPS; ix++ ) {
            //doing step from old values
                    //=vt=tangential speed
                    //* sectorialSpeed0
                    // / staticSectorialSpeed_rrrOnUU;
            //calculating new values
            var rr = fun( s );
            var {
                staticSectorialSpeed_rrrOnUU,
            } = mcurve.planeCurveDerivatives({
                fun,
                q : s,
                rrc,
            });
            var vt = sectorialSpeed0 / staticSectorialSpeed_rrrOnUU;
            if( intervalS === null ) {
                //timeStep*vt, vt = tangential speed
                s += STEP_NGRAL * vt;
                //ccc( s.toFixed(3), 'vt=' + vt.toFixed(3), 
                //     sectorialSpeed0.toFixed(3), staticSectorialSpeed_rrrOnUU.toFixed(3) );
            } else {
                s += STEP_NGRAL;
                intervalT += STEP_NGRAL / vt;
            }
        }
        var side = [ rr[0] - rr0[0], rr[1] - rr0[1] ];
        return {    rr,
                    side,
                    intervalS : intervalS === null ? s - s0 : intervalS,
                    intervalT,
        };
    }

}) ();

