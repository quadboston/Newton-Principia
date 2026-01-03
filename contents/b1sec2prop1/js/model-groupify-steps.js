(function(){
    const { haz, rg, amode, stdMod, sconf,
    } = window.b$l.apptree({ stdModExportList : {
            trajectoryShapes_2_groups__III,
        },
    });
    return;


//*******************************************
// //\\ setsup show scenario
//      called in media-model.js::media_upcreate()::
//                stdMod.trajectoryShapes_2_groups__III();
//*******************************************
function trajectoryShapes_2_groups__III()
{
    var pathRacks = rg.pathRacks.pathRacks;
    ///pathIx_2_groups: pathIx |-> fGroups = [ fgroup0, fgroup1, ... ].
    rg.pathIx_2_pathSubsteps = pathRacks.map( (
        rgPathPoint,
        pix //=total index ~ (motion-step, logical-interaction-substep)
    ) => {
        // in plain words:
        // fGroups[i] = motion = path-element[j],
        // it has "all the goodies" for specific logical-step,
        // it contains fragment-groups,
        //
        // fgroup === fragment group is a logical step
        //
        // fragments and fgroups are prebuilt based on solution for entire path
        // and then can be displayed depending on app-state,
        var fGroups = [];
        
        if( pix === 0 ) {
            ////logical group 0 = empty grop for reached point A
            var fgroup = [];
            fGroups.push( fgroup );
        } else {
            ////logical groups for C and beyond
            //------------------------------------
            // //\\ logical group 0
            //------------------------------------
            var fgroup = [];
            fGroups.push( fgroup );   
            fgroup.push( rgPathPoint );
            //------------------------------------
            // \\// logical group 0
            //------------------------------------

            //------------------------------------
            // //\\ logical group 1
            //------------------------------------
            var fgroup = [];
            fGroups.push( fgroup );   
            fgroup.push( rgPathPoint );
            //------------------------------------
            // \\// logical group 1
            //------------------------------------

            //------------------------------------
            // //\\ logical group 2 = force applied group
            //------------------------------------
            var fgroup = [];
            fGroups.push( fgroup );   
            fgroup.push( rgPathPoint );
            
            if( sconf.TIMER_AND_LOGIC_STEPS_COINSIDE ||
                haz( amode, 'userControl') === 'text' ) {
                //:force appears
                var fkey        = 'force-' + (pix-1);
                var fappliedKey = fkey + '-applied';
                var tipKey      = fkey+'-1';
                fgroup.push( rg[ fappliedKey ] );   
                fgroup.push( rg[ tipKey ] );   
                fgroup.push( rg[ 'VVV'+pix ] );   
                //this is a blue thickable path line:
                //we show it here in prelast proof-substep of motion-step
                //fgroup.push( rg[ 'pathSegment-' + (pix-1) ] ); //bug fix
                fgroup.push( pathRacks[ pix ] );
                if( pix < pathRacks.lengh-1 ) {
                    fgroup.push( rg[ 'pathSegment-' + (pix) ] );
                }
            }
            //------------------------------------
            // \\// logical group 2 = force applied group
            //------------------------------------

            //------------------------------------
            // //\\ logical group 3 = path finalized group
            //------------------------------------
            var fgroup = [];
            fGroups.push( fgroup );   
            fgroup.push( rgPathPoint );

            //:force still visible
            var fkey = 'force-' + (pix-1);
            var fappliedKey = fkey + '-applied';
            var tipKey      = fkey+'-1';
            fgroup.push( rg[ fkey + '-applied' ] );
            fgroup.push( rg[ fkey+'-1' ] );
            fgroup.push( rg[ fappliedKey ] );   
            fgroup.push( rg[ tipKey ] );   
            fgroup.push( rg[ 'VVV'+pix ] );   

            //The following previously checked "pix<pathRacks.length-1", however pathRacks.length varies even when the desired result doesn't.
            //As the delta time slider is moved to the left pathRacks.length increases, however when moved back to the right pathRacks.length 
            //doesn't decrease.  This means that the following would sometimes get added for an extra step.  rg.spatialSteps-1 always has the
            //correct value, and therefore a consistent result.
            if (pix < rg.spatialSteps - 1) {
                fgroup.push( rg[ 'kepltr-' + pix ] );
                fgroup.push( rg[ 'pathSegment-' + (pix) ] );
            }
            fgroup.push( pathRacks[ pix ] );
            //------------------------------------
            // \\// logical group 3 = path finalized group
            //------------------------------------

        }
        return fGroups;
    });
}
//*******************************************
// \\// setsup show scenario
//*******************************************
})();
