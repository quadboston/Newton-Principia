// Contains two graph framework creators which
// are wraps over (possibly low level) fw creator in bsl
// The seacond one is more object oriented, lets create
// any number of instances,
//
// These creators, however dependent via createsLowTireGlobalCSS.

( function() {
    var { $$, sDomF, nsmethods, haz, globalCss, stdMod, }
        = window.b$l.apptree({ stdModExportList : { createsGraphFW_class, }, });
    var GLOBAL_CSS_APPENDED = false;
    return;
    
    
    //**************************************************
    //**************************************************
    // //\\ instantiable graph rack
    //**************************************************
    //**************************************************
    function createsGraphFW_class({
        graphFW,
        digramParentDom$,
        customXLegend,
    }){
        var graphFW__self = graphFW;
        var colorThreadArray = graphFW__self.colorThreadArray = setColorThreadArray();

        //===========================================
        // //\\ fills wrap-object
        //===========================================
        //exports painter
        graphFW__self.drawGraph_wrap = drawGraph_wrap;
        graphFW__self.showPHGraph = showPHGraph;
        ///creates fw-dom-container
        let {container$, graph_dimX, graph_dimY} =
            setGraphContainerAttributes( digramParentDom$ );
        ///creates low tier api
        graphFW__self.fw = nsmethods.createsGraphFramework({
            parent : container$,
            dimX : graph_dimX,
            dimY : graph_dimY,
        });
        //===========================================
        // \\// fills wrap-object
        //===========================================

        createsLowTireGlobalCSS();
        return; //no, this must be supplied: graphFW__self;



        //===================================================
        // //\\ top tier painter which wraps low tier painter
        //===================================================
        function drawGraph_wrap({
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
            let graphArrayMask = haz( graphFW__self, 'graphArrayMask' );

			var { legendText, legendX } = customXLegend ? 
				customXLegend() :
				{ legendText: 'Distance from force (SP)', legendX : -560 };
            var { textColor, textColor, axisYLegend, axisXLegend, } = setGraphAxes(graphFW, legendText, legendX);
            //==================================================
            // //\\ calls api
            // //\\ calls low tier api
            //==================================================
            graphFW__self.fw.drawGraph({
                //first array mast be enabled
                graphArrayMask,

                graphArray : graphFW__self.graphArray,
                colorThreadArray,
                style : {
                   //'stroke-width' : 2, //destroys tp-machine
                },
                axisX : graphAxisX( textColor ),
                axisY : graphAxisY( textColor ),
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
                doDrawToolline : doDrawToolline(),
				brightenGrid : 0.3,
                xMin,
                xMax,
                yMin,
                yMax,
            });
            graphFW__self.fw.gmedia$.addClass( 'ph-graph' );
            //==================================================
            // \\// calls low tier api
            //==================================================

        	setsGraphTpClasses(graphFW__self.fw);
        }
        //===================================================
        // \\// top tier painter which wraps low tier painter
        //===================================================


		function doDrawToolline()
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
        function graphAxisX( textColor )
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

        function graphAxisY( textColor )
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
        function showPHGraph( doShow )
        {
            if( doShow ) {
                graphFW__self.container$.removeClass( 'hidden' );
            } else {
                graphFW__self.container$.addClass( 'hidden' );
            } 
        }
        //==================================================
        // \\// shows/hides graph container
        // \\// calls top tier api
        //==============================================
    }
    //===================================================
    // \\// top tier painter which wraps low tier painter
    // \\// instantiable graph rack
    //**************************************************
    //**************************************************

    
    
    ///===========================================
    /// creates low tier global CSS
    ///===========================================
    function createsLowTireGlobalCSS()
    {
        if( GLOBAL_CSS_APPENDED ) return;
        GLOBAL_CSS_APPENDED = true;
        globalCss.update( `
            .chem-equiibr-graph-container {
                position: relative;
                width   : 95%;
                left    : 2%;
                top     : 10px;
                z-index : 1100;
                transition : top 1s ease-in-out;
            }

            .chem-equiibr-graph-container.hidden {
                top     : -200%;
            }

            .comment-inside-of-style-element___php-media,
            .ph-graph {
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

	///this thing is not dynamic (missed in design),
	///but, colorThreadArray is accessible for reset
	///dynamically,
	///
	//this is just an example how to reset colors dynamically
	//in model_upcreate():
	//stdMod.graphFW_lemma.colorThreadArray[0] = sDomF.getFixedColor( 'force' );
	function setColorThreadArray() {
		let colorThreadArray = [
			sDomF.getFixedColor( 'force' ),
			sDomF.getFixedColor( 'estimatedForce' ),
		];
		return colorThreadArray;
	}

	function setGraphContainerAttributes( digramParentDom$ ) {
		container$ = $$.div()
		.addClass( 'chem-equiibr-graph-container' )
		.to( $$.div().to( digramParentDom$ )
				.addClass( 'lost-diagram-parent' )
				//.css( 'position', 'absolute' )

				//:this data sets outer dimensions of the graph
				.css( 'width', '400px' )
				.css( 'height', '230px' )
				.css( 'top', '0' )
				.css( 'left', '0' )
				.css( 'z-index', '111111' )
		);
		//creates low tire api
		graph_dimX = 1000;  //innerWidth
		graph_dimY = 580;   //innerHeight
		return {container$, graph_dimX, graph_dimY}
	}

	function setGraphAxes(graphFW, legendText, legendX) {
		let n2c = sDomF.getFixedColor; //name to color
		
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
							' style="fill:'+n2c( 'force' ) + '; stroke:'+n2c( 'force' ) + ';"' +
							'>Actual</tspan>' +
							'<tspan> and </tspan>' +

							'<tspan class="tp-estimatedForce tofill tobold hover-width"' +
							//overrides tp machinery
							' style="fill:'+n2c( 'estimatedForce' ) + '; stroke:' + n2c( 'estimatedForce' ) + ';"' +
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
		return { textColor, textColor, axisYLegend, axisXLegend, };
	}

	/**
	 * Makes a particular graph plot highlight along with its 
	 * corresponding text.
	 */
	///this thing fails if not to synch it with mask,
	///the unmasked indices must be the same as here:
	function setsGraphTpClasses(fw) {
		fw.plotIx2plotSvg.forEach( (pl,pix) => {
			switch(pix) {
				case 0: pl && $$.$(pl).addClass( 'tp-force tostroke' ); break;
			}
		});
	}
}) ();