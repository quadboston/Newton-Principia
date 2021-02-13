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
        /// paints x-scaled curve
        ///-------------------------------------------------
        ssF.paintsCurve({
                mmedia          : stdMod.mmedia,
                fun             : ssD.repoConf[1].fun,
                rgName          : 'prT',
                pointA          : rg.P,
                pointB          : rg.T,
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
        if( amode.theorion === 'proof' && amode.aspect === 'addendum' ) {
            var BAR_RATIO_CONVERGES = true;
        }

        var ordBars = rg.orderedBars.val;
        const BCOUNT = ordBars.length-1;
        var transformVolume = rg.ptransform.val[0][0] * rg.ptransform.val[1][1];

        if( amode.subessay === 'proportionality-convergence' ) {
            var doBar2BarStats = true;  //-1 to disable
            if( ordBars.length === 5 ) {
                //starts bar sequence over
                graphArray = [];
            }
            graphArray[ BCOUNT ] = {
                x : BCOUNT,
                y : [],
            };
            var graphArrayY = graphArray[ BCOUNT ].y;
        } else {
            var doBar2BarStats = false;
            rg.convergenceGraphFW.fw.removeFromDom();
        }

        if( BAR_RATIO_CONVERGES ) {
            var distortion = 5 / ordBars.length;
            distortion = 0.9 * distortion; // * distortion;
            //ccc( 'ratio convergence: (current-ratio)/(limit-ratio)=' +
            //    ((1-distortion)*100).toFixed(3) + '%'
            //);
            var barRatioMax = null;
            var barRatioMin = null;
        }

        //preparing for cleanup
        var barStack = barsStack[ left0right ].arr;
        var bsCount = barsStack[ left0right ].count;
        barStack.forEach( lin => {
            lin.svgel.style.display = 'none'; //cleanup
        })

        var barsArea = 0;
        var funArea = 0;    //function area
        if( amode.subessay === 'proportionality-convergence' ) {
            var zebraColArr = ssD.zebraCols.multicolor;
        } else {
            var zebraColArr = ssD.zebraCols.monocolor;
        }

        ordBars.forEach( (bar, bix) => {
            if( bix === ordBars.length - 1 ) return; //last point has no bar

            //:calculates bar vertices
            var p1X         = bar.pos[0];                //left-bar side coordinate x
            var p2X         = ordBars[ bix+1 ].pos[0];   //right-bar side coordinate x
            var p2minus1    = p2X - p1X;


            if( !BAR_RATIO_CONVERGES ) {
                //this correction is too complex with convergence,
                //empty bars are better to skip
                //this works: if( p2minus1 < 0.001 ) {
                if( p2minus1 < 0.00001 ) {
                    //ccc( 'skipped bix', bix )
                    return;
                }
            }

            if( BAR_RATIO_CONVERGES ) {
                if( left0right !== 'left' ) {
                    ////this is manually made scenario of bars area converging to
                    ////given ratio: equal color bars do converge to each other ...

                    ////the distortion is "applied" to right figure bars,
                    ////odd bars are shortened along x, even increased,
                    if( !(bix%2) ) {
                        if( bix < ordBars.length - 3 ) {
                            p2X -= p2minus1 * distortion;
                        }
                    } else if( bix < ordBars.length - 2 ) {
                        p1X -= (p1X - ordBars[bix-1].pos[0]) * distortion;
                    }
                }
            }

            var leftFun     = ssD.repoConf[0].fun( p1X )[1];        
            var rightFun    = ssD.repoConf[0].fun( p2X )[1];        

            //this is a correct method for monotonic functions
            //var min = Math.min( leftFun, rightFun );
            //but we need more elaborated calculation of minimum
            var [ barLeadLevel, fSum, barArea ] = calculatesInscribedLevel( p1X, p2X );
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
            //-------------------------------------------------------
        });


        toreg( 'barRatioMax' );
        toreg( 'barRatioMin' );
        if( BAR_RATIO_CONVERGES ) {
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
        }

        if(
            doBar2BarStats &&
            left0right !== 'left'
        ) {
            rg.convergenceGraphFW.callPHGraph({
                graphArray,
            })
        }
    }
    //=========================================================
    // \\// calculates figure, bars areas
    //=========================================================




    /// calculates leading-level-of-inscribed-bar
    /// todm ... shoulbe in model and not be executed
    ///          for transforms of left side and for
    ///          operations which do not change
    ///          left-side-figure and its bar-partition,
    function calculatesInscribedLevel(
        p1X,         //left-bar side coordinate x
        p2X,         //right-bar side coordinate x
    ){
        var STEPS_MIN = 2;
        var baseL   = p2X - p1X;
        var STEPS   = Math.max( STEPS_MIN, Math.ceil( baseL / ssD.integrationStep ) );
        var step    = baseL / STEPS;
        var funct   = ssD.repoConf[0].fun;
        var leftFun = funct( p1X )[1];
        var posX    = p1X;
        var level   = leftFun;

        var fSum    = 0;
        for( var i = 0; i <= STEPS; i++ ) {
            var fun = funct( posX )[1];        

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

