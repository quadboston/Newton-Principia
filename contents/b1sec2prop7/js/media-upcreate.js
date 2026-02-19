( function() {
    var { ssF, rg, stdMod, } = window.b$l.apptree({ stdModExportList : {
            media_upcreate___part_of_medupcr_basic,
            media_upcreate___before_basic,
        }, });
    return;


    function media_upcreate___before_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
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

