( function() {
    var {
        haz,
        sconf, ssF, rg, toreg,
        stdMod, amode,
    } = window.b$l.apptree({
        setModule,
        ssFExportList : {
            createSliderPlaceholder_media_scale,
        },
    });
    var pointies2line;
    return;

    
    function setModule()
    {
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
        toreg( magnit )( 'value', media_scale_value );

        ssF.sliderTemplate({
            magnit,
            sliderCaption   : 'scale',
            cssClsKey       : ' ' + magnit,
            max_magnit      : haz( sconf, 'MAX_MAGNITUDE' ) || 100,
            min_magnit      : 0.01,
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
        ssF.scaleValue2app( magnit_api.value, );
        // \\// todm: fullLength patch
    }
}) ();

