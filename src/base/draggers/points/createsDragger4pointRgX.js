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
        //todm: must be loop via stMods
        stdMod = sn( SUB_MODEL, studyMods );
        sDomF.rgX2dragger  = rgX2dragger;
        sDomF.doProcess_rgX         = doProcess_rgX;
    }


    function rgX2dragger({
            medD8D,
            rgX,
            orientation,
            nospinner,
    }) {
        var pointWrap               = rgX;
        pointWrap.spinnerClsId      = 'point-' + rgX.pname + '-slider';
        pointWrap.dragDecorColor    = rgX.pcolor;
        var argc =
        {
            pointWrap           : rgX,
            doProcess           : sDomF.doProcess_rgX, //todm: doProcess_rgX,
            orientation         : orientation,
            nospinner           : nospinner,
        };
        medD8D.pointWrap_2_dragWrap( argc );
    }

    //todo check note in buffer: slider
    function doProcess_rgX( arg )
    {
        var pWrap = arg.pointWrap; 
        switch( arg.down_move_up ) {
            case 'down':
                ns.hafb( pWrap, 'processDownEvent' )( arg );
                break;
            case 'up' :
                ns.hafb( pWrap, 'processUpEvent' )(arg);
                break;
            case 'move':
                if( ns.haz( pWrap, 'mediaMover' ) ) {
                    var mscale = sDomF.out2inn();
                    var mouseOnSurf = sDomF.outparent2inn( arg.point_on_dragSurf );

                } else {
                    //move in model units
                    var mscale = sDomF.out2inn() * sconf.inn2mod_scale;
                }
                var scaledMove = [
                    arg.surfMove[0] * mscale,
                    arg.surfMove[1] * mscale,
                ];
                //this sub. basically creates newPos from move
                pWrap.move_2_updates(
                    scaledMove,
                    mouseOnSurf,
                );
                break;
        }
    }
    //==========================================
    // \\// attemt to unify dragger for point
    //==========================================



}) ();

