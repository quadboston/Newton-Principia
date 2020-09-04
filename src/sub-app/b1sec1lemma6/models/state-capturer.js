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
    var studyMods   = sn('studyMods', sapp);
    var sDomF       = sn('dfunctions',sapp);

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







    ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    /// registers model pars into common scope
    ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    function setModule()
    {
        stdMod                  = sn( SUB_MODEL, studyMods );
        stdMod.captureAState    = captureAState;
    }

    //=================================
    // //\\ capturers/readers
    //=================================
    ///captures AState
    function captureAState()
    {
        var ast = {};
        ns.paste( ast, { curveRotationAngle: rg.curveRotationAngle } );
        ns.paste( ast, { B: { pointWrap:
            { unrotatedParameterX : rg.B.pointWrap.unrotatedParameterX }
        }});
        fapp.captureWind.setText( ast );
    }
    //=================================
    // \\// capturers/readers
    //=================================

}) ();

