( function() {
    var { //import from apptree
        sn, haz,
        fconf, fapp,
        sconf,
    } = window.b$l.apptree({ //export to apptree
        ssFExportList : { init_conf }
    });
    return;







    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        sconf.default_tp_lightness = 30; //todm no effect

        //--------------------------------------
        // //\\ original-book picture parameters
        //--------------------------------------
        var pictureWidth = 1340;
        var pictureHeight = 864;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = haz( sconf, 'controlsScale' ) ||
                            ( realSvgSize / sconf.standardSvgSize );

        var modorInPicX = 98.0;
        var modorInPicY = 474;


        var basePairs =
        [
            [
                { H : [modorInPicX, modorInPicY] }, //abscissa
                { A : [0, 159] },                               //ordinate
            ],
            [
                { I : [329, modorInPicY] },
                { B : [0, 96] },
            ],
            [
                { K : [563, modorInPicY] },
                //C : [561, 157],
                { C : [0, 157] },
            ],
            [
                { L : [781, modorInPicY] },
                //D : [783, 345],
                { D : [0, 345] },
            ],
            [
                { M : [1005, modorInPicY] },
                //E : [1008, 588],
                { E : [0, 588] },
            ],
            [
                { N : [1236, modorInPicY] },
                //F : [1239, 774],
                { F : [0, 774] },
            ],


            ///the last one is an approximatee
            [
                { S : [485, modorInPicY] },
                { R : [0, 119] },
            ],
        ];
        basePairs.forEach( pair => {

            var x = pair[0];
            pair[0].pname = Object.keys( x )[0];
            pair[0].picturepos = x[ pair[0].pname ];       //makes in synch with pos

            var y = pair[1];
            pair[1].pname = Object.keys( y )[0];
            pair[1].picturepos = y[ pair[1].pname ];       //makes in synch with pos
            pair[1].picturepos[0] = pair[0].picturepos[0]; // = abscissa
        });
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
        var mod2inn_scale = basePairs[1][0].picturepos[0] - basePairs[0][0].picturepos[0];
        var inn2mod_scale = 1/mod2inn_scale;

        var pname2point = {};
        //var initialModPoints;
        var factor = MONITOR_Y_FLIP * inn2mod_scale;
        (function() {
            basePairs.forEach( bpair => {
                bpair.forEach( point => {
                    var pp = point.picturepos;
                    var pname = point.pname;
                    var pos = [ pp[0] - modorInPicX, pp[1] - modorInPicY ];
                    point.pos = [ pos[0]*inn2mod_scale, pos[1]*factor ];
                    pname2point[pname] = point;
                });
            });
        })();



        //adds model's origin
        pname2point.O = { pos:[0,0], pname : 'O' };
        //---------------------------------------------------------------------------
        // \\// derives initial model parameters from picture's points
        //---------------------------------------------------------------------------




        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        fapp.normalizeSliders( pictureHeight / 444 ); //todo not automated, prolifer.
        Object.assign( sconf, {
            mediaBgImage : "diagram.png",
            dontRun_ExpandConfig : true,

            MONITOR_Y_FLIP : MONITOR_Y_FLIP,
            //SLIDERS_LEGEND_HEIGHT,
            //SLIDERS_OFFSET_Y : -70,

            pname2point : pname2point,
            basePairs : basePairs,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            modorInPicX,
            modorInPicY,

            originX_onPicture   : modorInPicX,
            originY_onPicture   : modorInPicY,



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
            hideProofSlider : true, //false,
            enableCapture : true,
            enableTools : true,
            enableDataFunctionsRepository : true,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            default_tp_stroke_opacity : 2,
            //default_tp_lightness : 40, //50 is full lightness

            default_tp_stroke_width : Math.floor( 10 * controlsScale ),
            defaultLineWidth : Math.floor( 2 * controlsScale ),
            handleRadius : Math.floor( 8 * controlsScale ),

            mod2inn_scale : mod2inn_scale,
            inn2mod_scale : inn2mod_scale,
            mod2inn_scale_initial : mod2inn_scale,
            inn2mod_scale_initial : inn2mod_scale,
        });
        sconf.pointDecoration.r = sconf.handleRadius;
        //----------------------------------
        // \\// prepares sconf data holder
        //----------------------------------------------------
    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();

