( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    fapp.lemmaConfig = lemmaConfig;    
    return;



    function lemmaConfig()
    {
        return {
            dontRun_ExpandConfig : true,
            codesList :
            [
                { src:'sconf.js' },
                { src:'main.js' },

                {  src:"css/css-order.js" },
                {  src:"css/widget-media.css.js" },
                {  src:"css/slider.css.js" },
                {  src:"css/model.css.js" },
                {  src:"css/inner-page.css.js" },
                {  src:"core/common/preset-data.js" },
                {  src:"core/common/dom.js" },
                {  src:"core/common/d8d-model.js" },
                {  src:"core/gui-construct.js" },
                {  src:"core/gui-slider.js" },
                {  src:"core/gui-update.js" },
                {  src:"core/common/gui-visibility.js" },
                {  src:"core/gui-widthest.js" },
                {  src:"core/model.js" },
                {  src:"core/common/event-handlers.js" }
            ],
            "contents-list" :
            [
                "texts.content.txt",
            ],
            mediaBgImage : "lemma-23-3rd-ed.png",
        };
    }

}) ();

