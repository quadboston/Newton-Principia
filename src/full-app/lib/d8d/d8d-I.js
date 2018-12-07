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
    function createFramework(
        //---------------------------------------------
        // //\\ AAAAAAAAA PPPPPPPP IIIIIIIIII
        //---------------------------------------------
        findDraggee,                       //function which finds draggeePoint 
        dragSurface,                       
        DRAG_POINTS_THROTTLE_TIME,         //optional
        detected_user_interaction_effect,  //optional sugar for "down" event
        decPoint_parentClasses             //optional; decPoint stands for "decorationalPoint"
        //---------------------------------------------
        // \\// AAAAAAAAA PPPPPPPP IIIIIIIIII
        //---------------------------------------------
    ) {
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
            createDragUpdate : createDragUpdate,
            dragWraps:dragWraps,
            updateAllDecPoints:updateAllDecPoints
        };
        //111111111111111111111111111111111111111111111









        function updateAllDecPoints()
        {
            dragWraps.forEach( function( dragWrap ) {
                dragWrap.update_decPoint && dragWrap.update_decPoint( dragWrap.decPoint );
            });
        }


        ///Creates drag handler for each specific point-draggee.
        ///Usually called when each model point is created to be dragged.
        function createDragUpdate( api )
        {
            //---------------------------------------------
            // //\\ AAAAAAAAA PPPPPPPP IIIIIIIIII
            //---------------------------------------------
            var pointWrap            = api.pointWrap || {};
            var initialAchived       = api.achieved;
            var doProcess            = api.doProcess;           //to be set at point-def.
            var update_decPoint      = api.update_decPoint;     //optional
            var cssId                = pointWrap.name;          //optional for css
            var finalColor           = pointWrap.finalColor;    //optional
            // //\\ functions' side effects
            //      todm side effects can be fixed by indexing points and
            //      making registry here ... still an extra construct
            //      adds members to pointWrap
            pointWrap.achieved      = { achieved: initialAchived };
            var decPoint            = update_decPoint &&
                                            dpdec.addD8D_decorationPoint(
                                                dragSurface,
                                                cssId,
                                                finalColor,
                                                decPoint_parentClasses
                                            );
                                        
            //c cc( cssId + ' pointWrap.finalColor=' +  pointWrap.finalColor)
            // \\// functions' side effects
            //---------------------------------------------
            // \\// AAAAAAAAA PPPPPPPP IIIIIIIIII
            //---------------------------------------------




            update_decPoint && update_decPoint( decPoint );
            var doDragUpdate = ns.throttle( 
                function( arg )
                {
                    //logical sugar:
                    //remembers pointWrap which can be changed in closure of doProcess
                    //when pointWrap is generated in the loop
                    arg.pointWrap = pointWrap; 

                    //:these both can be in one function call,
                    //:they are in different calls for clear api logic
                    doProcess( arg );
                    update_decPoint && update_decPoint( decPoint );

                    if( arg.down_move_up === 'up' ) {
                        selectedElement=0;
                    }
                },
                DRAG_POINTS_THROTTLE_TIME || 0
            );
            var dragWrap =
            {
                pointWrap       :pointWrap,
                doDragUpdate    :doDragUpdate,
                update_decPoint :update_decPoint,
                decPoint        :decPoint
            };
            dragWraps.push( dragWrap );
            return dragWrap;
        }




        ///d8d handler shared between all draggee-points.
        ///Input: mPoint
        ///       it is precalculated by lower level handler and supplied to this function:
        ///       it is offset in "local-surface" if no special converter is supplied:
        ///       details are in d8d code:
        ///            var mPoint = eventPoint_2_localPoint( childEvent );
		///            var eventPoint_2_localPoint = arg.eventPoint_2_localPoint ||
        ///                                          eventPos_2_surfacePos;
        function d8d_app( move, down_move_up, mPoint, event )
        {
            //ns.d('app: d8d_app call begins: mode="' + down_move_up + '"');
            switch( down_move_up )
            {
                case 'down': 
                    if( selectedElement ) {
                        //var ww = 'app: ' + down_move_up +
                        //         ' still not-cleaned-up ... down cancells';
                        //ns.d(ww);
                        return true;
                    }
                    var closestDragWrap = findDraggee( mPoint, dragWraps );  
                    if( !closestDragWrap ) {
                        return true;
                        }
                        ////todo patch
                        if( sapp.sappKey === 'l23' ) {
                            closestDragWrap.pointWrap.achieved.achieved.x = closestDragWrap.pointWrap.x; //mPoint[0];
                            closestDragWrap.pointWrap.achieved.achieved.y = closestDragWrap.pointWrap.y; //mPoint[1];
                    }
                    //ns.d( 'app: ' + down_move_up + ' id=' + draggeePoint.name );
                    detected_user_interaction_effect && detected_user_interaction_effect();
                    selectedElement = closestDragWrap;
                break;
                case 'move': 
                case 'up':
                    selectedElement.doDragUpdate( { down_move_up:down_move_up, move:move } );
                break;
            }
        }
    };
    ///============================================================
    /// \\// inits common framework for the set of  point-draggees
    ///============================================================

}) ();

