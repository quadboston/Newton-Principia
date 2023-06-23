// //\\// widget config
( function() {
    var {
        mat,
        fapp, sconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            init_conf
        },
    });
    return;











    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        var to_sconf = {};

        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        //var pictureWidth = 928;
        //var pictureHeight = 850;
        var pictureWidth = 1856;
        var pictureHeight = 1700;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = ( pictureWidth + pictureHeight ) / 6;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        var masterCenterX = 850;
        var masterCenterX = 853;
        var masterCenterY = 976;
        var masterCenterY = 978;

        var centerX_onPicture = 384;
        var centerY_onPicture = 551;
        var centerY_onPicture = 553;

        var mod2inn_scale;

        var pointsOnPicture =
        {
            //C : [56, 550],
            C : [50, 550],
            //B : [836, 552],
            B : [838, 552],
            //B : [834, 554],
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
            mod2inn_scale = mat.unitVector(BC).abs;
            var wwb = ( B[0] - O[0] ) / ( B[0] - C[0] ); //0.6
            a = 1 - wwb;
            a = 0.428;
            a = 0.435;

            //---sets initial param g
            var OM = [ M[0] - O[0], M[1] - O[1] ];
            initial_Munit = mat.unitVector(OM);
            initial_g = initial_Munit.abs/mod2inn_scale;
            initial_g = 0.105;
            //is an absolute value of an angle:
            gamma = Math.acos( initial_Munit.unitVec[0] ); 
            gamma *= 1.01;

            //---sets initial decorational param gN
            var ON = [ N[0] - O[0], N[1] - O[1] ];
            initial_Nunit = mat.unitVector(ON);
            to_sconf.initial_gN = -initial_Nunit.abs/mod2inn_scale;


            var BAA = mat.p1_to_p2( B, AA );
            beta = -Math.asin( BAA.unitVec[1] ); 
            beta = 0.862;
            beta = 0.870;
            beta = 0.859;
            beta = 0.863;

            //ccc( 'beta fraction=' + (beta/Math.PI).toFixed(3) );
            var CAA = mat.p1_to_p2( C, AA );
            alpha = -Math.asin( CAA.unitVec[1] ); 
            alpha = 0.543;
            alpha = 0.528;

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
        //var mod2inn_scale =  ...
        var activeAreaOffsetOnPictureY = centerY_onPicture;
        //----------------------------------
        // \\// app view parameters
        //----------------------------------


        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        fapp.normalizeSliders( pictureHeight / 500 ); //todo not automated, prolifer.
        sconf.default_tp_lightness = 30;
        Object.assign( to_sconf, {
            mediaBgImage : "diagram.png",
            dontRun_ExpandConfig : true,
            initialPoints : pointsOnPicture,

            //CBAng   : CBAng,
            gamma   : gamma,
            a       : a,
            beta    : beta,
            alpha   : alpha,

            initial_g : initial_g,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,

            modorInPicY         : masterCenterY,
            originX_onPicture   : masterCenterX, //needed for common sliders
            originY_onPicture   : masterCenterY, //needed for common sliders

            modorInPicX         : masterCenterX,
            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,

            thickness           : 1,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //----------------------------------
            // //\\ scenario
            //----------------------------------
            hideProofSlider : true, //false,
            enableStudylab : false,
            enableTools : true,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            default_tp_stroke_opacity : 0.5,
            default_tp_stroke_width : Math.floor( 10 * controlsScale ),
            defaultLineWidth : Math.floor( 2 * controlsScale ),
            handleRadius : Math.floor( 25 * controlsScale ),
        });
        sconf.pointDecoration.r = sconf.handleRadius;


        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        (function () {
            var inn2mod_scale = 1/mod2inn_scale;

            //for Y:

            to_sconf.APP_MODEL_Y_RANGE = 1;
            to_sconf.mod2inn_scale = mod2inn_scale;
            to_sconf.inn2mod_scale = inn2mod_scale;

            to_sconf.mod2inn_scale_initial = //todm rid
                mod2inn_scale;

            to_sconf.inn2mod_scale_initial = inn2mod_scale;
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

