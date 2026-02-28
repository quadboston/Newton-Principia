// //\\// Creates an object which encapsulates slider functionality.
(function() {
    var {
        ns, d8dp,
    } = window.b$l.apptree({
    });






    ///Purpose: constructor of an object which encapsulates slider functionality.
    ///Input:   arg: see MicroAPI section below.
    ns.sliderControl = function( arg )
    {
        thisSlider = {}; //created object which is returned from constructor



        //****************************************************************
        // //\\ MicroAPI
        //      the key role belongs to the unitless inner value
        //      and parameter "absFraction". It means fraction of the
        //      full range which is = 1.
        //      The position of slider is by default is
        //      (absFraction*100)%.
        //****************************************************************
        //Dom element which will be visually dragged.
        var draggee          = thisSlider.draggee = arg.handleDomEl;

        //The "draw-surface", the dom-element to which touchstart, mousedown, mousemove, and similar event
        //will be attached.
        //Optional parameter. Defaults defined from the following line.
        var surface0attachee = thisSlider.dragSurface = arg.drawSurfaceDomEl || draggee.parentNode;

        //**************************************
        // //\\ from slider to app,
        //      callbacks
        //**************************************
        //      data exchanges go via unitless parameter, "absFraction"
        //.callback which will supply data from the slider to parent application during mouse/touch move
        var dataInMove       = arg.dataInMove || (function() {});
        //.callback which will supply data from the slider to parent application at mouse/touch completion
        var dataInArrival    = arg.dataInArrival  || (function() {});
        //**************************************
        // \\// from slider to app,
        //**************************************

        //:accepts range-limits or sets their defaults
        var lowLimit         = arg.lowLimit || 0;
        var maxLimit         = arg.maxLimit || 1;

        thisSlider.fraction2value_coeff = arg.fraction2value_coeff || 1;
        thisSlider.id        = arg.id;
        var default_absFrac  = arg.default_absFrac || 0;
        //****************************************************************
        // \\// MicroAPI
        //****************************************************************






        //--------------------------------------
        // //\\ creates locals
        //--------------------------------------
        var sliderStyleOffset = 0; //default
        var absFracDone;           //accomulates and memorizes accomulated move
        var absFraction;           //in plain words:
                                   //   absFraction = absFracDone + "mouse-moveFraction"
                                   //   mouse-moveFraction = mouse-move-x/len
                                   //   len = surface0attachee-length
        //--------------------------------------
        // \\// creates locals
        //--------------------------------------


        //--------------------------------------
        // //\\ processes module
        //--------------------------------------
        //.at creation time, absFracDone is set, and by default to 0
        doSet( default_absFrac, 'doSetDoneValue' );

        ///calls low-level drag-and-drop-MicroAPI
        var this_d8d = d8dp.deviceFW(
        {
	        dragSurface : surface0attachee,
	        cbDownMoveUp  : cbDownMoveUp,
            skipD8D  : skipD8D
        });

        thisSlider.doSet                   = doSet;
        thisSlider.cbDownMoveUp                 = cbDownMoveUp;
        thisSlider.d8d_emulateAbsFractionX = d8d_emulateAbsFractionX;
        thisSlider.removeEvents            = this_d8d.removeEvents;
        thisSlider.slideeX                 = function() { return absFracDone; };

        return thisSlider;
        //--------------------------------------
        // \\// processes module
        //--------------------------------------




        ///Sets absFraction, draggee position, and, optionally, sets accomulated
        ///position, absFractDone.
        function doSet( absFraction_, doSetDoneValue )
        {
            absFraction = validateAbsFraction( absFraction_ );
            //.the only place where dragge's style is set
            draggee.style.left = (sliderStyleOffset + absFraction).toFixed(4)*100 + '%';
            if( doSetDoneValue ) {
                absFracDone = absFraction;
            }
        }


        ///d8d application
        function cbDownMoveUp( move, mouseUpOrDown )
        {
            if( mouseUpOrDown === 'down' ) {
                return;
            }

            if( mouseUpOrDown === 'move' || mouseUpOrDown === 'up' ) {

                //.this makes program immune to resize
                var len = surface0attachee.getBoundingClientRect().width;
                //.calculates absolute move adding initial position + current move
                absFraction = validateAbsFraction( absFracDone + move[ 0 ]/len );
                //.supplies absolute move to application
                var setIsForbidden = dataInMove( absFraction, draggee );
                if( !setIsForbidden ) { doSet( absFraction ); }
            }

            if( mouseUpOrDown === 'up' ) {
                //.accomulates and memorizes accomulated move
                absFracDone = absFraction;
                dataInArrival( absFraction, draggee );
            }
        }


        ///d8d application emulator
        ///mocks real event, mouseUpOrDown, and sets absFraction
        ///used for "programmable animation" of this slider
        function d8d_emulateAbsFractionX( absFraction, mouseUpOrDown )
        {
            var len = surface0attachee.getBoundingClientRect().width;
            var relMove = ( absFraction - absFracDone ) * len;
            //ccc( 'emulation-layer in engine: len=' + len + ' absFracDone=' +
            //absFracDone + ' absFraction=' + absFraction + ' relMove=' + relMove );
            return cbDownMoveUp( [ relMove, 0 ], mouseUpOrDown );
        }



        // //\\// helpers
        function validateAbsFraction( absFrac )
        {
            return Math.min( maxLimit, Math.max( absFrac, lowLimit ) );
        }

        //====================================================================
        // //\\ protects textarea, form elements ... from dragging
        //      to preserve ordinary clicks on form elements or other controls
        //      disables dragging on form and other elements
        //====================================================================
        function skipD8D( ev )
        {
                var tag = ev.target.tagName.toLowerCase();
                ///fails: var cls = ev.target.className;
                if(
                        //protects wbd debugger
                        tag === 'textarea' ||
                        //protects forms
                        tag === 'input' || tag === 'select' || tag === 'button' ||
                        //protects firmware plugins which use svg
                        tag === 'rect' || tag === 'path'
                ) {
                    //ns.d('touchDown: skips drag on tag=' + tag);
                    return true;
                }
        }
        //====================================================================
        // \\// protects textarea, form elements ... from dragging
        //====================================================================

    };
})();

