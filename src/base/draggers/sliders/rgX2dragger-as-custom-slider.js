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
        stdMod.rgXSlider__2__dragwrap_gen_list = rgXSlider__2__dragwrap_gen_list;
    }

    //==========================================
    // //\\ attemt to unify dragger for point
    //==========================================
    function rgXSlider__2__dragwrap_gen_list({
        rgX,
        orientation,
        nospinner,
    }) {
        ns.sn( 'customDraggers_list', stdMod, [] );
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
        stdMod.railsCustomSlidersCount = ns.h( stdMod, 'railsCustomSlidersCount' ) ?
            stdMod.railsCustomSlidersCount + 1 : 1; 
    }



}) ();

