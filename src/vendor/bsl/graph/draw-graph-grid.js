( function() {
    var {
        ns, sn, nsmethods, haz, nssvg, $$,
    } = window.b$l.nstree();
    nsmethods.drawGrid8Axes = drawGrid8Axes;
    nsmethods.drawToolline = drawToolline;
    return;











    ///==========================================
    /// API engine
    /*
    todm
    Extra axes should have own values, not only grid values.
                      own min and max
    */
    ///==========================================
    function drawGrid8Axes({
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
        brightenGrid,   //how much to brighten, 1 and 'undefined' for non-brighting
                        //from 0 to 1, 0 for hiding,
        //:optionals
        drawAllAxes,    //flag and its params
            plotsScaffold, //optional flag to draw extra Y-axes
            plotsCount,
            extraAxisY,
    }){
        brightenGrid = typeof brightenGrid === 'undefined' ? 1 : brightenGrid;
        //======================================================
        // //\\ axisX, axisY API
        //      todo NEED function in bsl
        //      npaste only first level props
        //------------------------------------------------------
        axisX = Object.assign(
            {
                'font-size'     : '20px',
                'font-weight'   : 'normal',
                fontShiftX      : -12, //in media scale
                fontShiftY      : +14,
                decimalDigits   : 1,
                stroke          : 'black', //optional
                fill            : 'black', //optional
                'stroke-width'  : '0.2',   //optional
            },
            axisX || {},
        );
        axisY = Object.assign(
            {
                'font-size'     : '20px',
                'font-weight'   : 'normal',
                fontShiftX      : -45, //in media scale
                fontShiftY      : +5,
                decimalDigits   : 1,
                stroke          : 'black', //optional
                fill            : 'black', //optional
                'stroke-width'  : '0.2',   //optional
            },
            axisY || {},
        );

        extraAxisY = Object.assign(
            {
                'font-size'     : '15px',
                'font-weight'   : 'normal',
                fontShiftX      : -45, //in media scale
                fontShiftY      : +5,
                decimalDigits   : 3,
                stroke          : 'black', //optional
                fill            : 'black', //optional
                'stroke-width'  : '0.1',   //optional
            },
            extraAxisY || {},
        );
        //------------------------------------------------------
        // \\// axisX, axisY API
        //------------------------------------------------------

        if( drawDecimalY && rangeY > 1e-100 ) {
            drawX0Ygrid({
                gridAlongY : true,
                axisA : axisY,
                maxA : yMax,
                minA : yMin,
                maxB : xMax,
                minB : xMin,
                dimB : dimX_withMarg,
                dimA : dimY_withMarg,
                rangeA : rangeY,
                subDecimal : true,

                drawAllAxesInGrid : drawAllAxes,    //flag and its params
                    plotsCount,
                    extraAxisY,
                    colorThreadArray,
            });
        }
        if( drawDecimalX && rangeX > 1e-100 ) {
            drawX0Ygrid({
                gridAlongY : false,
                axisA : axisX,
                maxA : xMax,
                minA : xMin,
                maxB : yMax,
                minB : yMin,
                dimB : dimY_withMarg,
                dimA : dimX_withMarg,
                rangeA : rangeX,
                subDecimal : true,
            });
        }
        return;





        ///======================================================
        /// generic: draws x or y grid and axes
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
            drawAllAxesInGrid,
                plotsCount,
                extraAxisY,
                colorThreadArray,
        }){
            var style = {};

            ////Nesessity for legacy code makes this "if"
            ////so complex.
            if( gridAlongY ) {
                if( typeof printAxisYDigits === 'undefined' ){
                    var prnDigitalSymbols = printAxisDigits;
                } else {
                    var prnDigitalSymbols = printAxisYDigits;
                }
            } else {
                if( typeof printAxisXDigits === 'undefined' ){
                    var prnDigitalSymbols = printAxisDigits;
                } else {
                    var prnDigitalSymbols = printAxisXDigits;
                }
            }
            
            var decUnitlog     = Math.max(
                Math.floor( Math.log10( rangeA ) ),
                Math.floor( Math.log10( Math.abs( minA ) ) - 13 ),
            );
            var decUnit    = Math.pow( 10, decUnitlog );
            decUnit        = decUnit > rangeA * 0.5 ? decUnit * 0.1 : decUnit;
            style.stroke = 'rgba( 0,0,0, ' + ( brightenGrid.toFixed(3) ) + ')';

            drawGrid8Axes_aux({ prnAxisDigits : prnDigitalSymbols });
            if( subDecimal ) {
                var decUnit  = decUnit * 0.1;

                style.stroke = 'rgba( 0,0,0, ' + ( 0.2*brightenGrid.toFixed(3) ) + ')';
                drawGrid8Axes_aux({ drawSubdecimal : true });
            }
            return;

            function drawGrid8Axes_aux({ prnAxisDigits, drawSubdecimal })
            {
                var linesStart = Math.ceil( minA / decUnit ) * decUnit;

                //:for dence x labels protection:
                //:makes caliber sparser
                var gcount = 0;
                var labelCountEstimation = Math.floor( ( maxA - linesStart ) / decUnit );

                for( var gline=linesStart; gline<=maxA; gline+=decUnit ) {



                    //======================================================
                    // //\\ prepares grid and axes params
                    //======================================================
                    //l_media is a value of static-part of the grid line:
                    //for "gridAlongX", the line is horizontal, and l_media is an y-coordinate
                    var l_media = ( gline - minA ) / rangeA * dimA;

                    if( gridAlongY ) {
                        l_media = marginY + dimA - l_media;
                    } else {
                        l_media += marginX;
                    }
                    var labelForbidden = labelCountEstimation > 3 && !(gcount%2);

                    //dimB is live len, no any margins or idle fields,
                    //gridAlongY: paint horizontal lines indexed along axis y
                    var horizontAxisEndX = marginX + dimB;
                           //creates unncessary details:
                               //gridAlongY && drawAllAxesInGrid && !drawSubdecimal?
                               //marginX*2 + dimB :
                               //marginX + dimB;
                    var pivots = gridAlongY ?
                            [ [ marginX, l_media ], [ horizontAxisEndX, l_media ], ]
                            :
                            [ [ l_media, marginY ], [ l_media, marginY + dimB  ], ]
                            ;
                    //======================================================
                    // \\// prepares grid and axes params
                    //======================================================


                    //======================================================
                    // //\\ prints grid lines
                    //======================================================
                    nssvg.polyline({
                        pivots,
                        parent  : graphFM_self.gmedia$(),
                        style,
                    });
                    //======================================================
                    // \\// prints grid lines
                    //======================================================



                    //======================================================
                    // //\\ prints axes digits
                    //======================================================
                    var EXTRA_AXIS_OFFSET_STEP = marginX/2;
                    var EXTRA_AXIS_DIGITS = 3;
                    if( prnAxisDigits ) {
                        var axesCount = drawAllAxesInGrid && gridAlongY ? plotsCount : 1;
                        for( var aIx=0; aIx<axesCount; aIx++ ) {
                            var effectiveAxis = axisA;

                            var fontStroke = drawAllAxesInGrid ?
                                                colorThreadArray[ aIx ] : axisA[ 'stroke' ];
                            var fontFill = drawAllAxesInGrid ?
                                                colorThreadArray[ aIx ] : axisA[ 'fill' ];

                            if( gridAlongY ) {
                                ////we have horiz. line, putting a serie of dig.
                                ///at its end,
                                if( aIx === 0 ) {
                                    var x = pivots[0][0] + axisA.fontShiftX;
                                } else {
                                    var effectiveAxis = extraAxisY;
                                    var fontStroke = colorThreadArray[ aIx ];
                                    var fontFill = colorThreadArray[ aIx ];
                                    var x = pivots[0][0] + marginX + 
                                            dimB + (aIx-1) * EXTRA_AXIS_OFFSET_STEP +
                                            effectiveAxis.fontShiftX;
                                }
                                var y = pivots[0][1] + effectiveAxis.fontShiftY;
                            } else {
                                var x = pivots[1][0] + effectiveAxis.fontShiftX;
                                var y = pivots[1][1] + effectiveAxis.fontShiftY;
                            }
                            ///forbids too dence marks along axis x
                            if( !labelForbidden ) {

                                var decimalDigits = aIx === 0 ?
                                        effectiveAxis.decimalDigits :
                                        EXTRA_AXIS_DIGITS;
                                nssvg.printText({
                                    text : gline.toFixed( decimalDigits ),
                                    x,
                                    y,
                                    parent  : graphFM_self.gmedia$(),
                                    style   : {
                                                'font-size'     : effectiveAxis[ 'font-size' ],
                                                'font-weight'   : effectiveAxis[ 'font-weight' ],
                                                'stroke-width'  : effectiveAxis[ 'stroke-width' ],
                                                'stroke'        : fontStroke,
                                                'fill'          : fontFill,
                                    },
                                });
                            }
                        }
                    }
                    gcount++;
                    //======================================================
                    // \\// prints axes digits
                    //======================================================
                }
            }
        }
    }




    ///======================================================
    /// generic: draws x or y grid and axes
    ///======================================================
    function drawToolline({
        polylines,
        graphFM_self,
        graphArray,
        abscissaIxValue,

        colorThreadArray,
        marginX,
        marginY,

        rangeY,
        rangeX,

        yMax,
        yMin,
        xMax,
        xMin,

        dimB,
        dimA,
        toollineStyle,
        numberMarks, //see //number Marks api
    }){
        toollineStyle = toollineStyle || {};
        sn( 'stroke', toollineStyle, 'rgba( 0,0,0, 1 )' );
        var graphElement = graphArray[ Math.floor( abscissaIxValue ) ];
        var svgParent = graphFM_self.gmedia$();

        var l_media = marginX + ( graphElement.x - xMin ) / rangeX * dimA;
        var pivots = [ [ l_media, marginY ], [ l_media, marginY + dimB ], ];

        //======================================================
        // //\\ prints toolline
        //======================================================
        nssvg.polyline({
            pivots,
            parent  : graphFM_self.gmedia$(),
            style : toollineStyle,
        });
        //======================================================
        // \\// prints toolline
        //======================================================



        //======================================================
        // //\\ prints numerical labels
        //======================================================
        if( numberMarks ) {
            if( !Array.isArray( numberMarks ) ) {
                ///can make space array
                numberMarks = graphElement.y.map( (yEl,yix) => (
                    //number Marks api
                    {
                        graphIx : yix,
                        decimalDigits : 2,
                        fontSize : 22,
                        fontFill : colorThreadArray[ yix ],
                        fontWeight : 'normal',
                        strokeWidth : 0.1,
                    }
                ));
            }
            ///prints labels only on live numberMarks
            numberMarks.forEach( (nm,nmix) => {
                if( !polylines[nmix] ) return;
                var gix = nm.graphIx;
                var decimalDigits = nm.decimalDigits;
                var nmVal = graphElement.y[ gix ];
                var x = l_media;
                var y = marginY + dimB - ( nmVal - yMin ) / rangeY * dimB;

                nssvg.printText({
                    text : nmVal.toFixed( decimalDigits ),
                    x,
                    y,
                    parent  : graphFM_self.gmedia$(),
                    style   : {
                                'font-size'     : nm.fontSize,
                                'font-weight'   : nm.fontWeight,
                                'stroke-width'  : nm.strokeWidth,
                                'stroke'        : nm.fontFill,
                                'fill'          : nm.fontFill,
                    },
                });
            });
        }
        //======================================================
        // \\// prints numerical labels
        //======================================================
    }

}) ();

