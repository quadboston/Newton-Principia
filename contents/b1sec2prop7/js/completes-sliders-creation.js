( function() {
    var { ssD, stdMod, rg, } = window.b$l.apptree({
        stdModExportList : { creates_S_slider, }, });
    return;


    //=========================================================================
    // //\\ point S slider
    //=========================================================================
    function creates_S_slider() {
        rg.S.dragPriority  = 30;
        rg.S.DRAGGEE_HALF_SIZE = fconf.DRAG_HANDLE_HALFHOTSPOT;
        rg.S.acceptPos = newPos => {
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

