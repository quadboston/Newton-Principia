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
        sDomF.mediaMoverPoint       = mediaMoverPoint;
    }


    //===================================================
    //interface for media-mover
    //===================================================
    function mediaMoverPoint()
    {
        var pname = 'media-mover';
        var pos = [ -11111, -11111 ]; //fake
        sDomF.modelPointDragger({
            pname,
            pos, 
            acceptPos : () => true,
            orientation : 'rotate',
            nospinner : true,
        });
        rg[ pname ].mediaMover = true;

        rg[ pname ].undisplay = true;
        rg[ pname ].unfound = true;

        rg[ pname ].pcolor = 'transparent';
        // //\\ creates point I to slide
        ssF.pos2pointy(
            'media-mover',
            {
                'fill' : 'transparent',
                'stroke' : 'transparent',
                'stroke-width' : 3,
                r : 6,
            }
        );
    }



}) ();

