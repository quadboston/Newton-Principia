(function(){
const {sn, has, stdMod, sapp, fconf, sconf, ssF,} =
    window.b$l.apptree({ ssFExportList: {
        finish_sapp_UI,
        init_sapp,
    },
});
return;


///inits model and it's view
function init_sapp (){
    if( has( stdMod, 'model8media_upcreate' ) ) {
        stdMod.model8media_upcreate();
        stdMod.initDragModel()
    }
    sapp.updatesLemmaCss();
}

///this thing overrides app-wide finish_sapp_UI
function finish_sapp_UI()
{
    ssF.mediaModelInitialized = true;
}
})();

