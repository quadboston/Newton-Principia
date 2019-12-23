//***************************************************************************************************
// //\\//   "device-level" (lowest browser possible level) drag and drop processor;
//          ns.d8d - a method of the layer between mouse/touch events and application
//                  - handles DOM events,
//                  - submits results to app-processor, d8d_app
//                    which can cancel d8d if returns "forbidden=true" ( see below ).
//          Copyright (c) 2018-2019 Konstantin Kirillov. License MIT.
//
//          file history: /var/www/html/bwork/CANV-SVG-VIDEO-CSS/canvas/
//                        diagram-editor-vladislav/prj/steps/fios-jan19-35-more/3rd/btb/d8d-device.js
//***************************************************************************************************
( function () {
    var ns          = window.b$l        = window.b$l        || {};
    var ccc = console.log; ccc && ( ccc = console.log );







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
        //      media means canvas, img, or possibly video;
        //		in general for media, finally detected mouse-point is
        //		in internal media coordinates;
		var surface	= arg.surface;	

 		//:	to whom to attach events
		var att = arg.attachee || surface;

        var skipD8D = arg.skipD8D || default_skip;
        //------------------------------------------
        // \\// input arguments
        //------------------------------------------





        //------------------------------------------
        // //\\ locals
        //------------------------------------------
        //.is a d8d-in-progress-flag ...
		var startPoint	= null; 
		var lastPoint   = null;
        //------------------------------------------
        // \\// locals
        //------------------------------------------
        addEvents();
        return { removeEvents : removeEvents }; //exports d8d-object of this module












        //******************************************************************
		// //\\ d8d-scenario root events
        //******************************************************************
        function addEvents()
        {
		    //  possible Android fix:
            //  http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices
            //. todo: touch must provide event which then tested for
            //  Ctrl-pressed flag: use different handler
            att.addEventListener( 'touchstart', doStartDown );  
            att.addEventListener( 'mousedown', doStartDown );
        };

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
            var forbidden;
            if( skipD8D( ev ) ) return;

            ///touch-down
            if( ev.touches && ev.touches.length === 1 ) {
                var event = ev.touches[0];
                //seems wrong: event.preventDefault(); //trying for mobiles
                forbidden = do_complete_down( event, ev );
                if( !forbidden ) {
                    stopsAftershocks ( ev );
                    att.addEventListener( 'touchmove',   touchMove);
                    att.addEventListener( 'touchend',    touchEnd);
                    att.addEventListener( 'touchcancel', touchEnd);
                } else {
                    //ns.d('\neid=' + eventId + 'm ove is forbidden');
                }
            ///mouse-down
            } else {
                forbidden = do_complete_down( ev );
                if( !forbidden ) { 
                    stopsAftershocks ( ev );
                    att.addEventListener( 'mousemove', mouseMove);
                    att.addEventListener( 'mouseup',   mouseEnd);
                    //.todm suspicion: this approach seems not reliable ...
                    // fires right after the mouseDown ...
                    att.addEventListener( 'mouseleave',  mouseEnd);
                } else {
                    //ns.d('\nev id=' + eventId + 'm ove is forbidden');
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
                return true;
            }
            var point_on_dragSurf = eventPos_2_surfacePos( childEvent );
            if( !point_on_dragSurf ) {
                return true;
            }
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			var forbidden = d8d_app( [0,0], 'down', point_on_dragSurf, childEvent, [0,0] );
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			if( forbidden ) {
                //ns.d( 'move start has been cancelled by top-level ' +
                //       'drag-and-drop-processor: eventId=' + eventId );
                return true;
            }
			startPoint = point_on_dragSurf;
            lastPoint = point_on_dragSurf;
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
            var surfPoint = eventPos_2_surfacePos( childEvent );
            if(!surfPoint) { 
                //ns.d('\nmouseMove: media point failed');
                return;
            }
            var moveIncrement = [ surfPoint[0]-lastPoint[0], surfPoint[1]-lastPoint[1] ];
            lastPoint = surfPoint;
			do_complete_move( surfPoint, childEvent, moveIncrement );
			return false;
        }

        ///adds move - the "sugar"
		function do_complete_move( surfPoint, childEvent, moveIncrement )
		{
			var surfMove =
			[	
				surfPoint[ 0 ] - startPoint[ 0 ],
				surfPoint[ 1 ] - startPoint[ 1 ]
			];
            d8d_app( surfMove, 'move', surfPoint, childEvent, moveIncrement );
            return surfMove;
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
            var surfPoint = eventPoint && eventPos_2_surfacePos( childEvent );

            if( startPoint ) {
                stopsAftershocks( rootEvent || childEvent );
                //.programmer may want to make d8d_app throttable:
                //.this is why it is importan to provide "up" with surfPoint
                //.in case the "move" event will be erased by "up"
                //var surf_point = surfPoint || lastPoint;

                var moveIncrement = [ surfPoint[0]-lastPoint[0], surfPoint[1]-lastPoint[1] ];
                var moveAbsolute = do_complete_move( surfPoint, childEvent, moveIncrement );
		        startPoint = null;
             	d8d_app( moveAbsolute, 'up', surfPoint, childEvent, moveIncrement );
            //} else { ////broken scenario
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


