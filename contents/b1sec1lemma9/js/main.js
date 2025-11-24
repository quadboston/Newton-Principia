( function() {
    var {
        eachprop,
        sconf, sapp, ssF,
        stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    return;





    function setModule()
    {
        sapp.finish_sapp_UI = finish_sapp_UI;
    }

    ///how this sub is called?
    ///answer: this sub is added after *.html landing scripts added,
    ///        so it overrides common .../lemma/main.js::sapp.finish_sapp_UI
    function finish_sapp_UI() 
    {
        !sconf.hideProofSliderCompletely && ssF.create_proofSlider();
        ssF.mediaModelInitialized = true;
    }


}) ();

