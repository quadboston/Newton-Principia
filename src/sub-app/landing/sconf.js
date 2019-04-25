// //\\// widget config
( function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp    = sn('fapp' ); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);
    var sapp    = sn('sapp'); 
    var srg_modules = sn('srg_modules', sapp);

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_conf';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //0000000000000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000000000000








    function setModule()
    {
        ssF.init_conf = init_conf;
    }


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
    }

}) ();

