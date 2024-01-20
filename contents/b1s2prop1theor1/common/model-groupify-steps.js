( function() {
    var {
        rg,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            trajectoryShapes_2_groups,
        },
    });
    return;









    //*******************************************
    // //\\ setsup show scenario
    //      called in media-model.js::media_upcreate()::
    //                stdMod.trajectoryShapes_2_groups();
    //*******************************************
    function trajectoryShapes_2_groups()
    {
        var pathRacks = rg.pathRacks.pathRacks;
        rg.pathIx_2_pathSubsteps = pathRacks.map( (rgPathPoint, pix) => {

            // in plain words:
            // fGroups[i] = motion = path-element[j],
            // it has "all the goodies" for specific logical-step,
            // it contains fragment-groups,
            //
            // fgroup === fragment group is a logical step
            //
            // fragments and fgroups are prebuilt based on solution for entire path
            // and then can be displayed depending on app-state,
            //
            var fGroups = [];

            if( pix === 1 ) {
                var fgroup = [];
                fGroups.push( fgroup );

                fgroup.push( rgPathPoint );

                //:"circumscribed" triangle
                fgroup.push( rg[ 'kepltr-' + (pix-1) ] );
                //:final path
                fgroup.push( rg[ 'pathSegment-' + (pix-1) ] );
            }


            if( pix > 1 ) {

                //0
                //------------------------------------
                // //\\ initial group
                //------------------------------------
                var fgroup = [];
                fGroups.push( fgroup );   
                fgroup.push( rgPathPoint );
                //:previous kepler
                fgroup.push( rg[ 'kepltr-' + (pix-2) ] );
                //:current free path segment added
                fgroup.push(
                    rg[ 'freePathSegment-' + (pix-2) ]
                );
                //:current free path added
                fgroup.push(
                    rg[ 'freepath-' + (pix-2) ]
                );
                fgroup.push(
                    rg[ 'freetr-' + (pix-2) ]
                );
                //------------------------------------
                // \\// initial group
                //------------------------------------

                //1
                //------------------------------------
                // //\\ added force group
                //------------------------------------
                var fgroup = [];
                fGroups.push( fgroup );   
                fgroup.push( rgPathPoint );
                //:previous added
                fgroup.push( rg[ 'kepltr-' + (pix-2) ] );
                fgroup.push(
                    rg[ 'freePathSegment-' + (pix-2) ]
                );   
                fgroup.push(
                    rg[ 'freepath-' + (pix-2) ]
                );
                fgroup.push(
                    rg[ 'freetr-' + (pix-2) ]
                );
                //:force appears
                var fkey = 'force-' + (pix-2);
                var fappliedKey = fkey + '-applied';
                var tipKey = fkey+'-1';
                fgroup.push( rg[ fappliedKey ] );   
                fgroup.push( rg[ tipKey ] );   
                //------------------------------------
                // \\// added force group
                //------------------------------------

                //2
                //------------------------------------
                // //\\ force applied group
                //------------------------------------
                var fgroup = [];
                fGroups.push( fgroup );   
                fgroup.push( rgPathPoint );
                //:previous added
                fgroup.push( rg[ 'kepltr-' + (pix-2) ] );
                fgroup.push(
                    rg[ 'freePathSegment-' + (pix-2) ]
                );   
                fgroup.push(
                    rg[ 'freepath-' + (pix-2) ]
                );
                fgroup.push(
                    rg[ 'freetr-' + (pix-2) ]
                );
                //:force appears
                var fkey = 'force-' + (pix-2);
                var fappliedKey = fkey + '-applied';
                var tipKey = fkey+'-1';
                fgroup.push( rg[ fappliedKey ] );   
                fgroup.push( rg[ tipKey ] );   

                //.new kepler
                fgroup.push( rg[ 'kepltr-' + (pix-1) ] );

                //this is a blue thickable path line:
                //we show it here in prelast proof-substep of motion-step
                fgroup.push( rg[ 'pathSegment-' + (pix-1) ] ); //bug fix

                //:still keep free path
                fgroup.push( rg[ 'freePathSegment-' + (pix-2) ] );
                //:shows force translated to the tip of free path segment
                fgroup.push( rg[ 'translated-force-' + (pix-2) + '-applied' ] );
                fgroup.push( rg[ 'translated-force-' + (pix-2) + '-1' ] );
                //------------------------------------
                // \\// force applied group
                //------------------------------------

                //3
                //------------------------------------
                // //\\ path finalized group
                //------------------------------------
                var fgroup = [];
                fGroups.push( fgroup );   
                fgroup.push( rgPathPoint );
                //:previous kepler
                fgroup.push( rg[ 'kepltr-' + (pix-1) ] );
                fgroup.push( pathRacks[ pix-1 ] );
                fgroup.push( rg[ 'pathSegment-' + (pix-1) ] );

                //:force still visible
                var fkey = 'force-' + (pix-2);
                var fappliedKey = fkey + '-applied';
                var tipKey = fkey+'-1';
                fgroup.push( rg[ fappliedKey ] );
                fgroup.push( rg[ tipKey ] );
                //------------------------------------
                // \\// path finalized group
                //------------------------------------

            }
            ///todm: what is this ... poor design?
            if( !fGroups.length ) {
                fGroups[0] = [];
            }
            return fGroups;
        });
    }
    //*******************************************
    // \\// setsup show scenario
    //*******************************************


}) ();

