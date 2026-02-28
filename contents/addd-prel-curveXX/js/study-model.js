( function() {
    var {
        globalCss,
        sDomF,
        amode,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_lemma,
            model_upcreate,
        },
    });
    return;














    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_lemma()
    {
    }








    ///****************************************************
    /// model scenario
    ///****************************************************
    function model_upcreate()
    {
        //this patch amends this css
        //.bsl-approot.logic_phase--corollary.aspect--english .bsl--svgscene.s ubmodel-common

        //img competes with: .bsl-approot.logic_phase--scholium.aspect--english .bg0,
        //todm: inconsistent: .main-legend.proof should not need this CSS, it
        //      is designed to remove itself by class ".proof",
        var wwCss =
            amode.subessay !== 'areas'
        ?
        `
            div.bsl-approot
            .bsl-sim-superscene
            .bsl-simscene
            .bsl-sim-superscene .bsl-simscene img.bsl-bg-image.bg0,

            .main-legend.proof
            {
                display : none;
            }
        `
        :
        `
            .dummy--none { width : auto; }
        `;
        globalCss.replace( wwCss, 'toggles-media-visibility' );

        //this approach simply neglects user interaction flag for each media update,
        //so uses not a right thing to set visible-state,
        //this way is good only for single picture ... for multiple pictures,
        //one needs a machine selective for each picture,
        //legend =:: sDomF.detected_user_interaction_effect( !!'doUndetected' );
        sDomF.detected_user_interaction_effect( amode.subessay === 'areas' );
    }

}) ();

