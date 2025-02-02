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

                {  src:"css/css-order.js" },
                {  src:"css/slider.css.js" },
                {  src:"css/model.css.js" },
                {  src:"css/inner-page.css.js" },
                {  src:"dom.js" },
                {  src:"d8d-model.js" },
                {  src:"gui-construct.js" },
                {  src:"gui-slider.js" },

                {  src:"model-upcreate.js" },
                {  src:"model-aux.js" },
                {  src:"media-upcreate.js" },
                {  src:"gui-update.js" },
                {  src:"gui-update-widest.js" },
                {  src:"event-handlers.js" },
                {  src:"amode2captures.js" }
            ],
            "contents-list" :
            [
                "../lemma2/txt/latin.txt",
                "../lemma2/txt/cohen.txt",
                "../lemma2/txt/video.txt",
            ],

        };
    }

}) ();

