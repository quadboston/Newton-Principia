( function() {
    var { ssD, stdMod, sconf, rg, toreg, } = window.b$l.apptree({
        stdModExportList : { init_model_parameters, }, });
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters() {
        stdMod.initiates_orbit8graph();

        //body moves backward on x,
        toreg( 'vt' )( 'val', 1 );
        //creates placeholder
        toreg( 'curvatureCircle' );

        //-----------------------------------------
        // //\\ partially draggers and decoration
        //      are initiated here
        //      todm: not very consistent,
        //-----------------------------------------
        sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
            fp.rgX = rg[ 'foldPoints-' + ppix ];
            fp.rgX.undisplay = true;
        });
        //-----------------------------------------
        // \\// partially draggers and decoration
        //-----------------------------------------

        rg.allLettersAreHidden = true;
    }

}) ();

