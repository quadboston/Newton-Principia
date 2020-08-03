// //\\// widget config
( function() {
    var ns      = window.b$l;
    var mat     = ns.sn( 'mat' );
    var sn      = ns.sn;

    var fapp    = sn('fapp' ); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);
    var sapp    = sn('sapp'); 

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_conf';
    //var ccc         = console.log; ccc && ( ccc = console.log );
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    return;









    function setModule()
    {
        ssF.init_conf = init_conf;
    }
    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //--------------------------------------
        // //\\ original-book picture parameters
        //--------------------------------------
        var pictureWidth = 839;
        var pictureHeight = 563;
        var originX_onPicture = 140;
        var originY_onPicture = 61;

        var originalPoints =
        {
            ////some of them may become independent paramters of model
            A : [originX_onPicture, originY_onPicture],
            r : [originX_onPicture, 531],
            R : [originX_onPicture, 302],
            //B : [330, 164],
            B : [323, 156],
            D : [474, originY_onPicture],
            d : [778, originY_onPicture],
            b : [514, 254],
        };
        var givenCurvePivots =
        [
            [148,62],
            [161,64],
            [202,75],
            [259,100],
            [305,135],
            [originalPoints.B[0], originalPoints.B[1]],
            [353,203],
            //[360.5, 239.0], //"oversampling"
        ];
        //--------------------------------------
        // \\// original-book picture parameters
        //--------------------------------------



        //----------------------------------
        // //\\ MONITOR Y FLIP
        //----------------------------------
        //  application coordinate Y
        //  -1 if it goes in opposite-to-screen
        //      direction starting from
        //      centerY_onPicture
        //  1  codirectional with the screen
        //     which means from screen-top to
        //      screen bottom
        var MONITOR_Y_FLIP = -1;
        //----------------------------------
        // \\// MONITOR Y FLIP
        //----------------------------------



        //---------------------------------------------------------------------------
        // //\\ derives initial model parameters from picture's points
        //---------------------------------------------------------------------------
        //appar. as by I.N.: difference between two first x-points:
        var mod2med_scale = originalPoints.R[1] - originalPoints.A[1];
        var med2mod_scale = 1/mod2med_scale;

        var pname2point = {};
        var factor = MONITOR_Y_FLIP * med2mod_scale;
        (function() {
            Object.keys( originalPoints ).forEach( pkey => {
                var pp = originalPoints[ pkey ];
                pname2point[ pkey ] = 
                [ ( pp[0] - originX_onPicture ) * med2mod_scale,
                  ( pp[1] - originY_onPicture ) * factor,
                ];
            });
        })();
        var curveModelPivots = givenCurvePivots.map( opoint =>
            [ ( opoint[0] - originX_onPicture ) * med2mod_scale,
              ( opoint[1] - originY_onPicture +

                //additional tune-up: shifting curve exactly into origin A
                originY_onPicture - 61.0858

              ) * factor,
            ]
        );
        //ccc( 'curveModelPivots=',curveModelPivots )
        //---------------------------------------------------------------------------
        // \\// derives initial model parameters from picture's points
        //---------------------------------------------------------------------------



        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        Object.assign( sconf, {

            MONITOR_Y_FLIP : MONITOR_Y_FLIP,

            pname2point : pname2point,
            originalPoints : originalPoints,
            curveModelPivots : curveModelPivots,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            originalMod2med_scale : mod2med_scale,

            //todm: too long to fix everywhere ...
            activeAreaOffsetX   : originX_onPicture,
            activeAreaOffsetY   : originY_onPicture,

            originX_onPicture   : originX_onPicture,
            originY_onPicture   : originY_onPicture,

            //todm check is this safe to disable this
            //centerOnPicture_X   : originX_onPicture,
            //centerOnPicture_Y   : originY_onPicture,


            innerMediaHeight    : pictureHeight,
            innerMediaWidth     : pictureWidth,
            thickness           : 1,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //----------------------------------
            // //\\ scenario
            //----------------------------------
            enableStudylab : true,
            hideProofSlider : true, //false,
            enableCapture : true,
            enableTools : true,
            enableDataFunctionsRepository : false,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            default_tp_stroke_opacity : 2,
            default_tp_stroke_width : 10,
            default_tp_lightness : 40, //50 is full lightness
            defaultLineWidth : 2,

            mod2med_scale : mod2med_scale,
            med2mod_scale : med2mod_scale,
            mod2med_scale_initial : mod2med_scale,
            med2mod_scale_initial : med2mod_scale,
        });
        //----------------------------------
        // \\// prepares sconf data holder
        //----------------------------------------------------
    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();

