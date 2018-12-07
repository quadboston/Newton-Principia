/*
    Creates threshold point in @media ... and
    sets the test-method to test mobile mode.
    At completion the test, calls callback if any supplied.
*/
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var cssp        = ns.CSS_PREFIX;




    ///=========================================================
    /// constructs mobile_tester
    ///=========================================================
    ns.create_mobile_tester = function( domElToAttachTo, mediaThreshold )
    {
        var tester = $$
           .c( 'div' )
           .css( 'position', 'absolute' )
           .css( 'visibility', 'hidden' )
           .addClass( cssp+'-mobile-width-detector' )
           .to( domElToAttachTo )
           ;

        $$ .c( 'style' )
           .to( document.head )
           .html( `
                .bsl-mobile-width-detector {
                    width:200px;
                }
                @media only screen and (max-width: ${mediaThreshold}px) {
                    .bsl-mobile-width-detector {
                        width:100px;
                    }
                }
           `);
        
        ns.test_mobile_mode = function( cb )
        {
            var testWidth = tester().getBoundingClientRect().width;
            if( testWidth <150 ) {
                var mobile = true;
            } else {
                var mobile = false;
            }
            cb && cb(mobile);
        };
    }

}) ();

