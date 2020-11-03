( function() {

    //apparently vital to merge this module with proper submodel
    //todm: must be generic: not only for common:
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
        stdMod.inits_tools_sliders = inits_tools_sliders;
    }


    ///==========================================
    /// inits drag points
    ///==========================================
    function inits_tools_sliders( medD8D )
    {
        var toolsSliders = ns.sn( 'toolsSliders',stdMod, [] );
        toolsSliders.forEach( slname => {
            createDragger( medD8D, slname )
        });
    };



    function createDragger( medD8D, magnitude )
    {
        var pointWrap = rg[ magnitude ];
        //:sets dragger handle color
        pointWrap.spinnerClsId    = 'tp-' + magnitude;
        //todm ... not straight
        pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
        var argc =
        {
            pointWrap,
            doProcess,
            //update_decPoint:
                //if this property is missed, then using
                //d8d-framework.js::update_decPoint_inn2outparent() ...
                //  ... dompos = inn2outparent.call( pointWrap

                //update_decPoint : 'update_decPoint_default',
                //      apparently above needs this: dragHandleDOM
                //      which we don't provide as this "argc" prop;
        };
        //ccc( 'does create ' + pointWrap.spinnerClsId + ' ' + pointWrap.pname);
        medD8D.pointWrap_2_dragWrap( argc );
    }


    function doProcess( arg )
    {
        var pointWrap = arg.pointWrap;
        var ach = pointWrap.achieved;
        switch( arg.down_move_up ) {
            case 'down':
                 ach.achieved = [ pointWrap.pos[0], pointWrap.pos[1] ];
                 break;
            case 'move':
                ns.d('mv: comm-tools');
                sDomF.detected_user_interaction_effect();
                var mscale = sDomF.out2inn() / sconf.originalMod2inn_scale;
                var move_in_model = [ //move in model units
                        arg.surfMove[0] * mscale,
                        arg.surfMove[1] * mscale,
                    ];
                pointWrap.move_2_updates(
                    ach.achieved,
                    move_in_model,
                );
                break;
        }
    }

}) ();

