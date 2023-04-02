( function() {
    var {
        sn,
        exegs, ss, amode,
        rg, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            activity2_enablesSliders,
        },
    });

    //****************************************
    const SUBESSAY_KEYNAME = 'activity2';
    //****************************************

    const ario    = sn( 'activityScenario', ss );
    const arios   = sn( 'activityScenarios', ario, [] );

    arios.push(( function () {
        exegs.exersise.subtopics.subessay2subexeg[ SUBESSAY_KEYNAME ].scenarioScript = `


            || start
                + lesson-start
                    :Select an activity to begin.
                + start
                    -> started

            || started
                + start
                    stdMod.finalizes_activityScriptSelection();
                    :User the ¦pressure-kernel cssbold¦the slider tool¦¦ to increase the pressure and observe what happens.

                    stdMod.activity2_enablesSliders();
    `}));


    function activity2_enablesSliders()
    {
        if( !rg.activitiesAreLaunched ) return;
        stdMod.toggleSliderEnabled( '', false );
        stdMod.toggleSliderEnabled( 'pressure', true );
        stdMod.toggleSliderEnabled( 'volume', true );
    }


}) ();


