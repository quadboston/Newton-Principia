( function() {
    var {
        sn, haz, fapp, sconf, ssF,
        topics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            topics_anchor_css,
            setsAnchor_mouseHighlightEvents,
        },
    });
    return;












    ///Input:   domEl - anchors are collected in scope of this element
    function topics_anchor_css( domEl )
    {
        var styleStr = '';
        var tplinks = [];

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
                var tplink    = topics.ix2tplink[ tplink_ix ];
                assigns_color_to_anchor({ tplink, anchors__cssHighlighter, });
                setsAnchor_mouseHighlightEvents( anchor, tplink_ix );
                tplinks.push({ tplink_ix,  tplink });
            });
            //anchor colors
            styleStr += anchors__cssHighlighter.value;
        }
        return { styleAnchors:styleStr, tplinks };
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

        var notfocusOp_str = sconf.ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS.toFixed(3);
        var focusOp_str = sconf.ANCHOR_TOPIC__OPACITY_IN_FOCUS.toFixed(3)
        var fixedCol = haz( tplink, 'fixed-color' );
        if( fixedCol ) {
            //note: high opacity is taken as sconf.TP_OPACITY_HIGH in this ver
            var { rgb, rgba_high, } = ssF.colorArray_2_rgba(
                    [fixedCol[0],fixedCol[1],fixedCol[2],0.7, 1],
                    sconf.TP_SATUR_FROM_fixed_colors,
                    sconf.TP_OPACITY_FROM_fixed_colors
            );
        } else if( tpIDs.length === 0 ) {
            ////safety case: no topics exist in collection,
            ////setting default anchor color
            var rgba_high = 'rgba( 150, 0, 150, 1 )';
        } else {
            ////tplink which comprised of more than one topics,
            //.gets color of the first topic in link's topics collection
            var topi_c = topics.lcaseId2allLemTopics[ tpIDs[0] ];
            // see *topi_c properties*
            //var { rgb, rgba_high, } = topi_c;
            var rgba_high = topi_c.rgba_high;
        }
        var rgb_low = rgba_high.replace( /,[^,]+$/, ',0.7)' );
        var rgba_high = rgba_high.replace( /,[^,]+$/, ',1)' );
        //c cc( rgb_low, rgba_high );

        //  apparently padding highlighted anchor does bloat MathJax font,
        //  so, padding is disabled
        let tplink_str = 'a.tl-'+tplink_ix;
        
        //todm needs more work to proofcheck other texts:
        let baseColor = sconf.ITEM_BASE_COLOR_TO_ANCHOR ? rgb_low : rgba_high;

        //if( tpIDs[0] === 'circ-txt' ) {
            //ccc( tplink_ix + ' col='+ rgba_high + ` ${rgba_high} ${tplink_str}` + ' ids=', tpIDs, topi_c );
        //}
        
        anchors__cssHighlighter.value += `
            ${tplink_str} {
               border-radius : 4px;
               color         : ${baseColor};
               opacity       : ${notfocusOp_str};
               font-weight   : ${ tplink.anchorIsBold ? 'bold' : 'normal' };
            }
            ${tplink_str}:hover {
               opacity          : ${focusOp_str};
               background-color : #eaeaea;
               cursor           : default;
            }
            ${tplink_str}:hover span{
               font-weight      : bold;
               background-color : #eaeaea;
               cursor           : default;
            }
        `;
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


