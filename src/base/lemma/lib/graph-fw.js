( function() {
    var {
        ns, sn, nsmethods, haz, haff, hafa, globalCss, $$,
        ssD, sDomN, sDomF, sData,
        stdMod, sconf, rg
    } = window.b$l.apptree({
        stdModExportList :
        {
            createsGraphFW,
        },
    });
    return;










    ///===========================================
    /// paints diagrams
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
                   //'stroke-width' : 4,
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






    ///===========================================
    /// creates low tire global CSS
    ///===========================================
    function createsLowTireGlobalCSS()
    {
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

            /* php media */
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

