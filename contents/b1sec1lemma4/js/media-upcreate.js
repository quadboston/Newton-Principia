( function() {
    var {
        ns, sn,
        rg,
        ssF, ssD,
        sconf,
        amode,
        toreg,
        stdMod,
        
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
        },
    });

    //cleanup stuff
    var barsStack = {
        left  : { arr :[], count : 0 },
        right : { arr :[], count : 0 },
    };


    var graphArray = [];
    return;













    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        ///-------------------------------------------------
        /// paints right side curve
        ///-------------------------------------------------
        ssF.paintsCurve({
                mmedia          : stdMod.mmedia,
                fun             : rg.rightFun_2_rightFigure,
                rgName          : 'prT',
                pointA          : rg.A,
                pointB          : rg.E,
                addToStepCount  : 1,
        });

        ///-------------------------------------------------
        /// paints left side curve
        ///-------------------------------------------------
        ssF.paintsCurve({
                mmedia          : stdMod.mmedia,
                fun             : rg.leftFunction.dividedDifferences.calculate_polynomial,
                pointsName      : 'aE',
                rgName          : 'acE',
                addToStepCount  : 1,
        });

        var leftBarsAreas = []; //store it here, bs not in displayBars scope ...

        displayBars( 'left', leftBarsAreas );
        displayBars( 'right', leftBarsAreas );
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================







    //=========================================================
    // //\\ calculates figure, bars areas
    //      and paints bars
    //=========================================================
    function displayBars(
        left0right,
        leftBarsAreas
    ){
        var ordBars = rg.orderedBars.val;
        const BCOUNT = ordBars.length;
        const BCOUNT_1 = BCOUNT-1;
        var transformVolume = rg.ptransform.val[0][0] * rg.ptransform.val[1][1];

        if(
            amode.subessay === 'proportionality-convergence'
        ) {
            ////demonstrates that bar to bar ratio can converge
            var MIDDLE_BAR_SHIFT_ALGO = true;
            var distortion = 5 / BCOUNT;
            distortion = 0.9 * distortion; // * distortion;
            //ccc( 'ratio convergence: (current-ratio)/(limit-ratio)=' +
            //    ((1-distortion)*100).toFixed(3) + '%'
            //);
        }
        if(
            amode.subessay === 'proportionality-convergence' ||
            amode.subessay === 'non-similar-curves'
        ) {
            var doBar2BarStats = true;  //-1 to disable
            var barRatioMax = null;
            var barRatioMin = null;

            if( BCOUNT === 5 ) {
                //starts bar sequence over
                graphArray = [];
            }
            graphArray[ BCOUNT_1 ] = {
                x : BCOUNT_1,
                y : [],
            };
            var graphArrayY = graphArray[ BCOUNT_1 ].y;
            var zebraColArr = ssD.zebraCols.multicolor;

        } else {
            var doBar2BarStats = false;
            rg.convergenceGraphFW.fw.removeFromDom();
            var zebraColArr = ssD.zebraCols.monocolor;
        }


        //preparing for cleanup
        var barStack = barsStack[ left0right ].arr;
        var bsCount = barsStack[ left0right ].count;
        barStack.forEach( lin => {
            lin.svgel.style.display = 'none'; //cleanup
        })

        var barsArea = 0;
        var funArea = 0;    //function area

        //======================================================================
        var base_fun = left0right === 'left' ?
                       rg.leftFunction.dividedDifferences.calculate_polynomial :
                       rg.rightFunction.dividedDifferences.calculate_polynomial
                       ;
        //======================================================================



        ordBars.forEach( (bar, bix) => {
            if( bix === BCOUNT_1 ) return; //last point has no bar

            //:calculates bar vertices
            if( MIDDLE_BAR_SHIFT_ALGO || left0right === 'left' ) {
                var p1X         = bar.pos[0];                //left-bar side coordinate x
                var p2X         = ordBars[ bix+1 ].pos[0];   //right-bar side coordinate x
            } else {
                p1X = bar.gX;
                p2X = ordBars[ bix+1 ].gX;
            }
            var p2minus1    = p2X - p1X;


            if( !MIDDLE_BAR_SHIFT_ALGO ) {
                //this correction is too complex with convergence,
                //empty bars are better to skip
                //this works: if( p2minus1 < 0.001 ) {
                if( p2minus1 < 0.00001 ) {
                    //todo ... better algo of partition generation
                    //ccc( 'skipped bix', bix )
                    return;
                }
            }

            if( MIDDLE_BAR_SHIFT_ALGO ) {
                if( left0right !== 'left' ) {
                    ////this is manually made scenario of bars area converging to
                    ////given ratio: equal color bars do converge to each other ...

                    ////the distortion is "applied" to right figure bars,
                    ////odd bars are shortened along x, even increased,
                    if( !(bix%2) ) {
                        if( bix < BCOUNT - 3 ) {
                            p2X -= p2minus1 * distortion;
                        }
                    } else if( bix < BCOUNT - 2 ) {
                        p1X -= (p1X - ordBars[bix-1].pos[0]) * distortion;
                    }
                }
            }



            //=======================================================
            // calculates function values
            var leftFun     = base_fun( p1X );        
            var rightFun    = base_fun( p2X );
            //=======================================================



            //=======================================================
            // //\\ builds stats in loop
            //      for areas and ratios
            //=======================================================
            //this is a correct method for monotonic functions
            //var min = Math.min( leftFun, rightFun );
            //but we need more elaborated calculation of minimum
            var [ barLeadLevel, fSum, barArea ] = calculatesInscribedLevel(
                p1X, p2X, base_fun
            );
            funArea += fSum;
            barsArea += barArea;
            if( left0right === 'left' ) {
                leftBarsAreas[ bix ] = barArea;
            } else if( barArea !== 0 && leftBarsAreas[ bix ] !== 0) {
                //ccc( bix, barArea )
                var barRatio = Math.abs( leftBarsAreas[ bix ] / barArea );
                barRatioMax = barRatioMax === null ||
                              barRatioMax < barRatio ? barRatio : barRatioMax;
                barRatioMin = barRatioMin === null ||
                              barRatioMin > barRatio ? barRatio : barRatioMin;

                if( doBar2BarStats ) {
                    graphArrayY.push( barRatio );
                }
            }
            //=======================================================
            // \\// builds stats in loop
            //=======================================================



            //=======================================================
            // //\\ does GUI
            //=======================================================
            //:establishes names for bar vertices
            var ltName      = left0right + 'bar-'+bix+'-left-top';
            var rtName      = left0right + 'bar-'+bix+'-right-top';
            var ltBName     = left0right + 'bar-'+bix+'-left-bottom';
            var rtBName     = left0right + 'bar-'+bix+'-right-bottom';

            //-------------------------------------------------------
            // //\\ calculates vertices for left and right
            //-------------------------------------------------------
            if( left0right === 'left' ) {
                var p1Xtop = p1X;
                var p2Xtop = p2X;
                var p1Y = barLeadLevel;
                var ymin = rg.A.pos[1];
                var cssClass = 'tp-proof tp-left-bars tp-left-bar-' + bix;
                var breadthClass = 'tp-left-bars-breadths';
            } else {
                ////transforms normalized coordinates to "squed coordinates"
                ////very ineffective as code and as performance:
                ////to transform them back again when calculating a function,
                var p1X = p1X * rg.ptransform.val[0][0] + rg.P.pos[0];
                var p2X = p2X * rg.ptransform.val[0][0] + rg.P.pos[0];
                var p1Xtop = p1X + barLeadLevel*rg.ptransform.val[1][0];
                var p2Xtop = p2X + barLeadLevel*rg.ptransform.val[1][0]; 
                var p1Y = barLeadLevel * rg.ptransform.val[1][1] + rg.P.pos[1]-rg.A.pos[1];
                var ymin = rg.P.pos[1];
                var cssClass = 'tp-proof tp-right-bars tp-right-bar-' + bix;
                var breadthClass = 'tp-right-bars-breadths';
            }
            //-------------------------------------------------------
            // \\// calculates vertices for left and right
            //-------------------------------------------------------

            //-------------------------------------------------------
            // //\\ establishes registry for bar vertices
            //-------------------------------------------------------
            var leftTop     = toreg( ltName )( 'pos', [ p1Xtop, p1Y ] )();
            var rightTop    = toreg( rtName )( 'pos', [ p2Xtop, p1Y ] )();
            var leftBottom  = toreg( ltBName )( 'pos', [ p1X, ymin ] )();
            var rightBottom = toreg( rtBName )( 'pos', [ p2X, ymin ] )();
            //-------------------------------------------------------
            // \\// establishes registry for bar vertices
            //-------------------------------------------------------


            //-------------------------------------------------------
            // //\\ drawing bars edges
            //-------------------------------------------------------
            //:converts var vertices from model to media
            leftTop.medpos      = ssF.mod2inn( leftTop.pos );
            rightTop.medpos     = ssF.mod2inn( rightTop.pos );
            leftBottom.medpos   = ssF.mod2inn( leftBottom.pos );
            rightBottom.medpos  = ssF.mod2inn( rightBottom.pos );

            var zebraColor = zebraColArr[ bix ].rgba_high;

            var rgX_bar = ssF.pnames2poly( [ ltBName, ltName, rtName, rtBName ],
                            cssClass,
                            !!'correctJoin'
            );
            rgX_bar.svgel.style.display = 'block';

            //this overrides tp-css-machine colors in topics-media-css.js
            rgX_bar.svgel.style.fill = zebraColor;
            barStack[ bsCount++ ] = rgX_bar;  //storing for cleanup

            var lin = ssF.str2line( ltBName+','   +rtBName, cssClass +
                                    ' ' + breadthClass, {}, '' );
            lin.svgel.style.display = 'block';
            barStack[ bsCount++ ] = lin;  //storing for cleanup

            if( bix === sconf.INDIVIDUAL_BAR_INDEX_IN_LEMMA ) {
                ////facilitates clause in lemma orig. text for "indiv" bars,
                var wwCol = ssD.zebraCols.multicolor[ bix ].rgba_high;
                rgX_bar.svgel.style.stroke = wwCol;
                lin.svgel.style.stroke = wwCol;
                //this value is overriden by tp-machine at highlight
                rgX_bar.svgel.setAttribute( 'stroke-width', '0.1' );
                lin.svgel.setAttribute( 'stroke-width', '0.1' );
            } else {
                lin.svgel.style.stroke = zebraColor;
                rgX_bar.svgel.style.stroke = 'transparent';
            }
            //-------------------------------------------------------
            // \\// drawing bars edges
            // \\// does GUI
            //=======================================================
        });



        //=======================================================
        // //\\ builds stats
        //      for areas and ratios
        //=======================================================
        toreg( 'barRatioMax' );
        toreg( 'barRatioMin' );
        if( MIDDLE_BAR_SHIFT_ALGO ) {
            ////for legend
            rg.barRatioMax.val = barRatioMax ?
                    ( barRatioMax / transformVolume ).toFixed(3) : '';
            rg.barRatioMin.val = barRatioMin ?
                    ( barRatioMin / transformVolume ).toFixed(3) : '';
        } else {
            rg.barRatioMax.val = ( 1 / transformVolume ).toFixed(3);
            rg.barRatioMin.val = ( 1 / transformVolume ).toFixed(3);
        }

        rg.leftFunction.funArea = funArea;
        if( left0right === 'left' ) {
            toreg( 'leftBarsArea' )( 'value', barsArea );
        } else {
            toreg( 'rightBarsArea' )( 'value', barsArea * transformVolume );
            rg.leftFunction.rigthArea = funArea * transformVolume;
            rg.rightFunction.funArea = funArea; //todo
        }

        if(
            doBar2BarStats &&
            left0right !== 'left'
        ) {
            rg.convergenceGraphFW.drawConvGraph({
                graphArray,
                axisYy : 1,
            })
        }
        //=======================================================
        // \\// builds stats
        //      for areas and ratios
        //=======================================================
    }
    //=========================================================
    // \\// calculates figure, bars areas
    //=========================================================



    //=========================================================
    /// on this base p1X, p2X, calculates:
    ///             leading-level-of-inscribed-bar
    ///             integral I f(x)dx
    ///
    /// todm ... shoulbe in model and not be executed
    ///          for transforms of left side and for
    ///          operations which do not change
    ///          left-side-figure and its bar-partition,
    function calculatesInscribedLevel(
        p1X,         //left-bar side coordinate x
        p2X,         //right-bar side coordinate x
        base_fun,
    ){
        var STEPS_MIN = 2;
        var baseL   = p2X - p1X;
        var STEPS   = Math.max( STEPS_MIN, Math.ceil( baseL / ssD.integrationStep ) );
        var step    = baseL / STEPS;
        var funct   = base_fun;
                      // ssD.repoConf[0].fun;

        var leftFun = funct( p1X );
        var posX    = p1X;
        var level   = leftFun;
        var fSum    = 0;

        for( var i = 0; i <= STEPS; i++ ) {
            var fun = funct( posX );        

            if( i < STEPS ) {
                fSum += fun * step;
            }
            ///if function crosses axis x or touches it,
            ///then leading-level-of-inscribed-bar is set to 0,
            if( leftFun*fun <= 0 ) {
                var level = 0;
            }
            if( Math.abs( level ) > Math.abs( fun ) ) {
                level = fun;
            }
            posX += step;
        }
        return [
            level,
            fSum,        //fun area
            level*baseL, //bar area
        ];
    }


}) ();

