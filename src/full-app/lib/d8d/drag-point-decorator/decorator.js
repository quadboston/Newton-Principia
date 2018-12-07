//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');

    dpdec.addD8D_decorationPoint = addD8D_decorationPoint;
    return;







    ///creates decPoint, properly css-classed html of draggee-point-decorations and
    ///attaches this html to hostDomEl
    function addD8D_decorationPoint(
        hostDomEl,      //usually dragSurface
        cssId,          //optional
        color,          //optional
        parent_classes  //optional
    ) {
        var decPoint = document.createElement( 'div' );
        decPoint.setAttribute( 'class', 'brc-slider-draggee' + ( cssId ? ' ' + cssId : '' ) );
        if( cssId && color ) {
            var fullCssId = 'brc-slider-draggee-' + cssId;
            decPoint.setAttribute( 'id', fullCssId );
            dpdec.create_individualCss( fullCssId, color, parent_classes );
            //later on, don't forget to make ns.globalCss.update();
        }
        hostDomEl.appendChild( decPoint );

        var left = document.createElement( 'div' );
        left.setAttribute( 'class', 'brc-slider-draggee-left' );
        decPoint.appendChild( left );

        var right = document.createElement( 'div' );
        right.setAttribute( 'class', 'brc-slider-draggee-right' );
        decPoint.appendChild( right );
        return decPoint;
    }

})();


