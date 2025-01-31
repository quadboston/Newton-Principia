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
                {  src:"core/common/preset-data.js" },
                {  src:"core/common/dom.js" },
                {  src:"core/common/d8d-model.js" },
                {  src:"core/gui-construct.js" },
                {  src:"core/gui-slider.js" },
                {  src:"core/gui-update.js" },
                {  src:"core/gui-update-2.js" },
                {  src:"core/gui-update-widest.js" },
                {  src:"core/model.js" },
                {  src:"core/common/event-handlers.js" },
                {  src:"core/amode2captures.js" }
            ],
            "contents-list" :
            [
                "./txt/claim-xixcentury.content.txt",
                "./txt/proof-xixcentury.content.txt",
                "./txt/proof-xix-century-II.content.txt",
                "./txt/proof-xix-century-II.svg.txt",
                "./txt/proof-xix-century-III.content.txt",
            ],

        };
    }

}) ();

