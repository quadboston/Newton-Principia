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

    var d8d_p       = sn('d8d-point',fmethods);
    fmethods.createDividorResizer = createDividorResizer;
    return;








    //=========================================================
    /// creates DividorResizer
    //=========================================================
    function createDividorResizer()
    {
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
        sDomN.mediaHorizontalHandler = $$
            .c( 'img' )
            .a( 'src', 'images/vertical.png' )
            .to( wResizer )
            ();
        ///dynamic CSS placeholder
        sDomN.mediaHorizontalHandlerCSS$ = $$.style().to(document.head);
        //---------------------------
        // \\// dom roots
        //---------------------------




        //.........................................
        // //\\ creates lower-layer framework
        //.........................................
        var frameworkD8D = fmethods.panesD8D = d8d_p.createFramework({
            dragSurface : fapp.fappRoot$(),
            //todo : do this:
            //DRAG_POINTS_THROTTLE_TIME : fconf.DRAG_POINTS_THROTTLE_TIME
        });
        //.........................................
        // \\// creates lower-layer framework
        //.........................................


        //============================================================
        // //\\ drag Wrap is a top level point which
        //      sits on own, low-level pointWrap
        //============================================================
        var pointWrap_local =
        {
            //.id is vital to have for removing extra disk over dividor
            spinnerClsId    : 'dividor',     //makes a placeholder for handler
        };
        frameworkD8D.pointWrap_2_dragWrap({
            pointWrap           : pointWrap_local,
            update_decPoint     : 'update_decPoint_default',
            doProcess           : doProcess,
            dragHandleDOM       : sDomN.mediaHorizontalHandler,
        });
        //============================================================
        // \\// drag Wrap is a top level point which
        //============================================================

        fmethods.finish_Media8Ess8Legend_resize = finish_Media8Ess8Legend_resize;
        return;








        ///=============================================================================
        /// //\\ the core of module:
        ///      the function which processes an internal content for dragWrap.pointWrap
        ///=============================================================================
        function doProcess( arg )
        {
            var pL = pointWrap_local;
            var pA = pL.achieved;
            switch( arg.down_move_up ) {
                case 'up':
                case 'move':
                    //"drags in opposite direction" ... so "-move" is below:
                    var newSuperW = finish_Media8Ess8Legend_resize(
                        pA.achieved - arg.surfMove[0]
                    );
                    //pL.achieved_at_move = newSuperW;
                    if( arg.down_move_up === 'up' ) {
                        pA.achieved = newSuperW; //pL.achieved_at_move;
                        //todo ... no dice ... jerks
                        //fmethods.finish_Media8Ess8Legend_resize(
                        //    newSuperW, !'rootW', !!'doDividorSynch'
                        //);
                    }
                break;
            }
        }
        ///=============================================================================
        /// \\// the core of module:
        ///=============================================================================







        ///=============================================================================
        /// //\\ restricts and sets super root and text pane sizes
        ///      used in resize and in master-dividor-slider
        ///=============================================================================
        function finish_Media8Ess8Legend_resize( proposed_medSupW, rootW, doDividorSynch )
        {
            var isMobile = ns.widthThresholds
                           [ fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD ]();
            //=============================
            // //\\ prepares parameters
            //=============================

            // //\\ gets media aspect ratio
            var aRat = sconf.innerMediaHeight / sconf.innerMediaWidth;
            // \\// gets media aspect ratio

            var VERTICAL_SAFE_HEIGHT_1 = 20;
            var VERTICAL_SAFE_HEIGHT_2 = 20;
            var navHeight = sDomN.navBar$.box().height;

            var rWidth = window.innerWidth;
            var rHeight = window.innerHeight - navHeight - VERTICAL_SAFE_HEIGHT_1;

            var appRootAsp = rHeight / rWidth;
            var wideScreen = appRootAsp < 0.5 || rWidth > 
                             fconf.SMALL_DESKTOP_MEDIA_QUERY_WIDTH_THRESHOLD;

            //-------------------------------------------
            // //\\ slider group patch for lemmas 2 and 3
            //-------------------------------------------
            var sliderGroup$ = ns.$$.q( '.slider-group' );
            var sliderGroupH = sliderGroup$() ? sliderGroup$.box().height : 0;
            //-------------------------------------------
            // \\// slider group patch for lemmas 2 and 3
            //-------------------------------------------

            //=============================
            // //\\ calculates new values
            //=============================
            var helpBoxHeight = sDomN.helpBoxAboveMedia$.box().height;
            var lbox = sDomN.legendRoot$.box();
            var legendWidth = lbox.width;
            var legendHeight = lbox.height;

            var legendWidth = 0;
            var legendHeight = 0;


            sDomN.legendRoot$.children( child => {
                var box = child.getBoundingClientRect();
                var wWidth = box.width;
                var wHeight = box.height;
                if( legendWidth < wWidth ) {
                    legendWidth = wWidth;
                }
                if( legendHeight < wHeight ) {
                    legendHeight = wHeight;
                }
            });


            if( isMobile ) {
                //------------------------------------------------------------------
                // //\\ very tedious way to get the necessary height of visible text
                //      by iterating through essaion children-texts
                //------------------------------------------------------------------
                var maxHeight = 250; //makes at least part of vertical menu visible
                sDomN.essaionsRoot$.children( child => {
                    var wHeight = child.getBoundingClientRect().height;
                    if( maxHeight < wHeight ) {
                        maxHeight = wHeight;
                    }
                });
                var essayH_str = ( Math.min( maxHeight, window.innerHeight/2 ) ).toFixed(2)
                                 + 'px';
                //------------------------------------------------------------------
                // \\// very tedious way to get the necessary height of visible text
                //------------------------------------------------------------------
                var essayW_str = "92%";
                var medRW_str = "92%";

            } else {


                if( wideScreen ) {
                    var ess8mod = rWidth - legendWidth - 30;
                } else {
                    var ess8mod = rWidth;
                }
                var frac = [0.40, sconf.mediaDefaultWidthPercent/100 ];
                var essayWidth = frac[0]/(frac[0]+frac[1])*ess8mod-10;

                //-------------------------------------------------
                // //\\ setting media super root
                //-------------------------------------------------
                var medSupW = frac[1]/(frac[0]+frac[1])*ess8mod-10;
                if( proposed_medSupW ) {
                    var medSupW = proposed_medSupW;
                    var ESS_MIN_WIDTH = 200;
                    medSupW = Math.min( ess8mod - ESS_MIN_WIDTH, medSupW );
                    medSupW = Math.max( 200, medSupW ); //protects if ess8mod is too small
                    if( !wideScreen ) {
                        ////one more patch to count too wide legend
                        medSupW = Math.max( legendWidth, medSupW );
                    }
                    medSupW = Math.max( medSupW, fconf.MODEL_MIN_WIDTH );
                    var essayWidth = ess8mod - medSupW - 20;
                }
                //-------------------------------------------------
                // \\// setting media super root
                //-------------------------------------------------


                //-------------------------------------------------
                // //\\ setting media width
                //-------------------------------------------------
                var medRW = medSupW - sconf.main_horizontal_dividor_width_px-20;
                if( !wideScreen ) {
                    ////model and legend are in "portrait mode"
                    var medRH_ = 
                                 rHeight - legendHeight //=medSupH
                                 - sliderGroupH
                                 - helpBoxHeight
                                 - VERTICAL_SAFE_HEIGHT_2;
                    var medRW_ = medRH_/aRat;
                    var medRW = Math.min( medRW_, medRW );
                    if( !proposed_medSupW ) {
                        var medSupW = medRW + sconf.main_horizontal_dividor_width_px;
                        var essayWidth = ess8mod - medSupW - 20;
                    }
                }
                //-------------------------------------------------
                // \\// setting media width
                //-------------------------------------------------

                //-------------------------------------------------
                // //\\ setting legendMargin_str
                //-------------------------------------------------
                if( !wideScreen ) {
                    var legendMargin_str =
                        ( ( medSupW - legendWidth 
                        - 30    //todm: this is a patch which fixes lemma9 legend ... why?
                        ) /
                        2 ).toFixed(2) + 'px';
                        //ccc( 'medSupW='+medSupW + ' legendWidth=' + legendWidth +
                        //     ' legendMargin_str=' + legendMargin_str )
                }
                //-------------------------------------------------
                // \\// setting legendMargin_str
                //-------------------------------------------------
                var essayW_str  = (essayWidth-20).toFixed(2)+'px';
                var essayH_str  = rHeight.toFixed(2)+'px';
                var medSupW_str = medSupW.toFixed(2)+'px';
                var medRW_str   = medRW.toFixed(2)+'px';
            }


            // //\\ video preparations
            //.todm why 0.8? box-sizing model?
            //var videoW = textPaneW_perc / 100 * rWidth * 0.8;
            var videoW = essayWidth * 0.8;
            var videoH = videoW*10/16;
            var videoW_px = videoW.toFixed(2) + 'px';
            var videoH_px = videoH.toFixed(2) + 'px';
            var videoW_mobile_px = (0.94*rWidth).toFixed(2) + 'px';
            var videoH_mobile_px = (0.94*rWidth*10/16).toFixed(2) + 'px';
            // \\// video preparations
            //=============================
            // \\// calculates new values
            //=============================



            //========================================
            // //\\ throws calculated values into CSS
            //========================================
            sDomN.legendRoot$
                .css( 'display', 'block' )
                .css( 'float',   'left' )
                //.css( 'width',  legendW_str )
                //effectively affects legend:
                .css( 'text-align', 'center' )
                .css( 'vertical-align', 'top' )
                ;

            sDomN.essaionsRoot$
                .css( 'width',  essayW_str )
                .css( 'height',  essayH_str )
                ;
            sDomN.medRoot$
                .css( 'width',  medRW_str );

            ///this only modifies a whole CSS for this element
            ///the whole CSS in in file fapp.css.js
            sDomN.mediaHorizontalHandlerCSS$.html(`
                .bsl-showreel-video-wrap {
                    width   : ${videoW_px};
                    height  : ${videoH_px};
                }
                @media only screen and (max-width:${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
                    .bsl-showreel-video-wrap {
                        width   :${videoW_mobile_px};
                        height  :${videoH_mobile_px};
                    }
                }
            `);

            if( isMobile ) {
                sDomN.legendRoot$
                    .css( 'display', 'block' )
                    .css( 'float', 'none' )
                    ;
                sDomN.medSuperroot$
                    .css( 'width',  '100%' );
            } else {
                sDomN.medSuperroot$
                    .css( 'width',  medSupW_str );
                if( wideScreen ) {
                    sDomN.legendRoot$
                        .css( 'margin-left',  '0' )
                        .css( 'margin-right', '0' );
                } else {
                    sDomN.legendRoot$
                        .css( 'margin-left',  legendMargin_str )
                        .css( 'margin-right',  legendMargin_str );
                }
            }
            //========================================
            // \\// throws calculated values into CSS
            //========================================



            //===============================================
            // //\\ synchs results with dividor-slider states
            //===============================================
            if( doDividorSynch ) {
                pointWrap_local.achieved.achieved = medSupW;
                fmethods.panesD8D.updateAllDecPoints();
            }
            //===============================================
            // \\// synchs results with dividor-slider states
            //===============================================


            //===============================================
            // //\\ updated model and its view
            //===============================================
            ///options to update all:
            //ns.eachprop( studyMods, ( stdMod, modName ) => {
            //    stdMod.upcreate();
            //});

            var aSub = amode['submodel'];
            if( ns.h( amode, 'submodel' ) && aSub ) {
                studyMods[ aSub ] && studyMods[ aSub ].upcreate();
            }
            //===============================================
            // \\// updated model and its view
            //===============================================

            return medSupW; //in particular, goes to dividor-slider stashed-update
        }
        ///=============================================================================
        /// \\// restricts and sets super root and text pane sizes
        ///=============================================================================
    }

}) ();

