//******************************************************************
//drag and drop platform constructor d8dp.deviceFW which is
//    "maximally close to device level",
//    this module provides control to upper application
//    levels via "nested" call backs cbDownMoveUp_XX
//    where XX is higher level of call back, f.e.
//    cbDownMoveUp_III
//
//    main constructor is ns.d8dp.deviceFW
//          - handles DOM events,
//          - submits results to app-processor, cbDownMoveUp
//            which can cancel d8d if cbDownMoveUp_XX returns
//            true
//    Copyright (c) 2018-2026 Konstantin Kirillov. License MIT.
//    file history: /var/www/html/bwork/CANV-SVG-VIDEO-CSS/canvas
//    /diagram-editor-vladislav/prj/steps/fios-jan19-35-more/3rd
//    /btb/d8d-device.js
//******************************************************************
{
//we don't use nstree to ease porting this module
//outside of bsl platform,
const ns = window.b$l;
const d8dp = ns.sn( 'd8dp' ); //d8d platform namespace
const stripp = ns.stripp;
let eventId = 0;
let mouseMoveCount = 0;

///****************************************************************
/// d8d object constructor
//  this is most basic d8d constructor sitting in the "bottom" of
//  all d8d constructs of the application,
///****************************************************************
d8dp.deviceFW = function( farg ){ let {
        movesAndFindsHandle,
        dragSurface,  //to whom to attach events
        cbDownMoveUp, //level 0 callback
        skipD8D,
        //hopes to be useful when dragging narrow scrollbar and
        //user's hand cannot keep strict direction down
        //dontCancelAtMouseleave,
        //dontStopEndAfteshocks,
        //dontStopMoveAfteshocks,
        //dontStopDownAfteshocks,
        //
        //frameworkId, //piggyback id for debug
        //where to draw:
        //  final destination of mouse-point-coordinates detection;
        //		can be a div or media;
        //      media means canvas, img, or possibly video;
        //		in general for media, finally detected mouse-point is
        //		in internal media coordinates;
        //
    } = stripp( farg );
    const ds = dragSurface;
    skipD8D = skipD8D || skipD8D_default;
    //------------------------------------------
    // //\\ locals
    //------------------------------------------
    //.is a d8d-in-progress-flag ...
    let startPoint	= null;
    let lastPoint   = null;
    //------------------------------------------
    // \\// locals
    //------------------------------------------
    addEvents();
    if( movesAndFindsHandle &&  !mouseMoveCount ) {
        ds.addEventListener( 'mousemove', movesAndFindsHandle );
        mouseMoveCount++;
    }
    //exports d8d-object of this module
    return {
        //never used: removeEvents,
        eventPos_2_surfacePos,
    };

    //**************************************************************
    // //\\ d8d-scenario root events
    //**************************************************************
    function addEvents(){
        //  possible Android fix:
        //  http://stackoverflow.com/questions/5186441
        //  /javascript-drag-and-drop-for-touch-devices
        //. todm: touch must provide event which then tested for
        //  Ctrl-pressed flag: use different handler
        ds.addEventListener( 'touchstart', doStartDown );
        ds.addEventListener( 'mousedown', doStartDown );
    };
    //**************************************************************
    // \\// d8d-scenario root events
    //**************************************************************

    //*****************************************
    // //\\ DOWN SUBROUTINES
    // //\\ root d8d handler
    //========================================
    function doStartDown( ev ){
        eventId++;
        let forbidden;
        //vital:
        //ns.d('\ndown: fw' + frameworkId + ' eid' + eventId);
        if( skipD8D(ev) ) return;
        ///touch-down
        if( ev.touches && ev.touches.length === 1 ){
            const event = ev.touches[0];
            //seems wrong: event.preventDefault();
            //trying for mobiles
            forbidden = do_complete_down( event, ev );
            if( !forbidden ) {
                stopsAftershocks ( ev );
                ds.addEventListener( 'touchmove',   touchMove);
                ds.addEventListener( 'touchend',    touchEnd);
                ds.addEventListener( 'touchcancel', touchEnd);
                //vital-for-mobile
                //ns.d('mob: fw' + frameworkId + ' eid' + eventId +
                //' owes drag');
                //} else {
                //vital-for-mobile
                //ns.d('mob: fw' + frameworkId + ' eid' + eventId +
                //' skips drag');
            }
        ///mouse-down
        } else {
            forbidden = do_complete_down( ev );
            if( !forbidden ) {
                stopsAftershocks ( ev );
                ds.addEventListener( 'mousemove', mouseMove);
                ds.addEventListener( 'mouseup',   mouseEnd);
                //if( !dontCancelAtMouseleave ) {
                    //todm suspicion: this approach seems not
                    //reliable ... fires right after the mouseDown ...
                    ds.addEventListener( 'mouseleave',  mouseEnd);
                //}
                //vital for debug and mobile
                //ns.d('desk: fw' + frameworkId + ' eid' + eventId +
                //' owes drag');
                //} else {
                //    c cc( 'other clicks are permitted in raw d8d' );
                //vital for debug and mobile
                //ns.d('desk: fw' + frameworkId + ' eid' +
                //eventId + ' skips drag');
            }
        }
        if( movesAndFindsHandle && mouseMoveCount ) {
            //c cc( mouseMoveCount + ' removes' );
            ds.removeEventListener(
                'mousemove', movesAndFindsHandle );
            mouseMoveCount--;
        }
    }
    //========================================
    // \\// root d8d handler
    //========================================

    //=========================================
    // //\\ second level of down-handling
    //=========================================
    function do_complete_down( childEvent, rootEvent ){
        //ns.d( 'do_complete_down: started' );
        if( startPoint !== null ){
            return true;
        }
        const point_on_dragSurf = eventPos_2_surfacePos( childEvent );
        if( !point_on_dragSurf ){
            //vital-for-mobile
            //ns.d('\nfw' + frameworkId + ' eid' + eventId +
            //' point is out dsurf');
            return true;
        }
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        const forbidden = cbDownMoveUp( [0,0], 'down',
                        point_on_dragSurf, childEvent, [0,0] );
        if( forbidden ){
            //c cc( 'down annihilated at lower level, fwId=' +
            //frameworkId );
            return true;
        }
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        startPoint = point_on_dragSurf;
        //ns.d('\nfw' + frameworkId + ' eid' + eventId +
        //     ' startPoint=' +
        //    JSON.stringify(startPoint)
        //);
        lastPoint = point_on_dragSurf;
    }
    //=========================================
    // \\// second level of down-handling
    // \\// DOWN SUBROUTINES
    //*****************************************

    //*****************************************
    // //\\ MOVE SUBROUTINES
    //*****************************************
    function touchMove( ev ){
        mouseMove( ev.touches[ 0 ], ev );
    }

    function mouseMove( childEvent, rootEvent ){
        eventId++;
        //!dontStopMoveAfteshocks &&
        stopsAftershocks(
            rootEvent || childEvent );
        if( !startPoint ){
            //ns.d('mouseMove: no start point exist');
            return;
        }
        const surfPoint = eventPos_2_surfacePos( childEvent );
        if(!surfPoint) {
            //vital-for-mobile
            //ns.d('\nmouseMove: media point failed');
            return;
        }
        const moveIncrement = [
            surfPoint[0]-lastPoint[0],
            surfPoint[1]-lastPoint[1]
        ];
        lastPoint = surfPoint;
        do_complete_move( surfPoint, childEvent, moveIncrement );
        return false;
    }

    ///adds move - the "sugar"
    function do_complete_move(surfPoint, childEvent, moveIncrement){
        const domMove__downToCurrent = [
            surfPoint[ 0 ] - startPoint[ 0 ],
            surfPoint[ 1 ] - startPoint[ 1 ]
        ];
        ///api:
        cbDownMoveUp(
            //total move which begins from down event
            domMove__downToCurrent,
            'move',
            surfPoint,
            childEvent,
            moveIncrement
        );
        return domMove__downToCurrent;
    };
    //*****************************************
    // \\// MOVE SUBROUTINES
    //*****************************************

    //*****************************************
    // //\\ END SUBROUTINES
    //*****************************************
    function touchEnd( rootEvent ){
        ds.removeEventListener( 'touchmove',   touchMove );
        ds.removeEventListener( 'touchend',    touchEnd );
        ds.removeEventListener( 'touchcancel', touchEnd );
        const childEvent = rootEvent.touches && rootEvent.touches[0];
        do_complete_end( childEvent, rootEvent );
    }

    function mouseEnd( child8rootEvent ){
        eventId++;
        //ns.d( '***eid=' + eventId + ' removing mouse events\n\n' );
        ds.removeEventListener( 'mousemove', mouseMove );
        ds.removeEventListener( 'mouseup',  mouseEnd );
        ds.removeEventListener( 'mouseleave', mouseEnd );
        do_complete_end( child8rootEvent );
        if( movesAndFindsHandle && !mouseMoveCount ) {
            //c cc( mouseMoveCount + ' readds' );
            mouseMoveCount++;
            ds.addEventListener( 'mousemove', movesAndFindsHandle );
        }
    }

    ///Input: note: "childEvent" can be missed for touches
    function do_complete_end( childEvent, rootEvent ){
        const eventPoint = childEvent &&
            ( childEvent.clientX || childEvent.clientX === 0 ) &&
            [ childEvent.clientX , childEvent.clientY ];
        const surfPoint = eventPoint &&
            eventPos_2_surfacePos( childEvent );
        if( startPoint ) {
            //!dontStopEndAfteshocks &&
            stopsAftershocks(
                rootEvent || childEvent );
            //programmer may want to make cbDownMoveUp throttable:
            //this is why it is important to provide "up" with
            //surfPoint
            //in case the "move" event will be erased by "up"
            //surf_point = surfPoint || lastPoint;

            ///todm this must be worked out for mobile,
            ///mobile possible does not have meaningful spatial
            ///parameters,
            if( surfPoint ) {
                //ccc( 'surfPoint=', surfPoint );
                const moveIncrement = [
                    surfPoint[0]-lastPoint[0],
                    surfPoint[1]-lastPoint[1]
                ];
                const moveAbsolute = do_complete_move(
                    surfPoint, childEvent, moveIncrement );
                cbDownMoveUp(
                    moveAbsolute,
                    'up',
                    surfPoint,
                    childEvent,
                    moveIncrement );
            } else {
                //ccc( 'no surfPoint=', surfPoint );
                cbDownMoveUp( null, 'up', null, childEvent );
            }
            startPoint = null;
            //ns.d('end fw' + frameworkId + ' eid' + eventId +
            //' startPoint cleared');
        //} else { ////broken scenario
        }
    };
    //*****************************************
    // \\// END SUBROUTINES
    //*****************************************

    //*****************************************
    // //\\ HELPERS
    //===========================================
    /// converts event pos to domelem-css-pos
    function eventPos_2_surfacePos( event ){
        //https://developer.mozilla.org/en-US/docs/Web/API
        // /Element.getBoundingClientRect
        const box	= ds.getBoundingClientRect();
        return [
            Math.round( event.clientX - box.left ),
            Math.round( event.clientY - box.top )
        ];
    }

    ///protects textarea, form elements ... from dragging
    ///    to preserve ordinary clicks on form elements or other
    ///    controls disables dragging on form and other elements
    function skipD8D_default( ev ){
        const tag = ev.target.tagName.toLowerCase();
        if(
            //protects wbd debugger
            tag === 'textarea' ||
            //protects forms
            tag === 'input' || tag === 'select' ||
            tag === 'button'
            //protects firmware plugins which use svg
            // || tag === 'rect' || tag === 'path'
        ){
            return true;
        }
    }

    ///Clears sibling events.
    ///     Can be used to prevent the events set in this module to
    ///     to be caught by native or other event-handlers.
    function stopsAftershocks( rootEvent ){
        rootEvent.preventDefault();
        //very good:
        //  javascript.info/bubbling-and-capturing
        //  stackoverflow.com/questions/5299740
        //      /stoppropagation-vs-stopimmediatepropagation
        if( rootEvent.stopImmediatePropagation ) {
            ////missed on Android 2.?.?
            rootEvent.stopImmediatePropagation(); //IE9+
        } else if( rootEvent.stopPropagation ) {
            rootEvent.stopPropagation();
        }
        /*
        ns.d( 'fw ' + frameworkId + ' blocked dflt and prop ' +
            'on coord surf "' + ds.getAttribute( 'class' ) + '",' +
            'on ds "' + ds.getAttribute( 'class' ) + '"'
        );
        */
    }
    //*****************************************
    // \\// HELPERS
    //*****************************************
};
}