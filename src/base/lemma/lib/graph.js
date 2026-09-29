// Creates a lemma graph: a wrapper over the bsl chart
// (nsmethods.createsGraphFramework) which adds the lemma's
// legends, plot colors, and CSS.
// Any number of graphs can be created.

( function() {
    var { $$, sDomF, nsmethods, haz, globalCss, stdMod, }
        = window.b$l.apptree({ stdModExportList : { createsGraph, }, });
    var GLOBAL_CSS_APPENDED = false;
    return;


    //**************************************************
    //**************************************************
    // //\\ instantiable graph
    //**************************************************
    //**************************************************
    function createsGraph({
        parentDom$,
        customXLegend,
    }){
        const graph = {};
        var colorThreadArray = graph.colorThreadArray = defaultPlotColors();

        //===========================================
        // //\\ fills graph object
        //===========================================
        //exports painter
        graph.drawsGraph = drawsGraph;
        graph.setsGraphVisible = setsGraphVisible;
        ///creates graph dom container
        const {container$, graph_dimX, graph_dimY} =
            createsGraphContainer( parentDom$ );
        ///creates low tier api
        graph.chart = nsmethods.createsGraphFramework({
            parent : container$,
            dimX : graph_dimX,
            dimY : graph_dimY,
        });
        //===========================================
        // \\// fills graph object
        //===========================================

        appendsGraphCSS();
        return graph;



        //===================================================
        // //\\ top tier painter which wraps low tier painter
        //===================================================
        function drawsGraph({
            drawDecimalY,
            drawDecimalX,
            printAxisXDigits,
            printAxisYDigits,
            xMin,
            xMax,
            yMin,
            yMax,
        }){
            drawDecimalY = typeof drawDecimalY === 'undefined' ? true : drawDecimalY;
            drawDecimalX = typeof drawDecimalX === 'undefined' ? true : drawDecimalX;

            //first array mast be enabled
            let graphArrayMask = haz( graph, 'graphArrayMask' );

			var { legendText, legendX } = customXLegend ?
				customXLegend() :
				{ legendText: 'Distance from force (SP)', legendX : -560 };
            const { textColor, axisYLegend, axisXLegend, } =
                graphAxisLegends( legendText, legendX );
            //==================================================
            // //\\ calls api
            // //\\ calls low tier api
            //==================================================
            graph.chart.drawGraph({
                //first array mast be enabled
                graphArrayMask,

                graphArray : graph.graphArray,
                colorThreadArray,
                style : {
                   //'stroke-width' : 2, //destroys tp-machine
                },
                axisX : axisXStyle( textColor ),
                axisY : axisYStyle( textColor ),
                drawDecimalY,
                drawDecimalX,
                doSideAxes : true,

                printAxisDigits : true,
                    printAxisXDigits,
                    printAxisYDigits,

                axisYLegend,
                axisXLegend,
                plotsCount_overrider : 1000,
                doPaintGridOnlyOnce : false,
                doDrawToolline : toollineConfig(),
				brightenGrid : 0.3,
                xMin,
                xMax,
                yMin,
                yMax,
            });
            graph.chart.gmedia$.addClass( 'graph-media' );
            //==================================================
            // \\// calls low tier api
            //==================================================

        	setsGraphTpClasses(graph.chart);
        }
        //===================================================
        // \\// top tier painter which wraps low tier painter
        //===================================================


		function toollineConfig()
        {
            return {
                toollineStyle : {
                    'stroke-width' : 2,
                },
                abscissaIxValue : stdMod.qIndexFromPointPToGraphIndex(),
                numberMarks : false,
            };
        }

        ///horizontal axis x pars, font, etc,
        function axisXStyle( textColor )
        {
            return {
                'font-size'     : '18px',
                fontShiftX      : -12, //in media scale
                fontShiftY      : +14,
                decimalDigits   : 3,
                stroke          : textColor,
                fill            : textColor,
                'stroke-width'  : '0.2',
            };
        }

        function axisYStyle( textColor )
        {
            return {
                'font-size'     : '20px',
                fontShiftX      : -45, //in media scale
                fontShiftY      : +5,
                decimalDigits   : 1,
                stroke          : textColor,
                fill            : textColor,
                'stroke-width'  : '1',
            };
        }

        //==================================================
        // //\\ shows/hides graph container
        //==================================================
        function setsGraphVisible( isVisible )
        {
            if( isVisible ) {
                container$.removeClass( 'hidden' );
            } else {
                container$.addClass( 'hidden' );
            }
        }
        //==================================================
        // \\// shows/hides graph container
        // \\// calls top tier api
        //==============================================
    }
    //===================================================
    // \\// top tier painter which wraps low tier painter
    // \\// instantiable graph
    //**************************************************
    //**************************************************



    ///===========================================
    /// appends graph CSS, once for all graphs
    ///===========================================
    function appendsGraphCSS()
    {
        if( GLOBAL_CSS_APPENDED ) return;
        GLOBAL_CSS_APPENDED = true;
        globalCss.update( `
            .graph-container {
                position: relative;
                width   : 95%;
                left    : 2%;
                top     : 10px;
                z-index : 1100;
                transition : top 1s ease-in-out;
            }

            .graph-container.hidden {
                top     : -200%;
            }

            .graph-media {
                position: relative;
                border  : 2px solid black;
                width   : 100%;
                left    : 0%;
                top     : 0%;
                background-color : rgba( 255,255,255,1 );
            }
        `,
            'graph-style'
        );
    }

	///this thing is not dynamic (missed in design),
	///but, colorThreadArray is accessible for reset
	///dynamically,
	///
	//this is just an example how to reset colors dynamically
	//in model_upcreate():
	//stdMod.graph.colorThreadArray[0] = sDomF.getFixedColor( 'force' );
	function defaultPlotColors() {
		let colorThreadArray = [
			sDomF.getFixedColor( 'force' ),
			sDomF.getFixedColor( 'estimatedForceColor' ),
		];
		return colorThreadArray;
	}

	function createsGraphContainer( parentDom$ ) {
		const container$ = $$.div()
		.addClass( 'graph-container' )
		.to( $$.div().to( parentDom$ )
				.addClass( 'graph-parent' )
				//.css( 'position', 'absolute' )

				//:this data sets outer dimensions of the graph
				.css( 'width', '400px' )
				.css( 'height', '230px' )
				.css( 'top', '0' )
				.css( 'left', '0' )
				.css( 'z-index', '111111' )
		);
		//creates low tier api
		const graph_dimX = 1000;  //innerWidth
		const graph_dimY = 580;   //innerHeight
		return {container$, graph_dimX, graph_dimY}
	}

	function graphAxisLegends(legendText, legendX) {
		const getFixedColor = sDomF.getFixedColor;

		//==================================================
		// //\\ calls api
		//==================================================
		var textColor      = 'rgba(0,0,0,1)';
		var axisYLegend =
		[
			{
				//together, tobold hover-width and tostroke can be redundant
				text    :   '<text><tspan class="tofill tobold hover-width"' +
							'>Force</tspan></text>',
				x       : 40,
				y       : 25,
				style   : {
							'font-size' : 28 + 'px',
				},
			},
			{	// chart title
				text    :   '<text><tspan class="tp-force tofill tobold hover-width"' +
							//overrides tp machinery
							' style="fill:'+getFixedColor( 'force' ) + '; stroke:'+getFixedColor( 'force' ) + ';"' +
							'>Actual</tspan>' +
							'<tspan> and </tspan>' +

							'<tspan class="tofill tobold hover-width"' +
							//overrides tp machinery
							' style="fill:'+getFixedColor( 'estimatedForceColor' ) + '; stroke:' + getFixedColor( 'estimatedForceColor' ) + ';"' +
							'>Estimated' +
							'</tspan>' +

							'<tspan> forces</tspan>' +
							'</text>',
				x       : 310,
				y       : 40,
				style   : {
							'font-size' : '30',
				},
			},
		];
		var axisXLegend =
		[
			{
				text    : legendText,
				x       : legendX,
				y       : 25,
				style   : {
							'font-size' : '30',
							'stroke' : textColor,
							'fill' : textColor,
				},
			},
		];
		return { textColor, axisYLegend, axisXLegend, };
	}

	/**
	 * Makes a particular graph plot highlight along with its
	 * corresponding text.
	 */
	///this thing fails if not to synch it with mask,
	///the unmasked indices must be the same as here:
	function setsGraphTpClasses(chart) {
		chart.plotIx2plotSvg.forEach( (pl,pix) => {
			switch(pix) {
				case 0: pl && $$.$(pl).addClass( 'tp-force tostroke' ); break;
			}
		});
	}
}) ();
