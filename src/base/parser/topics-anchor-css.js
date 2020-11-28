( function() {
    var {
        ns,
        cssp,
        $$,
        sn,
        fapp,
        sconf,
        sapp,
        ssF,
        topics,
    } = window.b$l.apptree({
        ssFExportList :
        {
            topics_anchor_css,
            setsAnchor_mouseHighlightEvents,
        },
    });
    var appRoot$;
    return;













    function topics_anchor_css()
    {
        var styleStr = '';
        var tplinks = [];

        appRoot$ = fapp.fappRoot$;
        var allAnchors = $$.qa( "a" )();
        if( allAnchors ) {
            var anchors__cssHighlighter = { value : '' };

            ///at this point, anchors should be completely prepared
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

        var ww = ns.haz( tplink, 'fixed-color' );
        if( ww ) {
            var { rgba_low, rgba_high } = ssF.colorArray_2_rgba( ww ); //high op = 1

        } else if( tpIDs.length === 0 ) {
            ////safety case: no topics exist in collection,
            ////setting default anchor color
            var rgba_low = 'rgba( 150, 0, 150, 0.7 )';
            var rgba_high = 'rgba( 150, 0, 150, 1 )';

        } else {
            ////tplink which comprised of more than one topics,
            //.gets color of the first topic in link's topics collection
            var topi_c = topics.normId2topic[ tpIDs[0] ];
            var ww = ns.haz( topi_c, 'fixed-color' );
            if( ww ) {
                var { rgba_low, rgba_high } = ssF.colorArray_2_rgba( ww ); //high op = 1
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


