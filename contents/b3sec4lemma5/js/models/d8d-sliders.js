( function() {

    //apparently vital to merge this module with proper submodel
    var SUB_MODEL   = 'common'; 

    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var bezier      = sn('bezier');

    var fapp        = ns.sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var d8d_p       = sn('d8d-point');

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'dragModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var stdMod;
    return;









    function setModule()
    {
        stdMod = sn( SUB_MODEL, studyMods );
        stdMod.populates__cust_draggers_list = populates__cust_draggers_list;
    }


    //==========================================
    // //\\ inits drag model
    //==========================================
    function populates__cust_draggers_list()
    {
        ns.sn( 'customDraggers_list', stdMod, [] );
        stdMod.customDraggers_list.push( createDraggers_p );
        stdMod.customDraggers_list.push( createDragger_m );

        //todm ... do automate
        stdMod.railsCustomSlidersCount = ns.h( stdMod, 'railsCustomSlidersCount' ) ?
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
        medD8D.pointWrap_2_dragWrap( argc );
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
        medD8D.pointWrap_2_dragWrap({
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
                            (1/sconf.originalMod2inn_scale) *
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

