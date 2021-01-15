
( function() {
    var {
        ns, sn, haz, haff, eachprop,
        sconf,
        fconf,
        ss,
        ssF, rg,
        sapp,
        sDomF,
        d8d_p,
        exegs,
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

            //======================================================
            // //\\ definitions
            //======================================================
            !haz( sconf, 'mediaMoverPointDisabled' ) &&
                  sDomF.creates_mediaMover_in_rgX8dragWrapGenList();
            //------------------------------------------------------------------
            // //\\ rerouts name "media_upcreate_generic"
            //------------------------------------------------------------------
            //      to           "media_upcreate" 
            //      todm patch
            //makes importan choice:
            //      media_upcreate          -       for non-standard, past lemmas
            //      media_upcreate_generic    -     for modern, half-automated lemmas    
            stdMod.media_upcreate = ns.haz( stdMod, 'media_upcreate' ) ||
                                    ssF.media_upcreate_generic;
            //------------------------------------------------------------------
            // \\// rerouts name "media_upcreate_generic"
            //------------------------------------------------------------------
            haff( stdMod, 'createsModelFunctions_before___init_model_parameters' );
            rgDict__2__dragWrap_gen_list();
            //======================================================
            // \\// definitions
            //======================================================


            stdMod.init_model_parameters();
            //todm: rename with "dragWrapGenList":
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

            ( function() {
                ////for "sites" which have user-guiding-scenarios
                var ts = haz( ss, 'activityScenario' );
                if( ts ) {
                    var activityScenarios = haz( ts, 'activityScenarios' );
                    var parsesTopicScenarios = haz( ssF, 'parsesTopicScenarios' );
                    if( activityScenarios && parsesTopicScenarios ) {
                        activityScenarios.forEach( as => { as(); } );
                        ns.haff( ssF, 'parsesTopicScenarios' );
                        ns.haff( ssF, 'doInitTopicScenarioCss' );
                    }
                }
            }) ();

            ssF.in_subessay_launch____amode2lemma();
            ns.haf( stdMod, 'sliders_value2pos' )();
            stdMod.media_upcreate(); //todm apparently needed for
                                     //createsFW__8__executes_dragWr_gens_list

            ns.haff( stdMod, 'createsFW__8__executes_dragWr_gens_list' );

            //=========================================================================
            // //\\ executes topic scenario from start-event
            //=========================================================================
            eachprop( exegs[ amode.theorion ][ amode.aspect ].subessay2subexeg,
                      (subessayRack, sname) => {
                if( haz( subessayRack, 'stateId2state' ) ) {
                    subessayRack.scenario_stateId = 'start';
                    //user activity in every subessay becomes aware about
                    //beginning of the lesson
                    ssF.executesTopicScenario( 'lesson-start', sname );
                }
            });
            //=========================================================================
            // \\// executes topic scenario from start-event
            //=========================================================================

            if( ns.h( stdMod, 'model8media_upcreate' ) ) {
                ////to=200 feels choppy,
                ////to=100 helps,
                stdMod.model8media_upcreate = ns.throttle( stdMod.model8media_upcreate, 20 );
            }
        });
    }


    ///adds plain point dragger if eigher draggableX, ...Y is defined
    function rgDict__2__dragWrap_gen_list()
    {
        eachprop( rg, (shape,pname) => {
            var drX = haz( shape, 'draggableX' );
            var drY = haz( shape, 'draggableY' );
            if( !drX && !drY ) return;

            //if( shape.pname === 'fret-0-0' ) {
            //  ccc( 'automatically ads drag-ability for ' + shape.pname + ' ' +
            //        ' nospinner=' + haz( shape, 'nospinner' ) );
            //}

            sDomF.params__2__rgX8dragwrap_gen_list({
                pname,
                nospinner : haz( shape, 'nospinner' ),

                //todm 
                //orientation : drY&drX ? 'rotate' : ( drX ? 'axis-x' : 'axis-y' ),

                //pos,
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

