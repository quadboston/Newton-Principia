( function() {
    var {
        has, haz,
        exegs,
        rg, stdMod,
        arios,
    } = window.b$l.apptree({
        stdModExportList :
        {
            activity0_enablesSliders,
        },
    });

    //****************************************
    const SUBESSAY_KEYNAME = 'self-test';
    //****************************************


    arios.push(( function () {

        var sScript = has( exegs.proof, 'addendum' ) &&
            haz( exegs.proof.addendum.subessay2subexeg, SUBESSAY_KEYNAME );
        if( !sScript ) return; //no script in book for this user-activity
        sScript.scenarioScript = `

            || start
                + lesson-start
                    :1. When ¦P,vb¦<b>initial speed</b>¦¦ increases, which shape ¦orbit¦<b>orbit</b>¦¦ takes? (Ellipse, hyperbola, parabola?)<br><br>Verify your idea ¦vb¦<b>by dragging</b>¦¦ value ¦P,vb¦<b>of v</b>¦¦.<br><br>2. Advanced: Why? Prove your idea with Principia or modern proofs.<br><br>3. Change angle ω that point P falls on main axis. What is the angele omega value now? Why? <br><br>4. When point P is apogee or perigee? Drag value ¦P,vb¦<b>of v</b>¦¦ to see you are right.<br><br>5. At which speed ¦orbit¦<b>orbit</b>¦¦ becomes circle?
                + start
                    -> started

            || started
                + start
                    'stdMod.finalizes_activityScriptSelection();
                    ':User ...
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


