( function() {
    const {
        $$, nsmethods, globalCss, userOptions,
        sDomF,
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
        stdMod.createsGraphFW_class({
            graphFW,
            digramParentDom$,
            doSetColorThreadArray,
            setsGraphContainerAttributes,
            setsGraphAxes : null,
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
                sDomF.getFixedColor( 'force' ),
                sDomF.getFixedColor( 'displacement' ),
                sDomF.getFixedColor( 'body' ),
                sDomF.getFixedColor( 'sagitta' ),
                sDomF.getFixedColor( 'formula1' ),
            ];
            return colorThreadArray;
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
            //creates low tire api
            graph_dimX = 1000;  //innerWidth
            graph_dimY = 580;   //innerHeight
            return {container$, graph_dimX, graph_dimY};
        }

        function plotLabels_2_plotsPars( colorThreadArray )
        {
            const ADDENDUM = amode.aspect === 'addendum';
            return [
                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : '1/r³',
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
                    pcaption :  'est. force',
                    fontShiftX : -33,
                    fontShiftY : 15,
                    style : {
                        'font-size' : '30px',
                        'stroke'  : colorThreadArray[1],
                    },
                },
                ///optional
                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 'v',
                    fontShiftX : 40,
                    fontShiftY : 15,
                    style : {
                        'font-size' : '30px',
                        'stroke'  : colorThreadArray[2],
                    },
                },
                ///optional
                {
                    fraqX : 0.01,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 'sagitta',
                    fontShiftX : 40,
                    fontShiftY : 15,
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
            graphFW.fw.plotIx2plotSvg.forEach( (pl,pix) => {
                switch(pix) {
                    case 0: pl && $$.$(pl).addClass( 'tp-force tostroke' ); break;
                    case 1: pl && $$.$(pl).addClass( 'tp-displacement tostroke' ); break;
                    case 2: pl && $$.$(pl).addClass( 'tp-body tostroke' ); break; //r2
                    case 3: pl && $$.$(pl).addClass( 'tp-sagitta tostroke' ); break; //est
                }
            });
        }

        function doDrawToolline()
        {
            return {
                toollineStyle : {
                    'stroke-width' : 3,
                },
                abscissaIxValue : stdMod.P2gix(),
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
})();

