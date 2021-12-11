( function() {
    var {
        ns, sn, $$, eachprop, has, haz, hafff,
        sconf, ssF, sDomF, rg, exegs,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate,
        },
    });
    var handleR = 5;
    return;









    ///=========================================================
    /// engine legacy function,
    /// GUIfies what is still not GUIfied,
    ///=========================================================
    function media_upcreate()
    {
        //reestablishes detecton to hide/unhide image for case the state
        //rg.detected_user_interaction_effect_DONE came from subessay launch
        sDomF.detected_user_interaction_effect( !rg.detected_user_interaction_effect_DONE );

        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        if( !ssF.mediaModelInitialized ) {
            ns.haff( stdMod, 'create_digital_legend' );
        }

        //:updates subessay menu
        var exAspect = exegs[ amode.theorion ][ amode.aspect ];
        var subexeg = exAspect.subessay2subexeg[ amode.subessay ];
        ////reveals subessay in menu and in text
        sDomF.addsChosenCSSCls_to_subessay8menuSubitem({ exAspect, subexeg })

        //todm ... generalize in one spot
        ssF.toogle_detectablilitySliderPoints4Tools( stdMod, );

        stdMod.trajectoryShapes_2_media();
        stdMod.paints_draggableDecPoints8Line();
        //does not repeat creation ...A.svgel, ...
        stdMod.dec2media();
        stdMod.dragPointPos_2_mediaOfDragKernels();

        //***********************************************************
        //wraps remained tasks into d8d slider
        //if slider is already created ...
        hafff( rg.slider_sltime, 'upd_sliderGUI8legend__8__unmask' ); 
        //***********************************************************

        ssF.mediaModelInitialized = true;
    }

}) ();

