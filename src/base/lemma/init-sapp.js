///************************************************
/// this module provides common subroutines
///      sapp.init_sapp
///      sapp.finish_sapp_UI
/// for case they will be not provided by
/// lemma-specific modules
/// which override common subroutines
///************************************************
(function(){

const {
    ns, sn, nspaste, has, haz, haff, eachprop, fmethods,
    sapp, fapp, sconf, fconf, arios, ssF, sDomF, sDomN, ssD, exegs,
    stdMod, amode, rg,
} = window.b$l.apptree({
    ssFExportList:  {
        finish_sapp_UI,
        init_sapp,
    },
});
return;


///*********************************************************
/// this is a default init_supp
/// it is overridden by lemmas-init_sup if lemma supplies it
///*********************************************************
/// inits model, media, dragges, and sliders
/// makes loop via study-s ubmodels,
///=========================================================
function init_sapp (){
    //------------------------------------------------------------------
    // //\\ rerouts name "media_upcreate_generic"
    //------------------------------------------------------------------
    // to           "media_upcreate"
    // makes importan choice:
    // media_upcreate         - for non-standard, past lemmas
    // media_upcreate_generic - for modern, half-automated lemmas
    stdMod.media_upcreate = haz( stdMod, 'media_upcreate' ) ||
                            ssF.media_upcreate_generic;
    //------------------------------------------------------------------
    // \\// rerouts name "media_upcreate_generic"
    //------------------------------------------------------------------

    haff( stdMod,
          'createsModelFunctions_before___init_model_parameters' );
    !sconf.mediaMover_isDisabled && sDomF.rgxMediaMover2draglist();
    if( sconf.enableZoom ){
        fmethods.attachWeelToDomEl(stdMod.medScene$,);
    }
    //preliminary draglist builder,
    //happens before init_lemma to allow methods override
    //picks up only rgx labeled with draggableX, ...Y
    ssF.rg2draglist();

    //==============================================================
    // //\\ shifted-landing-frames-fix-patch
    //==============================================================
    //todm
    //apparently, severe, possibly year old bug of corrupt
    //scroll/or/missed header/or unknown origin
    //this is a partial fix: (full for Chrome, partial for FF)
    //sDomN.simSScene$$().offsetTop=500;
    //stdMod.medParent().offsetTop=550;
    //fapp.homePage$().offsetTop=0;
    sDomN.midddleButton$.a( 'tabindex', '0');
    //breaks border's color: sDomN.midddleButton$().focus();
    //==============================================================
    // \\// shifted-landing-frames-fix-patch
    //==============================================================

    stdMod.init_lemma();

    if( fconf.sappId === 'b3lemma5' ){
        haff( stdMod, 'populates__cust_draggers_list' );
    }
    ////for "sites" which have user-guiding-scenarios
    if( haz( ssF, 'parsesTopicScenarios' ) ) {
        //apparently, this completes assembling of scripts among
        //them own: pieces are merged to be later parsed with
        //parsesTopicScenarios()
        arios.forEach( as => { as(); } );

        //apparently, pieces are parsed now
        haff( ssF, 'parsesTopicScenarios' );
        haff( ssF, 'doInitTopicScenarioCss' );
    }
    ssF.in_subessay_launch____amode2lemma();
    haff( stdMod, 'sliders_value2pos' );
    if( fconf.sappId === 'b3lemma5' ){
        stdMod.media_upcreate();
    }

    //generates delayed framwork: stdMod.lemmaD8D,
    sDomF.finalizesDragList();

    if( fconf.sappId === 'b1sec1lemma9' ||
        fconf.sappId === 'b1sec1lemma10'
    ){
        //this is an overengineering:
        stdMod.media_upcreate();
        stdMod.initDragModel(
            stdMod.lemmaD8D //created in sDomF.finalizesDragList()
        )
    }
    //=======================================================
    // //\\ executes "lesson-guide-scenario" from start-event
    //=======================================================
    eachprop(
        exegs[ amode.logic_phase ][ amode.aspect ].subessay2subexeg,
        (subessayRack, sname) => {
            if( haz( subessayRack, 'stateId2state' ) ) {
                subessayRack.scenario_stateId = 'start';
                //user activity in every subessay becomes
                //aware about beginning of the lesson
                ssF.executesTopicScenario( 'lesson-start', sname );
            }
    });
    //=======================================================
    // \\// executes "lesson-guide-scenario" from start-event
    //=======================================================

    //todo sign of poor design ... surprise ... easy to forget
    if( has( stdMod, 'model8media_upcreate' ) ) {
        ////to=200 feels choppy,
        ////to=100 helps,
        stdMod.model8media_upcreate =
            ns.throttle( stdMod.model8media_upcreate, 20 );
    }
}

function finish_sapp_UI (){
    ssF.mediaModelInitialized = true;
}
})();
