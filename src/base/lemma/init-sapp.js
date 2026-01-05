(function(){
    const {
        ns, sn, nspaste, has, haz, haff, eachprop,
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
        !sconf.skipGenDragList && sDomF.createsFW__8__executes_dragWr_gens_list();
        if( fconf.sappId === 'b1sec1lemma9' ||
            fconf.sappId === 'b1sec1lemma10'
        ){
            //c cc( 'calls sDomF.createsFW__8__executes_dragWr_gens_list ' );
            //kvk: there was a set of bugs: stdMod.medD8D is not yet exists,
            //it is possibly created in finalizes-custDraggers8toolsSliders.js,
            //c cc( 'calling by expecting it exists, stdMod.medD8D=', !!stdMod.medD8D );
            //this is an overengineering:
            stdMod.media_upcreate(); //todm apparently needed for
            stdMod.initDragModel( stdMod.medD8D )
        }
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
    ///todo bad: dragWrap_gen_list --> rgDict__2__draggers_list
    function rgDict__2__dragWrap_gen_list (){
        eachprop( rg, (shape,pname) => {
            var drX = haz( shape, 'draggableX' );
            var drY = haz( shape, 'draggableY' );
            if( !drX && !drY ) return;
            sDomF.params__2__rgX8dragwrap_gen_list({
                stdMod,
                pname,
                nospinner : haz( shape, 'nospinner' ),
                //todm
                //orientation : drY&drX ? 'rotate' : ( drX ? 'axis-x' : 'axis-y' ),

                pos : rg.pos, //todo not tested app wide, and why one needs pos?
                acceptPos : haz( shape, 'acceptPos' ) || ( newPos =>
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
                }),
            });
        });
    }

    function finish_sapp_UI()
    {
        ssF.mediaModelInitialized = true;
    }
})();
