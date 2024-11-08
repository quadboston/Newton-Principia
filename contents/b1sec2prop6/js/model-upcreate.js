( function() {
    var {
        sn, $$, nsmethods, nssvg, mcurve, integral, mat, bezier, has,
        ssF, sData,
        stdMod, sconf, rg, toreg,
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
        var fun = bezier.fun;
        if( sconf.APPROX !== 'D' ) {
            bezier.pivotsPos.map( (pos,cpix) => {
                let cp = rg[ 'curvePivots-' + cpix ];
                let posNew = fun( cp.q );
                cp.pos[0] = posNew[0];
                cp.pos[1] = posNew[1];
            });
        }
        var { staticSectorialSpeed_rrrOnUU, } = mcurve.planeCurveDerivatives({
            fun,
            q : bezier.start_q,
            rrc,
        });
        var sectSpeed0 = staticSectorialSpeed_rrrOnUU;
        rg.P.pos = fun( rg.P.q );
        var rr0 = rg.P.pos;
        var rrc = rg.S.pos;
        // **api-input---plane-curve-derivatives
        var curveP = sData.curveP = mcurve.planeCurveDerivatives({
            fun,
            q : rg.P.q,
            rrc,
        });;
        var {
            RC, R, curvatureChordSecondPoint, projectionOfCenterOnTangent,
            uu,
            rr,
        } = curveP;
        var Rc = R; //curvature radius

        //================================================
        // //\\ arc, sagittae and related
        //================================================
        var rrplus = null
        var rrminus = null;
        var { rr, side, Qq } = deltaT_2_arc(
            rg.tForSagitta.val,     //t for arc
            sectSpeed0,
        );
        if( Qq < bezier.end_q ) {
            var rrplus = rr;
            var sidePlus = side;
            rg.Q.q = Qq;
        }
        var { rr, side, Qq } = deltaT_2_arc(
            -rg.tForSagitta.val,    //t for arc
            sectSpeed0,
        );
        if( Qq > bezier.start_q ) {
            var rrminus = rr;
            var sideMinus = side;
            rg.Q.q_minus = Qq;
        }
        ////validator and corrector
        ///creative user may move Q beyond curve x-limits, don't let trouble to happen
        if( !rrminus || !rrplus ) {
            if( has( rg.Q, 'formerPos' ) ) {
                ////rolls back, rolls only Q and P which may be changed in sliding,
                rg.tForSagitta.val = rg.tForSagitta.former_val;
                rg.Q.pos[0] = rg.Q.formerPos[0];
                rg.Q.pos[1] = rg.Q.formerPos[1];
                rg.P.q = rg.former_Pq;
                rg.P.pos[0] = rg.formerP[0];
                rg.P.pos[1] = rg.formerP[1];
                rg.Q.q = rg.Q.former_q;
            }
            return;
        }

        ///continues completing model peacefully
        let Qpos = bezier.fun( rg.Q.q );
        rg.Q.pos[0] = 
        rg.Q.pos[0] = rrplus[0];
        rg.Q.pos[1] = rrplus[1];

        //:stashes rollback data for case user-sliders go crazy
        rg.Q.formerPos = [ rg.Q.pos[0], rg.Q.pos[1] ];
        rg.tForSagitta.former_val = rg.tForSagitta.val;
        rg.formerP = [ rg.P.pos[0], rg.P.pos[1] ];
        rg.former_Pq = rg.P.q;
        rg.Q.former_q = rg.Q.q;
        rg.Q.former_q_minus = rg.Q.q_minus;
        //todm: rid:
        rg.rrminus.pos[0] = rrminus[0];
        rg.rrminus.pos[1] = rrminus[1];
        /*
        ccc( 'new: dx+=' + (rg.Q.pos[0]-rg.P.pos[0]).toFixed(3) +
             ' dx-=' + (rrminus[0]-rg.P.pos[0]).toFixed(3) +
             ' dt=' + rg.tForSagitta.val.toFixed(3)
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
        if( !has( stdMod, 'graphArray' ) ) {
            stdMod.curveIsSolvable();
        }
        if( has( stdMod, 'graphArray' ) ) {
            stdMod.graphFW.drawGraph_wrap();
        }
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------

        //------------------------------------------------
        // //\\ PZ
        //------------------------------------------------
        var wwZ = mat.dropLine(
            -0.6,     //q
            rg.P.pos, //A
            rg.Y.pos, //B
        );
        rg.Z.pos[0] = wwZ[0];
        rg.Z.pos[1] = wwZ[1];
        //------------------------------------------------
        // \\// PZ
        // \\// decorations
        //================================================
    }








    //builds two arcs, after and before instant position of moving body P
    function deltaT_2_arc(
        intervalT,   //rg.tForSagitta.val
        sectSpeed0,
    ){
        const INTEGRATION_STEPS = 20; //10 works as well
        const STEP_T = intervalT / INTEGRATION_STEPS;
        const rrc = rg.S.pos;
        const fun = bezier.fun;
        var q = rg.P.q;
        rr0 = fun(q);

        //: integration starting values
        var {
                v,
                staticSectorialSpeed_rrrOnUU,
            } = mcurve.planeCurveDerivatives({
                fun : bezier.fun,
                q,
                rrc,
            });
            //"fake" speed, no relation to actual speed,
            //real speed must change from point P to point P,
            //this speed only indicates negative direction of speed,
            //speed multiplied here for performance,
            //* vt0; 

        for( var ix = 0; ix <= INTEGRATION_STEPS; ix++ ) {
            //doing step from old values
            var qstep = STEP_T
                    / v //v=ds/dt
                    * sectSpeed0
                    / staticSectorialSpeed_rrrOnUU;
            q += qstep;
            var {
                rr,
                v,
                staticSectorialSpeed_rrrOnUU,
                //todm this is a redundant step, graphArray is already
                //built and can be used
            } = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
            });
        }
        var side = [ rr[0] - rr0[0], rr[1] - rr0[1] ];
        return { rr, side, Qq:q };
    }

}) ();

