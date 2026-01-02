(function() {
    var { sn, $$, fapp, sconf, sDomF, rg } =
        window.b$l.apptree({ stdModExportList : { 
        generateCurveName,
        generateFigureName,
        hideWhenNonMonotonic,
    }, });
    var stdL2               = sn('stdL2', fapp );
    var study               = sn('study', stdL2 );
    return;


    function generateCurveName(dr) {
        //Generate curve name using letters from input datareg
        if (!dr.POINT_LABELS)
            return "";

        const {CTRL_PT_FIRST, CURVE_MIDDLE, CTRL_PT_LAST} =
            dr.POINT_LABELS;
        const curveName = CTRL_PT_FIRST + CURVE_MIDDLE + CTRL_PT_LAST;
        return sDomF.tpid2low(curveName);
    }


    function generateFigureName(dr) {
        //Generate figure name using letters from input datareg
        if (!dr.POINT_LABELS)
            return "";

        const {CTRL_PT_FIRST, CURVE_MIDDLE, CTRL_PT_LAST, BASE_PT_FIRST} =
            dr.POINT_LABELS;
        const figureName = BASE_PT_FIRST + CTRL_PT_FIRST + CURVE_MIDDLE +
            CTRL_PT_LAST;
        return sDomF.tpid2low(figureName);
    }


    function hideWhenNonMonotonic(dr) {
        //Show/hide the following on the figure as needed
        if (sconf.HIDE_WHEN_NON_MONOTONIC) {
            //Figure base
            $$.$(dr.baseAxis).css( 'display',
                !study.isMonotonic(dr) ? 'none' : 'block' );

            if (dr.POINT_LABELS) {
                const {CTRL_PT_FIRST, CTRL_PT_LAST, BASE_PT_FIRST} =
                    dr.POINT_LABELS;

                const lineLeftSide = rg[BASE_PT_FIRST + CTRL_PT_FIRST];
                if (lineLeftSide)
                    lineLeftSide.undisplay = !study.isMonotonic(dr);

                const lineBottomSide = rg[BASE_PT_FIRST + CTRL_PT_LAST];
                if (lineBottomSide)
                    lineBottomSide.undisplay = !study.isMonotonic(dr);

                rg[BASE_PT_FIRST].undisplay = !study.isMonotonic(dr);
            }
        }
    }
}) ();