( function() {
    var {
        $$, sn, has, userOptions,
        ssF, ssD, sDomN, sDomF,
        amode, rg, toreg, sconf, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    let foldPointsRemovedFromTp = false;
    return;

    
    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        stdMod.poly2svgP11({});

        //todm this is a redundant step, graphArray is already
        //built and can be used
        let rgX = ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : stdMod.q2xy,
            rgName  : 'orbitcurve',
            start   : 0,      //existence is a flag
            step    : 0.0125,
            stepsCount : 81,
        });
        rgX.svgel$.addClass('tp-orbit');

        //todm this is a redundant step, graphArray is already
        //built and can be used
        //arc updates
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : stdMod.q2xy,
            rgName  : 'timearc',
            stepsCount : 101,
            start   : rg.Q.q_minus,
            step     : (rg.Q.q - rg.Q.q_minus ) / 100,
        });
        //todm this is a redundant step, graphArray is already
        //built and can be used
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : stdMod.q2xy,
            rgName  : 'APQ',
            stepsCount : 101,
            start   : 0,
            step     : rg.Q.q / 100,
        });
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================
    
}) ();

