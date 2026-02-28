( function() {
    var {
        mat,
        sconf,
        rg,
        stdMod, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            updates__draggers2toFunctions,
            rightFun_2_rightFigure,
        },
    });
    rg.rightFun_2_rightFigure = rightFun_2_rightFigure;
    return;










    function rightFun_2_rightFigure( x )
    {
        var y = rg.rightFunction.dividedDifferences
                  .calculate_polynomial( x );
        return stdMod.xy_2_Txy( [x,y] );
    }

    function updates__draggers2toFunctions()
    {
        //left function
        rg.leftFunction.dividedDifferences = mat.calculate_divided_differences(
            ssD.curvePivots.map( pivot => (
                [ pivot.rgX.pos[0], pivot.rgX.pos[1] ]
            )
        ));

        //right function
        //normalized: (non-normalized should be decorational and obtained by
        //            direct transform.
        rg.rightFunction.dividedDifferences = mat.calculate_divided_differences(
            ssD.rightCurvePivots_normalized.map( rpivot =>
                [ rpivot.rgX.pos[0], rpivot.rgX.pos[1] ]
            )
        );
    }



}) ();

