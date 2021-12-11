( function() {
    var {
        ns, sn, $$, eachprop, has, haz, hafff,
        ssF, sDomF, exegs,
        amode, stdMod,
    } = window.b$l.apptree({
        SUB_MODEL : 'projectile_model',
        stdModExportList :
        {
            media_upcreate,
        },
    });
    var handleR = 5;
    var toreg = stdMod.toreg;
    var rg = stdMod.rg;
    return;









    ///=========================================================
    /// engine legacy function,
    /// GUIfies what is still not GUIfied,
    ///=========================================================
    function media_upcreate()
    {
        return;
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        //if( !ssF.mediaModelInitialized ) {
        //    ns.haff( stdMod, 'create_digital_legend' );
        //}

        //:updates subessay menu
        var exAspect = exegs[ amode.theorion ][ amode.aspect ];
        var subexeg = exAspect.subessay2subexeg[ amode.subessay ];
        sDomF.addsChosenCSSCls_to_subessay8menuSubitem({ exAspect, subexeg })


        //todm ... generalize in one spot
        ssF.toogle_detectablilitySliderPoints4Tools( stdMod, );

        stdMod.path2media();
        stdMod.paints_draggableDecPoints8Line();
        //does not repeat creation ...A.svgel, ...
        stdMod.doPaintDecor();
        stdMod.paintsDragKernels()

        //wraps remained tasks into d8d slider
        //if slider is already created ...
        hafff( rg.slider_sltime, 'upd_sliderGUI8legend__8__unmask' ); 

        ssF.mediaModelInitialized = true;
    }

}) ();

