(function(){
    const { mat, fconf, ssF, amode, sconf, rg, toreg, } =
        window.b$l.apptree({ stdModExportList :
            {
                media_upcreate___part_of_medupcr_basic,
                media_upcreate___before_basic,
            },
        });
    return;


    function media_upcreate___before_basic (){
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
    }

    ///=========================================================
    /// lemma custom addons
    ///=========================================================
    function media_upcreate___part_of_medupcr_basic (){
        if( fconf.sappId !== "b1sec3prop15" && fconf.sappId !== "b1sec3prop17" ) {
            ///draws phi
            ///adds an extra point, rgPhi, at rg.O to comply angle-api
            var rgPhi = toreg( 'phi' )( 'shpid', 'phi' )( 'pos', rg.O.pos )
                ( 'pcolor', 'rgba(0,0,0,0.1)' ) //rg.Fi.pcolor
                ();
            rgPhi.medpos = ssF.modpos2medpos( rgPhi.pos );
            ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
                AB          : "prop_from_14_to_17" === fconf.effId ?
                                  rg[ 'O,Fi' ].pivots :
                                  [ rgPhi,
                                    { medpos :
                                      [ rgPhi.medpos[0]+100,rgPhi.medpos[1] ] },
                                  ],
                CD          : "prop_from_14_to_17" === fconf.effId ?
                                  [ rg.PO.pivots[1], rg.PO.pivots[0] ]
                                  :
                                  rg[ 'O,Fi' ].pivots,
                rgSample    : rgPhi,
                ANGLE_SIZE  : 1.5,
                caption     : 'φ',
            })
        }

        //=============================================================
        // //\\ draws curves
        //=============================================================
        //enables curve move when dragging an entire diagram
        rg.approxer.poly2svg({});
        //=============================================================
        // \\// draws curves
        //=============================================================
    }
})();