( function() {
    var { $$, sDomF, stdMod }
        = window.b$l.apptree({ stdModExportList : { createsGraph_FW_lemma, }, });
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
            setsGraphTpClasses,
        });
        //first array must be enabled
        //but can be dynamically overridden,
        graphFW.graphArrayMask = [ 'force', 'estforce', ];
        return graphFW;

        ///this thing is not dynamic (missed in design),
        ///but, colorThreadArray is accessible for reset
        ///dynamically,        
        function doSetColorThreadArray()
        {
            let colorThreadArray = [
                sDomF.getFixedColor( 'force' ),
                sDomF.getFixedColor( 'displacement' ),
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
            let n2c = sDomF.getFixedColor; //name to color

            //==================================================
            // //\\ calls api
            //==================================================
            //y-legend color; taken from first plot color:
            var yColor      = graphFW.colorThreadArray[ 0 ]; //equilibConst;

            //axis x and legend x color:
            //manually picked color, not from plot,
            var xColor      = 'rgba(0,0,0,1)';
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
                    text    :   '<text><tspan class="tp-force tofill tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'force' ) + '; stroke:'+n2c( 'force' ) + ';"' +
                                '>Actual</tspan>' +
                                '<tspan> and </tspan>' +

                                '<tspan class="tp-displacement tofill tobold hover-width"' +
                                //overrides tp machinery
                                ' style="fill:'+n2c( 'displacement' ) + '; stroke:' + n2c( 'displacement' ) + ';"' +
                                '>Estimated' +
                                '</tspan>' +

                                '<tspan> forces</tspan>' +
                                '</text>',
                    x       : 310,
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
                    text    : 'Distance from force (SP)', 
                    x       : -560,
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
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    //pcaption : '',
                    fontShiftX : 0,
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
                    //pcaption : 'Estimated force',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '30px',
                        'stroke'  : colorThreadArray[1],
                    },
                },
                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    //pcaption : '-r⁻²',
                    fontShiftX : -50,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '30px',
                        'stroke'  : colorThreadArray[2],
                    },
                },
            ];
        }

        ///this thing fails if not to synch it with mask,
        ///the unmasked indices must be the same as here:
        function setsGraphTpClasses()
        {
            const svg = graphFW.fw.plotIx2plotSvg;
            $$.$( svg[0] ).addClass( 'tp-force tostroke' );
            $$.$( svg[1] ).addClass( 'tp-displacement tostroke' );
            // svg[2] && $$.$( svg[2] ).addClass( 'tp-body tostroke' );
            // svg[3] && $$.$( svg[3] ).addClass( 'tp-sagitta tostroke' );
        }
    }
}) ();

