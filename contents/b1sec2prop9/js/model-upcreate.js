( function() {
    var { $$, nsmethods, nssvg, mat,
        ssF, ssD, stdMod, sconf, rg, toreg, }
        = window.b$l.apptree({ stdModExportList : { model_upcreate, }, });
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        //console.log('model_upcreate');
        stdMod.builds_dq8sagit8displace({});
        const q2xy = stdMod.q2xy;
        var Porb = ssD.qIndexToOrbit[ rg.P.qix ];

        rg.P.pos[0] = Porb.rr[0];
        rg.P.pos[1] = Porb.rr[1];
        var rr0 = rg.P.pos;
        var rrc = rg.S.pos;
        var Qpos = q2xy( Porb.plusQ );
        var rr = Qpos;
        rg.Q.pos[0] = Qpos[0];
        rg.Q.pos[1] = Qpos[1];
        var side = [ Qpos[0] - rr0[0], Qpos[1] - rr0[1] ];

        // **api-input---plane-curve-derivatives
        var {
            RC,
            R,
            curvatureChordSecondPoint,
            projectionOfCenterOnTangent,
            uu,
            nn,
        } = Porb;
        var Rc = R; //curvature radius

        //================================================
        // //\\ arc, sagittae and related (both Solutions tabs)
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
        // //\\ curvature circle (Another solution tab)
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
            //tostroke thickable ... what is thickable
            'tostroke tp-' + nsmethods.camelName2cssName( curvatureCircleName )
        );
        rgCurvatureCircle.svgel.style.display =
            rgCurvatureCircle.undisplay ? 'none' : 'block';
        //================================================
        // \\// curvature circle
        //================================================

        //================================================
        // //\\ highlightable arc PQ (Solution tab)
        //================================================
        var cfun = stdMod.q2xy;
        let Qrev = JSON.parse(JSON.stringify(rg.Q)); // deep copies
        let Prev = JSON.parse(JSON.stringify(rg.P));   
        let qQ = stdMod.xyToQ(rg.Q.pos[0], rg.Q.pos[1]);
        let qP = stdMod.xyToQ(rg.P.pos[0], rg.P.pos[1]);
        Qrev.pos[0] = qQ; //adjusted values to ensure arc lines up with points
        Prev.pos[0] = qP;

        ssF.paintsCurve({
                //rgName    : will become 'arc-QP',
                fun         : cfun,
                pointA      : Qrev,
                pointB      : Prev,
                mmedia      : stdMod.mmedia,
        });
        //================================================
        // \\// highlightable arc PQ
        //================================================

        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------
        //stdMod.graphFW_lemma.graphArrayMask[1] =
        //       ssD.solvable && !ssD.doMaskSagitta;
               
        {
            let graphArg = {
                //drawDecimalY : true,
                //drawDecimalX : false,
                //printAxisXDigits : bonus,
                //printAxisYDigits : true,
            }
            stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
        }
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
    }
}) ();

