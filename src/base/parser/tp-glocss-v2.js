( function() {
    const {
        sn, cssp, $$, eachprop, globalCss, nsmethods,
        fapp, sconf, topics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            v2_tplinks_2_highlightCss,
            v2_topics_2_unhighCss,
        },
    });
    const graphCss = sn( 'graphCss', sconf );
    const diagramCss = sn( 'diagramCss', sconf );
    const ROOT = '.' + cssp + '-approot';
    return;


    ///*************************************************
    /// CSS decorations and opacity for mouse non-hover,
    /// creates and updates,
    ///*************************************************
    function v2_topics_2_unhighCss()
    {
        var totalCss = '';
        eachprop( topics.lowId2topics, ( topi_c, lowId ) => {
            var { fillOpacity, strokeOpacity, rgba_own } = topi_c;
            var Rtp = ROOT + ' .tp-' + lowId;
            var tpOpacityLow_str = topi_c.lowOpacity.toFixed(3);
            var ts = '';

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
${ROOT} svg image.tp-${lowId} {
    opacity : ${ sconf.SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY };
}

${ROOT} svg .tp-${lowId}.hover-width {
    stroke-width:${ sconf.nonhover_width }px;
}
${ROOT} svg text.tp-${lowId}.hover-width {
    stroke-width:${ sconf.text_nonhover_width }px;
}

${ROOT} svg.graph-box-svg .tp-${lowId}.hover-width {
    stroke-width:${ graphCss.nonhover_width };
}
${ROOT} svg.graph-box-svg text.tp-${lowId}.hover-width,
${ROOT} svg.graph-box-svg tspan.tp-${lowId}.hover-width {
    stroke-width:${ graphCss.text_nonhover_width };
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
            globalCss.replace( ts, 'glocss-'+lowId );
        });
    }

    function v2_tplinks_2_highlightCss( nextTplinks )
    {
        nextTplinks.forEach( (tplink,tplink_ix) => {
            Object.keys( tplink.tpid2true ).forEach( lowId => {
                var Rix = ROOT + '.tp-' + tplink_ix;
                var topi_c = topics.lowId2topics[ lowId ];
                var ts = '';
                var { highOpacity, rgba_own} = topi_c;
                var tpOpacityHigh_str = highOpacity.toFixed(3);

                ts += `
${Rix} .tp-${lowId} {
    opacity: ${tpOpacityHigh_str};
}
                     `;
                    //competes with tobold, do we need all of them?
                    ts += `
${Rix} .tp-${lowId}.tobold {
    font-weight : bold;
}
                    `;
                        ///todm: very crude and wordy stroke width control
                    ts += `
${Rix} svg .tp-${lowId}.tostroke {
    stroke-width:${ sconf.default_tp_stroke_width }px;
}
                    `;

                    ts += `

${Rix} svg .tp-${lowId}.tostroke.hover-width {
    stroke-width:${ sconf.hover_width }px;
}

${Rix} svg text.tp-${lowId}.tostroke.hover-width {
    stroke-width:${ sconf.text_hover_width }px;
}

${Rix} svg.graph-box-svg .tp-${lowId}.tostroke.hover-width {
    stroke-width:${ graphCss.hover_width };
}
${Rix} svg.graph-box-svg text.tp-${lowId}.tostroke.hover-width,
${Rix} svg.graph-box-svg tspan.tp-${lowId}.tostroke.hover-width {
    stroke-width:${ graphCss.text_hover_width };
}
                    `;

                    //todm: can be done via tpOpacityLow = 0;
                    ts += `
${Rix} .tohidden.tp-${lowId} {
    visibility:visible;
}
                `;


                globalCss.update( ts, 'glocss-id-' + lowId + '-glocss-ix-'+tplink_ix );
            });
        });
    }
})();