//*************************************************************************************
// //\\//   "device-level" drag and drop processor
//          ns.d8d - a method of the layer between mouse/touch events and application
//                  - handles DOM events,
//                  - submits results to app-processor, d8d_app
//                    which can cancel d8d if returns "forbidden=true" ( see below ).
//          Copyright (c) 2018 Konstantin Kirillov. License MIT.
//*************************************************************************************
( function () {
	var ns = window.b$l;		
    //.for applications with complex d8d-handlers creation/deletion
    //.bookkeeps created or deleted ns.d8d objects
    //var eventCounter=0; 







    ///****************************************************************
	/// d8d object constructor
    ///****************************************************************
	ns.d8d = function ( arg )
	{
        //------------------------------------------
        // //\\ input arguments
        //------------------------------------------
        //:application-level-handler
        // see function-call-signature in code below
		var d8d_app  = arg.d8d_app;
        //:	where to draw:
        //  final destination of mouse-point-coordinates detection;
        //		can be a div or media;
        //		media means canvas, img, or possibly video;
        //		in general for media, finally detected mouse-point is
        //		in internal media coordinates;
		var surface	= arg.surface;	
 		//:	to whom to attach events
		var att = arg.attachee || surface;
        //:
		var eventPoint_2_localPoint = arg.eventPoint_2_localPoint || eventPos_2_surfacePos;
        var skipD8D = arg.skipD8D || default_skip;
        //------------------------------------------
        // \\// input arguments
        //------------------------------------------





        //------------------------------------------
        // //\\ locals
        //------------------------------------------
        //.is a d8d-in-progress-flag ...
        //.do program it carefully
		var startPoint	= null; 
		var lastPoint   = null;
        //var eventId     = eventCounter++;
        //------------------------------------------
        // \\// locals
        //------------------------------------------





        //******************************************************************
		// //\\ d8d-scenario root events
        //******************************************************************
		//  possible Android fix:
        //  http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices
        //. todo: touch must provide event which then tested for
        //  Ctrl-pressed flag: use different handler
        att.addEventListener( 'touchstart', doStartDown );  
        att.addEventListener( 'mousedown', doStartDown );

        return { removeEvents : removeEvents }; //exports d8d-object of this module
        // \\//\\// end of module execution

        function removeEvents()
        {
            att.removeEventListener( 'touchstart', doStartDown );
            att.removeEventListener( 'mousedown', doStartDown );
        };
        //******************************************************************
		// \\// d8d-scenario root events
        //******************************************************************







        //*****************************************
		// //\\ DOWN SUBROUTINES
        //*****************************************
		// //\\ root d8d handler
        //========================================
        function doStartDown( ev )
        {
            if( skipD8D( ev ) ) return;
            //ns.d('***ev id=' + eventId + ' doStartDown' );

            ///touch-down
            if( ev.touches && ev.touches.length === 1 ) {
                var event = ev.touches[0];
                //seems wrong: event.preventDefault(); //trying for mobiles
                var forbidden = do_complete_down( event, ev );
                if( !forbidden ) {
                    stopsAftershocks ( ev );
                    att.addEventListener( 'touchmove',   touchMove);
                    att.addEventListener( 'touchend',    touchEnd);
                    att.addEventListener( 'touchcancel', touchEnd);
                } else {
                    //ns.d('\neid=' + eventId + 'move is forbidden');
                }
            ///mouse-down
            } else {
                var forbidden = do_complete_down( ev );
                if( !forbidden ) { 
                    stopsAftershocks ( ev );
                    att.addEventListener( 'mousemove', mouseMove);
                    att.addEventListener( 'mouseup',   mouseEnd);
                    //.todm suspicion: this approach seems not reliable ...
                    // fires right after the mouseDown ...
                    att.addEventListener( 'mouseleave',  mouseEnd);
                } else {
                    //ns.d('\nev id=' + eventId + 'move is forbidden');
                }
            }
        }
        //========================================
		// \\// root d8d handler
        //========================================


        //=========================================
		// //\\ second level of down-handling
        //=========================================
        function do_complete_down( childEvent, rootEvent )
        {
            //ns.d( 'do_complete_down: started' );
            if( startPoint !== null ) {
                //ns.d('broken d8d scenario: the previous startPoint is still exist');
                return true;
            }
            var mPoint = eventPoint_2_localPoint( childEvent );
            if( !mPoint ) {
                //ns.d('do_complete_down: media point failed');
                return true;
            }
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			var forbidden = d8d_app( [0,0], 'down', mPoint, childEvent );
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			if( forbidden ) {
                //ns.d( 'move start has been cancelled by top-level ' +
                //       'drag-and-drop-processor: eventId=' + eventId );
                return true;
            }
			startPoint = mPoint;
            lastPoint = mPoint;
        }
        //=========================================
		// \\// second level of down-handling
        //*****************************************
		// \\// DOWN SUBROUTINES
        //*****************************************





        //*****************************************
		// //\\ MOVE SUBROUTINES
        //*****************************************
        function touchMove( ev )
        {
    	    mouseMove( ev.touches[ 0 ], ev );
        }

        function mouseMove( childEvent, rootEvent )
        {
            //ns.d('eid=' + eventId + ' moving');
            stopsAftershocks ( rootEvent || childEvent );
            if( !startPoint ) {
                //ns.d('mouseMove: no start point exist');
                return;
            } 
            var mPoint = eventPoint_2_localPoint( childEvent );
            if(!mPoint) { 
                //ns.d('\nmouseMove: media point failed');
                return;
            }
            lastPoint = mPoint;
			do_complete_move( mPoint, childEvent );
			return false;
        }

        ///adds move - the "sugar"
		function do_complete_move( mPoint, childEvent )
		{
			var move =
			[	
				mPoint[ 0 ] - startPoint[ 0 ],
				mPoint[ 1 ] - startPoint[ 1 ]
			];
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            d8d_app( move, 'move', mPoint, childEvent );
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            return move;
		};
        //*****************************************
		// \\// MOVE SUBROUTINES
        //*****************************************






        //*****************************************
		// //\\ END SUBROUTINES
        //*****************************************
        function touchEnd( rootEvent ) {
            //ns.d('***eid=' + eventId + ' removing touch events\n\n');
            att.removeEventListener( 'touchmove',   touchMove );
            att.removeEventListener( 'touchend',    touchEnd );
            att.removeEventListener( 'touchcancel', touchEnd );
            var childEvent = rootEvent.touches && rootEvent.touches[0];
            do_complete_end( childEvent, rootEvent );
        }


        function mouseEnd( child8rootEvent )
        {
            //ns.d( '***eid=' + eventId + ' removing mouse events\n\n' );
            att.removeEventListener( 'mousemove', mouseMove );
            att.removeEventListener( 'mouseup',  mouseEnd );
            att.removeEventListener( 'mouseleave', mouseEnd );
            do_complete_end( child8rootEvent );
        }

        ///Input: note: "childEvent" can be missed for touches
		function do_complete_end( childEvent, rootEvent )
		{
            //ns.d('***eid=' + eventId + ' second End starts');
            var eventPoint = childEvent &&
                             ( childEvent.clientX || childEvent.clientX === 0 ) &&
                             [ childEvent.clientX , childEvent.clientY ];
            var mPoint = eventPoint && eventPoint_2_localPoint( childEvent );

            if( startPoint ) {
                ////startPoint is not missed ...
                stopsAftershocks( rootEvent || childEvent );
                var move = do_complete_move( mPoint || lastPoint, childEvent );
		        startPoint = null; 
                //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
             	d8d_app( move, 'up', mPoint, childEvent );
                //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            //} else {
                ////broken scenario
            }
		};
        //*****************************************
		// \\// END SUBROUTINES
        //*****************************************






        //*****************************************
		// //\\ HELPERS
        //*****************************************
        // //\\ converts event pos to domelem-css-pos
        //===========================================
        function eventPos_2_surfacePos( event )
        {
            //https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
            var box	= surface.getBoundingClientRect();
            var loc	=
            [ 
                Math.round( event.clientX - box.left ),
                Math.round( event.clientY - box.top )
            ];
            return loc;
        };
        //===========================================
        // \\// converts event pos to domelem-css-pos
        //===========================================



        //====================================================================
        // //\\ protects textarea, form elements ... from dragging
        //====================================================================
        //      to preserve ordinary clicks on form elements or other controls
        //      disables dragging on form and other elements
        function default_skip( ev )
        {
            var tag = ev.target.tagName.toLowerCase();
            if(     
                    //protects wbd debugger    
                    tag === 'textarea' ||
                    //protects forms    
                    tag === 'input' || tag === 'select' || tag === 'button'
                    //protects firmware plugins which use svg  
                    // || tag === 'rect' || tag === 'path'                            
            ) {
                return true;
            }
        }
        //====================================================================
        // \\// protects textarea, form elements ... from dragging
        //====================================================================



        //==============================================================
        // //\\ Clears sibling events.
        //      Can be used to prevent the events set in this module to
        //      to be caught by native or other event-handlers.
        //==============================================================
        function stopsAftershocks( rootEvent )
        {
            rootEvent.preventDefault();
            //very good:
            //  javascript.info/bubbling-and-capturing
            //  stackoverflow.com/questions/5299740/stoppropagation-vs-stopimmediatepropagation
            if( rootEvent.stopImmediatePropagation ) {
                ////missed on Android 2.?.?
                rootEvent.stopImmediatePropagation(); //IE9+
            } else if( rootEvent.stopPropagation ) {
                rootEvent.stopPropagation();
            }
        }
        //=========================================
        // \\// Clears sibling events.
        //*****************************************
		// \\// HELPERS
        //*****************************************
	};

}) ();


