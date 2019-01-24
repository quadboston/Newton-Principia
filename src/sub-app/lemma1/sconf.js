// //\\// widget config
( function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp    = sn('fapp' ); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);
    var sapp    = sn('sapp'); 
    var srg_modules = sn('srg_modules', sapp);

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_conf';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //0000000000000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000000000000








    function setModule()
    {
        ssF.init_conf = init_conf;
    }


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {


        //----------------------------------
        // //\\ study model parameters
        //----------------------------------
        var APP_MODEL_Y_RANGE = 1000;
        //----------------------------------
        // \\// study model parameters
        //----------------------------------




        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        //point e    28x46
        //point A    28x456 
        var pictureWidth = 504;
        var pictureHeight = 495;
        var activeAreaOffsetX = 28; //28; 
        var activeAreaOffsetY = 46; 
        //.set it from graph editor
        var pictureActiveArea = 456 - activeAreaOffsetY;
        var mod2med_scale = pictureActiveArea / APP_MODEL_Y_RANGE;
        //----------------------------------
        // \\// original material parameters
        //----------------------------------



        //----------------------------------
        //:app view parameters
        //----------------------------------
        var MONITOR_Y_FLIP = -1;



        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        to_sconf =
        {
            //----------------------------------
            // //\\ scenario
            //----------------------------------
            LANDING_MODE : 'claim',
            hideProofSlider : true, // false,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            APP_MODEL_Y_RANGE : APP_MODEL_Y_RANGE,

            //----------------------------------
            // //\\ original lemma parameters
            //----------------------------------
            curvePivots :
            [
                [0, 0],
                //[326.8, 715.3],
                //[326.8*1.05, 742*1.05],

                [270.19, 612.8],

                //[72.29, 621.2],

                //[1516.1, 569.9]
                //[1516.1, 495] //tmp
                [ 1060, 567 ]
                /* very good for debug: simple curve
                [0, 0],
                [500, 1000],
                [1000, 0]
                */
            ],

            //:ranges
            tanA_min : 0.1, //pivot1x/pivot1y minimum
            pivot1y_max : APP_MODEL_Y_RANGE * 0.99,
            pivot2x_max : APP_MODEL_Y_RANGE * 1.8,
            pivot2y_min : APP_MODEL_Y_RANGE * 0.3,
            pivot2y_max : APP_MODEL_Y_RANGE * 0.99,


            //bezier parameter t of point C on principal curve
            //tC : 0.5, //good for debug
            tC : 0.50077 / 0.79 ,

            claimRatio : 0.74081,
            //range:
            claimRatio_max : 0.9, //Dy_per_Ey


            tiltRatio : 1,   //controls DB-line tilt: 
                             //1 is perpendicular; < 1 dy/dx is negative, > 1 is positive
            //:ranges
            tiltRatio_min   : 0.4,
            tiltRatio_max   : 1.5,
            Ep2yrange_max   : 0.8,
            Cx_min          : 0.1,
            //----------------------------------
            // \\// original lemma parameters
            //----------------------------------



            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            //100; //display in "percents" of Ae
            LEGEND_NUMERICAL_SCALE : 100,
            //LEGEND_NUMERICAL_SCALE : 1,

            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            mod2med_scale       : mod2med_scale,
            med2mod_scale       : 1/mod2med_scale,

            activeAreaOffsetX   : activeAreaOffsetX,
            activeAreaOffsetY   : activeAreaOffsetY +
                                  ( MONITOR_Y_FLIP === -1 ? pictureActiveArea : 0 ),
            innerMediaHeight    : pictureHeight,
            innerMediaWidth     : pictureWidth,

            thickness           : 1,

            GENERIC_COLOR       : '0, 0, 0',
            CORE_CURVE_COLOR    : '160, 0, 0',
            CORE_AREA_COLOR     : '0,125,0',
            REMOTE_AREA_COLOR   : '0,0,255'
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------
        };



        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        to_sconf.tfamilyColor =
        {
            generic         : to_sconf.GENERIC_COLOR,
            claim           : to_sconf.CORE_AREA_COLOR,
            proof           : to_sconf.REMOTE_AREA_COLOR,
            'primary-curve' : to_sconf.CORE_CURVE_COLOR
        };

        ///possibly lemma-9-specific
        ///todo find and fix
        to_sconf.text =
        {
            offsetX: 1111, //broken
            offsetY: 111,  //broken
                           //to_sconf.MONITOR_Y_FLIP * to_sconf.APP_MODEL_Y_RANGE/
            style:
            {
                "font-family":'montserrat,arial,helvetica',
                "font-weight":'normal',
                "font-size":40
            }
        };
        to_sconf.areaScale = 1 / to_sconf.APP_MODEL_Y_RANGE / to_sconf.APP_MODEL_Y_RANGE;
        //----------------------------------
        // \\// spawns to_conf
        // \\// prepares sconf data holder
        //----------------------------------------------------



        //----------------------------------------------------
        // //\\ copy-pastes to sconf
        //----------------------------------------------------
        Object.keys( to_sconf ).forEach( function( key ) {
            sconf[ key ] = to_sconf[ key ];
        });
        //----------------------------------------------------
        // \\// copy-pastes to sconf
        //----------------------------------------------------

    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();

