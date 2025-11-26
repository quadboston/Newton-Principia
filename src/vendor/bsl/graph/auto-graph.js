( function() {
    var {
        ns, sn, $$, nsmethods, haz, nssvg, nspaste, globalCss,
    } = window.b$l.nstree();
    nsmethods.createsAutoGraphFW = createsAutoGraphFW;
    return;


    //==================================================
    // //\\ creates pHGraph wrap around fw
    //==================================================
    function createsAutoGraphFW({
        arrayToPaint,
        domParent,
        plotsPars_manual,
    }){
        ZEBRA_COLORS = arrayToPaint[ 0 ].y.length;
        autoGraph__self = {};
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
        pix2color =
            ns.builds_zebraNColors_array({
                maxColors   : ZEBRA_COLORS*2,
                SATUR       : 100,
                LIGHT       : 30,
                zebraNumber : ZEBRA_COLORS,
                //monoColorHue, //optional, makes zebra via lightness, not via colors
        }).map( col => col.rgba_high );

        /*
        for manual setup
        pix2color = [
            equilibConst,
            dColor,
            inputColor,
            inputColor,
            outputColor,
        ];
        */
        //=================================================
        // \\// prepares params
        //=================================================


        var dimX = innerWidth;
        var dimY = innerHeight;
        createFramework_auxilary();


        paintsGraph({
            arrayToPaint,
            drawDecimalY    : true,
            drawDecimalX    : true,
            doSideAxes      : true,
            printAxisDigits : true,
        });
        return autoGraph__self;






        function createFramework_auxilary()
        {
            //exports
            autoGraph__self.paintGraph = paintsGraph;
            autoGraph__self.showPHGraph = showPHGraph;

            //===========================================
            // //\\ creates fw-dom-container
            //===========================================
            autoGraph__self.container$ = $$.div()
                .addClass( 'autograph-container' )
                .to( domParent )
                ;
            //===========================================
            // \\// creates fw-dom-container
            //===========================================


            //===========================================
            // //\\ creates raw fw
            //===========================================
            fw = autoGraph__self.fw = nsmethods.createsGraphFramework({
                parent : autoGraph__self.container$,
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
                .autograph-container {
                    position: relative;
                    width   : 65%;
                    left    : 30%;
                    top     : 0%;
                    z-index : 1100;
                    transition : top 1s ease-in-out;
                }

                .autograph-container.hidden {
                    top     : -200%;
                }

                /* php media */
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
            //===========================================
            // \\// creates fw global CSS
            //===========================================
        }


        //==================================================
        // //\\ run-time raw graph wrapper
        //==================================================
        function paintsGraph({
            arrayToPaint,
            yMin,
            yMax,
            xMin,
            xMax,
            drawDecimalY,
            drawDecimalX,
            doSideAxes,
            printAxisDigits,
        }){
            //==================================================
            // //\\ fills api content
            //==================================================
            var style = {
               'stroke-width' : 4,
            }
            //==================================================
            // \\// fills api content
            //==================================================

            //==================================================
            // //\\ calls api
            //==================================================

            if( printAxisDigits ) {

                //y-legend color; taken from first plot color:
                var yColor      = pix2color[ 0 ];

                //axis x and legend x color:
                //manually picked color, not from plot,
                var xColor      = pix2color[ 0 ];

                var axisYLegend =
                [
                    {
                        text    : 'y',
                        x       : 40,
                        y       : 25,
                        style   : {
                                    'font-size' : '20',
                                    //'stroke' : equilibConst,
                                    //'fill'   : equilibConst,
                        },
                    },

                    /*
                    {
                        text    : 'y',
                        x       : 250,
                        y       : 40,
                        style   : {
                                    'font-size' : '30',
                                    //'stroke' : 'black',
                                    //'fill'   : 'black',
                        },
                    },
                    */

                ];
                var axisXLegend =
                [

                    {
                        text    : 'x',
                        x       : -700,
                        y       : 25,
                        style   : {
                                    'font-size' : '30',
                                    //'stroke' : xColor,
                                    //'fill' : xColor,
                        },
                    },
                    /*
                    {
                        text    : captionUnitsForX,
                        x       : 50,
                        y       : -20,
                        style   : {
                                    'font-size' : '23',
                                    //'stroke' : xColor,
                                    //'fill' : xColor,
                        },
                    },
                    */
                ];
            }

            fw.drawGraph({
                pix2values : arrayToPaint,
                pix2color,
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
                    //stroke          : xColor,
                    //fill            : xColor,
                   'stroke-width'   : '0.2',
                },
                axisY : {
                    'font-size'     : '20px',
                    fontShiftX      : -45, //in media scale
                    fontShiftY      : +5,
                    decimalDigits   : 1,
                    //stroke          : yColor,
                    //fill            : yColor,
                   'stroke-width'   : '1',
                },
                drawDecimalY,
                drawDecimalX,
                doSideAxes,
                printAxisDigits,
                axisYLegend,
                axisXLegend,
                plotsCount_overrider : 1000,
                plotsPars : nspaste(
                    plotLabels_2_plotsPars( arrayToPaint ),
                    //recall: pasting "undefined" changes nothing:
                    plotsPars_manual,
                )
            });
            fw.gmedia$.addClass( 'graph-box-svg' );
            //==================================================
            // \\// calls api
            //==================================================
        }
        //==================================================
        // \\// run-time raw graph wrapper
        //==================================================


        //==================================================
        // //\\ shows/hides graph container
        //==================================================
        function showPHGraph( doShow )
        {
            if( doShow ) {
                autoGraph__self.container$.removeClass( 'hidden' );
            } else {
                autoGraph__self.container$.addClass( 'hidden' );
            }
        }
        //==================================================
        // \\// shows/hides graph container
        //==================================================

    }
    //==================================================
    // \\// creates pHGraph wrap around fw
    //==================================================





    function plotLabels_2_plotsPars( arrayToPaint )
    {
        return arrayToPaint[ 0 ].y.map( (ordinate,oix) => (
            {
                fraqX : 0.01,
                pcaption : 'fun-' + oix,
                fontShiftX : 20,
                fontShiftY : -20,
                style : {
                    'font-size' : '20px',
                    //'stroke'  : equilibConst,
                    //'fill' : equilibConst,
                },
                /*
                plotStyle : {
                    'stroke-width'  : '4',   //optional
                },
                */
            })
        );
    }

}) ();

