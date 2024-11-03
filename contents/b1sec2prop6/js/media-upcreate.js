( function() {
    var {
        ns, sn, nspaste, bezier,
        ssF, ssD,
        amode, rg, toreg, sconf, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    return;













    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        if( sconf.APPROX === 'D' ) {
            ////enables curve move when dragging an entire diagram
            rg[ 'approximated-curve' ].poly2svg({});
        } else {
            let rgX = ssF.paintsCurve({
                mmedia  : stdMod.svgScene,
                fun     : bezier.fun,
                rgName  : 'orbitcurve',
                start   : 0,      //existence is a flag
                step    : 0.01,
                stepsCount : 100,
            });
            rgX.svgel$.addClass('tp-orbit');
        }
        //arc updates
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : bezier.fun,
            rgName  : 'timearc',
            stepsCount : 50,
            start   : rg.Q.q_minus,
            step     : (rg.Q.q - rg.Q.q_minus ) / 50,
        });
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : bezier.fun,
            rgName  : 'APQ',
            stepsCount : 50,
            start   : 0,
            step     : rg.Q.q / 50,
        });
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

