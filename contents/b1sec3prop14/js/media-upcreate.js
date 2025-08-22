( function() {
    var { mat, fconf, ssF, rg,
        toreg, } = window.b$l.apptree({ stdModExportList : {
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
        ///not very standard, the name "Omega" used nowhere except this block
        ///draws phi
        ///adds an extra point, rgPhi, at rg.O to comply angle-api
        var rgPhi = toreg( 'phi' )( 'pname', 'phi' )( 'pos', rg.O.pos )
            ( 'pcolor', 'rgba(0,0,0,0.1)' ) //rg.Fi.pcolor
            ();
        rgPhi.medpos = ssF.mod2inn( rgPhi.pos );
        ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
            AB          : rg[ 'O,Fi' ].pivots,
            CD          : [ rg.PO.pivots[1], rg.PO.pivots[0] ],
            rgSample    : rgPhi,
            ANGLE_SIZE  : 1.5,
            caption     : 'φ',
        });

        if( fconf.sappId === 'b1sec3prop16' ) {
            let rgOmega = toreg( 'Omega' )( 'pname', 'Omega' )( 'pos', rg.P.pos )
                ( 'pcolor', 'rgba(0,0,0,0.1)' ) //body of sector
                ();
            let SP2 = { pos: mat.sm( 2, rg.P.pos, ) };
            rgOmega.medpos = ssF.mod2inn( rgOmega.pos );
            SP2.medpos = ssF.mod2inn( SP2.pos ); 

            let rgX = ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
                AB          : [ rgOmega,
                                SP2,
                                ],
                CD          : [ rgOmega,
                                rg.R
                                ],
                rgSample    : rgOmega,
                ANGLE_SIZE  : 0.7,
                caption     : 'ω',
            });
            rgX.pnameLabelsvg$.css( 'display', 'block' );
            rgX.svgel$.css( 'display', 'block' );
        }

        //=============================================================
        // //\\ draws curves
        //=============================================================
        //enables curve move when dragging an entire diagram
        rg[ 'approximated-curve' ].poly2svg({});
        //for arc [q,q+dq], possibly not used
        if( fconf.sappId === 'b1sec3prop16' ) {
            rg[ 'approximated-curve' ].poly2svg({ doDeltaArc:true });
        }
        //=============================================================
        // \\// draws curves
        //=============================================================
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

