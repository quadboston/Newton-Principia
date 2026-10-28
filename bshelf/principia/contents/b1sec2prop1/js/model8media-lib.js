(function(){
    const {
        sn, haff, haz, nspaste, mat, nssvg,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode,
    } = window.b$l.atree({
        stdModList: {
            doesPosition_PTandTheirLine,
            protects_curTime_ranges,
            slTime_2_stepIndice8tCaption,
        },
    });
    return;

    ///returns protected time
    function protects_curTime_ranges( ctime ){
        ctime = ( ctime || ctime === 0 ) ? ctime :
            rg.timeslider.val;
        ctime = Math.min( ctime, sconf.timeRange * 0.999999 );
        rg.timeslider.val = ctime;
        return ctime;
    }

    ///points P and T do depend on time, so cannot be updated
    ///in tr2decs subroutine
    function doesPosition_PTandTheirLine (){
        var st      = rg.stepIx.value;
        var path    = rg.path.pos;
        //Constrain the step value as follows.  Previously
        //"if( st >= path.length -1 ) return;" was run however
        //this caused an issue.
        //The positions for the “perpendicular” and “rectilinear
        //tangent” lines
        //in P1 “Corollary 1”, didn't get updated when the time
        //slider was at its maximum and the delta time slider was
        //dragged to the left.
        st = Math.min(st, path.length -1);

        //perpendicular to unseen lines looks awkward
        //st -= rg.substepIx < 2 ? 1 : 0;
        var pos0    = path[ st-1 ];
        var pos1    = path[ st ];
        nspaste( rg.P.pos, mat.dropPerpendicular(
            rg.S.pos, pos0, pos1 ) );
        nspaste( rg.T.pos, pos0 );
        //rg.P.p is unit vector interface
        rg.P.p = mat.p1_to_p2( rg.S.pos, rg.P.pos );
    }
function slTime_2_stepIndice8tCaption (){
    var ctime = rg.timeslider.val;

    //*****************************************************
    // //\\ establishes master step, main step, and substep
    //      stepIx4   = 0,1,2,3,  4,5,6,7,  8,9,10,11, ...
    //      substepIx = 0,1,2,3,  0,1,2,3,  0,1, 2, 3, ...
    //      stepIx    = 0,0,0,0,  1,1,1,1,  2,2, 2, 2, ...
    //      point     = A,A,A,A,  -,-,-,B,  -,-, C, C, ...
    //*****************************************************
    //full index = master index reached in orbit and logic:
    //virtual thing, just stretches time to better subdivide stepIx
    var stepIx4 = Math.floor( ctime *
        //(4/rg['sl-rgn-dt'].val));
        (4/rg.dtslider.val));
    rg.stretchedFourTimes_stIx = stepIx4;

    //local index = reached substep
    rg.substepIx  = stepIx4%4;

    //cell index = main step of orbit =
    //number of completed orbit steps =
    var stepIx = ( stepIx4 - rg.substepIx ) / 4;

    //The following line caused some bugs, has been commented out,
    //and left for reference.  If the delta time slider is moved
    //to the
    //left of its maximum eg. 0.73, then when the time slider
    //is moved
    //to the left from its maximum, the time shown first increases
    //then decreases (eg. 9.43 to 10.15 then back to 9.43).
    //This caused similar increasing/decreasing issues for
    //the “path step”
    //text in the Proof tab, and showing/hiding the last red
    //force vector
    //in the model area.
    // stepIx = Math.min( stepIx, rg.spatialSteps - 1 );

    toreg( 'stepIx' )( 'value', stepIx );
    /*
        c cc( 'ctime=' + ctime +
            ' ESTABLISH: stepIx4=' + stepIx4 +
            ' substepIx=' + rg.substepIx +
            ' stepIx=' + stepIx
        );
    */
    //*****************************************************
    // \\// establishes master step, main step, and substep
    //*****************************************************

    rg.thoughtStep.value = (rg.substepIx+1) + '';
    //sets granular time display increment during last proof step
    let nexStepDisplay = ( rg.substepIx === 3 ? 1 : 0 ) +
                           rg.stepIx.value;
    rg.displayTime.value = ( nexStepDisplay *
                             rg.dtslider.val ).toFixed(2);
    rg.displayPathStep = { value:nexStepDisplay };
}
})();