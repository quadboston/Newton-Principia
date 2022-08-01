( function() {
    var {
        ns, sn, $$, nsmethods, nssvg,
        fconf, ssF, ssD,
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
        //rg.allLettersAreHidden = false;
    }


    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        {
            if( fconf.sappId !== "b1sec3prop15" ) {
                ///draws phi
                ///adds an extra point, rgPhi, at rg.O to comply angle-api
                var rgPhi = toreg( 'phi' )( 'pname', 'phi' )( 'pos', rg.O.pos )
                    ( 'pcolor', 'rgba(0,0,0,0.1)' ) //rg.Fi.pcolor
                    ();
                rgPhi.medpos = ssF.mod2inn( rgPhi.pos );
                ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
                    AB          : "b1sec3prop14" === fconf.effId ?
                                      rg[ 'O,Fi' ].pivots :
                                      [ rgPhi,
                                        { medpos : [ rgPhi.medpos[0]+100,rgPhi.medpos[1] ] }, 
                                      ],
                    CD          : "b1sec3prop14" === fconf.effId ?
                                      [ rg.PO.pivots[1], rg.PO.pivots[0] ]
                                      :
                                      rg[ 'O,Fi' ].pivots,
                    rgSample    : rgPhi,
                    ANGLE_SIZE  : 1.5,
                    caption     : 'φ',
                })
            }
        }
        //enables curve move when dragging an entire diagram
        rg[ 'approximated-curve' ].poly2svg({});

        //=============================================================
        // //\\ tan. cir.
        //=============================================================
        var tCircleName = 'tangentCircle';
        var rgTCir = rg[ tCircleName ];

        var RCmedpos = ssF.mod2inn( rg.tCircleCenter.pos, stdMod );
        var RRmedpos = sconf.mod2inn_scale * rgTCir.tangentCircleRadius;

        //todo nearly bug: why create svg and set cls every time?
        rgTCir.svgel = nssvg.u({
            svgel   : rgTCir.svgel,
            parent  : stdMod.mmedia,
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

