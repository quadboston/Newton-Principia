(function(){
const { ns, $$, sn, haz, sconf, fconf, sDomF } =
      window.b$l.apptree({
          sDomFExportList:{ finish_DownMoveUp_template } });
return;


//todo check note in buffer: slider
function finish_DownMoveUp_template( arg ){
    var pWrap = arg.pointWrap;
    switch( arg.down_move_up ) {
        case 'down':
            //**rgX optionally can have processDownEvent method:
            ns.hafb( pWrap, 'processDownEvent' )( arg );
            break;
        case 'up' :
            //**rgX optionally can have processUpEvent method:
            ns.hafb( pWrap, 'processUpEvent' )(arg);
            break;
        case 'move':
            //**rgX can be media mover engine
            if( ns.haz( pWrap, 'mediaMover' ) ) {
                var css2model = sDomF.ds2med();
                var mouseOnSurf =
                    sDomF.dspos2medpos( arg.point_on_dragSurf );
            } else if( haz(pWrap, 'unscalable' ) ){
                ////good for bottom side sliders which must igonre zooming
                var css2model = sDomF.ds2med()
                    / sconf.mod2med_original;
            } else {
                //move in model units
                var css2model = sDomF.ds2med() * sconf.med2mod;
            }
            var scaledMove = [
                arg.surfMove[0] * css2model,
                arg.surfMove[1] * css2model,
            ];
            //c cc(
            //     ' css move='+ arg.surfMove[1].toFixed() +
            //     ' diagram-model move=' + scaledMove[1].toFixed(5)
            //)
            //  rgX must have move2updates,
            //  for some rgX, move2updates is added when composing
            //  from draggable point set in ?sconf,
            //  this sub. basically creates newPos from move
            pWrap.move2updates(

                //"fullMoveInsideMathModel",
                //is in model units except for media-mover(-as-a-whole)
                scaledMove,

                mouseOnSurf, //possibly in media units, not im model units,
            );
            break;
    }
}
})();

