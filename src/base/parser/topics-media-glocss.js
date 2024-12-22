( function() {
    var {
        ns, sn, cssp, $$, eachprop, globalCss, nsmethods,
        fapp, sconf, topics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            establishes__highlightedTopicsGlobalCss,
            establishes__unhighlightedTopicsGlobalCss,
        },
    });
    var tpid2cssColor = {};
    var ROOT = '.' + cssp + '-approot';
    return;










    ///*************************************************
    /// CSS decorations and opacity for mouse non-hover,
    /// creates and updates,
    ///*************************************************
    function establishes__unhighlightedTopicsGlobalCss()
    {
        var totalCss = '';
        eachprop( topics.lcaseId2allLemTopics, ( topi_c, tpid ) => {
            var Rtp = ROOT + ' .tp-' + tpid;
            var { highOpacity, lowOpacity, } = topi_c;
            var tpOpacityLow_str  = lowOpacity.toFixed(3); 
            var tpOpacityHigh_str = highOpacity.toFixed(3);
            //high-opacity = 1:
            var thc = topi_c.rgba_high; //takes possibly fully-defined color
            var tlc = topi_c.rgba_low; //takes possibly fully-defined color

            //*******************************************
            // //\\ creates unhovered highlighting
            //*******************************************
            totalCss += `
                ${Rtp} {
                    opacity: ${tpOpacityLow_str};
                }
                ${ROOT} svg .tp-${tpid} {
                    opacity : 1;
                    fill-opacity : ${tpOpacityLow_str};
                    stroke-opacity: ${tpOpacityLow_str};
                }
            `;

            //add on for svg <image>, Oct 23, 2021
            totalCss += `
                ${ROOT} svg image.tp-${tpid} {
                    opacity : ${ sconf.SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY };
                }
            `;

            //*********************************
            // //\\ creates colors per tpid
            //*********************************
            totalCss += `
                ${Rtp}.tocolor {
                   color : ${tlc};
                }
                ${Rtp}.tobg {
                   background-color : ${tlc};
                }
                ${ROOT} svg .tp-${tpid}.tofill {
                   fill : ${tlc};
                }
                ${ROOT} svg .tp-${tpid}.tostroke {
                   stroke-linecap : round;
                   stroke : ${tlc};
                }
                ${ROOT} svg .tp-${tpid}.hover-width {
                    stroke-width:${ sconf.nonhover_width }px;
                }
                
                ${ROOT} svg tspan.tp-${tpid}.hover-width,
                ${ROOT} svg text.tp-${tpid}.hover-width {
                    stroke-width:${ sconf.text_nonhover_width }px;
                }
            `;
            //*********************************
            // \\// creates colors per tpid
            //*********************************
        });
        //globalCss.add8update( totalCss, 'unhighlighted-topics-global-css' ); //ruins css
        globalCss.replace( totalCss, 'unhighlighted-topics-global-css' );
    }


    ///*********************************************
    /// CSS decorations and opacity for mouse hover,
    /// creates and updates,
    ///*********************************************
    function establishes__highlightedTopicsGlobalCss( tplinks, newlyDigestedStyleId_str )
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

                var { highOpacity, lowOpacity, } = topi_c;
                var tpOpacityLow_str  = lowOpacity.toFixed(3); 
                var tpOpacityHigh_str = highOpacity.toFixed(3);
                var thc = topi_c.rgba_high; //takes possibly fully-defined color
                var tlc = topi_c.rgba_low; //takes possibly fully-defined color
                summaryCss += `
                    ${Rix} .tp-${tpid} {
                        opacity: 1;
                    }
                    ${Rix} .tohidden.tp-${tpid} {
                        visibility:visible;
                    }
                    /* does bold on anchor hover */
                    ${Rix} .tp-${tpid}.tobold {
                       font-weight: bold;
                    }

                    ${Rix} svg .tp-${tpid} {
                        /* this is ineffective for svg-images, use element's opacity instead: */
                        fill-opacity: ${tpOpacityHigh_str};
                        stroke-opacity: ${tpOpacityHigh_str};
                    }
                    ${Rix} svg .tp-${tpid}.tostroke {
                        stroke-width:${sconf.default_tp_stroke_width }px;
                    }
                    ${Rix} svg .tp-${tpid}.tostroke.hover-width {
                        stroke-width:${sconf.hover_width }px;
                    }

                    ${Rix} svg tspan.tp-${tpid}.tostroke.hover-width,
                    ${Rix} svg text.tp-${tpid}.tostroke.hover-width {
                        stroke-width:${sconf.text_hover_width }px;
                    }

                    /* special for svg-text */
                    /* highlighted */
                    ${Rix} svg tspan.tp-${tpid},
                    ${Rix} svg text.tp-${tpid} {
                        fill-opacity : ${tpOpacityHigh_str};
                    }
                `;

                ///boldifies svg-text at topic highlight,
                ///boldifies span-text,
                summaryCss += `
                    ${Rix} svg text.tp-${tpid},
                    ${Rix} svg tspan.tp-${tpid},
                    ${Rix} span.tp-${tpid} {
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
                    ${ROOT} svg .tp-${tpid}.tofill {
                    fill : ${thc};
                    }
                    ${ROOT} svg .tp-${tpid}.tostroke {
                    stroke-linecap : round;
                    stroke : ${thc};
                    }
                `;
                
            });
        });
        globalCss.add8update( summaryCss,
            newlyDigestedStyleId_str || 'highlighted-topics-global-css' );
    }

})();


