{
const {
        sn, mat, stdMod, sconf, fconf, rg, ssD
        } =
        window.b$l.atree({ stdModList: {
            init__curve_pivots_sliders,
      }});


///curve pivotsPos sliders
function init__curve_pivots_sliders(){
    const bezio = ssD.bezio;
    const rgn = 'borbit';
    const cps = rg[rgn].cpivots;
    cps.forEach( (cp,cpix) => {
        var pos1 = rg[ rgn + '-' + cpix ].pos;
        var stashedPos = null;
        var stashedCurveP = null;
        cp.rgShape.DRAGGEE_HALF_SIZE = fconf.DRAG_HANDLE_HALFHOTSPOT;
        cp.rgShape.processOwnDownEvent = () => {
            let pos = rg.borbit.bodyq2xy( bezio.ix2parameter[cpix] );
            stashedPos = [ pos[0], pos[1] ];
        };
        cp.rgShape.processOwnUpEvent = () => {
            ////forgotten: why we make curve point non-changed?
            pos1[0] = stashedPos[0];
            pos1[1] = stashedPos[1];
        };
        cp.rgShape.acceptPos = (newPos, move) => {
            var REPELLING_DISTANCE = 0.01;
            //--------------------------------------------------------------
            // //\\ preserves pivot's order along x and being them too close
            //      to each other; note: order is reverse to axis x order,
            //--------------------------------------------------------------
            var previousPoint = cpix-1;
            var nextPoint = cpix+1;
            var nextPoint = (nextPoint === cps.length ) ? null : nextPoint;
            var previousPoint = (previousPoint < 0 ) ? null : previousPoint;
            //--------------------------------------------------------------
            // \\// preserves pivot's order along x and being them too close
            //--------------------------------------------------------------

            let dpos0 = newPos[0]-stashedPos[0];
            let dpos1 = newPos[1]-stashedPos[1];
            let pos = bezio.pivotsPos[cpix];
            let bpos0 = pos[0];
            let bpos1 = pos[1];

            //this is clear, we calculate dependency, then
            //multiply this dependency with curve-pivot displecement
            //and add the reusult to bezier-pivot,
            let c2p = bezio.cpivots2bezierPivots[cpix];
            pos[0] += dpos0*c2p;
            pos[1] += dpos1*c2p;
            bezio.updatesPivot( pos, cpix );

            rg.borbit.rebuilds_orbit( ssD.Dt );
            // P is already repositioned in rebuilds_orbit
            //updates curve pivots every time:
            stdMod.bp2cp();
            stashedPos = [ newPos[0], newPos[1] ];
            return true;
        };
    });
}
}