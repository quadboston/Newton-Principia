( function() {
    var {
        nsmethods,
        haz,
        nssvg,
        $$,
    } = window.b$l.nstree();
    nsmethods.createsGraphFramework = createsGraphFramework;
    return;










    ///==========================================
    /// API engine
    ///==========================================
    function createsGraphFramework({
            parent,
            svgWidthCssValue,
            svgHeightCssValue,
            dimX,   //svg inner width in svg-ViewBox
            dimY,   //svg inner height in svg-ViewBox
    }){
        var graphFM_self = { gmedia$ : null, gridIsPainted : false };
        creates_svgDomEl();

        //todm: way to go to speed up graphs
        //var polylinesLablesSVGs$ = [];
        var plotIx2plotSvg = graphFM_self.plotIx2plotSvg = [];
        graphFM_self.drawGraph              = drawGraph;
        graphFM_self.nonefyDom              = nonefyDom;
        graphFM_self.changesInnerDimensions = changesInnerDimensions;
        return graphFM_self;




        ///==========================================
        /// API engine
        ///==========================================
        function drawGraph({
                //first array mast be enabled
                graphArrayMask,

                //first index along the path, next=number of plots
                graphArray,
                
                colorThreadArray,
                style,


                //optional, if not set will be found,
                //does not find yMin, yMax for each single function y(x), finds
                //only for an entire population of functions y(x),
                xMin,
                xMax,
                yMin,
                yMax,
                //yRangeFromAverageY //todm a flage to set meaningful y-max,

                xRangeFilter,   //optional, restricts data arrays: ignores abscissas out of
                                //prescribed range
                drawDecimalY,
                drawDecimalX,
                doSideAxes,
                printAxisDigits,
                    printAxisXDigits,
                    printAxisYDigits,
                
                axisX,      //optional, set to default if missed, API is as in default below
                axisY,      //optional, set to default if missed, API is as in default below
                axisYLegend,
                axisXLegend,
                title,
                drawAllAxes,
                plotsCount_overrider,
                plotsPars,
                doTruncateOutOfRangeY,
                doPaintGridOnlyOnce,
                doDrawToolline,
                brightenGrid,
        }){
            style = style || {};
            //nonefyDom();
            //creates_svgDomEl();
            //perhaps too expensive ... we already do reattach plots later, but not
            //preserve grid yet .. but grid is a hell expesive ... plot is nothing,
            graphFM_self.gmedia$.css( 'display', 'block' );
            if( !doPaintGridOnlyOnce || !graphFM_self.gridIsPainted ) {
                graphFM_self.gmedia$.html( '' );
            }
            var polylines = [];
            var rangeX;
            var find_xMin = typeof xMin === 'undefined';
            var find_xMax = typeof xMax === 'undefined';
            var find_yMin = typeof yMin === 'undefined';
            var find_yMax = typeof yMax === 'undefined';
            var find_y    = find_yMin || find_yMax;
            var doFind    = find_xMin || find_xMax || find_y;
            //----------------------------------------------
            // //\\ finds number of polylines
            //      plotsScaffold - format definition
            //----------------------------------------------
            var plotsScaffold = [];
            graphArray.forEach( (points,pix) => {
                //"undefined", '' skipped
                //they are skipped anyway:
                //if( !points ) return;
                points.y.forEach( (pointY,yix) => {
                    if( graphArrayMask && !graphArrayMask[yix] ) return;
                    plotsScaffold[ yix ] = plotsScaffold[ yix ] || [];
                    // plotsScaffold - format definition
                    plotsScaffold[ yix ].push( [points.x, pointY] );
                });
            });
            var plotsCount = plotsScaffold.length;
            plotsCount = plotsCount_overrider || plotsCount;
            var plotCurvesCount = plotsCount;
            //----------------------------------------------
            // \\// finds number of polylines
            //----------------------------------------------



            //----------------------------------------
            // //\\ autosets x and y ranges preventing
            //      x and y to go outside dimX, dimY
            //----------------------------------------
            if( doFind ) {
                graphArray.forEach( (points,pix) => {
                    //"undefined", null, '' skipped
                    if( !points ) return;
                    if( find_xMin ) {
                        if( typeof xMin === 'undefined' ) {
                            xMin = points.x;
                        }
                    }
                    if( find_xMax ) {
                        if( typeof xMax === 'undefined' ) {
                            xMax = points.x;
                        }
                    }
                    if( find_yMin ) {
                        if( typeof yMin === 'undefined' ) {
                            yMin = points.y[0];
                        }
                    }
                    if( find_yMax ) {
                        if( typeof yMax === 'undefined' ) {
                            yMax = points.y[0];
                        }
                    }
                    if( find_xMin && xMin > points.x ) {
                        xMin = points.x;
                    }
                    if( find_xMax && xMax < points.x ) {
                        xMax = points.x;
                    }

                    if( find_y ) {
                        points.y.forEach( (pointY,yix) => {
                            if( graphArrayMask && !graphArrayMask[yix] ) return;
                            if( find_yMin && yMin > pointY ) {
                                yMin = pointY;
                            }
                            if( find_yMax && yMax < pointY ) {
                                yMax = pointY;
                            }
                        });
                    }
                });
            }
            if( typeof yMin === 'undefined' ) return; //bs of empty array
            //todm patch
            var rangeX = xMax - xMin;
            var rangeY = yMax - yMin;
            var SMALLNESS = 1e-150;
            if( Math.abs( rangeX ) < SMALLNESS ) {
                rangeX =  rangeX < 0 ? -SMALLNESS : SMALLNESS;
                xMax = xMin + rangeX;
            }
            if( Math.abs( rangeY ) < SMALLNESS ) {
                rangeY =  rangeY < 0 ? -SMALLNESS : SMALLNESS;
                yMax = yMin + rangeY;
            }
            //----------------------------------------
            // \\// autosets x and y ranges preventing
            //----------------------------------------




            if( doSideAxes ) {

                //shrinks graph area to leave space for axes
                var SHRINK_RATIO = 0.2;
                var marginY = dimY * SHRINK_RATIO / 2;
                var marginX = dimX * SHRINK_RATIO / 2;
                var dimY_withMarg = dimY - marginY*2;
                var dimX_withMarg = dimX - marginX*2;
                if( drawAllAxes ) {
                    ////possibly decreases available plotsCount from available
                    ////graph container width
                    var extraAxisWidth = marginX/2 * (plotsCount-1);
                    if( extraAxisWidth > dimX_withMarg/2 ) {
                        plotsCount = Math.floor( (dimX_withMarg/2) / (marginX/2) + 1 );
                        extraAxisWidth = marginX/2 * (plotsCount-1);
                    }
                    dimX_withMarg -= extraAxisWidth;
                }

            } else {
                var marginY = 0;
                var marginX = 0;
                var dimY_withMarg = dimY;
                var dimX_withMarg = dimX;
            }

            //==================================================
            // //\\ converts graphArray to polylines
            //==================================================
            ///effective polylines - masked lines are erased,
            ///
            ///note: this must work for sparse array too
            graphArray.forEach( (points,pix) => {
                //"undefined", null, '' skipped
                if( !points ) return;

                var x = points.x;
                var mediaX = marginX + (points.x - xMin) / rangeX * dimX_withMarg;
                if( xRangeFilter ) {
                    if( x < xRangeFilter.min ) return;
                    if( x > xRangeFilter.max ) return;
                }
                //masks makes polylines[ yix ] undefined where yix has empty mask
                points.y.forEach( (pointY,yix) => {
                    
                    //creates holes in polylines array
                    if( graphArrayMask && !graphArrayMask[yix] ) return;

                    if( plotCurvesCount <= yix ) return;
                    if( doTruncateOutOfRangeY && ( pointY < yMin || pointY > yMax ) ) {
                        return;
                    }
                    var mediaY = marginY + dimY_withMarg -
                                 ( pointY - yMin ) / rangeY * dimY_withMarg;
                    //makes holes in array:
                    polylines[ yix ] = polylines[ yix ] || [];
                    polylines[ yix ].push( [ mediaX, mediaY ] );
                });
            });
            //==================================================
            // \\// converts graphArray to polylines
            //==================================================

            if( !graphFM_self.gridIsPainted ) {
                nsmethods.drawGrid8Axes({
                    graphFM_self,
                    colorThreadArray,
                    marginX,
                    marginY,
                    printAxisDigits,

                    printAxisXDigits,
                    printAxisYDigits,
                    
                    drawDecimalX,
                    drawDecimalY,
                    rangeY,
                    rangeX,
                    axisX,
                    axisY,
                    yMax,
                    yMin,
                    xMax,
                    xMin,
                    dimX_withMarg,
                    dimY_withMarg,

                    drawAllAxes,    //flag and its params
                        plotsScaffold, //optional flag to draw extra Y-axes
                        plotsCount,
                    brightenGrid,
                });
                nsmethods.drawGraphLegend({
                    graphFM_self,
                    axisXLegend,
                    axisYLegend,
                    dimX_withMarg,
                    marginX,
                    dimY_withMarg,
                    marginY,
                });
                if( doPaintGridOnlyOnce ) {
                    graphFM_self.gridIsPainted = true;
                }
            }

            //======================================================
            // //\\ draws svg-plots from polylines
            //======================================================
            let gMedia = graphFM_self.gmedia$();
            polylines.forEach( (pl,plix) => {
                if( !pl ) return;
                var effStyle = Object.assign( {}, style );
                effStyle.stroke = colorThreadArray[ plix ];
                var plotStyle = haz( plotsPars && plotsPars[ plix ], 'plotStyle' );
                if( plotStyle ) {
                    Object.assign( effStyle, plotStyle );
                }
                let svg = plotIx2plotSvg[ plix ];
                svg = plotIx2plotSvg[ plix ] = nssvg.polyline({
                    svgel : svg,
                    pivots  : pl,
                    parent  : gMedia,
                    style   : effStyle,
                });
                if( !svg.parentNode ) {
                    //todo why parent is always lost?
                    //ccc( plix+' lost' );
                    //if( svg ) {
                    ////todm why?
                    ////???? adding plot created at the previous graph call
                    gMedia.appendChild( svg );
                }
                /*
                if( plix === 0 ) {
                    if( svg.parentNode !== pervParent ) {
                        ccc( 'not equal' );
                    }
                    pervParent = svg.parentNode;
                }
                */
            });
            //ccc( plotIx2plotSvg );
            //======================================================
            // \\// draws svg-plots from polylines
            //======================================================


            //======================================================
            // //\\ user plotPars to legens and more
            //======================================================
            ///unmasked, full length array for all plots
            if( plotsPars ) {
                plotsPars.forEach( (pp,pix) => {
                    var ownPolyline = polylines[ pix ];

                    //occasionally and conveniently there can be more labels,
                    //just skip them:
                    //if( typeof ownPolyline === 'undefined' ) return;
                    if( !ownPolyline ) return;

                    var xIndex = Math.floor( ( ownPolyline.length - 0.001 ) * pp.fraqX );
                    xIndex = Math.min( ownPolyline.length-1, xIndex );
                    var [ mediaX, mediaY ] = ownPolyline[ xIndex ];
                    //polylinesLablesSVGs$[ pix ] = 
                    pp.svgTextEl = nssvg.printText({
                        svgel   : !doPaintGridOnlyOnce ? null : haz( pp, 'svgTextEl' ),
                        text    : pp.pcaption,
                        x       : mediaX + pp.fontShiftX,
                        y       : mediaY + pp.fontShiftY,
                        parent  : graphFM_self.gmedia$(),
                        //svgel   : polylinesLablesSVGs$[ pix ],
                        style   : Object.assign( {
                                        stroke : colorThreadArray[ pix ],
                                        fill : colorThreadArray[ pix ],
                                      },
                                      pp.style
                                  ),  
                    });
                });
            }
            //======================================================
            // \\// user plotPars to legens and more
            //======================================================

            if( doDrawToolline ) {
                nsmethods.drawToolline({
                    polylines,
                    graphFM_self,
                    graphArray,

                    colorThreadArray,
                    marginX,
                    marginY,

                    rangeY,
                    rangeX,

                    yMax,
                    yMin,
                    xMax,
                    xMin,

                    dimB : dimY_withMarg,
                    dimA : dimX_withMarg,
                    toollineStyle : doDrawToolline.toollineStyle,
                    abscissaIxValue : doDrawToolline.abscissaIxValue,
                    numberMarks : doDrawToolline.numberMarks,
                });
            }
            return;
        }



        //==================================================
        // //\\ builds svg-graph-container
        //==================================================
        function creates_svgDomEl()
        {
            var g$ = graphFM_self.gmedia$ = $$.svg()
                .to( parent )
                ;
            if( typeof svgWidthCssValue !== 'undefined' ) {
                g$.css( 'width', svgWidthCssValue );
            }
            if( typeof svgHeightCssValue !== 'undefined' ) {
                g$.css( 'height', svgHeightCssValue );
            }
            g$.aNS(
                'viewBox', '0 0 ' +
                dimX + ' ' +
                dimY
            );
            g$.aNS( 'preserveAspectRatio', "xMidYMid meet" );
        }
        //==================================================
        // \\// builds svg-graph-container
        //==================================================




        ///==========================================
        /// resizing helper
        ///==========================================
        function changesInnerDimensions({
            dimXnew,
            dimYnew,
        }){
            dimX = dimXnew;
            dimY = dimYnew;
            ///secures the case if no media yet exists
            var gm$ = haz( graphFM_self, 'gmedia$' );
            if( gm$ ) {
                gm$.aNS( 'viewBox', '0 0 ' +
                         dimXnew.toFixed() + ' ' + dimYnew.toFixed() );
            }
        }


        ///==========================================
        /// cleanup helper
        ///==========================================
        function nonefyDom()
        {
            graphFM_self.gmedia$ && graphFM_self.gmedia$.css( 'display', 'none' );
        }
    }

}) ();

