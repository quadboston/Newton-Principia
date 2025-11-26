( function() {
    const { haz, hafff, nsmethods, sconf, stdMod, ssF, } =
        window.b$l.apptree({ stdModExportList :
        {
            wraps_graph_fw, //overrides default
        },
    });
    return;


    function wraps_graph_fw({
        digramParentDom$,
        graph_methods,
    }){
        const graph_wrap = {};
        graph_wrap.wraps_draw_graph = wraps_draw_graph;
        ssF.attach_graph_methods( graph_wrap, graph_methods );
        let {container$, graph_dimX, graph_dimY} =
            graph_wrap.creates_chain_of_containers_under_parent( digramParentDom$ );
        graph_wrap.fw = nsmethods.createsGraphFramework({
            parent : container$,
            dimX : graph_dimX,
            dimY : graph_dimY,
        });
        graph_wrap.creates_global_css(); //todm put in defaults
        return graph_wrap;


        function wraps_draw_graph({
                drawDecimalY,
                drawDecimalX,
                printAxisXDigits,
                printAxisYDigits,
                xMin,
                xMax,
                yMin,
                yMax,
            }){
                drawDecimalY = typeof drawDecimalY === 'undefined' ?
                    true : drawDecimalY;
                drawDecimalX = typeof drawDecimalX === 'undefined' ?
                    true : drawDecimalX;

                graph_wrap.setsGraphTpClasses();
                graph_wrap.doSetpix2color();
                hafff( graph_wrap, 'creates_mask' );
                var { yColor, xColor, axisYLegend, axisXLegend, } =
                    graph_wrap.sets_axes();

                graph_wrap.fw.drawGraph({
                    //first array mast be enabled
                    pix2mask :
                        graph_wrap.fw.content.pix2mask,

                    graphArray : graph_wrap.fw.content.pix2values,
                    pix2color : graph_wrap.fw.content.pix2color,
                    style : {
                    //'stroke-width' : 2, //destroys tp-machine
                    },
                    axisX : graph_wrap?.graphAxisX( xColor ) || {
                        'font-size'     : '18px',
                        fontShiftX      : -12, //in media scale
                        fontShiftY      : +14,
                        decimalDigits   : 3,
                        stroke          : xColor,
                        fill            : xColor,
                    'stroke-width'   : '0.2',
                    },
                    axisY : graph_wrap?.graphAxisY( yColor ) || {
                        'font-size'     : '20px',
                        fontShiftX      : -45, //in media scale
                        fontShiftY      : +5,
                        decimalDigits   : 1,
                        stroke          : yColor,
                        fill            : yColor,
                    'stroke-width'   : '1',
                    },
                    drawDecimalY,
                    drawDecimalX,
                    doSideAxes : true,

                    printAxisDigits : true,
                        printAxisXDigits,
                        printAxisYDigits,

                    axisYLegend,
                    axisXLegend,
                    plotsCount_overrider : 1000,
                    plotsPars : graph_wrap.plotLabels_2_plotsPars(
                                graph_wrap.fw.content.pix2color ),
                    doPaintGridOnlyOnce : false,
                    doDrawToolline : graph_wrap?.doDrawToolline() || {
                        toollineStyle : {
                            stroke : graph_wrap.fw.content.pix2color[2],
                            'stroke-width' : 3,
                        },
                        abscissaIxValue : stdMod.P2gix(),
                        numberMarks : true,
                    },
                    brightenGrid : 0.3,
                    xMin,
                    xMax,
                    yMin,
                    yMax,
                });
        }
    }
})();
