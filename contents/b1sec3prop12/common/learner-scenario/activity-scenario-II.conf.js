( function() {
    var {
        sn,
        exegs, ss, amode,
        rg, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            activity1_enablesSliders,
        },
    });

    //****************************************
    const SUBESSAY_KEYNAME = 'activity1';
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
                    :User ¦temperature-kernel cssbold¦the slider tool¦¦ to increase or decrease the temperature of the system and observe what happens.

                    stdMod.activity1_enablesSliders();
    `}));

    function activity1_enablesSliders()
    {
        if( !rg.activitiesAreLaunched ) return;
        stdMod.toggleSliderEnabled( '', false );
        stdMod.toggleSliderEnabled( 'temperature', true );
    }

}) ();


