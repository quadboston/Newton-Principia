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
        ///not very standard, the name "Omega" used nowhere except this if-block
        {
            let rgOmega = toreg( 'Omega' )( 'shpid', 'Omega' )( 'pos', rg.P.pos )
                ( 'pcolor', 'rgba(0,0,0,0.1)' ) //body of sector
                ();
            let SP2 = { pos: mat.sm( 2, rg.P.pos, ) };
            rgOmega.medpos = ssF.modpos2medpos( rgOmega.pos );
            SP2.medpos = ssF.modpos2medpos( SP2.pos );

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
            })

            if( ( amode.subessay === 'corollary1' ||
                  amode.subessay === 'corollary2' ) ){
                rgX.pnameLabelsvg$.css( 'display', 'none' );
                rgX.svgel$.css( 'display', 'none' );
            }
        }

        //=============================================================
        // //\\ draws curves
        //=============================================================
        //enables curve move when dragging an entire diagram
        rg.approxer.poly2svg({});
        //for arc [q,q+dq], possibly not used
        rg[ 'approxer-sample' ].poly2svg({});
        //=============================================================
        // \\// draws curves
        //=============================================================
    }
})();