//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');

    dpdec.addD8D_decorationPoint = addD8D_decorationPoint;
    return;







    ///creates decPoint, properly css-classed html of draggee-point-decorations and
    ///attaches this html to domParent_of_decorationPoint
    function addD8D_decorationPoint(
        domParent_of_decorationPoint,   //required: usually dragSurface
        addFeaturesToDecPoint,          //optional
        parent_classes                  //optional
    ) {
        if( addFeaturesToDecPoint ) {
            var css_class_as_id = addFeaturesToDecPoint.css_class_as_id; //required
            var dragDecorColor =  addFeaturesToDecPoint.dragDecorColor; //optional
        }

        var decPoint = document.createElement( 'div' );
        dpdec.createGlobal(); //idempotent
        var cssCls = 'brc-slider-draggee';

        if( addFeaturesToDecPoint ) {
            //.this line allows the handle to be managed
            //.from other module css, for example, 
            //.allows to hide dividor draggee at highlight
            cssCls += ' ' + css_class_as_id;

            if( dragDecorColor ) {
                //amended: decPoint.setAttribute( 'id', fullCssId );
                dpdec.create_individualCss(
                    css_class_as_id, dragDecorColor, parent_classes
                );
                //later on, don't forget to make ns.globalCss.update();
            }
        }

        decPoint.setAttribute( 'class', cssCls );
        domParent_of_decorationPoint.appendChild( decPoint );

        var left = document.createElement( 'div' );
        left.setAttribute( 'class', 'brc-slider-draggee-left' );
        decPoint.appendChild( left );

        var right = document.createElement( 'div' );
        right.setAttribute( 'class', 'brc-slider-draggee-right' );
        decPoint.appendChild( right );
        return decPoint;
    }

})();


