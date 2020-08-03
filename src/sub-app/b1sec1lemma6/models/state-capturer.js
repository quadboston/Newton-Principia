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

    ssF.astate_2_media = astate_2_media;
    ssF.astate_2_model8partOfMedia = astate_2_model8partOfMedia;
    return;







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
        var ast = {
            rg: {},
        };
        ns.paste( ast.rg, { curveRotationAngle: rg.curveRotationAngle } );
        ns.paste( ast.rg, { B: { pointWrap:
            { unrotatedParameterX : rg.B.pointWrap.unrotatedParameterX }
        }});
        fapp.captureWind.setText( ast );
    }

    ///pastes AState
    function astate_2_model8media( astate )
    {
        astate_2_model8partOfMedia( astate );
        astate_2_media( astate );
    }

    function astate_2_model8partOfMedia( astate )
    {
        astate && ns.paste( rg, astate.rg );
        ns.haf( ssF, 'model_upcreate' )();
    }

    ///todm: so far, this function exists only because d8d ...
    function astate_2_media( astate )
    {
        ns.haf( ssF, 'media_upcreate' )();
        rg.B.pointWrap.achieved.achieved = rg.B.pointWrap.unrotatedParameterX;
        rg.L.pointWrap.achieved.achieved = [ rg.L.pos[0], rg.L.pos[1] ];
    }


    //=================================
    // \\// capturers/readers
    //=================================

}) ();

