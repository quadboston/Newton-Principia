( function() {
    var {
        ns, sn, $$, nsmethods, nssvg,
        ssF, ssD,
        amode, stdMod, sconf, rg, toreg,
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
        rg.approxer.poly2svg({});

        //=============================================================
        // //\\ tan. cir.
        //=============================================================
        var tCircleName = 'tangentCircle';
        var rgTCir = rg[ tCircleName ];

        var RCmedpos = ssF.modpos2medpos( rg.tCircleCenter.pos, stdMod );
        var RRmedpos = sconf.mod2med * rgTCir.tangentCircleRadius;

        //todo nearly bug: why create svg and set cls every time?
        rgTCir.svgel = nssvg.u({
            svgel   : rgTCir.svgel,
            parent  : stdMod.medScene,
            type    : 'circle',
            stroke  : rg.C.pcolor,
            fill    : 'transparent',
            'stroke-width' : '1',
            cx : RCmedpos[0],
            cy : RCmedpos[1],
            r : RRmedpos,
        });
        $$.$( rgTCir.svgel ).addClass(
            'tostroke tp-' + nsmethods.camelName2cssName( tCircleName )
        );
        rgTCir.svgel.style.display =
            rgTCir.undisplay ? 'none' : 'block';
        //=============================================================
        // \\// tan. cir.
        //=============================================================
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

