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
            .to( sDomN.medSuperroot )
            ();
        sDomN.mediaHorizontalHandler = $$
            .c( 'img' )
            .a( 'src', 'images/vertical.png' )
            .to( wResizer )
            ();
        ///dynamic CSS placeholder
        sDomN.mediaHorizontalHandlerCSS$ = $$.c('style').to(document.head);
        //---------------------------
        // \\// dom roots
        //---------------------------




        //.........................................
        // //\\ creates lower-layer framework
        //.........................................
        var frameworkD8D = d8d_p.createFramework( 
            findDraggee,
            //sDomN.medSuperroot,
            rootvm.approot,
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
                    var rootW = rootvm.approot.getBoundingClientRect().width;
                    var newSuperW = restrictMediaDimensions(
                        achWrap.achieved - arg.move[0],
                        rootW
                    );
                    pointWrap_local.achieved_at_move = newSuperW;
                    //ccc( 'move='+arg.move[0] + ' achieved=' + achWrap.achieved +
                    //' new ach=' + pointWrap_local.achieved_at_move );
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
        function restrictMediaDimensions( proposedWidth, rootW, doDividorSynch )
        {
            rootW = rootW || rootvm.approot.getBoundingClientRect().width;
            var legendHeight = 0;
            sDomN.mainLegends.forEach( function( legend ) {
                var hh = legend.getBoundingClientRect().height * 1.5;
                if( legendHeight < hh ) { legendHeight = hh; }
            });

            var medBox  = sDomN.mmedia.getBoundingClientRect();
            var curMedW = medBox.width;
            var curMedH = medBox.height;
            var aRat    = curMedH / curMedW;

            var superBox  = sDomN.medSuperroot.getBoundingClientRect();
            //ccc( 'cur w= ' + superBox.width );
            var newSuperW = proposedWidth || superBox.width;
            //ccc( 'proposedWidth= ' + proposedWidth );

            var newMedW   = newSuperW - sconf.main_horizontal_dividor_width_px;
            var newMedH   = aRat * newMedW;

            /*
            ccc( ' ratio=' + aRat.toFixed(2) +
            ' newSuperW=' + newSuperW.toFixed(2) +
            ' ' top=' + superBox.top.toFixed(2) +
            ' window.innerHeight=' + window.innerHeight )
            */

            var MIN_SUPRE_W = sconf.MINIMAL_MEDIA_CONTAINER_WIDTH +
                              sconf.main_horizontal_dividor_width_px;
            var topLimit = window.innerHeight - legendHeight - medBox.top;
            newSuperW = Math.max(
                MIN_SUPRE_W,
                Math.min( newSuperW,
                          topLimit / aRat + sconf.main_horizontal_dividor_width_px
                )
            );
            //ccc( 'restricted= ' + newSuperW );

            ///===================================
            ///makes "soft css" ... non-inline-css
            //it was: height : ${newMedH.toFixed(2)}px;
            var videoW = ( ( rootW - newSuperW ) * 0.8); //todo why 0.8? box-sizing model?
            var videoH = videoW*10/16;
            var videoW_px = videoW.toFixed(2) + 'px';
            var videoH_px = videoH.toFixed(2) + 'px';
            var videoW_mobile_px = (0.94*rootW).toFixed(2) + 'px';
            var videoH_mobile_px = (0.94*rootW*10/16).toFixed(2) + 'px';
            var textPaneW = cssmods.calculateTextPerc( 100 * newSuperW / rootW ).toFixed(2) + '%';

            sDomN.mediaHorizontalHandlerCSS$.html(`
                .bsl-media-superroot {
                   width  :${newSuperW}px;
                }
                .bsl-text-widget {
                    width :${(fconf.exegesis_floats && 'auto') || textPaneW};
                }
                .bsl-showreel-video-wrap {
                    width : ${videoW_px};
                    height : ${videoH_px};
                }
                @media only screen and (max-width: 800px) {
                    .bsl-showreel-video-wrap {
                        width       :${videoW_mobile_px};
                        height      :${videoH_mobile_px};
                    }
                }
            `);
            ///===================================


            //.synchs resize and dividor-slider states
            if( doDividorSynch ) { 
                pointWrap_local.achieved.achieved = newSuperW;
            }

            //fmethods.alignVideoPlaceholders && fmethods.alignVideoPlaceholders();
            sapp.upcreate();
            return newSuperW;
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
            var parentBox = rootvm.approot.getBoundingClientRect();
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
