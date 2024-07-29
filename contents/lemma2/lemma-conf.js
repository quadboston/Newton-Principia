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
                { src:'main.js' },

                {  src:"css/css-order.js" },
                {  src:"css/slider.css.js" },
                {  src:"css/model.css.js" },
                {  src:"css/inner-page.css.js" },
                {  src:"core/js/preset-data.js" },
                {  src:"core/js/dom.js" },
                {  src:"core/js/d8d-model.js" },
                {  src:"core/gui-construct.js" },
                {  src:"core/gui-slider.js" },
                {  src:"core/gui-update.js" },
                {  src:"core/gui-update-2.js" },
                {  src:"core/gui-update-widest.js" },
                {  src:"core/model.js" },
                {  src:"core/js/event-handlers.js" },
                {  src:"core/amode2captures.js" }
            ],
            "contents-list" :
            [
                "txt/latin.txt",
                "txt/cohen.txt",
                "txt/video.txt",
            ],

        };
    }

}) ();

