( function() {
    const {
        $$, nsmethods, globalCss, userOptions,
        ssF, sDomF,
        amode, stdMod, sconf, rg
    } = window.b$l.apptree({
        ssFExportList : 
        {
            createsGraph_FW_lemma,
        },
    });
    return;


    function createsGraph_FW_lemma({ digramParentDom$ }){
        const graphFW = {};
        stdMod.createsGraphFW_class({
            graphFW,
            digramParentDom$,
            doSetColorThreadArray,
            setsGraphContainerAttributes,
            setsGraphAxes,
            plotLabels_2_plotsPars,
            setsGraphTpClasses,
            doDrawToolline,
            graphAxisX,
            graphAxisY,
            setsGraphTpClasses,
    });
        return graphFW;


    function doSetColorThreadArray()
    {
        //===========================================
        // //\\ prepares color ThreadArray
        //===========================================
        let colorThreadArray = [
            sDomF.getFixedColor( 'force' ),
            sDomF.getFixedColor( 'context' ),
            sDomF.getFixedColor( 'body' ),
        ];
        return colorThreadArray;
        //===========================================
        // \\// prepares color ThreadArray
        //===========================================
    }

    function setsGraphContainerAttributes( digramParentDom$ )
    {
            const container$ = $$.div()
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
        ///creates low tire api

            //does thicker? curves, but needs work on fonts
            //sData.graph_dimX = 500; //1000;  //innerWidth
            //sData.graph_dimY = 250; //580;   //innerHeight

            graph_dimX = 1000;  //innerWidth
            graph_dimY = 580;   //innerHeight
            graphFW.container$ = container$;
            return {container$, graph_dimX, graph_dimY};
    }

    function setsGraphAxes()
    {
        //==================================================
        // //\\ calls api
        //==================================================
        //y-legend color; taken from first plot color:
        const yColor = graphFW.colorThreadArray[ 0 ];

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
                    text    : 'Distance, r',
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
                fontShiftX : 0,
                fontShiftY : 15,
                style : {
                    'font-size' : '40px',
                    'stroke'  : colorThreadArray[0],
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

        ///this thing fails if not to synch it with mask,
        ///the unmasked indices must be the same as here:
    function setsGraphTpClasses()
    {
            graphFW.fw.plotIx2plotSvg.forEach( (pl,pix) => {
                switch(pix) {
                    case 0: pl && $$.$( pl ).addClass( 'tp-force tostroke' ); break;
                    case 2: pl && $$.$( pl ).addClass( 'tp-body tostroke' ); break;
                }
            });
    }

    function doDrawToolline()
    {
        return {
            toollineStyle : {
                    stroke : graphFW.colorThreadArray[2],
                'stroke-width' : 3,
            },
            abscissaIxValue : stdMod.P2gix(),
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
    }
})();

