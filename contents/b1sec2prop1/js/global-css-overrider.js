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
        //2.  overriding mask for textSection--claim ... .theor1proof
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

            .bsl-approot.appid-b1sec2prop1.textSection--claim svg .theor1claim,
            .bsl-approot.appid-b1sec2prop1.textSection--corollary svg .theor1corollary,
            .bsl-approot.appid-b1sec2prop2.textSection--corollary svg .theor2corollary,
            .bsl-approot.appid-b1sec2prop2.textSection--proof svg .theor2proof,
            .bsl-approot.appid-b1sec2prop1.textSection--proof svg .theor1proof
            {
                display : block;
            }

            .bsl-approot.appid-b1sec2prop1.textSection--claim
                svg .theor1claim.undisplay,
            .bsl-approot.appid-b1sec2prop1.textSection--corollary
                svg .theor1corollary.undisplay,
            .bsl-approot.appid-b1sec2prop2.textSection--corollary
                svg .theor2corollary.undisplay,
            .bsl-approot.appid-b1sec2prop2.textSection--proof
                svg .theor2proof.undisplay,
            .bsl-approot.appid-b1sec2prop1.textSection--proof
                svg .theor1proof.undisplay
            {
                display : none;
            }

            div.bsl-approot svg .tp-kepler-triangle.triangle-odd {
                fill : #6666ff;
                opacity : 0.7;
            }

            div.bsl-approot svg .tp-kepler-triangle.triangle-even {
                fill : #9999ff;
                opacity : 0.7;
            }
            `,

            //The following overrides the above odd and even triangle colors for the Theorem tab in P1 and P2.
            // div.bsl-approot.textSection--claim svg .tp-kepler-triangle.triangle-odd,
            // div.bsl-approot.textSection--claim svg .tp-kepler-triangle.triangle-even {
            //     fill : #8888ff;
            //     opacity : 0.7;
            //}
            //`,
            'global-css-overrider'
        );
    }

}) ();

