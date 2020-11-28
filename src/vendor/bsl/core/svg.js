( function() {
	var ns	    = window.b$l;
    var nssvg   = ns.sn( 'svg' );
    var mat     = ns.sn( 'mat' );
    var svgNS   = "http://www.w3.org/2000/svg";





    ///Updates svg-shape. Svg-shape creates before update if missed in arg.
    ///Optional Input:
    ///     arg.svgel - element to be updated
    ///     arg.parent
    ///     arg.type
    ///     arg.style
    ///     and other attributes in form "key"-"value"
    ///Returns new or updated svgel - svg element
	nssvg.u = function( arg )
    {
        if( !arg.svgel ) {
            var svgel = document.createElementNS( svgNS, arg.type );
            //protects from duplicate attachment
            if( arg.parent ) arg.parent.appendChild( svgel );
        } else {
            var svgel = arg.svgel;
        }

        Object.keys( arg ).forEach( function( key ) {
 
            //--------------------------------------
            // //\\ ignores 'parent' and 'type'
            //      properties which were used above
            //      and leaves the loop
            //--------------------------------------
            //.ignores these properties
            if( key === 'parent' || key === 'type' || key === 'text' ) return;
            //--------------------------------------
            // \\// ignores 'parent' and 'type'
            //--------------------------------------

            //-------------------------------------
            // //\\ sets syle properties and leaves
            //-------------------------------------
            if( key === 'style' ) {
                var style = arg.style;
                if( style ) {
                    var stl = svgel.style;
                    Object.keys( style ).forEach( function( key ) {
                        stl[ key ] = style[ key ];
                    });
                }
                return;
            }
            //-------------------------------------
            // \\// sets syle properties and leaves
            //-------------------------------------

            //-------------------------------------
            // //\\ sets remaining attributes
            //-------------------------------------
            var val = arg[ key ];
            if( val || val === 0 ) {
                // //\\ adds a piece of sugar into CSS:
                //      removes excessive digits from CSS:
                //      assuming that scale of svg will be > 100px
                if( arg.type === 'circle' ) {
                    if( ( key==='cx' || key==='cy' || key==='r' ) &&
                        typeof val === 'number'
                    ) {
                        val = val.toFixed(3);  
                    }
                }
                // \\// adds a piece of sugar into CSS
                //// val is not '' and not undefined
                svgel.setAttributeNS( null, key, val );
            }
            //-------------------------------------
            // \\// sets remaining attributes
            //-------------------------------------
        });
        return svgel;
    };


    ///Input: arg.pivots are pivot points
    nssvg.polyline = function( arg )
    {
        var pivotsStr = arg.pivots.reduce( function( acc, point ) {
                if( acc ) { acc += ' '; }
                return acc += point[0].toFixed(2) + ',' + point[1].toFixed(2);
            },
            ''
        );
        return nssvg.u({
            svgel : arg.svgel,
            parent : arg.parent,
            type : 'polyline',
            points : pivotsStr,
            style : arg.style,
            stroke : arg.stroke || 'rgba( 0,0,0, 1 )', 
                //must be transparent bs stroke or fill are often exclusive

            fill : arg.fill || 'transparent',
            'stroke-width' : arg[ 'stroke-width' ] || 1
        });
    };

    ///this sub should work slightly faster than nssvg.polyline
    nssvg.updatePolyline = function({
        pivots,
        svgel,
        fill,
        strokeWidth,
    }) {
        var pivotsStr = '';
        var len = pivots.length;
        for( var pix=0; pix < len; pix++ ) {
            var point = pivots[pix];
            if( pivotsStr ) {
                pivotsStr += ' ';
            }
            pivotsStr += point[0].toFixed(2) + ',' + point[1].toFixed(2);
        }
        svgel.setAttributeNS( null, 'points', pivotsStr );
        fill && svgel.setAttributeNS( null, 'fill', fill );
        strokeWidth && svgel.setAttributeNS( null, 'stroke-width', strokeWidth || 1 );
    }

    ///"manually" created polyline which formes ellipse,
    ///input: ellipse = (x-x0)^2/a^2 + (y-y0)^2/b^2 = 1;
    ///                 or: r = [ a*cos(t+t0) + x0, b*sin(t+t0) + y0 ];
    //        rotationRads rotates around position x0,y0;
    ///returns: svg-element;
    nssvg.ellipse = function( arg )
    {
        var { stepsCount, a, b, x0, y0, rotationRads } = arg;
        var polyline = arg.pivots = [];
        var step = 2*Math.PI/stepsCount;

        //var rC = Math.cos( rotationRads );
        //var rS = Math.sin( rotationRads );

        var t0 = arg.t0 || 0;
        for( var ii = 0; ii < stepsCount; ii++ ) {
            ///this is slow but unified ... keep it for a while
            var ell = mat.ellipse({
                t:step * ii,
                a,
                b,
                x0,
                y0,
                t0,
                rotationRads,
            });
            var xx = ell.x;
            var yy = ell.y;
            /*
            //this is fast but is a code proliferation
            var t = step * ii;
            var x = a*Math.cos(t+t0);
            var y = b*Math.sin(t+t0);
            var xx = x * rC - y * rS + x0;
            var yy = x * rS + y * rC + y0;
            */
            polyline.push( [ xx, yy ] );
        }
        polyline.push( [ xx, yy ] );
        //makes ellipse closed:
        polyline.push( polyline[0] );
        return nssvg.polyline( arg ); 
    };

    ///"manually" created polyline which formes ellipse's sector,
    ///input: ellipse = (x-x0)^2/a^2 + (y-y0)^2/b^2 = 1;
    ///                 or: r = [ a*cos(t+t0) + x0, b*sin(t+t0) + y0 ];
    ///returns: svg-element;
    nssvg.ellipseSector = function( arg )
    {
        var {
            stepsCount,
            a,
            b,
            x0,
            y0,
            rotationRads,
            t0, //start angle
            t1, //end angle
        } = arg;
        var polyline = arg.pivots = [];
        if( !t0 && t0 !== 0 ) {
            t0 = 0;
            t1 = Math.PI*2;
        }
        stepsCount = stepsCount || 100;
        a = a || 1;
        b = b || 1;
        var step = ( t1 - t0 ) / stepsCount;
        polyline.push( [x0,y0] );
        for( var ii = 0; ii <= stepsCount; ii++ ) {
            var ell = mat.ellipse({
                t:step * ii,
                a,
                b,
                x0,
                y0,
                t0,
                rotationRads,
            });
            var xx = ell.x;
            var yy = ell.y;
            polyline.push( [ xx, yy ] );
        }
        polyline.push( [ xx, yy ] );
        //makes sector closed:
        //todm not good:  use arg...
        polyline.push( polyline[0] );
        return nssvg.polyline( arg ); 
    };


    ///"manually" creates polyline which formes curve,
    ///signature:           nssvg.curve({ stepsCount, step, curve:function })
    ///signature of
    ///callback "curve":    curvePar => ({x:x, y:y} or [x,y])
    ///                                 x,y are in media frame of reference
    ///                                 
    ///autocloses unless    arg.dontClose = true,
    ///returns:             svg-element
    nssvg.curve = function( arg )
    {
        var {
            addToStepCount, //this parameter added later to draw function graph on the end point
            stepsCount, start, step, curve, xOFy
        } = arg;

        stepsCount += (addToStepCount || 0);
        var polyline = arg.pivots = [];
        for( var ii = 0; ii < stepsCount; ii++ ) {
            var curv = curve( start + step * ii );
            if( Array.isArray( curv ) ) {
                var xx = curv[0];
                var yy = curv[1];
            } else {
                var xx = curv.x;
                var yy = curv.y;
                //todm make
                //var curv = [ curv.x, curv.y ];
            }
            if( xOFy ) {
                ////swaps x and y if we draw graph x(y)
                var ww = xx;
                var xx = yy;
                var yy = ww;
            }
            polyline.push( [ xx, yy ] );
        }
        polyline.push( [ xx, yy ] );
        //makes curve closed:
        if( !arg.dontClose ) {
            polyline.push( polyline[0] );
        }
        return nssvg.polyline( arg ); 
    };


    ///====================================
    ///Creates or updates svg-text element
    ///====================================
    ///Optional Input:
    ///     arg.svgel   //creates if missed
    ///     arg.parent  //attaches to if supplied
    ///     arg.text
    ///     arg.x
    ///     arg.y
    ///     arg.style
    ///Returns: svg-element
    nssvg.printText = function( arg )
    {   
        arg.type = 'text';
        var svgEl = nssvg.u( arg );
        if( arg.text ) {
            //https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
            //https://stackoverflow.com/questions/4282108/how-to-change-svg-text-tag-using-javascript-innerhtml
            svgEl.textContent = arg.text;
        }
        return svgEl;
    }

}) ();


