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

    var d8d_p       = sn('d8d-point',fmethods);

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
    };
    //==========================================
    // \\// inits drag model
    //==========================================





    //===========================================
    // //\\ create draggers p
    //===========================================
    function createDraggers_p( medD8D )
    {
        createDragger_p( rg.L.pointWrap, medD8D );
        createDragger_B( rg.B.pointWrap, medD8D );
    }

    function createDragger_p( pointWrap, medD8D )
    {
        //:sets dragger handle color
        //.making this class unique may help to set correct color ... todm
        pointWrap.spinnerClsId    = 'dragged-point-'+pointWrap.pname;
        pointWrap.dragDecorColor = pointWrap.pcolor;
        var argc =
        {
            achieved            : [ pointWrap.pos[0], pointWrap.pos[1] ],
            pointWrap           : pointWrap,
            doProcess           : doProcess_slider_point,
        };
        medD8D.pointWrap_2_dragWrap( argc );
    }

    function createDragger_B( pointWrap, medD8D )
    {
        //:sets dragger handle color
        //.making this class unique may help to set correct color ... todm
        pointWrap.spinnerClsId    = 'dragged-point-'+pointWrap.pname;
        pointWrap.dragDecorColor = pointWrap.pcolor;
        var argc =
        {
            achieved            : pointWrap.unrotatedParameterX,
            pointWrap           : pointWrap,
            doProcess           : doProcess_B,
        };
        medD8D.pointWrap_2_dragWrap( argc );
    }

    function doProcess_B( arg )
    {
        var pointWrap = arg.pointWrap;
        var ach = arg.pointWrap.achieved;
        //ccc( 'arg.down_move_up=' + arg.down_move_up );

        switch( arg.down_move_up ) {

            case 'down':
                 ach.achieved = pointWrap.unrotatedParameterX;
                 break;
            case 'move':
                sDomF.detected_user_interaction_effect();
                pointWrap.pos2value(
                    ach.achieved + arg.surfMove[0] *
                        sconf.inn2mod_scale * sDomF.out2inn(),
                );
                break;
        }
    }



    function doProcess_slider_point( arg )
    {
        var p = arg.pointWrap;
        var ach = arg.pointWrap.achieved;
        //ccc( 'arg.down_move_up=' + arg.down_move_up );

        switch( arg.down_move_up ) {
            case 'down':
                 ach.achieved = [ p.pos[0], p.pos[1] ];
                 break;
            case 'move':
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

}) ();

