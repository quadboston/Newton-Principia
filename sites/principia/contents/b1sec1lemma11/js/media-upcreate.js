( function() {
    var {
        ns, sn,
        rg,
        ssF, ssD,
        sDomF,
        stdMod,

    } = window.b$l.atree({
        stdModList :
        {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    return;













    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic (){
        ///paints arc from A to B
        ssF.gcurve2svg({
                fun         : ssD.repoConf[0].fun,
                pointA      : rg.A,
                pointB      : rg.B,
                addToStepCount : 1,
        });
        ///paints arc from A to b
        ssF.gcurve2svg({
                fun         : ssD.repoConf[0].fun,
                pointA      : rg.A,
                pointB      : rg.b,
                addToStepCount : 1,
        });

    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

