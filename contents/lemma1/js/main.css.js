//\\// Application Entry
( function() {
    var {
        globalCss,
        sapp,
    } = window.b$l.apptree({
        setModule
    });
    return;





    function setModule()
    {
        sapp.updatesLemmaCss = updatesLemmaCss;
    }

    ///not in effect ... needs more work
    function updatesLemmaCss() 
    {
        globalCss.update( `
            .bsl-approot .bsl-media-root svg text {
                font-family : MJXc-TeX-math-I, MJXc-TeX-math-Ix, MJXc-TeX-math-Iw;
            }
        `,
        'lemma1-update'
        );
    }

}) ();

