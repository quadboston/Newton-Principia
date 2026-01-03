( function() {
    var {
        ns, sconf, fapp, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            captureAState,
        },
    });
    return;








    ///=====================================================
    /// called by User from lab-button, sDomN.captureButton$
    /// put rg-subtrees you desire to capture here
    ///=====================================================
    function captureAState(
        //as of March 3, 2021, has only few "insignificant sugar" GUI props for media d8d
        ast,
    ){
        var cPivots = sconf.originalPoints.curvePivots;
        var cpPoints = [];
        cPivots.forEach( (pivot,pix) => {
            var rgX     = pivot.rgX;
            var pos     = rgX.pos;
            var x       = pos[0];
            var y       = pos[1];
            cpPoints.push( [x,y] );
        });

        var rPivots = sconf.originalPoints.rightCurvePivots_normalized;
        var rpPoints = [];
        rPivots.forEach( (pivot,pix) => {
            var rgX     = pivot.rgX;
            var pos     = rgX.pos;
            var x       = pos[0];
            var y       = pos[1];
            rpPoints.push( [x,y] );
        });

        fapp.captureState(
            //is this a BUG - captures to wrong direction,
            //arguments are swapped?
            ns.paste(
                {
                    curvePivots_points : cpPoints,
                    curveRightPivots_points : rpPoints,
                },
                ast
            )
        );
    }

}) ();

