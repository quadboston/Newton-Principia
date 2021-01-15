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
            baseFunction,
        },
    });
    return;






    ///the same function is used for left and right part of the Lemma diagram,
    ///recreates initial curve as approximatee
    function baseFunction( x ) {
        var x = x + rg.a.pos[0];
        return rg.leftFunction.dividedDifferences.calculate_polynomial( x );
    };
    function updateLeftCurve()
    {
        var xy = [];
        var cPivots = sconf.originalPoints.curvePivots;
        cPivots.forEach( (pivot, pix) => {
            xy[ pix ] = [ pivot.rgX.pos[0], pivot.rgX.pos[1] ];
        });
        rg.leftFunction.dividedDifferences = mat.calculate_divided_differences( xy );
        sconf.originalPoints.curvePivots.forEach( (pivot, pix) => {
            xy[ pix ] = [ pivot.rgX.pos[0], pivot.rgX.pos[1] ];
        });
        rg.leftFunction.dividedDifferences = mat.calculate_divided_differences( xy );
    }





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

        //merges selected points with controls points
        var cPivots = sconf.originalPoints.curvePivots;
        //merges positions to help d8d
        rg.a.pos = cPivots[0].rgX.pos;
        rg.c.pos = cPivots[2].rgX.pos;

        //--------------------------------------------------------------------------------------
        // //\\ point p transform
        //--------------------------------------------------------------------------------------
        //      transform driven by point "p"
        toreg( 'ptransform' )( 'val', [[1,0],[0,1]] );
        rg.ptransform.val[0][0] = ( rg.T.pos[0] - rg.P.pos[0] ) / ( rg.E.pos[0] - rg.A.pos[0] );
        rg.ptransform.val[1][1] = ( rg.p.pos[1] - rg.P.pos[1] ) / ( rg.a.pos[1] - rg.A.pos[1] );
        //--------------------------------------------------------------------------------------
        // \\// point p transform
        //--------------------------------------------------------------------------------------

        //--------------------------------------------------------------------------------------
        // //\\ point T transform
        //--------------------------------------------------------------------------------------
        sDomF.params__2__rgX8dragwrap_gen_list({
            pname : 'T',
            acceptPos : ( newPos ) =>
            {
                rg.T.pos[0] = newPos[0];
                newPos[1]   = rg.T.pos[1]; //blocks vertical movement
                getTransform();
                return true;
            }
        });
        rg.p.acceptPos = ( newPos ) => {
            rg.p.pos[0] = newPos[0];
            rg.p.pos[1] = newPos[1];
            getTransform();
            return true;
        };
        //--------------------------------------------------------------------------------------
        // \\// point T transform
        //--------------------------------------------------------------------------------------

        //.memorizes fraction of point r on interval PT
        rg.r.r2T = ( rg.r.pos[0]-rg.P.pos[0] ) / ( rg.T.pos[0]-rg.P.pos[0] );


        ( function () {
            //--------------------------------------------------------------------------------------
            // //\\ appded base partition points
            //--------------------------------------------------------------------------------------
            var originalBars    = sconf.originalPoints.bars;
            var A0              = rg.A.pos[0];
            var baseLen         = ( rg.E.pos[0] - A0 ) * 0.99;
            var bDef            = sconf.BARS_NUMBER_CURRENT;
            toreg( 'bars' )( 'count', bDef );

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
                if( bix < bDef ) return; 
                var bpName = 'bars-'+bix;
                var bp = rg[ bpName ];
                bp.pos[0] = floatGrid[ bix ] * baseLen + A0;
            });


            //====================================================================
            // //\\ bars and breadths color patch
            //      todm: should be in decoration area ...
            //      builds colors for ordered bars
            //====================================================================
            //sconf.MONO_BARS_COLOR = sDomF.getFixedColor( fixedColors.proof );
            sconf.MONO_BARS_COLOR = fixedColors.proof;

            ssD.zebraCols = ns.builds_zebraNColors_array({

                // "+1" is for extra point, for ordBars.push( rg.E )
                maxColors : sconf.BARS_NUMBER_MAX + 1,

                SATUR       : sconf.DEFAULT_TP_SATUR,
                LIGHT       : 50, //sconf.default_tp_lightness || sconf.DEFAULT_TP_LIGHT,
                OPACITY     : 0.8, //apparently irrelevant; sconf.DEFAULT_TP_OPACITY,
                zebraNumber : sconf.MONO_BARS_COLOR ? 3 : 6,
                monoColorHue: ns.rgba2hsla( sconf.MONO_BARS_COLOR )[0],
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
        })();
        //--------------------------------------------------------------------------------------
        // \\// appded base partition points
        //--------------------------------------------------------------------------------------
    }



    function getTransform()
    {
        rg.ptransform.val[0][0] = ( rg.T.pos[0] - rg.P.pos[0] )
                                / ( rg.E.pos[0] - rg.A.pos[0] );
        rg.ptransform.val[1][1] = ( rg.p.pos[1] - rg.P.pos[1] )
                                / ( rg.a.pos[1] - rg.A.pos[1] );
        rg.ptransform.val[1][0] = ( rg.p.pos[0] - rg.P.pos[0] )
                                / ( rg.a.pos[1] - rg.A.pos[1] );
    }


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {

        ssD.integrationStep = ( rg.E.pos[0] - rg.A.pos[0] ) / ssD.AREA_CALCULATION_STEPS;

        updateLeftCurve();
        getTransform();

        //-------------------------------------------------
        // //\\ this is breadth-points d8d limitator,
        //      if coder is not lazy, this limitator
        //      should be coded for sDomF.params__2__rgX8dragwrap_gen_list 
        //-------------------------------------------------
        //rg.countNSlider.caption = 'n = ' + ( rg.bars.count+1 );
        rg.countNSlider.caption = ( rg.bars.count+1 ) + ' bases';

        sconf.originalPoints.bars.forEach( (bar, bix) =>  {
            if( rg.bars.count <= bix ) return;
            var moPos = rg[ 'bars-'+bix ].pos;
            moPos[0] = Math.min( Math.max( moPos[0], rg.A.pos[0] ), rg.E.pos[0] );
        });
        //-------------------------------------------------
        // \\// this is breadth-points d8d limitator,
        //-------------------------------------------------

        //:moves point r proportionally
        nspaste(
            rg.r.pos,
            ssD.repoConf[1].fun( rg.r.r2T * ( rg.T.pos[0]-rg.P.pos[0] ) + rg.P.pos[0] )
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

            var origBar = rg[ 'bars-'+bix ];
            origBar.zebraColor = ssD.zebraCols[ bix ].rgba_high;
            ordBars.push( origBar );
        });
        // inserts point B
        ordBars.push( rg.E );

        // //\\ distributes zebraN colors
        var zebraColors = ssD.zebraCols;
        // \\// distributes zebraN colors
        ordBars.sort( (barA, barB) => ( barA.pos[0] - barB.pos[0] ) );
        ordBars.forEach( (ob,ix) => {
            ob.zebraColor = ssD.zebraCols[ ix ].rgba_high;
        });

        if( amode.theorion === 'proof' && amode.aspect === 'addendum' ) {
            var convergentOrderedBars = toreg( 'convergentOrderedBars' );
            convergentOrderedBars.val = ordBars.map( (ob,bix) => ({
                pos : [ ob.pos[0],  ob.pos[1] ]
            }));
        }
        //=============================================================================
        // \\// removes and recreates ordered bars
        //=============================================================================
    }

}) ();

