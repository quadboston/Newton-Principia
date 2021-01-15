( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var cssmods     = sn('cssModules');
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var wrkwin      = sn('wrkwin',ssD); //work window
    var dividorFractions = sn('dividorFractions', wrkwin, []);
    var d8d_p       = sn('d8d-point');

    wrkwin.createDividorResizer = createDividorResizer;
    return;








    //=========================================================
    /// creates DividorResizer
    //=========================================================
    function createDividorResizer()
    {
        var ww = fconf.ESSAY_FRACTION_IN_WORKPANE;
        ns.paste( dividorFractions,[ ww, 1-ww ] );
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
            .a( 'src', fconf.pathToStem + 'images/vertical.png' )
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
        var frameworkD8D = fmethods.panesD8D = d8d_p.createFramework({
            dragSurface : fapp.fappRoot$(),
            //todo : do this:
            //DRAG_POINTS_THROTTLE_TIME : fconf.DRAG_POINTS_THROTTLE_TIME
        });


        ///============================================================
        /// creates point dragger
        ///============================================================
        //.id is vital to have for removing extra disk over dividor
        wrkwin.dividor.spinnerClsId = 'dividor';   //makes a placeholder for handler
        frameworkD8D.pointWrap_2_dragWrap({
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
                    wrkwin.dividor.achieved.achieved = ns.paste( [], dividorFractions );
                    break;
                case 'move':
                    //vital-for-mobile
                    //ns.d('mv: res and sl');
                    wrkwin.finish_Media8Ess8Legend_resize__upcreate( arg.surfMove[0] );
                    break;
            }
        }
    }

}) ();

