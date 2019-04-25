//\\// Application Entry
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var html        = sn('html');

    var fapp        = sn('fapp' );
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_init_sapp';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    return;





    function setModule()
    {
        sapp.init_sapp = init_sapp;
        sapp.init_sapp_II = init_sapp_II;
    }

    //=========================================================
    // //\\ inits app
    //=========================================================
    function init_sapp() 
    {
    }

    function init_sapp_II() 
    {
        //ssF.initMediaModel_II && ssF.initMediaModel_II();
    }
    //=========================================================
    // \\// inits app
    //=========================================================

}) ();

