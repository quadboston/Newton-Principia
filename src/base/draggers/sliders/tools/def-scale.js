( function() {
    var {
        ns, haz,
        sconf,
        rg,
        ssF,
        stdMod,
    } = window.b$l.apptree({
        modName:'studyModel_2_ss',
        setModule,
        ssFExportList : { scaleValue2app },
    });
    var pointies2line;
    return;











    function setModule()
    {
        stdMod.createSliderPlaceholder_media_scale = createSliderPlaceholder_media_scale;
        pointies2line   = ssF.pointies2line;
    }


    ///----------------------------------------
    /// creates slider only once per
    /// app model creation;
    ///----------------------------------------
    function createSliderPlaceholder_media_scale()
    {
        var magnit = 'media_scale';
        var media_scale_value = haz( rg[ magnit ], 'value' ) || 1;
        ssF.toreg( magnit )( 'value', media_scale_value );

        ssF.sliderTemplate({
            magnit,
            sliderCaption   : 'scale',
            cssClsKey       : ' ' + magnit,
            max_magnit      : 100,
            min_magnit      : 0.2,
            SUGGESTED_COLOR : "#999999",
            magnitude2app,
        });
    }

    function magnitude2app( magnit_api, newValue )
    {
        // //\\ todm: fullLength patch,
        //            to fit CB in window
        //            todm: what is "CB"? why do we have "fullLength" here?
        //var fullLength = 1;
        //magnit_api.value = newValue * fullLength;

        magnit_api.value = newValue;
        scaleValue2app( magnit_api.value );
        // \\// todm: fullLength patch
    }


    function scaleValue2app( svalue ) {
        sconf.mod2inn_scale = sconf.originalMod2inn_scale * svalue;
        sconf.inn2mod_scale = 1/sconf.mod2inn_scale;
    }


}) ();

