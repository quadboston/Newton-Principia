( function() {
    var { sDomF, ssD, ssF,
        sData, sconf, amode, toreg, stdMod, rg, }
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    foldPointsRemovedFromTp = false;
    return;


    function amode2rgstate( captured )
    {
        var { logic_phase, aspect, subessay } = amode;
        sData.GRAPH_PATH = sconf.GRAPH_PATH;
        
        sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
            fp.rgX.undisplay = true;
        });

        //----------------------------------
        // //\\ common values
        //----------------------------------
        rg[ 'sagitta' ].undisplay = true;
        rg.curvatureCircle.undisplay = false;
        toreg( 'media_scale' )();

        //won't work in study model
        //because is overriden in in_subessay_launch____amode2lemma by
        //sconf.rgShapesVisible

        rg.APQ.undisplay = false;
        //----------------------------------
        // \\// common values
        //----------------------------------


        if( logic_phase === 'claim' || logic_phase === 'proof' ){
            rg.media_scale.value = 1;
            ssF.scaleValue2app( rg.media_scale.value, );
            rg.curvatureCircle.undisplay = true;
        } else if( logic_phase === 'corollary' && subessay === 'corollary1' ){
            rg.curvatureCircle.undisplay = true;
        } else if( logic_phase === 'corollary' && subessay === 'corollary3' ){
            rg.APQ.undisplay = false;
            rg.timearc.undisplay = true;
        } else if( logic_phase === 'corollary' && subessay === 'corollary5' ){
            rg.curvatureCircle.undisplay = false;
            rg.APQ.undisplay = true;
        } else {
            rg.media_scale.value = 1;
            ssF.scaleValue2app( rg.media_scale.value, );
        }

        ////this refreshes scnenario of
        ////non-Kepler shapes visibility
        ssD.stashedVisibility = null;

        stdMod.rebuilds_orbit();
        sDomF.detected_user_interaction_effect( 'doShowDiagram' );
        return captured;
    }

}) ();