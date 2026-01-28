// creates html div overlay over draggable points for
// css animation of spinning arrows as defined in decorator.css.js

//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');
    var haz    = ns.haz;
    var decorCount_debug = 0;

    dpdec.adds_decorSpinner = adds_decorSpinner;
    return;


    //===============================================
    ///creates spinner-decorator and
    ///attaches it to spinner_domParent
    //===============================================
    function adds_decorSpinner({
        spinner_domParent, //usually dragSurface
        opt,
    }) {
        //----------------------------------------------
        // //\\ api
        //----------------------------------------------
        var {
            //addFeaturesToDecPoint and addFeaturesToDecPoint.dragDecorColor
            //are flags,
            //addFeaturesToDecPoint.dragDecorColor is a condition to
            //run creates_spinnerOwnCss()
            addFeaturesToDecPoint,

            parent_classes,
            orientation,
            tooltip,
        } = (opt||{});

        var { spinnerClsId, dragDecorColor, individual_zindex,
        } = ( addFeaturesToDecPoint || {} );
        spinnerClsId = spinnerClsId || 'dec-spinner-id='+decorCount_debug;
        //----------------------------------------------
        // \\// api
        //----------------------------------------------

        //----------------------------------------------
        // //\\ builds cls and CSS
        //----------------------------------------------
        dpdec.createSliderArrowsCSS(); // default arrow styles
        var cls = 'brc-slider-draggee';
        //overrides specific styles like color for specific points
        if( addFeaturesToDecPoint ) {
            dpdec.creates_spinnerOwnCss(
                decorCount_debug,
                spinnerClsId,
                dragDecorColor, //individual_color for arrows, and disk
                parent_classes,
                individual_zindex,
            );
            cls += ' ' + spinnerClsId;
        }
        if( orientation === 'horiz' ) {
            cls += ' axis-y';
        } else if( orientation ) {
            cls += ' ' + orientation;
        } 
        //----------------------------------------------
        // \\// builds cls and CSS
        //----------------------------------------------

        //----------------------------------------------
        // //\\ builds 3 DOM elements
        //----------------------------------------------
        var decPoint = document.createElement( 'div' );
        spinner_domParent.appendChild( decPoint );
        var mouseoverCb = haz( addFeaturesToDecPoint, 'mouseoverCb' );
        if( mouseoverCb ) {
            decPoint.addEventListener( 'mouseover', (ev) => {
                mouseoverCb( ev, decPoint );
            });
        }
        var mouseleaveCb = haz( addFeaturesToDecPoint, 'mouseleaveCb' );
        if( mouseleaveCb ) {
            decPoint.addEventListener( 'mouseleave', (ev) => {
                mouseleaveCb( ev, decPoint );
            });
        }

        decPoint.setAttribute( 'class', cls );
        if( tooltip ) {
            decPoint.setAttribute( 'title', tooltip );
        }
        var left = document.createElement( 'div' );
        left.setAttribute( 'class', 'brc-slider-draggee-left' );
        decPoint.appendChild( left );

        var right = document.createElement( 'div' );
        right.setAttribute( 'class', 'brc-slider-draggee-right' );
        decPoint.appendChild( right );
        //----------------------------------------------
        // \\// builds 3 DOM elements
        //----------------------------------------------
        decorCount_debug++;
        return decPoint;
    }

})();


