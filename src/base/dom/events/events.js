// //\\// Application core-events setup
( function() {
    var {
        sn, $$,
        has, haz, haf, hafa,
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
        userOptions
    } = window.b$l.apptree({
    });

    fmethods.setupEvents            = setupEvents;
    fmethods.setupCapturerEvents    = setupCapturerEvents;
    fmethods.does_set_next_lemma_button_event    = does_set_next_lemma_button_event;
    fmethods.fullResize             = fullResize;
    fmethods.attachWeelToDomEl      = attachWeelToDomEl;
    fmethods.executeCapturedState   = executeCapturedState;
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
                amode.userControl = 'text';
                executeCapturedState( match[1] );
            });
        });
    };

    function executeCapturedState( captureKeyName ) {
        sDomF.detected_user_interaction_effect();
        //match[1] is astateKey
        //was: hafa( stdMod, 'astate_2_rg8model8media' )( ... match[1] ], match[1] );
        hafa( stdMod, 'astate_2_rg8model8media' )( ssD.capture[ captureKeyName ] );
    }
    
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
        haf( wrkwin, "start8finish_media8Ess8Legend_resize__upcreate" )(
            null, !!'doDividorSynch'
        );
    }


    function does_set_next_lemma_button_event( direction )
    {
        var pager$ = direction === 'right' ? sDomN.rightButton$ : sDomN.leftButton$;

        var mList = fconf.sappId2lemmaDef[ fconf.sappId ];
        sapp.ix = mList.ix;
        var next = direction === 'right' ? next = sapp.ix + 1 : sapp.ix - 1;
        if( next >= fconf.ix2lemmaDef.length || next < 0 ||
            fconf.ix2lemmaDef[ next ].sappId === 'home-pane' ||
            (fconf.ix2lemmaDef[ next ].annotation === userOptions.BONUS_START && !userOptions.showingBonusFeatures())
        ) {
            pager$.addClass( 'non-displayed' );
        } else {
            var nextSapp = fconf.ix2lemmaDef[ next ];
            var fullCaption = nextSapp.book + '. ' + nextSapp.caption;
            var newLoc = window.location.pathname + '?conf=' +
                ( userOptions.showingBonusFeatures() ? 'basicSiteFeatures=no,' : '' ) +
                'sappId=' + nextSapp.sappId;

            if( fconf.appDecor.putTextDescriptionIntoTopNavigationArrows  ){
                var wwFullCaption = direction === 'right' ? fullCaption : fullCaption + ' ';
            } else {
                var wwFullCaption = '';
            } 
            pager$.html( direction === 'right' ?
                '<img src="' + fconf.engineImg + '/right-page-triangle.svg"> ' +
                wwFullCaption :
                wwFullCaption + '<img src="' + fconf.engineImg + '/back-arrow-link.svg">' );

            pager$.a( 'title', "Go to " + nextSapp.caption );
            pager$.removeClass( 'non-displayed' );
            ///this did work but anchor works better
            pager$.e( 'click', function() {
                window.location = newLoc;
                return false;
            });
        }
    }
    

    function attachWeelToDomEl( domel$, stdMod )
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
            rg.media_scale.stdMod = stdMod;
            ssF.scaleValue2app( newScale, stdMod ); //resets applic. state to new scale
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

