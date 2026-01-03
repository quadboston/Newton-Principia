( function() {
    var {
        ns, sn, has, userOptions,
        sconf, ssF, ssD,
        amode, rg, toreg, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
            media_upcreate___before_basic,
        },
    });
    let foldPointsRemovedFromTp = false;
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
        let rgCurve = rg.approxer;
        rgCurve.poly2svg({});

        //arc updates
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : rgCurve.t2xy,
            rgName  : 'timearc',
            start   : stdMod.pos2t( rg.P.pos ) + rg.Q.intervalSMinus,
            step    : (rg.Q.intervalS-rg.Q.intervalSMinus)/100,
            stepsCount : rgCurve.stepsCount, //101,
        });

        /*
        ///possibly redundant because gap points are good
        if( has( rg[ 'foldPoints-' + 1 ], 'svgel$' ) ){
           if( !foldPointsRemovedFromTp ) {
               foldPointsRemovedFromTp = true;

               let gapColor = amode.aspect === 'addendum' ?
                              '#ffffff' : '#ff0000';
               rg[ 'S,nonSolvablePoint' ].svgel$.css( 'stroke', gapColor );
               sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
                    fp.rgX.svgel$
                        .removeClass( 'tp-fold_points-'+ppix )
                        .css( 'fill', gapColor )
                        .css( 'stroke', gapColor )
                    ;
               });
            }
        }
        */
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

