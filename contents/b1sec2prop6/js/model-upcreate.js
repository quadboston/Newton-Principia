( function() {
    var {
        sn, $$, nsmethods, nssvg, mcurve, integral,
        mat, has, userOptions,
        ssF, ssD, sData,
        amode, stdMod, sconf, rg, toreg,
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
        const ADDENDUM = amode.aspect === 'addendum';
        const sectSpeed0 = ssD.sectSpeed0;
        const solvable = ssD.solvable;
        //stdMod.builds_dq8sagit8displace({});
        const Porb = ssD.qix2orb[ rg.P.qix ];
        var {
            RC, R, curvatureChordSecondPoint, projectionOfCenterOnTangent,
            uu,
            rr,
        } = Porb;
        rg.P.q = Porb.q;
        rg.P.pos[0] = rr[0];
        rg.P.pos[1] = rr[1];
        const rr0 = rg.P.pos;
        const rrc = rg.S.pos;
        const Rc = R; //curvature radius

        if( solvable ){
            const rrplus = Porb.rrplus;
            const rrminus = rg.rrminus.pos = Porb.rrminus;
            rg.Q.q = Porb.plusQ;
            rg.Q.q_minus = Porb.minusQ;
            rg.Q.pos[0] = rrplus[0];
            rg.Q.pos[1] = rrplus[1];
            rg.QtimeDecor.caption = 'Δt=' + (2*ssD.Dt).toFixed(5);
            rg.QtimeDecor.pos = Porb.rrplus;
            let sagV = Porb.sagittaVector;
            rg.sagitta.pos = [sagV[0]+rr[0],sagV[1]+rr[1]];
            const chord = rg.chord = [ rrplus[0] - rrminus[0], rrplus[1] - rrminus[1], ];
            rg.chord2 = chord[0]*chord[0]+chord[1]*chord[1];

            //R = parallel-projection of Q to tangent
            var RR = mat.linesCross(
                uu, rr0, //direction, start
                [rr0[0]-rrc[0], rr0[1]-rrc[1]], rg.Q.pos, //direction, start
            );
            rg.R.pos[0] = RR[0];
            rg.R.pos[1] = RR[1];
            //T = perp. from Q to radius-vector
            const TT = mat.dropPerpendicular( rg.Q.pos, rrc, rr0 )
            rg.T.pos[0] = TT[0];
            rg.T.pos[1] = TT[1];
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
                'tp-' + nsmethods.camelName2cssName( CCName ) +
                ' tostroke'
            );
            rgCC.svgel.style.display =
                rgCC.undisplay ? 'none' : 'block';
        }
        //================================================
        // \\// curvature circle
        //================================================


        //================================================
        // //\\ decorations
        // //\\ graph
        //------------------------------------------------
        //core code displays: force, mask[1] and sagitta, mask[3]
        {
            const mask = stdMod.graphFW_lemma.graphArrayMask;
            mask[1] = solvable && ADDENDUM; //displ.
            mask[2] = solvable && ADDENDUM;
            //sagitta in proof, but not in ...
            mask[3] = solvable && sconf.TIME_IS_FREE_VARIABLE;
        }

        {
            let graphArg = {
                //drawDecimalY : true,
                //drawDecimalX : false,
                printAxisXDigits : true,
                //printAxisYDigits : true,
            }
            /*
            if( !B ONUS ) {
                let ga = stdMod.graphFW_lemma.graphArray;
                let len = ga.length;
                let sumAbs = 0;
                var yMax = 0;
                let leny = ga[0].y.length;
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
            }
            */
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
                nsp.undisplay = false;
                nsl.undisplay = false;
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
                        case 'Q.d8d_find_is_LOCKED' : rg.Q.d8d_find_is_LOCKED = val;
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
                'P,rrminus'             : rg[ 'P,rrminus' ].undisplay,
                'P,sagitta'             : rg[ 'P,sagitta' ].undisplay,
                'Q'                     : rg.Q.undisplay,
                'QtimeDecor'            : rg.QtimeDecor.undisplay,
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
            ///heres is an actual code which hides shapes
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
}) ();

