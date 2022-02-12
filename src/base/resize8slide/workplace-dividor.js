( function() {
    var {
        //nsd, //vital-for-mobile
        $$, nspaste, cssp, d8dp,
        fapp, fmethods, fconf, sDomN, wrkwin, dividorFractions,
    } = window.b$l.apptree({
    });
    wrkwin.createDividorResizer = createDividorResizer;
    return;








    //=========================================================
    /// creates DividorResizer
    //=========================================================
    function createDividorResizer()
    {
        var ww = fconf.ESSAY_FRACTION_IN_WORKPANE;
        nspaste( dividorFractions,[ ww, 1-ww ] );
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
        wrkwin.dividor.spinnerClsId = 'dividor';   //makes a placeholder for handler
        D8D_fw.pointWrap_2_dragWrap_BSLd8d2PIPE({
            pointWrap           : wrkwin.dividor,
            update_decPoint     : 'update_decPoint_default',
            doProcess           : doProcess,
            dragHandleDOM       : mediaHorizontalHandler,
        });
        return;








        ///=============================================================================
        /// defines drag processor
        ///=============================================================================
        function doProcess( arg )
        {
            switch( arg.down_move_up ) {
                case 'down':
                    wrkwin.dividor.achieved.achieved = nspaste( [], dividorFractions );
                    break;
                case 'move':
                    //vital-for-mobile
                    //nsd('mv: res and sl');
                    wrkwin.start8finish_media8Ess8Legend_resize__upcreate( arg.surfMove[0] );
                    break;
            }
        }
    }

}) ();

