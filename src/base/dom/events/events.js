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
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var wrkwin      = sn('wrkwin',ssD); //work window

    fmethods.setupEvents            = setupEvents;
    fmethods.setupCapturerEvents    = setupCapturerEvents;
    fmethods.does_set_next_lemma_button_event    = does_set_next_lemma_button_event;
    fmethods.fullResize             = fullResize;
    return;




    ///===================================================
    /// sets click event for each capture reference
    ///  "captured reference" can be found in essay text
    ///===================================================
    function setupCapturerEvents()
    {
        var links = document.querySelectorAll( '.captured-reference' );
        links.forEach( link => {
            var match = link.getAttribute( 'class' ).match( /\sid-(\S+)/ );
            link.setAttribute( 'title', 'click to go to episode' );
            link.addEventListener( 'click', function() {

                ////prevents code-crash if subapp does not define "appState__2..."
                var stdMod = ns.haz( studyMods, amode.submodel );
                sDomF.detected_user_interaction_effect();
                //match[1] is astateKey
                if( ns.h( stdMod, 'astate_2_rg8model8media' ) ) {
                    ns.haf( stdMod, 'astate_2_rg8model8media' )( ssD.capture[ match[1] ], match[1] );
                } else {
                    ////remove this later
                    ns.haf( ssF, 'astate_2_rg8model8media' )( ssD.capture[ match[1] ], match[1] );
                }

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
        ns.haf( wrkwin, "finish_Media8Ess8Legend_resize__upcreate" )(
            null, !!'doDividorSynch'
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

