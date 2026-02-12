(function (){
const { $$, sn, haz, has, eachprop,
        rg, stdMod } =
        window.b$l.apptree({ stdModExportList : { unmasksVisib, }});
const decor = sn( 'decor', stdMod );
return;


///**********************************************************************
///      makes final paint of evolution at the end of
///      media-model.js::media_upcreate() or
///      inside the slider,
///      as of Aug11,2021 does not run alone, but attached to
///      slider maintenance,
///      apparently, this function uses outdated engine design because of
///      it does not use: doPaintLetter8kernel( pname )
///**********************************************************************
function unmasksVisib (){
    //===================================================
    // //\\ localizes variables
    //===================================================
    const path          = rg.path.pos;
    const pathRacks     = rg.pathRacks.pathRacks;
    const pathIx_2_pathSubsteps = rg.pathIx_2_pathSubsteps;
    //----------------------------------------
    // //\\ time offsets
    //----------------------------------------
    const steps       = pathRacks.length;
    const stepIx4     = rg.stretchedFourTimes_stIx;
    const substepIx   = rg.substepIx;
    const stepIx      = rg.stepIx.value;
    //c cc( 'stepIx4 '+stepIx4, 'substepIx '+substepIx, 'stepIx '+stepIx );
    //todm why this can happen? float-calc error of stepIx?
    //no path paint above the time step
    //if( pathRacks.length <= stepIx ) return;
    //----------------------------------------
    // \\// time offsets
    // \\// localizes variables
    //===================================================

    stdMod.hides_all_shapes();

    //--------------------------------------
    // //\\ picture drawing began
    //--------------------------------------
    // always shows first Kepler's triangle to show
    // all other Kepler's triangles are equal to it
    $$.$( rg[ 'kepltr-' + 0 ].svgel).removeClass( 'undisplay' );
    //Also show the path segment.
    $$.$( rg[ 'pathSegment-' + 0 ].svgel).removeClass( 'undisplay' );
    //rg[ 'VVV0' ].undisplay = false;
    //--------------------------------------
    // \\// picture drawing began
    //--------------------------------------

    //----------------------------------------------
    // //\\ Show the following group decorations
    //      (eg. purple triangles, forces etc.).
    //----------------------------------------------
    //See "model-groupify-steps.js" function "trajectoryShapes_2_groups__III"
    //where the groups are setup for more details.

    //Each step has decorations that should be shown.  Each step corresponds
    //to a group, and each group has sub-groups which
    //correspond to substeps.  Therefore any group before the current step 
    //("stepIx") should show its final sub-group, the
    //current step should show its sub-group corresponding to the current
    //substep ("substepIx"), and any remaining groups
    //shouldn't be shown.

    //Don't go beyond the current step, the number of triangles that
    //should be shown, or the length of the array.
    const indexMax = Math.min(stepIx, rg.spatialSteps - 1,
                         pathIx_2_pathSubsteps.length - 1);
    //Start with the second group (see the "picture drawing began"
    //section above for the first one).
    for (let index = 1; index <= indexMax; index++) {
        const fgroups = pathIx_2_pathSubsteps[index];
        const indexFGroupsMax = fgroups.length-1;
        const indexSubstep = Math.min((index < stepIx ?
                indexFGroupsMax : substepIx), indexFGroupsMax);
        if (indexSubstep > -1) {
            fgroups[indexSubstep].forEach( (paintee) => {
                //paintee?.pname === 'VVV0' && ccc(index,indexSubstep,paintee)
                paintee?.svgel && $$.$(paintee.svgel).removeClass( 'undisplay' );
                paintee?.vectorArrowSvg$?.removeClass( 'undisplay' );
                paintee && (paintee.undisplay = false);
            });
        }
    }
    //----------------------------------------------
    // \\// Show the following group decorations
    //----------------------------------------------

    ///=====================================================
    ///visualizes decs
    ///=====================================================
    eachprop( decor, dec => {
        const decStart = dec.decStart;
        const decEnd   = dec.decEnd;
        if( decStart === -2 ||
            ( decStart <= stepIx4 &&
                ( decEnd === -2 || stepIx4 <= decEnd )
            )
        ){
            dec.undisplay = false;
        }
        if( !dec.isPoint ) {
            const arrow$ = haz( dec, 'vectorArrowSvg$' );
            if( arrow$ ) {
                const act = haz( dec, 'undisplay' );
                arrow$.toggleClass( 'undisplay', act );
            }
            if( has( dec, 'svgel$' )){ //todo patch
                dec.svgel$.toggleClass( 'undisplay', haz( dec, 'undisplay' ) );
            }
        }
    });
}
})();