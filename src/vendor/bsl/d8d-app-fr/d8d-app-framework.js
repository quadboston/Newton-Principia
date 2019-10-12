// This module should be generic in bsl/core or bsl/slider ... but before doing this
//      the standalone test.html file must be elaborated.
// //\\// Provides d&d module for set of points which act exclusively
//        one at the time and share common handler
//        The active point is elected by "findDraggee" function
//        which is supplied at initialization time.
( function() {
    var ns          = window.b$l;
    var dpdec       = ns.sn('drag-point-decorator');
    var sn          = ns.sn;    

    var fapp        = ns.sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);
    var sapp        = sn('sapp');

    d8d_p.createFramework = createFramework;
    //~~~~~
    return;
    //~~~~~






    ///===========================================================
    /// //\\ inits common framework for the set of  point-draggees
    ///-----------------------------------------------------------
    /// There can be as many frameworks as one wishes.
    function createFramework(args)
    {
        //---------------------------------------------
        // //\\ API
        //---------------------------------------------
        //.function which finds draggeePoint 
        var findDraggee = args.findDraggee;           
        var dragSurface = args.dragSurface;

        //:the rest is optional
        var DRAG_POINTS_THROTTLE_TIME =  args.DRAG_POINTS_THROTTLE_TIME;
        //.sugar for "down" event
        var detected_user_interaction_effect = args.detected_user_interaction_effect;
        //.decPoint stands for "decorationalPoint"
        var decPoint_parentClasses = args.decPoint_parentClasses;
        var processMouseDown = args.processMouseDown; //optional
        //---------------------------------------------
        // \\// API
        //---------------------------------------------


        var selectedElement;               //flag
        var dragWraps = [];                //level of dragWrap-points where each point is on top
                                           //of it's own api.pointWrap supplied in api for each point

        ///sets one lower-level handler for all framework draggees
        ns.d8d(
        {
            surface : dragSurface,
            d8d_app : d8d_app //common handler
        });
        //111111111111111111111111111111111111111111111
        return {
            pointWrap_2_dragWrap : pointWrap_2_dragWrap,
            dragWraps:dragWraps,
            updateAllDecPoints:updateAllDecPoints
        };
        //111111111111111111111111111111111111111111111









        function updateAllDecPoints()
        {
            dragWraps.forEach( function( dragWrap ) {
                var uP = dragWrap.update_decPoint;
                uP && uP( dragWrap.decPoint, dragSurface );
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
            var doProcess            = api.doProcess;           //to be set at point-def.
            var update_decPoint      = api.update_decPoint;     //optional
            var dragCssCls           = pointWrap.dragCssCls;    //optional
            var dragDecorColor       = pointWrap.dragDecorColor;//optional
            //api.achieved is optional parameter
            //---------------------------------------------
            // \\// AAA PPP III
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
            // todm side effects can be fixed by indexing points and
            // making registry here ... still an extra construct
            // adds members to pointWrap
            //
            //--------------------------------------------
            //small test case for lemma 3:
            //if( pointWrap.dragCssCls === "base-2" ) {
            //    ccc('arg.archived', api.achieved);
            //}
            //--------------------------------------------
            pointWrap.achieved = api.achieved ||
                api.achieved === 0 ?
                { achieved : api.achieved } : { achieved : {} };
            //==============================================
            // \\// api.achieved is an optional parameter
            //==============================================


            //==============================================
            // //\\ optional features
            //==============================================
            var decPoint = null;
            var addFeaturesToDecPoint = null;
            if( update_decPoint ) {
                if( dragCssCls ) {
                    addFeaturesToDecPoint =
                    {
                        dragDecorColor  : dragDecorColor,
                        css_class_as_id : dragCssCls.replace(
                                                /([A-Z])/g,
                                                ( match, key1 ) => ( '_' + key1.toLowerCase() )
                                          ),
                    };
                }
                decPoint = dpdec.addD8D_decorationPoint(
                    dragSurface,
                    addFeaturesToDecPoint,
                    decPoint_parentClasses
                );
                update_decPoint( decPoint, dragSurface ); //todo ... redundant?
            }
            //==============================================
            // \\// optional features
            //==============================================


            //==============================================
            // //\\ drag wrap
            //==============================================
            var dragWrap =
            {
                pointWrap       :pointWrap,
                doDragUpdate    :doDragUpdate,
                update_decPoint :update_decPoint,
                decPoint        :decPoint
            };
            dragWraps.push( dragWrap );
            //==============================================
            // \\// drag wrap
            //==============================================
            return dragWrap;




            //==============================================
            // //\\ do drag update
            //==============================================
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
            function doDragUpdate( arg )
            {
                //logical sugar: //todm too complex ... do simplify
                //remembers pointWrap which can be changed in closure of do Process
                //when pointWrap is generated in the loop
                arg.pointWrap = pointWrap; 

                //:these both can be in one function call,
                //:they are in different calls for clear api logic
                doProcess( arg );
                update_decPoint && update_decPoint( decPoint, dragSurface );
                if( arg.down_move_up === 'up' ) {
                    ////this cleans up drag and drop lifecycle
                    selectedElement=0;
                }
            }
            //==============================================
            // \\// do drag update
            //==============================================
        }




        ///d8d handler shared between all draggee-points.
        ///Input: point_on_dragSurf
        ///       it is precalculated by lower level handler and supplied to this function:
        ///       it is offset in "local-surface" if no special converter is supplied:
        ///       details are in d8d code:
        ///            var point_on_dragSurf = eventPoint_2_localPoint( childEvent );
		///            var eventPoint_2_localPoint = arg.eventPoint_2_localPoint ||
        ///                                          eventPos_2_surfacePos;
        function d8d_app( surfMove, down_move_up, point_on_dragSurf, event )
        {
            //ns.d('app: d8d_app call begins: mode="' + down_move_up + '"');
            switch( down_move_up )
            {
                case 'down': 
                    if( selectedElement ) {
                        //var ww = 'app: ' + down_move_up +
                        //         ' is still not-cleaned-up ... down event cancells';
                        //ns.d(ww);
                        return true;
                    }
                    var closestDragWrap = findDraggee( point_on_dragSurf, dragWraps, dragSurface );
                    if( !closestDragWrap ) return true;
                    var cPW = closestDragWrap.pointWrap;
                    processMouseDown && processMouseDown( cPW );
                    detected_user_interaction_effect && detected_user_interaction_effect();
                    selectedElement = closestDragWrap;
                break;
                case 'move': 
                case 'up':
                    //.is throttled: does condence move and up events
                    selectedElement.doDragUpdate( { down_move_up:down_move_up, surfMove:surfMove } );
                break;
            }
        }
    };
    ///============================================================
    /// \\// inits common framework for the set of  point-draggees
    ///============================================================

}) ();

