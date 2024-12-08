/*
    This is not mobile detector. This is a JS/CSS syncer.
    Enables width detection synch between media-query and JS.
    Creates threshold point in @media ... and
    sets the JS-test-method to this threshold.

    The test-method can be called from JavaScript with two methods
    of test enabled: boolean test value return and callback.
*/
( function() {
    var {
        ns, sn, cssp, $$, globalCss,
        fconf,
    } = window.b$l.apptree({
    });
    ns.widthThresholds = {};
    ns.create_mobile_tester = create_mobile_tester;
    return;







    ///=============================================================
    /// Creates test-probe-div accoring to device screen dimensions.
    /// test-probe-div contains a flag which can be probed
    /// by js code at any time.
    /// The "probe function" is ns.widthThresholds[ thresId ]()
    ///     return value === true for
    ///         mobile dimensions
    /// and has
    ///     a call back with arg with the similar values
    /*
        These dimensions in "logic of OR" are preset in fconf:
        MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD : xxxx,
        MOBILE_MEDIA_QUERY_HEIGHT_THRESHOLD : yyyy,

            tester.box().width; which is either 100 or 200 px,
            if( testWidth <150; ) then application uses mobile
            scenatio for code and for css
    */
    /// (Creates media query and test-method.)
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

        //we can use globalCss.update(,
        //but like "vanilla js solution" and
        //don't like named style tag
        $$ .style()
           .to( document.head )
           .html( `
                .${cls} {
                    width:200px;
                }
           
                @media screen and (max-width: ${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px), 
                       screen and (max-height: ${fconf.MOBILE_MEDIA_QUERY_HEIGHT_THRESHOLD}px) {
                    .${cls} {
                        width:100px;
                    }
                }
           `);

        ns.widthThresholds[ thresId ] = function( cb )
        {
            var testWidth = tester.box().width;
            //c cc( 'testWidth '+testWidth, tester() );
            var mobile = testWidth <150;
            cb && cb(mobile);
            return mobile;
        };
    }

}) ();

