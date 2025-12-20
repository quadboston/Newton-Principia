( function() {
    var {
        cssp, eachprop, globalCss, sconf, topics, fixedColors
    } = window.b$l.apptree({
        ssFExportList : {
            v2_tplinks_2_highlightCss,
            v2_topics_2_unhighCss,
        },
    });
    var ROOT = '.' + cssp + '-approot';
    return;


    ///*************************************************
    /// CSS decorations and opacity for mouse non-hover,
    /// creates and updates,
    ///*************************************************
    function v2_topics_2_unhighCss()
    {
        ccc( 'v2_topics_2_unhighCss' );
        eachprop( topics.lowtpid_2_glocss8anchorRack, ( gcssRack, low_tpID ) => {
            var { fillOpacity, strokeOpacity, rgba_own } = gcssRack;
            var Rtp = ROOT + ' .tp-' + low_tpID;
            var tpOpacityLow_str = gcssRack.lowOpacity.toFixed(3);
            var ts = '';
if( 'kepler-triangle-odd' === low_tpID ){
    ccc('v2_topics_2_unhighCss: gcssRack=',gcssRack);
}
    //ccc(gcssRack);
            ts += `
${Rtp} {
    opacity: ${tpOpacityLow_str};
    fill-opacity: ${fillOpacity};
    stroke-opacity: ${strokeOpacity};
}

${Rtp}.tofill {
    fill: ${rgba_own};
}
${Rtp}.tostroke {
    stroke: ${rgba_own};
}

${Rtp}.tocolor {
    color : ${rgba_own};
}
${Rtp}.tobg {
    background-color : ${rgba_own};
}
            `;
            //todm move to shape html-element:
            //add on for svg <image>, Oct 23, 2021
            ts += `
${ROOT} svg image.tp-${low_tpID} {
    opacity : ${ sconf.SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY };
}
${ROOT} svg .tp-${low_tpID}.hover-width {
    stroke-width:${ sconf.nonhover_width }px;
}
            `;
            //todo experiment
            ts += `
${Rtp}.tocolor {
    color : ${rgba_own};
}
${Rtp}.tobg {
    background-color : ${rgba_own};
}
            `;
            globalCss.replace( ts, 'glocss-'+low_tpID );
        });
    }


    function v2_tplinks_2_highlightCss(
        nextTplinks,
        doReplace //optional, for prop1,2
    ){
        ccc( 'v2_tplinks_2_highlightCss, nextTplinks=', nextTplinks );
        nextTplinks.forEach( (anrack,tplink_ix) => {
            Object.keys( anrack.tpid2true ).forEach( low_tpID => {
                var Rtp = ROOT + ' .tp-' + low_tpID;
                var Rix = ROOT + '.tp-' + tplink_ix;
                var gcssRack = topics.lowtpid_2_glocss8anchorRack[ low_tpID ];
                var ts = '';
                var { highOpacity, rgba_own} = gcssRack;
                var tpOpacityHigh_str = highOpacity.toFixed(3);
                ts += `
${Rix} .tp-${low_tpID} {
    opacity: ${tpOpacityHigh_str};
}
                     `;
                    //competes with tobold, do we need all of them?
                    ts += `
${Rix} .tp-${low_tpID}.tobold,

${Rix} svg text.tp-${low_tpID},
${Rix} svg tspan.tp-${low_tpID},
${Rix} span.tp-${low_tpID} {
    background-color : rgb(${fixedColors.highlight}); /* highlight instead of bold */
}
                    `;
                        ///todm: very crude and wordy stroke width control
                     ts += `
${Rix} svg .tp-${low_tpID}.tostroke {
    stroke-width:${ sconf.default_tp_stroke_width }px;
}
                    `;

ts += `

${Rix} svg .tp-${low_tpID}.tostroke.hover-width {
    stroke-width:${ sconf.hover_width }px;
}
                    `;
                    //todm: can be done via tpOpacityLow = 0;
                    ts += `
${Rix} .tohidden.tp-${low_tpID} {
    visibility:visible;
}
                `;
                globalCss[ doReplace ? 'replace' : 'update' ]( ts,
                    'glocss-id-' + low_tpID + '-glocss-ix-'+tplink_ix );
            });
        });
    }
})();


