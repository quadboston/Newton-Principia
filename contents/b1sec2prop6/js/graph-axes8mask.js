( function() {
    const {
        ssD, ssF, sDomF, sData,
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
        const solvable = ssD.solvable;

        const graphFW = stdMod.graphFW_lemma;
        const mask = stdMod.graphFW_lemma.graphArrayMask;
        mask[1] = solvable && (
            subessay === 'corollary1' ||
            subessay === 'corollary5'
        ),
        mask[2] = solvable && ADDENDUM; //'body'
        mask[3] = solvable && TIME; //sagitta
        
        
        //==================================================
        // //\\ calls api
        //==================================================
        //y-legend color; taken from first plot color:
        const yColor = graphFW.colorThreadArray[ 0 ];

        //axis x and legend x color:
        //manually picked color, not from plot,
        let n2c = sDomF.getFixedColor; //name to color
        const c_orbit = n2c( 'orbit' );
        const c_body = n2c( 'body' );
        const c_force = n2c( 'force' );
        const c_sagitta = n2c( 'sagitta' );
        const c_displacement = n2c( 'displacement' );
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
                            //'stroke' : yColor,
                            //'fill'   : yColor,
                },
            },
        ];
        let text = 
            '<text>' +
            '<tspan class="tp-force tofill tobold hover-width" ' +                    
            'style="fill:' + c_force + '; stroke:' + c_force + ';">' +
            'actual f' +
            '</tspan>';
        text += !mask[1] ? '' :
            ', <tspan class="tp-displacement tofill tobold hover-width" ' +                    
            ' style="fill:' + c_displacement + '; stroke:' +
            c_displacement + ';"' +
            '>fQR' +
            '</tspan>';
        text += !mask[2] ? '' :
            ', <tspan class="tp-body tofill tobold hover-width" ' +                    
            ' style="fill:' + c_body + '; stroke:' + c_body + ';"' +
            '>speed v' +
            '</tspan>';            
        text += !mask[3] ? '' :
            ', <tspan class="tp-sagitta tofill tobold hover-width" ' +                    
            'style="fill:' + c_sagitta + '; stroke:' + c_sagitta + ';">' +
            'sagitta' +
            '</tspan>';
        text += '.</text>';
        axisYLegend[1] = {
            text,
            //',  -1/r², per their max.',
            x       : 250,
            y       : 40,
            style   : {
                        'font-size' : '30',
                        //'stroke' : 'black',
                        //'fill'   : 'black',
            },
        }
        
        var axisXLegend = [
            {
                text    :  sData.GRAPH_PATH ?
                           'Distance along arc' : 'Distance from force center, r', 
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

