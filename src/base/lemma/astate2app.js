
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var html        = sn('html');

    var fapp        = sn('fapp' );
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp');

    //.study models
    //.one of possible of them is SUB_MODEL = 'common'
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);





    //========================================================
    // srg = ? sub-application registry
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'astate2sapp';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //========================================================


    var {
        ns, sn, $$,
        sconf, fconf,
        fapp, sapp, ss,
        fmethods,
        ssF,
        sDomF, sDomN, amode,
        studyMods,
        amode,
        wrkwin,
        exegs,
    } = window.b$l.apptree({
    });
    return;







    function setModule()
    {
        sapp.init_astate2sapp = init_astate2sapp;
    }


    ///inits effective or empty astate_2_.... functions
    function init_astate2sapp()
    {
        ///todm: we assume all the studyMods are already created as
        ///part of "setModule()::stdMod = sn(SUB_MODEL, studyMods).... "
        ///and we add astate_2_rg8model8media to each study model ...
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            stdMod.astate_2_rg8model8media  = astate_2_rg8model8media;
            stdMod.astate_2_rg8model        = astate_2_rg8model;
            return;

            function astate_2_rg8model8media( astate, astateKey )
            {
                astate_2_rg8model( astate, astateKey );
                ns.haff( stdMod, 'sliders_value2pos' );
                //haff is for lemmas from the past: l1, l2, ...
                ns.haff( stdMod, 'media_upcreate' );
            }

            function astate_2_rg8model( astate, astateKey )
            {
                if( astate ) {
                    ns.paste( rg, astate );
                    rg.astateKey = astateKey;
                    ///patch: changes non-rg property: media center:
                    ///todm: legalize;
                    var mcenter = ns.haz( astate, 'media-mover' );
                    if( mcenter ) {
                        var mcenterA = ns.haz( mcenter, 'achieved' );
                        if( mcenterA ) {
                            var mcenterAA = ns.haz( mcenterA, 'achieved' );
                            if( mcenterAA ) {
                                sconf.activeAreaOffsetX = mcenterAA[0];
                                sconf.activeAreaOffsetY = mcenterAA[1];
                            }
                        }
                    }
                    var subessay = ns.haz( astate, 'subessay' );
                    if( subessay ) {
                        amode.subessay = subessay;
                    }
                }
                ns.haff( stdMod, 'model_upcreate' );
            }
        });
    }    



}) ();

