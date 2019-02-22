/*
    Enables width detection synch between media-query and JS.
    Creates threshold point in @media ... and
    sets the JS-test-method to this threshold.

    The test-method can be called from JavaScript with two methods
    of test enabled: boolean test value return and callback.
*/
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var cssp        = ns.CSS_PREFIX;

    ns.widthThresholds = {};
    ns.create_mobile_tester = create_mobile_tester;
    return;







    ///=========================================================
    /// Creates media query, test-probe-div, and test-method.
    ///=========================================================
    function create_mobile_tester( domElToAttachTo, mediaThreshold )
    {
        var thresId = ''+mediaThreshold;
        if( ns.widthThresholds[ thresId ] ) return;
        var cls = cssp+'-mobile-width-detector-'+mediaThreshold;
        var tester = $$
           .dct( cls, domElToAttachTo )
           .css( 'position', 'absolute' )
           .css( 'visibility', 'hidden' );

        $$ .style()
           .to( document.head )
           .html( `
                .${cls} {
                    width:200px;
                }
                @media only screen and (max-width: ${mediaThreshold}px) {
                    .${cls} {
                        width:100px;
                    }
                }
           `);
        
        ns.widthThresholds[ thresId ] = function( cb )
        {
            var testWidth = tester().getBoundingClientRect().width;
            var mobile = testWidth <150;
            cb && cb(mobile);
            return mobile;
        };
    }

}) ();

