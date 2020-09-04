( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions',sapp);
    var studyMods   = sn('studyMods', sapp);

    var tr; //       = ssF.tr;
    var tp; //       = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'x';

    srg_modules[ modName + '-' + mCount.count ] = setModule;
    var stdMod;
    return;








    function setModule()
    {
        stdMod                              = sn( SUB_MODEL, studyMods );
        stdMod.captureAState                = captureAState;
    }

    //=================================
    // //\\ capturers/readers
    //=================================
    ///captures AState
    function captureAState()
    {
        var ast = {};
        ns.paste( ast, { spatialStepsMax: { pos: rg.spatialStepsMax.pos     }} );
        ns.paste( ast, { slider_sltime:   { t:   rg.slider_sltime.t         }} );
        ns.paste( ast, { timeStep:        { t:   rg.timeStep.t              }} );
        ns.paste( ast, { speeds:          { pos: [ rg.speeds.pos[0] ]       }} );
        ns.paste( ast, { B:               { pos: rg.B.pos                   }} );

        fapp.captureWind.setText( ast );
    }
    //=================================
    // \\// capturers/readers
    //=================================

}) ();

