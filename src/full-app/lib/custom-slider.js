( function() {
    var {
        ns,
        sDomF,
        stdMod,
    } = window.b$l.app({
        modName:'custom-slider',
        setModule });
    return;









    function setModule()
    {
        stdMod.addsCustomSlider = addsCustomSlider;
    }

    //==========================================
    // //\\ attemt to unify dragger for point
    //==========================================
    function addsCustomSlider({
        rgX,
        orientation,
        nospinner,
    }) {
        ns.sn( 'customDraggers_list', stdMod, [] );
        stdMod.customDraggers_list.push(
            ( function( medD8D ) {
                rgX.dragDecorColor= rgX.pcolor; //'#00aaba';
                sDomF.createDragger_pointX({
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

