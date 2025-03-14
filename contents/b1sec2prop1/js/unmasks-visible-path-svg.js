

( function() {
    var {
        $$, sn, mat, haz, has, haf, nspaste, eachprop, nssvg,
        sapp, sconf, sDomF, ssD, ssF, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            unmasksVisib,
        },
    });
    var decor = sn( 'decor', stdMod );
    return;







    //**********************************************************************
    // //\\ makes final paint of evolution at the end of
    //      media-model.js::media_upcreate() or
    //      inside the slider,
    //      as of Aug11,2021 does not run alone, but attached to
    //      slider maintenance,
    //      apparently, this function uses outdated engine design because of
    //      it does not use: doPaintLetter8kernel( pname )
    //**********************************************************************
    function unmasksVisib()
    {
        //===================================================
        // //\\ localizes variables
        //===================================================
        var rgPos2rgMedia = ssF.rgPos2rgMedia;
        var path          = rg.path.pos;
        var pathRacks     = rg.pathRacks.pathRacks;
        var pathIx_2_pathSubsteps = rg.pathIx_2_pathSubsteps;
        //----------------------------------------
        // //\\ time offsets
        //----------------------------------------
        var steps       = pathRacks.length;
        var stepIx4     = rg.stretchedFourTimes_stIx;
        var substepIx   = rg.substepIx;
        var stepIx      = rg.stepIx.value;
        //c cc( 'stepIx4 '+stepIx4, 'substepIx '+substepIx, 'stepIx '+stepIx );
        //todm why this can happen? float-calc error of stepIx?
        //no path paint above the time step
        //if( pathRacks.length <= stepIx ) return;

        //----------------------------------------
        // \\// time offsets
        // \\// localizes variables
        //===================================================





        //--------------------------------------
        // //\\ cleanup
        //--------------------------------------
        stdMod.doesMask_model8decor_svg_shapes();
        //--------------------------------------
        // \\// cleanup
        //--------------------------------------

        //--------------------------------------
        // //\\ picture drawing began
        //--------------------------------------
        // always shows first Kepler's triangle to show
        // all other Kepler's triangles are equal to it
        $$.$( rg[ 'kepltr-' + 0 ].svgel).removeClass( 'undisplay' );
        //Also show the path segment.
        $$.$( rg[ 'pathSegment-' + 0 ].svgel).removeClass( 'undisplay' );
        //--------------------------------------
        // \\// picture drawing began
        //--------------------------------------


        //----------------------------------------------
        // //\\ Show the following group decorations (eg. purple triangles, forces etc.).
        //----------------------------------------------
        //See "model-groupify-steps.js" function "trajectoryShapes_2_groups__III" where the groups are setup for more details.

        //Each step has decorations that should be shown.  Each step corresponds to a group, and each group has sub-groups which 
        //correspond to substeps.  Therefore any group before the current step ("stepIx") should show its final sub-group, the 
        //current step should show its sub-group corresponding to the current substep ("substepIx"), and any remaining groups
        //shouldn't be shown.

        //Don't go beyond the current step, the number of triangles that should be shown, or the length of the array.
        const indexMax = Math.min(stepIx, rg.spatialSteps - 1, pathIx_2_pathSubsteps.length - 1);
        //Start with the second group (see the "picture drawing began" section above for the first one).
        for (let index = 1; index <= indexMax; index++) {
            const fgroups = pathIx_2_pathSubsteps[index];
            const indexFGroupsMax = fgroups.length-1;
            
            const indexSubstep = Math.min((index < stepIx ? indexFGroupsMax : substepIx), indexFGroupsMax);
            if (indexSubstep > -1) {
                fgroups[indexSubstep].forEach( (paintee) => {
                    $$.$(paintee.svgel).removeClass( 'undisplay' );
                    paintee?.vectorArrowSvg$?.removeClass( 'undisplay' );
                });
            }
        }
        //----------------------------------------------
        // \\// Show the following group decorations (eg. purple triangles, forces etc.).
        //----------------------------------------------




        //=====================================================
        // //\\ visualizes decs
        //=====================================================
        //dec ===rg[ pname ] at this dev. moment
        eachprop( decor, dec => {
            var decStart = dec.decStart;
            var decEnd   = dec.decEnd;
            if( decStart === -2 ||
                ( decStart <= stepIx4 &&
                    ( decEnd === -2 || stepIx4 <= decEnd )
                )
            ){
                dec.undisplay = false;
            }
            if( dec.isPoint ) {
                dec.svgel$.tgcls( 'undisplay', haz( dec, 'undisplay' ) );
                if( dec.doPaintPname &&
                    !haz( rg, 'allLettersAreHidden' )
                ) {
                    dec.pnameLabelsvg$.tgcls( 'undisplay', haz( dec, 'undisplay' ) );
                }
            } else {
                let arrow$ = haz( dec, 'vectorArrowSvg$' );
                if( arrow$ ) {
                    let act = haz( dec, 'undisplay' );
                    arrow$.tgcls( 'undisplay', act );
                    //act && rgX.vectorArrowSvg$.removeClass( 'hidden' );
                }
                dec.svgel$.tgcls( 'undisplay', haz( dec, 'undisplay' ) );
            }
        });
        //==============================================
        // \\// visualizes decs
        //==============================================
    }
    //*******************************************
    // \\// particle evolution master painter
    //*******************************************


}) ();

