( function() {
	var ns	    = window.b$l;
    var bezier  = ns.sn( 'bezier' );
    var svg     = ns.sn( 'svg' );
    




    ///does paint bezier curve and optionally related shapes: pivots, tangents, and points on curve
    bezier.mediafy = function( arg )
    {
        //:args
        var parent_svg = arg.svg
        var pivots  = arg.pivots;
        //:optional args for data and styles
        var paintPivots  = arg.paintPivots;
        var blines  = arg.blines;
        var bcurve  = arg.bcurve || {};
        var bpoints = arg.bpoints;
        var mediael = arg.mediael || {};

        //:local
        var plen    = pivots.length;


        //--------------------------------------------------------
        // //\\ prepares string-parameter for pivot-lines
        //--------------------------------------------------------
        var pivotsStr = pivots.reduce( function( acc, point ) {
                if( acc ) { acc += ' '; }
                return acc += point[0] + ',' + point[1];
            },
            ''
        );
        //--------------------------------------------------------
        // \\// prepares string-parameter for pivot-lines
        //--------------------------------------------------------

        //--------------------------------------------------------
        // //\\ paints bezier-pivot-lines
        //--------------------------------------------------------
        if( blines ) {
            mediael.paintedLines = svg.u({
                svgel : mediael.paintedLines,
                parent : parent_svg,
                type : 'polyline',
                points : '' + pivotsStr,
                style : blines.style,
                stroke : blines.stroke || 'rgba( 0,0,0, 1 )',
                fill : blines.fill || 'transparent',
                'stroke-width' : blines[ 'stroke-width' ] || 1
            });
        }
        //--------------------------------------------------------
        // \\// paints bezier-pivot-lines
        //--------------------------------------------------------


        //--------------------------------------------------------
        // //\\ paints bezier curve
        //--------------------------------------------------------
        if( bcurve ) {
            if( plen === 3 ) {
                var bcontr = 'Q';
            } else {
                var bcontr = 'C';
            }
            var bezierStr = pivots.reduce( function( acc, point ) {
                    if( acc ) { 
                        acc += ' ' + point[0] + ' ' + point[1];
                    } else { 
                       acc = 'M' + point[0] + ' ' + point[1] + ' ' + bcontr;
                    } 
                    return acc; 
                },
                ''
            );
            mediael.paintedCurve = svg.u({
                svgel : mediael.paintedCurve,
                parent : parent_svg,
                type : 'path',
                fill : bcurve.fill || 'transparent',
                stroke : bcurve.stroke || 'rgba( 0,255,0, 1 )',
                'stroke-width' : bcurve[ 'stroke-width' ] || 3,
                d : '' + bezierStr
            });
        }
        //--------------------------------------------------------
        // \\// paints paints bezier curve
        //--------------------------------------------------------



        //--------------------------------------------------------
        // //\\ paints points on bezier curve
        //--------------------------------------------------------
        if( arg.bpoints ) {
            mediael.points = mediael.points || [];
            //--------------------------------------------------------
            // //\\ calculates points
            //--------------------------------------------------------
            var resultBPoints = bezier.points2bezier( arg.bpoints.points, pivots );
            //--------------------------------------------------------
            // \\// calculates points
            //--------------------------------------------------------
            arg.bpoints.points.forEach( function( paramT, pix ) {
                //--------------------------------------------------------
                // //\\ paints point on bezier curve
                //--------------------------------------------------------
                var attrs = bpoints.attrs || {};
                var point = resultBPoints[ pix ];
                mediael.points[ pix ] = mediael.points[ pix ] || { ix:pix, point:point };
                mediael.points[ pix ].svgel =
                    svg.u({
                        svgel : mediael.points[ pix ].svgel,                         
                        parent : parent_svg,
                        type : 'circle',
                        fill : attrs.fill || 'rgba(255,0,0,1)',
                        cx : point[0],
                        cy : point[1],
                        r : attrs.r || 4,
                        style : attrs.style
                    });
                //--------------------------------------------------------
                // \\// paints point on bezier curve
                //--------------------------------------------------------
            });
        }
        if( paintPivots ) {
            mediael.pivotPoints = mediael.pivotPoints || [];
            paintPivots.topaint.forEach( function( topaint, pix ) {
                if( !topaint ) return;
                var point = pivots[pix];
                //--------------------------------------------------------
                // //\\ paints pivot of bezier curve
                //--------------------------------------------------------
                var attrs = paintPivots.attrs || {};
                mediael.pivotPoints[ pix ] = mediael.pivotPoints[ pix ] || { ix:pix, medpos:point };
                mediael.pivotPoints[ pix ].medpos = point;
                mediael.pivotPoints[ pix ].svgel =
                    svg.u({
                        svgel : mediael.pivotPoints[ pix ].svgel,                         
                        parent : parent_svg,
                        type : 'circle',
                        fill : attrs.fill || 'transparent',
                        stroke : attrs.stroke || 'rgba(255,0,0,1)',
                        'stroke-width' : attrs[ 'stroke-width' ] || 3,
                        cx : point[0],
                        cy : point[1],
                        r : attrs.r || 4,
                        style : attrs.style
                    });
                //--------------------------------------------------------
                // \\// paints pivot of on bezier curve
                //--------------------------------------------------------
            });
        }
        //--------------------------------------------------------
        // \\// paints points on bezier curve
        //--------------------------------------------------------
        return mediael;
    }

}) ();


