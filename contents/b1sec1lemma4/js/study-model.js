( function() {
    var {
        ns, sn, nspaste, eachprop, haz, mat,
        globalCss,
        getFixedColor,
        sconf, fconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod,
        tr, tp, toreg,
        fixedColors,

    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;













    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        //there must be special place for model params
        //usually, there not many of them for
        //math models, and sconf it too crowded place
        //to be lost there ...
        //so, we use ssD in mean time ...
        ssD.AREA_CALCULATION_ACCURACY_DIGITS = 3;
        ssD.AREA_CALCULATION_STEPS = Math.pow( 10, ssD.AREA_CALCULATION_ACCURACY_DIGITS );

        toreg( 'leftFunction' );
        toreg( 'rightFunction' );

        //merges model points a, c with controls points
        var cPivots = sconf.originalPoints.curvePivots;
        //merges positions to help d8d
        rg.a.pos = cPivots[0].rgX.pos;
        rg.c.pos = cPivots[2].rgX.pos;

        //--------------------------------------------------------------------------------------
        // //\\ shift transform T
        //      , reseves space and sets initials
        //      
        //--------------------------------------------------------------------------------------
        //      transform driven by point "p"
        stdMod.recalculates_rg_ptransform();
        //--------------------------------------------------------------------------------------
        // \\// shift transform T
        //--------------------------------------------------------------------------------------

        //-----------------------------------------------------------
        // //\\ establishes right curve points
        //      normalized and mediaable
        //-----------------------------------------------------------
        ///mediaable
        var rightCurvePivots = sconf.originalPoints.rightCurvePivots;
        var T                = rg.ptransform.val;
        cPivots.forEach( (pivot,pix) => {
            var pos     = pivot.rgX.pos;
            var x       = pos[0];
            var y       = pos[1];
            var rX      = rightCurvePivots[pix].rgX;
            var rPos    = rX.pos;
            rPos[0]     = x * T[0][0] + T[1][0] * y + rg.P.pos[0];
            rPos[1]     =               T[1][1] * y + rg.P.pos[1];
        });
        //merges positions to help d8d
        //rightCurvePivots[0].rgX.pos = rg.p.pos;
        //.memorizes fraction of point r on interval PT
        rg.r.r2T = ( rg.r.pos[0]-rg.P.pos[0] ) / ( rg.T.pos[0]-rg.P.pos[0] );

        ///normalized
        var rpNorm = sconf.originalPoints.rightCurvePivots_normalized;
        rpNorm.forEach( (rpivot,pix) => {
            var pos         = cPivots[ pix ].rgX.pos;
            rpivot.rgX.pos  = [ pos[0], pos[1] ];
        });

        rightCurvePivots.forEach( (rpivot,pix) => {
            var rgDragger = rpivot.rgX;
            rgDragger.acceptPos = newPos =>
            {
                var normPos = sconf.originalPoints.rightCurvePivots_normalized[ pix ].rgX.pos;
                var normPosX = normPos[0]; //stashed to block hor. move,

                rgDragger.pos[1] = newPos[1];
                rgDragger.pos[0] = newPos[0];
                stdMod.draggable__allTxy_2_allxy();
                if( !haz( rgDragger, 'draggableX' ) ) {
                    ////blocks horizontal move: this method is a trick,
                    ////todm: it must be set in the d8d API
                    normPos[0] = normPosX;
                    stdMod.draggable__allxy_2_allTxy();
                    newPos[0] = rgDragger.pos[0];
                }
                return true;
            };
        });
        //-----------------------------------------------------------
        // \\// establishes right curve points
        //-----------------------------------------------------------

        //--------------------------------------------------------------------------------------
        // //\\ T transform draggers p, T
        //--------------------------------------------------------------------------------------
        sDomF.params__2__rgX8dragwrap_gen_list({
            pname : 'T',
            acceptPos : ( newPos ) =>
            {
                rg.T.pos[0] = newPos[0];
                newPos[1]   = rg.T.pos[1]; //blocks vertical movement
                stdMod.recalculates_rg_ptransform();
                return true;
            }
        });
        rg.p.acceptPos = ( newPos ) => {
            rg.p.pos[0] = newPos[0];
            rg.p.pos[1] = newPos[1];
            stdMod.recalculates_rg_ptransform();
            return true;
        };
        //--------------------------------------------------------------------------------------
        // \\// T transform draggers p, T
        //--------------------------------------------------------------------------------------



        ( function () {
            //--------------------------------------------------------------------------------------
            // //\\ appded base partition points
            //--------------------------------------------------------------------------------------
            var originalBars    = sconf.originalPoints.bars;
            var A0              = rg.A.pos[0];
            var baseLen         = ( rg.E.pos[0] - A0 ) * 0.99;
            var bDefault        = sconf.BARS_NUMBER_CURRENT; //=3 at start as of this ver
            toreg( 'bars' )( 'count', bDefault );

            var orBarsLen = originalBars.length;
            var { floatGrid } =
                ssF.randomGridGenerator({
                    GRID_LENGTH : orBarsLen
                                    * 4, //provides diversity of big and small bars
                    SEED : 1,
            });

            ///the "grand" collection of all bars (of BARS_NUMBER_MAX)
            ///is made in sconf.js
            originalBars.forEach( (bar,bix) => {
                ////HERE IS AN INVISIBLE TRICK: grid[0] which is 0 is
                ////skipped avoiding "zero-bar"
                if( bix < bDefault ) return; 
                bar.rgX.pos[0] = floatGrid[ bix ] * baseLen + A0;
            });


            //====================================================================
            // //\\ bars and breadths color patch
            //      todm: should be in decoration area ...
            //      builds colors for ordered bars
            //====================================================================
            ssD.zebraCols = {};
            [ !'monoColor', ns.rgbaArr2hsla( sconf.MONO_BARS_COLOR )[0] ].forEach(
                ( monoColorHue ) => {
                    var wwCols = ns.builds_zebraNColors_array({

                        // "+1" is for extra point, for ordBars.push( rg.E )
                        maxColors : sconf.BARS_NUMBER_MAX + 1,

                        SATUR       : sconf.DEFAULT_TP_SATUR,
                        LIGHT       : 50,  //sconf.default_tp_lightness ||
                                           //sconf.DEFAULT_TP_LIGHT,
                        OPACITY     : 0.8, //apparently irrelevant; sconf.DEFAULT_TP_OPACITY,
                        zebraNumber : monoColorHue ? 3 : 6,
                        monoColorHue,
                    });
                    if( monoColorHue ) {
                        ssD.zebraCols.monocolor = wwCols;
                    } else {
                        ssD.zebraCols.multicolor = wwCols;
                    }
                });
            
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


            //--------------------------
            // //\\ configures slider n
            //--------------------------
            var sliderLen = rg.sliderNEnd.pos[0] - rg.sliderNStart.pos[0];
            ///slider n callback
            rg.countNSlider.acceptPos = ( newPos ) => {
                newPos[0] = Math.max( rg.sliderNStart.pos[0],   newPos[0] );
                newPos[0] = Math.min( rg.sliderNEnd.pos[0],     newPos[0] );
                newPos[1] = Math.max( rg.sliderNStart.pos[1],   newPos[1] );
                newPos[1] = Math.min( rg.sliderNEnd.pos[1],     newPos[1] );
                rg.bars.count = Math.floor(
                        3 + ( sconf.BARS_NUMBER_MAX - 4 ) *
                        ( newPos[0] - rg.sliderNStart.pos[0] ) / sliderLen
                );
                return true;
            };
            //slider n initial pos
            rg.countNSlider.pos[0] = ( rg.bars.count - 3 )
                                     / ( sconf.BARS_NUMBER_MAX - 4 ) * sliderLen +
                                     rg.sliderNStart.pos[0];
            //--------------------------
            // \\// configures slider n
            //--------------------------

            rg.convergenceGraphFW = stdMod.createConvergenceGraphFW({
                ORDINATES_MAX : sconf.BARS_NUMBER_MAX + 1,
            })

        })();
        //--------------------------------------------------------------------------------------
        // \\// appded base partition points
        //--------------------------------------------------------------------------------------
    }






    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {

        ssD.integrationStep = ( rg.E.pos[0] - rg.A.pos[0] ) / ssD.AREA_CALCULATION_STEPS;

        //stdMod.recalculates_rg_ptransform();
        stdMod.updates__draggers2toFunctions();
        stdMod.draggable__allxy_2_allTxy(); //decorational-draggable

        //-------------------------------------------------
        // //\\ this is breadth-points d8d limitator,
        //      if coder is not lazy, this limitator
        //      should be coded for sDomF.params__2__rgX8dragwrap_gen_list
        //      todm: why more than 3 points checked every time? They are constants.
        //-------------------------------------------------
        //rg.countNSlider.caption = 'n = ' + ( rg.bars.count+1 );
        rg.countNSlider.caption = ( rg.bars.count+1 ) + ' bases';

        sconf.originalPoints.bars.forEach( (bar, bix) =>  {
            if( rg.bars.count <= bix ) return;

            var moPos = rg[ 'bars-'+bix ].pos;
            //this must work
            //var moPos = bar.rgX.pos;

            moPos[0] = Math.min( Math.max( moPos[0], rg.A.pos[0] ), rg.E.pos[0] );
        });
        //-------------------------------------------------
        // \\// this is breadth-points d8d limitator,
        //-------------------------------------------------

        //todo: must be recalculated
        //:moves point r proportionally
        nspaste(
            rg.r.pos,
            stdMod.rightFun_2_rightFigure( rg.r.r2T )
            //ssD.repoConf[1].fun( rg.r.r2T * ( rg.T.pos[0]-rg.P.pos[0] ) + rg.P.pos[0] )
        );
        

        //=============================================================================
        // //\\ removes and recreates ordered bars
        //=============================================================================
        // inserts point A
        var ordBars = toreg( 'orderedBars' )( 'val', [ rg.A ] )('val');
        sconf.originalPoints.bars.forEach( (bar, bix) =>  {
            if( rg.bars.count <= bix ){
                return;
            }
            //already done in sconf:... undisplayAlways : true,
            //if( bix > 4 ) bar.rgX.undisplay = true; //false;

            //var origBar = rg[ 'bars-'+bix ];
            ordBars.push( bar.rgX );
        });
        // inserts point B
        ordBars.push( rg.E );

        ordBars.sort( (barA, barB) => ( barA.pos[0] - barB.pos[0] ) );


        if(
            amode.subessay === 'non-similar-curves'
        ) {
            // todo fix the bug first:
            // 0 x=0.0000 z=1.0731 ... must be monotonic
            mat.integral.equalizeAreas({
                fun         : rg.leftFunction.dividedDifferences.calculate_polynomial,
                partition   : ordBars, //sconf.originalPoints.bars,
                startFX     : rg.A.pos[0],
                endFX       : rg.E.pos[0],

                funG        : rg.rightFunction.dividedDifferences.calculate_polynomial,
                startGX     : rg.A.pos[0],
                endGX       : rg.E.pos[0],
            })
        }
        //=============================================================================
        // \\// removes and recreates ordered bars
        //=============================================================================
    }




}) ();

