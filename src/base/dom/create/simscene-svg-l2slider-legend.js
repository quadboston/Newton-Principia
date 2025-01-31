( function() {
    const {
        ns, sn, $$,
        fconf, sconf, sDomF, sDomN, ssD,
        studyMods,
    } = window.b$l.apptree({
    });
    sDomF.cre_simscene8svg8legendIIslider = cre_simscene8svg8legendIIslider;
    return;







    function cre_simscene8svg8legendIIslider( stdMod )
    {
        var stdModName = stdMod.SUB_MODEL;

        //..........................
        // //\\ media root
        //..........................
        var simScene$ = $$
            .c( 'div' )
            .addClass( 'bsl-simscene highlight-text-disabled submodel--' +
                       stdModName )
            .addClass( 'model' )
            .to( sDomN.simSScene$ )
            ;
        var simScene        = simScene$();
        stdMod.medRoot$     = stdMod.simScene$ = simScene$;
        stdMod.medRoot      = stdMod.simScene  = simScene;

        if( stdModName === ssD.DEFAULT_STUDY_MODEL_NAME ) {
            sDomN.medRoot$ = simScene$;
            sDomN.medRoot  = simScene;
        }
        if( fconf.NAVIGATION_DECORATIONS_ALWAYS_VISIBLE ) {
            stdMod.simScene$.addClass( 'active-tip' );
        }
        //..........................
        // \\// media root
        //..........................

        //..........................
        // //\\ bgimage
        //      , placing it before media
        //..........................
        stdMod.imgRk = {};
        stdMod.imgRk.dom$ = $$.img().to( stdMod.simScene );
        stdMod.imgRk.onloadStarted = false;
        //..........................
        // \\// bgimage
        //..........................

        stdMod.mmedia = stdMod.svgScen = stdMod.svgScene =
        ( stdMod.mmedia$ = stdMod.svgScen$ = stdMod.svgScene$ =
            $$.svg()
                .a( 'class', 'bsl--svgscene' )
                .a( 'preserveAspectRatio', "xMidYMid meet" )
                .a( 'draggable', "false" )
                .to( stdMod.simScene )
        )();

        //mmedia.setAttributeNS( null, 'class', cssp +'--media' );
                    //https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/version
                    //mmedia.setAttributeNS( null, 'version', "1.1" ); //no need
        //mmedia.setAttributeNS( null, 'preserveAspectRatio', "xMidYMid meet" );
                    //todm .. setting 'draggable', "false" is not centralized which
                    // makes a spagetty settings
                    //for batch of images and svg elements
        //mmedia.setAttributeNS( null, 'draggable', "false" );
                    //depricated in svg:
                    //mmedia.setAttributeNS( null, 'baseProfile', "full" );
        //stdMod.mmedia$.to( stdMod.simScene );
                    //mmedia.setAttributeNS( null, 'fill', "#FFFFAA" );
                    //no good: mmedia.style.fill = "#FFFFAA";
        /*
        //supposed to happen in resize event handler
        mmedia.setAttributeNS( null, 'viewBox', '0 0 ' +
             sconf.innerMediaWidth + ' ' +
             sconf.innerMediaHeight );
                    //https://developer.mozilla.org/en-US/docs
                    // /Web/SVG/Attribute/preserveAspectRatio
                    //minor details:
                    //https://stackoverflow.com/questions
                    // /16438416/cross-browser-svg-preserveaspectratio
        */

        if( fconf.sappId.indexOf('lemma2') === 0 || fconf.sappId === 'lemma3' ) {
            ////l2 patch:
            sliderGroupLemma2( stdMod );
        }

        stdMod.legendRoot$ = $$
            .dct( 'bsl-legend-root', stdMod.simScene );
        if( fconf.sappId.indexOf('lemma2') === 0 || fconf.sappId === 'lemma3' ) {
            stdMod.legendRoot$.css( 'padding-bottom', '15px' );
        }
    }


    function sliderGroupLemma2( stdMod )
    {
        sDomN.sliderGroup$ = $$.c('div')
            .addClass("slider-group")
            .to( stdMod.simScene )
            .html(`
                <input class="slider" type="range" id="mySlider"><br>
                <span class="slider-label" style="width:99px">
                    <span id="baseSpan" class="number"></span>
                    <span id="baseLabelSpan"></span>
                </span>
            `);
    }



}) ();

