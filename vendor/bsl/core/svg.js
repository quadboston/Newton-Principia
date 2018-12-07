( function() {
	var ns	    = window.b$l;
    var nssvg   = ns.sn( 'svg' );
    var svgNS   = "http://www.w3.org/2000/svg";





    ///updates and, if requested, creates svg-shape
    ///Optional Input:
    ///     arg.svgel
    ///     arg.parent
    ///     arg.type
    ///     arg.style
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
            ////sets attributes
            if( key === 'parent' || key === 'type' ) return;
            if( key === 'style' ) {
                ////sets syle properties
                var style = arg.style;
                if( style ) {
                    var stl = svgel.style;
                    Object.keys( style ).forEach( function( key ) {
                        stl[ key ] = style[ key ];
                    });
                }
                return;
            }
            var val = arg[ key ];
            if( val || val === 0 ) {
                //// val is not '' and not undefined
                svgel.setAttributeNS( null, key, val );
            }
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
            stroke : arg.stroke || 'rgba( 0,0,255, 1 )', 
                //must be transparent bs stroke or fill are often exclusive


            fill : arg.fill || 'transparent',
            'stroke-width' : arg[ 'stroke-width' ] || 1
        });
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


