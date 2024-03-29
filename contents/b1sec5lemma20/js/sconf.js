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
        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        var pictureWidth = 2000;
        var pictureHeight = 1660;

        var modorInPicX = 821;
        var modorInPicY = 906;

        var pictureActiveArea;

        var pointsOnPicture =
        {
            P : [996, 570],
            A : [623, 1232],
            B : [1497, 1230],
            C : [509,383],
            O : [modorInPicX, modorInPicY],

            //derived points, should not be used in model
            Q : [1077, 1231],
            t : [1511, 574],
            r : [1028, 830],

            D : [1410, 965],
            T : [1283, 572],
            R : [1010, 712],
            S : [532,561],

        };
        //----------------------------------
        // \\// original material parameters
        //----------------------------------



        (function() {
            var pp = pointsOnPicture;

            var OO = pp.O;
            var PP = pp.P;
            var AA = pp.A;
            var BB = pp.B;
            var CC = pp.C;
            var P = [ PP[0] - OO[0], PP[1] - OO[1] ];
            var A = [ AA[0] - OO[0], AA[1] - OO[1] ];
            var B = [ BB[0] - OO[0], BB[1] - OO[1] ];
            var C = [ CC[0] - OO[0], CC[1] - OO[1] ];
            var O = [ 0, 0 ];
            //ccc( 'P=',mat.unitVector(P),  'P=',mat.unitVector(A), 'B=', mat.unitVector(B) ); 
            pictureActiveArea = mat.unitVector(P).abs;

        })();


        //----------------------------------
        // //\\ app view parameters
        //----------------------------------
        //  application coordinate Y
        //  -1 if it goes in opposite-to-screen
        //      direction starting from
        //      modorInPicY
        //  1  codirectional with the screen
        //     which means from screen-top to
        //      screen bottom
        var MONITOR_Y_FLIP = -1;
        var mod2inn_scale = pictureActiveArea;
        var activeAreaOffsetOnPictureY = modorInPicY;
        //----------------------------------
        // \\// app view parameters
        //----------------------------------



        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        fapp.normalizeSliders( pictureHeight / 444 ); //todo not automated, prolifer.
        sconf.default_tp_lightness = 30;
        to_sconf =
        {
            mediaBgImage : "l20.jpg",
            dontRun_ExpandConfig : true,
            initialPoints : pointsOnPicture,

            a : 2.03,
            b : 1,
            rotationRads : Math.PI*0.19,

            //given points on ellipse if fractions of
            //full cycle of param t
            initialparP : 0.259,
            initialparA : 0.7542,
            initialparC : 0.379,
            initialparB : 0.0468,
            initialParT : 0.760, //parameter T on line Pt


            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            //100; //display in "percents" of Ae
            //LEGEND_NUMERICAL_SCALE : 100,
            LEGEND_NUMERICAL_SCALE : 1,

            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,

            pictureActiveArea   : pictureActiveArea,
            originY_onPicture   : modorInPicY,

            modorInPicX,
            modorInPicY,
            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,

            thickness           : 2,
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
            default_tp_stroke_width : 20,
            //default_tp_lightness : 50, //50 is full lightness
            //default_tp_lightness : 40, //50 is full lightness
            defaultLineWidth : 3,

            //:for tools sliders: todo proliferation
            originX_onPicture : modorInPicX, //0,
            originY_onPicture : modorInPicY, //0,
        };


        //todo proliferation in each lemma:
        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        (function () {
            var inn2mod_scale = 1/mod2inn_scale;

            //for Y:
            APP_MODEL_Y_RANGE = pictureActiveArea / mod2inn_scale;

            to_sconf.APP_MODEL_Y_RANGE = APP_MODEL_Y_RANGE;
            to_sconf.mod2inn_scale = mod2inn_scale;
            to_sconf.inn2mod_scale = inn2mod_scale;
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

