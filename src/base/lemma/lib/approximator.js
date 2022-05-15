( function() {
    var {
        sn, $$, mat, nssvg, mcurve, haz,
        ssF, ssD, sDomF, toreg, fixedColors,
        stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            //pointsArr_2_doubledDividedDifferences,
            pointsArr_2_singleDividedDifferences,
        },
    });
    var pname2point = sn( 'pname2point', sconf );
    //test
    /*
        var { q2xy, trange2points } =
            stdMod.pointsArr_2_doubledDividedDifferences();        

        var curvePoints = trange2points({ tStart:0, tEnd:9, stepsCount:180 });
        var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) );
        var psvg = nssvg.polyline({
            pivots  : medpoints, 
            svgel   : psvg,
            parent  : stdMod.svgScene,
        });
    */
    return;







    ///*********************************************************
    ///does all at once: approximates and paints and
    ///ready for calculation at any poit,
    ///uses pivots array as input,
    ///
    ///avoids using "traditional way" curves.js::ssF.paintsCurve
    ///which uses function as input,
    ///*********************************************************
    function pointsArr_2_singleDividedDifferences(
        separateXYforParamT, //approximates x(q) and y(q) independently,
        curveName,
        pivotsName,
        approxCurveName,
    ){
        curveName = curveName || 'orbit';
        pivotsName = pivotsName || 'curvePivots';
        approxCurveName = approxCurveName || 'approximated-curve';

        qmax = sconf.originalPoints.curvePivots.length-1;

        //pivots
        var xy = [];
        var xt = [];
        var yt = [];

        var lowname = sDomF.topicIdUpperCase_2_underscore( curveName );

        ///creates pivots array xy
        sconf.originalPoints.curvePivots.forEach( (pivot,pix) => {
            var pname = pivotsName + '-' + pix;
            var p = pname2point[pname];
            if( separateXYforParamT ) {
                xt[ pix ] = [ pix, p[0] ];
                yt[ pix ] = [ pix, p[1] ];
            }
            xy[ pix ] = [ p[0], p[1] ];
        });
        var rgX = toreg( approxCurveName )();
        //prevents leaks polylineSvg from js-prototype
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );

        //sets the function:
        // **api-outputs---divided-diff
        if( separateXYforParamT ) {
            var axt = rg[ approxCurveName ].xt = mat.calculate_divided_differences( xt );
            var ayt = rg[ approxCurveName ].yt = mat.calculate_divided_differences( yt );
        } else {
            var axy = rg[ approxCurveName ].xy =  mat.calculate_divided_differences( xy );
        }
        var result = {
            t2xy : q2xy, //transition from former notations
            q2xy,        //f : q |-> rr, rr is in |R^2
            poly2svg,
            smin : 0,
            qmax : qmax,
        };
        Object.assign( rgX, result );
        poly2svg({});
        return result;


        function q2xy( q )
        {
            return separateXYforParamT ?
                [
                    axt.calculate_polynomial( q ),
                    ayt.calculate_polynomial( q ),
                ] :
                [ q, axy.calculate_polynomial( q ) ];
        }

        ///generates array of xy where x is par. "t" and is from
        ///the set x = tStart + tstep * tix
        function trange2points({ tStart, tEnd, stepsCount, })
        {
            var newpoints = [];
            var tstep = ( tEnd - tStart ) / stepsCount;
            for( var tix = 0; tix<=stepsCount; tix++ ) {
                var q = tStart + tstep * tix;
                newpoints.push( q2xy( q ) );
            }
            return newpoints;
        }


        ///generates array of xy where x
        ///is from range xy[ 0 ][0] till xy[ xy.length-1 ][0]
        function ownrange2points({ stepsCount })
        {
            var tStart = xy[ 0 ][0];
            var tEnd = xy[ qmax ][0];
            return trange2points({ tStart, tEnd, stepsCount });
        }


        function poly2svg(arg)
        {
            var curvePoints = separateXYforParamT ?
                    trange2points({
                        tStart:0,
                        tEnd:qmax,
                        stepsCount:1000,
                    }) :
                    ownrange2points({ stepsCount:1000 });
            var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) );
            //ccc( curvePoints, medpoints );
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

}) ();

