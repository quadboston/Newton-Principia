( function() {
    var {
        nspaste, toreg, 
        sDomF, ssF, 
        stdMod, rg, sconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            amode2rgstate,
        },
    });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {

        sDomF.resetModelPos();

        var media_scale         = toreg( 'media_scale' )();
        rg.media_scale.value    = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        {
            ////restores original pivots positions
            let ini = sconf.originalPoints.curvePivots_initial;
            sconf.originalPoints.curvePivots.forEach( (cp,ix) => {
                nspaste( cp.rgX.pos, ini[ix].rgX.pos );
            });
            //sets and paints initial orbit
            stdMod.pointsArr_2_singleDividedDifferences(
                false, 'force', false, false, 'swap' );
        }
        var op        = sconf.orbitParameters;
        op.angleOmega = op.angleOmega_initial;
        op.Kepler_v   = op.Kepler_v_initial;


        // //\\ hiding
        rg.nonSolvablePoint.undisplay = true;
        rg[ 'V,Vangle' ].undisplay = true;
        rg.R.undisplay = false;
        rg.M.undisplay = true;
        rg.Z.undisplay = true;
        rg.vgpoint.undisplay = true;
        rg.Zgpoint.undisplay = true;

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        //sDomF.detected_user_interaction_effect( );
        return captured;
    }

}) ();