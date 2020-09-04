( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var mat         = sn('mat');
    var bezier      = sn('bezier');
    var sv          = sn('svg');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var tr          = ssF.tr;
    var tp          = ssF.tp;
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_create';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var stdMod;
    return;








    function setModule()
    {
        stdMod                  = sn(SUB_MODEL, studyMods);
        stdMod.does_groupify_showElements    = does_groupify_showElements;
    }

    //*******************************************
    // //\\ setsup show scenario
    //*******************************************
    function does_groupify_showElements()
    {
        //===================================================
        // //\\ localizes variables
        //===================================================
        var pathRacks       = rg.pathRacks.pathRacks;
        //===================================================
        // //\\ localizes variables
        //===================================================

        var scenario = rg.guiShowScenario = pathRacks.map( (pt, pix) => {

            // in plain words:
            // fragment[i] = motion = path-element[j],
            // it has "all the goodies" for specific logical-step,
            // it contains fragment-groups,
            //
            // fgroup === fragment group is a logical step
            //
            // fragments and fgroups are prebuilt based on solution for entire path
            // and then can be displayed depending on app-state,
            //
            var fragment = [];

            if( pix === 1 ) {
                var fgroup = [];
                fragment.push( fgroup );
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
                fragment.push( fgroup );   
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
                fragment.push( fgroup );   
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
                fragment.push( fgroup );   
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
                fragment.push( fgroup );   
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
            if( !fragment.length ) {
                fragment[0] = [];
            }
            return fragment;
        });
    }
    //*******************************************
    // \\// setsup show scenario
    //*******************************************


}) ();

