
( function() {
    var {
        ns, sn, haz, haff, eachprop,
        sconf,
        fconf,
        ssF, rg,
        sapp, sDomF,
        d8d_p,
        amode,
        studyMods,
    } = window.b$l.apptree({
        modName:'load_init_sapp',
        setModule
    });
    return;





    ///************************************************
    /// this module provides common subroutines
    ///      sapp.init_sapp
    ///      sapp.finish_sapp_UI
    /// for case they will be not provided by
    /// lemma-specific modules
    /// which override common subroutines
    ///************************************************
    function setModule()
    {
        sapp.init_sapp = init_sapp;
        sapp.finish_sapp_UI = finish_sapp_UI;
    }

    ///*********************************************************
    /// this is a default init_supp
    /// it is overridden by lemmas-init_sup if lemma supplies it
    ///*********************************************************
    /// inits model, media, dragges, and sliders
    /// makes loop via study-submodels,
    ///=========================================================
    function init_sapp() 
    {
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            stdMod.mmedia$.cls( 'submodel-' + modName );

            !haz( sconf, 'mediaMoverPointDisabled' ) && sDomF.mediaMoverPoint();

            //todm patch
            //makes importan choice:
            //      media_upcreate          -       for non-standard, past lemmas
            //      media_upcreate_basic    -       for modern, half-automated lemmas    
            stdMod.media_upcreate = ns.haz( stdMod, 'media_upcreate' ) ||
                                    ssF.media_upcreate_basic;
            haff( stdMod, 'createsModelFunctions_before___init_model_parameters' );
            addsDeclaredDraggablePoints();
            stdMod.init_model_parameters();
            haff( stdMod, 'populates__cust_draggers_list' );

            //------------------------------------------------------------------------------
            // //\\ patch: missed bg-image
            //      because it is set in menu
            //      design flaw: menu-state must be done before creating GUI menu;
            //      todm: do fix this;
            //------------------------------------------------------------------------------
            ns.sapp.dnative.bgImage$ =
                ns.fapp.ss.ssData.exegs[ amode['theorion'] ][ amode['aspect'] ]
                    .subexegs[0].imgRk.dom$;
            //------------------------------------------------------------------------------
            // \\// patch: missed bg-image
            //------------------------------------------------------------------------------

            ns.haff( stdMod, 'setsUpTopicScenarios' );
            ssF.parsesTopicScenarios();

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


    ///adds plain point dragger if eigher draggableX, ...Y is defined
    function addsDeclaredDraggablePoints()
    {
        eachprop( rg, (shape,pname) => {
            var drX = haz( shape, 'draggableX' );
            var drY = haz( shape, 'draggableY' );
            if( !drX && !drY ) return;
            sDomF.modelPointDragger({
                pname,
                acceptPos : newPos =>
                {
                    if( drX ) {
                        shape.pos[0] = newPos[0];
                    } else {
                        newPos[0] = shape.pos[0]; //blocks movement
                    }
                    if( drY ) {
                        shape.pos[1] = newPos[1];
                    } else {
                        newPos[1] = shape.pos[1]; //blocks movement
                    }
                    return true;
                },
            });
        });
    }


    function finish_sapp_UI() 
    {
        ssF.mediaModelInitialized = true;
    }
}) ();

