( function() {
    var {
        sn, $$, nsmethods, nssvg, mcurve, integral, mat, has,
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

        // **api-input---plane-curve-derivatives
        var diff = mcurve.planeCurveDerivatives({
            fun,
            q : stdMod.pos2t( rr0 ), //=angle
            rrc,
        });
        var {
            RC, R, curvatureChordSecondPoint, projectionOfCenterOnTangent,
            uu,
            rr,
            //staticSectorialSpeed_rrrOnUU,
        } = diff;
        //rr0[1] = rr[1]; //=g[ 'approximated-curve' ].t2xy( rr0[0] )[1];
        var Rc = R; //curvature radius

        //================================================
        // //\\ arc, sagittae and related
        //================================================
        //var sForSagitta_val = Math.max( sconf.REPELLING_DISTANCE,
        //    stdMod.pos2t( rg.Q.pos ) - stdMod.pos2t( rg.P.pos )
        //);
        var { rr, side, intervalT, intervalS } = deltaT_2_arc(
            rr0,                    //P
            rg.vt.val,              //v0
            rg.sForSagitta.val,     //t for arc
        );
        var sidePlus = side;
        rg.Q.pos[0] = rr[0];
        rg.Q.pos[1] = rr[1];
        rg.Q.intervalS = intervalS;
        var { rr, side, intervalS } = deltaT_2_arc(
            rr0,                    //P
            rg.vt.val,              //v0
            null,
            -intervalT,
        );
        var sideMinus = side;
        rg.rrminus.pos[0] = rr[0];
        rg.rrminus.pos[1] = rr[1];
        rg.Q.intervalSMinus = intervalS;
        /*
        ccc( 'new: dx+=' + (rg.Q.pos[0]-rg.P.pos[0]).toFixed(3) +
             ' dx-=' + (rrminus[0]-rg.P.pos[0]).toFixed(3) +
             ' dt=' + rg.sForSagitta.val.toFixed(3)
        );
        */

        var sagitta2 = [ sidePlus[0] + sideMinus[0], sidePlus[1] + sideMinus[1], ];
        var sagitta = [ sagitta2[0]*0.5+rr0[0], sagitta2[1]*0.5+rr0[1], ];
        rg.sagitta.pos[0] = sagitta[0];
        rg.sagitta.pos[1] = sagitta[1];

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
        rg.V.pos[0] = curvatureChordSecondPoint[0];
        rg.V.pos[1] = curvatureChordSecondPoint[1];
        rg.Y.pos[0] = projectionOfCenterOnTangent[0];
        rg.Y.pos[1] = projectionOfCenterOnTangent[1];

        var RCmedpos = ssF.mod2inn( RC, stdMod );
        var RRmedpos = sconf.mod2inn_scale * Rc;

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
            'tp-' + nsmethods.camelName2cssName( curvatureCircleName )
        );
        rgCurvatureCircle.svgel.style.display =
            rgCurvatureCircle.undisplay ? 'none' : 'block';
        //================================================
        // \\// curvature circle
        //================================================


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
        // //\\ corollary 2,3
        //------------------------------------------------
        var diff = mcurve.planeCurveDerivatives({
            fun,
            q : stdMod.pos2t( rr0 ),
            rrc : rg.Rcol2.pos,
        });
        var {
            curvatureChordSecondPoint,
        } = diff;
        rg.Tcol2.pos[0] = curvatureChordSecondPoint[0];
        rg.Tcol2.pos[1] = curvatureChordSecondPoint[1];

        //------------------------------------------------------------
        // //\\ builds SG
        //------------------------------------------------------------
        var Gcol2 = mat.linesCross(
            [ rg.Rcol2.pos[0]-rg.P.pos[0], rg.Rcol2.pos[1]-rg.P.pos[1] ],  //direction-1
            rg.S.pos,  //start-1
            uu, //direction-2'
            rg.P.pos  //start-2'
        );
        rg.Gcol2.pos[0] = Gcol2[0];
        rg.Gcol2.pos[1] = Gcol2[1];
        //------------------------------------------------------------
        // \\// builds SG
        // \\// corollary 2,3
        //------------------------------------------------


        //------------------------------------------------
        // //\\ L
        //------------------------------------------------
        var tL = stdMod.pos2t( rg.V.pos ) - rg.Q.intervalS;
        var L = fun( tL );
        rg.L.pos[0] = L[0];
        rg.L.pos[1] = L[1];
        //------------------------------------------------
        // \\// L
        //------------------------------------------------


        var wwK = mat.dropPerpendicular( rg.P.pos, rg.V.pos, rg.C.pos )
        rg.K.pos[0] = wwK[0];
        rg.K.pos[1] = wwK[1];


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

        if( amode.subessay !== 'corollary2' && amode.subessay !== 'corollary3' ){
            ssF.dropLine( 'A=2,V,C' );
        }
        //------------------------------------------------
        // \\// PZminus
        // \\// decorations
        //================================================
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

