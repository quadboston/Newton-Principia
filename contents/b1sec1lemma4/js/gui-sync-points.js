( function () {
    var { sn, $$, fapp, sconf, rg, amode, stdMod, } = window.b$l.apptree({
        stdModExportList : { syncPoints, }, });
    var stdL2       = sn('stdL2', fapp );
    var numModel    = sn('numModel', stdL2 );
    var study       = sn('study', stdL2 );
    return;


    ///======================================
    /// syncronizes positions for
    /// framework points with legacy
    /// code points (with rg[ name ].pos)
    ///======================================
    function syncPoint(dr, pname, pos) {
        //Move point to position on the transformed figure.

        const pt = rg[pname];
        if (!pt)
            return;

        const posTransformed = stdMod.xy_2_Txy(dr, [pos.x, pos.y]);

        //Additional offset and scaling required for rg points, to ensure they
        //end up in the correct position.
        var xoff = sconf.originX_onPicture;
        //yoff is equal to 0 in "numerical space" of "rg.point.pos"
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;

        pt.pos[0] = (posTransformed[0] - xoff) / scale;
        pt.pos[1] = -(posTransformed[1] - yoff) / scale;
    }


    function syncPoints(dr) {
        const ptsUntransformed = dr.ctrlPts.untransformed;
        const ptFirst = ptsUntransformed[0];
        const ptLast = ptsUntransformed[ptsUntransformed.length - 1];

        if (ptFirst && ptLast) {
            const xMiddle = (ptFirst.x + ptLast.x) / 2;
            const posMiddle = {x: xMiddle, y: numModel.curveFun(dr, xMiddle)};
            const posBaseFirst = {x: ptFirst.x, y: ptLast.y};

            const {CTRL_PT_FIRST, CURVE_MIDDLE, CTRL_PT_LAST, BASE_PT_FIRST} =
                dr.POINT_LABELS;
            syncPoint(dr, CTRL_PT_FIRST, ptFirst);
            syncPoint(dr, CTRL_PT_LAST, ptLast);
            syncPoint(dr, CURVE_MIDDLE, posMiddle);
            syncPoint(dr, BASE_PT_FIRST, posBaseFirst);
        }
    }
    
    
}) ();

