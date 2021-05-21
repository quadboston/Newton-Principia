( function() {
    var {
        //nsd, //vital-for-mobile
        $$,
        nspaste,
        cssp,
        fapp,
        fmethods,
        fconf,
        sDomN,
        wrkwin,
        dividorFractions,
        d8d_p,
    } = window.b$l.apptree({
    });
    wrkwin.createDividorResizer = createDividorResizer;
    return;








    //=========================================================
    /// creates DividorResizer
    /// called in lemmaDom___ess8med8leg_roots_8_menuPH_8_dividor_8_medSRoot
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
            .to( sDomN.medSuperroot$ )
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
        var D8D_fw = fmethods.panesD8D = d8d_p.createFramework({
            dragSurface : fapp.fappRoot$(),
            //todM : do this:
            //DRAG_POINTS_THROTTLE_TIME : fconf.DRAG_POINTS_THROTTLE_TIME
        });


        ///============================================================
        /// creates point dragger
        ///============================================================
        //.id is vital to have for removing extra disk over dividor
        wrkwin.dividor.spinnerClsId = 'dividor';   //makes a placeholder for handler
        D8D_fw.pointWrap_2_dragWrap({
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
                    wrkwin.finish_Media8Ess8Legend_resize__upcreate( arg.surfMove[0] );
                    break;
            }
        }
    }

}) ();

