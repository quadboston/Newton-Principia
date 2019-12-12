//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');

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
            addFeaturesToDecPoint,
            parent_classes,
            makeCentralDiskInvisible, //affects common properties:
            orientation,
            makeCentralDiskInvisible,
            tooltip,
        } = (opt||{});

        var { spinnerClsId, dragDecorColor } = ( addFeaturesToDecPoint || {} );
        //----------------------------------------------
        // \\// api
        //----------------------------------------------

        //----------------------------------------------
        // //\\ builds cls and CSS
        //----------------------------------------------
        dpdec.createGlobal( makeCentralDiskInvisible ); //idempotent
        var cls = 'brc-slider-draggee';
        if( addFeaturesToDecPoint ) {
            if( dragDecorColor ) {
                dpdec.creates_spinnerOwnCss(
                    spinnerClsId,
                    dragDecorColor,
                    parent_classes
                );
                //later on, don't forget to make ns.globalCss.update();
                //or make it bounce via setTimeout to accomulate all the configured-points ...
            }
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
        return decPoint;
    }

})();


