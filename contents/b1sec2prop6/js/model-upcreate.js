( function() {
    var {
        sn, $$, nsmethods, nssvg, mcurve, integral, mat, bezier, has,
        ssF, ssD, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
        },
    });
    //ssD.stashedVisibility = null;
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

        
        if( ssD.PdragInitiated || ssD.SdragInitiated || ssD.PivotDragInitiated ) {

            var { rplus, rminus, sidePlus, sideMinus, qplus, qminus, Qparams, dt2dq, dt } =
                  deltaQ_2_arc( sectSpeed0 );
            rg.Q.q = qplus;
            rg.Q.q_minus = qminus;
            rg.Q.Qparams = Qparams;
            rg.Q.dt2dq = dt2dq;
            rg.tForSagitta.val =dt;
            
        } else {
            //================================================
            // //\\ arc, sagittae and related
            //================================================
            var rrplus = null
            var rrminus = null;
            var { rr, side, Qq, Qparams, dt2dq } = deltaT_2_arc(
                rg.tForSagitta.val,     //t for arc
                sectSpeed0,
            );
            if( Qq < bezier.end_q ) {
                var rrplus = rr;
                var sidePlus = side;
                rg.Q.q = Qq;
                rg.Q.Qparams = Qparams;
                rg.Q.dt2dq = dt2dq;
            }
            var { rr, side, Qq, Qparams } = deltaT_2_arc(
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
                if( has( rg.Q, 'former_q' ) ) {
                    ////rolls back, rolls only Q and P which may be changed in sliding,
                    rg.tForSagitta.val = rg.tForSagitta.former_val;
                    rg.P.q = rg.former_Pq;
                    rg.P.pos[0] = rg.formerP[0];
                    rg.P.pos[1] = rg.formerP[1];
                    rg.Q.Qparams = rg.Q.frormerQparams;
                    rg.Q.q = rg.Q.former_q;
                    rg.Q.q_minus = rg.Q.former_q_minus;
                    var sideMinus = rg.former_sideMinus;
                    var sidePlus = rg.former_sidePlus;
                }
            }
            let chord = rg.chord = [ sidePlus[0] - sideMinus[0], sidePlus[1] - sideMinus[1], ];
            rg.chord2 = chord[0]*chord[0]+chord[1]*chord[1];
        }
        ///continues completing model peacefully
        //let Qpos = bezier.fun( rg.Q.q );
        rg.Q.pos[0] = rg.Q.Qparams.rr[0];
        rg.Q.pos[1] = rg.Q.Qparams.rr[1];
        rg.Q.caption = 'Q, Δt=' + rg.tForSagitta.val.toFixed(3);
        let Qminus = bezier.fun( rg.Q.q_minus );
        rg.rrminus.pos[0] = Qminus[0];
        rg.rrminus.pos[1] = Qminus[1];
        
        //-----------------------------------------
        // //\\ stashes rollback data
        //      for case user-sliders go crazy
        //-----------------------------------------
        //rg.Q.formerPos = [ rg.Q.pos[0], rg.Q.pos[1] ];
        rg.tForSagitta.former_val = rg.tForSagitta.val;
        rg.formerP = [ rg.P.pos[0], rg.P.pos[1] ];
        rg.former_Pq = rg.P.q;
        rg.Q.frormerQparams = rg.Q.Qparams; 
        rg.Q.former_q = rg.Q.q;
        rg.Q.former_q_minus = rg.Q.q_minus;
        //todm: rid:
        rg.Q.former_q = rg.Q.q;
        rg.rrminus.former_q_minus = rg.Q.q_minus;
        rg.former_sideMinus = sideMinus;
        rg.former_sidePlus = sidePlus;
        //-----------------------------------------
        // \\// stashes rollback data
        //-----------------------------------------
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
        //if( has( stdMod, 'graphArray' ) ) {
        stdMod.graphFW.drawGraph_wrap();
        //}
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


        //================================================
        // //\\ hides/shows split points
        //================================================
        {
            let pp = sconf.originalPoints.foldPoints;
            let foldps = ssD.foldPoints;
            let flen = foldps.length;
            let pastlen = ssD.pastFoldPoints;
            //c cc( 'folds='+flen + ' pains='+pp.length + ' past='+pastlen );
            if( has( ssD, 'pastFoldPoints' ) ) {
                //todm for( let i=foldps.length; i<flen; i++ ) {
                for( let i=0; i<pastlen; i++ ) {
                    pp[i].rgX.undisplay = true;  
                }
            }
            ////otherwise, cannot display all separation points;
            ////therfore, displays nothing,
            if( foldps.length <= pp.length ) {
                 for( let i=0; i<flen; i++ ){
                     if( i=== 199 )
                         ccc('haaa' );
                    let fp = foldps[i];
                    let rgX = pp[i].rgX;
                    rgX.pos = fp;
                    rgX.undisplay = false;
                };
                ssD.pastFoldPoints = flen;
            } 
        }
        {
            ///single fold point decorations
            let nsp = rg.nonSolvablePoint;
            let nsl = rg[ 'S,nonSolvablePoint' ];
            if( ssD.foldPoints.length ) {
                nsp.pos[0] = ssD.foldPoints[0][0];
                nsp.pos[1] = ssD.foldPoints[0][1];
                nsp.undisplay = false;
                //nsl.undisplay = false;
            } else {
                nsp.undisplay = true;
                nsl.undisplay = true;
            }
        }
        //================================================
        // \\// hides/shows split points
        //================================================

        //================================================
        // //\\ hides/shows non-existing elements
        //      for non-Kepler curve
        //================================================
        if( ssD.solvable ) {
            if( ssD.stashedVisibility ) {
                ////restores visibility which has been stashed
                ////when curve became non-Kepler
                let sv = ssD.stashedVisibility;
                Object.keys(ssD.stashedVisibility).forEach( okey => {
                    let val = sv[ okey ];
                    switch(okey) {
                        case 'Q.hideD8Dpoint' : rg.Q.hideD8Dpoint = val;
                        break;
                        case 'Q.d8d_find_is_LOCKED' : rg.Q.d8d_find_is_LOCKED = val;
                        break;
                        default : rg[ okey ].undisplay = val;
                    }
                });
                ssD.stashedVisibility = null;
            }
        } else if( !ssD.stashedVisibility ) {
            ////visibility has been not yet stashed;
            ////therefore, doing stashing now,
            ssD.stashedVisibility = {
                'Q,rrminus'             : rg[ 'Q,rrminus' ].undisplay,
                'P,rrminus'             : rg[ 'P,rrminus' ].undisplay,
                'P,sagitta'             : rg[ 'P,sagitta' ].undisplay,
                'Q'                     : rg.Q.undisplay,
                'APQ'                   : rg.APQ.undisplay,
                'Q.hideD8Dpoint'        : rg.Q.hideD8Dpoint,
                'Q.d8d_find_is_LOCKED'  : rg.Q.d8d_find_is_LOCKED,
                'R'                     : rg.R.undisplay,
                'QR'                    : rg.QR.undisplay,
                'QP'                    : rg.QP.undisplay,
                'SQ'                    : rg.SQ.undisplay,
                'T'                     : rg.T.undisplay,
                'QT'                    : rg.QT.undisplay,
                'rrminus'               : rg.rrminus.undisplay,
                'timearc'               : rg.timearc.undisplay,
                'sagitta'               : rg.sagitta.undisplay,
                'curvatureCircle'       : rg.curvatureCircle.undisplay,
            };
            Object.keys(ssD.stashedVisibility).forEach( okey => {
                switch(okey) {
                    case 'Q.hideD8Dpoint' : rg.Q.hideD8Dpoint = true;
                    break;
                    case 'Q.d8d_find_is_LOCKED' : rg.Q.d8d_find_is_LOCKED = true;
                    break;
                    default : rg[ okey ].undisplay = true;
                }
            });
        }
        //================================================
        // \\// hides/shows non-existing elements
        //      for non-Kepler curve
        //================================================
    }








    //builds two arcs, after and before instant position of moving body P
    function deltaQ_2_arc(
        sectSpeed0,
    ){
        const chord2 = rg.chord2;
        //c cc( 'ini chord2='+chord2.toFixed(3) + ' dt='+rg.tForSagitta.val.toFixed(3) );
        const INTEGRATION_STEPS = 1200;
        const STEP_T = rg.tForSagitta.val / INTEGRATION_STEPS;
        const rrc = rg.S.pos;
        const fun = bezier.fun;
        var q = rg.P.q;

        //: integration starting values
        var Qparams = mcurve.planeCurveDerivatives({
            fun : bezier.fun,
            q,
            rrc,
        });
        var {
            v,
            rr,
            staticSectorialSpeed_rrrOnUU,
        } = Qparams;

        let rr0 = rr;
        let chordT2 = 0;
        let vplus = v;
        let vminus = v;
        let rplus = rr0;
        let rminus = rr0;
        let secSpeedPlus = staticSectorialSpeed_rrrOnUU;
        let secSpeedMinus = staticSectorialSpeed_rrrOnUU;
        let qplus = q;
        let qminus = q;
        let dummmyCounter = 0;
        let dt = 0;
        do {
            //doing step from old values
            //v=ds/dt
            var Qparams = mcurve.planeCurveDerivatives({
                fun,
                q : qplus,
                rrc,
            });
            var {
                rr,
                v,
                staticSectorialSpeed_rrrOnUU,
            } = Qparams;
            vplus = v;
            rplus = rr;
            secSpeedPlus = staticSectorialSpeed_rrrOnUU;
            var dt2dq_plus = sectSpeed0 / ( vplus * secSpeedPlus );
            var qstep = dt2dq_plus * STEP_T;
            var qplus2 = qplus + qstep;
            
            var QparamsMinus = mcurve.planeCurveDerivatives({
                fun,
                q : qminus,
                rrc,
            });
            var {
                rr,
                v,
                staticSectorialSpeed_rrrOnUU,
            } = QparamsMinus;
            vminus = v;
            rminus = rr;
            secSpeedMinus = staticSectorialSpeed_rrrOnUU;
            var dt2dqMinus = sectSpeed0 / ( vminus * secSpeedMinus );
            var qstep = -dt2dqMinus * STEP_T;
            var qminus2 = qminus + qstep;

            chordTV = [rplus[0]-rminus[0], rplus[1]-rminus[1]];
            chordT2 = chordTV[0]*chordTV[0] + chordTV[1]*chordTV[1];
            
            if( chordT2 < chord2 && qplus2 <= 1 && qminus2 >= 0 ) {
                qplus = qplus2;
                qminus = qminus2;
                dt += STEP_T; 
            } else {
                //dt += STEP_T/2; //kitchen algo
                break;
            }
            dummmyCounter++;
        } while( dummmyCounter < INTEGRATION_STEPS*10 );
        var sidePlus = [ rplus[0] - rr0[0], rplus[1] - rr0[1] ];
        var sideMinus = [ rminus[0] - rr0[0], rminus[1] - rr0[1] ];
        return { rr:rplus, rplus, rminus, sidePlus, sideMinus,
                 qplus, qminus, Qparams, dt2dq:dt2dq_plus, dt:Math.max( 0.001, dt ),
               };
    }


    
    
    //builds two arcs, after and before instant position of moving body P
    function deltaT_2_arc(
        intervalT,   //rg.tForSagitta.val
        sectSpeed0,
    ){
        const INTEGRATION_STEPS = 200;
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
            //v //v=ds/dt
            var dt2dq = sectSpeed0 / v / staticSectorialSpeed_rrrOnUU;
            var qstep = dt2dq * STEP_T;
            q += qstep;
            var Qparams = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
            });
            var {
                rr,
                v,
                staticSectorialSpeed_rrrOnUU,
            } = Qparams;
        }
        var side = [ rr[0] - rr0[0], rr[1] - rr0[1] ];
        return { rr, side, Qq:q, Qparams, dt2dq };
    }
    
    
}) ();

