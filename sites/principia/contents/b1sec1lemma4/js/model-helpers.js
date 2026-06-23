(function(){
    const {
        ns, sn, haz, mat, nspaste, globalCss,
        sconf, ssF, ssD, stdMod, rg,
    } = window.b$l.atree({stdModList: {
        establishes_right_and_left_curve_pivots,
        establishes_x_partition,
        stashesPivots8functions,
        restoresPivots8functions,
    }});
    const integral = sn( 'integral', mat );
    var stasher = sn( 'stasher', stdMod );
    return;


    function establishes_right_and_left_curve_pivots(){
        //-----------------------------------------------------------
        // //\\ establishes right curve pivot draggers
        //-----------------------------------------------------------
        var cPivots = rg.leftCurvePivots.cpivots;
        var rightCurvePivots = rg.rightCurvePivots.cpivots;
        var DD = rg.ptransform.val;

        //changes model x end point to make function positive
        //this point change will propagate to normalize right points
        cPivots[ cPivots.length-1 ].rgX.pos[1] = ssD.FMIN_LIM
                * 1.01; //this protects from floating point round errors

        cPivots.forEach( (pivot,pix) => {
            var rgX     = pivot.rgX;
            var pos     = rgX.pos;
            var x       = pos[0];
            var y       = pos[1]
                //provides uniformity of ratio coversion
                + ssD.FMIN_LIM;
            //makes right natural coordinates in normal common basis
            var rX      = rightCurvePivots[pix].rgX;
            var rPos    = rX.pos;
            rPos[0]     = x * DD[0][0] + DD[1][0] * y + rg.P.pos[0];
            rPos[1]     = DD[1][1] * y + rg.P.pos[1];

            //--------------------------------------------------------
            // //\\ left points drag validation
            //      todm: all this can be eliminated if validate
            //      integrations in update_model
            //--------------------------------------------------------
            rgX.acceptPos = newPos => {
                const graph_fw = rg.pHGraph.fw;
                if( !haz( rgX, 'draggableX' ) ) {
                    ////blocks horizontal move: this method is a trick,
                    ////todm: it must be set in the d8d API
                    newPos[0] = pos[0];
                }
                ///blocks cureve movement below minimum line
                var proposedPos = cPivots.map(
                    rpivot =>[ rpivot.rgX.pos[0], rpivot.rgX.pos[1] ]
                );
                proposedPos[pix][0] = newPos[0];
                proposedPos[pix][1] = newPos[1];
                var test_dividedDifferences =
                    mat.calculates_divided_differences_fw( proposedPos );

                //------------------------------------------
                // //\\ makes raw validation over 100 points
                //------------------------------------------
                ///if this validattion does not detect wrong function,
                ///then study_model.js will do full valiation,
                var { fmin } = integral.simpleIntegration({
                    fun: test_dividedDifferences.calculate_polynomial,
                    baseArray               : [rg.A.pos[0], rg.E.pos[0]],
                    returnAll               : true,
                    INTEGRATION_POINTS_LIM  : 100,
                });
                if( ssD.FMIN_LIM > fmin ) {
                    ////forbids move
                    return false;
                }
                //------------------------------------------
                // \\// makes raw validation over 100 points
                //------------------------------------------

                //enables bars repaint because repaint works only for
                //small number of bars
                var wwLim = sconf.DONT_PAINT_BARS_MORE_THAN;
                if( rg.bars.xpointsN - 1 > wwLim ) {
                    stdMod.sliderN_n2masterN( wwLim )
                    stdMod.sliderN_n2pos( wwLim );
                    stdMod.sliderN_mastN2caption();
                }
                //perhaps graph must be redrawn:
                rg.pHGraph.fw.content.pix2values.length = 0;
                return true;
            };
            //--------------------------------------------------------
            // \\// left points drag validation
            //--------------------------------------------------------

        });
        //merges positions to help d8d
        //rightCurvePivots[0].rgX.pos = rg.p.pos;

        //*********************************************************
        //When transforms changes, then "ordinate ort" keeps its
        //vertical component unchanged, but angle can change,
        //Horizontal ort changes, but normilized_abcissas
        //are constants.
        //
        //This method of dragging mixes two actions,
        //1) change of transformations DD and RR,
        //2) updates normalized function,
        //
        //Change of the first pivot may change the slope of p,P
        //which changes transformation, the change of
        //dragger's p ordinate does change
        //normalized ordinate in proportion of dy/const,
        //
        //Change of the last pivot L, may change transformation
        //and noormalized ordinate of L, horizontal change of L
        //changes ort X and do not change normalized ordinate of L,
        //which always remains = 1,
        //
        //Although such dragging is convenient for user,
        //it makes related code logic messy,
        //*********************************************************
        rightCurvePivots.forEach( (rpivot,pix) => {
            var rgDragger = rpivot.rgX;
            const len1 = rightCurvePivots.length-1;
            const normPivots = rg.rightCurvePivots_normalized.cpivots;
            rgDragger.acceptPos = newPos => {
                var stashedNormPos = nspaste(
                    normPivots[ pix ].rgX.pos);
                var stashedDraggerPos = nspaste(rgDragger.pos);
                if( len1 === pix ) {
                    var stashedTransform = {
                        reverse: nspaste(rg.ptransform.reverse),
                        direct: nspaste(DD)
                    }
                    const lastNormalized = stdMod.Dxy_2_xy( newPos );
                    const newTx =
                        rg.P.pos[0] + DD[0][0]
                        //will become later lastNormalized[0] === 1
                        * lastNormalized[0];
                    stdMod.recalculates_rg_ptransform( newTx );
                } else if( pix === 0 ){
                    stdMod.recalculates_rg_ptransform();
                }
                rgDragger.pos[0] = newPos[0];
                rgDragger.pos[1] = newPos[1];
                //right natural to right virtual
                var normPos_new = stdMod.Dxy_2_xy( newPos );
                //--------------------------------------------------------
                // //\\ validations
                //--------------------------------------------------------
                ///blocks curve movement below minimum line
                var proposedNormPos = normPivots.map(
                    rpivot =>[ rpivot.rgX.pos[0], rpivot.rgX.pos[1] ]
                );
                //for test, modifies only one one point in
                //normalized array
                proposedNormPos[pix][0] = normPos_new[0];
                proposedNormPos[pix][1] = normPos_new[1];

                var test_dividedDifferences =
                    mat.calculates_divided_differences_fw(
                        proposedNormPos );
                var integral = sn( 'integral', mat );
                //------------------------------------------
                // //\\ makes raw validation over 100 points
                //------------------------------------------
                ///if this validattion does not detect wrong function,
                ///then study_model.js will do full valiation,
                var { fmin } = integral.simpleIntegration({
                    fun: test_dividedDifferences.calculate_polynomial,
                    baseArray: [rg.A.pos[0], rg.E.pos[0]],
                    returnAll: true,
                    INTEGRATION_POINTS_LIM: 100,
                });
                if( ssD.FMIN_LIM > fmin ) {
                    ////reverts changes back
                    if( len1 === pix ) {
                        nspaste( rg.ptransform.reverse,
                                 stashedTransform.reverse );
                        nspaste( DD, stashedTransform.direct );
                    }
                    nspaste( rgDragger.pos, stashedDraggerPos );
                    return false;
                }
                // //\\orts decorations
                const ortJpos = stdMod.xy_2_Dxy( [
                    rg.E.pos[0] - rg.A.pos[0],0] );
                rg.T.pos[0] = ortJpos[0]
                rg.j.pos[0] = stdMod.xy_2_Dxy( [1,0] )[0];
                const ortIpos = stdMod.xy_2_Dxy( [0, 1] );
                rg.i.pos[0] = ortIpos[0];
                rg.i.pos[1] = ortIpos[1];
                // \\//orts decorations
                //------------------------------------------
                // \\// makes raw validation over 100 points
                // \\// validations
                //------------------------------------------
                normPivots[pix].rgX.pos[0] = normPos_new[0];
                normPivots[pix].rgX.pos[1] = normPos_new[1];

                //enables bars repaint because repaint works only for
                //small number of bars
                var wwLim = sconf.DONT_PAINT_BARS_MORE_THAN;
                if( rg.bars.xpointsN - 1 > wwLim ) {
                    stdMod.sliderN_n2masterN( wwLim )
                    stdMod.sliderN_n2pos( wwLim );
                    stdMod.sliderN_mastN2caption();
                }
                //perhaps graph must be redrawn:
                rg.pHGraph.fw.content.pix2values.length = 0;
                return true;
            };
        });

        //-----------------------------------------------------------
        // //\\ establishes right curve pivots
        //-----------------------------------------------------------
        var rpNorm = rg.rightCurvePivots_normalized.cpivots;
        rpNorm.forEach( (rpivot,pix) => {
            var pos         = cPivots[ pix ].rgX.pos;
            rpivot.rgX.pos  = [ pos[0], pos[1] ];
        });
        //-----------------------------------------------------------
        // \\// establishes right curve pivots
        //-----------------------------------------------------------
    }

    //-----------------------------------------------------------
    // //\\ establishes x-partition
    //-----------------------------------------------------------
    function establishes_x_partition (){
        //--------------------------------------------------------------------------
        // //\\ left and right side normalized partition pars
        //--------------------------------------------------------------------------
        var reservedPP      = sconf.originalPoints.bars;
        //original partition points

        var reservedPPCount = reservedPP.length;
        var initialPPCount  = sconf.BARS_NUMBER_INITIAL+1;
        //=5 at start as of this ver

        rg.bars.xpointsN    = initialPPCount;
        var A0              = rg.A.pos[0];
        var baseLen         = ( rg.E.pos[0] - A0 ) * 0.99;
        //------------------------------------------
        // //\\ makes x-grid
        //------------------------------------------
        var GRID_LENGTH     = Math.floor( reservedPPCount
            * 1.1 //provides slight diversity of big and small bars
        );
        var { grid, floatGrid, } =
            ssF.randomGridGenerator({
                GRID_LENGTH,
                SEED : 1,
        });
        stdMod.internodeDistance = baseLen / GRID_LENGTH;
        reservedPP.forEach( (bar,bix) => {
            if( bix < initialPPCount ) return;
            //note: there will be empty nodes in this grid, in other words,
            //      some partion points will be farer than baseLen / GRID_LENGTH,
            bar.rgX.pos[0] = floatGrid[ bix ] * baseLen + A0;
        });
        //------------------------------------------
        // \\// makes x-grid
        //------------------------------------------

        //====================================================================
        // //\\ bars and breadths color patch
        //      todm: should be in decoration area ...
        //      builds colors for ordered bars
        //====================================================================
        ssD.zebraCols = {};
        [ !'monoColor', ns.rgbaArr2hsla( sconf.MONO_BARS_COLOR )[0] ].forEach(
            ( monoColorHue ) => {
                var wwCols = ns.builds_zebraNColors_array({

                    // "+1" is for extra point, for ordPP.push( rg.E )
                    //maxColors : sconf.BARS_NUMBER_MAX + 1,
                    maxColors : sconf.DONT_PAINT_BARS_MORE_THAN + 1,

                    SATUR       : sconf.DEFAULT_TP_SATUR,

                    //40 seems better than 40 for distinct graph lines
                    LIGHT       : 40,  //sconf.default_tp_lightness ||
                    OPACITY     : 0.8, //apparently irrelevant; sconf.DEFAULT_TP_OPACITY,
                    zebraNumber : monoColorHue ? 3 : sconf.ZEBRA_COLORS,
                    monoColorHue,
                });
                if( monoColorHue ) {
                    ssD.zebraCols.monocolor = wwCols;
                } else {
                    ssD.zebraCols.multicolor = wwCols;
                }
            });
        //rg.pHGraph.fw.content.pix2color = ssD.zebraCols.multicolor
        //  .map( col => col.rgba_high );

        //bar sides stoke is redundant and proliferates bar area ...
        //except for breadth segment
        globalCss.update(`
                    .bsl-approot svg .tp-right-bars,
                    .bsl-approot svg .tp-left-bars {
                        stroke : transparent;
                }
            `,
            'bars-fix'
        );
        //====================================================================
        // \\// bars and breadths color patch
        //====================================================================
        //--------------------------------------------------------------------------------------
        // \\// left and right side normalized partition pars
        //--------------------------------------------------------------------------------------
    }

    ///for left and right functions and arrays,
    ///stashes for case if functions become less than fmin,
    function stashesPivots8functions (){
        stasher.cpivots = { posArray : rg.leftCurvePivots.cpivots.map(
            pivot => (
                [ pivot.rgX.pos[0], pivot.rgX.pos[1] ]
        ))};
        stasher.leftFunction_dividedDifferences = rg.leftFunction.dividedDifferences;

        stasher.rightCurvePivots_normalized = { posArray :
            rg.rightCurvePivots_normalized.cpivots.map( pivot => (
                [ pivot.rgX.pos[0], pivot.rgX.pos[1] ]
        ))};
        stasher.rightFunction_dividedDifferences = rg.rightFunction.dividedDifferences;
    }

    ///for left and right functions and arrays,
    ///restores for case if functions become less than fmin,
    function restoresPivots8functions (){
        var stashedPos = stasher.cpivots.posArray;
        rg.leftCurvePivots.cpivots.forEach( (pivot, pix) => {
            pivot.rgX.pos[0] = stashedPos[pix][0];
            pivot.rgX.pos[1] = stashedPos[pix][1];
        });
        rg.leftFunction.dividedDifferences = stasher.leftFunction_dividedDifferences;

        var stashedPos = stasher.rightCurvePivots_normalized.posArray;
        rg.rightCurvePivots_normalized.cpivots.forEach( (pivot, pix) => {
            pivot.rgX.pos[0] = stashedPos[pix][0];
            pivot.rgX.pos[1] = stashedPos[pix][1];
        });
        rg.rightFunction.dividedDifferences = stasher.rightFunction_dividedDifferences;
    }
})();
