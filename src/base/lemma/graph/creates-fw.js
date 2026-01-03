( function() {
    const {
        sn, nsmethods, $$, nspaste, has, haz, hafff, globalCss, ssF, ssD,
        sDomF, sData, amode, stdMod, sconf,
    } = window.b$l.apptree({ stdModExportList : { wraps_graph_fw, }, });
    return;


    function wraps_graph_fw({
        digramParentDom$,
        graph_methods, //overriders for blesson
    }){
        const gwrap = {};
        gwrap.sets_axes = sets_axes;
        gwrap.setsGraphTpClasses = setsGraphTpClasses;
        gwrap.makes_pix2color = makes_pix2color;
        gwrap.creates_global_css = creates_global_css;
        gwrap.creates_chain_of_containers_under_parent =
                   creates_chain_of_containers_under_parent;
        gwrap.plotLabels_2_plotsPars = plotLabels_2_plotsPars;
        gwrap.doDrawToolline = doDrawToolline;
        gwrap.graphAxisX = graphAxisX;
        gwrap.graphAxisY = graphAxisY;
        gwrap.makes_mask = makes_mask;
        gwrap.auxiliary_arbitrary_colors_generator =
              auxiliary_arbitrary_colors_generator;
        gwrap.wraps_draw_graph = wraps_draw_graph;
        //overrides if any:
        nspaste( gwrap, graph_methods );

        gwrap.creates_chain_of_containers_under_parent( digramParentDom$ );
        nsmethods.createsGraphFW( gwrap );
        const gcontent = gwrap.fw.content;
        gwrap.creates_global_css(); //todm put in defaults
        return gwrap;


        //=====================================
        // //\\ tp classes, colors, and masks
        //=====================================
        function SETS_PLOTS_TP_NAME (){
            const tpnames = [
                'force',
                'fQR',
                'body',
                'sagitta',
            ];
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                tpnames[tpnames.length + fix] =
                    haz( f, 'tpname' ) || 'context';
            });
            return tpnames;
        }

        function makes_pix2color (){
            const multi = ssD?.zebraCols?.multicolor;
            if( multi ){
                var pix2color = multi.map(
                    col => col.rgba_high );
            } else {
                var pix2color = SETS_PLOTS_TP_NAME().map(
                    c => sDomF.tpname0arr_2_rgba( c ));
            }
            gcontent.pix2color = pix2color;
            return pix2color;
        }

        function sets_axes (){
            const ADDENDUM = amode.aspect === 'addendum';
            const ULTIM_NORM = !ADDENDUM &&
                  haz( sconf, 'NORMALIZE_BY_ULTIM_IN_NON_ADDEN' );
            const solvable = sn( 'solvable', ssD, true );
            if( !ssD.solvable ) return;

            //==================================================
            // //\\ calls api
            //==================================================
            const mask = gcontent.pix2mask;
            //axis x and legend x color:
            //manually picked color, not from plot,
            //y-legend color; taken from first plot color:
            const yColor = gcontent.pix2color[ 0 ];

            let n2c = sDomF.tpname0arr_2_rgba; //name to color
            const c_orbit = n2c( 'orbit' );
            const c_body = n2c( 'body' );
            const c_force = n2c( 'force' );
            const c_sagitta = n2c( 'sagitta' );
            const c_fQR = n2c( 'fQR' );
            const xColor = sData.GRAPH_PATH ? c_orbit : c_force;
            const axisYLegend = [
                {
                    //"hover-width" decreases gigantict bold
                    //together, tobold hover-width and tostroke
                    //can be redundant
                    text    :
                        '<text>Force: <tspan class=' +
                        '"tp-force tofill tobold hover-width"' +
                        //overrides tp machinery
                        ' style="fill:' + c_force + '; stroke:'+
                        c_force + ';"' +
                        '></tspan></text>',
                    x       : 40,
                    y       : 25,
                    style   : {
                                'font-size' : 28 + 'px',
                    },
                },
            ];
            let text = '<text>';
            text +=
                '<tspan class="tp-force tofill tobold hover-width" ' +
                'style="fill:' + c_force + '; stroke:' + c_force + ';">' +
                'actual f' +
                '</tspan>';

            var attrib = 'class="tp-f_q_r tofill tobold hover-width" ' +
                ' style="fill:' + c_fQR + '; stroke:' +
                c_fQR +';';
            text += !mask[1] ? '' :
                ', <tspan ' + attrib + '"' +
                '>f</tspan>' +
                '<tspan baseline-shift="sub"' + attrib +
                ' font-size : 23;' + '"' +
                '>QR</span>' +
                '</tspan>';
            text += !mask[2] ? '' :
                ', <tspan class="tp-body tofill tobold hover-width" ' +
                ' style="fill:' + c_body + '; stroke:' + c_body + ';"' +
                '>speed v' +
                '</tspan>';
            text += !mask[3] ? '' :
                ', <tspan class="tp-_p_-sagitta tofill tobold hover-width" ' +
                'style="fill:' + c_sagitta + '; stroke:' +
                c_sagitta + ';">' +
                'sagitta' +
                '</tspan>';
            text += ULTIM_NORM ?
                        ' normed by f<tspan baseline-shift="sub">' +
                        'ultimate max</tspan>'
                        :
                        ' normed by own ' +
                        ( sconf.ADDENDUM_NORM_BY_MIN ? 'min' : 'max' );
            text += '.</text>';
            axisYLegend[1] = {
                text,
                x       : 250,
                y       : 40,
                style   : {
                            'font-size' : '30',
                },
            };

            var axisXLegend = [
                {
                    text    :  sData.GRAPH_PATH ?
                            'Path along arc.' : 'r, distance from force center.',
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

        ///this thing fails if not to synch it with mask,
        ///the unmasked indices must be the same as here:
        function setsGraphTpClasses (){
            const pix2tpcls = gcontent.pix2tpcls;
            const tpnames = SETS_PLOTS_TP_NAME();
            const tplen = tpnames.length;
            const conv = sDomF.tpid2low;
            tpnames.forEach( (nam,ix) => {
                pix2tpcls[ ix ] = conv( 'tp-' + nam );
            });
            ///overrides classes if preset in sconf
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                const cssclass = haz(f, 'cssclass');
                if( cssclass ){
                    pix2tpcls[ tpnames.length + fix ] = cssclass;
                }
            });
        }


        function makes_mask (){
            //const subessay = amode.subessay;
            const TIME = sconf.TIME_IS_FREE_VARIABLE;
            const ADDENDUM = amode.aspect === 'addendum';
            const ULTIM_NORM = !ADDENDUM &&
                  haz( sconf, 'NORMALIZE_BY_ULTIM_IN_NON_ADDEN' );
            const solvable = sn( 'solvable', ssD, true );
            if( !ssD.solvable ) return;

            const mask = gcontent.pix2mask;
            mask[0] = solvable;
            mask[1] = solvable;
                //&& (
                //   subessay === 'corollary1' ||
                //   subessay === 'corollary5'
                //)
            mask[2] = false; //body's speed
            mask[3] = solvable && TIME; //sagitta
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                //t/ mask[4+fix] = ADDENDUM || subessay === 'corollary1';
                mask[4+fix] = ADDENDUM;
            });
        }
         //=====================================
        // \\// tp classes, colors, and masks
        //=====================================

        //=========================================
        // //\\ containers
        //=========================================
        function creates_global_css (){
            globalCss.update( `
                .blesson-graph-svg-parent {
                    position: relative;
                    width   : 95%;
                    left    : 2%;
                    top     : 10px;
                    z-index : 1100;
                    transition : top 1s ease-in-out;
                }

                .blesson-graph-svg-parent.hidden {
                    top     : -200%;
                }

                .comment-inside-of-style-element___php-media,
                .graph-box-svg {
                    position: relative;
                    border  : 2px solid black;
                    width   : 100%;
                    left    : 0%;
                    top     : 0%;
                    background-color : rgba( 255,255,255,1 );
                },
                'chem-equilibr-graph-style'
            `);
        }

        function creates_chain_of_containers_under_parent(
            digramParentDom$
        ){
            gwrap.parent = $$.div()
                .addClass( 'blesson-graph-svg-parent' )
                .to(
                    $$.div().to( digramParentDom$ )
                        .addClass( 'graph-super-parent' )
                        //:this data sets outer dimensions of the graph
                        .css( 'width', '400px' )
                        .css( 'height', '230px' )

                        .css( 'top', '0' )
                        .css( 'left', '0' )
                        .css( 'z-index', '111111' )
            );
            gwrap.dimX = 1000;  //innerWidth;
            gwrap.dimY = 580;   //innerHeight
        }
        //=========================================
        // \\// containers
        //=========================================

        function plotLabels_2_plotsPars (){
            const pix2color = gcontent.pix2color;
            if( !sn( 'solvable', ssD, true ) ) return;
            const addendum = amode.aspect === 'addendum';
            ///make sure, the number of plot labels
            //is equal to plot functions y(x)
            const labels = [
                {
                    fraqX : 0.2,
                    pcaption : 'f',
                    //t/class : 'tp-force',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : pix2color[0],
                    },
                },
                {
                    fraqX : addendum ? 0.25 : 0.3,
                    pcaption : 'f<tspan baseline-shift="sub">QR</tspan>',
                    //t/'class' : 'tp-f_q_r',
                    fontShiftX : 0,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : pix2color[1],
                    },
                },
                {   //ix=2
                    fraqX : 0.8,
                    pcaption : 'skipped',
                    fontShiftX : -50,
                    fontShiftY : 0,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : pix2color[2],
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
                        'stroke'  : pix2color[3],
                    },
                },
            ];
            const fsign =
                sn('forceSign', gcontent.pix2values, 1) < 0 ? '-' : '';
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                const pix = 4+fix; //plot index
                labels[ pix ] =
                {
                    fraqX : 0.25 + fix/10, //plot cosmetics
                    pcaption : fsign + f.label,
                    fontShiftX : 0,
                    fontShiftY : 20,
                    //t/cssclass : 'tp-formula-' + fix,
                    style : {
                        'font-size' : '40px',
                        'stroke'  : pix2color[ pix ],
                    },
                };
            });
            return labels;
        }

        ///this function works, but it can be also a template,
        ///f.e. set other number of colors: maxColors,
        ///colors are probably optimized as distinctive neighbors in
        ///their sequence,
        //sample:
        /*
            if( !ssD?.zebraCols?.multicolor ){
                //in lemma4, see f.e.
                //[ !'monoColor', ns.rgbaArr2hsla(
                //sconf.MONO_BARS_COLOR )[0] ].forEach(
                stdMod.auxiliary_arbitrary_colors_generator( !!'monoColorHue' );
            }
        */
        function auxiliary_arbitrary_colors_generator ( monoColorHue ){
            ssD.zebraCols = {};
            [ false, ns.rgbaArr2hsla(
                [0,     0,   255,    1] )[0] ].forEach(
                ( monoColorHue ) => {
                    var wwCols = ns.builds_zebraNColors_array({
                        maxColors : 10,
                        SATUR       : sconf.DEFAULT_TP_SATUR,  //site setting

                        //40 seems better than 40 for distinct graph lines
                        LIGHT       : 40,  //sconf.default_tp_lightness ||
                        OPACITY     : 0.8, //apparently irrelevant;
                                           //sconf.DEFAULT_TP_OPACITY,
                        zebraNumber : 4,
                        monoColorHue, //true is for mono, false is for multy,
                    });
                    if( monoColorHue ) {
                        ssD.zebraCols.monocolor = wwCols;
                    } else {
                        ssD.zebraCols.multicolor = wwCols;
                    }
            });
        }

        ///to modify in blesson, this fun. needs overriding
        ///in blesson
        function doDrawToolline (){
            return {
                toollineStyle : {
                    stroke : gcontent.pix2color[2],
                    'stroke-width' : 3,
                },
                abscissaIxValue : stdMod.P2gix(),
                numberMarks : amode.aspect === 'addendum',
            };
        }

        ///horizontal axis x pars, font, etc,
        function graphAxisX( xColor ){
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

        function graphAxisY( yColor ){
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

        function wraps_draw_graph({
            mask, //mask can be sparsed array,
            drawDecimalY,
            drawDecimalX,
            printAxisXDigits,
            printAxisYDigits,
            xMin,
            xMax,
            yMin,
            yMax,
        }){
            const fw = gwrap.fw;
            drawDecimalY = typeof drawDecimalY === 'undefined' ?
                            true : drawDecimalY;
            drawDecimalX = typeof drawDecimalX === 'undefined' ?
                            true : drawDecimalX;
            gwrap.setsGraphTpClasses();
            gwrap.makes_pix2color();
            hafff( gwrap, 'makes_mask' );
            if( mask ){
                //// mask is directly overriden by painter call,
                mask.forEach( (m,ix) => {
                    gwrap.fw.content.pix2mask[ix] = m;
                });
            }
            const { yColor, xColor, axisYLegend, axisXLegend, } =
                  gwrap.sets_axes();
            fw.meth.drawGraph({
                drawDecimalY,
                drawDecimalX,
                printAxisXDigits,
                printAxisYDigits,
                xMin,
                xMax,
                yMin,
                yMax,
                    axisX : gwrap.graphAxisX( xColor ),
                    axisY : gwrap.graphAxisY( yColor ),
                    doSideAxes : true,
                    printAxisDigits : true,
                    axisYLegend,
                    axisXLegend,
                    plotsCount_overrider : 1000,
                    plotsPars : gwrap.plotLabels_2_plotsPars(),
                    doPaintGridOnlyOnce : false,
                    doDrawToolline : gwrap.doDrawToolline(),
                    brightenGrid : 0.3,
            });
        }
    }
})();