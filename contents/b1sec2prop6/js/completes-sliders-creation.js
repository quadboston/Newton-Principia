( function() {
    var { sn, mat, ssD, stdMod, sconf, rg, } = window.b$l.apptree({
        stdModExportList : { creates__curve_pivots_sliders, creates_S_slider, }, });
    return;


    //=========================================================================
    // //\\ point S slider
    //=========================================================================
    function creates_S_slider() {
        rg.S.acceptPos = newPos => {
            //does this for decorational purposes
            stdMod.rebuilds_orbit( ssD.Dt );
            //this permits an orbitrary move

            updatePointPPos();
            return true;
        }
    }
    //=========================================================================
    // \\// point S slider
    //=========================================================================



    //=========================================================================
    // //\\ curve pivotsPos sliders
    //=========================================================================
    function creates__curve_pivots_sliders(){
        const bezio = ssD.bezio;
        var pivs = sconf.originalPoints.curvePivots;
        pivs.forEach( (cp,cpix) => {
            var pos1 = rg[ 'curvePivots-' + cpix ].pos;
            var stashedPos = null;
            cp.rgX.processOwnDownEvent = () => {
                let pos = stdMod.q2xy( bezio.ix2parameter[cpix] );
                stashedPos = [ pos[0], pos[1] ];
            };

            cp.rgX.processOwnUpEvent = () => {
                ////forgotten: why we make curve point non-changed?
                pos1[0] = stashedPos[0];
                pos1[1] = stashedPos[1];
            };

            cp.rgX.acceptPos = (newPos, move) => {
                var REPELLING_DISTANCE = 0.01;
                //--------------------------------------------------------------
                // //\\ preserves pivot's order along x and being them too close
                //      to each other; note: order is reverse to axis x order,
                //--------------------------------------------------------------
                var previousPoint = cpix-1;
                var nextPoint = cpix+1;
                var nextPoint = (nextPoint === pivs.length ) ? null : nextPoint;
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
                let c2p = bezio.curvePivots2bezierPivots[cpix];
                pos[0] += dpos0*c2p;
                pos[1] += dpos1*c2p;
                bezio.updatesPivot( pos, cpix );

                stdMod.rebuilds_orbit( ssD.Dt );
                updatePointPPos();

                ///updates curve pivots every time:
                stdMod.bezierPivotsToCurvePivots();


                stashedPos = [ newPos[0], newPos[1] ];
                if( ssD.foldPoints.length ) {
                    ////we do return true, because would like to
                    ////redraw gapped orbit with pivots
                    return true;
                }
                return true;
            };
        });
    }
    //=========================================================================
    // \\// curve pivotsPos sliders
    //=========================================================================



    function updatePointPPos() {
        //Update point P qix (position) to be as close as possible to where it
        //was before.  Also adjusts it as needed to ensure at valid qix if out
        //of bounds to prevent issues.
        if( stdMod.graphArray.length ){
            ////for case when curve shape changes,
            //tricky loop: pos -> qix -> pos( in upcreate_model ):
            rg.P.qix = stdMod.gets_orbit_closest_point( rg.P.pos, !!'fromGraph' );
        }
    }
}) ();

