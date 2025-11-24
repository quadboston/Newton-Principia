( function() {
    var { sn, $$, haz, has, fmethods, eachprop, fconf, sconf, sDomN, wrkwin,
        stdMod, } = window.b$l.apptree({ ssFExportList : { }, });
    wrkwin.buildsMobile     = buildsMobile;
    wrkwin.buildsNonMobile  = buildsNonMobile;
    return;


    function buildsMobile({})
    {
        //------------------------------------------------------------------
        // //\\ essays css
        // //\\ very tedious way to get the necessary height of visible text
        //      by iterating through essaion children-texts
        //------------------------------------------------------------------
        //makes at least part of vertical menu visible
        //todm: make all vertical menu visible:
        var maxHeight = 250;
        sDomN.essaionsRoot$.children( child => {
            var wHeight = child.getBoundingClientRect().height;
            if( maxHeight < wHeight ) {
                maxHeight = wHeight;
            }
        });
        //------------------------------------------------------------------
        // \\// very tedious way to get the necessary height of visible text
        //------------------------------------------------------------------

        //todm: why 2 in window.innerHeight/2 ?
        var essH_str = Math.min( maxHeight, window.innerHeight/2
                       ).toFixed(2) + 'px';
        var essW_str = "92%";
        sDomN.essaionsRoot$
            .css( 'width',  essW_str )
            .css( 'height',  essH_str )
            ;
        //------------------------------------------------------------------
        // \\// essays css
        //------------------------------------------------------------------



        //----------------------------------------------------------------
        // //\\ medias spatial css
        //----------------------------------------------------------------
        stdMod.svgScene.style.width = '100%';
        //amends desktop setting
        //sDomN.simSScene$.css( 'height', 'auto' );
        var imgDom$ = haz( stdMod.imgRk, 'dom$' );
        imgDom$ && imgDom$  //if image exists
            .css( 'width', '100%' )
            .css( 'left', '0px' )
            ;
        //----------------------------------------------------------------
        // \\// medias spatial css
        //----------------------------------------------------------------

        //------------------------------------------------------------------
        // //\\ legend css
        //------------------------------------------------------------------
        stdMod.legendRoot$.css( 'top', '10px' );
        stdMod.legendRoot$.css( 'left', '0px' );
        //------------------------------------------------------------------
        // \\// legend css
        //------------------------------------------------------------------


        //------------------------------------------------------------------
        // //\\ video css
        //------------------------------------------------------------------
        var bgImgW = stdMod.bgImgW;
        var videoW_mobile_px = (0.94*bgImgW).toFixed(2) + 'px';
        var videoH_mobile_px = (0.94*bgImgW*10/16).toFixed(2) + 'px';
        sDomN.mediaHorizontalHandlerCSS$.html(`
            .bsl-showreel-video-wrap {
                width   :${videoW_mobile_px};
                height  :${videoH_mobile_px};
            }
        `);
        //------------------------------------------------------------------
        // \\// video css
        //------------------------------------------------------------------
    }


    function buildsNonMobile({
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
        bases_slidersH,
    }) {

        //-------------------------------------------------------------
        // //\\ essay
        //      width is a scapegoat for failing width adjustment
        //-------------------------------------------------------------
        //this patch is against breakage when tool-sliders are on
        var l6patch =
                (
                    fconf.sappId === 'b3lemma5' ||
                    fconf.sappId === 'b1sec1lemma6' ||
                    fconf.sappId === 'b1sec1lemma7'
                )
                ?
                essayWidth * 160 / 800
                :
                0
        ;
        var essW_str  = ( essayWidth
            // manual safety patch
            // decrease essay to give more space for fluind media and legend
            //- 20    //fails, todm
            - 40       //works
            //- l6patch

            ).toFixed()+'px';
        var essH_str = ( SSceneH
                            - 20  //todm
                       ).toFixed()+'px';
        sDomN.essaionsRoot$
            .css( 'width',  essW_str )
            .css( 'height',  essH_str )
            ;
        //-------------------------------------------------------------
        // \\// essay
        //-------------------------------------------------------------

        //---------------------------------------------------------
        // //\\ super scene csss
        //---------------------------------------------------------
        sDomN.simSScene$
            //needed for horizontal dividor setting of 100%
            .css( 'height', SSceneH.toFixed() + 'px' )
            ;
        //---------------------------------------------------------
        // \\// super scene csss
        //---------------------------------------------------------

        //---------------------------------------------------------
        // //\\ medias spatial css
        //---------------------------------------------------------
        //compares with initial landing config:
        stdMod.svgScene.style.width =
            stdMod.svgSceneW.toFixed() + 'px';

        var imgDom$ = haz( stdMod.imgRk, 'dom$' );
        imgDom$ && imgDom$  //if image exists
            .css( 'width', bgImgW.toFixed() + 'px' )
            .css( 'left', bgImgOffset.toFixed() + 'px' )
            ;
        //---------------------------------------------------------
        // \\// medias spatial css
        //---------------------------------------------------------


        //---------------------------------------------------------
        // //\\ legend css
        //      note: for STATIC_LEGEND, legend dom is ignored
        //---------------------------------------------------------
        if( wideScreen_flag ) {
            //todo ???
            var ww = sDomN.sliderGroup$ ? 20 : 0; //for lemma 2, 3, 4
            stdMod.legendRoot$
                .css( 'left', ( svgSceneW + legendMargin ).toFixed() + 'px' )
                .css( 'top','0px' )
                ;
        } else {
            stdMod.legendRoot$
                .css( 'top', (bases_slidersH + stdMod.svgSceneH + 10).toFixed()+'px' )
                .css( 'left', legendMargin.toFixed(2) + 'px' )
                ;
        }
        //---------------------------------------------------------
        // \\// legend css
        //---------------------------------------------------------


        //--------------------
        // //\\ video css
        //--------------------
        ///this is a part of essaion text pane,
        ///this only modifies a whole CSS for this element
        ///the whole CSS in in file fapp.css.js
        // //\\ video preparations
        //.todm why 0.8? box-sizing model?
        //var videoW    = textPaneW_perc / 100 * bgImgW * 0.8;
        var videoW      = essayWidth; // * 0.8;
        var videoH      = videoW*10/16;
        var videoW_px   = videoW.toFixed(2) + 'px';
        var videoH_px   = videoH.toFixed(2) + 'px';
        // \\// video preparations
        sDomN.mediaHorizontalHandlerCSS$.html(`
            .bsl-showreel-video-wrap {
                width   : ${videoW_px};
                height  : ${videoH_px};
            }
        `);
        //--------------------
        // \\// video css
        //--------------------
    }


}) ();

