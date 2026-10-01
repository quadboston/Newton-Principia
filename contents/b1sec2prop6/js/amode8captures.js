( function() {
    var {
        sconf, amode, stdMod, rg, }
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    foldPointsRemovedFromTp = false;
    return;


    function amode2rgstate( captured )
    {
        var { logic_phase, subessay } = amode;

        ////shows shapes hidden for a non-Kepler orbit;
        ////model_upcreate() hides them again if still non-Kepler
        stdMod.restoresStashedVisibility();

        sconf.originalPoints.foldPoints.forEach( (fp) => {
            fp.rgX.undisplay = true;
        });

        //----------------------------------
        // //\\ common values
        //----------------------------------
        rg[ 'sagitta' ].undisplay = true;
        //----------------------------------
        // \\// common values
        //----------------------------------

		rg.curvatureCircle.undisplay = 
			!(logic_phase === 'corollary' && subessay === 'corollary3');

        stdMod.rebuilds_orbit();
        return captured;
    }

}) ();
