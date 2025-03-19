( function() {
    var {
        //nsd, //vital-for-mobile
        $$, nspaste, cssp, d8dp,
        fapp, fmethods, fconf, sDomN, wrkwin, dividorFractions,
        amode,
    } = window.b$l.apptree({
    });
    wrkwin.loadPosPartitionHandle = loadPosPartitionHandle;
    wrkwin.storePosPartitionHandle = storePosPartitionHandle;
    wrkwin.createDividorResizer = createDividorResizer;
    return;



    


    ///=============================================================================
    /// Store partition handle positions in sessionStorage
    ///=============================================================================
    //This allows them to be...
    //-Different for the text and video tabs
    //-Remembered when refreshing the page

    function keyPosPartitionHandle() {
        //Determine the key (in sessionStorage) for the current tab (text or video).
        //Note that amode['aspect'] stores the relevant tab information.  It equals 'video'
        //for the video tab (also 'video' for the "Elucidation" tab for "Book 1, Sec 1, Lemma 9").
        //Otherwise something else for the text tab such as 'english'.
        const isVideo = amode['aspect'] === 'video';
        return "pos-partition-handle-" + (isVideo ? "video" : "text");
    }

    function loadPosPartitionHandle() {
        //Load partition handle values for the current tab from sessionStorage.
        if (dividorFractions?.length === 2 && wrkwin?.dividor?.achieved?.achieved) {
            const key = keyPosPartitionHandle();
            const value = sessionStorage.getItem(key);
            //Load values if exist.
            if (value) {
                const values = JSON.parse(value);
                if (values?.dividorFractions?.length === 2 && values?.achieved?.length === 2) {
                    dividorFractions[0] = values.dividorFractions[0];
                    dividorFractions[1] = values.dividorFractions[1];
                    wrkwin.dividor.achieved.achieved = nspaste([], values.achieved);
                    return;
                }
            }

            //Values not set so use default.
            const dividorFractionsDefault = computeDividorFractionsDefault();
            dividorFractions[0] = dividorFractionsDefault[0];
            dividorFractions[1] = dividorFractionsDefault[1];
            wrkwin.dividor.achieved.achieved = nspaste([], dividorFractions);
        }
    }

    function storePosPartitionHandle() {
        //Store partition handle values for the current tab in sessionStorage.
        const values = {
            dividorFractions: wrkwin?.dividorFractions || "",
            achieved: wrkwin?.dividor?.achieved?.achieved || ""
        };

        const key = keyPosPartitionHandle();
        sessionStorage.setItem(key, JSON.stringify(values));
    }



    //=========================================================
    /// creates DividorResizer
    //=========================================================
    function computeDividorFractionsDefault() {
        const fracLeft = fconf.ESSAY_FRACTION_IN_WORKPANE;
        return [fracLeft, 1 - fracLeft];
    }

    function createDividorResizer()
    {
        nspaste(dividorFractions, computeDividorFractionsDefault());
        wrkwin.dividor = {};

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
        var D8D_fw = fmethods.panesD8D = d8dp.crePointFW_BSLd8d1CHAMBER({
            dragSurface : fapp.fappRoot$(),
            //todM : do this:
            //DRAG_POINTS_THROTTLE_TIME : fconf.DRAG_POINTS_THROTTLE_TIME
        });

        ///============================================================
        /// creates point dragger
        ///============================================================
        //.id is vital to have for removing extra disk over dividor
        wrkwin.dividor.spinngitrClsId = 'dividor';   //makes a placeholder for handler
        wrkwin.dividor.makeCentralDiskInvisible = true;
        D8D_fw.pointWrap_2_dragWrap_BSLd8d2PIPE({
            pointWrap           : wrkwin.dividor,
            update_decPoint     : 'update_decPoint_default',
            doProcess           : doProcess,
            dragHandleDOM       : mediaHorizontalHandler,
            //already a default spinnerCursorGrab   : 'grab',
            //already a default spinnerCursorGrabbed: 'grabbing',
        });

        //Load the following now that the dragger is setup.
        loadPosPartitionHandle();
        return;








        ///=============================================================================
        /// defines drag processor
        ///=============================================================================
        function doProcess( arg )
        {
            switch( arg.down_move_up ) {
                case 'down':
                    //Store the partition handle's start position,
                    //also update the sessionStorage.
                    wrkwin.dividor.achieved.achieved = nspaste([], dividorFractions);
                    wrkwin.storePosPartitionHandle();
                    break;
                case 'move':
                    //vital-for-mobile
                    //nsd('mv: res and sl');
                    //Move the partition handle, and adjust the width
                    //of the text and model areas.
                    const xOffset = arg.surfMove[0];
                    wrkwin.start8finish_media8Ess8Legend_resize__upcreate(xOffset);
                    break;
            }
        }
    }

}) ();

