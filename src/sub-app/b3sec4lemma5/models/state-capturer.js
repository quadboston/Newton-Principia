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

    var tr; //       = ssF.tr;
    var tp; //       = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'x';

    srg_modules[ modName + '-' + mCount.count ] = setModule;

    ssF.captureAState = captureAState;
    ssF.astate_2_model8media = astate_2_model8media;










    ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    /// registers model pars into common scope
    ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    function setModule()
    {
    }

    //=================================
    // //\\ capturers/readers
    //=================================
    ///captures AState
    function captureAState()
    {
        var ast = {}; //astate;
        ast.basePosX = [];
        var n = sconf.basePairs.length;
        for( i=0; i<n; i++ ) {
            ast.basePosX[i] = sconf.basePairs[i][0].pos[0];
        }
        ast.chosenExperimentalFunction = rg.chosenExperimentalFunction.value;
        ast.m = rg.m.value;
        fapp.captureWind.setText( ast );
    }

    ///pastes AState
    function astate_2_model8media( cstate )
    {
        var ast = cstate;
        rg.m.value = ast.m;
        rg.chosenExperimentalFunction.value = ast.chosenExperimentalFunction;
        var n = sconf.basePairs.length;
        for( i=0; i<n; i++ ) {
            var points = sconf.basePairs[i];
            var x = ast.basePosX[i];
            points[0].pos[0] = x;
            points[1].pos[0] = x;
        }
        rg.chosenExperimentalFunction.value -= 1;
        //.reuses toggler's code
        ssF.toggleData( !!'dontRunModel' );
        ssF.set_media_state( ast );
        ssF.model8media_upcreate();
    }
    //=================================
    // \\// capturers/readers
    //=================================


}) ();

