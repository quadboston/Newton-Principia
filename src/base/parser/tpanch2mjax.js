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
    var ccc = console.log;

    sDomF.tpanch2mjax = tpanch2mjax;
    return;








    function tpanch2mjax( domEl )
    {
        var setsAnchor_mouseHighlightEvents = sDomF.setsAnchor_mouseHighlightEvents;

        ///this search must be protected: duplicates will cause
        ///duplicate substitutions
        var delayedAns = domEl.querySelectorAll( ".delayed-anchor" );
        if( !delayedAns.length ) return;

        delayedAns.forEach( an => {
            var cls = an.className;
            var match = cls.match( /\btl-(\S*)\b/ );
            if( !match ) return;
            var delayedFar = cls.match( /\bdelayed-far\b/ );
            var tplink_ix = parseInt( match[1] );
            var sib = an;
            var targetText = an.textContent;
            var targetFound = false;
            while( sib ) {
                var sib = sib.nextSibling;
                if( !sib ) break;
                if( sib.nodeType !== Node.ELEMENT_NODE ) continue;
                if( sib.tagName === 'SCRIPT' ) continue;
                if( sib.children ) {
                    //https://stackoverflow.com/questions/8321874/
                    //how-to-get-all-childnodes-in-js-including-all-the-grandchildren
                    var grands = sib.querySelectorAll( '*' );
                    grands.forEach( grand => {
                        if( !grand.children.length ) {
                            if( grand.textContent === 'Γ' ) {
                                //ccc( 'grand.textContent=' + grand.textContent )
                            }
                            if( targetText === grand.textContent ) {
                                ////paints all matching leaf nodes in MathJax tree
                                //if( targetText === 'G' ) ccc( 'G target found', grand );
                                targetFound = true;

                                //--------------------------------------------------
                                // //\\ this "if" protects topic-anchors against
                                //--------------------------------------------------
                                //      double nesting ... the problem is that
                                //      multiple initiating |....|...|| anchors
                                //      can repeatedly convert the same element causing
                                //      this nesting ....
                                //. ...'A' ... is an extra protection against MathJax problem
                                //.            the problem was nested? wrapping into <a ...
                                if( grand.tagName !== 'A' ) {
                                    grand.innerHTML = "<a class=" + match[0] +
                                        '>' + targetText + '</a>';
                                    setsAnchor_mouseHighlightEvents( grand, tplink_ix );
                                }
                                //--------------------------------------------------
                                // \\// this "if" protects topic-anchors against
                                //--------------------------------------------------
                            }
                        }
                    });
                }
                //stops forwarding topic after first found sibling
                //delayedFar allows search beyound first discovered sibling
                if( !delayedFar && targetFound ) break;
            };
            //.important to know: this line runs after "anchors2topics" performed because
            //.it is scheduled this way by MathJax...Hub machinery
            //an.parentNode.removeChild( an ); //child.remove() for moderns
        });
    }


})();


