// //\\// Provides d&d module for set of points which act exclusively
//        one at the time and share common handler.
//        The active point is elected by "findDraggee" function
//        which is supplied at initialization time.
( function() {
    var { ns, sn, d8dp, haz, $$, dpdec, sconf, fconf } = window.b$l.apptree({});
    d8dp.crePointFW_BSLd8d1CHAMBER = crePointFW_BSLd8d1CHAMBER;

    d8dp.throttles_eventMove = throttles_eventMove;
    var createdFrameworks = [];
    return;


    ///===========================================================
    /// //\\ inits common framework for the set of  point-draggees
    ///      There can be as many frameworks as one wishes.
    ///this function is never called outside of createsFW__8__executes_dragWr_gens_list
    ///(except workplace-dividor.js),
    ///
    ///making finalizes-custDraggers8toolsSliders.js::findDraggee() an effective
    ///default finder instead of d8d-framework.js::findDraggee_default()
    ///
    ///lemma1,lemma2, possibly have own createDragModel() and finder
    ///===========================================================
    function crePointFW_BSLd8d1CHAMBER({
            //// api
            findDraggee, //function which finds draggeePoint 
            dragSurface,

            inn2outparent, //only? for spinner ... optional if nospinner is not set?

            //the rest is optional

            //fires this function at down event and only at this event
            detected_user_interaction_effect,

            decPoint_parentClasses,
            processMouseDown,

            //only for two things:
            //  findDraggee_default()
            //  spinner((u pdate_decPoint_default))
            handle2dragsurf_pos,

            dontStopDownAfteshocks,
            dontStopMoveAfteshocks,
            dontStopEndAfteshocks,
            attachee,
            doGiveClickEvent,
            doCreateDynamicSpinners,
            spinnerCursorGrab,
            spinnerCursorGrabbed,
    }) {
        findDraggee = findDraggee || findDraggee_default;
        handle2dragsurf_pos = handle2dragsurf_pos || handle2dragsurf_pos_default;

        var frameworkId = createdFrameworks.length;

        var selectedElement_flag;
        var activeDecPoint = null;
        var spinnerCandidate = null;
        var dragWraps = [];
        ///sets single lower-level handler for framework draggees
        var { givenClickEvent, eventPos_2_surfacePos } = d8dp.creFW_BSLd8d1BASE({
            surface : dragSurface,


            //most basic handler between basic-d8d-constructor and app.,
            //receives data from low-level "driver", receives moves and
            //       surface points, processes "doProcess"-like calls,
            //       on detected drag-lements: calls aka:
            //       selectedElement_flag.doProcessWrap()
            //          which has interface:
            /*
                            * *api-doProcessWrap 
                            down_move_up    : down_move_up, //flag, string
                            //possibly = move from start to current,                                    
                            surfMove        : surfMove,
                            moveIncrement   : moveIncrement,
                            dragWrap        : selectedElement_flag,
                            point_on_dragSurf,
            */
            d8d_cb_middle2lowest,

            frameworkId,
            dontStopDownAfteshocks,
            dontStopMoveAfteshocks,
            dontStopEndAfteshocks,
            attachee,
            doGiveClickEvent,
            
            movesAndFindsHandle : doCreateDynamicSpinners && movesAndFindsHandle,
        });

        var createdFramework = 
        {
            frameworkId,
            dragSurface,
            decPoint_parentClasses,
            givenClickEvent,
        };
        createdFrameworks.push( createdFramework );
        return {
            pointWrap_2_dragWrap_BSLd8d2PIPE : pointWrap_2_dragWrap,
            updateAllDecPoints,
            givenClickEvent,
        };




        function movesAndFindsHandle( rootEvent )
        {
            //----------------------------------------------------------
            // //\\ possible update for mobile for spinner
            //----------------------------------------------------------
            ///touch-down
            //if( rootEvent.touches && rootEvent.touches.length === 1 ) {
            //    var childEvent = rootEvent.touches[0];
            //var point_on_dragSurf = eventPos_2_surfacePos( childEvent );
            //----------------------------------------------------------
            // \\// possible update for mobile for spinner
            //----------------------------------------------------------

            var point_on_dragSurf = eventPos_2_surfacePos( rootEvent );
                
            //seems wrong: childEvent.preventDefault(); //trying for mobiles
            //forbidden = do_complete_down( childEvent, ev );
            spinnerCandidate = findDraggee(
                point_on_dragSurf,
                dragWraps,
                dragSurface
            );
            //very good for debug:
            //c cc( spinnerCandidate.pointWrap.pname  );

            if( activeDecPoint ) {
                activeDecPoint.style.display = 'none';
            }
            const decPoint = haz( spinnerCandidate, 'decPoint' );

            //if( spinnerCandidate.pointWrap.pname === 'P' )
            //c cc( spinnerCandidate.pointWrap.pname, decPoint );

            if( decPoint && spinnerCandidate.pointWrap.pname !== 'media-mover' ) {
                if( spinnerCandidate.pointWrap.hideD8Dpoint ) {
                    decPoint.style.display = 'none';
                } else {
                    decPoint.style.display = 'block';
                    //vital
                    //html global style tag does not do this:
                    dragSurface.style.cursor = spinnerCursorGrab || 'grab';

                    activeDecPoint = decPoint;
                }
            } else {
                //Only switch cursor (from default) if media mover is enabled.
                 dragSurface.style.cursor = sconf.mediaMoverPointDisabled ?
                    '' : 'grab';
            }
        }




        //==========================================
        // //\\ converts pos-in-parent to dom-pos
        //==========================================
        //Gets position of dom-drag-handle in respect to drag-surface.
        //In contrary to "inn2outparent",
        //  it does not convert inner-media-position and
        //  does not convert inner-model-position to dom position.
        //The dragHandleDOM must belong the "surface".
        function handle2dragsurf_pos_default( dragWrap, dragSurface )
        {
            var rr = dragSurface.getBoundingClientRect();
            var hh = dragWrap.dragHandleDOM.getBoundingClientRect();
            //var orien = dragWrap.orientation;
            var h2r = [
                hh.left - rr.left + hh.width/2,
                hh.top - rr.top + hh.height/2
            ];
            return h2r;
        }
        //==========================================
        // \\// converts pos-in-parent to dom-pos
        //==========================================



        function updateAllDecPoints()
        {
            dragWraps.forEach( function( dragWrap ) {
                var uP = dragWrap.update_decPoint;
                uP && uP( dragWrap.decPoint, dragSurface, dragWrap.pointWrap,
                          //'nonenify'
                );
                //c cc( 'all dec end: ', dragWrap.decPoint );
            });
        }


        ///Creates drag handler for each specific point-draggee.
        ///Usually called when each model point is created to be dragged.
        // **api-pointWrap_2_dragWrap
        function pointWrap_2_dragWrap( api )
        {
            //---------------------------------------------
            // //\\ AAA PPP III
            //---------------------------------------------
            var pointWrap            = api.pointWrap || {};
            var doProcess            = api.doProcess; //to be set at point-def.
            //:optional

            ////////////////////////////////////////////////////////////////////
            // //\\ the combination of these switches is too convoluted and
            //      needs thought:
            //==================================================================
            var addFeaturesToDecPoint= haz( pointWrap, 'addFeaturesToDecPoint');
            //thes two ignite
            //addFeaturesToDecPoint.dragDecorColor as a condition to
            //run creates_spinnerOwnCss()
            var spinnerClsId         = pointWrap.spinnerClsId;
            var dragDecorColor       = pointWrap.dragDecorColor;
            //==================================================================
            // \\// the combination of these switches is too convoluted and
            ////////////////////////////////////////////////////////////////////

            var individual_zindex    = haz( pointWrap, 'individual_zindex' );
            var makeCentralDiskInvisible = pointWrap.makeCentralDiskInvisible;
            var update_decPoint      = api.update_decPoint;
            var nospinner            = api.nospinner;
            var grabffect            = api.spinnerCursorGrab || spinnerCursorGrab;
            var grabbedffect         = api.spinnerCursorGrabbed || spinnerCursorGrabbed;
            
            var orientation          = api.orientation;
            var achieved             = api.achieved; //api sugar
            var dragHandleDOM        = api.dragHandleDOM;
            var tooltip              = api.tooltip;
            //---------------------------------------------
            // \\// AAA PPP III
            //---------------------------------------------

            //==============================================
            // //\\ api.achieved is an optional parameter
            //      see page footnote comment;
            //==============================================
            if( !ns.h( pointWrap, 'achieved' ) ) {
                pointWrap.achieved = ( achieved || achieved === 0 ) ?
                                     { achieved : achieved } : { achieved : {} };
            }
            //==============================================
            // \\// api.achieved is an optional parameter
            //==============================================

            //========================================================
            // //\\ creates and updates drag overlay: decoration point
            //========================================================
            var decPoint = null;
            if( !nospinner ) {
                update_decPoint = !update_decPoint ?
                    update_decPoint_inn2outparent :
                    ( update_decPoint === 'update_decPoint_default' ?
                           update_decPoint_default :
                           update_decPoint
                    );

                if( spinnerClsId ) {
                    //don't do this here: not a d8d concern:
                    //var cssIdLowCase = sDomF.topicIdUpperCase_2_underscore(
                    //spinnerClsId );
                    var cssIdLowCase = spinnerClsId;

                    addFeaturesToDecPoint = Object.assign(
                            addFeaturesToDecPoint || {},
                            {
                                dragDecorColor      : dragDecorColor,
                                spinnerClsId        : cssIdLowCase,
                                individual_zindex   : individual_zindex,
                                spinnerCursorGrab   : grabffect,
                                spinnerCursorGrabbed : grabbedffect,
                            }
                    );
                }

                decPoint = dpdec.adds_decorSpinner({
                    spinner_domParent : dragSurface,
                    opt :
                    {
                        tooltip,
                        addFeaturesToDecPoint,
                            orientation     : orientation,
                            parent_classes  : decPoint_parentClasses,
                            makeCentralDiskInvisible : makeCentralDiskInvisible,
                    }
                });
            }
            //========================================================
            // \\// creates and updates drag overlay: decoration point
            //========================================================


            //=====================================================
            // //\\ drag8drop main wrapper over item
            //=====================================================
            var dragWrap =
            {
                pointWrap       : pointWrap,
                doProcessWrap   : doProcessWrap,
                update_decPoint : update_decPoint,
                //recall: decPoint = document.createElement( 'div' )
                decPoint        : decPoint,
                orientation     : orientation,
                dragHandleDOM   : dragHandleDOM,
                achieved,
                createdFramework,
            }
            dragWraps.push( dragWrap );
            //**********************************************
            //not yet implemented, but planned:
            // app engine change since ver 9239,
            // allows to get decPoint at run time, f.e.
            //pointWrap.dragWrap = dragWrap;
            //**********************************************


            //if( pointWrap.pname === 'fret-0-0' ) {
            //    ccc( 'dragWrap is created for ' + pointWrap.pname );
            //}

            //nonefy is needed
            update_decPoint &&
                update_decPoint( decPoint, dragSurface, pointWrap,
                                 doCreateDynamicSpinners ? 'nonenify' : 'block' );
            //=====================================================
            // \\// drag8drop main wrapper over item
            //=====================================================
                
            //explicit setting to avoid property in prototype:
            sn( 'dragPriority', pointWrap, 0 );
            return; // dragWrap; //todm consider adding this
                    //to pointWrap



            //=====================================================
            // //\\ tiny wrap around doProcess
            //=====================================================
            function doProcessWrap(
                //see: **api-doProcessWrap
                //see: **supplied-to-api
                /*
                    down_move_up    : down_move_up,
                    surfMove        : surfMove,
                    moveIncrement   : moveIncrement,
                    dragWrap        : selectedElement_flag,
                    point_on_dragSurf,
                */
                arg
            ){
                //logical bonus: pointWrap may be missed in
                //doProcess closure ...
                arg.pointWrap = pointWrap; 
                var appFeedback = doProcess(
                    //see: **api-doProcessWrap
                    /*
                        down_move_up    : down_move_up,
                        surfMove        : surfMove,
                        moveIncrement   : moveIncrement,
                        dragWrap        : selectedElement_flag,
                        point_on_dragSurf,
                    */
                    arg
                );
                if( 'do disappear d8d' === appFeedback ) {
                    selectedElement_flag = null;
                    //ccc( 'doProcessWrap: appFeedback=', appFeedback );
                    return appFeedback;
                }
                //ccc( 'doProcessWrap: allowed' );
                if( arg.down_move_up === 'up' ) {
                    const decPoint = haz( selectedElement_flag, 'decPoint' );
                    if( decPoint ) {
                        update_decPoint( decPoint,
                                         dragSurface, selectedElement_flag,
                                         //'nonenfy'
                        );
                    }
                    ////this cleans up drag and drop lifecycle
                    selectedElement_flag=null;
                }
            }
            //=====================================================
            // \\// tiny wrap around doProcess
            //=====================================================

            ///updates spinner position.
            ///uses already existing-on-drag-surface handle, "dragWrap", to synch with it.
            ///recall: spinner is a div with two children divs which are animated
            ///        spinner's master-css is made here:
            ///        bsl/d8d/decorator.css.js::creates _spinnerOwnCss.
            function update_decPoint_default( decPoint, dragSurface, pointWrap, nonenify )
            {
                var dompos = handle2dragsurf_pos( dragWrap, dragSurface );
                decPoint.style.left = dompos[0] + 'px';            
                decPoint.style.top = dompos[1] + 'px';
                
                if( nonenify === 'nonenify' ) {
                    decPoint.style.display = 'none';
                } else if( nonenify === 'block' ) {
                    if( !pointWrap.ignore_hideD8Dpoint_for_CSS &&
                        pointWrap.hideD8Dpoint
                    ) {
                        decPoint.style.display = 'none';
                    } else {
                        decPoint.style.display = 'block';
                    }
                }
            }

            ///this thing runs when no update_decPoint is supplied to
            //      pointWrap_2_dragWrap( api )
            ///recall: spinner is a div with two children divs which are animated
            ///        spinner's master-css is made here:
            ///        bsl/d8d/decorator.css.js::creates _spinnerOwnCss
            ///does position spinner by converting
            ///inner-media-position to dom-position
            ///and setting spinner ot this dom-position
            function update_decPoint_inn2outparent(dummy1, dummy2, dummy3, nonenify)
            {
                var dompos   = inn2outparent.call( pointWrap );
                //c cc( pointWrap.rgId, pointWrap.pos, dompos );
                //console.log(dompos);
                decPoint.style.left = dompos[0] + 'px'; // this is just pos of decoration          
                decPoint.style.top  = dompos[1] + 'px'; // not the actual draggable element

                if( nonenify === 'nonenify' ) {
                    decPoint.style.display = 'none';
                } else if( nonenify === 'block' ) {
                    if( !pointWrap.ignore_hideD8Dpoint_for_CSS &&
                        pointWrap.hideD8Dpoint
                    ) {
                        decPoint.style.display = 'none';
                    } else {
                        decPoint.style.display = 'block';
                    }
                }
            }
        }




        ///d8d handler shared between all draggee-points.
        ///Input: point_on_dragSurf
        ///       it is precalculated by lower level handler;
        ///       it offsets in "local-surface" if no special converter is supplied:
        ///       details are in d8d code:
        ///            var point_on_dragSurf = eventPoint_2_localPoint( childEvent );
		///            var eventPoint_2_localPoint = arg.eventPoint_2_localPoint ||
        ///                                          eventPos_2_surfacePos;
        function d8d_cb_middle2lowest(
            surfMove, down_move_up, point_on_dragSurf, event, moveIncrement
        ){
            var fw = createdFramework;
            //vital-for-mobile
            //ns.d('fram/w: case="' + down_move_up + '"');
            switch( down_move_up )
            {
                case 'down': 
                    //vital-for-mobile
                    //ns.d('down: fw=' + fw.frameworkId );

                    if( selectedElement_flag ) {
                        ns.d('bug ' + down_move_up + '"');
                        ////possible bug
                        ////ns.d(ww);
                        return true;
                    }
                    selectedElement_flag = spinnerCandidate || findDraggee(
                            point_on_dragSurf,
                            dragWraps,
                            dragSurface
                    );
                    if( !selectedElement_flag ) return true;
                    
                    detected_user_interaction_effect && detected_user_interaction_effect();
                    processMouseDown && processMouseDown( selectedElement_flag.pointWrap );
                    
                    if( ns.haz( selectedElement_flag, 'decPoint' ) ) {
                        //c cc('grabbing ' + selectedElement_flag.decPoint.className);
                        $$.$( selectedElement_flag.decPoint ).addClass( 'grabbing' );
                    }

                    //todM: let it to return !!'forbid drag'
                    //      which will add a "sugar" "just-a-clcik" and
                    //      even click behind screening surface
                    var appFeedback = selectedElement_flag.doProcessWrap({
                        //// **supplied-to-api
                        down_move_up    : down_move_up,
                        surfMove        : surfMove,
                        moveIncrement   : 0,
                        dragWrap        : selectedElement_flag,
                        point_on_dragSurf,
                    });
                    return appFeedback === 'do disappear d8d';
                break;
                case 'move': 
                case 'up':
                    spinnerCandidate = null;
                    //.is throttled: does condence move and up events
                    
                    if( down_move_up !== 'move' &&
                        ns.haz( selectedElement_flag, 'decPoint' ) ) {
                        $$.$( selectedElement_flag.decPoint ).removeClass( 'grabbing' );
                    }
                    
                    selectedElement_flag.doProcessWrap({
                        //// **api-doProcessWrap 
                        down_move_up    : down_move_up, //flag, string
                        //possibly = move from start to current,
                        surfMove        : surfMove,
                        moveIncrement   : moveIncrement,
                        dragWrap        : selectedElement_flag,
                        point_on_dragSurf,
                    });
                break;
                default:
            }
        }

        //====================
        // //\\ finds draggee
        //====================
        ///Returns: point drag Wrap
        ///         which is closest to testPoint.
        ///Algo:    if distance to point_on_dragSurf is "outside" of this par.,
        ///         then dragWrap is not "considered" for drag
        function findDraggee_default( point_on_dragSurf, dragWraps )
        {
            ///vital
            /*
            ns.d('findDraggee in bsl: fw' +
                 ( dragWraps[0] && dragWraps[0].createdFramework.frameworkId )
            );
            */
            var testMediaX = point_on_dragSurf[0];
            var testMediaY = point_on_dragSurf[1];

            //------------------------------------
            // //\\ loops and find closest item
            //------------------------------------
            var closestDragWrap = null;
            var closestTd = null;
            //.the bigger is priority, the more "choicable"
            //.is the drag Wrap point
            var closestDragPriority = 0;
            dragWraps.forEach( function( dragWrap, dix ) {
                var pointWrap   = dragWrap.pointWrap;
                if( haz( pointWrap, 'hideD8Dpoint' ) ) return;
                var dompos      = handle2dragsurf_pos(  dragWrap, dragSurface );
                var tdX         = Math.abs( testMediaX - dompos[0] );
                var tdY         = Math.abs( testMediaY - dompos[1] );
                var td          = Math.max( tdX, tdY );

                var distLim = fconf.DRAGGER_TOLERANCE;
                //console.log('distLim' + distLim); // todo: is this ever called?

                //.td is a "rect-metric" for distance between
                //.point_on_dragSurf and drag-point-candidate
                if(
                    td <= distLim ||
                    distLim < 0 //finds the first existing dragWrap
                ) {
                    let dpp = pointWrap.dragPriority;
                    if( !closestDragWrap ||
                        (
                            ( dpp > closestDragPriority ) ||
                            ( dpp === closestDragPriority && closestTd > td ) 
                        )
                    ){
                        closestDragWrap = dragWrap;
                        closestTd = td;
                        closestDragPriority = pointWrap.dragPriority || 0;


                        //vital-for-mobile
                        //ns.d('closest=' + pointWrap.pname +
                        //     ' fw' + dragWrap.createdFramework.frameworkId );
                   }
                }
            });
            //------------------------------------
            // \\// loops and find closest item
            //------------------------------------
            //c cc( closestDragWrap.pointWrap.spinnerClsId );
            return closestDragWrap;
        }
        //====================
        // \\// finds draggee
        //====================
    };
    ///============================================================
    /// \\// inits common framework for the set of  point-draggees
    ///============================================================





    ///Note:     1. this is a throttler not bouncer,
    ///          2. the "return" value of throttle is lost, this is
    ///          a "cons" of this throttler,
    ///Does:     throttles event handler of type "moving",
    ///Inputs:   WAIT         optional, how much to wait till call
    ///                       the most recent function-curry,
    ///                       Ultimately fires if called at elapsed >= WAIT.
    ///                       If not called this way, then 
    ///                       times out to WAIT, since last call.
    ///          fun          throttlee,
    ///Returns:  throttled fun with signature signature:
    ///             arg       ordinary arguments' object,
    ///             dragType  "move" or other type,
    function throttles_eventMove( fun, WAIT )
    {
        var timeout = null;
        var timeStart = null;
        var arg_closured;
        var dragType_closured;
        return throttledFunction;



        function throttledFunction( arg, dragType )
        {
            //ccc( Date.now() + ' inner drag: dragType=' + dragType );
            if( dragType !== 'moving' ) {
                ///runs stashed version of "move" function if any
                if( timeout !== null ) {
                    clear8run( !!'doClearTimeout' );
                }
                ///immediately runs called non-"move" function
                fun( arg, dragType );
                return;
            }

            ///initiates or renews "move" type function
            arg_closured = arg; //updates arg at every call
            dragType_closured = dragType;
            var time     = Date.now();
            timeStart    = timeStart === null ? time : timeStart;
            var elapsed  = time - timeStart;

            if( elapsed > WAIT ) {
                clear8run( !!'doClearTimeout' )
                return;
            }

            ///initiates or renews "move" type function
            if( timeout !== null ) {
                clearTimeout( timeout );
            }
            timeout = setTimeout( 
                function() {
                    clear8run();
                },
                WAIT
            );

            //would bounce and not throttle
            //timeStart = time;
        };

        function clear8run( doClearTimeout )
        {
            //ccc( Date.now() + ' clears and runs' );
            doClearTimeout && clearTimeout( timeout );
            timeout = null;
            timeStart = null;
            fun( arg_closured, dragType_closured );
        }
    }


}) ();



