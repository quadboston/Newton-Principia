( function() {
    var {
        sn,
        exegs, ss, amode,
        rg, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            activity0_enablesSliders,
        },
    });

    //****************************************
    const SUBESSAY_KEYNAME = 'self-test';
    //****************************************

    const ario    = sn( 'activityScenario', ss );
    const arios   = sn( 'activityScenarios', ario, [] );

    arios.push(( function () {
        exegs.proof.addendum.subessay2subexeg[ SUBESSAY_KEYNAME ].scenarioScript = `


            || start
                + lesson-start
                    :When ¦P,vb¦<b>initial speed</b>¦¦ increases, which shape ¦orbit¦<b>orbit</b>¦¦ takes? (Ellipse, hyperbola, parabola?)<br><br>Verify your idea ¦vb¦<b>by dragging</b>¦¦ value ¦P,vb¦<b>of v</b>¦¦.<br><br>Advanced: Why? Prove your idea with Principia or modern proofs.
                + start
                    -> started

            || started
                + start
                    stdMod.finalizes_activityScriptSelection();
                    :User the ¦N2-kernel H2-kernel NH3-kernel cssbold¦slider tool¦¦ to increase or decrease the concentrations of ¦N2 cssbold¦N₂¦¦, ¦H2 cssbold¦H₂¦¦, and ¦NH3 cssbold¦NH₃¦¦ and observe what happens.

                    'stdMod.activity0_enablesSliders();
    `}));

    function activity0_enablesSliders()
    {
        if( !rg.activitiesAreLaunched ) return;
        stdMod.toggleSliderEnabled( '', false );
        stdMod.toggleSliderEnabled( 'H2', true );
        stdMod.toggleSliderEnabled( 'N2', true );
        stdMod.toggleSliderEnabled( 'NH3', true );
    }

}) ();


