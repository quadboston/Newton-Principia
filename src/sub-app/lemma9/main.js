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
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_init_sapp';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        sapp.init_sapp = init_sapp;
        sapp.finish_sapp_UI = finish_sapp_UI;
    }

    //=========================================================
    // //\\ inits app
    //=========================================================
    function init_sapp() 
    {
        //==========================
        //:at landing, copies study-model-pars from config to app model
        ssD.curvePivots   = sconf.curvePivots.concat([]);
        ssD.tC            = sconf.tC;
        ssD.claimRatio    = sconf.claimRatio;
        ssD.tiltRatio     = sconf.tiltRatio;
        //==========================

        //======================================
        // //\\ inits model and it's view
        //======================================
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            stdMod.upcreate();
            stdMod.initMediaModel();
        });
        //======================================
        // \\// inits model and it's view
        //======================================
    }
    function finish_sapp_UI() 
    {
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            ssF.create_proofSlider();
            ssF.mediaModelInitialized = true;
        });
    }
    //=========================================================
    // \\// inits app
    //=========================================================

}) ();

