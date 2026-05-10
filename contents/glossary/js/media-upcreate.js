( function() {
    var { ns, sn, $$, nsmethods, nssvg, ssF, ssD, amode, stdMod, sconf, rg, topicColors_repo, }
        = window.b$l.apptree({ stdModExportList : {
            media_upcreate___part_of_medupcr_basic,
            media_upcreate___before_basic,
        },
    });
    return;


    function media_upcreate___before_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        const { logic_phase, aspect, subessay } = amode;
		const {
            given,
            body,
            orbit,
            proof,
            forceColor,
            hidden,
            estimatedForce,
            curvature,
			sunColor,
			proofHover
        } = topicColors_repo;
		rg.GP.pColor = rg.C.pColor = subessay === 'diameter' ? estimatedForce : proof;
    }


    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //enables curve move when dragging an entire diagram
        stdMod.createOrUpdateOrbit({});
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();
