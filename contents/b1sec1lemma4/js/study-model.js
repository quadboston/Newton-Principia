( function() {
    const {
        sn, nspaste, mat,
        sconf, ssD, sDomF,
        stdMod, toreg, rg, originalPoints,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_lemma,
            model_upcreate,
        },
    });
    var stasher = sn( 'stasher', stdMod );
    toreg( 'leftFunction' );
    toreg( 'rightFunction' );
    toreg( 'orderedPartPoints' );
    toreg( 'bars' );
    return;


    function init_lemma (){
        ssD.rightCurvePivots_normalized =
            originalPoints.rightCurvePivots_normalized;
        //-------------------------------------------------
        // //\\ configs model parameters
        //-------------------------------------------------
        //there must be special place for model params
        //usually, there not many of them for
        //math models, and sconf it too crowded place
        //to be lost there ...
        //so, we use ssD in mean time ...
        ssD.AREA_CALCULATION_ACCURACY_DIGITS = 4;
        ssD.AREA_CALCULATION_STEPS = Math.pow( 10, ssD.AREA_CALCULATION_ACCURACY_DIGITS );
        ssD.integrationStep = ( rg.E.pos[0] - rg.A.pos[0] ) / ssD.AREA_CALCULATION_STEPS;
        ssD.FMIN_LIM = 0.01;
        //-------------------------------------------------
        // \\// configs model parameters
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ merges lemma legacy points a, c, ...
        //      with controls points
        //-------------------------------------------------
        var cPivots = ssD.curvePivots;
        rg.a.pos = cPivots[0].rgX.pos;
        rg.c.pos = cPivots[2].rgX.pos;
        var rightCurvePivots = sconf.originalPoints.rightCurvePivots;
        rg.p.pos = rightCurvePivots[0].rgX.pos;
        //we need this point for scaling purposes for T-transform
        rg.a.initialPos = [ rg.a.pos[0], rg.a.pos[1] ];
        //-------------------------------------------------
        // \\// merges lemma legacy points a, c, ...
        //-------------------------------------------------

        stdMod.recalculates_rg_ptransform(); //establishes initial transform T
        stdMod.establishes_right_and_left_curve_pivots();
        stdMod.establishes_x_partition();
        stdMod.establishes_transform_T();
        stdMod.establishes_slider_n();
        stdMod.wraps_graph_fw({});
        //stashes fraction of decorational point r on interval PT
        rg.r.r2T = ( rg.r.pos[0]-rg.P.pos[0] ) / ( rg.T.pos[0]-rg.P.pos[0] );
    }

    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        stdMod.media_update_is_forbidden = false;
        stdMod.updates__draggers2toFunctions();

        //going to validate, will revoke changes if invalid

        //-------------------------------------------------
        // //\\ this is breadth-points d8d limitator,
        //      if coder is not lazy, this limitator
        //      should be coded for sDomF.rgx2draglist
        //      todm: why more than 3 points checked every time? They are constants.
        //-------------------------------------------------
        sconf.originalPoints.bars.forEach( (bar, bix) =>  {
            if( rg.bars.xpointsN <= bix ) return;
            //var moPos = rg[ 'bars-'+bix ].pos;
            //this must work
            var moPos = bar.rgX.pos;
            moPos[0] = Math.min( Math.max( moPos[0], rg.A.pos[0] ), rg.E.pos[0] );
        });
        //-------------------------------------------------
        // \\// this is breadth-points d8d limitator,
        //-------------------------------------------------


        //=============================================================================
        // //\\ removes and recreates ordered bars
        //=============================================================================

        //-----------------------------------------------------------
        // //\\ incorporates three user-draggable-original-x-controls
        //      into orderedPP,
        //      eliminates elementar-bases with zero length
        //-----------------------------------------------------------
        var ordPP = rg.orderedPartPoints.val = [];
        var reservedPP = sconf.originalPoints.bars; //original partition points

        ///"awkward" loop style, do for( var ... to skip extra cycles
        reservedPP.forEach( (bar, bix) =>  {
            //if( rg.bars.xpointsN <= ordPP.length ){
            if( rg.bars.xpointsN <= bix ){
                return;
            }
            //validates
            var initialPPCount = sconf.BARS_NUMBER_INITIAL+1;
            var minDistance = stdMod.internodeDistance*0.3;

            ////skips bar which is too close to initial bars
            ////todM: speed up
            if( bix >= initialPPCount ) {
                for( var dragIx=0; dragIx<initialPPCount; dragIx++ ) {
                    if( Math.abs( reservedPP[ dragIx ].rgX.pos[0] - bar.rgX.pos[0] ) < minDistance )
                    {
                        ////skips bar which is too close to initial bars
                        //ccc( bix + ' skipped or=', reservedPP[ dragIx ].rgX.pos[0].toFixed(3),
                        //     bar.rgX.pos[0].toFixed(3)
                        //);
                        return;
                    }
                }
            }
            ordPP.push( bar.rgX );
        });
        //-----------------------------------------------------------
        // \\// incorporates three user-draggable-original-x-controls
        //-----------------------------------------------------------

        //--------------------------------------------------------------------
        // //\\ orders and integrates
        //--------------------------------------------------------------------
        ordPP.sort( (barA, barB) => ( barA.pos[0] - barB.pos[0] ) );

        ssD.FGstats = mat.integral.equalizeAreas({
            fun         : rg.leftFunction.dividedDifferences.calculate_polynomial,
            partition   : ordPP, //sconf.originalPoints.bars,
            startFX     : rg.A.pos[0],
            endFX       : rg.E.pos[0],

            funG        : rg.rightFunction.dividedDifferences.calculate_polynomial,
            startGX     : rg.A.pos[0],
            endGX       : rg.E.pos[0],
        })
        //--------------------------------------------------------------------
        // \\// orders and integrates
        // \\// removes and recreates ordered bars
        //=============================================================================

        //=============================================================================
        // //\\ validates
        //=============================================================================
        if( ssD.FGstats.originF.fmin < ssD.FMIN_LIM ||
            ssD.FGstats.originG.fmin < ssD.FMIN_LIM
        ) {
            ////functions are is invalid, revert pivots
            stdMod.restoresPivots8functions();
            stdMod.media_update_is_forbidden = true;
            return;
        }
        stdMod.stashesPivots8functions();
        //=============================================================================
        // \\// validates
        //=============================================================================

        stdMod.draggable__allxy_2_allTxy(); //decorational-draggable

        //model-sugar: moves points r,T according i,j transformations
        nspaste( rg.r.pos, stdMod.rightFun_2_rightFigure( rg.r.r2T ) );
        rg.T.pos[0] = stdMod.xy_2_Txy( rg.E.pos )[0];

        var leftBarsAreas = []; //store it here, bs not in displayBars scope ...
        stdMod.calculateBars( 'left', leftBarsAreas );
        stdMod.calculateBars( 'right', leftBarsAreas );
    }
})();