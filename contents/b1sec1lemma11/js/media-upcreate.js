( function() {
    var {
        rg,
        ssF, ssD,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    return;


    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        ///paints arc from A to B
        ssF.paintsCurve({
                fun         : ssD.repoConf[0].fun,
                mmedia      : stdMod.mmedia,
                pointA      : rg.A,
                pointB      : rg.B,
                addToStepCount : 1,
        });

		if (amode.logic_phase !== 'claim') {
			///paints arc from A to b
			ssF.paintsCurve({
					fun         : ssD.repoConf[0].fun,
					mmedia      : stdMod.mmedia,
					pointA      : rg.A,
					pointB      : rg.b,
					addToStepCount : 1,
			});
		}
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();
