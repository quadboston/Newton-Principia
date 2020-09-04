// //\\// widget config
( function() {
    var ns      = window.b$l;
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
        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        //point e    28x46
        //point A    28x456 
        var pictureWidth = 687;
        var pictureHeight = 657;

        var activeAreaOffsetX = 47; //28; 
        var activeAreaOffsetOnPictureY = 0; 
        var activeAreaOffsetY = 'to be calculated'; 

        //.set it from graph editor
        //.todm: trully 611 and rotated
        var pictureActiveArea = 611 - activeAreaOffsetOnPictureY;

        var initialPath =
        [
            { name:'A', pos:[531, 613] },
            //{ name:'B', pos:[582, 422.5 ] },
            { name:'B', pos:[582, 425 ] },
            /*
            { name:'C', pos:[546,264] },
            { name:'D', pos:[448,152] },
            { name:'E', pos:[299.5,98.5] },
            { name:'F', pos:[117.5,112.5] },
            */
        ];
        //----------------------------------
        // \\// original material parameters
        //----------------------------------



        //----------------------------------
        // //\\ app view parameters
        //----------------------------------
        //  application coordinate Y
        //  -1 if it goes in opposite-to-screen
        //      direction starting from
        //      activeAreaOffsetY
        //  1  codirectional with the screen
        //     which means from screen-top to
        //      screen bottom
        var MONITOR_Y_FLIP = -1;
        var activeAreaOffsetY = activeAreaOffsetOnPictureY +
            ( MONITOR_Y_FLIP === -1 ? pictureActiveArea : 0 );
        //----------------------------------
        // \\// app view parameters
        //----------------------------------


        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        to_sconf =
        {
            //-----------
            // //\\ model
            //-----------
            force :
            [
                [ -2, 3.9 ], //apparently, the first number is a power n for f=Ar^n
                [ -1, 0 ],
                [ 0, 0 ],
                [ 1, 0 ],
                [ 2, 0 ]
            ],
            speed : 1,
            initialTimieStep : 1,
            //spatialStepsMax0 : 7, //todo was 6
            spatialStepsMax0 : 40, //todo was 6

            //maximum first path from A to B
            //too big values will allow user to place
            //point B on legend area ... will look strange ...
            s0max : 1.4,    
            //-----------
            // \\// model
            //-----------



            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            //100; //display in "percents" of Ae
            //LEGEND_NUMERICAL_SCALE : 100,
            LEGEND_NUMERICAL_SCALE : 1,

            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,

            pictureActiveArea   : pictureActiveArea,
            activeAreaOffsetX   : activeAreaOffsetX,
            activeAreaOffsetY   : activeAreaOffsetY,
            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,

            thickness           : 1,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //----------------------------------
            // //\\ scenario
            //----------------------------------
            enableStudylab : true,
            //hideProofSlider : true, //false,
            enableCapture : true,
            enableTools : true,
            //enableDataFunctionsRepository : true,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            //:for tools sliders: todo prolifiration
            originX_onPicture : activeAreaOffsetX,
            originY_onPicture : activeAreaOffsetY,
        };



        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        (function () {
            var a = initialPath[0].pos;
            var b = initialPath[1].pos;
            //:speed
            var uu = [ b[0] - a[0], b[1] - a[1] ];
            var u2 = uu[0]*uu[0] + uu[1]*uu[1];
            var u = Math.sqrt( u2 );
            //:
            var mod2inn_scale = u; //initial unit
            var inn2mod_scale = 1/mod2inn_scale;
            var vmodel = [
                    uu[0]*inn2mod_scale * to_sconf.speed,
                    MONITOR_Y_FLIP *
                    uu[1]*inn2mod_scale * to_sconf.speed 
            ];
            to_sconf.v0 = vmodel;

            //for Y:
            APP_MODEL_Y_RANGE = pictureActiveArea / mod2inn_scale;

            to_sconf.APP_MODEL_Y_RANGE = APP_MODEL_Y_RANGE;
            to_sconf.mod2inn_scale = mod2inn_scale;

            to_sconf.inn2mod_scale = inn2mod_scale;
            to_sconf.areaScale = 1 / to_sconf.APP_MODEL_Y_RANGE
                                   / to_sconf.APP_MODEL_Y_RANGE;
            to_sconf.A = [
                (a[0] - activeAreaOffsetX ) * inn2mod_scale,
                MONITOR_Y_FLIP *
                (a[1] - activeAreaOffsetY ) * inn2mod_scale
            ];

            //redundant ... v0 is enought ... do fix later
            to_sconf.B = [
                (b[0] - activeAreaOffsetX ) * inn2mod_scale,
                MONITOR_Y_FLIP *
                (b[1] - activeAreaOffsetY ) * inn2mod_scale
            ];

            //todo proliferation in each lemma:
            //for tool sliders:
           to_sconf.originalMod2inn_scale = to_sconf.mod2inn_scale;

        })();

        /*
        to_sconf.tfamilyColor =
        {
            generic         : to_sconf.GENERIC_COLOR,
            claim           : to_sconf.CORE_AREA_COLOR,
            proof           : to_sconf.REMOTE_AREA_COLOR,
            'primary-curve' : to_sconf.CORE_CURVE_COLOR
        };
        */
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

