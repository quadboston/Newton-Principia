( function() {
    var {
        ns, sn, nsmethods, haz, globalCss, $$,
        sconf, rg, ssD, sDomN,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            createsPHGraphFW,
        },
    });
    return;









    //==================================================
    // //\\ creates pHGraph wrap around fw
    //      ,establishes "placeholder" for further work
    //      with graphs diagram
    //==================================================
    function createsPHGraphFW()
    {
        pHGraph_self = rg.pHGraph = {};
        var fw = null;

        //=================================================
        // //\\ configures params
        //=================================================
        var innerWidth      = 1000;
        var innerHeight     = 500;
        //=================================================
        // \\// configures params
        //=================================================


        //=================================================
        // //\\ prepares params
        //=================================================
        colorThreadArray = ssD.zebraCols.multicolor
            .map( col => col.rgba_high );
        //=================================================
        // \\// prepares params
        //=================================================

        var dimX = innerWidth;
        var dimY = innerHeight;
        createFramework_auxilary();
        return pHGraph_self;







        function createFramework_auxilary()
        {
            //exports
            pHGraph_self.callPHGraph = callPHGraph;

            //===========================================
            // //\\ creates fw-dom-container
            //===========================================
            pHGraph_self.container$ = $$.div()
                .addClass( 'ph-graph-container' )
                .to( stdMod.simScene )
                ;
            //===========================================
            // \\// creates fw-dom-container
            //===========================================


            //===========================================
            // //\\ creates raw fw
            //===========================================
            fw = pHGraph_self.fw = nsmethods.createsGraphFramework({
                parent : pHGraph_self.container$,
                dimX,
                dimY,
            });
            //===========================================
            // \\// creates raw fw
            //===========================================


            //===========================================
            // //\\ creates fw global CSS
            //===========================================
            globalCss.update( `
                .ph-graph-container {
                    position: absolute;
                    width   : 85%;
                    left    : 10%;
                    top     : 0%;
                    z-index : 1100;
                    transition : top 1s ease-in-out;
                }

                /* php media */
                .ph-graph {
                    position: absolute;
                    border  : 2px solid black;
                    width   : 100%;
                    left    : 0%;
                    top     : 0%;
                    background-color : rgba( 255,255,255,1 );
                },
                'ph-graph-style'
            `);
            //===========================================
            // \\// creates fw global CSS
            //===========================================
        }


        //==================================================
        // //\\ run-time raw graph wrapper
        //==================================================
        function callPHGraph({
        }){
             var graphArray         = stdMod.graphArray;
             var doSideAxes         = true;
             var printAxisDigits    = true;
             var drawDecimalY       = true;
             var drawDecimalX       = true;


            //==================================================
            // //\\ fills api content
            //      there is no variance in app-callers, so
            //      decorations are set right below
            //==================================================
            var style = {
               'stroke-width'  : '3',
            };
            //==================================================
            // \\// fills api content
            //==================================================

            //==================================================
            // //\\ calls api
            //==================================================

            if( printAxisDigits ) {

                var rPars       = rg.reactionParams;
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

            fw.drawGraph({
                graphArray,
                colorThreadArray,
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
            fw.gmedia$.addClass( 'ph-graph' );
            */
            fw.gmedia$.addClass( 'ph-graph' );
            fw.gmedia$.css( 'background-color', 'rgba(255,255,255,0.8' );
            //==================================================
            // \\// calls api
            //==================================================
        }
        //==================================================
        // \\// run-time raw graph wrapper
        //==================================================
    }
    //==================================================
    // \\// creates pHGraph wrap around fw
    //==================================================

    /*
    //start here:
    //todo: need this?
    //      add expand graph?
    //==================================================
    // //\\ shows/hides graph container
    //==================================================
    function showPHGraph( doShow )
    {
        if( doShow ) {
            pHGraph_self.container$.removeClass( 'hidden' );
        } else {
            pHGraph_self.container$.addClass( 'hidden' );
        } 
    }
    //==================================================
    // \\// shows/hides graph container
    //==================================================
    */

}) ();

