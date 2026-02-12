( function() {
    var { ns, sn, $$, nsmethods, haz, globalCss, sDomF, sData, stdMod, }
        = window.b$l.apptree({ stdModExportList :
        {
            doSetColorThreadArray,
            setsGraphContainerAttributes,
            setsGraphAxes,
            plotLabels_2_plotsPars,
            setsGraphTpClasses,
            doDrawToolline,
            graphAxisX,
            graphAxisY,
        },
    });
    return;


    function doSetColorThreadArray()
    {
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
        sData.colorThreadArray = [
            sDomF.getFixedColor( 'shadow' ), //topicColors_elected.P, !!'makeOpacity1' ),
            sDomF.getFixedColor( 'force' ), //topicColors_elected.P, !!'makeOpacity1' ),
            sDomF.getFixedColor( 'body' ), //topicColors_elected.P, !!'makeOpacity1' ),
        ];
        return sData.colorThreadArray;
        //===========================================
        // \\// prepares color ThreadArray
        //===========================================
    }


    function setsGraphContainerAttributes( digramParentDom$ )
    {
        stdMod.graphFW.container$ = $$.div()
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
            )
            ;
        ///creates low tire api
        sData.graph_dimX = 1000;  //innerWidth
        sData.graph_dimY = 580;   //innerHeight
    }


    function setsGraphAxes()
    {
        //==================================================
        // //\\ calls api
        //==================================================
        //y-legend color; taken from first plot color:
        var yColor      = sData.colorThreadArray[ 0 ]; //equilibConst;

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
                text    : 'Distance, ln(r)',
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



    function plotLabels_2_plotsPars( colorThreadArray )
    {

        ///make sure, the number of plot labels is equal to plot functions y(x)
        return [
            {
                fraqX : 0.01,
                //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                pcaption : '1/r²',
                fontShiftX : 185,
                fontShiftY : 15,
                style : {
                    'font-size' : '40px',
                    'stroke'  : colorThreadArray[0],
                },
            },
            {
                fraqX : 0.01,
                //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                pcaption : 'f',
                fontShiftX : 0,
                fontShiftY : 15,
                style : {
                    'font-size' : '40px',
                    'stroke'  : colorThreadArray[1],
                    //'fill' : colorThreadArray[0],
                },
                //overrides tp class
                //plotStyle : {
                //    'stroke-width'  : '5',   //optional
                //},
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



    function setsGraphTpClasses()
    {
        $$.$( stdMod.graphFW.fw.plotIx2plotSvg[1] ).addClass( 'tp-force tostroke' );
        $$.$( stdMod.graphFW.fw.plotIx2plotSvg[2] ).addClass( 'tp-body tostroke' );
    }



    function doDrawToolline()
    {
        return {
            toollineStyle : {
                stroke : sData.colorThreadArray[1],
                'stroke-width' : 3,
            },
            abscissaIxValue : stdMod.posFromPointPToQIndex(),
            numberMarks : true, 
        };
    }


    function graphAxisX( xColor )
    {
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


    function graphAxisY( yColor )
    {
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

}) ();

