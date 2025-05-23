
( function() {
    var {
        ns, sn, has, haz, haff, eachprop,
        sapp, fapp, sconf, fconf, arios, ssF, sDomF, sDomN, ssD, exegs,
        stdMod, amode, rg,
    } = window.b$l.apptree({
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
    /// makes loop via study-s ubmodels,
    ///=========================================================
    function init_sapp() 
    {
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
        //ccc( 'Remodel: media_upcreate exists = ' + !!haz( stdMod, 'media_upcreate' ) ); 
        stdMod.media_upcreate = haz( stdMod, 'media_upcreate' ) ||
                                ssF.media_upcreate_generic;
        //------------------------------------------------------------------
        // \\// rerouts name "media_upcreate_generic"
        //------------------------------------------------------------------
        haff( stdMod, 'createsModelFunctions_before___init_model_parameters' );
        rgDict__2__dragWrap_gen_list();
        //======================================================
        // \\// definitions
        //======================================================


        //==============================================================
        // //\\ shifted-landing-frames-fix-patch
        //==============================================================
        //todm
        //apparently, severe, possibly year old bug of corrupt
        //scroll/or/missed header/or unknown origin
        //this is a partial fix: (full for Chrome, partial for FF)
        //sDomN.simSScene$$().offsetTop=500;
        //sDomN.medRoot$().offsetTop=550;
        //fapp.homePage$().offsetTop=0;
        sDomN.midddleButton$.a( 'tabindex', '0');
        //breaks border's color: sDomN.midddleButton$().focus();
        //==============================================================
        // \\// shifted-landing-frames-fix-patch
        //==============================================================


        stdMod.init_model_parameters();
        //todm: rename with "dragWrapGenList":
        //on Dec 4, 2021, this is only for lem. 20,21,5
        haff( stdMod, 'populates__cust_draggers_list' );

        {
            ////for "sites" which have user-guiding-scenarios
            var parsesTopicScenarios = haz( ssF, 'parsesTopicScenarios' );
            if( parsesTopicScenarios ) {

                //apparently, this completes assembling of scripts among
                //them own: pieces are merged to be later parsed with
                //parsesTopicScenarios()
                arios.forEach( as => { as(); } );

                //apparently, pieces are parsed now
                haff( ssF, 'parsesTopicScenarios' );
                haff( ssF, 'doInitTopicScenarioCss' );
            }
        }

        ssF.in_subessay_launch____amode2lemma();
        haff( stdMod, 'sliders_value2pos' );
        stdMod.media_upcreate(); //todm apparently needed for
        !sconf.skipGenDragList && sDomF.createsFW__8__executes_dragWr_gens_list();

        //=======================================================
        // //\\ executes "lesson-guide-scenario" from start-event
        //=======================================================
        eachprop( exegs[ amode.logic_phase ][ amode.aspect ].subessay2subexeg,
                    (subessayRack, sname) => {
            if( haz( subessayRack, 'stateId2state' ) ) {
                subessayRack.scenario_stateId = 'start';
                //user activity in every subessay becomes aware about
                //beginning of the lesson
                ssF.executesTopicScenario( 'lesson-start', sname );
            }
        });
        //=======================================================
        // \\// executes "lesson-guide-scenario" from start-event
        //=======================================================

        if( has( stdMod, 'model8media_upcreate' ) ) {
            ////to=200 feels choppy,
            ////to=100 helps,
            stdMod.model8media_upcreate = ns.throttle( stdMod.model8media_upcreate, 20 );
        }
    }


    ///adds plain point dragger if either draggableX, ...Y is defined
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
                stdMod,
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

