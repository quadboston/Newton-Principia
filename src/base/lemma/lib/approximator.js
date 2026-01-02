( function() {
    var {
        sn, $$, mat, nssvg, mcurve, haz,
        ssF, ssD, sDomF, toreg,
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
        var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, ) );
        var psvg = nssvg.polyline({
            pivots  : medpoints, 
            svgel   : psvg,
            parent  : stdMod.svgScene,
        });
    */
    return;







    ///*********************************************************
    ///Does:   all at once: approximates and paints and
    ///        ready for calculation at any poit,
    ///Inputs: sconf.originalPoints.curvePivots
    ///Avoids: using "traditional way" curves.js::ssF.paintsCurve
    ///        which uses function as input,
    ///*********************************************************
    function pointsArr_2_singleDividedDifferences(
        separateXYforParamT, //optional, approximates x(q) and y(q) independently,
        curveName,           //to generate registry name
        pivotsName,
        approxCurveName,
        //optionals

        //truthy, swaps only internal array xy and rg[ approxCurveName ].xy,
        //so, outcome, rg[ 'approximated-curve' ].curvePoints, is not swapped,
        //i.e. swaps only in two places,
        doSwapXY,
    ){
        curveName = curveName || 'orbit';
        pivotsName = pivotsName || 'curvePivots';
        approxCurveName = approxCurveName || 'approximated-curve';

        qmax = sconf.originalPoints.curvePivots.length-1;

        //pivots
        var xy = [];
        var xt = [];
        var yt = [];
        var antider = [ 0 ];
        var curvePoints = [];

        var lowname = sDomF.tpid2low( curveName );

        ///creates pivots array xy
        sconf.originalPoints.curvePivots.forEach( (pivot,pix) => {
            var pname = pivotsName + '-' + pix;
            var p = pname2point[pname]; //p has format [xx,xx],
            if( separateXYforParamT ) {
                xt[ pix ] = [ pix, p[0] ];
                yt[ pix ] = [ pix, p[1] ];
            }
            xy[ pix ] = doSwapXY ? [ p[1], p[0] ] : [ p[0], p[1] ];
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
            antider,
            curvePoints, //they are x/y-swapped for case
        };
        Object.assign( rgX, result );
        buildsCurvePoints({ doIntegrate : true })
        buildsPlot(); //( arg );
        //poly2svg({});
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
        function trange2points({ tStart, tEnd, stepsCount, doIntegrate })
        {
            var newpoints = [];
            var area = 0;
            var antid = antider;
            antid.length = 1;
            var tstep = ( tEnd - tStart ) / stepsCount;
            for( var tix = 0; tix<=stepsCount; tix++ ) {
                var q = tStart + tstep * tix;
                var pos = q2xy( q );
                if( doIntegrate && tix ) {
                    area += tstep * pos[1];
                    antid[ tix ] = area;
                }
                //deswaps if swap mode is on
                curvePoints[tix] = doSwapXY ? [pos[1],pos[0]] : pos;
                newpoints.push( pos );
            }
            return newpoints;
        }


        ///generates array of xy where x
        ///is from range xy[ 0 ][0] till xy[ xy.length-1 ][0]
        function ownrange2points({ stepsCount, doIntegrate })
        {
            var tStart = xy[ 0 ][0];
            var tEnd = xy[ qmax ][0];
            return trange2points({ tStart, tEnd, stepsCount, doIntegrate });
        }

        function buildsCurvePoints({ doIntegrate })
        {
            separateXYforParamT ?
            trange2points({
                tStart:0,
                tEnd:qmax,
                stepsCount:1000,
                doIntegrate,
            }) :
            ownrange2points({ stepsCount:1000, doIntegrate });
        }


        function poly2svg( arg )
        {
            buildsCurvePoints({});
            buildsPlot(); //( arg );
        }

        function buildsPlot()
        {
            var medpoints = curvePoints.map( cp => {
                return ssF.mod2inn( cp, );
            });
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

