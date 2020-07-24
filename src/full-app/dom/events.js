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

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    fmethods.setupEvents            = setupEvents;
    fmethods.setupCapturerEvents    = setupCapturerEvents;
    fmethods.does_set_next_lemma_button_event    = does_set_next_lemma_button_event;
    fmethods.fullResize             = fullResize;
    return;

    ///===================================================
    /// sets click event for each capture reference
    ///===================================================
    function setupCapturerEvents()
    {
        var links = document.querySelectorAll( '.captured-reference' );
        links.forEach( link => {
            var match = link.getAttribute( 'class' ).match( /\sid-(\S+)/ );
            link.setAttribute( 'title', 'click to go to episode' );
            link.addEventListener( 'click', function() {
                ssF.appState__2__study8media__models( ssD.capture[ match[1] ] );
            });
        });
    };


    function setupEvents()
    {
        window.addEventListener( 'resize', fullResize );
    };

    function fullResize()
    {
        //.todm not the best architecture
        //.apparently
            //.application part
            //.solves draggee-point-arrows-misplacement
            //.after resize
        //!!'doDividorSynch'
        ///this statement is inside of this routine: sapp.up-create();
        fmethods.finish_Media8Ess8Legend_resize && fmethods.finish_Media8Ess8Legend_resize(
            null, null, !!'doDividorSynch'
        );
    }


    function does_set_next_lemma_button_event( direction )
    {
        var pager$ = direction === 'right' ? sDomN.rightButton$ : sDomN.leftButton$;

        var mList = fconf.sappModulesList[ fconf.sappId ];
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

