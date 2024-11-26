// Contains two graph framework creators which
// are wraps over (possibly low level) fw creator in bsl
// The seacond one is more object oriented, lets create
// any number of instances,
//
// These creators, however dependent via createsLowTireGlobalCSS.

( function() {
    var {
        ns, sn, nsmethods, haz, haff, hafa, globalCss, $$,
        ssD, sDomN, sDomF, sData,
        stdMod, sconf, rg
    } = window.b$l.apptree({
        stdModExportList :
        {
            createsGraphFW,
            createsGraphFW_class,
        },
    });
    var GLOBAL_CSS_APPENDED = false;
    return;










    ///===========================================
    /// paints diagrams
    /// this framework API comprises two exports:
    ///     stdMod.createsGraphFW and
    ///     stdMod.graphFW,
    /// and possibly other "hidden" api-elements:
    /*  in stdMod:
        {
            doSetColorThreadArray,
            setsGraphContainerAttributes,
            setsGraphAxes,
            plotLabels_2_plotsPars,
            setsGraphTpClasses,
            doDrawToolline,
            graphAxisX,
            graphAxisY,
        }
    */
    /// the first creates framework rack,
    ///     stdMod.graphFW,
    /// the second is that rack which allows
    /// application to dynamically modify graphs,
    /// iside framework rack, there is
    /// third important api-call, this is
    ///     stdMod.graphFW.drawGraph_wrap(),
    /// an actual graph redrawer,
    ///
    /// this fw, based on a raw fw
    /// nsmethods.createsGraphFramework(),
    /// which is stored in stdMod.graphFW.fw
    /// which contains a raw graph drawer,
    /// stdMod.graphFW.fw.drawGraph
    ///===========================================
    function createsGraphFW( digramParentDom$ )
    {
        var graphFW__self = stdMod.graphFW = {};
        var colorThreadArray = haff( stdMod, 'doSetColorThreadArray' );

        //===========================================
        // //\\ fills wrap-object
        //===========================================
        //exports painter
        graphFW__self.drawGraph_wrap = drawGraph_wrap;
        graphFW__self.showPHGraph = showPHGraph;
        ///creates fw-dom-container
        stdMod.setsGraphContainerAttributes( digramParentDom$ );
        ///creates low tire api
        graphFW__self.fw = nsmethods.createsGraphFramework({
            parent : graphFW__self.container$,
            dimX : sData.graph_dimX,
            dimY : sData.graph_dimY,
        });
        //===========================================
        // \\// fills wrap-object
        //===========================================

        createsLowTireGlobalCSS();
        return;









        //===================================================
        // //\\ top tire painter which wraps low tire painter
        //===================================================
        function drawGraph_wrap()
        {
            var graphArray = stdMod.graphArray;
            var { yColor, xColor, axisYLegend, axisXLegend, } = stdMod.setsGraphAxes();
            //==================================================
            // //\\ calls api
            // //\\ calls low tire api
            //==================================================
            graphFW__self.fw.drawGraph({
                graphArray,
                colorThreadArray,
                style : {
                   //'stroke-width' : 2, //destroys tp-machine
                },
                axisX : hafa( stdMod, 'graphAxisX' )( xColor ) || {
                    'font-size'     : '18px',
                    fontShiftX      : -12, //in media scale
                    fontShiftY      : +14,
                    decimalDigits   : 3,
                    stroke          : xColor,
                    fill            : xColor,
                   'stroke-width'   : '0.2',
                },
                axisY : hafa( stdMod, 'graphAxisY' )( yColor ) || {
                    'font-size'     : '20px',
                    fontShiftX      : -45, //in media scale
                    fontShiftY      : +5,
                    decimalDigits   : 1,
                    stroke          : yColor,
                    fill            : yColor,
                   'stroke-width'   : '1',
                },
                drawDecimalY : true,
                drawDecimalX : true,
                doSideAxes : true,
                printAxisDigits : true,
                axisYLegend,
                axisXLegend,
                plotsCount_overrider : 1000,
                plotsPars : stdMod.plotLabels_2_plotsPars( colorThreadArray ),
                doPaintGridOnlyOnce : false,
                doDrawToolline : haff( stdMod, 'doDrawToolline' ) || {
                    toollineStyle : {
                        stroke : colorThreadArray[2],
                        'stroke-width' : 3,
                    },
                    abscissaIxValue : stdMod.pos2qix(),
                    numberMarks : true, 
                },
                brightenGrid : 0.3,
            });
            graphFW__self.fw.gmedia$.addClass( 'ph-graph' );
            //==================================================
            // \\// calls low tire api
            //==================================================

            haff( stdMod, 'setsGraphTpClasses' );
        }
        //===================================================
        // \\// top tire painter which wraps low tire painter
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
        // \\// calls top tire api
        //==============================================
    }

    
    
    
    
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
        ///creates low tire api
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
        // //\\ top tire painter which wraps low tire painter
        //===================================================
        function drawGraph_wrap({
            drawDecimalY,
            drawDecimalX,
            printAxisXDigits,
            printAxisYDigits,
        }){
            drawDecimalY = typeof drawDecimalY === 'undefined' ? true : drawDecimalY;
            drawDecimalX = typeof drawDecimalX === 'undefined' ? true : drawDecimalX;
            
            //first array mast be enabled
            let graphArrayMask = haz( graphFW__self, 'graphArrayMask' );

            var { yColor, xColor, axisYLegend, axisXLegend, } = setsGraphAxes();
            //==================================================
            // //\\ calls api
            // //\\ calls low tire api
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
                    abscissaIxValue : stdMod.pos2qix(),
                    numberMarks : true, 
                },
                brightenGrid : 0.3,
            });
            graphFW__self.fw.gmedia$.addClass( 'ph-graph' );
            //==================================================
            // \\// calls low tire api
            //==================================================

            setsGraphTpClasses && setsGraphTpClasses();
        }
        //===================================================
        // \\// top tire painter which wraps low tire painter
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
        // \\// calls top tire api
        //==============================================
    }
    //===================================================
    // \\// top tire painter which wraps low tire painter
    // \\// instantiable graph rack
    //**************************************************
    //**************************************************

    
    
    ///===========================================
    /// creates low tire global CSS
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

