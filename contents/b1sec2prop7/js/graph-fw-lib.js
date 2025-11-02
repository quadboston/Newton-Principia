( function() {
    const {
        $$, sDomF, amode, stdMod, sconf,
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

        //this is just an example how to reset colors dynamically
        //in model_upcreate(): 
        //    stdMod.graphFW_lemma.colorThreadArray[0] =
        //    ADDENDUM ? 'green' : sDomF.getFixedColor( 'force' );
        function doSetColorThreadArray()
        {
            let colorThreadArray = [
                sDomF.getFixedColor( 'force' ),
                sDomF.getFixedColor( 'fQR' ),
                sDomF.getFixedColor( 'body' ),
                sDomF.getFixedColor( 'sagitta' ),
            ];
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                colorThreadArray[4+fix] = sDomF.getFixedColor( 'context' );
            });
            return colorThreadArray;
        }

        function setsGraphContainerAttributes( digramParentDom$ )
        {
            const container$ = $$.div()
                .addClass( 'chem-equiibr-graph-container' )
                .to( $$.div().to( digramParentDom$ )
                .addClass( 'lost-diagram-parent' )
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
            const addendum = amode.aspect === 'addendum';
            ///make sure, the number of plot labels is equal to plot functions y(x)
            const labels = [
                {
                    fraqX : 0.2,
                    //todm: make dynamic pcaption : 'f', //'P(v), ' + ig.vname2vob.P.units,
                    pcaption : 'f',
                    class : 'tp-force',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[0],
                        //'stroke-width' : '10px',
                        //'fill' : colorThreadArray[0],
                    },
                    //overrides tp class
                    //plotStyle : {
                    //    'stroke-width'  : '5',   //optional
                    //},
                },
                {
                    fraqX : addendum ? 0.25 : 0.3,
                    pcaption : 'f<tspan baseline-shift="sub">QR</tspan>',
                    'class' : 'tp-f_q_r',
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
                {   //ix=2
                    fraqX : 0.8,
                    pcaption : 'skipped',
                    fontShiftX : -50,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[2],
                    },
                },
                {
                    //ix = 3
                    fraqX : 0.9,
                    pcaption : '',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[3],
                    },
                },
            ];
            var fsignum = Math.sign( stdMod.graphFW_lemma.graphArray[0].y[0] );
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                const pix = 4+fix; //plot index
                labels[ pix ] = 
                {  
                    fraqX : 0.25 + fix/10, //plot cosmetics
                    pcaption : ( fsignum < 0 ? '-' : '' ) + f.label,
                    fontShiftX : 0,
                    fontShiftY : 20,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : colorThreadArray[ pix ],
                    },
                };
            });
            return labels;
        }

        ///this thing fails if not to synch it with mask,
        ///the unmasked indices must be the same as here:
        function setsGraphTpClasses()
        {
            const p2svg = graphFW.fw.plotIx2plotSvg;
            p2svg.forEach( (pl,pix) => {
                switch(pix) {
                    case 0: pl && $$.$(pl).addClass( 'tp-force tostroke' ); break;
                    case 1: pl && $$.$(pl).addClass( 'tp-f_q_r tostroke' ); break;
                    case 3: pl && $$.$(pl).addClass( 'tp-sagitta tostroke' ); break;
                }
            });
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                const pl = p2svg[ 4+fix ];
                pl && $$.$(pl).addClass( f.cssclass );
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
})();