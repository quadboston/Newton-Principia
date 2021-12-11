( function() {
    var {
        sn, has,
        sapp, fconf, sconf, ssF,
        studyModsActivated,
    } = window.b$l.apptree({
        stdModExportList :
        {
        },
        setModule,
    });
    return;





    function setModule()
    {
        sapp.init_sapp = init_sapp;
        sapp.finish_sapp_UI = finish_sapp_UI;
    }

    //=========================================================
    // //\\ inits app
    //=========================================================
    function init_sapp() 
    {
        //======================================
        // //\\ inits model and it's view
        //======================================
        studyModsActivated.forEach( stdMod => {
            if( has( stdMod, 'model8media_upcreate' ) ) {
                stdMod.model8media_upcreate();
                if( stdMod.SUB_MODEL === 'limit-definition' ) {
                    stdMod.initDragModel()
                }
            }
        });
        sapp.updatesLemmaCss();
        //======================================
        // \\// inits model and it's view
        //======================================
    }

    function finish_sapp_UI() 
    {
        ssF.mediaModelInitialized = true;
    }
    //=========================================================
    // \\// inits app
    //=========================================================

}) ();

