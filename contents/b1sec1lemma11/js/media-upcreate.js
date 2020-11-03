( function() {
    var {
        ns, sn,
        rg,
        ssF, ssD,
        sDomF,
        stdMod,

    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate_custom_curves,
        },
    });
    return;













    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate_custom_curves()
    {
        ///paints arc from A to B
        ssF.paintsCurve({
                fun         : ssD.repoConf[0].fun,
                mmedia      : stdMod.mmedia,
                pointA      : rg.A,
                pointB      : rg.B,
        });
        ///paints arc from A to b
        ssF.paintsCurve({
                fun         : ssD.repoConf[0].fun,
                mmedia      : stdMod.mmedia,
                pointA      : rg.A,
                pointB      : rg.b,
        });

    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

