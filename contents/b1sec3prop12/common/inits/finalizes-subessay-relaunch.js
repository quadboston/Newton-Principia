( function() {
    var {
        sn, has, haz,
        sconf, fconf, exegs, fmethods, dividorFractions,
        rg, amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            subessayLaunch_definedInLemma_after_model_upcreate,
            finalizes_activityScriptSelection,
            finalizesChosenActivity,
        },
    });
    return;












    ///core functionality
    function subessayLaunch_definedInLemma_after_model_upcreate()
    {
    }

    ///Runs only from activity-script. Does not run from engine. As of ver Jul.23, 2021.
    function finalizes_activityScriptSelection()
    {
        rg.activitiesAreLaunched = true;
        document.querySelector( '.exersise-introduction' ).style.display = 'none';
        finalizesChosenActivity();
    }



    function finalizesChosenActivity()
    {
        /*
        var subessayIx = exegs.exersise.subtopics.subessayName2subexegIx[ amode.subessay ];
        if( subessayIx > 1 ) {

            var ESSAY_FRACT = 0.5;
            nspaste( dividorFractions,[ ESSAY_FRACT, 1-ESSAY_FRACT ] );
        } else {
            var ESSAY_FRACT = fconf.ESSAY_FRACTION_IN_WORKPANE;
            nspaste( dividorFractions,[ ESSAY_FRACT, 1-ESSAY_FRACT ] );
        }
        */
        fmethods.fullResize();
    }

}) ();

