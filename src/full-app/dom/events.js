// //\\// Application core-events setup
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 
    var sapp        = sn('sapp' ); 
    var fconf       = sn('fconf',fapp);
    var fmethods    = sn('methods',fapp);
    var sDomF       = sn('dfunctions', sapp);

    fmethods.setupEvents            = setupEvents;
    fmethods.setupSiteWideEvents    = setupSiteWideEvents;
    fmethods.fullResize             = fullResize;
    return;






    function setupEvents()
    {
        window.addEventListener( 'resize', fullResize );
    };

    function fullResize( arg )
    {
        fmethods.test_mobile_and_attach_exegesis_tabs();

        //.??
        //.application part
        //.solves draggee-point-arrows-misplacement
        //.after resize

        sapp.upcreate();
        sDomF.resizeMenuDecorations();
        fmethods.restrictMediaDimensions && fmethods.restrictMediaDimensions(
            null, null, !!'doDividorSynch'
        );
    }

    function setupSiteWideEvents()
    {
        setNextLemmaButton( 'right' );
        setNextLemmaButton( 'left' );
        setNextLemmaButton( 'right', 'mobile' );
        setNextLemmaButton( 'left', 'mobile' );
    };

    function setNextLemmaButton( direction, mobile_or_desktop )
    {
        var cssPrefix = mobile_or_desktop === 'mobile' ? '.mobile-link' : '.desktop-link';
        var searchClass = 'a' + cssPrefix + '.page-btn--' + direction;
        var pager = document.querySelector( searchClass );
        if( pager ) {

            var mList = fconf.sappModulesList[ sapp.sappId ];
            sapp.ix = mList.ix;
            var next = direction === 'right' ? next = sapp.ix + 1 : sapp.ix - 1;
            if( next >= fconf.sappModulesArray.length || next < 0 ) {
                $$.$(pager).addClass( 'non-displayed' );
            } else {
                var nextSapp = fconf.sappModulesArray[ next ];
                var newLoc = window.location.pathname + '?conf=sappId=' + nextSapp.sappId;
                pager.title = "Go to " + nextSapp.caption;
                pager.href= newLoc;
            }
            /*
            if( next > 0 ) {
                ///this did work but anchor works better
                pager.addEventListener( 'click', function() {
                    window.location = newLoc;
                    return false;
                });
            }
            */
        }
    }
    

}) ();

