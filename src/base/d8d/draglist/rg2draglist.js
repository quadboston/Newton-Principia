(function(){
const { haz, ssF, sDomF, rg, eachprop } =
      window.b$l.apptree({ ssFExportList: {rg2draglist} });
return;

///adds plain point dragger if either draggableX, ...Y is defined
function rg2draglist (){
    eachprop( rg, (shape,shpid) => {
        var drX = haz( shape, 'draggableX' );
        var drY = haz( shape, 'draggableY' );
        if( !drX && !drY ) return;

        sDomF.rgx2draglist({
            shpid,
            nospinner : haz( shape, 'nospinner' ),
            acceptPos : haz( shape, 'acceptPos' ) || ( newPos => {
                if( drX ) {
                    shape.pos[0] = newPos[0];
                } else {
                    newPos[0] = shape.pos[0]; //blocks movement
                }
                if( drY ) {
                    shape.pos[1] = newPos[1];
                } else {
                    newPos[1] = shape.pos[1]; //blocks movement
                }
                return true;
            }),
        });
    });
}
})();

