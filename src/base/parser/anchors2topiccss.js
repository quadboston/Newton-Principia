( function() {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var topics      = sn('topics', ssD);

    var qq = document.querySelector;
    var qqa = document.querySelectorAll;
    var appRoot$;
    var ccc = console.log;

    sDomF.tpAnchors_2_anchors8media_css = tpAnchors_2_anchors8media_css;
    sDomF.setsAnchor_mouseHighlightEvents = setsAnchor_mouseHighlightEvents;
    return;







    function tpAnchors_2_anchors8media_css()
    {
        appRoot$ = fapp.fappRoot$;
        var allAnchors = $$.qa( "a" )();
        if( !allAnchors ) return;

        var style = document.createElement( 'style' );
        document.head.appendChild( style );
        var anchors__cssHighlighter = { value : '' };
        var tpid2cssColor = {};
        var tpid2opac = {};

        ///enables non-hilighted and tohidden as "hidden" state
        styleStr = `
            .${cssp}-approot .tohidden {
                visibility: hidden;
            }
        `;

        ///at this point, anchors should be completely prepared
        allAnchors.forEach( anchor => {
            var cls = anchor.className;
            var match = cls.match( /tl-(\S*)/ );
            if( !match ) return;
            var tplink_ix = parseInt( match[1] );
            var tplink    = topics.ix2tplink[ tplink_ix ];
            assigns_color_to_anchor({ tplink, anchors__cssHighlighter, });
            setsAnchor_mouseHighlightEvents( anchor, tplink_ix );
            prepares__highlighting_CSS({
                tplink, tpid2cssColor, tpid2opac, tplink_ix
            });
        });

        /*
            todo:
                resolve bug when no topic is mentioned in text, but
                topic-geometrics exist in svg, it has no correct coloring;

                apparently, we have to add tp-${tplink_ix} for non-used
                topic ( fixed-colors )
            aka:
            fixedColors.forEach( colId => {
                if( colId.isAlreadyPainted ) return;
                prepares__highlighting_CSS({
                    colId, tpid2cssColor, tpid2opac, tplink_ix
                });
            });
        */


        //-----------------------------------------------------------
        // //\\ inserts tp-highlight-machinery css into html-document
        //-----------------------------------------------------------
        //essay's anchor colors
        styleStr += anchors__cssHighlighter.value;

        //media shape colors
        ns.eachprop( tpid2cssColor, tp_css => {
            styleStr += tp_css;
        });

        //media shape idle-color-intensity
        //todo why tpid2opac is a dictionalry? it must be a primitive number?
        //no, it is a string, a collector of CSSes
        ns.eachprop( tpid2opac, tp_css => {
            styleStr += tp_css;
        });

        //media shape highlited-color-intensity
        topics.ix2tplink.forEach( tplink => {
            ns.eachprop( tplink.tpid2opac, tp_css => {
                styleStr += tp_css;
            });
        });

        style.innerHTML = styleStr;
        //-----------------------------------------------------------
        // \\// inserts tp-highlight-machinery css into html-document
        //-----------------------------------------------------------
    }


    ///-----------------------------
    /// assigns color to anchor
    ///-----------------------------
    function assigns_color_to_anchor({
        tplink,
        anchors__cssHighlighter,
    }) {
        var tplink_ix = tplink.tplink_ix;
        var tpIDs = Object.keys( tplink.tpid2true );

        var ww = ns.haz( tplink, 'fixed-color' );
        if( ww ) {
            var { rgba_low, rgba_high } = sDomF.colorArray_2_rgba( ww );

        } else if( tpIDs.length === 0 ) {
            ////security case: no topics exist in collection,
            ////setting default anchor color
            var rgba_low = 'rgba( 150, 0, 150, 0.7 )';
            var rgba_high = 'rgba( 150, 0, 150, 1 )';

        } else {
            ////tplink which comprised of more than one topics,
            //.gets color of the first topic in link's topics collection
            var topi_c = topics.id2topic[ tpIDs[0] ];
            var ww = ns.haz( topi_c, 'fixed-color' );
            if( ww ) {
                var { rgba_low, rgba_high } = sDomF.colorArray_2_rgba( ww );
            } else {
                var rgba_low = topi_c.rgba_low;
                var rgba_high = topi_c.rgba_high;
            }
        }

        //  apparently padding highlighted anchor does bloat MathJax font,
        //  so, padding is disabled
        anchors__cssHighlighter.value += `
            a.tl-${tplink_ix + ''} {
               border-radius:4px;
               color:${rgba_high};
               opacity:0.8;
               font-weight : ${ tplink.anchorIsBold ? 'bold' : 'normal' };
            }
            a.tl-${tplink_ix + ''}:hover {
               opacity:1;
               background-color:#eaeaea;
               cursor:default;
            }
            a.tl-${tplink_ix + ''}:hover span{
               font-weight :bold;
               background-color:#eaeaea;
               cursor:default;
            }
        `;
    }



    ///does this for media, not for anchors
    function prepares__highlighting_CSS({
        tplink, tpid2cssColor, tpid2opac, tplink_ix,
    }) {

        var nonfocusOp  = sconf.TOPIC_FILL_OPACITY_NOT_IN_FOCUS + '';
        var focusOp     = sconf.TOPIC_FILL_OPACITY_IN_FOCUS + '';

        Object.keys( tplink.tpid2true ).forEach( tpid => {

            //=================================
            // //\\ sets colors per tpid
            //=================================
            if( !tplink.cssNoColorToShapes ) {
                //recall: ssD.topics.id2topic ...
                var topi_c = topics.id2topic[ tpid ];
                var thc = topi_c.rgba_high;
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
            }
            //=================================
            // \\// sets colors per tpid
            //=================================

            //===========================================
            // //\\ highlighted by setting attr
            //      and manipulating opacity and bold
            //===========================================
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
            //===========================================
            // \\// highlighted by setting attr
            //===========================================
        });
    }





    function setsAnchor_mouseHighlightEvents( anchor, coreName )
    {
        anchor.addEventListener( 'mouseover', ev => {
            appRoot$.addClass( 'tp-' + coreName );
        });
        anchor.addEventListener( 'mouseleave', ev => {
            appRoot$.removeClass( 'tp-' + coreName );
        });
    }

})();


