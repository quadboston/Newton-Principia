// //\\// Provides d&d module for set of points which act exclusively
//        one at the time and share common handler.
//        The active point is elected by "findDraggee" function
//        which is supplied at initialization time.
( function() {
    var {
        ns,
        haz,
        d8d_p,
        dpdec,
    } = window.b$l.nstree();
    d8d_p.createFramework = createFramework;
    var createdFrameworks = [];
    return;






    ///===========================================================
    /// //\\ inits common framework for the set of  point-draggees
    ///      There can be as many frameworks as one wishes.
    ///===========================================================
    function createFramework({
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
            //  spinner((update_decPoint_default))
            handle2dragsurf_pos,

    }) {

        var DRAGGEE_HALF_SIZE = 40;

        findDraggee = findDraggee || findDraggee_default;
        handle2dragsurf_pos = handle2dragsurf_pos || handle2dragsurf_pos_default;

        var frameworkId = createdFrameworks.length;

        var selectedElement_flag;
        var dragWraps = [];
        ///sets single lower-level handler for framework draggees
        ns.d8d({
            surface : dragSurface,
            d8d_cb_middle2lowest : d8d_cb_middle2lowest, //common handler

            frameworkId,
        });

        var createdFramework = 
        {
            frameworkId,
            dragSurface,
            decPoint_parentClasses,
        };
        createdFrameworks.push( createdFramework );
        return { pointWrap_2_dragWrap, updateAllDecPoints, };








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
                uP && uP( dragWrap.decPoint, dragSurface, dragWrap.pointWrap );
                //ccc( 'all dec end: ', dragWrap.decPoint );
            });
        }


        ///Creates drag handler for each specific point-draggee.
        ///Usually called when each model point is created to be dragged.
        function pointWrap_2_dragWrap( api )
        {
            //---------------------------------------------
            // //\\ AAA PPP III
            //---------------------------------------------
            var pointWrap            = api.pointWrap || {};
            var doProcess            = api.doProcess; //to be set at point-def.
            //:optional
            var spinnerClsId         = pointWrap.spinnerClsId;
            var dragDecorColor       = pointWrap.dragDecorColor;
            var individual_zindex    = haz( pointWrap, 'individual_zindex' );
            var makeCentralDiskInvisible = pointWrap.makeCentralDiskInvisible;
            var update_decPoint      = api.update_decPoint;
            var nospinner            = api.nospinner;
            var orientation          = api.orientation;
            var achieved             = api.achieved; //api sugar
            var dragHandleDOM        = api.dragHandleDOM;
            var tooltip              = api.tooltip;
            var addFeaturesToDecPoint= haz( pointWrap, 'addFeaturesToDecPoint');
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
                    //var cssIdLowCase = sDomF.topicIdUpperCase_2_underscore( spinnerClsId );
                    var cssIdLowCase = spinnerClsId;

                    addFeaturesToDecPoint = Object.assign(
                            addFeaturesToDecPoint || {},
                            {
                                dragDecorColor      : dragDecorColor,
                                spinnerClsId        : cssIdLowCase,
                                individual_zindex   : individual_zindex,
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
                decPoint        : decPoint,
                orientation     : orientation,
                dragHandleDOM   : dragHandleDOM,
                achieved,
                createdFramework,
            }
            dragWraps.push( dragWrap );


            //if( pointWrap.pname === 'fret-0-0' ) {
            //    ccc( 'dragWrap is created for ' + pointWrap.pname );
            //}

            //todo ... needed?
            update_decPoint && update_decPoint( decPoint, dragSurface, pointWrap );
            //=====================================================
            // \\// drag8drop main wrapper over item
            //=====================================================
            return; // dragWrap; //todm consider adding this
                    //to pointWrap



            //=====================================================
            // //\\ tiny wrap around doProcess
            //=====================================================
            function doProcessWrap( arg )
            {
                //logical bonus: pointWrap may be missed in
                //doProcess closure ...
                arg.pointWrap = pointWrap; 
                doProcess( arg );
                update_decPoint && update_decPoint( decPoint, dragSurface, pointWrap );
                if( arg.down_move_up === 'up' ) {
                    ////this cleans up drag and drop lifecycle
                    selectedElement_flag=null;
                }
            }
            //=====================================================
            // \\// tiny wrap around doProcess
            //=====================================================

            ///updates spinner position;
            ///uses already existing-on-drag-surface handle to synch with it;
            ///recall: spinner is a div with two children divs which are animated
            ///        spinner's master-css is made here:
            ///        bsl/d8d/decorator.css.js::creates_spinnerOwnCss
            function update_decPoint_default( decPoint, dragSurface, pointWrap )
            {
                var dompos = handle2dragsurf_pos( dragWrap, dragSurface );
                decPoint.style.left = dompos[0] + 'px';            
                decPoint.style.top = dompos[1] + 'px';
                if( pointWrap.hideD8Dpoint ) {
                    decPoint.style.display = 'none';
                } else {
                    decPoint.style.display = 'block';
                }
            }

            ///this thing runs when no update_decPoint is supplied to
            //      pointWrap_2_dragWrap( api )
            ///recall: spinner is a div with two children divs which are animated
            ///        spinner's master-css is made here:
            ///        bsl/d8d/decorator.css.js::creates_spinnerOwnCss
            ///does position spinner by converting
            ///inner-media-position to dom-position
            ///and setting spinner ot this dom-position
            function update_decPoint_inn2outparent()
            {
                var dompos          = inn2outparent.call( pointWrap );
                decPoint.style.left = dompos[0] + 'px';            
                decPoint.style.top  = dompos[1] + 'px';
                if( !pointWrap.ignore_hideD8Dpoint_for_CSS ) {
                    if( pointWrap.hideD8Dpoint ) {
                        decPoint.style.display = 'none';
                    } else {
                        decPoint.style.display = 'block';
                        //if( pointWrap.pname === 'media-mover' )
                        //    ccc( 'dp updated: left=' + decPoint.style.left, decPoint );
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
        function d8d_cb_middle2lowest( surfMove, down_move_up, point_on_dragSurf, event, moveIncrement )
        {
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
                    selectedElement_flag = findDraggee(
                            point_on_dragSurf,
                            dragWraps,
                            dragSurface
                    );
                    if( !selectedElement_flag ) return true;

                    detected_user_interaction_effect && detected_user_interaction_effect();
                    processMouseDown && processMouseDown( selectedElement_flag.pointWrap );

                    //todM: let it to return !!'forbid drag'
                    //      which will add a "sugar" "just-a-clcik" and
                    //      even click behind screening surface
                    selectedElement_flag.doProcessWrap({
                        down_move_up    : down_move_up,
                        surfMove        : surfMove,
                        moveIncrement   : 0,
                        dragWrap        : selectedElement_flag,
                        point_on_dragSurf,
                    });

                break;
                case 'move': 
                case 'up':
                    //.is throttled: does condence move and up events
                    selectedElement_flag.doProcessWrap({
                        down_move_up    : down_move_up,
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

                //if( pointWrap.pname === 'fret-0-0' ) {
                //    ccc( 'findDraggee_default', pointWrap.pname, pointWrap );
                //}

                if( haz( pointWrap, 'hideD8Dpoint' ) ||
                    haz( pointWrap, 'd8d_find_is_LOCKED' )  ) {
                    return;
                }
                var dompos      = handle2dragsurf_pos(  dragWrap, dragSurface );
                var tdX         = Math.abs( testMediaX - dompos[0] );
                var tdY         = Math.abs( testMediaY - dompos[1] );
                var td          = Math.max( tdX, tdY );

                var distLim = haz( pointWrap, 'DRAGGEE_HALF_SIZE' ) || DRAGGEE_HALF_SIZE;

                //.td is a "rect-metric" for distance between
                //.point_on_dragSurf and drag-point-candidate
                if( td <= distLim ) {
                    if( !closestDragWrap || closestTd > td ||
                        (pointWrap.dragPriority || 0 ) > closestDragPriority ) {
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
            return closestDragWrap;
        }
        //====================
        // \\// finds draggee
        //====================
    };
    ///============================================================
    /// \\// inits common framework for the set of  point-draggees
    ///============================================================

}) ();















//---------------------------------------------
// //\\ abandoned throttler
//---------------------------------------------
//.the throttle is abandoned since v1960
//.abandoned because it is hard to remember and explain to other developer
//.the complexity which arised with throttle: the complexity is
//.that event "move" can be overriden with "up" and developer must always
//.remember this in do Process() function
//var do DragUpdate = ns.throttle( 
//        ....
//        DRAG_POINTS_THROTTLE_TIME || 0
//);
//.if one needs to throttle the drag, do throttle "do Process()"
//.explicitly in specific lemma
//---------------------------------------------
// \\// abandoned throttler
//---------------------------------------------

//==============================================
// //\\ api.achieved is an optional parameter
//==============================================
// if it is falsy and not 0, then it is not used
// otherwise, it is placed into 
//
//      pointWrap.achieved = { achieved : api.achieved }
//
// this approach creates functions' side effects:
// here we are modifying important input-parameter, pointWrap
//
//      todm side effects can be fixed by indexing points and
//      making registry here ... still an extra construct
//      adds members to pointWrap
//
//--------------------------------------------
//pointWrap.achieved = ( achieved || achieved === 0 ) ?
//                     { achieved : achieved } : { achieved : {} };
//==============================================
// \\// api.achieved is an optional parameter
//==============================================


