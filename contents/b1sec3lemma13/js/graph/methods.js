( function() {
    const {
        $$, nspaste, globalCss,
        sconf, ssD, sDomF, stdMod,
    } = window.b$l.apptree({ ssFExportList : {
            attach_graph_methods,
        },
    });
    return;


    function attach_graph_methods ( graph_wrap, graph_methods ){
        graph_wrap.sets_axes = sets_axes;
        graph_wrap.setsGraphTpClasses = setsGraphTpClasses;
        graph_wrap.doSetpix2color = doSetpix2color;
        graph_wrap.creates_global_css = creates_global_css;
        graph_wrap.creates_chain_of_containers_under_parent =
                   creates_chain_of_containers_under_parent;
        graph_wrap.plotLabels_2_plotsPars = plotLabels_2_plotsPars;
        graph_wrap.doDrawToolline = doDrawToolline;
        graph_wrap.graphAxisX = graphAxisX;
        graph_wrap.graphAxisY = graphAxisY;
        nspaste( graph_wrap, graph_methods );
        return;


        //=====================================
        // //\\ tp classes, colors, and masks
        //=====================================
        function SETS_PLOTS_TP_NAME (){
            const tpnames = [
                'force',
                'context',
                'body',
            ];
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                tpnames[tpnames.length + fix] = 'context';
            });
            return tpnames;
        }

        function doSetpix2color (){
            const multi = ssD?.zebraCols?.multicolor;
            if( multi ){
                var pix2color = multi.map(
                    col => col.rgba_high );
            } else {
                var pix2color = SETS_PLOTS_TP_NAME().map(
                    c => sDomF.getFixedColor( c ));
            }
            graph_wrap.fw.content.pix2color = pix2color;
            return pix2color;
        }

        ///this thing fails if not to synch it with mask,
        ///the unmasked indices must be the same as here:
        function setsGraphTpClasses()
        {
                graph_wrap.fw.pix2psvg.forEach( (pl,pix) => {
                    switch(pix) {
                        case 0: pl && $$.$( pl ).addClass( 'tp-force tostroke' ); break;
                        case 2: pl && $$.$( pl ).addClass( 'tp-body tostroke' ); break;
                    }
                });
       }

       function sets_axes (){
            //==================================================
            // //\\ calls api
            //==================================================
            //y-legend color; taken from first plot color:
            const yColor = graph_wrap.fw.content.pix2color[ 0 ];

            //axis x and legend x color:
            //manually picked color, not from plot,
            var xColor      = 'rgba(0,0,0,1)'; //'rgba(0,0,255,1)';

            var axisYLegend =
            [
                {
                    text    : 'Force',
                    x       : 40,
                    y       : 25,
                    style   : {
                                'font-size' : 28 + 'px',
                                'stroke' : yColor,
                                'fill'   : yColor,
                    },
                },

                {
                    text    : 'Force f, 1/r², and speed v per their maximums.',
                    x       : 250,
                    y       : 40,
                    style   : {
                                'font-size' : '30',
                                'stroke' : 'black',
                                'fill'   : 'black',
                    },
                },

            ];
            var axisXLegend =
            [
                {
                        text    : 'Distance, r',
                    x       : -700,
                    y       : 25,
                    style   : {
                                'font-size' : '30',
                                'stroke' : xColor,
                                'fill' : xColor,
                    },
                },
                {
                    text    : '',
                    x       : 50,
                    y       : -20,
                    style   : {
                                'font-size' : '23',
                                'stroke' : xColor,
                                'fill' : xColor,
                    },
                },
            ];
            return { yColor, xColor, axisYLegend, axisXLegend, };
        }
        //=====================================
        // \\// tp classes, colors, and masks
        //=====================================

        //=========================================
        // //\\ containers
        //=========================================
        function creates_global_css (){
            globalCss.update( `
                .blesson-graph-svg-parent {
                    position: relative;
                    width   : 95%;
                    left    : 2%;
                    top     : 10px;
                    z-index : 1100;
                    transition : top 1s ease-in-out;
                }

                .blesson-graph-svg-parent.hidden {
                    top     : -200%;
                }

                .comment-inside-of-style-element___php-media,
                .graph-box-svg {
                    position: relative;
                    border  : 2px solid black;
                    width   : 100%;
                    left    : 0%;
                    top     : 0%;
                    background-color : rgba( 255,255,255,1 );
                },
                'chem-equilibr-graph-style'
            `);
        }

        function creates_chain_of_containers_under_parent( digramParentDom$ ){
                const container$ = $$.div()
                .addClass( 'blesson-graph-svg-parent' )
                .to( $$.div().to( digramParentDom$ )
                        .addClass( 'graph-super-parent' )
                        //:this data sets outer dimensions of the graph
                        .css( 'width', '400px' )
                        .css( 'height', '230px' )

                        .css( 'top', '0' )
                        .css( 'left', '0' )
                        .css( 'z-index', '111111' )
                );
                const graph_dimX = 1000;  //innerWidth
                const graph_dimY = 580;   //innerHeight
                graph_wrap.container$ = container$;
                return {container$, graph_dimX, graph_dimY};
        }
        //=========================================
        // \\// containers
        //=========================================

        function plotLabels_2_plotsPars( //curveLabels
            pix2color ){
            ///make sure, the number of plot labels is equal to plot functions y(x)
            return [
                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 'f',
                    fontShiftX : 0,
                    fontShiftY : 15,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : pix2color[0],
                        //'fill' : pix2color[0],
                    },
                    //overrides tp class
                    //plotStyle : {
                    //    'stroke-width'  : '5',   //optional
                    //},
                },

                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : '1/r²',
                    fontShiftX : 25,
                    fontShiftY : 15,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : pix2color[1],
                    },
                },

                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 'v',
                    fontShiftX : 40,
                    fontShiftY : 15,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : pix2color[2],
                    },
                },
            ];
        }

        function doDrawToolline (){
            return {
                toollineStyle : {
                        stroke : graph_wrap.fw.content.pix2color[2],
                    'stroke-width' : 3,
                },
                abscissaIxValue : stdMod.P2gix(),
                numberMarks : true,
            };
        }

        ///horizontal axis x pars, font, etc,
        function graphAxisX( xColor ){
            return {
                'font-size'     : '18px',
                fontShiftX      : -12, //in media scale
                fontShiftY      : +14,
                decimalDigits   : 3,
                stroke          : xColor,
                fill            : xColor,
            'stroke-width'   : '0.2',
            };
        }

        function graphAxisY( yColor ){
            return {
                'font-size'     : '20px',
                fontShiftX      : -45, //in media scale
                fontShiftY      : +5,
                decimalDigits   : 1,
                stroke          : yColor,
                fill            : yColor,
            'stroke-width'   : '1',
            };
        }

        /*
        /// shows/hides graph container
        function showPHGraph( doShow ){
            if( doShow ) {
                graph_wrap.container$.removeClass( 'hidden' );
            } else {
                graph_wrap.container$.addClass( 'hidden' );
            }
        }
        */
    }
})();
