( function() {
    var {
        $$, nsmethods, globalCss, userOptions,
        sDomF,
        stdMod, sconf, rg
    } = window.b$l.apptree({
        stdModExportList :
        {
            createsGraphFW_lemma,
        },
    });
    return;

    function createsGraphFW_lemma({ digramParentDom$ }){
        let graphFW = {};
        let bonus = userOptions.showingBonusFeatures() ? 1 : 0;
        stdMod.createsGraphFW_class({
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
        });
        //first array mast be enabled
        graphFW.graphArrayMask = bonus ?
            [ 'force', 'sagitta', !'time', 'sample-force', 'body' ] :
            [ 'force', 'sagitta', 'time', !'sample-force', !'body' ];
        return graphFW;

        
        function doSetColorThreadArray()
        {
            let colorThreadArray = [
                sDomF.getFixedColor( 'force' ), //predefinedTopics.P, !!'makeOpacity1' ),
                sDomF.getFixedColor( 'proof' ), //sagitta
                sDomF.getFixedColor( 'time' ),  //time
                sDomF.getFixedColor( 'context' ),
                sDomF.getFixedColor( 'body' ),
            ];
            return colorThreadArray;
        }


        function setsGraphContainerAttributes( digramParentDom$ )
        {
            container$ = $$.div()
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
            graph_dimX = 1000;  //innerWidth
            graph_dimY = 580;   //innerHeight
            return {container$, graph_dimX, graph_dimY}
        }


        function setsGraphAxes()
        {
            //==================================================
            // //\\ calls api
            //==================================================
            //y-legend color; taken from first plot color:
            var yColor      = graphFW.colorThreadArray[ 0 ]; //equilibConst;

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
                    text    : bonus ?
                                'Force f, sagitta s, -1/r², and speed v per their max.' :
                                'Force f, sagitta s, per their max, time t.',
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
                    text    :  bonus ?
                                    'Distance from force center, r' : 'Path along orbit', 
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
                    fraqX : 0.2,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 'f',
                    fontShiftX : 0,
                    fontShiftY : 0,
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
                    fraqX : 0.4,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 's',
                    fontShiftX : 0,
                    fontShiftY : 0,
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
                    fraqX : 0.6,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 't',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[2],
                        //'fill' : colorThreadArray[0],
                    },
                    //overrides tp class
                    //plotStyle : {
                    //    'stroke-width'  : '5',   //optional
                    //},
                },
                {
                    fraqX : 0.8,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : '-1/r²',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[3],
                    },
                },
                {
                    fraqX : 0.9,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 'v',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[4],
                    },
                },
            ];
        }



        function setsGraphTpClasses()
        {
            //let m = graphFW.graphArrayMask;
            graphFW.fw.plotIx2plotSvg.forEach( (pl,pix) => {
                switch(pix) {
                    case 0: pl && $$.$(pl).addClass( 'tp-force tostroke' ); break;
                    case 1: pl && $$.$(pl).addClass( 'tp-_p_-sagitta tostroke' ); break;
                    case 2: pl && $$.$(pl).addClass( 'tp-time tostroke' ); break;
                    case 4: pl && $$.$(pl).addClass( 'tp-body tostroke' ); break;
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
                abscissaIxValue : stdMod.pos2qix(),
                numberMarks : true, 
            };
        }

        ///horizontal axis x pars, font, etc,
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

}) ();

