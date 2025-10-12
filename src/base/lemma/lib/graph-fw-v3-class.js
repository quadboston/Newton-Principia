// Contains two graph framework creators which
// are wraps over (possibly low level) fw creator in bsl
// The seacond one is more object oriented, lets create
// any number of instances,
//
// These creators, however dependent via createsLowTireGlobalCSS.

( function() {
    var {
        ns, sn, nsmethods, haz, haff, hafa, globalCss, $$,
        ssD, ssF, sDomN, sDomF, sData,
        stdMod, sconf, rg
    } = window.b$l.apptree({
        stdModExportList :
        {
            createsGraphFW_class,
        },
    });
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
        doSetColorThreadArray,
        setsGraphContainerAttributes,
        setsGraphAxes,
        plotLabels_2_plotsPars,
        
        //optional:
        doDrawToolline,
        graphAxisX,
        graphAxisY,
        setsGraphTpClasses,
    }){
        var graphFW__self = graphFW;
        var colorThreadArray = graphFW__self.colorThreadArray = doSetColorThreadArray();

        //===========================================
        // //\\ fills wrap-object
        //===========================================
        //exports painter
        graphFW__self.drawGraph_wrap = drawGraph_wrap;
        graphFW__self.showPHGraph = showPHGraph;
        ///creates fw-dom-container
        let {container$, graph_dimX, graph_dimY} =
            setsGraphContainerAttributes( digramParentDom$ );
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
            
            var { yColor, xColor, axisYLegend, axisXLegend, } = 
                ( haz( ssF, 'graph_axes8mask' ) || setsGraphAxes )();
            //first array must be enabled
            let graphArrayMask = haz( graphFW__self, 'graphArrayMask' );
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
                axisX : (graphAxisX && graphAxisX( xColor )) || {
                    'font-size'     : '18px',
                    fontShiftX      : -12, //in media scale
                    fontShiftY      : +14,
                    decimalDigits   : 3,
                    stroke          : xColor,
                    fill            : xColor,
                   'stroke-width'   : '0.2',
                },
                axisY : (graphAxisY && graphAxisY( yColor )) || {
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
                plotsPars : plotLabels_2_plotsPars( colorThreadArray ),
                doPaintGridOnlyOnce : false,
                doDrawToolline : (doDrawToolline && doDrawToolline()) || {
                    toollineStyle : {
                        stroke : colorThreadArray[2],
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
            graphFW__self.fw.gmedia$.addClass( 'ph-graph' );
            //==================================================
            // \\// calls low tier api
            //==================================================

            setsGraphTpClasses && setsGraphTpClasses();
        }
        //===================================================
        // \\// top tier painter which wraps low tier painter
        //===================================================


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
    
}) ();

