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
        stdMod.dragList.push( createDraggers_p );
        stdMod.dragList.push( createDragger_m );

        //todm ... do automate
        stdMod.railsCustomSlidersCount = has(
            stdMod, 'railsCustomSlidersCount' ) ?
            stdMod.railsCustomSlidersCount + 1 : 1;
    };
    //==========================================
    // \\// inits drag model
    //==========================================





    //===========================================
    // //\\ create draggers p
    //===========================================
    function createDraggers_p( lemmaD8D )
    {
        sconf.basePairs.forEach( bpair => {
            createDragger_p( bpair[0].pointWrap, lemmaD8D );
        });
    }

    function createDragger_p( pointWrap, lemmaD8D )
    {
        //:sets dragger handle color
        //.making this class unique may help to set
        //correct color ... todm
        pointWrap.spinnerClsId    = 'dragged-point-'+pointWrap.l5key;
        pointWrap.dragDecorColor = pointWrap.pcolor;
        var argc = {
            pointWrap : pointWrap,
            finish_DownMoveUp : doProcess_slider_point,
        };
        lemmaD8D.pointWrap_2_dragWraps( argc );
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
                        sconf.med2mod * sDomF.ds2med(),
                    ach.achieved[1] + arg.surfMove[1] * sconf.MONITOR_Y_FLIP *
                        sconf.med2mod * sDomF.ds2med()
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
    function createDragger_m( lemmaD8D )
    {
        var pointWrap = rg.m;
        //:sets dragger handle color
        pointWrap.spinnerClsId    = 'tp-m';
        //todm ... not straight
        pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
        lemmaD8D.pointWrap_2_dragWraps({
            finish_DownMoveUp           : doProcess_slider_m,
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
                            ( 1 / sconf.mod2med_original ) *
                            sDomF.ds2med(),
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

