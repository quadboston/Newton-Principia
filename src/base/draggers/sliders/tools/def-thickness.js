( function() {
    var {
        globalCss,
        sconf, ssF, rg, toreg,
        stdMod,
    } = window.b$l.apptree({
        setModule,
        ssFExportList : {
            createSliderPlaceholder_thickness,
        },
    });
    var pivots_2_svgLineInRg;
    return;








    function setModule()
    {
        pivots_2_svgLineInRg   = ssF.pivots_2_svgLineInRg;
    }



    function createSliderPlaceholder_thickness()
    {
        var magnit = 'thickness';
        toreg( magnit )( 'value', 2 );

        ssF.sliderTemplate({
            magnit,
            sliderCaption   : magnit,
            cssClsKey       : ' ' + magnit,
            max_magnit      : 30,
            min_magnit      : 1,
            SUGGESTED_COLOR : "#999999",
            magnitude2app,
            stdMod,
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
        globalCss.update(`
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

