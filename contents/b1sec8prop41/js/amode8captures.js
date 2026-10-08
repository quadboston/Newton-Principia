( function() {
    var {
        nspaste,
        sDomF,
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

        return captured;
    }

}) ();