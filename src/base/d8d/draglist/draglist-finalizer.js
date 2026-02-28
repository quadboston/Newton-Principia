(function(){
const {sn, has, haz, eachprop, d8dp, globalCss, sapp, sconf,
      fconf, fmethods,ssF, sDomN, sDomF,stdMod, amode,} =
      window.b$l.apptree({
         sDomFExportList: {finalizesDragList},
    });
return;


//==========================================
/// inits drag model,
//  creates lemmaFW and creates
//  slider for each dragList member,
//==========================================
function finalizesDragList(){
    ///****************************************************************
    /// creates a framework, lemmaD8D,
    /// to which arbitrary drag8droppers can be attached from different
    /// lemma modules
    ///****************************************************************
    var spinnerCursorGrab = sconf.spinnerCursorGrab || 'grab';
    var spinnerCursorGrabbed = sconf.spinnerCursorGrabbed || 'grabbing';
    stdMod.lemmaD8D = d8dp.lemmaFW({

        //findDraggee, if we skip findDraggee,
        //we usually add sDomF.dspos2medpos
        //for correct offset
        dspos2medpos: sDomF.dspos2medpos,

        dragSurface                         : stdMod.medParent,
        decPoint_parentClasses              : fconf.dragPointDecoratorClasses,
        medpos2dspos                       : sDomF.medpos2dspos,
        doCreateDynamicSpinners             : true,
        spinnerCursorGrab,
        spinnerCursorGrabbed,
        DRAGGEE_HALF_SIZE: fconf.DRAGGEE_HALF_SIZE,
    });
    //no need, done in media-model.js:  update_decPoint( decPoint )

    //sets cursor on entire surface
    //other places for this property are:
    //  processDownEvent
    //  processUpEvent
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

