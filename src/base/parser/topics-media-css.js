( function() {
    var {
        ns,
        cssp,
        $$,
        sn,
        eachprop,
        fapp,
        sconf,
        sapp,
        ssF,
        topics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            css_4_hidden8frag8active8delayed,
            topics_media_css,
        },
    });
    var tpid2cssColor = {};
    return;









    function topics_media_css( tplinks )
    {
        colors2topicShapesCss();

        var styleStr = '';
        if( tplinks ) {
            var tpid2opac = {};
            ///got tplinks from body.document.anchors
            tplinks.forEach( tplink_ => {
                var tplink_ix = tplink_.tplink_ix;
                var tplink    = tplink_.tplink;
                prepares__highlighting_CSS({
                    tplink, tpid2opac, tplink_ix
                });
            });

            //media shape colors
            eachprop( tpid2cssColor, tp_css => {
                styleStr += tp_css;
            });

            //media shape idle-color-intensity
            //todo why tpid2opac is a dictionalry? it must be a primitive number?
            //no, it is a string, a collector of CSSes
            eachprop( tpid2opac, tp_css => {
                styleStr += tp_css;
            });

            //media shape highlited-color-intensity
            topics.ix2tplink.forEach( tplink => {
                eachprop( tplink.tpid2opac, tp_css => {
                    styleStr += tp_css;
                });
            });
        }
        return styleStr;
    }


    function colors2topicShapesCss()
    {
        eachprop( topics.normId2topic, ( topi_c, tpid ) => {
            //*********************************
            // //\\ sets colors per tpid
            //*********************************
            //high-opacity = 1:
            var thc = topi_c.rgba_high; //takes possibly fully-defined color

            tpid2cssColor[ tpid ] = `
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
            //*********************************
            // \\// sets colors per tpid
            //*********************************
        });
    }

    ///does this for media, not for anchors
    function prepares__highlighting_CSS({
        tplink, tpid2opac, tplink_ix,
    }) {

        var nonfocusOp  = sconf.TOPIC_FILL_OPACITY_NOT_IN_FOCUS + '';
        var focusOp     = sconf.TOPIC_FILL_OPACITY_IN_FOCUS + '';

        ///todo: wrong: do loop for topics not links:
        Object.keys( tplink.tpid2true ).forEach( tpid => {
            //*******************************************
            // //\\ highlighted by setting attr
            //      and manipulating opacity and bold
            //*******************************************
            tpid2opac[ tpid ] = `
                .${cssp}-approot .tp-${tpid} {
                    opacity: 0.7;
                }
                .${cssp}-approot svg .tp-${tpid} {
                    opacity : 1;
                    fill-opacity : ${nonfocusOp};
                    stroke-opacity: ${ sconf.default_tp_stroke_opacity || 0.5 };
                }
                /* special for svg-text */
                .${cssp}-approot svg text.tp-${tpid} {
                    fill-opacity : ${focusOp};
                }
            `;

            //*******************************************
            // //\\ opacity for mouse hover
            //*******************************************
            tplink.tpid2opac = tplink.tpid2opac || {};
            tplink.tpid2opac[ tpid ] = `
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
                    fill-opacity : ${focusOp};
                    stroke-opacity: 1;
                }
                .${cssp}-approot.tp-${tplink_ix} svg .tp-${tpid}.tostroke {
                    stroke-width:${ sconf.default_tp_stroke_width }px;
                }

                /* special for svg-text */
                /* highlighted */
                .${cssp}-approot.tp-${tplink_ix} svg text.tp-${tpid} {
                    fill-opacity : 1;
                }
            `;

            ///boldifies svg-text at topic highlight
            tplink.tpid2opac[ tpid ] += `
                .${cssp}-approot.tp-${tplink_ix} svg text.tp-${tpid} {
                    font-weight:bold;
                }
            `;
            //*******************************************
            // \\// opacity for mouse hover
            // \\// highlighted by setting attr
            //*******************************************
        });
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


