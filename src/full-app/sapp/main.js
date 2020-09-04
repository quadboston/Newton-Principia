
( function() {
    var {
        ns, sn,
        sconf,
        fconf,
        ssF,
        sapp, sDomF,
        d8d_p,
        studyMods,
    } = window.b$l.app({
        modName:'load_init_sapp',
        setModule
    });
    return;





    function setModule()
    {
        sapp.init_sapp = init_sapp;
        sapp.finish_sapp_UI = finish_sapp_UI;
    }

    ///==============================================
    /// inits model, media, dragges, and sliders
    /// makes loop via study-submodels,
    ///==============================================
    function init_sapp() 
    {
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            stdMod.mmedia$.cls( 'submodel-' + modName );
            sDomF.mediaMoverPoint();
            stdMod.init_model_parameters();
            ns.haff( stdMod, 'populates__cust_draggers_list' );
            stdMod.amode2lemma( 'rg8model' );
            stdMod.amode2lemma( 'media' );
            ns.haf( stdMod, 'launches___medD8D__8__cust8tools_sliders' )();
        });
    }

    function finish_sapp_UI() 
    {
        ssF.mediaModelInitialized = true;
    }
}) ();

