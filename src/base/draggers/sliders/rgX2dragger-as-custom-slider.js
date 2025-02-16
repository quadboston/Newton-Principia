( function() {
    var {
        sn, has,
        sDomF,
        stdMod,
    } = window.b$l.apptree({
        ssFExportList : {
            rgXSlider__2__dragwrap_gen_list,
        },
    });
    return;









    //==========================================
    // //\\ attemt to unify dragger for point
    //==========================================
    function rgXSlider__2__dragwrap_gen_list({
        rgX,
        orientation,
        nospinner,
    }) {
        stdMod.customDraggers_list.push(
            ( function( medD8D ) {
                rgX.dragDecorColor= rgX.pcolor; //'#00aaba';
                sDomF.rgX_2_dragWrap({
                    medD8D,
                    rgX,
                    orientation,
                    nospinner,
                })
            })
        );
        //todm ... do automate
        stdMod.railsCustomSlidersCount = has( stdMod, 'railsCustomSlidersCount' ) ?
            stdMod.railsCustomSlidersCount + 1 : 1; 
    }



}) ();

