( function() {
    var {
        ns, $$, fmethods, haff, haz, has, nspaste, eachprop,
        wrkwin,
        fconf, sconf, ssD, ssF, sDomN, dividorFractions,
        studyMods, amode,
    } = window.b$l.apptree({
        sDomNExportList :
        {
            bgImgOffset : 0,    //fake initial value before resize ran
            bgImgW : 1000,      //fake initial value before resize ran
        },
    });
    //allowed to be overriden
    ssF.gets_LEGEND_FIXED_FRACTION = gets_LEGEND_FIXED_FRACTION;

    //:spatial adjustments
    //ESS_MIN_WIDTH has priority over MODEL_MIN_WIDTH
    var ESS_MIN_WIDTH           = 370;
    var MODEL_MIN_WIDTH         = 300; //when dragging
    var RIGHT_WORKAREA_MARGIN   = 0.015; //fraction

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

        //-------------------------------------------------------------
        // todm: do we ever need this?
        // asp
        //     NOTE: stdMod.bgImgAsp thing is irrelevant to maintaining
        //           veritcal offsets hierarchy,
        //           the hierarchy id defined by "inner..." or
        //           "picture..." dims,
        //           ??? see // **api innerMediaHeight
        //var bgImg       = stdMod.imgRk.dom$();
        //stdMod.bgImgAsp = haz( stdMod.sconf, 'bgImgAsp' ) ||
        //                  bgImg.naturalHeight / bgImg.naturalWidth;
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
        var winW        = window.innerWidth * (1-RIGHT_WORKAREA_MARGIN);
        var SSceneH     = window.innerHeight -
                          ( fconf.doDisplayPageTopNavigatMenu ?
                            sDomN.pageNavTopBar$.box().height : 0
                          );
        ///-------------------------------------------
        ///slider group patch for lemmas 2 and 3
        ///-------------------------------------------
        var lemma2_slidersH = 0;
        if( fconf.sappId === 'lemma2' || fconf.sappId === 'lemma3' ) {
            var sliderGroup$ = sDomN.sliderGroup$;
            var lemma2_slidersH = sliderGroup$() ? sliderGroup$.box().height : 0;
            lemma2_slidersH +=35; //nicer
            sDomN.sliderGroup$
                .css( 'position', 'absolute' )
                ;
        }

        //-------------------------------------------
        // //\\ calculates legend
        //-------------------------------------------
        const STATIC_LEGEND = ssF.gets_LEGEND_FIXED_FRACTION();
        if( STATIC_LEGEND ) {
            ////makes synch with babylon and custom svg easier,
            ////takes "legend" as a reminder after LEGEND_FIXED_FRACTION,
            var legendHeight = SSceneH * STATIC_LEGEND;
            //for start, simply takes remainder from txt
            var legendWidth = winW - ESS_MIN_WIDTH;
        } else {
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
        }
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
            STATIC_LEGEND ? 0 : consideredLegendWidth,
            MODEL_MIN_WIDTH,
            proposed_rightW
        );

        ////here we try to fullfill this requirement,
        ////ESS_MIN_WIDTH has priority over MODEL_MIN_WIDTH
        var essayWidth = Math.max( ESS_MIN_WIDTH, winW - proposed_rightW );
        //if( !draggerMove && draggerMove !== 0 && has( fconf, 'MAX_ESS_WIDTH' ) ) {
        if( !draggerMove && draggerMove !== 0 ) {
            ////supposes user resets to default scenario
            essayWidth = Math.min( essayWidth, fconf.MAX_ESS_WIDTH );
        }
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
            //todm get rid of this: use down event for dividor to set this:
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

            //todo make variable via fconf....
            - sDomN.helpBoxAboveMedia$.box().height; //=helpBoxHeight

        var svgW_Leg = ( simSceneH - legendHeight ) / stdMod.simSceSvg_narrowestAsp;
        //but, really available width can be smaller:

        //***************************************************************************
        //svgW_min and svgH_min are narrowestASP-synched narrowest dimensions
        var svgW_min = Math.min(
                            proposed_rightW - sconf.main_horizontal_dividor_width_px,
                            svgW_Leg );
        var svgH_min = svgW_min * stdMod.simSceSvg_narrowestAsp;
        //***************************************************************************

        //-------------------------------------------------------------
        // //\\ wide screen,
        //      legend stays on the right from model
        //-------------------------------------------------------------
        if( 
            //never wide if ...FIXED...
            !STATIC_LEGEND
            &&
            (
                svgW_Leg + consideredLegendWidth < proposed_rightW &&
                ////narrow screen,
                //if legend aspect ratio is too small, then
                //doesn't give right side space to legend: will look silly,
                simSceneH/proposed_rightW < 3*legendHeight/consideredLegendWidth
            )
        ) {
            ////wide screen
            var wideScreen_flag = true;
            //now we calculate H-restriction again
            var svgW            = proposed_rightW
                                    - sconf.main_horizontal_dividor_width_px
                                    - consideredLegendWidth
                                    - 10; //given gap before legend
            var bgImgW          = Math.min(
                                    simSceneH / stdMod.simSceSvg_narrowestAsp,
                                    svgW );
            var legendMargin    = 0;
            //var bgImgOffset     = Math.max( 0, ( svgW - bgImgW - 20 ) / 2 );
            var bgImgOffset     = Math.max( 0, ( svgW - bgImgW ) / 2 );
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
            if( STATIC_LEGEND ) {
                ////for STATIC_LEGEND, legend dom is ignored
                var legendMargin = 0;
            } else {
                var legendMargin = Math.max( 0,
                    ( ( proposed_rightW - consideredLegendWidth
                    ) ) / 2 );
            }
            var bgImgOffset = Math.max( 0,
                ( ( proposed_rightW - bgImgW 
                //- 20    //todm:
                ) ) / 2 );
            var simSceneW = proposed_rightW; // bgImgOffset * 2 + bgImgW;
            var svgSceneW = simSceneW;
        }

        if( fconf.sappId === 'lemma2' || fconf.sappId === 'lemma3' ) {
            sliderGroup$
                .css( 'top', svgSceneH.toFixed() + 'px' )
                .css( 'width', '300px' ) //todm patch
                .css( 'left', (( simSceneW - 300 ) / 2 ).toFixed() + 'px' )
                ;
        }
        //===============================================
        // \\// phase 4. allocates widths and heights
        //===============================================





        //--------------------------------------------------------------------
        // //\\ exports sizes
        //--------------------------------------------------------------------
        stdMod.simSceneW    = simSceneW;
        stdMod.simSceneH    = simSceneH; //contains legend for narrow screens
        stdMod.svgSceneW    = svgSceneW; //common width: =simSceneW
        stdMod.svgSceneH    = svgSceneH; //no leg.

        //-------------------------------------------------------
        //these 3 things carry
        //  place-reserved-to-fit-bg-image === minimal-place-for-svg
        //  in CSS-model
        stdMod.bgImgOffset  = bgImgOffset; //positive or 0
        stdMod.bgImgW       = bgImgW;      //svgSceneW - offsets
        //used only in lemma2:
        //stdMod.bgImgH       = stdMod.bgImgW * stdMod.simSceSvg_narrowestAsp;   
        //-------------------------------------------------------

        //see **api innerMediaHeight
        var picCSS_2_svgmodel = sconf.innerMediaWidth / stdMod.bgImgW;
        //apparently "basic svg width( bgPictureWidth ) + margins(due widening screen)
        stdMod.svgVB_W        = stdMod.svgSceneW * picCSS_2_svgmodel;
        stdMod.svgVB_H        = stdMod.svgSceneH * picCSS_2_svgmodel;//sconf.innerMediaHeight;
        stdMod.svgVB_offsX    = -stdMod.bgImgOffset * picCSS_2_svgmodel;
        //--------------------------------------------------------------------
        // \\// exports sizes
        //--------------------------------------------------------------------


        //===============================================
        // //\\ phase 5. finalizes widths and heights
        //===============================================
        makes_svgViewBox();
        doesTopContainersSizing( stdMod );

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
        var wid             = window.innerWidth * (1-RIGHT_WORKAREA_MARGIN);

        stdMod.bgImgW       = wid;
        //stdMod.bgImgH       = wid * stdMod.simSceSvg_narrowestAsp;
        stdMod.bgImgOffset  = 0;

        stdMod.simSceneW    = wid;
        stdMod.simSceneH    = wid * stdMod.simSceSvg_narrowestAsp;
        stdMod.svgSceneW    = stdMod.simSceneW;
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
        doesTopContainersSizing( stdMod );
        wrkwin.buildsMobile({
            stdMod,
        });
    }


    function doesTopContainersSizing( stdMod )
    {
        sDomN.simSScene$
            .css( 'width', stdMod.simSceneW.toFixed(1) + 'px')
            .css( 'height', stdMod.simSceneH.toFixed(1) + 'px')
            ;
        stdMod.simScene$
            .css( 'width', stdMod.simSceneW.toFixed(1) + 'px')
            .css( 'height', stdMod.simSceneH.toFixed(1) + 'px')
            ;
    }



    ///=============================================================================
    /// expands media playable area to margins
    /// be aware: this can damage shrink to mobile: do cleanup in mobile,
    ///=============================================================================
    function makes_svgViewBox()
    {
        var stdMod      = studyMods[ amode.submodel ];
        var offset_x    = stdMod.svgVB_offsX.toFixed(4);
        var offset_y    = '0';
        var width       = stdMod.svgVB_W.toFixed(4);
        var height      = stdMod.svgVB_H.toFixed(4);
        // **api svg viewable area horizontal legend
        // |x=offset_x < 0 ------------------- |x=0---------------x=width-1|
        // |<-------------- offset_x -------- >|<----narrow width -------->|
        // |<--------------------- width --------------------------------->|
        // |<---beginning-of-view-----------------------------end-of-view->| 

        var viewBox = 
            offset_x + ' ' + offset_y + ' ' +
            width +    ' ' + height;
        stdMod.mmedia.setAttributeNS(
            null, 'viewBox', viewBox,
        );
    }

    function gets_LEGEND_FIXED_FRACTION()
    {
        return false;
    }
}) ();

