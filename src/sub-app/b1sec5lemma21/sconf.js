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
        var to_sconf = {};

        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        var pictureWidth = 928;
        var pictureHeight = 850;

        var centerX_onPicture = 384;
        var centerY_onPicture = 551;

        var pictureActiveArea;
        var activeAreaOffsetX = centerX_onPicture;

        var pointsOnPicture =
        {
            C : [56, 550],
            B : [836, 552],
            P : [548, 77],
            M : [391,634],
            N : [380, 476],
            T : [411, 219],
            O : [centerX_onPicture, centerY_onPicture],
            R : [734, 346],
            AA : [568, 244],
        };
        //----------------------------------
        // \\// original material parameters
        //----------------------------------


        var gamma = Math.PI*0.49;
        var b;
        var a;
        var beta;
        var alpha;

        var initial_g;

        ///derives initial model parameters from picture's points
        (function() {
            var pp = pointsOnPicture;
            var B = pp.B;
            var C = pp.C;
            var O = pp.O;
            var M = pp.M;
            var N = pp.N;
            var AA = pp.AA;
            var BC = [ B[0] - C[0], B[1] - C[1] ];
            pictureActiveArea = mat.unitVector(BC).abs;
            b = ( B[0] - O[0] ) / ( B[0] - C[0] ); //0.6
            a = 1 - b;

            //---sets initial param g
            var OM = [ M[0] - O[0], M[1] - O[1] ];
            initial_Munit = mat.unitVector(OM);
            initial_g = initial_Munit.abs/pictureActiveArea;
            //initial_g *= 0.9; //patch
            //is an absolute value of an angle:
            gamma = Math.acos( initial_Munit.unitVec[0] ); 

            //---sets initial decorational param gN
            var ON = [ N[0] - O[0], N[1] - O[1] ];
            initial_Nunit = mat.unitVector(ON);
            to_sconf.initial_gN = -initial_Nunit.abs/pictureActiveArea;


            var BAA = mat.p1_to_p2( B, AA );
            beta = -Math.asin( BAA.unitVec[1] ); 
            //ccc( 'beta fraction=' + (beta/Math.PI).toFixed(3) );
            var CAA = mat.p1_to_p2( C, AA );
            alpha = -Math.asin( CAA.unitVec[1] ); 
            //ccc( 'alpha fraction=' + (alpha/Math.PI).toFixed(3) );
        })();

        //----------------------------------
        // //\\ app view parameters
        //----------------------------------
        //  application coordinate Y
        //  -1 if it goes in opposite-to-screen
        //      direction starting from
        //      centerY_onPicture
        //  1  codirectional with the screen
        //     which means from screen-top to
        //      screen bottom
        var MONITOR_Y_FLIP = -1;
        var mod2med_scale = pictureActiveArea;
        var centerY_onPicture = centerY_onPicture;
        var activeAreaOffsetOnPictureY = centerY_onPicture;
        //----------------------------------
        // \\// app view parameters
        //----------------------------------


        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        Object.assign( to_sconf, {
            initialPoints : pointsOnPicture,

            //CBAng   : CBAng,
            gamma   : gamma,
            b       : b,
            a       : a,
            beta    : beta,
            alpha   : alpha,

            initial_g : initial_g,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,

            pictureActiveArea   : pictureActiveArea,
            activeAreaOffsetX   : activeAreaOffsetX,
            centerOnPicture_Y   : centerY_onPicture,
            centerOnPicture_X   : centerX_onPicture,
            innerMediaHeight    : pictureHeight,
            innerMediaWidth     : pictureWidth,

            thickness           : 1,

            topicColorPerAnchor : !true,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //----------------------------------
            // //\\ scenario
            //----------------------------------
            hideProofSlider : true, //false,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            default_tp_stroke_opacity : 2,
            default_tp_stroke_width : 10,
            //default_tp_lightness : 50, //50 is full lightness
            default_tp_lightness : 40, //50 is full lightness
            defaultLineWidth : 2,
        });



        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        (function () {
            var med2mod_scale = 1/mod2med_scale;

            //for Y:
            APP_MODEL_Y_RANGE = pictureActiveArea / mod2med_scale;

            to_sconf.APP_MODEL_Y_RANGE = APP_MODEL_Y_RANGE;
            to_sconf.mod2med_scale = mod2med_scale;
            to_sconf.med2mod_scale = med2mod_scale;
            to_sconf.mod2med_scale_initial = mod2med_scale;
            to_sconf.med2mod_scale_initial = med2mod_scale;
        })();
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

