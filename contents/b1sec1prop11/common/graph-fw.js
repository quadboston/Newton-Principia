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
        var graphFW__self = stdMod.graphFW = {};


        //===========================================
        // //\\ prepares color ThreadArray
        //===========================================
        /*
        //:alternatives: raw colorThreadArray or from ZEBRA_COLORS
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
        colorThreadArray = [ equilibConst, 'rgba( 155, 155, 155, 0.5 )', ];
        */
        var colorThreadArray = [
            sDomF.getFixedColor( 'force' ), //predefinedTopics.P, !!'makeOpacity1' ),
            sDomF.getFixedColor( 'context' ), //predefinedTopics.P, !!'makeOpacity1' ),
            sDomF.getFixedColor( 'body' ), //predefinedTopics.P, !!'makeOpacity1' ),
        ];
        //===========================================
        // \\// prepares color ThreadArray
        //===========================================



        //===========================================
        // //\\ fills wrap-object
        //===========================================
        //exports painter
        graphFW__self.drawGraph_wrap = drawGraph_wrap;
        graphFW__self.showPHGraph = showPHGraph;
        ///creates fw-dom-container
        graphFW__self.container$ = $$.div()
            .addClass( 'chem-equiibr-graph-container' )
            .to(
                $$.div().to( digramParentDom$ )
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
            )
            ;
        ///creates low tire api
        graphFW__self.fw = nsmethods.createsGraphFramework({
            parent : graphFW__self.container$,
            dimX : 1000, //innerWidth
            dimY : 580,  //innerHeight
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
           var graphArray      = stdMod.graphArray;

            //==================================================
            // //\\ calls api
            //==================================================
            //y-legend color; taken from first plot color:
            var yColor      = colorThreadArray[ 0 ]; //equilibConst;
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
                    text    : 'Force f, 1/r², and speed v synched at max of |f|',
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
                    text    : 'Distance, r/R',
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

            //==================================================
            // //\\ calls low tire api
            //==================================================
            graphFW__self.fw.drawGraph({
                graphArray,
                colorThreadArray,
                style : {
                   //'stroke-width' : 4,
                },
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
                drawDecimalY : true,
                drawDecimalX : true,
                doSideAxes : true,
                printAxisDigits : true,
                axisYLegend,
                axisXLegend,
                plotsCount_overrider : 1000,
                plotsPars : plotLabels_2_plotsPars( colorThreadArray ),
                doPaintGridOnlyOnce : false,

                doDrawToolline : {
                    toollineStyle : {
                        stroke : colorThreadArray[2],
                        'stroke-width' : 4,
                    },
                    abscissaIxValue : (graphArray.length-1) *
                        stdMod.pos2t( rg.P.pos ) / Math.PI / 2, //=angle Ix,
                    numberMarks : true, 
                },
            });
            graphFW__self.fw.gmedia$.addClass( 'ph-graph' );
            //paints graph
            //==================================================
            // \\// calls low tire api
            //==================================================
            $$.$( graphFW__self.fw.plotIx2plotSvg[0] ).addClass( 'tp-force tostroke' );
            $$.$( graphFW__self.fw.plotIx2plotSvg[2] ).addClass( 'tp-body tostroke' );
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

