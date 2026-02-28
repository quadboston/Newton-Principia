( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' );
    fapp.lemmaConfig = lemmaConfig;
    return;



    function lemmaConfig()
    {
        return {
            codesList :
            [
                { src:'sconf.js' },
                { src:'init-model-parameters.js' },

                {  src:"dom.js" },
                {  src:"d8d-model.js" },
                {  src:"gui-construct.js" },
                {  src:"gui-slider.js" },

                {  src:"model-upcreate.js" },
                {  src:"model-aux.js" },
                {  src:"media-upcreate.js" },
                {  src:"gui-update.js" },
                {  src:"gui-sync-points.js" },
                {  src:"gui-update-widest.js" },
                {  src:"gui-swap-monotonity.js" },
                {  src:"event-handlers.js" },
                {  src:"amode2captures.js" }
            ],
            "contents-list" :
            [
                "../b1sec1lemma2/txt/latin.txt",
                "../b1sec1lemma2/txt/cohen.txt",
                "../b1sec1lemma2/txt/video.txt",
            ],

        };
    }

}) ();

