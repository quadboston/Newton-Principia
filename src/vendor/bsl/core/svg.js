( function() {
	var ns	    = window.b$l;
    var nssvg   = ns.sn( 'svg' );
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
        var rC = Math.cos( rotationRads );
        var rS = Math.sin( rotationRads );
        var t0 = arg.t0 || 0;
        for( var ii = 0; ii < stepsCount; ii++ ) {
            var t = step * ii;
            var x = a*Math.cos(t+t0);
            var y = b*Math.sin(t+t0);
            var xx = x * rC - y * rS + x0;
            var yy = x * rS + y * rC + y0;
            polyline.push( [ xx, yy ] );
        }
        polyline.push( [ xx, yy ] );
        //makes ellipse closed:
        polyline.push( polyline[0] );
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


