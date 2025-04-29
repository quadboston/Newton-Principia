( function() {
    var {
        sn, $$, nsmethods, haz, globalCss, userOptions,
        ssD, sDomN, sDomF, sData,
        stdMod, sconf, rg
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
        //first array mast be enabled
        graphFW.graphArrayMask = BONUS ?
            [ 'force', 'sagitta', 'body' ] :
            [ 'force', 'sagitta', ];
        return graphFW;


        function doSetColorThreadArray()
        {
            let colorThreadArray = [
                sDomF.getFixedColor( 'force' ),
                sDomF.getFixedColor( BONUS ? 'sagitta' : 'estimatedForce' ),
                sDomF.getFixedColor( 'speed' ),
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
                let n2c = sDomF.getFixedColor; //name to color
                
            //==================================================
            // //\\ calls api
            //==================================================
            //y-legend color; taken from first plot color:
                var yColor      = graphFW.colorThreadArray[ 0 ]; //equilibConst;

            //axis x and legend x color:
            //manually picked color, not from plot,
                var xColor      = 'rgba(0,0,0,1)'
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
                                'stroke' : yColor,
                                'fill'   : yColor,
                    },
                },
                {
                    text    : BONUS ?
                                'Force f, sagitta s, -1/r², and speed v per their max.' :

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
                                'stroke' : 'black',
                                'fill'   : 'black',
                    },
                },

            ];
            var axisXLegend =
            [
                {
                        text    : BONUS ? 'Distance from force center, r' : 'SP (distance from force)', 
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
            ///make sure, the number of plot labels is equal to plot functions y(x)
            return [
                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : BONUS ? '1/r²' : '',
                    fontShiftX : -222,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '30px',
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
                    pcaption :  BONUS ? 
                                'sagitta' :
                                '',
                    fontShiftX : -33,
                    fontShiftY : 15,
                    style : {
                        'font-size' : '30px',
                        'stroke'  : colorThreadArray[1],
                    },
                },
                /*
                ///optional
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
                */
            ];
        }

        ///this thing fails if not to synch it with mask,
        ///the unmasked indices must be the same as here:
        function setsGraphTpClasses()
        {
            $$.$( graphFW.fw.plotIx2plotSvg[0] ).addClass( 'tp-force tostroke' );
            $$.$( graphFW.fw.plotIx2plotSvg[1] ).addClass( 'tp-force tostroke' );
            //$$.$( graphFW.fw.plotIx2plotSvg[2] ).addClass( 'tp-body tostroke' );
        }

        function doDrawToolline()
        {
            return {
                toollineStyle : {
                    //stroke : sData.colorThreadArray[2],
                    'stroke-width' : 3,
                },
                abscissaIxValue : Math.floor( rg.P.qix*sconf.DATA_GRAPH_ARRAY_LEN
                                /sconf.FORCE_ARRAY_LEN ), //? default = stdMod.pos2qix(),
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

