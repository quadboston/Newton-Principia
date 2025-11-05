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
                //todm: automate this list
                { src:'sconf-common.js' },
                { src:'sconf.js' },
                { src:'init-datareg.js' },
                { src:'init-model-parameters.js' },
                { src:"transform-functions.js" },
                { src:"curve-functions.js" },

                {  src:"dom.js" },
                {  src:"areas-legend.js" },
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
                {  src:"amode2captures.js" },
            ],
            "contents-list" :
            [
                "txt/latin.txt",
                "txt/cohen.txt",
                "txt/video.txt",
            ],
            //optional additional reference html
            referencesForAllLemmaEssays : '',
        };
    }

}) ();

