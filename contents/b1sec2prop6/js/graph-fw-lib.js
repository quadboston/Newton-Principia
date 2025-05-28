( function() {
    var {
        $$, nsmethods, globalCss, userOptions,
        sDomF, sData,
        amode, stdMod, sconf, rg
    } = window.b$l.apptree({
        stdModExportList :
        {
            createsGraph_FW_lemma,
        },
    });
    return;

    function createsGraph_FW_lemma({ digramParentDom$ }){
        const graphFW = {};
        const BONUS = userOptions.showingBonusFeatures();
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

        ///this thing is not dynamic (missed in design),
        ///but, colorThreadArray is accessible for reset
        ///dynamically,
        ///
        //this is just an example how to reset colors dynamically
        //in model_upcreate():
        //stdMod.graphFW_lemma.colorThreadArray[0] =
        //    ADDENDUM ? 'green' : sDomF.getFixedColor( 'force' );
        function doSetColorThreadArray()
        {
            let colorThreadArray = [
                sDomF.getFixedColor( 'force' ),
                sDomF.getFixedColor( 'displacement' ),
                sDomF.getFixedColor( 'body' ),
                sDomF.getFixedColor( 'sagitta' ),
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
            //creates low tire api
            graph_dimX = 1000;  //innerWidth
            graph_dimY = 580;   //innerHeight
            return {container$, graph_dimX, graph_dimY}
        }

        function setsGraphAxes()
        {
            const ADDENDUM = amode.aspect === 'addendum';
            let n2c = sDomF.getFixedColor; //name to color
            
            //==================================================
            // //\\ calls api
            //==================================================
            //y-legend color; taken from first plot color:
            var yColor = graphFW.colorThreadArray[ 0 ];

            //axis x and legend x color:
            //manually picked color, not from plot,
            var xColor = sData.GRAPH_PATH ? n2c( 'orbit' ) : n2c( 'force' );
            var axisYLegend =
            [
                {
                    //"hover-width" decreases gigantict bold
                    //together, tobold hover-width and tostroke can be redundant
                    text    :   '<text><tspan class="tp-force tofill tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'force' ) + '; stroke:'+n2c( 'force' ) + ';"' +
                                '>Force</tspan></text>',
                    x       : 40,
                    y       : 25,
                    style   : {
                                'font-size' : 28 + 'px',
                                //'stroke' : yColor,
                                //'fill'   : yColor,
                    },
                },

                {
                    text    : BONUS ?
                                'Force f, sagitta, -1/r², per their max.'
                                
                                :

                                '<text><tspan class="tp-force tofill tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'force' ) + '; stroke:'+n2c( 'force' ) + ';"' +
                                '>Actual</tspan>' +
                                '<tspan> and </tspan>' +

                                '<tspan class="tp-_p_-sagitta tofill tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'sagitta' ) + '; stroke:'+n2c( 'sagitta' ) + ';"' +
                                '>Estimated' +
                                '</tspan>' +

                                '<tspan> forces (per their max)</tspan>' +
                                '</text>',
                    x       : 250,
                    y       : 40,
                    style   : {
                                'font-size' : '30',
                                //'stroke' : 'black',
                                //'fill'   : 'black',
                    },
                },

            ];
            var axisXLegend =
            [
                {
                    text    :  sData.GRAPH_PATH ?
                               'Distance along arc' : 'Distance from force center, r', 
                    x       : BONUS ? -700 : -520,
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
            return [
                {
                    fraqX : 0.2,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    //pcaption : 'Actual force',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[0],
                    },
                    //overrides tp class
                    //plotStyle : {
                    //    'stroke-width'  : '5',   //optional
                    //},
                },
                {
                    fraqX : 0.6,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    //pcaption : 'Displacement/area^2',
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
                    fraqX : 0.9,
                    pcaption : 'v',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[4],
                    },
                },
  
  
                {
                    //sagitta
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
  
                {
                    //sample force
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
  
            ];
        }

        ///this thing fails if not to synch it with mask,
        ///the unmasked indices must be the same as here:
        function setsGraphTpClasses()
        {
            //let m = graphFW.graphArrayMask;
            graphFW.fw.plotIx2plotSvg.forEach( (pl,pix) => {
                switch(pix) {
                    case 0: pl && $$.$(pl).addClass( 'tp-force tostroke' ); break;
                    case 1: pl && $$.$(pl).addClass( 'tp-_p_-displecement tostroke' ); break;
                    case 2: pl && $$.$(pl).addClass( 'tp-body tostroke' ); break;
                    case 3: pl && $$.$(pl).addClass( 'tp-_p_-sagitta tostroke' ); break;
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
                numberMarks : false,
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

