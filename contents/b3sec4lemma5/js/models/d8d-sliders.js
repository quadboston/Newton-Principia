( function() {
    var {
        sn, has,
        fconf, sconf,
        sDomF,
        stdMod, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            populates__cust_draggers_list,
        },
    });
    return;









    //==========================================
    // //\\ inits drag model
    //==========================================
    function populates__cust_draggers_list()
    {
        stdMod.customDraggers_list.push( createDraggers_p );
        stdMod.customDraggers_list.push( createDragger_m );

        //todm ... do automate
        stdMod.railsCustomSlidersCount = has( stdMod, 'railsCustomSlidersCount' ) ?
            stdMod.railsCustomSlidersCount + 1 : 1; 
    };
    //==========================================
    // \\// inits drag model
    //==========================================





    //===========================================
    // //\\ create draggers p
    //===========================================
    function createDraggers_p( medD8D )
    {
        sconf.basePairs.forEach( bpair => {
            createDragger_p( bpair[0].pointWrap, medD8D );
        });
    }

    function createDragger_p( pointWrap, medD8D )
    {
        //:sets dragger handle color
        //.making this class unique may help to set correct color ... todm
        pointWrap.spinnerClsId    = 'dragged-point-'+pointWrap.pname;
        pointWrap.dragDecorColor = pointWrap.pcolor;
        var argc =
        {
            pointWrap           : pointWrap,
            doProcess           : doProcess_slider_point,
        };
        medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE( argc );
    }


    function doProcess_slider_point( arg )
    {
        var p = arg.pointWrap;
        var ach = arg.pointWrap.achieved;

        switch( arg.down_move_up ) {
            case 'down':
                 ach.achieved = [ p.pos[0], p.pos[1] ];
                 break;
            case 'move':

                //vital-for-mobile
                //ns.d('mv: l5 point p');

                sDomF.detected_user_interaction_effect();
                p.pos2value([
                    ach.achieved[0] + arg.surfMove[0] *
                        sconf.inn2mod_scale * sDomF.out2inn(),
                    ach.achieved[1] + arg.surfMove[1] * sconf.MONITOR_Y_FLIP *
                        sconf.inn2mod_scale * sDomF.out2inn()
                ]);
                break;
        }
    }
    //===========================================
    // \\// create draggers p
    //===========================================








    //============================================
    // //\\ slider m
    //============================================
    function createDragger_m( medD8D )
    {
        var pointWrap = rg.m;
        //:sets dragger handle color
        pointWrap.spinnerClsId    = 'tp-m';
        //todm ... not straight
        pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
        medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE({
            doProcess           : doProcess_slider_m,
            pointWrap           : rg.m,
            tooltip             : "Selects Newton Polynomial of degree m",
        });
    }

    function doProcess_slider_m( arg )
    {
        var ach = arg.pointWrap.achieved;
        var m = rg.m;
        switch( arg.down_move_up ) {
            case 'down':
                 ach.achieved = [ m.pos[0], m.pos[1] ];
                 break;
            case 'move':
                sDomF.detected_user_interaction_effect();
                var new_m = [
                        ach.achieved[0] + arg.surfMove[0] *
                            ( 1 / stdMod.sconf.originalMod2inn_scale ) *
                            sDomF.out2inn(),
                        ach.achieved[1] //unchanged => only abscissa move
                    ];
                    m.pos2value( new_m );
                break;
        }
    }
    //============================================
    // \\// slider m
    //============================================

}) ();

