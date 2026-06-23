(function(){
const {
    sn, $$, mat, nssvg, haz, stripp,
    stdMod, sconf, rg, ssF, ssD, sDomF, pntRgid2rgx,
} = window.b$l.atree({ stdModList : {
        pivotsDivDif_2_curve8svg,
}});
//outdated test
/*
    var { ddq2xy, trange2points } =
        stdMod.pivotsDivDif_2_curve8svg({ rgn: 'force' });

    var curvePoints = trange2points({ tStart:0, tEnd:9, stepsCount:180 });
    var medpoints = curvePoints.map( cp => ssF.modpos2medpos( cp, ) );
    var psvg = nssvg.polyline({
        pivots  : medpoints,
        svgel   : psvg,
        parent  : stdMod.medScene,
    });
*/
return;


///*********************************************************
///Framework "constructor".
///Inputs: cpivots in form rg[pivotsName + '-' + pix],
///Outputs: adds contents to rg[rgn],
///         builds and paints the curve, and
///         constructs ddq2xy to be used as a property
///         of rgX,
///         the name is misleading because does not return
///         a framework. Returns nothing.
///*********************************************************
///as of May 2026, used only in P41
function pivotsDivDif_2_curve8svg(goptions){ let {
    rgn,

    //optionals
    ////all args are optional
    //approximates x(q) and y(q) independently,
    separateXYforParamT, //boolean

    //swappting is a default, because in prop41
    //the graph of force, f(x), q=x and this graph
    //is rotated comparing to
    //common case in in XX century,

    //truthy, swaps only internal array xy and rgX.xy,
    //so, outcome, rg[rgn].curvePoints, is not swapped,
    //i.e. swaps only in two places,
    dontSwapXY,
} = stripp( goptions );
    const rgX = rg[rgn];
    const cpivots = rgX.cpivots;
    const cssClass ='tostroke thickable tp-'+
                    sDomF.rgid2low( rgn );
    const fw = stripp({
        ////constructed "framework"
        curvePoints : [], //they are x/y-swapped for case
        smin : 0,
        qixmax : cpivots.length-1,
        qix2area : [0], //not tested and not used
        //:methods
        //not in use yet:
        //ddq2xy, //f : q |-> rr, rr is in |R^2
    });
    Object.assign( rgX, fw );

    //pivots
    var xy = [];
    var xt = [];
    var yt = [];
    ///creates pivots array xy
    ///input: rg[rgid].pos, must exist
    cpivots.forEach( (dummy,pix) => {
        var rgid = rgn + '-' + pix;
        var p = rg[rgid].pos;
        if( separateXYforParamT ) {
            xt[ pix ] = [ pix, p[0] ];
            yt[ pix ] = [ pix, p[1] ];
        }
        xy[ pix ] = dontSwapXY ? [ p[0], p[1] ] : [ p[1], p[0] ];
    });
    //sets the function:
    if( separateXYforParamT ) {
        var axt = rgX.xt = mat.calculates_divided_differences_fw( xt );
        var ayt = rgX.yt = mat.calculates_divided_differences_fw( yt );
    } else {
        var axy = rgX.xy = mat.calculates_divided_differences_fw( xy );
    }
    buildsCurvePoints({ doIntegrate : true })
    buildsPlot();
    return;

    function ddq2xy( q ){
        return separateXYforParamT ?
            [
                axt.calculate_polynomial( q ),
                ayt.calculate_polynomial( q ),
            ] :
            [ q, axy.calculate_polynomial( q ) ];
    }

    ///the set q = t = tStart + tstep * tix
    ///returns array [ ddq2xy( q1 ), ddq2xy( q2 ) ...
    function trange2points({
        tStart, tEnd, stepsCount, doIntegrate
    }){
        var newpoints = [];
        var area = 0;
        var tix2area = fw.qix2area;
        tix2area.length = 1;
        var tstep = ( tEnd - tStart ) / stepsCount;
        const curvePoints = fw.curvePoints;
        for( var tix = 0; tix<=stepsCount; tix++ ) {
            var q = tStart + tstep * tix;
            var pos = ddq2xy( q );
            if( doIntegrate && tix ) {
                area += tstep * pos[1];
                tix2area[ tix ] = area;
            }
            //deswaps if swap mode is on
            curvePoints[tix] = dontSwapXY ? pos : [pos[1],pos[0]];
            newpoints.push( pos );
        }
        return newpoints;
    }

    ///generates array of xy where x
    ///is from range xy[ 0 ][0] till xy[ xy.length-1 ][0]
    function ownrange2points({ stepsCount, doIntegrate }){
        var tStart = xy[ 0 ][0];
        var tEnd = xy[ fw.qixmax ][0];
        return trange2points({
            tStart, tEnd, stepsCount, doIntegrate
        });
    }

    function buildsCurvePoints({ doIntegrate }){
        separateXYforParamT ?
            //this case is never used and not tested
            trange2points({
                tStart:0,
                tEnd:xy[ fw.qixmax ][0], //was a bug: fw.qixmax,
                stepsCount:1000,
                doIntegrate,
            })
        :
            ownrange2points({ stepsCount:1000, doIntegrate });
    }

    function buildsPlot(){
        var medpoints = fw.curvePoints.map( cp => {
            return ssF.modpos2medpos( cp, );
        });
        nssvg.polyline({
            rgX,
            pivots  : medpoints,
            svgel   : rgX.svgel,
            parent  : stdMod.medScene,
        });
        rgX.svgel$.addClass( cssClass );
    }
}
})();