( function() {
    var {
        ns, sn, cssp, $$, eachprop, globalCss,
        fapp, sconf, topics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            css_4_hidden8frag8active8delayed,
            establishes__highlightedTopicsGlobalCss,
            establishes__unhighlightedTopicsGlobalCss,
        },
    });
    var tpid2cssColor = {};
    return;










    ///*************************************************
    /// CSS decorations and opacity for mouse non-hover,
    /// creates and updates,
    ///*************************************************
    function establishes__unhighlightedTopicsGlobalCss()
    {
        var totalCss = '';
        eachprop( topics.lcaseId2allLemTopics, ( topi_c, tpid ) => {

            var { highOpacity, lowOpacity, } = topi_c;
            var tpOpacityLow_str  = lowOpacity.toFixed(3); 
            var tpOpacityHigh_str = highOpacity.toFixed(3);
            //high-opacity = 1:
            var thc = topi_c.rgba_high; //takes possibly fully-defined color
            var tlc = topi_c.rgba_low; //takes possibly fully-defined color

            //*******************************************
            // //\\ creates unhovered highlighting
            //*******************************************

            //chnaged, Nov 5, 2021: from this
            //stroke-opacity: ${ sconf.default_tp_stroke_opacity || 0.5 };
            //
            totalCss += `
                .${cssp}-approot .tp-${tpid} {
                    opacity: ${tpOpacityLow_str};
                }
                .${cssp}-approot svg .tp-${tpid} {
                    opacity : 1;

                    fill-opacity : ${tpOpacityLow_str};
                    stroke-opacity: ${tpOpacityLow_str};
                }
            `;

            //add on for svg <image>, Oct 23, 2021
            totalCss += `
                .${cssp}-approot svg image.tp-${tpid} {
                    opacity : ${ sconf.SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY };
                }
            `;
            //text grows by bodl
            totalCss += `
                /* special for svg-text */
                .${cssp}-approot svg tspan.tp-${tpid},
                .${cssp}-approot svg text.tp-${tpid} {
                    fill-opacity : ${tpOpacityHigh_str};
                }
            `;
            //*******************************************
            // \\// creates unhovered highlighting
            //*******************************************

            //*********************************
            // //\\ creates colors per tpid
            //*********************************

            
            //excessive, possibly not required
            //                .bsl-approot .tp-force.tocolor {
            //                .bsl-simscene svg text
            /*
                .bsl-simscene svg text.tofill.tp-${tpid},
                .bsl-simscene svg tspan.tofill.tp-${tpid}
                {
                   fill : ${thc};
                }
                .bsl-simscene svg text.tostroke.tp-${tpid},
                .bsl-simscene svg tspan.tostroke.tp-${tpid}
                {
                   stroke : ${thc};
                }
            */
            /*
             * bugs:
            totalCss += `
                  
                .${cssp}-approot .tp-${tpid}.tocolor {
                   color : ${thc};
                }
                .${cssp}-approot .tp-${tpid}.tobg {
                   background-color : ${thc};
                }
                .${cssp}-approot svg .tp-${tpid}.tofill {
                   fill : ${thc};
                }
                .${cssp}-approot svg .tp-${tpid}.tostroke {
                   stroke-linecap : round;
                   stroke : ${thc};
                }
                .${cssp}-approot svg .tp-${tpid}.hover-width {
                    stroke-width:${ sconf.nonhover_width }px;
                }
                
                .${cssp}-approot svg tspan.tp-${tpid}.hover-width,
                .${cssp}-approot svg text.tp-${tpid}.hover-width {
                    stroke-width:${ sconf.text_nonhover_width }px;
                }
            `;
            */
            totalCss += `
                  
                .${cssp}-approot .tp-${tpid}.tocolor {
                   color : ${tlc};
                }
                .${cssp}-approot .tp-${tpid}.tobg {
                   background-color : ${tlc};
                }
                .${cssp}-approot svg .tp-${tpid}.tofill {
                   fill : ${tlc};
                }
                .${cssp}-approot svg .tp-${tpid}.tostroke {
                   stroke-linecap : round;
                   stroke : ${tlc};
                }
                .${cssp}-approot svg .tp-${tpid}.hover-width {
                    stroke-width:${ sconf.nonhover_width }px;
                }
                
                .${cssp}-approot svg tspan.tp-${tpid}.hover-width,
                .${cssp}-approot svg text.tp-${tpid}.hover-width {
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

                var topi_c = topics.lcaseId2allLemTopics[ tpid ];
                var { highOpacity, lowOpacity, } = topi_c;
                var tpOpacityLow_str  = lowOpacity.toFixed(3); 
                var tpOpacityHigh_str = highOpacity.toFixed(3);
                var thc = topi_c.rgba_high; //takes possibly fully-defined color
                var tlc = topi_c.rgba_low; //takes possibly fully-defined color
                summaryCss += `
                    .${cssp}-approot.tp-${tplink_ix} .tp-${tpid} {
                        opacity: 1;
                    }
                    .${cssp}-approot.tp-${tplink_ix} .tohidden.tp-${tpid} {
                        visibility:visible;
                    }
                    /* does bold on anchor hover */
                    .${cssp}-approot.tp-${tplink_ix} .tp-${tpid}.tobold {
                       font-weight : bold;
                    }

                    .${cssp}-approot.tp-${tplink_ix} svg .tp-${tpid} {
                        /* this is ineffective for svg-images, use element's opacity instead: */
                        fill-opacity : ${tpOpacityHigh_str};

                        stroke-opacity: ${tpOpacityHigh_str};
                    }
                    .${cssp}-approot.tp-${tplink_ix} svg .tp-${tpid}.tostroke {
                        stroke-width:${ sconf.default_tp_stroke_width }px;
                    }
                    .${cssp}-approot.tp-${tplink_ix} svg .tp-${tpid}.tostroke.hover-width {
                        stroke-width:${ sconf.hover_width }px;
                    }

                    .${cssp}-approot.tp-${tplink_ix} svg tspan.tp-${tpid}.tostroke.hover-width,
                    .${cssp}-approot.tp-${tplink_ix} svg text.tp-${tpid}.tostroke.hover-width {
                        stroke-width:${ sconf.text_hover_width }px;
                    }

                    /* special for svg-text */
                    /* highlighted */
                    .${cssp}-approot.tp-${tplink_ix} svg tspan.tp-${tpid},
                    .${cssp}-approot.tp-${tplink_ix} svg text.tp-${tpid} {
                        fill-opacity : ${tpOpacityHigh_str};
                    }
                `;

                ///boldifies svg-text at topic highlight,
                ///boldifies span-text,
                summaryCss += `
                    .${cssp}-approot.tp-${tplink_ix} svg text.tp-${tpid},
                    .${cssp}-approot.tp-${tplink_ix} svg tspan.tp-${tpid}
                    {
                        font-weight:bold;
                    }
                    .${cssp}-approot.tp-${tplink_ix} span.tp-${tpid} {
                        font-weight : bold;
                    }
                `;
                

                //todo experiment
                summaryCss += `
                    .${cssp}-approot .tp-${tpid}.tocolor {
                    color : ${thc};
                    }
                    .${cssp}-approot .tp-${tpid}.tobg {
                    background-color : ${thc};
                    }
                    .${cssp}-approot svg .tp-${tpid}.tofill {
                    fill : ${thc};
                    }
                    .${cssp}-approot svg .tp-${tpid}.tostroke {
                    stroke-linecap : round;
                    stroke : ${thc};
                    }
                `;
                
            });
        });
        globalCss.add8update( summaryCss,
            newlyDigestedStyleId_str || 'highlighted-topics-global-css' );
    }





    ///todo: this sub. must be outside of topics-module
    function css_4_hidden8frag8active8delayed()
    {
        ///generic "tohidden"
        styleStr = `
            .${cssp}-approot .tohidden {
                visibility: hidden;
            }
        `;

        ///generic hidden and visible fragments in content:
        //this works by toggling css-class in application code like:
        //      sDomN.essaionsRoot$.removeClass( 'active-left' );
        //      sDomN.essaionsRoot$.addClass( 'active-right' );
        //      apparenlty these marks are from the same set:
        //          'active-right', .active-static, ...
        //          they are a part of do-feedback-from-diagram-model-to-Book-text,
        styleStr += `
            .${cssp}-text-widget .exeg-frag {
                display : none;
            }
            .${cssp}-text-widget .active-static {
                display : inline;
            }
        `;

        ///?hidden? delayed anchor
        styleStr += `
            .${cssp}-text-widget .delayed-far,
            .${cssp}-text-widget .delayed-anchor {
                display : none;
            }
        `;
        return styleStr;
    }

})();


