( function() {
    var {
        ns, sn,
        rg,
        ssF, ssD,
        sconf,
        amode,
        toreg,
        stdMod,
        
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
            media_upcreate___before_basic,
        },
    });
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
        rg[ 'approximated-curve' ].poly2svg({});

        //arc updates
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : rg[ 'approximated-curve' ].t2xy,        
            rgName  : 'timearc',
            start   : stdMod.pos2t( rg.P.pos ) + rg.Q.intervalSMinus,
            step    : (rg.Q.intervalS-rg.Q.intervalSMinus)/100,
            stepsCount : 101,
        });
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

