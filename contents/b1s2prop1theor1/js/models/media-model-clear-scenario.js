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
        stdMod.clearScenario    = clearScenario;
    }

    //*******************************************
    // //\\ clears scenario
    //      does it every time before drag
    //*******************************************
    function clearScenario()
    {
        //===================================================
        // //\\ localizes variables
        //===================================================
        var pathRacks   = rg.pathRacks.pathRacks;
        var scenario    = rg.guiShowScenario;
        //===================================================
        // \\// localizes variables
        //===================================================


        undisplayDecorationPoints();
        scenario.forEach( (fragment,fix) => {
            //ccc( fix + ' clears fragment=', fix );
            fragment.forEach( (fgroup,gix) => {
                //ccc( fix + ' ' + gix + ' clears fgroup=', fgroup );
                fgroup.forEach( ( paintee, mix ) => {
                    //ccc( fix + ' ' + gix + ' ' + mix + ' class=', paintee );
                    $$.$(paintee.svgel).addClass( 'display-none' ).removeClass( 'display-yes' );
                });
            });
        });

        pathRacks.forEach( (prack, pix ) => {
            $$.$(prack.svgel).addClass( 'display-none' ).removeClass( 'display-yes' );

            //:hides all forces
            if( pix > 0 ) {
                var fkey = 'force-' + (pix-1);
                var fappliedKey = fkey + '-applied';
                var tipKey = fkey+'-1';
                $$.$(rg[ fappliedKey ].svgel)
                        .addClass( 'display-none' ).removeClass( 'display-yes' );   
                $$.$(rg[ tipKey ].svgel)
                        .addClass( 'display-none' ).removeClass( 'display-yes' );   
            }

            if( pix < pathRacks.length-1 && pix-1 >= 0 ) {
                //cleans final path
                $$.$(rg[ 'pathSegment-' + (pix-1) ].svgel)
                    .addClass( 'display-none' ).removeClass( 'display-yes' );

                var fkey = 'force-' + (pix-1);
                var fappliedKey = fkey + '-applied';
                var tipKey = fkey+'-1';
                $$.$(rg[ fappliedKey ].svgel)
                  .addClass( 'display-none' ).removeClass( 'display-yes' );
                $$.$(rg[ tipKey ].svgel)
                    .addClass( 'display-none' )
                    .removeClass( 'display-yes' );   
            }
        });
    }
    //*******************************************
    // \\// clears scenario
    //*******************************************


    function undisplayDecorationPoints()
    {
        ns.eachprop( ssD.decor, dec => {

            //:special decorations are not cleared here
            if( dec.pname !== 'B' &&
                dec.pname !== 'V' &&
                dec.pname !== 'A' &&  //todm seems vital ... too cumbersome
                dec.pname !== 'S' &&
                dec.pname !== 'P' &&

                dec.pname !== 'TP' &&
                dec.pname !== 'SP' ) {

                dec.undisplay = true;
            }
        });
    }



}) ();

