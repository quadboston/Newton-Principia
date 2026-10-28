(function(){
const {
        sn, nsmethods, $$, nspaste, has, haz, hafff, globalCss, rg,
        ssF, ssD, fldo, sDomF, sData, amode, stdMod, sconf, tpelect,
      } = window.b$l.atree({ stdModList: {
        creates_lemma_graph_fw,
        creates_chain_of_containers_under_parent,
        graph_creates_global_css: creates_global_css,
}});
return;


function creates_lemma_graph_fw({
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
    gwrap.createsToolLineConfig = createsToolLineConfig;
    gwrap.graphAxisX = graphAxisX;
    gwrap.graphAxisY = graphAxisY;
    gwrap.makes_mask = makes_mask;
    gwrap.draw_graph = draw_graph;
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
    function RETURNS_TP_NAMES (){
        const tpnames = [
            'borbit',
            'speed',
        ];
        return tpnames;
    }

    function makes_pix2color (){
        var pix2color = RETURNS_TP_NAMES().map(
            c => sDomF.rgn0arrc_2_rgba( c ));
        gcontent.pix2color = pix2color;
        return pix2color;
    }

    function sets_axes (){
        //==================================================
        // //\\ calls api
        //==================================================
        const mask = gcontent.pix2mask;
        //axis x and legend x color:
        //manually picked color, not from plot,
        //y-legend color; taken from first plot color:
        const yColor = gcontent.pix2color[ 0 ];
        const TP_TXT = '<tspan class="' +
                       'tofill tobold hover-width ';
        let n2c = sDomF.rgn0arrc_2_rgba; //name to color
        const c_borbit = n2c( 'borbit', 1 );
        const c_velocity = n2c( 'speed', 1 );
        const xColor = n2c( tpelect['time'], 1 );

        // //\\ vertical axis caption
        const axisYLegend = [
            {
                // //\\ vertical axis title
                //"hover-width" decreases gigantict bold
                //together, tobold hover-width and tostroke
                //can be redundant
                text    :
                    '<text>' + TP_TXT + 'tp-borbit"' +
                    //overrides tp machinery
                    ' style="fill:' + c_borbit + '; stroke:'+
                    c_borbit + ';"' +
                    '>path</tspan></text>',
                x       : 40,
                y       : 60,
                style   : {
                            //'font-size' : 28 + 'px',
                            'font-size' : 40 + 'px',
                },
            },
        ];
        // \\// vertical axis caption
        let text = '<text>';
        text +=
           TP_TXT + 'tp-borbit"' +
            'style="fill:' + c_borbit + '; stroke:' +
            c_borbit + ';">' +
            'path: r/(' + rg.borbit.pathmax.toFixed(1) + ' m)' +
            '</tspan>';
        text += !mask[1] ? '' :
            ', ' +
            TP_TXT + 'tp-speed"' +
            '>velocity: v/(' + rg.borbit.vmax.toFixed(1) +' m/s)</tspan>';
        text += '.</text>';
        axisYLegend[1] = {
            text,
            x       : 150,
            y       : 40,
            style   : {
                        'font-size' : '40', //'30',
            },
        };
        // \\// header line text

        var axisXLegend = [
            {
                text: '<text>' + TP_TXT + 'tp-time">' +
                'time, ' + rg.t.gconf.unit +
                '</tspan></text>',
                x       : -700,
                y       : 25,
                style   : {
                            'font-size' : '40', //'30',
                            'stroke' : xColor,
                            'fill' : xColor,
                },
            },
            {
                text    : '',
                x       : 50,
                y       : -20,
                style   : {
                            'font-size' : '37', //'23',
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
        const i2c = gcontent.pix2tpcls;
        const conv = sDomF.rgid2low;
        RETURNS_TP_NAMES().forEach( (nam,ix) => {
            i2c[ ix ] = conv( 'tp-' + nam );
        });
    }

    function makes_mask (){
        //const subessay = amode.subessay;
        const TIME = sconf.TIME_IS_FREE_VARIABLE;
        const solvable_orbit = sn( 'solvable_orbit', fldo, true );
        const mask = gcontent.pix2mask;
        mask[0] = solvable_orbit;
        mask[1] = solvable_orbit;
            //&& (
            //   subessay === 'corollary1' ||
            //   subessay === 'corollary5'
            //)
    }
    //=====================================
    // \\// tp classes, colors, and masks
    //=====================================

    function plotLabels_2_plotsPars (){
        const pix2color = gcontent.pix2color;
        //if( !sn( 'solvable', ssD, true ) ) return;
        ///make sure, the number of plot labels
        //is equal to plot functions y(x)
        const labels = [
            {
                fraqX : 0.2,
                pcaption : 'r',
                //t/class : 'tp-force',
                fontShiftX : 0,
                fontShiftY : 0,
                style : {
                    'font-size' : '60px', //'40px',
                    'stroke'  : pix2color[0],
                },
            },
            {
                fraqX : 0.25,
                pcaption : 'v',
                //t/'class' : 'tp-f_q_r',
                fontShiftX : 0,
                fontShiftY : 0,
                style : {
                    'font-size' : '60px', //'40px',
                    'stroke'  : pix2color[1],
                },
            },
        ];
        return labels;
    }

    ///to modify in blesson, this fun. needs overriding
    ///in blesson
    function createsToolLineConfig (){
        return {
            toollineStyle: {
                stroke: gcontent.pix2color[0],
                'stroke-width': 3,
            },
            abscissaIxValue: q2qix(),
            numberMarks: true,
        };
    }

    ///horizontal axis x pars, font, etc,
    function graphAxisX( xColor ){
        return {
            'font-size'     : '27px', //'18px',
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
            'font-size'     : '30px', //'20px',
            fontShiftX      : -45, //in media scale
            fontShiftY      : +5,
            decimalDigits   : 1,
            stroke          : yColor,
            fill            : yColor,
            'stroke-width'   : '1',
        };
    }

    function draw_graph({
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
                toolLineConfig : gwrap.createsToolLineConfig(),
                brightenGrid : 0.3,
        });
    }
}


function q2qix(){
    const q = rg.t.val;
    const cur = rg.graph.graphFW_lemma.fw.content.pix2values;
    const tmax = rg.t.gconf.max;
    const tmin = rg.t.gconf.min;
    const len1 = cur.length-1;
    var qix = (cur.length-1)*(q - tmin)/(tmax - tmin);
    qix = Math.max( 0, Math.min( len1, qix) );
    return qix;
}

//put is stdMod only for lemma 4
function creates_chain_of_containers_under_parent(
    digramParentDom$, //top ancestor
    gwrap,            //graph framework
){
    gwrap = gwrap || this;
    gwrap.parent = //todo rid
    gwrap.parent$ = $$.div()
        .addClass( 'blesson-graph-svg-parent' )
        .to( $$.div()
            .to( digramParentDom$ )
            .addClass( 'graph-super-parent' )
            //:this data sets outer dimensions of the graph
            .css( 'position', 'relative' )
            .css( 'width', '400px' )
            .css( 'height', '230px' )
            .css( 'padding-bottom', '20px' )
            .css( 'top', '10px' )
            .css( 'left', '50%' )
            .css( 'transform', 'translate(-50%, 0%)' )
            .css( 'z-index', '111111' )
    );
    //gwrap.dimX = 1000;  //innerWidth;
    //gwrap.dimY = 580;   //innerHeight
    gwrap.dimX = 1000;  //innerWidth;
    gwrap.dimY = 580;   //innerHeight
}
//=========================================
// //\\ containers
//=========================================
//put is stdMod only for lemma 4
function creates_global_css (){
    globalCss.update( `
        .blesson-graph-svg-parent {
            position: relative;
            width   : 95%;
            left    : 2%;
            top     : 0px;
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
//=========================================
// \\// containers
//=========================================
})();