// //\\// Application core-events setup
( function() {
    var {
        sn, $$,
        has, haz, haf,
        sapp, fapp,
        fconf,
        fmethods,
        stdMod,
        rg,
        wrkwin,
        ssF, ssD,
        amode,
        studyMods,
        sDomN,
        sDomF,
    } = window.b$l.apptree({
    });

    fmethods.setupEvents            = setupEvents;
    fmethods.setupCapturerEvents    = setupCapturerEvents;
    fmethods.does_set_next_lemma_button_event    = does_set_next_lemma_button_event;
    fmethods.fullResize             = fullResize;
    fmethods.attachWeelToDomEl      = attachWeelToDomEl;
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
                var stdMod = haz( studyMods, amode.submodel );
                sDomF.detected_user_interaction_effect();
                //match[1] is astateKey
                if( has( stdMod, 'astate_2_rg8model8media' ) ) {
                    haf( stdMod, 'astate_2_rg8model8media' )( ssD.capture[ match[1] ], match[1] );
                } else {
                    ////remove this later
                    haf( ssF, 'astate_2_rg8model8media' )( ssD.capture[ match[1] ], match[1] );
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
        haf( wrkwin, "finish_Media8Ess8Legend_resize__upcreate" )(
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
                '<img src="' + fconf.engineImg + '/right-page-triangle.svg"> ' +
                fullCaption :
                fullCaption + ' <img src="' + fconf.engineImg + '/back-arrow-link.svg">' );
            pager$.a( 'title', "Go to " + nextSapp.caption );
            pager$.removeClass( 'non-displayed' );
            ///this did work but anchor works better
            pager$.e( 'click', function() {
                window.location = newLoc;
                return false;
            });
        }
    }
    

    function attachWeelToDomEl( domel$ )
    {
        const WHEEL_SCALE_FOR_SCROLL_MODE = 0.001;
        domel$.e( 'wheel', wheelHandler );

        function wheelHandler( ev ) {
            if( ev.altKey ) {
                ////does roaming
                //doHandle( { move : 2, value : ev.deltaY, target : 'msprite' }, ev );
            } else {
                ////does scrolling
                doHandle( ev );
            }
        }

        function doHandle( ev )
        {
            stopAftershocks( ev );
            sDomF.detected_user_interaction_effect( !'not-moved' );
            var newScale =
                Math.exp(
                    Math.log( rg.media_scale.value ) +
                        ev.deltaY * WHEEL_SCALE_FOR_SCROLL_MODE
                );

            var validated = rg.media_scale.value2validate2pos( newScale );
            if( !validated ) return;
            rg.media_scale.value = newScale;
            ssF.scaleValue2app( newScale ); //resets applic. state to new scale
            rg.media_scale.modPos_2_GUI();
            stdMod.model8media_upcreate();
        };

        function stopAftershocks( ev )
        {
            ev.preventDefault();
            //this.event.cancelBubble = true;
            //historical? https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelBubble
            //very good: https://javascript.info/bubbling-and-capturing
            if( ev.stopImmediatePropagation ) {
                ////missed on Android 2.?.?
                ev.stopImmediatePropagation(); //IE9+
            } else {
                ev.stopPropagation();
            }
        };
    }
    ///wheel


}) ();

