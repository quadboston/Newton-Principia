
( function() {
    var {
        ns, sn,
        sconf,
        fconf,
        ssF,
        sapp, sDomF,
        d8d_p,
        amode,
        studyMods,
    } = window.b$l.apptree({
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

            //todm patch
            stdMod.media_upcreate = ns.haz( stdMod, 'media_upcreate' ) ||
                                    ssF.media_upcreate_basic;
            stdMod.init_model_parameters();
            ns.haff( stdMod, 'populates__cust_draggers_list' );

            //------------------------------------------------------------------------------
            // //\\ patch: missed bg-image
            //      because it is set in menu
            //      design flaw: menu-state must be done before creating GUI menu;
            //      todm: do fix this;
            //------------------------------------------------------------------------------
            ns.sapp.dnative.bgImage$ =
                ns.fapp.ss.ssData.exegs[ amode['theorion'] ][ amode['aspect'] ].subexegs[0].imgRk.dom$;
            //------------------------------------------------------------------------------
            // \\// patch: missed bg-image
            //------------------------------------------------------------------------------

            ssF.amode2lemma();
            ns.haf( stdMod, 'sliders_value2pos' )();
            stdMod.media_upcreate(); //todm apparently needed for
                                     //finalizes_custDraggers8toolsSliders_on_ownFramwk
            if( ns.h( stdMod, 'model8media_upcreate' ) ) {
                ////to=200 feels choppy,
                ////to=100 helps,
                stdMod.model8media_upcreate = ns.throttle( stdMod.model8media_upcreate, 20 );
            }
            ns.haf( stdMod, 'finalizes_custDraggers8toolsSliders_on_ownFramwk' )();
        });
    }

    function finish_sapp_UI() 
    {
        ssF.mediaModelInitialized = true;
    }
}) ();

