// wraps graph framework over vendors bsl createsGraphFW()
( function() {
    const { ns, sn, $$, nsmethods, haz, globalCss,
            sconf, rg, ssD, sDomN, stdMod,
    } = window.b$l.apptree({
        stdModExportList : { graph_decorations, auxiliary_arbitrary_colors_generator, },
    });
    return;

    
    function graph_decorations() {
        const fw = rg.pHGraph.fw;
        var style = {
            'stroke-width'  : '3',
        };
        {
            ////if( printAxisDigits ) {
            var rPars = rg.reactionParams;
            var axisYLegend =
            [
                {
                    text    : 'ratio = left-bar / right-bar',
                    x       : 20,
                    y       : 40,
                    style   : {
                                'font-size' : '20',
                                //'stroke' : 'rgba(0,0,0,1)',
                    },
                },

                {
                    text    : 'First ' + sconf.BARS_NUMBER_TO_PLOT +
                                ' bars ratio.',
                    x       : 420,
                    y       : 30,
                    style   : {
                                'font-size' : '30',
                                //'stroke' : 'rgba(0,0,0,1)',
                    },
                },
            ];

            var axisXLegend =
            [
                {
                    text    : 'bars',
                    x       : 23,
                    y       : 10,
                    style   : {
                                'font-size' : '18',
                                'font-style' : 'normal',
                                //'stroke' : 'rgba(0,0,0,1)',
                    },
                },
                {
                    text    : 'count',
                    x       : 23,
                    y       : 25,
                    style   : {
                                'font-size' : '18',
                                'font-style' : 'normal',
                                //'stroke' : 'rgba(0,0,0,1)',
                    },
                },
            ];
        }
        return {axisXLegend, axisYLegend, style };
    }
    
    
    ///this function works, but it can be also a template,
    ///f.e. set other number of colors: maxColors,
    ///colors are probably optimized as distinctive neighbors in
    ///their sequence,
    function auxiliary_arbitrary_colors_generator(monoColorHue){
        //==================================================
        // //\\ decoration graph
        //==================================================
        ssD.zebraCols = {};
        [ false, ns.rgbaArr2hsla( [0,     0,   255,    1] )[0] ].forEach(
            ( monoColorHue ) => {
                var wwCols = ns.builds_zebraNColors_array({
                    maxColors : 10,
                    SATUR       : sconf.DEFAULT_TP_SATUR,  //site setting

                    //40 seems better than 40 for distinct graph lines
                    LIGHT       : 40,  //sconf.default_tp_lightness ||
                    OPACITY     : 0.8, //apparently irrelevant; sconf.DEFAULT_TP_OPACITY,
                    zebraNumber : 4,
                    monoColorHue, //true is for mono, false is for multy,
                });
                if( monoColorHue ) {
                    ssD.zebraCols.monocolor = wwCols;
                } else {
                    ssD.zebraCols.multicolor = wwCols;
                }
            });
    }
})();
