
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var html        = sn('html');

    var fapp        = sn('fapp' );
    //var fmethods    = sn('methods',fapp);
    //var fconf       = sn('fconf',fapp);
    //var sconf       = sn('sconf',fconf);
    //var d8d_p       = sn('d8d-point',fmethods);

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
    return;







    function setModule()
    {
        sapp.init_astate2sapp = init_astate2sapp;
    }


    function init_astate2sapp()
    {
        ///todm: we assume all the studyMods are already created as
        ///part of "setModule()::stdMod = sn(SUB_MODEL, studyMods).... "
        ///and we add astate_2_rg8model8media to each study model ...
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            stdMod.astate_2_rg8model8media  = astate_2_rg8model8media;
            stdMod.astate_2_rg8model        = astate_2_rg8model;
            stdMod.astate_2_media           = astate_2_media;
            return;

            function astate_2_rg8model8media( astate )
            {
                astate_2_rg8model( astate );
                astate_2_media();
            }

            function astate_2_rg8model( astate )
            {
                astate && ns.paste( rg, astate );
                stdMod.model_upcreate();
            }

            ///todm: so far, this function exists only because d8d ...
            function astate_2_media()
            {
                ns.haf( stdMod, 'sliders_value2pos' )();
                stdMod.media_upcreate();
                //no longer needed: ns.haf( stdMod, 'rg2achieved' )();
            }
        });
    }    



}) ();

