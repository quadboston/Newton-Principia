( function() {
    var {
        haz, fapp, sconf, ssF, topics, topicColors_repo
    } = window.b$l.apptree({
        ssFExportList : {
            topics_anchor_css,
            setsAnchor_mouseHighlightEvents,
        },
    });
    return;


    ///Input:   domEl - anchors are collected in scope of this element
    function topics_anchor_css( domEl )
    {
        var styleStr = '';
        var nextTplinks = [];

        domEl = domEl || fapp.fappRoot$();
        var allAnchors = domEl.querySelectorAll( 'a' );
        if( allAnchors ) {
            var anchors__cssHighlighter = { value : '' };

            ///at this point, anchors should be completely prepared
            ///with given design, we cannot index anchors before,
            ///because they are introduced as part of the text and
            ///we have to find them again by flag "tl-DDDD" in className,
            allAnchors.forEach( anchor => {
                var cls = anchor.className;
                var match = cls.match( /tl-(\S*)/ );
                if( !match ) return;
                var tplink_ix = parseInt( match[1] );
                var anrack    = topics.anix2anrack[ tplink_ix ];
                assigns_color_to_anchor({ anrack, anchors__cssHighlighter, });
                setsAnchor_mouseHighlightEvents( anchor, tplink_ix );
                nextTplinks[tplink_ix] = anrack;
            });
            //anchor colors
            styleStr += anchors__cssHighlighter.value;
        }
        return { styleAnchors:styleStr, nextTplinks };
    }


    ///-----------------------------
    /// assigns color to anchor
    ///-----------------------------
    function assigns_color_to_anchor({
        anrack,
        anchors__cssHighlighter,
    }) {
        var tplink_ix = anrack.tplink_ix;
        var tpIDs = Object.keys( anrack.tpid2true );

        var notfocusOp_str = sconf.ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS.toFixed(3);
        var focusOp_str = sconf.ANCHOR_TOPIC__OPACITY_IN_FOCUS.toFixed(3)
        var fixedCol = haz( anrack, 'tpcolarr' );
        //selects the very first color-operand from anchor
        var gcssRack = topics.lowtpid_2_glocss8anchorRack[ tpIDs[0] ];
        if( fixedCol ) {
            //note: high opacity is taken as sconf.TP_OPACITY_HIGH in this ver
            var { rgb, rgba_high, } = ssF.colorArray_2_rgba(
                    [fixedCol[0],fixedCol[1],fixedCol[2],0.7, 1],
                    true,
                    sconf.TP_OPACITY_FROM_fixed_colors
            );
        } else if( tpIDs.length === 0 ) {
            ////safety case: no topics exist in collection,
            ////setting default anchor color
            var rgba_high = sconf.ANCHOR_DEFAULT_COLOR;
        } else {
            // see *gcssRack properties*
            //var { rgb, rgba_high, } = gcssRack;
            ////anrack which comprised of more than one topics,
            //.gets color of the first topic in link's topics collection
            var rgba_high = gcssRack.rgba_high;
        }
        var forAnchor = ( gcssRack && gcssRack.forAnchor ) || rgba_high; //patch

        var rgb_low = forAnchor.replace( /,[^,]+$/, ',' +
                        sconf.ANCHOR_OPACITY_LOW + ')' );
        var rgba_high = forAnchor.replace( /,[^,]+$/, ',' +
                        sconf.ANCHOR_OPACITY_HIGH + ')' );

        //  apparently padding highlighted anchor does bloat MathJax font,
        //  so, padding is disabled
        let tplink_str = 'a.tl-'+tplink_ix;

        //todm needs more work to proofcheck other texts:
        let baseColor = sconf.ITEM_BASE_COLOR_TO_ANCHOR ? rgb_low : rgba_high;

        // adjust darkness with second param
        // decrease to make darker, increase to lighten
        baseColor = adjustRGBA(baseColor, 1);

        anchors__cssHighlighter.value += `
            ${tplink_str} {
               border-radius : 4px;
               color         : ${baseColor};
               opacity       : ${notfocusOp_str};
               font-weight   : ${ anrack.anchorIsBold ? 'bold' : 'normal' };
            }
            ${tplink_str}:hover {
               opacity          : ${focusOp_str};
               background-color : rgb(${topicColors_repo.highlight});
               cursor           : default;
            }
            ${tplink_str}:hover span{
               font-weight      : bold;
               background-color : rgb(${topicColors_repo.highlight});
               cursor           : default;
            }
        `;
    }

    function adjustRGBA(rgbaString, factor) {
        // Extract numbers from rgba(...) string
        const match = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (!match) throw new Error("Invalid RGBA format");

        let [ , r, g, b, a ] = match;
        r = Math.min(255, Math.max(0, parseInt(r) * factor));
        g = Math.min(255, Math.max(0, parseInt(g) * factor));
        b = Math.min(255, Math.max(0, parseInt(b) * factor));
        a = parseFloat(a); // alpha unchanged

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    function setsAnchor_mouseHighlightEvents( anchor, coreName )
    {
        anchor.addEventListener( 'mouseover', ev => {
            fapp.fappRoot$.addClass( 'tp-' + coreName );
        });
        anchor.addEventListener( 'mouseleave', ev => {
            fapp.fappRoot$.removeClass( 'tp-' + coreName );
        });
    }
})();


