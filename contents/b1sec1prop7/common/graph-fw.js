( function() {
    var {
        ns, sn, nsmethods, haz, globalCss, $$,
        ssD, sDomN, sDomF,
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
        //==============================================
        // //\\ calls top tire api
        //==============================================
        //creates graph framework
        var gfw = createsGraphFW_raw({
            colorThreadArray : [
                sDomF.getFixedColor( 'force' ), //predefinedTopics.P, !!'makeOpacity1' ),
                sDomF.getFixedColor( 'context' ), //predefinedTopics.P, !!'makeOpacity1' ),
                sDomF.getFixedColor( 'body' ), //predefinedTopics.P, !!'makeOpacity1' ),
            ],
            domParent : $$.div().to( digramParentDom$ )
                        .addClass( 'lost-diagram-parent' )
                        //.css( 'position', 'absolute' )

                        //:this data sets outer dimensions of the graph
                        //.css( 'width', '500px' )
                        //.css( 'height', '300px' )
                        .css( 'width', '400px' )
                        .css( 'height', '230px' )

                        .css( 'top', '0' )
                        .css( 'left', '0' )
                        .css( 'z-index', '111111' )
                        ()
            ,
            captionForY : 'Force f, 1/r², and speed v synched at max of |f|',
            captionForX : 'Distance, r/R',
            axisYLegendStyle : {
                captionForAxisY : 'Force',
                fontSize : 28,
            },
            captionUnitsForX : '',
            plotLabels_2_plotsPars,
        });
        stdMod.graphFW = { gfw, doPaint };
        return;



        function doPaint()
        {
            //paints graph
            gfw.doPaint({
                graphArray      : stdMod.graphArray,
                drawDecimalY    : true,
                drawDecimalX    : true,
                doSideAxes      : true,
                printAxisDigits : true,
                //yMin            : -20,
                //yMax            : +20,
                //xMin            : 0,
                //xMax            : 1,
                //doTruncateOutOfRangeY : true,
            })
            $$.$( gfw.fw.plotIx2plotSvg[0] ).addClass( 'tp-force tostroke' );
            $$.$( gfw.fw.plotIx2plotSvg[2] ).addClass( 'tp-body tostroke' );
        }



        function plotLabels_2_plotsPars( colorThreadArray )
        {

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
                        'stroke'  : colorThreadArray[0],
                        //'fill' : colorThreadArray[0],
                    },
                    /*
                    plotStyle : {
                        'stroke-width'  : '8',   //optional
                    },
                    */
                },
                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : '1/r²',
                    fontShiftX : 25,
                    fontShiftY : 15,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[1],
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
                        'stroke'  : colorThreadArray[2],
                    },
                },
            ];
        }
        //==============================================
        // \\// calls top tire api
        //==============================================

    }




    ///==============================================
    /// top tire api
    ///==============================================
    function createsGraphFW_raw({
        domParent,
        captionForY,
        captionForX,
        captionUnitsForX,
        axisYLegendStyle,
        plotLabels_2_plotsPars,

        //:alternatives
        colorThreadArray,
        ZEBRA_COLORS,

    }){
        axisYLegendStyle = axisYLegendStyle || {};
        var { captionForAxisY, fontSize, } = axisYLegendStyle;
        captionForAxisY = captionForAxisY || '';
        fontSize = fontSize || 20;

        graphFW__self = {};
        var fw = null;

        //=================================================
        // //\\ configures params
        //=================================================
        var innerWidth      = 1000;
        var innerHeight     = 580;
        //=================================================
        // \\// configures params
        //=================================================

        //=================================================
        // //\\ prepares params
        //=================================================
        if( !colorThreadArray ) {
            ZEBRA_COLORS        = ZEBRA_COLORS || 9;
            colorThreadArray =
                ns.builds_zebraNColors_array({
                    maxColors   : ZEBRA_COLORS*2,
                    SATUR       : 100,
                    LIGHT       : 30,
                    zebraNumber : ZEBRA_COLORS,
                    //monoColorHue, //optional, makes zebra via lightness, not via colors
            }).map( col => col.rgba_high );
        }
        //colorThreadArray[ 0 ] = 'rgba( 155, 155, 155, 0.5 )';
        /*
        colorThreadArray = [
            equilibConst,
            dColor,
            inputColor,
            inputColor,
            outputColor,
        ];
        */
        var plotsPars = plotLabels_2_plotsPars( colorThreadArray );
        //=================================================
        // \\// prepares params
        //=================================================


        var dimX = innerWidth;
        var dimY = innerHeight;
        createFramework_auxilary();
        return graphFW__self;






        function createFramework_auxilary()
        {
            //exports painter
            graphFW__self.doPaint = doPaint;
            graphFW__self.showPHGraph = showPHGraph;

            //===========================================
            // //\\ creates fw-dom-container
            //===========================================
            graphFW__self.container$ = $$.div()
                .addClass( 'chem-equiibr-graph-container' )
                .to( domParent )
                ;
            //===========================================
            // \\// creates fw-dom-container
            //===========================================


            //===========================================
            // //\\ creates low tire api
            //===========================================
            fw = graphFW__self.fw = nsmethods.createsGraphFramework({
                parent : graphFW__self.container$,
                dimX,
                dimY,
            });
            //===========================================
            // \\// creates low tire api
            //===========================================


            //===========================================
            // //\\ creates low tire global CSS
            //===========================================
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
            //===========================================
            // \\// creates low tire global CSS
            //===========================================
        }


        //===================================================
        // //\\ top tire painter which wraps low tire painter
        //===================================================
        function doPaint({
            graphArray,
            yMin,
            yMax,
            xMin,
            xMax,
            drawDecimalY,
            drawDecimalX,
            doSideAxes,
            printAxisDigits,
            doTruncateOutOfRangeY,
        }){
            //==================================================
            // //\\ fills api content
            //==================================================
            var style = {
               //'stroke-width' : 4,
            }
            //==================================================
            // \\// fills api content
            //==================================================

            //==================================================
            // //\\ calls api
            //==================================================
            if( printAxisDigits ) {

                //y-legend color; taken from first plot color:
                var yColor      = colorThreadArray[ 0 ]; //equilibConst;

                //axis x and legend x color:
                //manually picked color, not from plot,
                var xColor      = 'rgba(0,0,0,1)'; //'rgba(0,0,255,1)';

                var axisYLegend =
                [
                    {
                        text    : captionForAxisY,
                        x       : 40,
                        y       : 25,
                        style   : {
                                    'font-size' : fontSize + 'px',
                                    'stroke' : yColor,
                                    'fill'   : yColor,
                        },
                    },

                    {
                        text    : captionForY,
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
                        text    : captionForX,
                        x       : -700,
                        y       : 25,
                        style   : {
                                    'font-size' : '30',
                                    'stroke' : xColor,
                                    'fill' : xColor,
                        },
                    },
                    {
                        text    : captionUnitsForX,
                        x       : 50,
                        y       : -20,
                        style   : {
                                    'font-size' : '23',
                                    'stroke' : xColor,
                                    'fill' : xColor,
                        },
                    },
                ];
            }

            //==================================================
            // //\\ calls low tire api
            //==================================================
            fw.drawGraph({
                graphArray,
                colorThreadArray,
                style,
                xMin,
                xMax,
                yMin,
                yMax,
                axisX : {
                    'font-size'     : '18px',
                    fontShiftX      : -12, //in media scale
                    fontShiftY      : +14,
                    decimalDigits   : 3,
                    stroke          : xColor,
                    fill            : xColor,
                   'stroke-width'   : '0.2',
                },
                axisY : {
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
                doSideAxes,
                printAxisDigits,
                axisYLegend,
                axisXLegend,
                plotsCount_overrider : 1000,
                //plotsPars : plotLabels_2_plotsPars( colorThreadArray ),
                plotsPars,
                doTruncateOutOfRangeY,
                doPaintGridOnlyOnce : false,
            });
            fw.gmedia$.addClass( 'ph-graph' );
            //==================================================
            // \\// calls low tire api
            //==================================================
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
        //==================================================
    }


}) ();

