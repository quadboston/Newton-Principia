( function() {
    var { ssD, stdMod, rg, } = window.b$l.apptree({
        stdModExportList : { creates_S_slider, }, });
    return;


    //=========================================================================
    // //\\ point S slider
    //=========================================================================
    function creates_S_slider() {
        rg.S.dragPriority  = 30;
        rg.S.acceptPos = newPos => {
             //Update pos here, otherwise graph is rebuilt using old pos, which
             //leads to issues (eg. estimated force won't converge on actual).
             rg.S.pos[0] = newPos[0];
             rg.S.pos[1] = newPos[1];

            //does this for decorational purposes
            stdMod.rebuilds_orbit( ssD.Dt );
            //this permits an orbitrary move
            return true;
        }
    }
    //=========================================================================
    // \\// point S slider
    //=========================================================================
}) ();

