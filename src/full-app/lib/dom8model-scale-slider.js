( function() {
    var {
        ns,
        sconf,
        ssF,
        stdMod,
    } = window.b$l.app({
        modName:'studyModel_2_ss',
        setModule });

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
        ssF.toreg( magnit )( 'value', 1 );
        ssF.sliderTemplate({
            magnit,
            sliderCaption   : 'scale',
            cssClsKey       : ' ' + magnit,
            max_magnit      : 3,
            min_magnit      : 0.3,
            SUGGESTED_COLOR : "#999999",
            magnitude2app,
        });
    }

    function magnitude2app( magnit_api, newValue )
    {
        // //\\ todm: fullLength patch,
        //            to fit CB in window
        var fullLength = 1;
        magnit_api.value = newValue * fullLength;
        sconf.mod2inn_scale = sconf.originalMod2inn_scale * magnit_api.value;
        sconf.inn2mod_scale = 1/sconf.mod2inn_scale;
        // \\// todm: fullLength patch
    }

}) ();

