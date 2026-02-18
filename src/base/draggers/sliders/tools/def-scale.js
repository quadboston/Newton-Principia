( function() {
    var {
        haz,
        sconf, ssF, rg, toreg,
        stdMod, amode,
    } = window.b$l.apptree({
        setModule,
        ssFExportList : {
            scaleValue2app,
            createSliderPlaceholder_media_scale,
        },
    });
    var pivots_2_svgLineInRg;
    return;











    function setModule()
    {
        pivots_2_svgLineInRg   = ssF.pivots_2_svgLineInRg;
    }


    ///----------------------------------------
    /// creates slider only once per
    /// app model creation;
    ///----------------------------------------
    function createSliderPlaceholder_media_scale()
    {
        var magnit = 'media_scale';
        var media_scale_value = haz( rg[ magnit ], 'value' ) || 1;
        toreg( magnit )( 'value', media_scale_value );

        ssF.sliderTemplate({
            magnit,
            sliderCaption   : 'scale',
            cssClsKey       : ' ' + magnit,
            max_magnit      : haz( sconf, 'MAX_MAGNITUDE' ) || 100,
            min_magnit      : 0.2,
            SUGGESTED_COLOR : "#999999",
            magnitude2app,
        });
    }

    function magnitude2app( magnit_api, newValue,)
    {
        // //\\ todm: fullLength patch,
        //            to fit CB in window
        //            todm: what is "CB"? why do we have "fullLength" here?
        //var fullLength = 1;
        //magnit_api.value = newValue * fullLength;

        magnit_api.value = newValue;
        scaleValue2app( magnit_api.value, );
        // \\// todm: fullLength patch
    }


    function scaleValue2app( svalue, ) {
        var sc = sconf;
        sc.mod2inn_scale = sc.originalMod2inn_scale * svalue;
        sc.inn2mod_scale = 1 / sc.mod2inn_scale;
    }


}) ();

