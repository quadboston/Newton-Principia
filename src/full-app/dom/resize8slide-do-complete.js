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
    var d8d_p       = sn('d8d-point',fmethods);


    //:spatial adjustments
    var VERTICAL_SAFE_HEIGHT_1 = 20;
    var VERTICAL_SAFE_HEIGHT_2 = 20;
    var HORIZONTAL_SAFE_WIDTH = 30; //=spare space for possible scroll bars or misfits ...
    var ESS_MIN_WIDTH = 300;
    var MODEL_MIN_WIDTH = 300; //when dragging
    var LEGEND_MIN_HOR_MARGIN = 15;


    wrkwin.finish_Media8Ess8Legend_resize__upcreate =
           finish_Media8Ess8Legend_resize__upcreate;
    return;







    ///=============================================================================
    /// //\\ restricts and sets super root and text pane sizes
    ///      used in resize and in master-dividor-slider
    ///=============================================================================
    function finish_Media8Ess8Legend_resize__upcreate(
             draggerMove, doDividorSynch
    ) {
        //========================================
        // //\\ gets established parameters
        //========================================
        var theorion = amode.theorion;
        var aspect   = amode.aspect;
        var submodel = amode.submodel;
        var stdMod   = studyMods[ submodel ];
        var isMobile = ns.widthThresholds
                       [ fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD ]();
        var imgRk    = ssD.exegs[ theorion ][ aspect ].imgRk;
        var filler$  = imgRk.filler$;
        var bgImg    = imgRk.dom$();
        var bgImgAsp = bgImg.naturalHeight / bgImg.naturalWidth;
        var mediaAspectRatio = sconf.innerMediaHeight / sconf.innerMediaWidth;
        //========================================
        // \\// gets established parameters
        //========================================



        ///========================================
        /// does mobile and leaves
        ///========================================
        if( isMobile ) {
            sDomN.mediaWidth = window.innerWidth;
            wrkwin.doBuildMobile({
                winW : window.innerWidth,
                mediaAspectRatio,
                bgImgAsp,
                filler$,
            });
            ns.haf( stdMod, 'upcreate' )();
            return;
        }



        //========================================
        // //\\ detects parameters
        //========================================
        //todm use? clientWidth ...without scrollbar: javascript.info)
        var winW        = window.innerWidth - HORIZONTAL_SAFE_WIDTH;
        var navHeight   = sDomN.navBar$.box().height;
        var winH        = window.innerHeight - navHeight - VERTICAL_SAFE_HEIGHT_1;
        var appRootAsp  = winH / winW;

        ///-------------------------------------------
        ///slider group patch for lemmas 2 and 3
        ///-------------------------------------------
        var sliderGroupH = 0;
        if( fconf.sappId === 'lemma2' || fconf.sappId === 'lemma3' ) {
            var sliderGroup$ = ns.$$.q( '.slider-group' );
            var sliderGroupH = sliderGroup$() ? sliderGroup$.box().height : 0;
        }

        var helpBoxHeight   = sDomN.helpBoxAboveMedia$.box().height;

        //-------------------------------------------
        // //\\ calculates legend
        //-------------------------------------------
        var legendWidth = 0;
        var legendHeight = 0;
        /*
        //var lbox = sDomN.legendRoot$.box();
        the alternative way: pull html-element explicitly
            rg[ 'main-legend' ].tb.proof
            rg[ 'main-legend' ].tb.claim
            ...
            and get its dimensions
        */
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
        //-------------------------------------------
        //========================================
        // \\// detects parameters
        //========================================



        //=============================
        // //\\ calculates new values
        //=============================
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

        ////here we try to fullfill this requirement
        var essayWidth = Math.max( ESS_MIN_WIDTH, winW - proposed_rightW );
        proposed_rightW = winW - essayWidth;
        dividorFractions[0] = essayWidth/winW;
        dividorFractions[1] = (winW-essayWidth)/winW;
        //===============================================
        // //\\ synchs results with dividor-slider states
        //===============================================
        if( doDividorSynch ) {
            wrkwin.dividor.achieved.achieved = ns.paste( [], dividorFractions )
            fmethods.panesD8D.updateAllDecPoints();
        }
        //===============================================
        // \\// synchs results with dividor-slider states
        //===============================================


        ////we have enough width for both: essay and media
        //var essayWidth
        //proposed_rightW
        var medH_H = winH
             - sliderGroupH
             - helpBoxHeight
             - VERTICAL_SAFE_HEIGHT_2;
        var medW_H = medH_H / mediaAspectRatio;
        var medH_L = medH_H - legendHeight;
        var medW_L = medH_L / mediaAspectRatio;

        if( medW_L + consideredLegendWidth +
            sconf.main_horizontal_dividor_width_px < proposed_rightW
        ) {
            ////wide screen
            var wideScreen      = true;
            medSupW             = proposed_rightW - consideredLegendWidth;
            //now we calculate H-restriction again
            var medW            = medSupW - sconf.main_horizontal_dividor_width_px-10;
            medW                = Math.min( medW_H, medW );

            var legendMargin    = LEGEND_MIN_HOR_MARGIN;
            var mediaMargin     = Math.max( 0, ( medSupW - medW - 20 ) / 2 );
            var medAddonright   = Math.max( 0, proposed_rightW - medSupW );

        } else {
            ////narrow screen
            var medAddonright = 0;
            var wideScreen = false;
            var medW_H = medH_L / mediaAspectRatio;
            //-------------------------------------------------
            //does set media width
            //-------------------------------------------------
            medSupW = Math.min( proposed_rightW, medW_H );
            var medW = medSupW - sconf.main_horizontal_dividor_width_px;
            var medW   = Math.min( medW_H, medW );
            var medSupW = proposed_rightW;
            //-------------------------------------------------
            //:does set setting legendMarginr
            //-------------------------------------------------
            //does centering legend below the media
            var legendMargin = Math.max( LEGEND_MIN_HOR_MARGIN,
                ( ( proposed_rightW - consideredLegendWidth - 2*LEGEND_MIN_HOR_MARGIN
                ) ) / 2 );
            var mediaMargin = Math.max( 0,
                ( ( medSupW - medW 
                - 20    //todm:
                ) ) / 2 );
        }

        margin2svgPlayArea({ mediaMargin, medW, medAddonright });
        wrkwin.doesBuildNonMobileCss({
            legendMargin,
            mediaMargin,
            essayWidth,
            winH,
            medW,
            mediaAspectRatio,
            bgImgAsp,
            filler$,
            wideScreen,
            legendHeight,
        });

        //patch: todm ... remove "upcreate"
        var wwup = ns.haz( stdMod, 'upcreate' ) ||
                   ns.haz( stdMod, 'model8media_upcreate' )
                   ;
        wwup && wwup();

        return medSupW; //in particular, goes to dividor-slider stashed-update
        //=============================
        // \\// calculates new values
        //=============================
    }
    ///=============================================================================
    /// \\// restricts and sets super root and text pane sizes
    ///=============================================================================

    ///=============================================================================
    /// expands media playable area to margins
    ///=============================================================================
    function margin2svgPlayArea({ mediaMargin, medW, medAddonright })
    {
        sDomN.mediaLeftMargin   = mediaMargin;
        sDomN.mediaWidth        = medW; // mediaPrimaryWidth
        medAddonright           = medAddonright || 0;
        var innerScale          = sconf.innerMediaWidth / medW;
        var visibleOuterW       = mediaMargin*2 + medW + medAddonright
        var innMargin           = mediaMargin * innerScale;
        var visibleInnW         = sconf.innerMediaWidth + 2*innMargin +
                                  medAddonright * innerScale;
        var svgvb =
             (-innMargin).toFixed(4) + ' 0 ' + 
             visibleInnW.toFixed(4) + ' ' +
             sconf.innerMediaHeight;
        sDomN.mmedia.setAttributeNS( null, 'viewBox', svgvb );
        sDomN.mmedia.style.width = visibleOuterW.toFixed(4) + 'px';
        sDomN.mmedia.style.left = (-mediaMargin.toFixed(4)) + 'px';
    }


}) ();

