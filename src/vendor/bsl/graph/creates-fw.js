( function(){
    const {sn, $$, nsmethods, haz, nssvg, } = window.b$l.nstree();
    nsmethods.createsGraphFW = createsGraphFW;
    let FW_ID_INDEX = 0;
    return;


    //functional class constructor
    function createsGraphFW ( gwrap ){
        ///API
        const {
            parent,
            svgWidthCssValue,
            svgHeightCssValue,
            dimX,   //svg inner width in svg-ViewBox
            dimY,   //svg inner height in svg-ViewBox
        } = gwrap;
        //auto-generates own cssid if missed
        let cssid = sn( 'cssid', gwrap, 'graph-fw-'+(FW_ID_INDEX++) );

        var fw_self = { gmedia$ : null, gridIsPainted : false };
        creates_svgDomEl();
        fw_self.gmedia$
            .css( 'z-index', 100 )
            .cls( cssid );
        var pix2psvg = fw_self.pix2psvg = [];
        ///sets externally accessible methods:
        fw_self.meth = {
            drawGraph,
            nonefyDom,
            changesInnerDimensions,
            resetsGraph : () => {},
        };
        ///sets externally accessible properties:
        fw_self.content = {
            pix2mask : [],
            pix2values : [],
            pix2color : [],
            pix2tpcls : [],
            style : {},
        };
        gwrap.fw = fw_self;
        return fw_self;


        function drawGraph({
            //optional, if not set will be found,
            //does not find yMin, yMax for each
            //single function y(x), finds
            //only for an entire population of functions y(x),
            xMin,
            xMax,
            yMin,
            yMax,
            //yRangeFromAverageY //todm a flage to
            //set meaningful y-max,

            //optional, restricts data arrays:
            //ignores abscissas out of
            //prescribed range
            xRangeFilter,
            drawDecimalY,
            drawDecimalX,
            doSideAxes,
            printAxisDigits,
                printAxisXDigits,
                printAxisYDigits,
            //optional, set to default if missed,
            //API is as in default below
            axisX,
            //optional, set to default if missed,
            //API is as in default below
            axisY,
            axisYLegend,
            axisXLegend,
            title,
            drawAllAxes,
            plotsCount_overrider,
            plotsPars,  //curveLabels
            doTruncateOutOfRangeY,
            doPaintGridOnlyOnce,
            doDrawToolline,
            brightenGrid,
        }){
            const content = fw_self.content;
            const pix2values = content.pix2values;
            const graphlen = pix2values.length;
            if( graphlen === 0 ) return;

            const pix2mask = content.pix2mask;
            const pix2color = content.pix2color;
            const pstyle = content.style;
            //==================================
            // //\\ sets defaults if missed
            //==================================
            if( pix2mask.length === 0 ){
                ////if no mask, draws all
                const graphlen = pix2values.length;
                for( let ix=0; ix<graphlen; ix++ ){
                    if( pix2values[ix] ){
                        pix2values[ix].y.forEach( (v,ix) => {
                            pix2mask[ix] = true;
                        });
                        break;
                    }
                }
            }
            if( pix2color.length === 0 ){
                ////if no colors, draws black
                for( let ix=0; ix<graphlen; ix++ ){
                    if( pix2values[ix] ){
                        pix2values[ix].y.forEach( (v,ix) => {
                            pix2color[ix] = 'rgb(0.0.0)';
                        });
                        break;
                    }
                }
            }
            //==================================
            // \\// sets defaults if missed
            //==================================

            fw_self.gmedia$.css( 'display', 'block' );
            if( !doPaintGridOnlyOnce || !fw_self.gridIsPainted ){
                //perhaps too expensive ... we already do
                //reattach plots later, but not
                //preserve grid yet .. but grid is a
                //hell expesive ... plot is nothing,
                fw_self.gmedia$.html( '' );
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
            pix2values.forEach( (points,pix) => {
                //"undefined", '' skipped
                //they are skipped anyway:
                //if( !points ) return;
                points.y.forEach( (pointY,yix) => {
                    if( !pix2mask[yix] ) return;
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
                pix2values.forEach( (points,pix) => {
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
                            if( pix2mask && !pix2mask[yix] ) return;
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
            // //\\ converts pix2values to polylines
            //==================================================
            ///effective polylines - masked lines are erased,
            ///
            ///note: this must work for sparse array too
            pix2values.forEach( (points,pix) => {
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
                    if( !pix2mask[yix] ) return;

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
            // \\// converts pix2values to polylines
            //==================================================

            if( !fw_self.gridIsPainted ) {
                nsmethods.drawGrid8Axes({
                    fw_self,
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
                    fw_self,
                    axisXLegend,
                    axisYLegend,
                    dimX_withMarg,
                    marginX,
                    dimY_withMarg,
                    marginY,
                });
                if( doPaintGridOnlyOnce ) {
                    fw_self.gridIsPainted = true;
                }
            }

            //======================================================
            // //\\ draws svg-plots from polylines
            //======================================================
            const pix2bc = fw_self.content.pix2tpcls;
            let gMedia = fw_self.gmedia$();
            //polylines is usually a small number of graph curved lines
            //and polylines have common index with pix2color and
            //with plotsPars,
            polylines.forEach( (pl,plix) => {
                if( !pl ) return;
                var effStyle = Object.assign( {}, pstyle );
                effStyle.stroke = pix2color[ plix ];
                var plotStyle = haz( plotsPars && plotsPars[ plix ], 'plotStyle' );
                if( plotStyle ) {
                    Object.assign( effStyle, plotStyle );
                }
                let svg = pix2psvg[ plix ];
                svg = pix2psvg[ plix ] = nssvg.polyline({
                    svgel : svg,
                    pivots  : pl,
                    parent  : gMedia,
                    style   : effStyle,
                });
                //hoverizing
                let csscls = (plotsPars && haz( plotsPars[plix], 'class' ))
                    || pix2bc[plix] || '';
                if( csscls ){
                    $$.$( svg ).addClass( csscls + ' hover-width tostroke');
                }
            });
            //======================================================
            // \\// draws svg-plots from polylines
            //======================================================

            //======================================================
            // //\\ user plotPars to legens and more
            //======================================================
            ///unmasked, full length array for all plots
            if( plotsPars ) {//curveLabels
                const pix2bc = fw_self.content.pix2tpcls;
                plotsPars.forEach( (pp,pix) => {//curveLabels
                    var ownPolyline = polylines[ pix ];

                    //occasionally and conveniently there can be more labels,
                    //just skip them:
                    //if( typeof ownPolyline === 'undefined' ) return;
                    if( !ownPolyline ) return;

                    var xIndex = Math.floor( ( ownPolyline.length - 0.001 ) * pp.fraqX );
                    xIndex = Math.min( ownPolyline.length-1, xIndex );
                    var [ mediaX, mediaY ] = ownPolyline[ xIndex ];

                    let txtarg = {
                        svgel   : !doPaintGridOnlyOnce ? null : haz( pp, 'svgTextEl' ),
                        innerHTML : pp.pcaption,
                        x       : mediaX + pp.fontShiftX,
                        y       : mediaY + pp.fontShiftY,
                        parent  : fw_self.gmedia$(),
                        //svgel   : polylinesLablesSVGs$[ pix ],
                        style   : Object.assign( {
                                        stroke : pix2color[ pix ],
                                        fill : pix2color[ pix ],
                                      },
                                      pp.style
                                  ),
                    };
                    //hoverizing
                    let csscls = haz( pp, 'class' ) || pix2bc[pix] || '';
                    if( csscls ){
                        //here is a default 'tobold' flag is added,
                        //tobold is a hard-coded defaut flag here,
                        txtarg['class'] = csscls + ' hover-width tostroke tobold';
                    }
                    pp.svgTextEl = nssvg.printTextInnerHTML(txtarg);
                });
            }
            //======================================================
            // \\// user plotPars to legens and more
            //======================================================

            if( doDrawToolline ) {
                nsmethods.drawToolline({
                    polylines,
                    plotsPars, //curveLabels
                    fw_self,
                    pix2values,

                    pix2color,
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
            var g$ = fw_self.gmedia$ = $$.svg()
                .to( parent )
                .addClass( 'graph-box-svg' )
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
            var gm$ = haz( fw_self, 'gmedia$' );
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
            fw_self.gmedia$ && fw_self.gmedia$.css( 'display', 'none' );
        }
    }
})();