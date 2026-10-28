(function(){
const {sn, has, haz, eachprop, d8dp, globalCss, sapp, sconf,
      fconf, fmethods, ssF, sDomF,stdMod, amode,} =
      window.b$l.atree({
         sDomFExportList: {init_dragList},
    });
return;


//==========================================
/// inits drag model,
//  creates lemmaFW and creates
//  slider for each dragList member,
//==========================================
function init_dragList(){
    ///****************************************************************
    /// creates a framework, lemmaD8D,
    /// to which arbitrary drag8droppers can be attached from different
    /// lemma modules
    ///****************************************************************
    var spinnerCursorGrab = sconf.spinnerCursorGrab || 'grab';
    var spinnerCursorGrabbed = sconf.spinnerCursorGrabbed || 'grabbing';
    stdMod.lemmaD8D = d8dp.lemmaFW({
        //findDraggee, if we skip findDraggee,
        //we usually add sDomF.pos_dom2med
        //for correct offset
        pos_dom2med: sDomF.pos_dom2med,

        dragSurface                         : stdMod.medParent,
        dragPointDecoratorClasses              : fconf.dragPointDecoratorClasses,
        pos_med2dom                       : sDomF.pos_med2dom,
        doCreateDynamicSpinners             : true,
        spinnerCursorGrab,
        spinnerCursorGrabbed,
        DRAGGEE_HALF_SIZE: fconf.DRAGGEE_HALF_SIZE,
        skipD8D: ssF.skipD8D,
    });
    //no need, done in media-model.js:  update_decPoint( decPoint )

    //sets cursor on entire surface
    //other places for this property are:
    //  processDownEvent_IV
    //  processUpEvent_IV
    if( !sconf.mediaMover_isDisabled ){
        //vital for appearing of 'grab" right at the launch
        stdMod.medParent.style.cursor = 'grab';
    }
    ///***********************************************************************
    /// attaches drag8droppers to lemmaD8D
    /// see other lemmas for search-token dragList
    stdMod.dragList.forEach( dcreator => { dcreator( stdMod.lemmaD8D ); });
    ///***********************************************************************
    globalCss.update(); //for decorator
}
})();

