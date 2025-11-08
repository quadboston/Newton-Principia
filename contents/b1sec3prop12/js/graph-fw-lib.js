( function() {
    const { ns, sn, $$, nsmethods, haz, globalCss, sDomF, sData, amode, stdMod, }
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
        /// prepares color ThreadArray
        sData.colorThreadArray = [
            sDomF.getFixedColor( 'shadow' ), //predefinedTopics.P, !!'makeOpacity1' ),
            sDomF.getFixedColor( 'force' ), //predefinedTopics.P, !!'makeOpacity1' ),
        ];
        return sData.colorThreadArray;
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

        let yCaption = 'Force ln(f)';
        if( amode.logic_phase === 'proof' ){
            yCaption += ', ln( fQR ).';
        }        
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
                text    : yCaption,
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
                pcaption : 'f',
                fontShiftX : 185,
                fontShiftY : 15,
                style : {
                    'font-size' : '40px',
                    'stroke'  : colorThreadArray[0],
                },
            },
            {
                fraqX : 0.01,
                pcaption : 'fQR',
                fontShiftX : 0,
                fontShiftY : 15,
                style : {
                    'font-size' : '40px',
                    'stroke'  : colorThreadArray[1],
                },
            },
        ];
    }

    function setsGraphTpClasses()
    {
        const mask = stdMod.graphFW.graphArrayMask; 
        mask[0] && $$.$( stdMod.graphFW.fw.plotIx2plotSvg[0] ).addClass( 'tp-force tostroke' );
        mask[1] && $$.$( stdMod.graphFW.fw.plotIx2plotSvg[1] ).addClass( 'tp-f_q_r tostroke' );
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
})();