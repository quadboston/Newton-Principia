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
        stdMod.createSliderPlaceholder_thickness = createSliderPlaceholder_thickness;
        pointies2line   = ssF.pointies2line;
    }



    function createSliderPlaceholder_thickness()
    {
        var magnit = 'thickness';
        ssF.toreg( magnit )( 'value', 2 );

        ssF.createSliderPlaceholder_generic({
            magnit,
            sliderCaption   : magnit,
            cssClsKey       : ' ' + magnit,
            max_magnit      : 30,
            min_magnit      : 1,
            SUGGESTED_COLOR : "#999999",
            magnitude2app,
        });
    }



    function magnitude2app( magnit_api, newValue )
    {
        //==========================================
        // //\\ sets magnit_api to specified elements
        //==========================================
        magnit_api.value = newValue;

        //todm ... this pollutes css by stacking the same keys
        //         on top of each other: (the last-one takes an effect) and
        //         interferes with other slieder css
        ns.globalCss.update(`
            .tofill.tostroke.thickable,
            .thickable.tostroke {
                stroke-width : ${newValue.toFixed()};
            }
        `);
        //==========================================
        // \\// sets magnit_api to specified elements
        //==========================================
    }

}) ();

