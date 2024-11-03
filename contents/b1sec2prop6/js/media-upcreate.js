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
            //pointA  : rg.rrminus,
            //pointB  : rg.Q,
            stepsCount : 100,
            start   : rg.Q.q_minus,
            step     : (rg.Q.q - rg.Q.q_minus ) / 100,
        });
        //updates Newton's decorational curve
        
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : bezier.fun,
            rgName  : 'APQ',
            //pointA  : rg.A,
            //pointB  : rg.Q,
            stepsCount : 100,
            start   : 0,
            step     : rg.Q.q / 100,
        });
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

