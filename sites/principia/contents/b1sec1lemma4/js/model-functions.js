(function(){
    const {mat, sconf,rg, stdMod, ssD,} = window.b$l.atree({
        stdModList: {
            updates__draggers2toFunctions,
            rightFun_2_rightFigure,
        },
    });
    rg.rightFun_2_rightFigure = rightFun_2_rightFigure;
    return;

    ///converts virtual-right-function to plot the result
    ///as a right figure, x,y are virtual coordinates
    ///mapped into "space" of left function,
    function rightFun_2_rightFigure( x ){
        var y = rg.rightFunction.dividedDifferences
                  .calculate_polynomial( x );
        return stdMod.xy_2_Dxy( [x,y] );
    }

    function updates__draggers2toFunctions (){
        //left function
        rg.leftFunction.dividedDifferences = mat.calculates_divided_differences_fw(
            rg.leftCurvePivots.cpivots.map( pivot => (
                [ pivot.rgX.pos[0], pivot.rgX.pos[1] ]
            )
        ));
        //right function
        //normalized: (non-normalized should be decorational and obtained by
        //            direct transform.
        rg.rightFunction.dividedDifferences = mat.calculates_divided_differences_fw(
            rg.rightCurvePivots_normalized.cpivots.map( rpivot =>
                [ rpivot.rgX.pos[0], rpivot.rgX.pos[1] ]
            )
        );
    }
})();

