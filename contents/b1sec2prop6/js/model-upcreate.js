( function() {
    var { $$, nsmethods, nssvg, mat, has,
        ssF, ssD, stdMod, sconf, rg, toreg, }
        = window.b$l.apptree({ stdModExportList : {
            model_upcreate,
            restoresStashedVisibility,
        }, });
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        const solvable = ssD.solvable;
        //qIndexToOrbit is meta data for all points on orbit, qix is index of P
        const Porb = ssD.qIndexToOrbit[ rg.P.qix ];
        if (Porb) {
            var {
                RC, R, curvatureChordSecondPoint, projectionOfCenterOnTangent,
                uTangential,
                posBody, //rg.P.pos
            } = Porb;
            rg.P.q = Porb.q;
            rg.P.pos = posBody;
            const Rc = R; //curvature radius

            if( solvable ){
                // finds q of the point Q' on the orbit before P such that
                // the midpoint of QQ' lies on line SP, or null if there is
                // no such point; Q' is P when Q is P
                function findsQprime_q(Q) {
                    const S = rg.S.pos;
                    const SP = [ P[0] - S[0], P[1] - S[1] ];

                    // signed distance of the midpoint of QQ' from line SP,
                    // times |SP|
                    function midpointOffSP(Qp) {
                        const Mx = (Q[0] + Qp[0]) / 2 - S[0];
                        const My = (Q[1] + Qp[1]) / 2 - S[1];
                        return SP[0] * My - SP[1] * Mx;
                    }

                    let qHigh = Porb.q;
                    let offHigh = midpointOffSP(P);
                    // Q's q comes from interpolated time, so Q at P can
                    // land a rounding error before P
                    if (offHigh === 0 || Porb.plusQ <= qHigh) return qHigh;

                    // walks the orbit back from P to the first sign change,
                    // then bisects between those two orbit points
                    for (let i = rg.P.qix - 1; i >= 0; i--) {
                        const bP = ssD.qIndexToOrbit[i];
                        let qLow = bP.q;
                        let offLow = midpointOffSP(bP.posBody);
                        if (offLow === 0) return qLow;
                        if ((offLow < 0) !== (offHigh < 0)) {
                            for (let k = 0; k < 30; k++) {
                                const qMid = (qLow + qHigh) / 2;
                                const offMid = midpointOffSP(stdMod.q2xy(qMid));
                                if ((offMid < 0) === (offLow < 0)) {
                                    qLow = qMid;
                                    offLow = offMid;
                                } else {
                                    qHigh = qMid;
                                }
                            }
                            return (qLow + qHigh) / 2;
                        }
                        qHigh = qLow;
                        offHigh = offLow;
                    }
                    return null;
                }

                const P = rg.P.pos;
                const rrplus = Porb.rrplus; // Q
                const qPrime = findsQprime_q(rrplus);
                // without a solution, Q' stays where it was
                if (qPrime !== null) {
                    rg.rrminus.q = qPrime;
                    rg.rrminus.pos = stdMod.q2xy(qPrime);
                }
                rg.infoMessage.undisplay = qPrime !== null;
                const rrminus = rg.rrminus.pos; // Q'
                rg.Q.q = Porb.plusQ;
                rg.Q.q_minus = rg.rrminus.q ?? Porb.minusQ;
                rg.Q.pos[0] = rrplus[0];
                rg.Q.pos[1] = rrplus[1];

                const chord = rg.chord = [ rrplus[0] - rrminus[0], rrplus[1] - rrminus[1], ];
                rg.chord2 = chord[0]*chord[0]+chord[1]*chord[1];

                let Mx = (rrplus[0] + rrminus[0]) / 2;
                let My = (rrplus[1] + rrminus[1]) / 2;
                rg.sagitta.pos = [Mx, My]; //ensures we're showing the true M

                ///R and T only used in corollaries
                //R = parallel-projection of Q to tangent
                var RR = mat.linesCross(
                    uTangential, rg.P.pos, //direction, start
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

        {
            let graphArg = {
                //drawDecimalY : true,
                //drawDecimalX : false,
                printAxisXDigits : false,
                //printAxisYDigits : true,
            }

            let ga = stdMod.graph.graphArray;
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

            stdMod.graph.drawsGraph(graphArg);
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
            restoresStashedVisibility();
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

    ///restores visibility which has been stashed
    ///when curve became non-Kepler
    function restoresStashedVisibility()
    {
        const sv = ssD.stashedVisibility;
        if( !sv ) return;
        Object.keys( sv ).forEach( okey => {
            const val = sv[ okey ];
            switch(okey) {
                case 'Q.hideD8Dpoint' : rg.Q.hideD8Dpoint = val;
                break;
                default : rg[ okey ].undisplay = val;
            }
        });
        ssD.stashedVisibility = null;
    }
}) ();
