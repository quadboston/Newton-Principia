(function(){
var { sconf, sapp, ssF,  stdMod,} =
    window.b$l.apptree({ ssFExportList: {
        finish_sapp_UI,
    }
});
return;


///overrides .../lemma/main.js::ssF.finish_sapp_UI
function finish_sapp_UI()
{
    stdMod.initDragModel( stdMod.medD8D ); //todm: patch
    !sconf.hideProofSliderCompletely && ssF.create_proofSlider();
    ssF.mediaModelInitialized = true;
}
})();