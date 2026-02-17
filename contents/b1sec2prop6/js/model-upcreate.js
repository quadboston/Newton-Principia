( function() {
    var { $$, nsmethods, nssvg, mat, has,
        ssF, ssD, stdMod, sconf, rg, toreg, } 
        = window.b$l.apptree({ stdModExportList : { model_upcreate, }, });
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        const sectSpeed0 = ssD.sectSpeed0;
        const solvable = ssD.solvable;
        //qIndexToOrbit is meta data for all points on orbit, qix is index of P
        const Porb = ssD.qIndexToOrbit[ rg.P.qix ];
        if (Porb) {
            var {
                RC, R, curvatureChordSecondPoint, projectionOfCenterOnTangent,
                uu,
                rr, //rg.P.pos
            } = Porb;
            rg.P.q = Porb.q;
            rg.P.pos = rr;
            const Rc = R; //curvature radius

            if( solvable ){
                // --- helpers ---
                function dist(a, b) {
                    return Math.hypot(a[0] - b[0], a[1] - b[1]);
                }
                function lineIntersection(A, B, C, D) {
                    const x1 = A[0], y1 = A[1];
                    const x2 = B[0], y2 = B[1];
                    const x3 = C[0], y3 = C[1];
                    const x4 = D[0], y4 = D[1];

                    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
                    if (den === 0) return null; // parallel or coincident

                    const px = ((x1*y2 - y1*x2) * (x3 - x4) - (x1 - x2) * (x3*y4 - y3*x4)) / den;
                    const py = ((x1*y2 - y1*x2) * (y3 - y4) - (y1 - y2) * (x3*y4 - y3*x4)) / den;

                    return [px, py];
                }

                function adjustQprime() {
                    let best = null;
                    let bestDiff = Infinity;
                    const Q = Porb.rrplus;
					const sagittaOnSP_Tolerance = 0.0005;

                    for (let i = rg.P.qix; i > 0; i--) {
                        const Qp = ssD.qIndexToOrbit[i]?.rr;
                        if (!Qp) continue;

                        // intersection I(Q') of SP and QQ'
                        const I = lineIntersection(rg.S.pos, rg.P.pos, Q, Qp);
                        if (!I) {
                            console.log(I);
                            continue; 
                        }

                        // midpoint M(Q, Q')
                        const M = [
                            (Q[0] + Qp[0]) / 2,
                            (Q[1] + Qp[1]) / 2
                        ];

                        const d = dist(M, I);
                        if (d < bestDiff) {
                            bestDiff = d;
                            best = Qp;
                            if(bestDiff < sagittaOnSP_Tolerance) {
                                // break out of for loop once we found a 
                                // point that's close enough
                                break;
                            } 
                        }
                    }

                    //console.log(bestDiff.toFixed(3));
                    if(bestDiff > sagittaOnSP_Tolerance) {
                        Porb.rrminus[0] = rg.rrminus.pos[0];
                        Porb.rrminus[1] = rg.rrminus.pos[1];             
                    } else {             
                        Porb.rrminus[0] = rg.rrminus.pos[0] = best[0];
                        Porb.rrminus[1] = rg.rrminus.pos[1] = best[1];               
                    }
					rg.infoMessage.undisplay = 
						bestDiff <= 2 * sagittaOnSP_Tolerance;
                }

                adjustQprime(); // finds Q' that brings M closest to I

                const rrplus = Porb.rrplus; // Q
                const rrminus = rg.rrminus.pos = Porb.rrminus; // Q'
                rg.Q.q = Porb.plusQ;
                rg.Q.q_minus = Porb.minusQ;
                rg.Q.pos[0] = rrplus[0];
                rg.Q.pos[1] = rrplus[1];

                rg.QtimeDecor.caption = ''; // todo: remove? seems unused
                rg.QtimeDecor.pos = Porb.rrplus;
                const chord = rg.chord = [ rrplus[0] - rrminus[0], rrplus[1] - rrminus[1], ];
                rg.chord2 = chord[0]*chord[0]+chord[1]*chord[1];
                
                let Mx = (rrplus[0] + Porb.rrminus[0]) / 2;
                let My = (rrplus[1] + Porb.rrminus[1]) / 2;
                rg.sagitta.pos = [Mx, My]; //ensures we're showing the true M

                ///R and T only used in corollaries                
                //R = parallel-projection of Q to tangent
                var RR = mat.linesCross(
                    uu, rg.P.pos, //direction, start
                    [rg.P.pos[0]-rg.S.pos[0], rg.P.pos[1]-rg.S.pos[1]], rg.Q.pos, //direction, start
                );
                rg.R.pos[0] = RR[0];
                rg.R.pos[1] = RR[1];
                //T = perp. from Q to radius-vector
                const TT = mat.dropPerpendicular( rg.Q.pos, rg.S.pos, rg.P.pos )
                rg.T.pos[0] = TT[0];
                rg.T.pos[1] = TT[1];
            } else {
                console.log('unsolvable');
            }

            //================================================
            // //\\ curvature circle
            //================================================
            rg.C.pos[0] = RC[0];
            rg.C.pos[1] = RC[1];
            rg.V.pos[0] = curvatureChordSecondPoint[0];
            rg.V.pos[1] = curvatureChordSecondPoint[1];
            rg.Y.pos[0] = projectionOfCenterOnTangent[0];
            rg.Y.pos[1] = projectionOfCenterOnTangent[1];
            {
                const RCmedpos = ssF.mod2inn( RC, );
                const RRmedpos = sconf.mod2inn_scale * Rc;
                //todo nearly bug: why create svg and set cls every time?
                const CCName = 'curvatureCircle';
                var rgCC = toreg( CCName )();
                rgCC.svgel = nssvg.u({
                    svgel   : rgCC.svgel,
                    parent  : stdMod.mmedia,
                    type    : 'circle',
                    stroke  : rg.C.pcolor,
                    fill    : 'transparent',
                    'stroke-width' : '1',
                    cx : RCmedpos[0],
                    cy : RCmedpos[1],
                    r : RRmedpos,
                });
                $$.$( rgCC.svgel ).addClass(
                    'tp-' + nsmethods.toCssIdentifier( CCName ) +
                    ' tostroke'
                );
                rgCC.svgel.style.display =
                    rgCC.undisplay ? 'none' : 'block';
            }
            //================================================
            // \\// curvature circle
            //================================================
        }


        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------
        //core code displays: force, mask[1] and sagitta, mask[3]
        {
            const mask = stdMod.graphFW_lemma.graphArrayMask;
            mask[1] = false; //displ.
            mask[2] = false;
            //sagitta in proof, but not in ...
            mask[3] = solvable && sconf.TIME_IS_FREE_VARIABLE;
        }

        {
            let graphArg = {
                //drawDecimalY : true,
                //drawDecimalX : false,
                printAxisXDigits : false,
                //printAxisYDigits : true,
            }

            let ga = stdMod.graphFW_lemma.graphArray;
            let len = ga.length;
            let sumAbs = 0;
            var yMax = 0;
            //let leny = ga[0].y.length;
            for( ix = 0; ix<len; ix++ ) {
                let gaix = ga[ix];
                //if( !solvable ){
                //    for( let iy=0; iy<leny; iy++ ){
                //        gaix.y[iy] = ix/len;
                //    }
                //}
                let yy = Math.abs( gaix.y[0] );
                sumAbs += yy;
                yMax = Math.max( yMax, yy );
            }
            let averageY = sumAbs/len;

            graphArg.yMax = Math.max( yMax, averageY*1.5 );
            graphArg.yMin = 0;

            stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
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
            let len = ssD.foldPoints.length;
            if( len ) {
                ////displays last fold point
                nsp.pos[0] = ssD.foldPoints[len-1][0];
                nsp.pos[1] = ssD.foldPoints[len-1][1];
                rg.infoMessage.undisplay = true; // hide if was showing
                rg.errorMessage.caption = ssD.nonSolvablePointCaption;
                rg.errorMessage.undisplay = false;
                nsp.undisplay = false;
                nsl.undisplay = false;
            } else {
                nsp.undisplay = true;
                nsl.undisplay = true;
                rg.errorMessage.undisplay = true;
            }
        }
        //================================================
        // \\// hides/shows split points
        //================================================

        //================================================
        // //\\ hides/shows non-existing elements
        //      for non-Kepler curve
        //================================================
        if( solvable ) {
            if( ssD.stashedVisibility ) {
                ////restores visibility which has been stashed
                ////when curve became non-Kepler
                let sv = ssD.stashedVisibility;
                Object.keys(ssD.stashedVisibility).forEach( okey => {
                    let val = sv[ okey ];
                    switch(okey) {
                        case 'Q.hideD8Dpoint' : rg.Q.hideD8Dpoint = val;
                        break;
                        default : rg[ okey ].undisplay = val;
                    }
                });
                ssD.stashedVisibility = null;
            }
        } else if( !ssD.stashedVisibility ) {
            ////===========================================
            ////this block hides shapes when orbit splits
            ////===========================================
            ////visibility has been not yet stashed;
            ////therefore, doing stashing now,
            ssD.stashedVisibility = {
                'Q,rrminus'             : rg[ 'Q,rrminus' ].undisplay,
                'P,sagitta'             : rg[ 'P,sagitta' ].undisplay,
                'Q'                     : rg.Q.undisplay,
                'QtimeDecor'            : rg.QtimeDecor.undisplay,
                'APQ'                   : rg.APQ.undisplay,
                'Q.hideD8Dpoint'        : rg.Q.hideD8Dpoint,
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
            ///heres is an actual code which hides shapes
            Object.keys(ssD.stashedVisibility).forEach( okey => {
                switch(okey) {
                    case 'Q.hideD8Dpoint' : rg.Q.hideD8Dpoint = true;
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
}) ();
