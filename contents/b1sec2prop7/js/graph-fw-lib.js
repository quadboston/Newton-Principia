( function() {
    var {
        $$, nsmethods, globalCss, userOptions,
        sDomF,
        amode, stdMod, sconf, rg
    } = window.b$l.apptree({
        stdModExportList :
        {
            createsGraphFW_lemma,
        },
    });
    return;

    function createsGraphFW_lemma({ digramParentDom$ }){
        let graphFW = {};
        let bonus = !!userOptions.showingBonusFeatures();
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
        return graphFW;

        
        function doSetColorThreadArray()
        {
            let colorThreadArray = [
                sDomF.getFixedColor( 'force' ), //predefinedTopics.P, !!'makeOpacity1' ),
                sDomF.getFixedColor( 'sagitta' ), //sagitta
                sDomF.getFixedColor( 'context' ),
                sDomF.getFixedColor( 'body' ),
                sDomF.getFixedColor( 'estimatedForce' ), //estimatedForce
                sDomF.getFixedColor( 'proof' ), //comp law5
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
            const addendum = amode.aspect === 'addendum';

            //==================================================
            // //\\ calls api
            //==================================================
            //y-legend color; taken from first plot color:
            var yColor = graphFW.colorThreadArray[ 0 ]; //equilibConst;

            //axis x and legend x color:
            //manually picked color, not from plot,
            var xColor = n2c( 'orbit' );
            var axisYLegend =
            [
                {
                    //"hover-width" decreases gigantict bold
                    //together, tobold hover-width and tostroke can be redundant
                    text    :   '<text><tspan class="tp-force tofill tostroke tobold hover-width"' +
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
                    text    : addendum ?
                                //'Forces f, -1/r² their max.'
                                
                                '<text><tspan>Forces </tspan><tspan class="tp-force tofill tostroke tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'force' ) + '; stroke:'+n2c( 'force' ) + ';"' +
                                '>f </tspan>' +
                                '<tspan>, </tspan>' +
                                
                                '<tspan class="tp-estimated_force tofill tostroke tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'estimatedForce' ) + '; stroke:'+
                                                n2c( 'estimatedForce' ) + ';"' +
                                '>fₑ' +
                                '</tspan>' +
                                
                                '<tspan' +
                                '>, r⁻², r⁻⁵ per own min.' +
                                '</tspan>' +
                                '</text>'
                                
                                :   // Actual and Estimated forces
                                
                                
                                '<text><tspan class="tp-force tofill tostroke tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'force' ) + '; stroke:'+n2c( 'force' ) + ';"' +
                                '>Actual</tspan>' +
                                '<tspan> and </tspan>' +

                                '<tspan class="tp-_p_-sagitta tofill tostroke tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'sagitta' ) + '; stroke:'+
                                                n2c( 'sagitta' ) + ';"' +
                                '>Estimated' +
                                '</tspan>' +

                                '<tspan> forces</tspan>' +
                                '</text>',
  
  
  
                    x       : addendum ? 250 : 310,
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
                    text    : 'Distance from force (SP / AV)', 
                    x       : bonus ? -700 : -600,
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
                    //pcaption : 'Actual force',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[0],
                        //'stroke-width' : '10px',
                        //'display' : bonus ? 'block' : 'none',
                        //'fill' : colorThreadArray[0],
                    },
                    //overrides tp class
                    //plotStyle : {
                        //'stroke-width'  : '5',   //optional
                    //},
                },
                {
                    fraqX : 0.6,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    //pcaption : 'Estimated force',
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
                    fraqX : 0.8,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : '-r⁻²',
                    fontShiftX : -50,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[2],
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
                        'stroke'  : colorThreadArray[3],
                    },
                },
                {
                    fraqX : 0.6,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    //pcaption : 'Estimated force',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[4],
                        //'fill' : colorThreadArray[4],
                    },
                },
                {
                    //compare law 1/r⁵
                    fraqX : 0.8,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : '-r⁻⁵',
                    fontShiftX : 30,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[5],
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
                    case 3: pl && $$.$(pl).addClass( 'tp-body tostroke' ); break; //r2
                    case 4: pl && $$.$(pl).addClass( 'tp-estimated_force tostroke' ); break; //est
                    case 5: pl && $$.$(pl).addClass( 'tp-body tostroke' ); break; //law5
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
                numberMarks : false, //true, 
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

