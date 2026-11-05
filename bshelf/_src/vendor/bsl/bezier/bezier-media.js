( function() {
    var {
        sn,
        bezier,
        nssvg,
    } = window.b$l.nstree();
    bezier.mediafy = mediafy;
    return;






    ///==============================================================
    ///does paint bezier curve and optionally related shapes: pivots,
    ///tangents, and points on curve
    ///==============================================================
    ///API
    /*
        rgX             //example of parent rack
          .pegDragRack  //example of parent rack

            .mediael //returned API with properties on following strings

               .paintedCurve = svgel
               .points[ pix ] = { ix: , point:resultBPoints_model[ pix ], svgel: }
               .points_model[ pix ] = { ix: , point:resultBPoints_model[ pix ] }

    */
    function mediafy({
        parentSVG,
        pivots, //appar. for lines, not for the curve

        //:optional args for data and styles
        modelPivots,
        paintPivots, //appar logicall array of flags to show/hide pivots
        blines,
        bpoints,

        bcurve,
        mediael, //framwork container to be returned
    }){
        bcurve      = bcurve || {};
        mediael     = mediael || {};
        //:local
        var plen    = pivots.length;


        //--------------------------------------------------------
        // //\\ prepares string-parameter for pivot-lines
        //--------------------------------------------------------
        var pivotsStr = pivots.reduce( function( acc, point ) {
                if( acc ) {
                    acc += ' '; //provides space after points
                }
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
            mediael.paintedLines = nssvg.u({
                svgel : mediael.paintedLines,
                parent : parentSVG,
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
                var bcontr = 'Q'; //Quadratic Bezier curve
            } else {
                var bcontr = 'C'; //Cubic Bezier curve
            }
            var bezierStr = pivots.reduce( function( acc, point ) {
                    if( acc ) {
                        //// adds 2 points for Quadratic B. curve and
                        //// 3 points for cubic
                        acc += ' ' + point[0] + ' ' + point[1];
                    } else {
                        ////begins full control string by adding control "M" and
                        ////then adds first point for C or Q curves and
                        ////Bezier contro letter after them:
                       acc = 'M' + point[0] + ' ' + point[1] + ' ' + bcontr;
                    } 
                    return acc; 
                },
                ''
            );
            mediael.paintedCurve = nssvg.u({
                svgel : mediael.paintedCurve,
                parent : parentSVG,
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
        if( bpoints ) {
            sn( 'points', mediael, [] );
            sn( 'points_model', mediael, [] );
            //--------------------------------------------------------
            // //\\ calculates points
            //--------------------------------------------------------
            var resultBPoints = bezier.points2bezier( bpoints.points, pivots );
            var resultBPoints_model = bezier.points2bezier( bpoints.points, modelPivots );
            //--------------------------------------------------------
            // \\// calculates points
            //--------------------------------------------------------
            bpoints.points.forEach( function( paramT, pix ) {
                //--------------------------------------------------------
                // //\\ paints point on bezier curve
                //--------------------------------------------------------
                var attrs = bpoints.attrs || {};
                var point = resultBPoints[ pix ];

                //in the same space as pivots: if mod then mod, if in media, than med:
                var mp      = mediael.points[ pix ] = mediael.points[ pix ] || {};
                mp.ix       = pix;
                mp.point    = point;
                //stashes model-twin of media point
                var mpm     = mediael.points_model[ pix ] = {};
                mpm.ix      = pix;
                mpm.point   = resultBPoints_model[ pix ];
                mediael.points[ pix ].svgel =
                    nssvg.u({
                        svgel   : mp.svgel,                         
                        parent  : parentSVG,
                        type    : 'circle',
                        fill    : attrs.fill || 'rgba(255,0,0,1)',
                        cx      : point[0],
                        cy      : point[1],
                        r       : attrs.r || 4,
                        style   : attrs.style
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
                mediael.pivotPoints[ pix ] = mediael.pivotPoints[ pix ] ||
                                             { ix:pix, medpos:point };
                mediael.pivotPoints[ pix ].medpos = point;
                mediael.pivotPoints[ pix ].svgel =
                    nssvg.u({
                        svgel : mediael.pivotPoints[ pix ].svgel,                         
                        parent : parentSVG,
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


