// wraps graph framework over vendors bsl createsGraphFW()
( function() {
    const {
        ns, sn, $$, nsmethods, haz, globalCss,
        sconf, rg, ssD, sDomN, stdMod,
    } = window.b$l.apptree({
        stdModExportList : { wraps_graph_fw, },
    });
    return;


    //==================================================
    // //\\ creates pHGraph wrap around fw
    //      ,establishes "placeholder" for further work
    //      with graphs diagram
    //==================================================
    function wraps_graph_fw()
    {
        graph_wrap = rg.pHGraph = {};
        var innerWidth      = 1000;
        var innerHeight     = 500;

        var dimX = innerWidth;
        var dimY = innerHeight;

        //exports
        graph_wrap.wraps_draw_graph = wraps_draw_graph;

        ///===========================================
        /// creates fw-dom-container
        ///===========================================
        graph_wrap.container$ = $$.div()
            .addClass( 'graph-box-svg-container' )
            .to( stdMod.simScene )
            ;

        graph_wrap.parent = graph_wrap.container$;
        graph_wrap.dimX = dimX;
        graph_wrap.dimY = dimY;
        ///===========================================
        /// creates raw fw
        ///===========================================
        let fw = nsmethods.createsGraphFW( graph_wrap );

        ///===========================================
        ///does defaults: put in base:
        ///===========================================
        {
            if( !ssD?.zebraCols?.multicolor ){
                //in lemma4, see f.e.
                //[ !'monoColor', ns.rgbaArr2hsla( sconf.MONO_BARS_COLOR )[0] ].forEach(
                stdMod.auxiliary_arbitrary_colors_generator( !!'monoColorHue' );
            }
            fw.content.pix2color = ssD.zebraCols.multicolor
            .map( col => col.rgba_high );
            //t/ fw.content.pix2tpcls = ['tp-given', 'tp-proof',];
        }

        creates_global_css();
        return graph_wrap;
    }

    ///todm must be default in base:
    function creates_global_css(){
        globalCss.update( `
            .graph-box-svg-container {
                position: absolute;
                width   : 85%;
                left    : 10%;
                top     : 0%;
                z-index : 1100;
                transition : top 1s ease-in-out;
            }

            /* php media */
            .graph-box-svg {
                position: absolute;
                border  : 2px solid black;
                width   : 100%;
                left    : 0%;
                top     : 0%;
                background-color : rgba( 255,255,255,1 );
            },
            'graph-box-svg-style'
        `);
    }


    //==================================
    // wraps_draw_graph
    //==================================
    function wraps_draw_graph({}){
        const fw = rg.pHGraph.fw;
        var doSideAxes         = true;
        var printAxisDigits    = true;
        var drawDecimalY       = true;
        var drawDecimalX       = true;

        const {
            style,
            axisYLegend,
            axisXLegend,
        } = stdMod.graph_decorations( printAxisDigits, );

        fw.meth.drawGraph({
            style,
            xMin : 0,
            //xMax,
            //yMin,
            //yMax,
            xRangeFilter :
            {
                min : 0,
                //max : xMax,
            },
            axisX : {
                'font-size'     : '18px',
                fontShiftX      : -12, //in media scale
                fontShiftY      : +16,
                decimalDigits   : 0,
                'stroke-width'   : '0.2',
            },
            axisY : {
                'font-size'     : '20px',
                fontShiftX      : -85, //in media scale
                fontShiftY      : +5,
                decimalDigits   : 5,
                'stroke-width'   : '1',
            },
            drawDecimalY,
            drawDecimalX,
            doSideAxes,
            printAxisDigits,
            axisYLegend,
            axisXLegend,
            //drawAllAxes : false,
        });

        //: post graph-draw changes
        /*
        fw.gmedia$.css( 'border', '2px solid black' );
        fw.gmedia$.css( 'z-index', '1111111' );
        fw.gmedia$.css( 'position', 'absolute' );
        fw.gmedia$.css( 'width', '90%' );
        fw.gmedia$.css( 'height', '50%' );
        fw.gmedia$.css( 'left', '3%' );
        fw.gmedia$.css( 'top', '3%' );
        fw.gmedia$.css( 'background-color', 'rgba(255,255,255,0.8' );
        */
        fw.gmedia$.css( 'background-color', 'rgba(255,255,255,0.8' );
    }
})();
