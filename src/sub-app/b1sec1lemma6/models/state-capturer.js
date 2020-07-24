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
    ssF.appState__2__study8media__models = appState__2__study8media__models;










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
    function appState__2__study8media__models( astate )
    {
        ns.paste( rg, astate.rg );
        rg.B.pointWrap.achieved.achieved = rg.B.pointWrap.unrotatedParameterX;
        sDomF.detected_user_interaction_effect();

        ssF.model8media_upcreate();

        //ccc( 'restored: after upcr: L.pos=', JSON.stringify( rg.L.pointWrap.pos ));
        rg.L.pointWrap.achieved.achieved = [ rg.L.pos[0], rg.L.pos[1] ];
    }
    //=================================
    // \\// capturers/readers
    //=================================

}) ();

