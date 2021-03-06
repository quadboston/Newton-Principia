( function() {
    var {
        ns,
        $$,
        haz,
        cssp,
        sn,
        fmethods,
        fconf,
        sconf,
        sDomN,
        wrkwin,
    } = window.b$l.apptree({
        ssFExportList :
        {
        },
    });

    wrkwin.doBuildMobile            = doBuildMobile;
    wrkwin.doesBuildNonMobileCss    = doesBuildNonMobileCss;
    return;










    function common_mob8des_css({
        essW_str,
        essH_str,
        medW_str,
    }) {
        sDomN.essaionsRoot$
            .css( 'width',  essW_str )
            .css( 'height',  essH_str )
            ;

        // //\\ legend
        sDomN.legendRoot$
            .css( 'text-align', 'center' )
            //.css( 'vertical-align', 'top' )
            ;
        // \\// legend
    }




    //================================================
    //todo ... cleanup mobile ... apparently
    //      mobile does not need all these settings ...
    //      mobile was not elaborated enough ...
    //
    //      the GUI is so simple ... why to struggle
    //      here?
    //================================================
    function doBuildMobile({
        winW,
        mediaAspectRatio,
        bgImgAsp,
        filler$,
    }) {

        //------------------------------------------------------------------
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

        //--------------------------------------------------------------------
        // //\\ for additional added elements in media root
        //--------------------------------------------------------------------
        sDomN.mediaOuterWidth        = winW;
        //sDomN.mediaVisibleOuterWidth = mediaMargin*2 + medW + medAddonright;
        sDomN.mediaVisibleOuterWidth = winW;
        sDomN.mediaMargin            = 0;
        sDomN.medAddonright          = 0;
        //--------------------------------------------------------------------
        // \\// for additional added elements in media root
        //--------------------------------------------------------------------

        //------------------------------------------------------------------
        // \\// very tedious way to get the necessary height of visible text
        //------------------------------------------------------------------
        var essH_str = ( Math.min( maxHeight, window.innerHeight/2 ) ).toFixed(2)
                         + 'px';
        var essW_str = "92%";
        var medW_str = winW.toFixed() + "px";

        //setting filler image height for sliders gap
        filler$.css( 'height', ( mediaAspectRatio - bgImgAsp ) * winW + 'px' );

        fmethods.resizeHappened({ mediaWidth : winW, mediaAspectRatio, }); 
        //------------------------------------------------------------------
        // //\\ do css
        //------------------------------------------------------------------

        //do we need this at all?
        common_mob8des_css({
            essW_str,
            essH_str,
            medW_str,
        });


        //---------------------------------------
        // //\\ fixes things which were broken by
        //      margin to spatials desktop updates
        //---------------------------------------
        sDomN.medRoot$
            .css( 'width',  '100%'
        );
        sDomN.mmedia.setAttributeNS(
            null,
            'viewBox', '0 0 ' +
            sconf.innerMediaWidth + ' ' +
            sconf.innerMediaHeight
        );
        sDomN.mmedia.style.width = 'auto';
        sDomN.mmedia.style.left = '0px';
        //---------------------------------------
        // \\// fixes things which were broken by
        //---------------------------------------


        var videoW_mobile_px = (0.94*winW).toFixed(2) + 'px';
        var videoH_mobile_px = (0.94*winW*10/16).toFixed(2) + 'px';
        sDomN.mediaHorizontalHandlerCSS$.html(`
            .bsl-showreel-video-wrap {
                width   :${videoW_mobile_px};
                height  :${videoH_mobile_px};
            }
        `);

        sDomN.legendRoot$
            //.css( 'position', 'relative' )
            .css( 'float', 'none' )
            .css( 'top', '0' )
            ;

        sDomN.medSuperroot$
            .css( 'width',  '100%' )
            .css( 'margin-left',  '0' );
            ;
            //.css( 'width',  medW_str );

        //------------------------------------------------------------------
        // \\// do css
        //------------------------------------------------------------------
    }







    function doesBuildNonMobileCss({
        legendMargin,
        mediaMargin,
        essayWidth,
        winH,
        //medSupW,
        medW,
        mediaAspectRatio,
        bgImgAsp,
        filler$,
        wideScreen_flag,
        legendHeight,
    }) {


        //-------------------------------------------------------------
        // //\\ essay width is a scapegoat for failing width adjustment
        //-------------------------------------------------------------
        //this patch is against breakage when tool-sliders are on
        var l6patch = 40 +
            (
                (
                    fconf.sappId === 'b3sec4lemma5' ||
                    fconf.sappId === 'b1sec1lemma6' ||
                    fconf.sappId === 'b1sec1lemma7'
                )
                ?
                essayWidth * 160 / 800
                :
                0
            );

        //ccc( 'essayWidth=', essayWidth , 'medW=' + medW );

        var essW_str  = ( essayWidth

            // manual safety patch
            // decrease essay to give more space for fluind media and legend
            //- 20    //fails, todm
            //- 40    //works
            - l6patch

            ).toFixed()+'px';
        //-------------------------------------------------------------
        // \\// essay width is a scapegoat for failing width adjustment
        //-------------------------------------------------------------






        var essH_str = ( winH
            - 20  //todm
        ).toFixed()+'px';

        var medW_str = medW.toFixed()+'px';


        fmethods.resizeHappened({ mediaWidth : medW, mediaAspectRatio, }); 
        common_mob8des_css({
            essW_str,
            essH_str,
            medW_str,
        })
        sDomN.medRoot$
            .css( 'width',  medW_str );

        sDomN.medSuperroot$
            .css( 'width',  'auto' ); //todm must be in global css by is-mobile css-class

        // //\\ legend
        var legM_str = legendMargin.toFixed(2) + 'px';
        sDomN.legendRoot$
            .css( 'float',   'left' )
            .css( 'margin-left',  legM_str )
            .css( 'margin-right', legM_str );
        if( wideScreen_flag ) {
            var ww =  fconf.sappId === 'lemma2' || fconf.sappId === 'lemma3' ? 20 : 0;
            sDomN.legendRoot$
                .css( 'position', 'relative' )
                .css( 'top', Math.max( 0, winH-legendHeight - ww ).toFixed() + 'px' )
                ;
        } else {
            sDomN.legendRoot$
                .css( 'position', 'static' )
                .css( 'top', '0px' )
                ;
        }
        // \\// legend

        // //\\ media
        var medM_str = mediaMargin.toFixed(2) + 'px';
        sDomN.medRoot$
            .css( 'margin-left',  medM_str )
            .css( 'margin-right', medM_str );
        // \\// media

        //:setting filler image height for sliders gap
        filler$.css( 'height', ( mediaAspectRatio - bgImgAsp ) * medW + 'px' );


        //--------------------
        // //\\ video
        //--------------------
        ///this is a part of essaion text pane,
        ///this only modifies a whole CSS for this element
        ///the whole CSS in in file fapp.css.js
        // //\\ video preparations
        //.todm why 0.8? box-sizing model?
        //var videoW = textPaneW_perc / 100 * winW * 0.8;
        var videoW = essayWidth * 0.8;
        var videoH = videoW*10/16;
        var videoW_px = videoW.toFixed(2) + 'px';
        var videoH_px = videoH.toFixed(2) + 'px';
        // \\// video preparations
        sDomN.mediaHorizontalHandlerCSS$.html(`
            .bsl-showreel-video-wrap {
                width   : ${videoW_px};
                height  : ${videoH_px};
            }
        `);
        //--------------------
        // \\// video
        //--------------------
    }


}) ();

