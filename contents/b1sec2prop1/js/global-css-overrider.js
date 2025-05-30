( function() {
    var { globalCss, } = window.b$l.apptree({ setModule, });
    return;


    function setModule()
    {
        //--------------------------------------------------------
        //1. .triangle-odd competes with
        //      .bsl-approot svg .tp-kepler-triangle.tofill
        //      we have to add more idle selectors into CSS-path,
        //2.  overriding mask for logic_phase--claim ... .theor1proof
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

            .bsl-approot.appid-b1sec2prop1.logic_phase--claim svg .theor1claim,
            .bsl-approot.appid-b1sec2prop1.logic_phase--corollary svg .theor1corollary,
            .bsl-approot.appid-b1sec2prop2.logic_phase--corollary svg .theor2corollary,
            .bsl-approot.appid-b1sec2prop2.logic_phase--proof svg .theor2proof,
            .bsl-approot.appid-b1sec2prop1.logic_phase--proof svg .theor1proof
            {
                display : block;
            }

            .bsl-approot.appid-b1sec2prop1.logic_phase--claim
                svg .theor1claim.undisplay,
            .bsl-approot.appid-b1sec2prop1.logic_phase--corollary
                svg .theor1corollary.undisplay,
            .bsl-approot.appid-b1sec2prop2.logic_phase--corollary
                svg .theor2corollary.undisplay,
            .bsl-approot.appid-b1sec2prop2.logic_phase--proof
                svg .theor2proof.undisplay,
            .bsl-approot.appid-b1sec2prop1.logic_phase--proof
                svg .theor1proof.undisplay
            {
                display : none;
            }
            `,
            'global-css-overrider'
        );
    }

}) ();

