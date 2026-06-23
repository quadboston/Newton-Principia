(function(){
const { $$, nssvg, haz, mat, nspaste,
        sDomF, ssF, rg, stdMod, sconf,
      } = window.b$l.atree({ stdModList: {
        init__Shapes,
        pos2t,
}});
return;

///executes one-time at app launch at init-sapp.js
///creates
///         dyn_q2xy,
///         trange2points,
///         gshape2svg
///as properties of rg.borbit
function init__Shapes (){
    const A = sconf.curve.curveParA;
    const fi0 = sconf.curve.curveParFi0;
    var rgn = 'borbit';
    var tpname = 'tp-' + rgn;
    var rgX = rg.borbit;
    Object.assign( rgX, {
        dyn_q2xy, // f : x |-> rr, rr is in |R^2
        trange2points,
        gshape2svg,
    });
    gshape2svg();
    return;

    function dyn_q2xy( q ){
        q += fi0;
        var center = sconf.diagramOrigin;
        return [
            sconf.curve.ellipseA * Math.cos( q ) + center[0],
            sconf.curve.ellipseB * Math.sin( q ) + center[1],
        ];
    }

    ///draws circle arc for t in [tStart,tEnd)
    function trange2points({ tStart, tEnd, stepsCount }){
        var newpoints = [];
        var qstep = ( tEnd - tStart ) / stepsCount;
        for( var tix = 0; tix<=stepsCount; tix++ ) {
            var q = tStart + qstep * tix;
            var xy = dyn_q2xy( q );
            newpoints.push( [
                xy[0], xy[1],
            ]);
        }
        return newpoints;
    }

    ///draws full orbit for t in [0,2PI)
    //returns unclosed curve with end point =/= first point exactly
    function ownrange2points({ stepsCount })
    {
        var tStart = 0;
        var tEnd = sconf.curve.curveParFiMax;
        var points = trange2points({ tStart, tEnd, stepsCount });
        //points[ points.length - 1 ] = points[ 0 ]; //does close the poly.
        return points;
    }

    function gshape2svg (){
        var curvePoints = ownrange2points({ stepsCount:80 });
        var medpoints = curvePoints.map(
            cp => ssF.modpos2medpos( cp ) );
        nssvg.polyline({
            rgX,
            pivots: medpoints,
            svgel: rgX.svgel,
            parent: stdMod.medScene,
        });
        rgX.svgel$.addClass( 'tostroke thickable '+tpname );
    }
}

function pos2t( newPos ){
    return mat.pos2angle([
        (newPos[0] - sconf.diagramOrigin[0])/sconf.curve.ellipseA,
        (newPos[1] - sconf.diagramOrigin[1])/sconf.curve.ellipseB,
    ])-sconf.curve.curveParFi0;
}
})();