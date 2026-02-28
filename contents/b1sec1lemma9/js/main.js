(function(){
    const {sconf, ssF} =
        window.b$l.apptree({ ssFExportList: { finish_sapp_UI,}
    });
    ///overrides .../lemma/main.js::ssF.finish_sapp_UI
    function finish_sapp_UI (){
        !sconf.hideProofSliderCompletely && ssF.create_proofSlider();
        ssF.mediaModelInitialized = true;
    }
})();