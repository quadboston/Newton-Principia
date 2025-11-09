( function() {
    const {
        sn, has, haz, ssD, ssF, sDomF, sData,
        amode, stdMod, sconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            graph_axes8mask,
        },
    });
    return;


    function graph_axes8mask() {
        const subessay = amode.subessay;
        const TIME = sconf.TIME_IS_FREE_VARIABLE;
        const ADDENDUM = amode.aspect === 'addendum';
        const ULTIM_NORM = !ADDENDUM && haz( sconf, 'NORMALIZE_BY_ULTIM_IN_NON_ADDEN' );
        const solvable = sn( 'solvable', ssD, true );
        if( !ssD.solvable ) return;
        const graphFW = stdMod.graphFW_lemma;

        //----------------------------------------------
        // //\\ mask
        //----------------------------------------------
        const mask = sn( 'graphArrayMask', stdMod.graphFW_lemma, [] );
        stdMod.graphFW_lemma.graphArrayMask = mask;
        mask[0] = solvable;
        mask[1] = solvable;
            //&& (
            //   subessay === 'corollary1' ||
            //   subessay === 'corollary5'
            //)
        mask[2] = false; //body's speed
        mask[3] = solvable && TIME; //sagitta
        sconf.SHOW_FORMULAS.forEach( (f,fix) => {
            mask[4+fix] = ADDENDUM;
        });
        //----------------------------------------------
        // \\// mask
        //----------------------------------------------

        //==================================================
        // //\\ calls api
        //==================================================
        //axis x and legend x color:
        //manually picked color, not from plot,
        //y-legend color; taken from first plot color:
        const yColor = graphFW.colorThreadArray[ 0 ];

        let n2c = sDomF.getFixedColor; //name to color
        const c_orbit = n2c( 'orbit' );
        const c_body = n2c( 'body' );
        const c_force = n2c( 'force' );
        const c_sagitta = n2c( 'sagitta' );
        const c_fQR = n2c( 'fQR' );
        const xColor = sData.GRAPH_PATH ? c_orbit : c_force;
        const axisYLegend = [
            {
                //"hover-width" decreases gigantict bold
                //together, tobold hover-width and tostroke can be redundant
                text    :
                    '<text>Force: <tspan class=' +
                    '"tp-force tofill tobold hover-width"' +
                    //overrides tp machinery
                    ' style="fill:' + c_force + '; stroke:'+c_force + ';"' +
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
            'style="fill:' + c_sagitta + '; stroke:' + c_sagitta + ';">' +
            'sagitta' +
            '</tspan>';
        text += ULTIM_NORM ? ' normed by own max.' :
                ' normed by f <tspan baseline-shift="sub">ultimate max</tspan>';
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
})();