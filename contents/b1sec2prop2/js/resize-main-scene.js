( function() {
    var {
        sn, $$, plugins, has, haz, eachprop,
        sconf,  fmethods, ssD, sDomN,
        amode, stdMod, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            creates_mainSceneResizer,
        },
    });
    return;








    function creates_mainSceneResizer()
    {
        ccc( 'xxx' );
        //--------------------------------------------------------
        // //\\ attaches ownself to resize manager
        //--------------------------------------------------------
        var hazR = haz( fmethods, 'resizeHappened' );
        fmethods.resizeHappened  = hazR ?
                () => {
                    hazR();
                    doFitScene();
                }
            :
                doFitScene
            ;
        //--------------------------------------------------------
        // \\// attaches ownself to resize manager
        //--------------------------------------------------------
    }






    //-----------------------------------------------------------
    // //\\ sets CSS for extra panes and images
    //-----------------------------------------------------------
    function doFitScene()
    {
        //--------------------------------------------------------
        // //\\ detects GUI
        //--------------------------------------------------------
        //see: //\\ for additional added elements in media root
        var FRACTION_OF_FULL_WIDTH  = 0.95;
        var sceneFraction_width     = stdMod.simSceneW * FRACTION_OF_FULL_WIDTH;
        var sceneFraction_left      = stdMod.simSceneW *
                                      (1 - FRACTION_OF_FULL_WIDTH)/2
                                      - stdMod.bgImgOffset;

        var rgReactions             = rg[ amode.subessay + '-sreactions' ];
        //--------------------------------------------------------
        // \\// detects GUI
        //--------------------------------------------------------







        //--------------------------------------------------------
        // //\\ sets phenAnimPane CSS
        //--------------------------------------------------------
        var FRACTION_OF_FULL_HEIGHT = 0.95;
        var cssTop                  = 0;
        var phenAnimPane_height     = stdMod.simSceneH * 
                                      FRACTION_OF_FULL_HEIGHT;
        var reserved_height         = phenAnimPane_height;
        var phenAnimPane_width      = sceneFraction_width;
        var reserved_width          = phenAnimPane_width;
        var outerAR                 = phenAnimPane_height / phenAnimPane_width;
        var confAR                  = 600/500; //sconf.PHEN_ANIMATION_PANE_ASPECT_RATIO;
        var distortionAR            = outerAR / confAR;
        if( distortionAR > 1 ) {
            phenAnimPane_height = confAR * phenAnimPane_width; 
        } else {
            phenAnimPane_width = phenAnimPane_height / confAR; 
        }
        var cssWidth_str    = phenAnimPane_width.toFixed() + 'px';
        var cssHeight_str   = phenAnimPane_height.toFixed() + 'px';
        var cssLeft_str     = ((reserved_width - phenAnimPane_width )/2 +
                                sceneFraction_left
                              ).toFixed() + 'px';
        var cssTop_str      = ((reserved_height - phenAnimPane_height )/2).toFixed() + 'px';

        //uses ".css 'overflow', 'hidden', bs it's unclear how to correct
        //Babylon js itself
        sDomN.commonAnimRoot$
            .css( 'width',  cssWidth_str )
            .css( 'height', cssHeight_str )
            .css( 'left',   cssLeft_str )
            .css( 'top',    cssTop_str )
            .css( 'overflow', 'hidden' )
            ;
    }
    //--------------------------------------------------------
    // \\// sets CSS for extra panes and images
    //--------------------------------------------------------

}) ();

