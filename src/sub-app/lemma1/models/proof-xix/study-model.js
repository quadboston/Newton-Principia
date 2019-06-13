( function() {
    var SUB_MODEL   = 'proof-xix';
    var ns          = window.b$l;
    var sn          = ns.sn;
    var bezier      = sn('bezier');
    var mat         = sn('mat');

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    var sapp        = sn('sapp');
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);

    var tr          = ssF.tr;
    var tp          = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'studyModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var modelPaths = null;
    return;








    function setModule()
    {
        sn(SUB_MODEL, studyMods ).upcreate = upcreate;
    }

    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function upcreate()
    {
        //-------------------------------------------------------
        // //\\ media part
        //-------------------------------------------------------
        sn(SUB_MODEL, studyMods ).upcreateMedia();
        //-------------------------------------------------------
        // \\// media part
        //-------------------------------------------------------
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================

}) ();

