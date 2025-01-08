( function() {
    var {
        ns, sn, cssp, $$, eachprop, globalCss, nsmethods,
        fapp, sconf, topics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            v2_establishes__highlightedTopicsGlobalCss,
            v2_establishes__unhighlightedTopicsGlobalCss,
        },
    });
    var tpid2cssColor = {};
    var ROOT = '.' + cssp + '-approot';
    return;










    ///*************************************************
    /// CSS decorations and opacity for mouse non-hover,
    /// creates and updates,
    ///*************************************************
    function v2_establishes__unhighlightedTopicsGlobalCss()
    {
        var totalCss = '';
        eachprop( topics.lcaseId2allLemTopics, ( topi_c, tpid ) => {
            var { fillOpacity, strokeOpacity, rgba_own } = topi_c;
            var Rtp = ROOT + ' .tp-' + tpid;

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
${ROOT} svg image.tp-${tpid} {
    opacity : ${ sconf.SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY };
}
${ROOT} svg .tp-${tpid}.hover-width {
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
            globalCss.replace( ts, 'globalcss-'+tpid );
        });
    }
    
    
    function v2_establishes__highlightedTopicsGlobalCss( tplinks, newlyDigestedStyleId_str )
    {
        if( !tplinks || tplinks.length === 0 ) return;
        var summaryCss  = '';

        tplinks.forEach( tplinkRack => {
            var tplink_ix   = tplinkRack.tplink_ix;
            var tplink      = tplinkRack.tplink;
            
            Object.keys( tplink.tpid2true ).forEach( tpid => {
                var Rtp = ROOT + ' .tp-' + tpid;
                var Rix = ROOT + '.tp-' + tplink_ix;
                var topi_c = topics.lcaseId2allLemTopics[ tpid ];
                var ts = '';
                var { highOpacity, rgba_own} = topi_c;
                var tpOpacityHigh_str = highOpacity.toFixed(3);
                ts += `
${Rix} .tp-${tpid} {
    opacity: ${tpOpacityHigh_str};
}
                     `;
                    //competes with tobold, do we need all of them?
                    ts += `
${Rix} .tp-${tpid}.tobold,

${Rix} svg text.tp-${tpid},
${Rix} svg tspan.tp-${tpid},
${Rix} span.tp-${tpid} {
    font-weight : bold;
}
                    `;
                        ///todm: very crude and wordy stroke width control
                     ts += `
${Rix} svg .tp-${tpid}.tostroke {
    stroke-width:${ sconf.default_tp_stroke_width }px;
}
${Rix} svg .tp-${tpid}.tostroke.hover-width {
    stroke-width:${ sconf.hover_width }px;
}
                    `;
                    //todm: can be done via tpOpacityLow = 0;
                    ts += `
${Rix} .tohidden.tp-${tpid} {
    visibility:visible;
}
                `;
                globalCss.update( ts, 'globalcss-'+tpid );
            });
        });
    }
})();


