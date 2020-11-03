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
    function captureAState( ast )
    {
        var ast = ast || {}; //astate;

        Object.keys( sconf.pname2point ).forEach( pname => {
            if( pname === 'media-mover' ) return; //todm ... non-elegant
            var p = rg[ pname ].pos;
            ast[ pname ] = { pos : [ p[0], p[1] ] }; //vital to clone
        });

        ast.chosenExperimentalFunction = { value: rg.chosenExperimentalFunction.value };
        ast.m = { value : rg.m.value };
        fapp.captureState( ast );
    }
    //=================================
    // \\// capturers/readers
    //=================================

}) ();

