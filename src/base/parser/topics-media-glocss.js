( function() {
    var {
        ns, sn, cssp, $$, eachprop, globalCss, nsmethods,
        fapp, sconf, topics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            tplinks_2_highlightCss,
            topics_2_unhighCss,
        },
    });
    var tpid2cssColor = {};
    var ROOT = '.' + cssp + '-approot';
    return;










    ///*************************************************
    /// CSS decorations and opacity for mouse non-hover,
    /// creates and updates,
    ///*************************************************
    function topics_2_unhighCss()
    {
        eachprop( topics.lowId2topics, ( topi_c, lowId ) => {
            var Rtp = ROOT + ' .tp-' + lowId;
            var { highOpacity, lowOpacity, } = topi_c;
            var tpOpacityLow_str  = lowOpacity.toFixed(3); 
            var tpOpacityHigh_str = highOpacity.toFixed(3);
            //high-opacity = 1:
            var thc = topi_c.rgba_high; //takes possibly fully-defined color
            var tlc = topi_c.rgba_low; //takes possibly fully-defined color
            var totalCss = '';

            //*******************************************
            // //\\ creates unhovered highlighting
            //*******************************************
            totalCss += `
                ${Rtp} {
                    opacity: ${tpOpacityLow_str};
                }
                ${ROOT} svg .tp-${lowId} {
                    opacity : 1;
                    fill-opacity : ${tpOpacityLow_str};
                    stroke-opacity: ${tpOpacityLow_str};
                }
            `;

            //add on for svg <image>, Oct 23, 2021
            totalCss += `
                ${ROOT} svg image.tp-${lowId} {
                    opacity : ${ sconf.SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY };
                }
            `;

            //*********************************
            // //\\ creates colors per lowId
            //*********************************
            totalCss += `
                ${Rtp}.tocolor {
                   color : ${tlc};
                }
                ${Rtp}.tobg {
                   background-color : ${tlc};
                }
                ${ROOT} svg .tp-${lowId}.tofill {
                   fill : ${tlc};
                }
                ${ROOT} svg .tp-${lowId}.tostroke {
                   stroke-linecap : round;
                   stroke : ${tlc};
                }
                ${ROOT} svg .tp-${lowId}.hover-width {
                    stroke-width:${ sconf.nonhover_width }px;
                }
                
                ${ROOT} svg tspan.tp-${lowId}.hover-width,
                ${ROOT} svg text.tp-${lowId}.hover-width {
                    stroke-width:${ sconf.text_nonhover_width }px;
                }
            `;
            //*********************************
            // \\// creates colors per lowId
            //*********************************
            totalCss && globalCss.update( totalCss, 'glocss-id-'+lowId );
        });
    }


    ///*********************************************
    /// CSS decorations and opacity for mouse hover,
    /// creates and updates,
    ///*********************************************
    function tplinks_2_highlightCss( nextTplinks )
    {
        nextTplinks.forEach( (tplink,tplink_ix) => {
            Object.keys( tplink.tpid2true ).forEach( lowId => {
                var summaryCss  = '';
                var Rtp = ROOT + ' .tp-' + lowId;
                var Rix = ROOT + '.tp-' + tplink_ix;
                var topi_c = topics.lowId2topics[ lowId ];
                var { highOpacity, lowOpacity, } = topi_c;
                var tpOpacityLow_str  = lowOpacity.toFixed(3); 
                var tpOpacityHigh_str = highOpacity.toFixed(3);
                var thc = topi_c.rgba_high; //takes possibly fully-defined color
                var tlc = topi_c.rgba_low; //takes possibly fully-defined color
                summaryCss += `
                    ${Rix} .tp-${lowId} {
                        opacity: 1;
                    }
                    ${Rix} .tohidden.tp-${lowId} {
                        visibility:visible;
                    }
                    /* does bold on anchor hover */
                    ${Rix} .tp-${lowId}.tobold {
                       font-weight: bold;
                    }

                    ${Rix} svg .tp-${lowId} {
                        /* this is ineffective for svg-images, use element's opacity instead: */
                        fill-opacity: ${tpOpacityHigh_str};
                        stroke-opacity: ${tpOpacityHigh_str};
                    }
                    ${Rix} svg .tp-${lowId}.tostroke {
                        stroke-width:${sconf.default_tp_stroke_width }px;
                    }
                    ${Rix} svg .tp-${lowId}.tostroke.hover-width {
                        stroke-width:${sconf.hover_width }px;
                    }

                    ${Rix} svg tspan.tp-${lowId}.tostroke.hover-width,
                    ${Rix} svg text.tp-${lowId}.tostroke.hover-width {
                        stroke-width:${sconf.text_hover_width }px;
                    }

                    /* special for svg-text */
                    /* highlighted */
                    ${Rix} svg tspan.tp-${lowId},
                    ${Rix} svg text.tp-${lowId} {
                        fill-opacity : ${tpOpacityHigh_str};
                    }
                `;

                ///boldifies svg-text at topic highlight,
                ///boldifies span-text,
                summaryCss += `
                    ${Rix} svg text.tp-${lowId},
                    ${Rix} svg tspan.tp-${lowId},
                    ${Rix} span.tp-${lowId} {
                        font-weight : bold;
                    }
                `;
                

                //todo experiment
                summaryCss += `
                    ${Rtp}.tocolor {
                    color : ${thc};
                    }
                    ${Rtp}.tobg {
                    background-color : ${thc};
                    }
                    ${ROOT} svg .tp-${lowId}.tofill {
                    fill : ${thc};
                    }
                    ${ROOT} svg .tp-${lowId}.tostroke {
                    stroke-linecap : round;
                    stroke : ${thc};
                    }
                `;
                summaryCss && globalCss.replace( summaryCss, 'glocss-id-' + lowId + '-glocss-ix-'+tplink_ix );
            });
        });
    }

})();


