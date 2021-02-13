( function() {
    var {
        ns,
        nsmethods,
        haz,
        ha,
        nssvg,
        $$,
    } = window.b$l.nstree();
    nsmethods.createsGraphFramework = createsGraphFramework;
    return;







    ///==========================================
    /// API engine
    ///==========================================
    function createsGraphFramework( arg )
    {
        var {
            parent,
            svgWidthCssValue,
            svgHeightCssValue,
            dimX,   //svg inner width in svg-ViewBox
            dimY,   //svg inner height in svg-ViewBox
        } = arg;

        var graphFM_self = { gmedia$ : null };

        //graphFM_self.creates_svgDomEl   = creates_svgDomEl;
        graphFM_self.drawGraph              = drawGraph;
        graphFM_self.removeFromDom          = removeFromDom;
        graphFM_self.changesInnerDimensions = changesInnerDimensions;
        return graphFM_self;




        ///==========================================
        /// API engine
        ///==========================================
        function drawGraph({
            graphArray,
            colorThreadArray,
            style,
            xMin,
            xMax,
            yMin,
            yMax,
            xRangeFilter,
            axisYy,
            drawDecimalY,
            drawDecimalX,
            doSideAxes,
            printAxisDigits,
            axisX,      //optional, set to default if missed, API is as in default below
            axisY,      //optional, set to default if missed, API is as in default below
            axisYLegend,
            axisXLegend,
            title,
        }){

            removeFromDom();
            creates_svgDomEl(); //perhaps too expensive ...

            var polylines = [];
            var rangeX;
            var find_xMin = typeof xMin === 'undefined';
            var find_xMax = typeof xMax === 'undefined';
            var find_yMin = typeof yMin === 'undefined';
            var find_yMax = typeof yMax === 'undefined';
            var find_y    = find_yMin || find_yMax;
            var doFind    = find_xMin || find_xMax || find_y;




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
                            if( typeof axisYy !== 'undefined' ) {
                                yMin = axisYy;
                            } else {
                                yMin = points.y[0];
                            }
                        }
                    }
                    if( find_yMax ) {
                        if( typeof yMax === 'undefined' ) {
                            if( typeof axisYy !== 'undefined' ) {
                                yMax = axisYy;
                            } else {
                                yMax = points.y[0];
                            }
                        }
                    }
                    if( find_xMin && xMin > points.x ) {
                        yMin = points.x;
                    }
                    if( find_xMax && xMax < points.x ) {
                        xMax = points.x;
                    }

                    if( find_y ) {
                        points.y.forEach( (pointY,yix) => {
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
            var rangeX = Math.max( 0.0000001, xMax - xMin );
            var rangeY = Math.max( 0.0000001, yMax - yMin );
            //----------------------------------------
            // \\// autosets x and y ranges preventing
            //----------------------------------------




            if( doSideAxes ) {
                //shrinks graph area to leave space for axes
                var SHRINK_RATIO = 0.2;
                var marginY = dimY * SHRINK_RATIO / 2;
                var marginX = dimX * SHRINK_RATIO / 2;
                dimY -= marginY*2;
                dimX -= marginX*2;
            } else {
                var marginY = 0;
                var marginX = 0;
            }



            ///converts graphArray to polylines
            graphArray.forEach( (points,pix) => {

                //"undefined", null, '' skipped
                if( !points ) return;

                var x = points.x;
                var mediaX = marginX + (points.x - xMin) / rangeX * dimX;
                if( xRangeFilter ) {
                    if( x < xRangeFilter.min ) return;
                    if( x > xRangeFilter.max ) return;
                }
                points.y.forEach( (pointY,yix) => {
                    var mediaY = marginY + dimY - ( pointY - yMin ) / rangeY * dimY;
                    polylines[ yix ] = polylines[ yix ] || [];
                    polylines[ yix ].push( [ mediaX, mediaY ] );
                });
            });



            style = style || {};

            //======================================================
            // //\\ draws axis y
            //      todm: outdated, do remove
            //======================================================
            if( typeof axisYy !== 'undefined' ) {
                style.stroke = 'rgba( 0,0,0, 1 )';
                var yY_media = marginY + dimY - ( axisYy - yMin ) / rangeY * dimY;
                var mediaXmin = 0;
                var mediaXmax = dimX;

                nssvg.polyline({
                    pivots  : [ [ marginX + mediaXmin, yY_media ],
                                [ marginX + mediaXmax, yY_media ],
                    ],
                    parent  : graphFM_self.gmedia$(),
                    style,
                });
            }
            //======================================================
            // \\// draws axis y
            //======================================================

            //======================================================
            // //\\ draws grid
            //======================================================
            //------------------------------------------------------
            // //\\ axisX, axisY API
            //      todo NEED function in bsl
            //      npaste only first level props
            //------------------------------------------------------
            axisX = Object.assign(
                {
                    'font-size'     : '20px',
                    fontShiftX      : -12, //in media scale
                    fontShiftY      : +14,
                    decimalDigits   : 1,
                    stroke          : 'black' //optional
                },
                axisX || {},
            );
            axisY = Object.assign(
                {
                    'font-size'     : '20px',
                    fontShiftX      : -45, //in media scale
                    fontShiftY      : +5,
                    decimalDigits   : 1,
                    stroke          : 'black' //optional
                },
                axisY || {},
            );
            {
            };
            //------------------------------------------------------
            // \\// axisX, axisY API
            //------------------------------------------------------

            if( drawDecimalY && rangeY > 1e-20 ) {
                drawX0Ygrid({
                    gridAlongY : true,
                    axisA : axisY,
                    maxA : yMax,
                    minA : yMin,
                    maxB : xMax,
                    minB : xMin,
                    dimB : dimX,
                    dimA : dimY,
                    rangeA : rangeY,
                    subDecimal : true,
                });
            }
            if( drawDecimalX && rangeX > 1e-20 ) {
                drawX0Ygrid({
                    gridAlongY : false,
                    axisA : axisX,
                    maxA : xMax,
                    minA : xMin,
                    maxB : yMax,
                    minB : yMin,
                    dimB : dimY,
                    dimA : dimX,
                    rangeA : rangeX,
                    subDecimal : true,
                });
            }
            //======================================================
            // \\// draws grid
            //======================================================


            //======================================================
            // //\\ draws legend
            //======================================================
            drawsLegendl({ legend : axisYLegend,  });
            drawsLegendl({ legend : axisXLegend, offset : {
                x : dimX + marginX,
                y : dimY + marginY,
            }});
            //======================================================
            // \\// draws legend
            //======================================================


            //======================================================
            // //\\ prints plots
            //======================================================
            polylines.forEach( (pl,plix) => {
                //pl.push( pl[0] ); //to close
                style.stroke = colorThreadArray[ plix  ];
                nssvg.polyline({
                    pivots  : pl,
                    parent  : graphFM_self.gmedia$(),
                    style,
                });
            });
            //======================================================
            // \\// prints plots
            //======================================================
            return;



            ///======================================================
            /// draws x or y grid
            ///======================================================
            function drawX0Ygrid({
                //A - main direction, like Y
                //B - secondary direction, like X
                gridAlongY,
                axisA,
                maxA,
                minA,
                maxB,
                minB,
                dimB,
                dimA,
                rangeA,
                subDecimal,
            }){
                var style = {};
                var decUnitlog = Math.log10( rangeA );
                decUnitlog     = Math.floor( decUnitlog );

                var decUnit    = Math.pow( 10, decUnitlog );
                decUnit        = decUnit > rangeA * 0.5 ? decUnit * 0.1 : decUnit;
                style.stroke = 'rgba( 0,0,0, 1 )';
                drawGrid({ prnAxisDigits : printAxisDigits });
                if( subDecimal ) {
                    var decUnit  = decUnit * 0.1;
                    style.stroke = 'rgba( 0,0,0, 0.2 )';
                    drawGrid({});
                }
                return;

                function drawGrid({ prnAxisDigits })
                {
                    var linesStart = Math.ceil( minA / decUnit ) * decUnit;
                    for( var gline=linesStart; gline<=maxA; gline+=decUnit ) {
                        var l_media = ( gline - minA ) / rangeA * dimA;
                        if( gridAlongY ) {
                            l_media = marginY + dimA - l_media;
                        } else {
                            l_media += marginX;
                        }
                        var pivots = gridAlongY ?
                                [ [ marginX, l_media ], [ marginX + dimB, l_media ], ]
                                :
                                [ [ l_media, marginY ], [ l_media, marginY + dimB  ], ]
                                ;
                        nssvg.polyline({
                            pivots,
                            parent  : graphFM_self.gmedia$(),
                            style,
                        });

                        //======================================================
                        // //\\ prints axes digits
                        //======================================================
                        if( prnAxisDigits ) {
                            if( gridAlongY ) {
                                var x = pivots[0][0] + axisA.fontShiftX;
                                var y = pivots[0][1] + axisA.fontShiftY;
                            } else {
                                var x = pivots[1][0] + axisA.fontShiftX;
                                var y = pivots[1][1] + axisA.fontShiftY;
                            }
                            nssvg.printText({
                                text : gline.toFixed( axisA.decimalDigits ),
                                x,
                                y,
                                parent  : graphFM_self.gmedia$(),
                                style   : {
                                            'font-size' : axisA[ 'font-size' ],
                                            'stroke'    : axisA[ 'stroke' ],
                                },
                            });
                        }
                        //======================================================
                        // \\// prints axes digits
                        //======================================================
                    }
                }
            }
        }


        //==================================================
        // //\\ draws x and y axes legends
        //==================================================
        function drawsLegendl({ legend, offset })
        {
            if( !legend ) return;
            offset = offset || { x:0, y:0 };
            legend.forEach( subLeg => {
                nssvg.printText({
                    text    : subLeg.text,
                    x       : offset.x + subLeg.x,
                    y       : offset.y + subLeg.y,
                    parent  : graphFM_self.gmedia$(),
                    style   : {
                        'font-size' : subLeg.style[ 'font-size' ],
                        'stroke' : subLeg.style[ 'stroke' ],
                    },
                });
            });
        }
        //==================================================
        // \\// draws x and y axes legends
        //==================================================


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
        function removeFromDom()
        {
            graphFM_self.gmedia$ && graphFM_self.gmedia$().remove();
            graphFM_self.gmedia$ = null;
        }
    }

}) ();

