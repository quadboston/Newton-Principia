( function() {
    var {
        ns, $$, fmethods, haff, haz, has, nspaste, eachprop,
        wrkwin,
        fconf, sconf, ssD, ssF, sDomN, dividorFractions,
        stdMod, amode,
    } = window.b$l.apptree({
        sDomNExportList :
        {
            bgImgOffset : 0,    //fake initial value before resize ran
            bgImgW : 1000,      //fake initial value before resize ran
        },
    });
    //allowed to be overriden
    ssF.gets_LEGEND_FIXED_FRACTION = gets_LEGEND_FIXED_FRACTION;

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
        //-------------------------------------------------------------
        // todm: do we ever need this?
        // asp
        //     NOTE: stdMod.bgImgAsp thing is irrelevant to maintaining
        //           veritcal offsets hierarchy,
        //           the hierarchy id defined by "inner..." or
        //           "picture..." dims,
        //           ??? see // **api innerMediaHeight
        //var bgImg       = stdMod.imgRk.dom$();
        //stdMod.bgImgAsp = haz( sconf, 'bgImgAsp' ) ||
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
        var winW        = window.innerWidth * (1-fconf.RIGHT_WORKAREA_MARGIN);
        var SSceneH     = window.innerHeight -
                          ( fconf.doDisplayPageTopNavigatMenu ?
                            sDomN.pageNavTopBar$.box().height : 0
                          );
        ///-------------------------------------------
        ///slider group patch for lemmas 2 and 3
        ///-------------------------------------------
        var lemma2_slidersH = 0;

        // for lemmas 2 and 3, plus variations on lemma 2
        if (fconf.sappId === 'lemma2' || fconf.sappId.indexOf('lemma2-') === 0 || fconf.sappId === 'lemma3') {
            var sliderGroup$ = sDomN.sliderGroup$;
            var lemma2_slidersH = sliderGroup$() ? sliderGroup$.box().height : 0;
            lemma2_slidersH += 35; //nicer
            sDomN.sliderGroup$.css('position', 'absolute');
        }

        //-------------------------------------------
        // //\\ calculates legend
        //-------------------------------------------
        const STATIC_LEGEND = ssF.gets_LEGEND_FIXED_FRACTION();
        let legendWidth = 0, legendHeight = 0;
        if (STATIC_LEGEND) {
            ////makes synch with babylon and custom svg easier,
            ////takes "legend" as a reminder after LEGEND_FIXED_FRACTION,
            legendHeight = SSceneH * STATIC_LEGEND;
            //for start, simply takes remainder from txt
            legendWidth = winW - fconf.ESSAY_MIN_WIDTH;
        } else {
            //measures container legend box children
            stdMod.legendRoot$.children(child => {
                var boxChild = child.getBoundingClientRect();
                legendWidth = Math.max(legendWidth, boxChild.width);
                legendHeight = Math.max(legendHeight, boxChild.height);
            });

            //measures container legend box itself
            const boxLegend = stdMod.legendRoot$().getBoundingClientRect();
            legendWidth = Math.max(legendWidth, boxLegend.width);

            legendHeight += 20; //todm: patch: adds gap at bottom page
            if( fconf.sappId.indexOf('lemma2') === 0 || fconf.sappId === 'lemma3' )
                legendHeight += 20; //todm: patch: adds gap at bottom page
            legendHeight = Math.max(legendHeight, boxLegend.height);
        }
        const consideredLegendWidth = Math.min(legendWidth, winW - fconf.ESSAY_MIN_WIDTH);
        //-------------------------------------------
        // \\// calculates legend
        // \\// phase 1. detects parameters
        //========================================


        //========================================
        // //\\ phase 2. calculates new values
        //========================================
        //Distribute the window width between the essay/text area, and the area to the right of it.
        //Note that essay/text area constraints have priority.

        //Compute the desired width of the right area.
        let proposedRightW = 0;
        if (draggerMove == null) {
            //Partition handle was NOT moved (eg. window resize, tab pressed).
            //Frac represents partition handle's current position.
            const frac = dividorFractions;
            proposedRightW = frac[1] / (frac[0] + frac[1]) * winW;
        } else {
            //Partition handle was moved (draggerMove is the x offset from where it started).
            //Frac represents partition handle's starting position (before dragging).
            const frac = wrkwin.dividor.achieved.achieved;
            //When dragging the media area width changes, so offset by draggerMove.
            proposedRightW = frac[1] / (frac[0] + frac[1]) * winW - draggerMove;
        }
        proposedRightW = Math.max(
            STATIC_LEGEND ? 0 : consideredLegendWidth,
            fconf.MODEL_MIN_WIDTH,
            proposedRightW
        );

        //Compute the essayWidth.
        let essayWidth = Math.max(fconf.ESSAY_MIN_WIDTH, winW - proposedRightW);
        if (draggerMove == null) {
            //As the browser is widened, the text and model areas maintain a specific ratio
            //until the text reaches a max-width, after which all extra space is allocated
            //to the model area. The following ensures the same happens in reverse.
            //
            //If essayWidth would be above it's maximum set it to that, and don't update
            //wrkwin.dividor.achieved.achieved so that the desired ratio is remembered.
            //Otherwise when decreasing both areas would decrease at a new ratio.  Note
            //that wrkwin.dividor is still updated.
            const frac = wrkwin.dividor.achieved.achieved;
            const essayWidthNoMax = frac[0] / (frac[0] + frac[1]) * winW;
            if (essayWidthNoMax > fconf.ESSAY_MAX_WIDTH) {
                essayWidth = fconf.ESSAY_MAX_WIDTH;
                doDividorSynch = false;
            }
        }
        //Constrain to ensure not above maximum.
        essayWidth = Math.min(essayWidth, fconf.ESSAY_MAX_WIDTH);

        //Finally calculate width of the right area.
        proposedRightW = winW - essayWidth;
        //========================================
        // \\// phase 2. calculates new values
        //========================================

        //==========================================================
        // //\\ phase 3. synchs results with dividor-slider states
        //==========================================================
        const fracLeft = essayWidth / winW;
        dividorFractions[0] = fracLeft;
        dividorFractions[1] = 1 - fracLeft;
        if (doDividorSynch) {
            //Refer to "As the browser is widened..." comment (phase 2), for more detail on when 
            //achieved needs to be set here.
            wrkwin.dividor.achieved.achieved = nspaste([], dividorFractions)
            fmethods.panesD8D.updateAllDecPoints();
        }
        //Store the following (when resizing the window or dragging the partition handle).
        wrkwin.storePosPartitionHandle();
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
            proposedRightW - sconf.main_horizontal_dividor_width_px,
            svgW_Leg);
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
                svgW_Leg + consideredLegendWidth < proposedRightW &&
                ////narrow screen,
                //if legend aspect ratio is too small, then
                //doesn't give right side space to legend: will look silly,
                simSceneH/proposedRightW < 3*legendHeight/consideredLegendWidth
            )
        ) {
            ////wide screen
            var wideScreen_flag = true;
            //now we calculate H-restriction again
            var svgW            = proposedRightW
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
                                  bgImgW; // + Math.max( 0, proposedRightW - medSupW );
            var svgSceneW       = svgW; //proposedRightW - legendWidth;
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
                    ( ( proposedRightW - consideredLegendWidth
                    ) ) / 2 );
            }
            var bgImgOffset = Math.max(0,
                ((proposedRightW - bgImgW
                    //- 20    //todm:
                )) / 2);
            var simSceneW = proposedRightW; // bgImgOffset * 2 + bgImgW;
            var svgSceneW = simSceneW;
        }

        if( fconf.sappId.indexOf('lemma2') === 0 || fconf.sappId === 'lemma3' ) {
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
        doesTopContainersSizing();

        wrkwin.buildsNonMobile({
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
        var wid             = window.innerWidth * (1 - fconf.RIGHT_WORKAREA_MARGIN);
        stdMod.bgImgW       = wid;
        //stdMod.bgImgH       = wid * stdMod.simSceSvg_narrowestAsp;
        stdMod.bgImgOffset  = 0;

        stdMod.simSceneW    = wid - 50;
        stdMod.svgSceneW    = stdMod.simSceneW;
        //stdMod.svgSceneH    = stdMod.simSceneH; //useless?

        stdMod.svgVB_W      = sconf.innerMediaWidth;
        stdMod.svgVB_H      = sconf.innerMediaHeight;
        stdMod.svgVB_offsX  = 0;

        let legendHeight = document.querySelector('.bsl-legend-root').offsetHeight;        
        stdMod.simSceneH = stdMod.svgVB_H + legendHeight + 100;

        // todo: these conditionals aren't ideal but do the trick
        if( fconf.sappId.indexOf('lemma2') === 0 || fconf.sappId === 'lemma3' ) {
            console.log('l2/l3')
            stdMod.simSceneH += 400;
            sDomN.sliderGroup$
                .css( 'display', 'inline-block' )
                .css( 'position', 'static' )
                ;
        } else if(fconf.sappId === 'b1sec1lemma9' || fconf.sappId === 'b1sec1lemma10' ) {
            stdMod.simSceneH += 200;
        } else if(fconf.sappId === 'b1sec1lemma11') {
            stdMod.simSceneH += 400;
        }

        stdMod.legendRoot$.css( 'left',  '0px' ); //so it doesn't get offset on page resize

        makes_svgViewBox();
        doesTopContainersSizing();
        wrkwin.buildsMobile({});
    }


    function doesTopContainersSizing()
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

