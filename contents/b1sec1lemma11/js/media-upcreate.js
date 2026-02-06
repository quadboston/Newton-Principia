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
		paintCurveFromAto(rg.b)
		paintCurveFromAto(rg.B)

		function paintCurveFromAto(endPoint) {
			ssF.paintsCurve({
				fun         : ssD.repoConf[0].fun,
				mmedia      : stdMod.mmedia,
				pointA      : rg.A,
				pointB      : endPoint,
				addToStepCount : 1,
			});
		}
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();
