( function() {
	const ns	  = window.b$l;
    const nssvg   = ns.sn( 'svg' );
    const mat     = ns.sn( 'mat' );
    const svgNS   = ns.svgNS;
    const has     = ns.h;
    const haz     = ns.haz;
    const $$      = ns.$$;


    ///Updates svg-shape. Svg-shape creates before update if arg.svgel
    ///is missed in arg.
    ///Optional Input:
    ///     arg.svgel - element to be updated
    ///     arg.parent
    ///     arg.type
    ///     arg.style
    ///     and other attributes in form "key"-"value"
    ///Returns new or updated svgel - svg element
	nssvg.u = function( arg )
    {
        var svgel = haz( arg, 'svgel' );
        ///protects from repeating construction
        if( !svgel ) {
            var svgel = document.createElementNS( svgNS, arg.type );
            ///enables freedom of attachment
            if( has( arg, 'parent' ) ) {
                arg.parent.appendChild( svgel );
            }
            ///if registry placeholder, rgX, is provided to store svgel,
            ///then do it
            if( haz( arg, 'rgX' ) ) {
                arg.rgX.svgel = svgel;
                arg.rgX.svgel$ = $$.$( svgel );
            }
        }

        Object.keys( arg ).forEach( function( key ) {
 
            //--------------------------------------
            // //\\ ignores 'parent' and 'type'
            //      properties which were used above
            //      and leaves the loop
            //--------------------------------------
            //.ignores these properties
            if( key === 'parent' || key === 'type' ||
                key === 'text' || key === 'rgX' ||
                key === 'svgel' || //bug fixed, May 5, 2021
                key === 'tpclass' //bug patch, May 5, 2021 ... todm wrong design
            ) return;
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

                ///good way to catch problems in app model logic
                //if( typeof( val ) === 'string' && val.indexOf( 'NaN' ) > 0 ) {
                //if( typeof( val ) === 'string' && key === 'points' ) {
                    //ccc( Number.MIN_VALUE, Number.MAX_VALUE  );
                    //5e-324 1.7976931348623157e+308
                    //if( haz( arg, 'rgX' ) ) {
                    //    var wwPname = rgX.pname;
                    //}
                    //ccc( wwPname, key, val );
                    //throw 'err. ' + key;
                //}

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
        var regExp = /(\d)0+$/; //removes trailing zeros from numbers for svg
        var pivotsStr = arg.pivots.reduce( function( acc, point ) {
                if( acc ) { acc += ' '; }

                var p1 = point[0];
                var m1 = Math.abs( p1 );
                //removes exponential JS notation from svg
                if( m1 < 0.00000000000001 ) p1 = 0;
                if( m1 > 10000000000000 ) p1 = 10000000000000;
                //todm: very crude zero-remover, do fine work:
                p1 = p1.toFixed( 3 ).replace( regExp, rep ); //'$2' );
                //why fails?
                //p1 = p1.toFixed( 3 ).replace( regExp, '$2' );

                var p2 = point[1];
                var m2 = Math.abs( p2 );
                if( m2 < 0.00000000000001 ) p2 = 0;
                if( m2 > 10000000000000 ) p2 = 10000000000000;
                p2 = p2.toFixed( 3 ).replace( regExp, rep ); //'$2' );

                return acc += p1 + ',' + p2;
            },
            ''
        );

        ///todm
        /// 1. first paste
        /// 2. then extend like arg.XXX = arg.XXXX || .... 
        ///this thing must paste arg into arg, not to manually
        ///reassign props., misleading and error prone,
        return nssvg.u({
            rgX     : arg.rgX,
            svgel   : arg.svgel,
            parent  : arg.parent,
            type    : 'polyline',
            points  : pivotsStr,
            style   : arg.style,
            stroke  : arg.stroke || 'rgba( 0,0,0, 1 )', 
                //must be transparent bs stroke or fill are often exclusive

            fill    : arg.fill || 'transparent',
            'stroke-width' : arg[ 'stroke-width' ] || 1
        });

        function rep( match1, match2 ) {
            return match2;
        }
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
                //if( key === 'points' && val.indexOf( 'NaN' ) > -1 ) {
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
            t0,                 //start angle
            t1,                 //end angle
            drawExternalSector, //sets to draw a complimentary sector
        } = arg;
        var polyline = arg.pivots = [];
        if( !t0 && t0 !== 0 ) {
            t0 = 0;
            t1 = Math.PI*2;
        }
        if( drawExternalSector ) {
            ////sets to draw a complimentary sector
            var dt = t1 - t0;
            t1 = dt >= 0 ? t0 - Math.PI*2 + dt : t0 + Math.PI*2 + dt;
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
        const {
            dontClose,

            //integer type parameter, how many add beyond "normal" last point,
            //this parameter added later to draw function graph on the end point,
            //it is similar of adding "=" in loop limit aka index <= addToStepCount,
            addToStepCount,

            stepsCount,
            start,  //of independent variable t in model space,
            step,   //of independent variable t in model space,
            curve,  //a    function( t ) : t |-> [x,y],
                    //  or function( t ) : t |-> { x:..., y:... },
                    //x,y are in media inner space ready for svg,
            xOFy    //if true, then swaps curve coordinates x and y,
        } = arg;

        var stepsLim    = stepsCount + (addToStepCount || 0);
        var polyline    = arg.pivots = [];
        const notArr    = !Array.isArray( curve( start ) );
        for( var ii = 0; ii < stepsLim; ii++ ) {
            var curv = curve( start + step * ii );
            if( notArr ) {
                var curv = [ curv.x, curv.y ];
            }
            if( xOFy ) {
                ////swaps x and y if we draw graph x(y)
                curv = [ curv[1], curv[0] ];
            }
            polyline.push( curv );
        }
        polyline.push( curv ); //todm why repeating last el?
        //makes curve closed:
        if( !dontClose ) {
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


