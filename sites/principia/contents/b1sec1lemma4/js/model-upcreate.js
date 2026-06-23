( function() {
    const {
        sn, nspaste, mat,
        sconf, ssD, sDomF,
        stdMod, toreg, rg, originalPoints,
    } = window.b$l.atree({
        stdModList :
        {
            model_upcreate,
        },
    });
    var stasher = sn( 'stasher', stdMod );
    toreg( 'orderedPartPoints' );
    toreg( 'bars' );
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate (){
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
            //if bar in array does exceed xpointsN, then
            //then this bar is ignored,
            if( rg.bars.xpointsN <= bix ) return;
            var moPos = bar.rgX.pos;
            //validates and fixes x-position of the bar
            moPos[0] = Math.min( Math.max( moPos[0], rg.A.pos[0] ), rg.E.pos[0] );
        });
        //-------------------------------------------------
        // \\// this is breadth-points d8d limitator,
        //-------------------------------------------------

        //==================================================
        // //\\ removes and recreates ordered bars
        //==================================================
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
                    if( Math.abs( reservedPP[ dragIx ]
                        .rgX.pos[0] - bar.rgX.pos[0] ) < minDistance )
                    {
                        ////skips bar which is too close to initial bars
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

        ///gets a lot of info about areas and
        //constructs synchronized partition for G-function,
        ///and gets a lot of info about functions F and G,
        ssD.FGstats = mat.integral.equalizeAreas({
            fun         : rg.leftFunction.dividedDifferences.calculate_polynomial,
            partition   : ordPP, //sconf.originalPoints.bars,
            startFX     : rg.A.pos[0],
            endFX       : rg.E.pos[0],

            funG        : rg.rightFunction.dividedDifferences.calculate_polynomial,
            startGX     : rg.A.pos[0],
            endGX       : rg.E.pos[0],
        })
        //-----------------------------------------------------
        // \\// orders and integrates
        // \\// removes and recreates ordered bars
        //=====================================================

        //=====================================================
        // //\\ validates
        //=============================================================================
        if( ssD.FGstats.originF.fmin < ssD.FMIN_LIM ||
            ssD.FGstats.originG.fmin < ssD.FMIN_LIM
        ){
            ////functions are is invalid, revert pivots
            stdMod.restoresPivots8functions();
            stdMod.media_update_is_forbidden = true;
            return;
        }
        stdMod.stashesPivots8functions();
        //=============================================================================
        // \\// validates
        //=============================================================================

        stdMod.draggable__allxy_2_allDxy(); //decorational-draggable

        //model-sugar: moves point r according i,j transformations
        nspaste( rg.r.pos, stdMod.rightFun_2_rightFigure( rg.r.rightBase2rx ) );
        //rg.T.pos[0] = stdMod.xy_2_Dxy( rg.E.pos )[0];

        var leftBarsAreas = []; //store it here, bs not in displayBars scope ...
        stdMod.calculateBars( 'left', leftBarsAreas );
        stdMod.calculateBars( 'right', leftBarsAreas );
    }
})();