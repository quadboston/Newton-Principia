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

    var d8d_p       = sn('d8d-point',fmethods);
    fmethods.createDividorResizer = createDividorResizer;
    //000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000







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
        var frameworkD8D = d8d_p.createFramework( 
            findDraggee,
            //sDomN.medSuperroot,
            fapp.fappRoot$(),
            fconf.DRAG_POINTS_THROTTLE_TIME
        );
        //.........................................
        // \\// creates lower-layer framework
        //.........................................


        //============================================================
        // //\\ dragWrap is a top level point which
        //      sits on own, low-level pointWrap
        //============================================================
        var pointWrap_local =
        {
            name                    :'dividor',     //makes a placeholder for handler

            //.means media superroot width in pixels
            //.this default is irrelevant because it is updated at the first resize
            achieved_at_move        :sconf.mediaDefaultWidthPercent * window.innerWidth,

            medpos2dompos           :medpos2dompos
        };

        var dragWrap = frameworkD8D.createDragUpdate({

            achieved            : pointWrap_local.achieved_at_move,
            pointWrap           : pointWrap_local,
            update_decPoint     : update_decPoint, //updates "decorational Point", not "decimal"
            doProcess           : doProcess

        });
        //============================================================
        // \\// dragWrap is a top level point which
        //============================================================

        $$.addClass( 'grey', dragWrap.decPoint );
        $$.addClass( 'axis-x', dragWrap.decPoint );
        fmethods.restrictMediaDimensions = restrictMediaDimensions;
        //111111111111111111111111111
        return;
        //111111111111111111111111111








        ///=============================================================================
        /// //\\ the core of module:
        ///      the function which processes an internal content for dragWrap.pointWrap
        ///=============================================================================
        function doProcess( arg )
        {
            var achWrap = pointWrap_local.achieved;

            switch( arg.down_move_up ) {
                case 'up': achWrap.achieved = pointWrap_local.achieved_at_move;
                break;
                case 'move':
                    var newSuperW = restrictMediaDimensions(
                        achWrap.achieved - arg.move[0]
                    );
                    pointWrap_local.achieved_at_move = newSuperW;
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
        function restrictMediaDimensions( proposed_medSupW, rootW, doDividorSynch )
        {
            var isMobile = ns.widthThresholds
                           [ fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD ]();
            //=============================
            // //\\ prepares parameters
            //=============================


            // //\\ gets media aspect ratio: todo must be already known
            var medBox  = sDomN.mmedia$.box();
            var curMedW = medBox.width;
            var curMedH = medBox.height;
            //var aRat    = curMedH / curMedW;
            var aRat    = sconf.innerMediaHeight / sconf.innerMediaWidth;
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
            //.todo why 0.8? box-sizing model?
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
            }
            //===============================================
            // \\// synchs results with dividor-slider states
            //===============================================


            //===============================================
            // //\\ updated model and its view
            //===============================================
            sapp.upcreate();
            //===============================================
            // \\// updated model and its view
            //===============================================

            return medSupW; //in particular, goes to dividor-slider stashed-update
        }
        ///=============================================================================
        /// \\// restricts and sets super root and text pane sizes
        ///=============================================================================




        //====================
        // //\\ finds draggee
        //====================
        ///Returns: dragWrap if it is close to testPoint.
        function findDraggee( testPoint )
        {
            //.if distance to testPoint is "outside" of this par.,
            //.dragWrap is not "considered" for drag
            var DRAGGEE_HALF_SIZE = fconf.DRAGGEE_HALF_SIZE;

            var handlePos = medpos2dompos();
            var testMedpos = testPoint;
            var testMediaX = testMedpos[0];
            var testMediaY = testMedpos[1];

            var tdX = Math.abs( testMediaX - handlePos[0] );
            var tdY = Math.abs( testMediaY - handlePos[1] );
            var td  = Math.max( tdX, tdY );

            //.td is a "rect-metric" for distance between testPoint and drag-point-candidate
            if( td <= DRAGGEE_HALF_SIZE ) {
                //ccc( '\n\n****', 'pos=',handlePos, 'mouse=',testPoint, testMediaX, testMediaY );
                return dragWrap;
            }
        }
        //====================
        // \\// finds draggee
        //====================



        ///converts own media pos to dom-pos
        function medpos2dompos()
        {
            var parentBox = fapp.fappRoot$.box();
            var handleBox = sDomN.mediaHorizontalHandler.getBoundingClientRect();
            var handlePos = [
                    handleBox.left-parentBox.left,
                    handleBox.top - parentBox.top + handleBox.height/2
            ];
            return handlePos;
        }

        ///repositions and decorated handle
        function update_decPoint( decPoint )
        {
            var dompos = medpos2dompos();
            decPoint.style.left = dompos[0] + 'px';            
            decPoint.style.top = dompos[1] + 'px';            
        }
    }

}) ();

