( function() {
    var {
        ns, sn,
        rg,
        ssF, ssD,
        sconf,
        amode,
        toreg,
        stdMod,
        
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
        //enables curve move when dragging an entire diagram
        rg[ 'approximated-curve' ].poly2svg({});

        //arc updates
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : rg[ 'approximated-curve' ].t2xy,        
            rgName  : 'timearc',
            pointA  : rg.rrminus,
            pointB  : rg.Q,
        });


        //updates Newton's decorational curve
        ssF.paintsCurve({
            mmedia  : stdMod.svgScene,
            fun     : rg[ 'approximated-curve' ].t2xy,        
            rgName  : 'APQ',
            pointA  : rg.A,
            pointB  : rg.Q,
        });


    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

