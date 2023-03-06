( function() {
    var {
        ss, $$, nssvg, haz, mat,
        sDomF, ssF,
        stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            creates_orbitRack,
            pos2t,
        },
    });
    return;













    //analogy of
    //function  pointsArr_2_singleDividedDifferences()
    function creates_orbitRack()
    {
        var curveName = 'orbit';
        var lowname = sDomF.topicIdUpperCase_2_underscore( curveName );
        var rgX = rg[ 'approximated-curve' ];
        //prevents leaks polylineSvg from js-prototype
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );

        //rg[ 'approximated-curve' ] will have these properties:
        var result = {
                t2xy, // f : x |-> rr, rr is in |R^2
                trange2points,
                ownrange2points,
                poly2svg,
        };
        Object.assign( rgX, result );
        poly2svg({});
        return result;


        ///param t to [x,y]
        function t2xy( t )
        {
            var R = sconf.prop7R;
            var center = sconf.prop7Center;
            return [
                R*Math.cos( t ) + center[0],
                R*Math.sin( t ) + center[1],
            ];
        }

        ///draws circle arc for t in [tStart,tEnd)
        function trange2points({ tStart, tEnd, stepsCount, })
        {
            var newpoints = [];
            var tstep = ( tEnd - tStart ) / stepsCount;
            for( var tix = 0; tix<=stepsCount; tix++ ) {
                var t = tStart + tstep * tix;
                var xy = t2xy( t );
                newpoints.push( [
                    xy[0], xy[1],
                ]);
            }
            return newpoints;
        }

        ///draws full circle for t in [0,2PI)
        //returns closed curve with end point = first point exactly
        function ownrange2points({ stepsCount })
        {
            var tStart = 0;
            var tEnd = Math.PI*2;
            var points = trange2points({ tStart, tEnd, stepsCount });
            points[ points.length - 1 ] = points[ 0 ]; //does close the poly.
            return points;
        }


        function poly2svg(arg)
        {
            var curvePoints = ownrange2points({ stepsCount:80 });
            var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) );
            var polylineSvg = rgX.polylineSvg = nssvg.polyline({
                pivots  : medpoints, 
                svgel   : rgX.polylineSvg,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            //##tp-machine
            $$.$( polylineSvg ).addClass( 'tostroke thickable tp-'+lowname );

            /*
            var strokeWidth = haz( arg, 'stroke-width' );
            if( strokeWidth ) {
                polylineSvg.setAttribute( 'stroke-width', strokeWidth );
            }
            */
        }
    }


    function pos2t( newPos )
    {
        return mat.pos2angle([
            newPos[0] - sconf.prop7Center[0],
            newPos[1] - sconf.prop7Center[1],
        ]);
    }

}) ();

