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
    var sDomN       = sn('dnative', sapp);

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
        //.todo not the best architecture
        //.apparently
            //.application part
            //.solves draggee-point-arrows-misplacement
            //.after resize
        //!!'doDividorSynch'
        ///this statement is inside of this routine: sapp.upcreate();
        fmethods.restrictMediaDimensions && fmethods.restrictMediaDimensions(
            null, null, !!'doDividorSynch'
        );
    }

    function setupSiteWideEvents()
    {
        setNextLemmaButton( 'right' );
        setNextLemmaButton( 'left' );

        var maxWidth = 0;
        [].forEach.call( sDomN.middleNavBar$().children, function( child ) {
            maxWidth = Math.max( maxWidth, child.getBoundingClientRect().width );
        });
        [].forEach.call( sDomN.middleNavBar$().children, function( child ) {
            child.style.width = maxWidth + 'px';
        });

    };

    function setNextLemmaButton( direction )
    {
        var pager$ = direction === 'right' ? sDomN.rightButton$ : sDomN.leftButton$;

        var mList = fconf.sappModulesList[ sapp.sappId ];
        sapp.ix = mList.ix;
        var next = direction === 'right' ? next = sapp.ix + 1 : sapp.ix - 1;
        if( next >= fconf.sappModulesArray.length || next < 0 ||
            fconf.sappModulesArray[ next ].sappId === 'home-pane'
        ) {
            pager$.addClass( 'non-displayed' );
        } else {
            var nextSapp = fconf.sappModulesArray[ next ];
            var fullCaption = nextSapp.book + '. ' + nextSapp.caption + '.';
            var newLoc = window.location.pathname + '?conf=sappId=' + nextSapp.sappId;
            pager$.html( direction === 'right' ?
                '<img src="images/right-page-triangle.svg"> ' + fullCaption :
                fullCaption + ' <img src="images/back-arrow-link.svg">' );
            pager$.a( 'title', "Go to " + nextSapp.caption );
            pager$.removeClass( 'non-displayed' );
            ///this did work but anchor works better
            pager$.e( 'click', function() {
                window.location = newLoc;
                return false;
            });
        }
    }
    

}) ();

