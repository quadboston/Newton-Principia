( function() {
    var {
        haff, eachprop,
        sconf, ssF,
        studyMods,
    } = window.b$l.apptree({
        ssFExportList : { init_conf }
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
        //point e    28x46
        //point A    28x456 
        var pictureWidth = 687;
        var pictureHeight = 657;

        var modorInPicX = 47; //28; 
        var activeAreaOffsetOnPictureY = 0; 
        var modorInPicY = 'to be calculated'; 

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
        //  lemma-model coordinate y
        //  -1 if it goes in opposite-to-screen
        //      direction starting from
        //      modorInPicY
        //  1  codirectional with the screen
        //     which means from screen-top to
        //      screen bottom
        var MONITOR_Y_FLIP = -1;

        //done in picture-system y-coord:
        //(pic.bottom-y=+picHeight)
        var modorInPicY = activeAreaOffsetOnPictureY +
            ( MONITOR_Y_FLIP === -1 ? pictureActiveArea : 0 );
        //----------------------------------
        // \\// app view parameters
        //----------------------------------


        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        let initialTimieStep = 1;
        let timeRange = 14;
        let speed = 1;
        to_sconf =
        {
            default_tp_lightness : 30,
            mediaBgImage : "../common/img/b1s2p1t1.png",
            dontRun_ExpandConfig : true,

            //-----------
            // //\\ model
            //-----------
            force :
            [
                //[ -2, 3.9 ], //apparently, the first number is a power n for f=Ar^n
                //f=Ar^n
                [   -2,                  //=n
                    3.9/initialTimieStep/initialTimieStep //=A
                ],

                [ -1, 0 ],
                [ 0, 0 ],
                [ 1, 0 ],
                [ 2, 0 ]
            ],

            //for T2.Cor2: accelerating areas:
            tangentialForcePerCentripetal_fraction : 0.4,

            speed,
            initialTimieStep,
            timeRange,

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
            modorInPicX,
            modorInPicY,
            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,
            pictureWidth,       //needed only to paint vecor's Av tip

            thickness           : 1,
            default_tp_stroke_width : 10,
            hide_perp_P_and_alike : false,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //----------------------------------
            // //\\ scenario
            //----------------------------------
            enableStudylab : false,
            //hideProofSlider : true, //false,
            enableCapture : true,
            enableTools : false,
            //enableDataFunctionsRepository : true,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            //:for tools sliders: todo proliferation
            originX_onPicture : modorInPicX,
            originY_onPicture : modorInPicY,
        };



        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        (function () {
            var a = initialPath[0].pos; //in picture space
            var b = initialPath[1].pos;
            //:speed
            var uu = [ b[0] - a[0], b[1] - a[1] ];
            var u2 = uu[0]*uu[0] + uu[1]*uu[1];
            var u = Math.sqrt( u2 );
            //:
            var mod2inn_scale = u; //initial unit
            var inn2mod_scale = 1/mod2inn_scale;

            var vmodel = [
                    uu[0]*inn2mod_scale / to_sconf.initialTimieStep, //* to_sconf.speed,
                    MONITOR_Y_FLIP *
                    uu[1]*inn2mod_scale / to_sconf.initialTimieStep, //* to_sconf.speed
            ];
            to_sconf.v0 = vmodel;

            //why?
            //to_sconf.vabs0 = Math.sqrt( ww[0]*ww[0] + ww[1]*ww[1] );
            to_sconf.vabs0 = to_sconf.speed;

            //for Y:
            APP_MODEL_Y_RANGE = pictureActiveArea / mod2inn_scale;

            to_sconf.APP_MODEL_Y_RANGE = APP_MODEL_Y_RANGE;
            to_sconf.mod2inn_scale = mod2inn_scale;

            to_sconf.inn2mod_scale = inn2mod_scale;
            to_sconf.areaScale = 1 / to_sconf.APP_MODEL_Y_RANGE
                                   / to_sconf.APP_MODEL_Y_RANGE;

            ///creates point A position in model
            to_sconf.A = [
                (a[0] - modorInPicX ) * inn2mod_scale,
                MONITOR_Y_FLIP *
                (a[1] - modorInPicY ) * inn2mod_scale
            ];

            //redundant ... v0 is enougth ... do fix later
            ///creates point B position in model
            to_sconf.B = [
                //1, 1 //insignificant
                to_sconf.A[0] + vmodel[0] * initialTimieStep,
                to_sconf.A[1] + vmodel[1] * initialTimieStep,
                //was
                //(b[0] - modorInPicX ) * inn2mod_scale,
                //MONITOR_Y_FLIP *
                //(b[1] - modorInPicY ) * inn2mod_scale
            ];
            to_sconf.v = [
                to_sconf.A[0] + vmodel[0],
                to_sconf.A[1] + vmodel[1],
                //was
                //(b[0] - modorInPicX ) * inn2mod_scale,
                //MONITOR_Y_FLIP *
                //(b[1] - modorInPicY ) * inn2mod_scale
            ];
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

        //this comes from theorem P2; this does not exist in P1;
        haff( ssF, 'init_conf_addon' );
    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();

