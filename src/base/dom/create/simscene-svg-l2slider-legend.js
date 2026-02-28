(function(){

    const {sn, $$, stdMod, fconf, sconf, sDomF, sDomN, ssD} =
    window.b$l.apptree({});
    sDomF.cre_medParent8svg8legendIIslider =
          cre_medParent8svg8legendIIslider;
    return;


    function cre_medParent8svg8legendIIslider (){
        //..........................
        // //\\ media root
        //..........................
        stdMod.medParent$ = $$
            .c( 'div' )
            .addClass( 'bsl-simscene highlight-text-disabled' )
            .addClass( 'model' )
            .to( sDomN.simSScene$ )
            ;
        stdMod.medParent = stdMod.medParent$();
        if( fconf.NAVIGATION_DECORATIONS_ALWAYS_VISIBLE ) {
            stdMod.medParent$.addClass( 'active-tip' );
        }
        //..........................
        // \\// media root
        //..........................

        //..........................
        // //\\ bgimage
        //      , placing it before media
        //..........................
        stdMod.imgRk = {};
        stdMod.imgRk.dom$ = $$.img().to( stdMod.medParent );
        stdMod.imgRk.onloadStarted = false;
        //..........................
        // \\// bgimage
        //..........................

        stdMod.medScene = ( stdMod.medScene$ =
            $$.svg()
                 //reserved, will be overriden in
                 //in_subessay_launch____amode2lemma:
                 //.a( 'class', 'bsl--svgscene' )

                .a( 'preserveAspectRatio', "xMidYMid meet" )
                .a( 'draggable', "false" )
                .to( stdMod.medParent )
        )();

        //mscene.setAttributeNS( null, 'class', cssp +'--media' );
                    //https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/version
                    //mscene.setAttributeNS( null, 'version', "1.1" ); //no need
        //mscene.setAttributeNS( null, 'preserveAspectRatio', "xMidYMid meet" );
                    //todm .. setting 'draggable', "false" is not centralized which
                    // makes a spagetty settings
                    //for batch of images and svg elements
        //mscene.setAttributeNS( null, 'draggable', "false" );
                    //depricated in svg:
                    //mscene.setAttributeNS( null, 'baseProfile', "full" );
        //stdMod.medScene$.to( stdMod.medParent );
                    //mscene.setAttributeNS( null, 'fill', "#FFFFAA" );
                    //no good: mscene.style.fill = "#FFFFAA";
        /*
        //supposed to happen in resize event handler
        mscene.setAttributeNS( null, 'viewBox', '0 0 ' +
             sconf.innerMediaWidth + ' ' +
             sconf.innerMediaHeight );
                    //https://developer.mozilla.org/en-US/docs
                    // /Web/SVG/Attribute/preserveAspectRatio
                    //minor details:
                    //https://stackoverflow.com/questions
                    // /16438416/cross-browser-svg-preserveaspectratio
        */
        stdMod.legendRoot$ = $$
            .dct( 'bsl-legend-root', stdMod.medParent );
        if( fconf.sappId.indexOf('b1sec1lemma2') === 0 ||
            fconf.sappId === 'b1sec1lemma3' ) {
            stdMod.legendRoot$.css( 'padding-bottom', '15px' );
        }
    }
})();