( function() {
    var {
        ns,
        nsmethods,
        haz,
        nssvg,
        $$,
    } = window.b$l.nstree();
    nsmethods.createsGraphFramework_simple = createsGraphFramework_simple;
    return;







    ///==========================================
    /// API engine
    ///==========================================
    function createsGraphFramework_simple( arg )
    {
        var {
            parent,
            svgWidthCssValue,
            svgHeightCssValue,
            dimX,
            dimY,
        } = arg;

        var graphFM_self = { gmedia$ : null };

        //graphFM_self.creates_svgDomEl   = creates_svgDomEl;
        graphFM_self.drawGraph          = drawGraph;
        graphFM_self.removeFromDom      = removeFromDom;
        return graphFM_self;






        ///==========================================
        /// API engine
        ///==========================================
        function drawGraph({
            graphArray,
            pix2color,
            style,
            xMin,
            xMax,
            yMin,
            yMax,
            xRangeFilter,
        }){

            removeFromDom();
            creates_svgDomEl(); //perhaps too expensive ...

            var polylines = [];
            var rangeX;
            var findX = typeof xMin === 'undefined';
            var findY = typeof yMin === 'undefined';

            //----------------------------------------
            // //\\ autosets x and y ranges preventing
            //      x and y to go outside dimX, dimY
            //----------------------------------------
            if( findY || findX ) {
                graphArray.forEach( (points,pix) => {
                    //"undefined", null, '' skipped
                    if( !points ) return;
                    if( findX ) {
                        if( typeof xMin === 'undefined' ) {
                            xMin = points.x;
                            xMax = points.x;
                        }
                        if( xMin > points.x ) {
                            xMin = points.x;
                        }
                        if( xMax < points.x ) {
                            xMax = points.x;
                        }
                    }
                    if( findY ) {
                        if( typeof yMin === 'undefined' ) {
                            yMin = points.y[0];
                            yMax = points.y[0];
                        }
                        points.y.forEach( (pointY,yix) => {
                            if( yMin > pointY ) {
                                yMin = pointY;
                            }
                            if( yMax < pointY ) {
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

            ///converts graphArray to polylines
            graphArray.forEach( (points,pix) => {

                //"undefined", null, '' skipped
                if( !points ) return;

                var x = points.x;
                var mediaX = (points.x - xMin) / rangeX * dimX;
                if( xRangeFilter ) {
                    if( x < xRangeFilter.min ) return;
                    if( x > xRangeFilter.max ) return;
                }
                points.y.forEach( (pointY,yix) => {
                    var mediaY = dimY - ( pointY - yMin ) / rangeY * dimY;
                    polylines[ yix ] = polylines[ yix ] || [];
                    polylines[ yix ].push( [ mediaX, mediaY ] );
                });
            });

            ///calls polyline builders
            style = style || {};
            polylines.forEach( (pl,plix) => {
                //pl.push( pl[0] ); //to close
                style.stroke = pix2color[ plix  ];
                pl.svgel = nssvg.polyline({
                    svgel   : haz( pl, 'svgel' ), //reuses svgel
                    pivots  : pl,
                    parent  : graphFM_self.gmedia$(),
                    style,
                });
            });
        }



        //==================================================
        // //\\ builds svg-graph-container
        //==================================================
        function creates_svgDomEl()
        {
            var g$ = graphFM_self.gmedia$ = $$.svg()
                .to( parent )
                .css( 'width', svgWidthCssValue )
                .css( 'height', svgHeightCssValue )
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



        /*
        //sample of dom-hiding
        function showGraphPane( show0hide )
        {
            graphFM_self.gmedia$.css( 'display', show0hide ? 'block' : 'none' );
        }
        */
        function removeFromDom()
        {
            graphFM_self.gmedia$ && graphFM_self.gmedia$().remove();
            graphFM_self.gmedia$ = null;
        }
    }

}) ();

