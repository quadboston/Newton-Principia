// wraps graph framework over vendors bsl createsGraphFW()
(function(){

    const { ns, sn, $$, nsmethods, haz, globalCss,
            sconf, rg, ssD, stdMod,
    } = window.b$l.atree({
        stdModList :
            { graph_decorations,
            },
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
})();
