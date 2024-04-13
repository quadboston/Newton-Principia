( function() {
    var {
        globalCss,
    } = window.b$l.apptree({
        setModule,
    });
    return;








    function setModule()
    {
        //--------------------------------------------------------
        //1. .triangle-odd competes with
        //      .bsl-approot svg .tp-kepler-triangle.tofill
        //      we have to add more idle selectors into CSS-path,
        //2.  overriding mask for theorion--claim ... .theor1proof
        //      display ... none
        //--------------------------------------------------------
        globalCss.replace( `
            .bsl-approot svg .theor1proof,
            .bsl-approot svg .theor1claim,
            .bsl-approot svg .theor1corollary,
            .bsl-approot svg .theor2proof,
            .bsl-approot svg .theor2corollary
            {
                display : none;
            }

            .bsl-approot.appid-b1s2prop1theor1.theorion--claim svg .theor1claim,
            .bsl-approot.appid-b1s2prop1theor1.theorion--corollary svg .theor1corollary,
            .bsl-approot.appid-b1s2prop2theor2.theorion--corollary svg .theor2corollary,
            .bsl-approot.appid-b1s2prop2theor2.theorion--proof svg .theor2proof,
            .bsl-approot.appid-b1s2prop1theor1.theorion--proof svg .theor1proof
            {
                display : block;
            }

            .bsl-approot.appid-b1s2prop1theor1.theorion--claim
                svg .theor1claim.undisplay,
            .bsl-approot.appid-b1s2prop1theor1.theorion--corollary
                svg .theor1corollary.undisplay,
            .bsl-approot.appid-b1s2prop2theor2.theorion--corollary
                svg .theor2corollary.undisplay,
            .bsl-approot.appid-b1s2prop2theor2.theorion--proof
                svg .theor2proof.undisplay,
            .bsl-approot.appid-b1s2prop1theor1.theorion--proof
                svg .theor1proof.undisplay
            {
                display : none;
            }

            div.bsl-approot svg .tp-kepler-triangle.triangle-odd {
                fill : #6666ff;
                opacity : 0.4;
            }

            div.bsl-approot svg .tp-kepler-triangle.triangle-even {
                fill : #9999ff;
                opacity : 0.4;
            }

            div.bsl-approot.theorion--claim svg .tp-kepler-triangle.triangle-odd,
            div.bsl-approot.theorion--claim svg .tp-kepler-triangle.triangle-even {
                fill : #8888ff;
                opacity : 0.4;
            }
            `,
            'global-css-overrider'
        );
    }

}) ();

