(function(){
    const {
        sn, $$, mat, nssvg, haz,
        stdMod, sconf, rg, ssF, ssD, sDomF, toreg,
    } = window.b$l.apptree({ stdModExportList : {
            Pivots_2_divdifFW,
        },
    });
    const pname2point = sn( 'pname2point', sconf );
    //outdated test
    /*
        var { q2xy, trange2points } =
            stdMod.Pivots_2_divdifFW();

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
    ///Framework constructor. Returns fw.
    ///Does:   all at once: approximates and paints and
    ///        ready for calculation at any poit,
    ///Inputs: cpivots
    ///Avoids: using "traditional way" curves.js::ssF.paintsCurve
    ///        which uses function as input,
    ///*********************************************************
    function Pivots_2_divdifFW(
        ////all args are optional
        //approximates x(q) and y(q) independently,
        separateXYforParamT, //boolean

        //optionals
        curveName, //to generate registry name
        pivotsName,
        //repeated construction with the same or omitted parameter
        //overrides former fw:
        approxCurveName,

        //truthy, swaps only internal array xy and rgX.xy,
        //so, outcome, rg.approxer.curvePoints, is not swapped,
        //i.e. swaps only in two places,
        doSwapXY,
    ){
        ccc( 'approx' );
        curveName       = curveName || 'orbit';
        pivotsName      = pivotsName || 'curvePivots';
        approxCurveName = approxCurveName || 'approxer';
        const cpivots   = sconf.originalPoints.curvePivots;
        const fw = {
            ////constructed framework
            curvePoints : [], //they are x/y-swapped for case
            //:methods
            t2xy : q2xy, //transition from former notations
            q2xy,        //f : q |-> rr, rr is in |R^2
            poly2svg,

            smin : 0,
            qmax : cpivots.length-1,
            qix2area : [0], //not tested and not used
        };
        var rgX = toreg( approxCurveName )();
        Object.assign( rgX, fw );

        //pivots
        var xy = [];
        var xt = [];
        var yt = [];
         //primary holder of points in the framework closure,
        const lowname = sDomF.tpid2low( curveName );

        ///creates pivots array xy
        cpivots.forEach( (pivot,pix) => {
            var pname = pivotsName + '-' + pix;
            var p = pname2point[pname]; //p has format [xx,xx],
            if( separateXYforParamT ) {
                xt[ pix ] = [ pix, p[0] ];
                yt[ pix ] = [ pix, p[1] ];
            }
            xy[ pix ] = doSwapXY ? [ p[1], p[0] ] : [ p[0], p[1] ];
        });
        //prevents leaks polylineSvg from js-prototype
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );

        //sets the function:
        // **api-outputs---divided-diff
        if( separateXYforParamT ) {
            var axt = rgX.xt = mat.calculate_divided_differences( xt );
            var ayt = rgX.yt = mat.calculate_divided_differences( yt );
        } else {
            var axy = rgX.xy = mat.calculate_divided_differences( xy );
        }
        buildsCurvePoints({ doIntegrate : true })
        buildsPlot();
        //proliferation:
        return fw;


        function q2xy( q )
        {
            return separateXYforParamT ?
                [
                    axt.calculate_polynomial( q ),
                    ayt.calculate_polynomial( q ),
                ] :
                [ q, axy.calculate_polynomial( q ) ];
        }

        ///the set q = t = tStart + tstep * tix
        ///returns array [ q2xy( q1 ), q2xy( q2 ) ...
        function trange2points({ tStart, tEnd, stepsCount, doIntegrate }){
            var newpoints = [];
            var area = 0;
            var tix2area = fw.qix2area;
            tix2area.length = 1;
            var tstep = ( tEnd - tStart ) / stepsCount;
            const curvePoints = fw.curvePoints;
            for( var tix = 0; tix<=stepsCount; tix++ ) {
                var q = tStart + tstep * tix;
                var pos = q2xy( q );
                if( doIntegrate && tix ) {
                    area += tstep * pos[1];
                    tix2area[ tix ] = area;
                }
                //deswaps if swap mode is on
                curvePoints[tix] = doSwapXY ? [pos[1],pos[0]] : pos;
                newpoints.push( pos );
            }
            return newpoints;
        }

        ///generates array of xy where x
        ///is from range xy[ 0 ][0] till xy[ xy.length-1 ][0]
        function ownrange2points({ stepsCount, doIntegrate }){
            var tStart = xy[ 0 ][0];
            var tEnd = xy[ fw.qmax ][0];
            return trange2points({ tStart, tEnd, stepsCount, doIntegrate });
        }

        function buildsCurvePoints({ doIntegrate }){
            separateXYforParamT ?
            trange2points({
                tStart:0,
                tEnd:fw.qmax,
                stepsCount:1000,
                doIntegrate,
            }) :
            ownrange2points({ stepsCount:1000, doIntegrate });
        }

        function poly2svg( arg ){
            buildsCurvePoints({});
            buildsPlot();
        }

        function buildsPlot(){
            var medpoints = fw.curvePoints.map( cp => {
                return ssF.mod2inn( cp, );
            });
            //c cc( fw.curvePoints, medpoints );
            var polylineSvg = rgX.polylineSvg = nssvg.polyline({
                pivots  : medpoints,
                svgel   : rgX.polylineSvg,
                parent  : stdMod.svgScene,
                //should be overridden by tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            //tp-machine
            $$.$( polylineSvg ).addClass( 'tostroke thickable tp-'+lowname );
        }
    }
})();