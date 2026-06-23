(function(){
const {
    //nsd, //vital-for-mobile
    $$, nspaste, cssp, d8dp, stripp, fapp, fmethods, fconf,
    sDomN, sDomF, rootWnd, dividorFractions, amode, } =
    window.b$l.atree({
});
rootWnd.loads_dividorState_from_sessionStore = loads_dividorState_from_sessionStore;
rootWnd.stores_dividorState_to_sessionStorage = stores_dividorState_to_sessionStorage;
rootWnd.createDividorResizer = createDividorResizer;
return;


///===================================================
/// Store partition handle positions in sessionStorage
///===================================================
//This allows them to be...
//-Different for the text and video tabs
//-Remembered when refreshing the page
function gets_dividor_sessionStoreId() {
    //Determine the key (in sessionStorage) for the current
    //tab (text or video).
    //Note that amode['aspect'] stores the relevant tab information.
    //It equals 'video' for the video tab (also 'video' for the
    //"Elucidation" tab for "Book 1, Sec 1, Lemma 9").
    //Otherwise something else for the text tab such as 'english'.
    const isVideo = amode['aspect'] === 'video';
    return "pos-partition-handle-" + (isVideo ? "video" : "text");
}

function loads_dividorState_from_sessionStore() {
    //Load partition handle values for the current
    //tab from sessionStorage.
    if (dividorFractions?.length === 2 &&
        rootWnd?.dividor?.achievedtop?.achieved
    ){
        const key = gets_dividor_sessionStoreId();
        const value = sessionStorage.getItem(key);
        //Load values if exist.
        if (value) {
            const values = stripp(JSON.parse(value));
            if (values?.dividorFractions.length === 2 &&
                values?.achieved.length === 2) {
                dividorFractions[0] = values.dividorFractions[0];
                dividorFractions[1] = values.dividorFractions[1];
                rootWnd.dividor.achievedtop.achieved = nspaste([], values.achieved);
                return;
            }
        }

        //Values not set so use default.
        const dividorFractionsDefault = gets_defaultDividorFractions();
        dividorFractions[0] = dividorFractionsDefault[0];
        dividorFractions[1] = dividorFractionsDefault[1];
        rootWnd.dividor.achievedtop.achieved = nspaste([], dividorFractions);
    }
}

function stores_dividorState_to_sessionStorage() {
    //Store partition handle values for the current
    //tab in sessionStorage.
    const values = {
        dividorFractions: rootWnd?.dividorFractions || "",
        achieved: rootWnd?.dividor?.achievedtop?.achieved || ""
    };
    const key = gets_dividor_sessionStoreId();
    sessionStorage.setItem(key, JSON.stringify(values));
}

//=========================================================
/// creates DividorResizer
//=========================================================
function gets_defaultDividorFractions() {
    const fracLeft = fconf.ESSAY_FRACTION_IN_WORKPANE;
    return [fracLeft, 1 - fracLeft];
}

function createDividorResizer (){
    nspaste(dividorFractions, gets_defaultDividorFractions());
    rootWnd.dividor = stripp();

    //---------------------------
    // //\\ dom roots
    //      root, handle, and css-placeholder
    //---------------------------
    var wResizer = $$
        .c( 'div' )
        .a( 'class', cssp +'-resizable-handle' )
        .a( 'id', cssp +'-resizable-handle' )
        .to( sDomN.simSScene$ )
        ();
    var mediaHorizontalHandler = $$
        .c( 'img' )
        .a( 'src', fconf.engineImg + '/vertical.png' )
        .to( wResizer )
        ();
    ///dynamic CSS placeholder
    sDomN.mediaHorizontalHandlerCSS$ = $$.style().to(document.head);
    //---------------------------
    // \\// dom roots
    //---------------------------




    //.........................................
    // creates lower-layer framework
    //.........................................
    fmethods.panesD8D = d8dp.lemmaFW({
        dragSurface : fapp.fappRoot$(),
        DRAGGEE_HALF_SIZE: fconf.DRAGGEE_HALF_SIZE,

        //note: this is a flag and is excluded:
        //dspos2medpos: sDomF.dspos2medpos,

        //todM : do this:
        //DRAG_POINTS_THROTTLE_TIME : fconf.DRAG_POINTS_THROTTLE_TIME
    });

    ///============================================================
    /// creates point dragger
    ///============================================================
    //.id is vital to have for removing extra disk over dividor
    rootWnd.dividor.spinnerClsId = 'dividor';   //makes a placeholder for handler
    rootWnd.dividor.makeCentralDiskInvisible = true;
    fmethods.panesD8D.pointWrap_2_dragWraps({
        pointWrap           : rootWnd.dividor,
        update_decPoint     : 'update_decPoint_default',
        finish_DownMoveUp           : finish_DownMoveUp,
        dragHandleDOM       : mediaHorizontalHandler,
        //already a default spinnerCursorGrab   : 'grab',
        //already a default spinnerCursorGrabbed: 'grabbing',
    });

    //Load the following now that the dragger is setup.
    loads_dividorState_from_sessionStore();
    return;


    ///=================================================================
    /// defines drag processor
    ///=================================================================
    function finish_DownMoveUp( arg )
    {
        switch( arg.down_move_up ) {
            case 'down':
                //Store the partition handle's start position,
                //also update the sessionStorage.
                rootWnd.dividor.achievedtop.achieved = nspaste([], dividorFractions);
                rootWnd.stores_dividorState_to_sessionStorage();
                break;
            case 'move':
                //vital-for-mobile
                //nsd('mv: res and sl');
                //Move the partition handle, and adjust the width
                //of the text and model areas.
                const xOffset = arg.surfaceMoveFromDownToCurrent[0];
                rootWnd.start8finish_media8Ess8Legend_resize__upcreate(xOffset);
                break;
        }
    }
}
})();