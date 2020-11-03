( function() {
    var {
        ns,
        sDomF,
        stdMod,
    } = window.b$l.apptree({
        modName:'custom-slider',
        setModule });
    return;









    function setModule()
    {
        stdMod.rgX2dragger_asCustomSlider = rgX2dragger_asCustomSlider;
    }

    //==========================================
    // //\\ attemt to unify dragger for point
    //==========================================
    function rgX2dragger_asCustomSlider({
        rgX,
        orientation,
        nospinner,
    }) {
        ns.sn( 'customDraggers_list', stdMod, [] );
        stdMod.customDraggers_list.push(
            ( function( medD8D ) {
                rgX.dragDecorColor= rgX.pcolor; //'#00aaba';
                sDomF.rgX2dragger({
                    medD8D,
                    rgX,
                    orientation,
                    nospinner,
                })
            })
        );
        //todm ... do automate
        stdMod.railsCustomSlidersCount = ns.h( stdMod, 'railsCustomSlidersCount' ) ?
            stdMod.railsCustomSlidersCount + 1 : 1; 
    }



}) ();

