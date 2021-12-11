( function() {
    var {
        ns, $$, fmethods, haff, haz, has, nspaste, eachprop,
        wrkwin,
        fconf, sconf, ssD, sDomN, dividorFractions,
        studyMods, amode,
    } = window.b$l.apptree({
        sDomNExportList :
        {
            bgImgOffset : 0,    //fake initial value before resize ran
            bgImgW : 1000,      //fake initial value before resize ran
        },
    });

    //:spatial adjustments
    var LEGEND_MIN_HOR_MARGIN   = 15;
    var VERTICAL_SAFE_HEIGHT_1  = 2; //0;
    var VERTICAL_SAFE_HEIGHT_2  = 2; //0;
    var HORIZONTAL_SAFE_WIDTH   = 1; //30;
                                  //=spare space for possible scroll bars or misfits ...
    //ESS_MIN_WIDTH has priority over MODEL_MIN_WIDTH
    var ESS_MIN_WIDTH           = 370;
    var MODEL_MIN_WIDTH         = 300; //when dragging

    /// chain-dispatches callback "resizeHappened"
    ( function() {
        var hazR = haz( fmethods, 'resizeHappened' );
        fmethods.resizeHappened  = hazR ?
                () => {
                    hazR(); 
                }
            :
                ()=>{}
            ;
    })();

    wrkwin.start8finish_media8Ess8Legend_resize__upcreate =
           start8finish_media8Ess8Legend_resize__upcreate;
    return;









    ///=============================================================================
    /// //\\ restricts and sets super root and text pane sizes,
    //       main resize engine manager,
    ///      used in resize and in master-dividor-slider
    ///=============================================================================
    function start8finish_media8Ess8Legend_resize__upcreate(
             draggerMove,
             doDividorSynch,
    ) {
        var stdMod      = studyMods[ amode.submodel ];

        var bgImg       = stdMod.imgRk.dom$();

        //-------------------------------------------------------------
        // asp
        //     NOTE: stdMod.bgImgAsp thing is irrelevant to maintaining
        //           veritcal offsets hierarchy,
        //           the hierarchy id defined by "inner..." or
        //           "picture..." dims,
        stdMod.bgImgAsp = haz( stdMod.sconf, 'bgImgAsp' ) ||
                          bgImg.naturalHeight / bgImg.naturalWidth;
        //-------------------------------------------------------------

        if(
            ns.widthThresholds[ fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD ]() //isMobile
        ) {
            preparesMobile();
        } else {
            preparesDesktop({
                draggerMove,
                doDividorSynch,
            });
        }
        fmethods.resizeHappened(); 
        haff( stdMod, 'model8media_upcreate' );
    }
    ///=============================================================================
    /// \\// restricts and sets super root and text pane sizes,
    ///=============================================================================









    function preparesDesktop({
        draggerMove,
        doDividorSynch,
    }){
        //========================================
        // //\\ phase 1. detects parameters
        //========================================
        var stdMod      = studyMods[ amode.submodel ];
        var winW        = window.innerWidth - HORIZONTAL_SAFE_WIDTH;
        var SSceneH     = window.innerHeight - VERTICAL_SAFE_HEIGHT_1 -
                          sDomN.pageNavTopBar$.box().height;

        ///-------------------------------------------
        ///slider group patch for lemmas 2 and 3
        ///-------------------------------------------
        var lemma2_slidersH = 0;
        if( fconf.sappId === 'lemma2' || fconf.sappId === 'lemma3' ) {
            var sliderGroup$ = sDomN.sliderGroup$;
            var lemma2_slidersH = sliderGroup$() ? sliderGroup$.box().height : 0;
            lemma2_slidersH +=10; //nicer
            ccc( lemma2_slidersH );
            sDomN.sliderGroup$
                .css( 'position', 'absolute' )
                ;
        }

        //-------------------------------------------
        // //\\ calculates legend
        //-------------------------------------------
        var legendWidth = 0;
        var legendHeight = 0;
        //measures container legend box children
        stdMod.legendRoot$.children( child => {
            var box = child.getBoundingClientRect();
            var wWidth = box.width;
            var wHeight = box.height;
            //ccc( 'box.width = ' + box.width.toFixed() +
            //     'box.height = ' + box.height.toFixed() );
            if( legendWidth < wWidth ) {
                legendWidth = wWidth;
            }
            if( legendHeight < wHeight ) {
                legendHeight = wHeight;
            }
        });
        //measures container legend box itself
        var wLegBox = stdMod.legendRoot$().getBoundingClientRect();
        var wWidth = wLegBox.width;
        if( legendWidth < wWidth ) {
            legendWidth = wWidth;
        }
        legendHeight += 20; //todm: patch: adds gap at bottom page
        if( fconf.sappId === 'lemma2' || fconf.sappId === 'lemma3' ) {
            legendHeight += 20; //todm: patch: adds gap at bottom page
        }
        var wHeight = wLegBox.height;
        if( legendHeight < wHeight ) {
            legendHeight = wHeight;
        }
        //ccc( 'lbox.width = ' + wWidth.toFixed() +
        //     'lbox.height = ' + wHeight.toFixed() );

        legendWidth += 2*LEGEND_MIN_HOR_MARGIN;
        if( legendWidth + ESS_MIN_WIDTH > winW ) {
            //ccc( 'Legend width = ' + legendWidth + ' and is too big for ' +
            //     'screen width = ' + winW );
            var consideredLegendWidth = winW - ESS_MIN_WIDTH;
        } else {
            var consideredLegendWidth = legendWidth;
        }
        //-------------------------------------------
        // \\// calculates legend
        // \\// phase 1. detects parameters
        //========================================


        //========================================
        // //\\ phase 2. calculates new values
        //========================================
        //// here we distribute the widths
        if( !draggerMove && draggerMove !== 0 ) {
            var frac = dividorFractions;
            proposed_rightW = frac[1]/(frac[0]+frac[1])*winW;
        } else {
            var frac = wrkwin.dividor.achieved.achieved;
            var proposed_rightW = frac[1]/(frac[0]+frac[1])*winW
                    //when dragging left, then media area increases, so "-move" is below:
                    - draggerMove;
        }
        proposed_rightW = Math.max(
            consideredLegendWidth,
            MODEL_MIN_WIDTH,
            proposed_rightW
        );

        ////here we try to fullfill this requirement,
        ////ESS_MIN_WIDTH has priority over MODEL_MIN_WIDTH
        var essayWidth = Math.max( ESS_MIN_WIDTH, winW - proposed_rightW );
        proposed_rightW = winW - essayWidth;
        //========================================
        // \\// phase 2. calculates new values
        //========================================


        //==========================================================
        // //\\ phase 3. synchs results with dividor-slider states
        //==========================================================
        dividorFractions[0] = essayWidth/winW;
        dividorFractions[1] = (winW - essayWidth) / winW;
        if( doDividorSynch ) {
            wrkwin.dividor.achieved.achieved = nspaste( [], dividorFractions )
            fmethods.panesD8D.updateAllDecPoints();
        }
        //==========================================================
        // \\// phase 3. synchs results with dividor-slider states
        //==========================================================


        //===============================================
        // //\\ phase 4. allocates widths and heights
        //===============================================
        var simSceneH = SSceneH
             - lemma2_slidersH
             - sDomN.helpBoxAboveMedia$.box().height //=helpBoxHeight
             - VERTICAL_SAFE_HEIGHT_2;
        var svgW_H = simSceneH / stdMod.simSceSvg_narrowestAsp;
        var svgW_Leg = ( simSceneH - legendHeight ) / stdMod.simSceSvg_narrowestAsp;

        //but, really available width can be less:
        var svgW_min = Math.min(
                            proposed_rightW - sconf.main_horizontal_dividor_width_px,
                            svgW_Leg );
        var svgH_min = svgW_min * stdMod.simSceSvg_narrowestAsp;

        //-------------------------------------------------------------
        // //\\ wide screen,
        //      legend stays on the right from model
        //-------------------------------------------------------------
        if( svgW_Leg + consideredLegendWidth < proposed_rightW &&
            //if legend aspect ratio is too small, then
            //doesn't give right side space to legend: will look silly,
            simSceneH/proposed_rightW < 3*legendHeight/consideredLegendWidth
        ) {
            ////wide screen
            var wideScreen_flag = true;
            //now we calculate H-restriction again
            var svgW            = proposed_rightW
                                    - sconf.main_horizontal_dividor_width_px
                                    - consideredLegendWidth
                                    - 10;
            var bgImgW          = Math.min( svgW_H, svgW );
            var legendMargin    = LEGEND_MIN_HOR_MARGIN;
            var bgImgOffset     = Math.max( 0, ( svgW - bgImgW - 20 ) / 2 );
            var simSceneW       = bgImgOffset * 2 +
                                  bgImgW; // + Math.max( 0, proposed_rightW - medSupW );
            var svgSceneW       = svgW; //proposed_rightW - legendWidth;
            var svgSceneH       = simSceneH;
        //-------------------------------------------------------------
        // \\// wide screen,
        //-------------------------------------------------------------

        } else {
            ////narrow screen
            var wideScreen_flag = false;

            //apparently, this is a final media-height which is synch with
            var svgSceneH = svgH_min;

            //-------------------------------------------------
            //does set media width
            //-------------------------------------------------
            var bgImgW = svgW_min;
            //-------------------------------------------------
            //:does set setting legendMarginr
            //-------------------------------------------------
            //does centering legend below the media
            var legendMargin = Math.max( LEGEND_MIN_HOR_MARGIN,
                //note: consideredLegendWidth includes 2*LEGEND_MIN_HOR_MARGIN:
                ( ( proposed_rightW - consideredLegendWidth + 2*LEGEND_MIN_HOR_MARGIN
                ) ) / 2 );
            var bgImgOffset = Math.max( 0,
                ( ( proposed_rightW - bgImgW 
                - 20    //todm:
                ) ) / 2 );
            var simSceneW = bgImgOffset * 2 + bgImgW;
            var svgSceneW = simSceneW;
        }

        if( fconf.sappId === 'lemma2' || fconf.sappId === 'lemma3' ) {
            sliderGroup$
                .css( 'top', svgSceneH.toFixed() + 'px' )
                .css( 'width', '300px' ) //todm patch
                .css( 'left', (( simSceneW - 300 ) / 2 ).toFixed() + 'px' )
                ;
            ccc( sliderGroup$() );
        }
        //===============================================
        // \\// phase 4. allocates widths and heights
        //===============================================





        //--------------------------------------------------------------------
        // //\\ exports sizes
        //--------------------------------------------------------------------
        stdMod.simSceneW    = simSceneW;
        stdMod.simSceneH    = simSceneH;
        stdMod.svgSceneW    = svgSceneW;
        stdMod.svgSceneH    = svgSceneH;

        stdMod.bgImgOffset  = bgImgOffset;
        stdMod.bgImgW       = bgImgW;
        stdMod.bgImgH       = bgImgW * stdMod.bgImgAsp;

        var pic2svgvb       = sconf.innerMediaWidth / stdMod.bgImgW;
        //apparently "basic svg width( bgPictureWidth ) + margins(due widening screen)
        stdMod.svgVB_W      = stdMod.svgSceneW * pic2svgvb;
        stdMod.svgVB_H      = sconf.innerMediaHeight;
        stdMod.svgVB_offsX  = -stdMod.bgImgOffset * pic2svgvb;
        //--------------------------------------------------------------------
        // \\// exports sizes
        //--------------------------------------------------------------------


        //===============================================
        // //\\ phase 5. finalizes widths and heights
        //===============================================
        makes_svgViewBox();

        wrkwin.buildsNonMobile({
            stdMod,
            wideScreen_flag,
            SSceneH,
            essayWidth,

            bgImgW,
            bgImgOffset,

            svgSceneH,
            svgSceneW,

            legendWidth,
            legendHeight,
            legendMargin,
            lemma2_slidersH,
        });
        //===============================================
        // \\// phase 5. finalizes widths and heights
        //===============================================
    }
    ///=============================================================================
    /// \\// restricts and sets super root and text pane sizes
    ///=============================================================================



    ///========================================
    ///
    ///========================================
    function preparesMobile()
    {
        var stdMod          = studyMods[ amode.submodel ];
        var wid             = window.innerWidth;
        stdMod.bgImgW       = wid;
        stdMod.bgImgH       = wid * stdMod.bgImgAsp;
        stdMod.bgImgOffset  = 0;

        stdMod.simSceneW    = wid;
        stdMod.simSceneH    = wid * stdMod.simSceSvg_narrowestAsp;
        stdMod.svgSceneW    = stdMod.svgSceneW;
        stdMod.svgSceneH    = stdMod.simSceneH; //useless?

        stdMod.svgVB_W      = sconf.innerMediaWidth;
        stdMod.svgVB_H      = sconf.innerMediaHeight;
        stdMod.svgVB_offsX  = 0;

        if( fconf.sappId === 'lemma2' || fconf.sappId === 'lemma3' ) {
            sDomN.sliderGroup$
                .css( 'display', 'inline-block' )
                .css( 'position', 'static' )
                ;
        }
        makes_svgViewBox();

        wrkwin.buildsMobile({
            stdMod,
        });
    }



    ///=============================================================================
    /// expands media playable area to margins
    /// be aware: this can damage shrink to mobile: do cleanup in mobile,
    ///=============================================================================
    function makes_svgViewBox()
    {
        var stdMod          = studyMods[ amode.submodel ];
        stdMod.mmedia.setAttributeNS(
            null,
            'viewBox',
            //landing: ...'viewBox', '0 0 ' +
            stdMod.svgVB_offsX.toFixed(4) + ' 0 ' + 

            //landing: sconf.innerMediaWidth + ' ' +
            stdMod.svgVB_W.toFixed(4) + ' ' +

            //landing: sconf.innerMediaHeight );
            stdMod.svgVB_H.toFixed(4)
        );
    }

}) ();

