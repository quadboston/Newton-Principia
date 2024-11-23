

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
        //--------------------------------------
        // \\// picture drawing began
        //--------------------------------------



        //----------------------------------------------
        // //\\ makes visible previous path
        //----------------------------------------------
        let pathRacksLen1 = pathRacks.length-1;
        pathRacks.forEach( (prack, pix ) => {

            //--------------------------------------------
            // //\\ makes visible already accomplished path
            //      by direct svg-undisplay
            //--------------------------------------------
            //not used:
            //$$.$(prack.svgel).removeClass( 'undisplay' );

            if( pix > 0 && pix <= stepIx && pix < pathRacksLen1 ) {
                $$.$( rg[ 'pathSegment-' + (pix-1) ].svgel)
                    .removeClass( 'undisplay' );

                //makes visible all kepler triangles along the path,
                //they will be in zebra-colors in proof to distinguish,
                //if( stepIx < 6 || pix < stepIx-1 ) {
                    $$.$( rg[ 'kepltr-' + (pix-1) ].svgel)
                        .removeClass( 'undisplay' );
                //}
            }
            //--------------------------------------------
            // //\\ makes visible  previous forces
            //      'force-N' and
            //      'force-N-1' shapes
            //      by direct svg-undisplay
            //--------------------------------------------
            if( pix < stepIx - 1) {
                var fkey        = 'force-' + pix;
                var fappliedKey = fkey + '-applied';
                var tipKey      = fkey+'-1';
                let rgX         = rg[ fappliedKey ];
                $$.$(rgX.svgel).removeClass( 'undisplay' );
                rgX.vectorArrowSvg$.removeClass( 'undisplay' );
                $$.$(rg[ tipKey ].svgel).removeClass( 'undisplay' );
            }
            //--------------------------------------------
            // \\// makes visible  previous forces
            // \\// makes visible already accomplished path
            //--------------------------------------------
        });
        //----------------------------------------------
        // \\// makes visible previous path
        //----------------------------------------------



        //----------------------------------------------
        // //\\ makes visible last fragment's fgroup,
        //      last steps where already displayed,
        //      by direct svg-undisplay,
        //      there can be less fgroups than 4
        //----------------------------------------------
        //.sets phase to latest fgroups index === substepIx
        var fgroups           = pathIx_2_pathSubsteps[ stepIx ];
        var fgroups_substepIx = Math.min( fgroups.length-1, substepIx );
        var fgroup            = fgroups[ fgroups_substepIx ];
        //if( !fgroup ) return;
        ///this visualizes necessary fragments:
        if( amode.aspect !== 'claim' ) {
            fgroup.forEach( (paintee, leafix) => {
                $$.$(paintee.svgel).removeClass( 'undisplay' );
                let vectorArrowSvg$ = haz( paintee, 'vectorArrowSvg$' );
                vectorArrowSvg$ && vectorArrowSvg$.removeClass( 'undisplay' );
            });
        }
        //----------------------------------------------
        // \\// makes visible last fragment,
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

