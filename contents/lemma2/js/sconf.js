( function () {
    var {
        nspaste,
        fapp, fconf, sconf,
        sapp,
    } = window.b$l.apptree({
        ssFExportList :
        {
            init_conf,
        },
    });
    return;








    function init_conf()
    {
        //as of Ap/13 2023 sets data in preset-data.js

        sconf.ITEM_OPACITY_INSTEAD_OF_OWN_SHAPE_in_low8high = true;

        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        var pictureWidth = 282;
        var pictureHeight = 290;
        var modorInPicX = 31.5;
        var modorInPicY = 29;
        //.set it from graph editor
        var pictureActiveArea = 259 - modorInPicY;
        //----------------------------------
        // \\// original material parameters
        //----------------------------------



        //----------------------------------
        //:app view parameters
        //----------------------------------
        var MONITOR_Y_FLIP = 0;
        var SLIDERS_LEGEND_HEIGHT = 0;

        sconf.default_tp_lightness = 30;
        sconf.ONLY_MONOTONIC_CURVE = true;
        var predT =
        {
            "given"                     : [0,    100,  0 ],
            "difference"                : [255, 255, 0, 0 ], //[185,  116, 85 ],
            "base"                      : [0,    100,  0 ],
            "wall"                      : [0,    100,  0 ],
            "curve"                     : [0,    100,  0 ],

            "figure"                    : [0,    100,  0 ],
            "figure-area"               : [0,    80,  0 ],
            "figure-area-txt"           : [0,    80,  0, 0.7, 1],

            "circumscribed-rectangles"  : [0,  50, 100, 0.4, 0.7],
            "inscribed-rectangles"      : [100,  0, 100, 0.4, 0.7],
            "widthest-rectangular"      : [0,  0, 100, 0.4, 0.7],
            "circ-txt"                  : [0,  50, 100, 0.7, 1],
            "insc-txt"                  : [100,  0, 100, 0.7, 1],
            "widt-txt"                  : [0,  0, 100, 0.7, 1],
        };

        //todm: this disables functionality ... not only CSS:
        fconf.appDecor.helpBox_opacity0             = true;
        fconf.appDecor.idleHelpButtonTooltip        = '';
        
        //to make legend nicely seen, the legend needs
        //own css independent of rectangulars:
        //then so, we can decreas opacities below for nicer diagram:

        //apparently goes right into color opacity
        //sconf.TOPIC_FILL_OPACITY_NOT_IN_FOCUS = 0.5;
        //sconf.TOPIC_FILL_OPACITY_IN_FOCUS = 1;
        
        //these are additional over high and low opacities in color itself:
        sconf.ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS = 0.8;
        sconf.ANCHOR_TOPIC__OPACITY_IN_FOCUS = 1;
        
        //no dice: sconf.default_tp_lightness = 0;

        //=====================================
        // //\\ configures application engine
        //=====================================
        Object.assign( sconf,
        {
            dontDoMathJax : true,
            skipGenDragList : true,
            //====================================================
            // //\\ subapp regim switches
            //====================================================
            enableStudylab  : false,
            enableTools     : false,
            //====================================================
            // \\// subapp regim switches
            //====================================================

            dontRun_ExpandConfig : false,
            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            //todm ... this still makes?? a gap between svg and slider
            SLIDERS_LEGEND_HEIGHT : SLIDERS_LEGEND_HEIGHT,
            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //:model
            BASE_MAX_NUM         : 500,
            DRAGGABLE_BASE_POINTS : 15,
            //user-adjustable points
            ctrlPtXYs_js    :
            [
                {x:modorInPicX,             y: modorInPicY},
                {x:85,          y: 51.5},
                {x:139,         y: 89.0},
                {x:193,         y: 148.5 },
                {x:248,         y: 259.5 }
            ],

            ////GUI
            FINEPTS_RADIUS  : 10,
            MOVABLE_BASE_RADIUS : 3,
            CTRL_RADIUS     : 3,
	        BASE_POINTS_REPELLING_DISTANCE : 5, //formerly PAD

            //:d8d
            //DRAG_POINTS_THROTTLE_TIME : 0, //ms, softens drag8drop on performance-weak-devices
            DRAGGEE_HALF_SIZE : 20, //"rectangular-distance" to point to be detected

            default_tp_stroke_width : 8,
            dragPointVisibilityToggling  : false, //show or hide drag points by mouse-enter
        });

        //=====================================
        // \\// configures application engine
        //=====================================



        //=====================================
        // //\\ patch for quick slider creation
        //      see //modern approach ... abandoned
        //=====================================
        var originalPoints =
        {
            B : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 3,
            },

            K : {
                pcolor      : predT.given,
                letterAngle : -145,
                letterRotRadius : 40,
                initialR    : 3,
            },

            L : {
                pcolor      : predT.given,
                letterAngle : -145,
                initialR    : 3,
            },

            M : {
                pcolor      : predT.given,
                letterAngle : -145,
                letterRotRadius : 40,
                initialR    : 3,
            },

            a : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 3,
            },

            A : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 3,
            },

            F : {
                pcolor      : predT[ "widthest-rectangular" ],
                letterAngle : 45,
                initialR    : 3,
            },

            f : {
                pcolor      : predT.given,
                letterAngle : 90,
                initialR    : 3,
            },

            C : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 3,
            },

            D : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 3,
            },

            E : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 3,
            },

            l : {
                pcolor      : predT.given,
                letterAngle : 135,
                initialR    : 3,
            },

            b : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 3,
            },

            //invizible point
            bk : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 30,
                undisplayAlways : true,
                doPaintPname : false,
            },


            c : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 3,
            },

            d : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 3,
            },

            m : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 3,
            },

            n : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 3,
            },

            o : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 3,
            },

            /*
            baseSlider : {
                pos         : [0,0.1],
                pcolor      : [255,0,0],
                letterAngle : 90,
                draggableX  : true,
            },
            */
        };

        //AB, BC, CD
        var linesArray =
        [
            { AB : {
                        pcolor : predT.given,
                   },
            },
            { BC : {
                        pcolor : predT.given,
                   },
            },
            { CD : {
                        pcolor : predT.given,
                   },
            },
            { Aa : {
                        pcolor : predT.given,
                   },
            },
            /*
            { AE : {
                        pcolor : predT.given,
                   },
            },
            { Kb : {
                        pcolor : predT.given,
                   },
            },
            */

            { "K,bk" : {
                        pcolor : predT.given,
                   },
            },

            { Bb : {
                        pcolor : predT.given,
                   },
            },
            { Cc : {
                        pcolor : predT.given,
                   },
            },
            { Dd : {
                        pcolor : predT.given,
                   },
            },
            { AF : {
                        pcolor : predT.given,
                   },
            },


        ];


        //rects predT.difference



        nspaste( sconf, {
            predefinedTopics : predT,
            originalPoints,
            linesArray,
            //lines,
            originX_onPicture : modorInPicX,
            originY_onPicture : modorInPicY + pictureActiveArea,
            pictureWidth,
            pictureHeight,
            mod2inn_scale : pictureActiveArea, //todo,
            //default_tp_stroke_width : 12,
            handleRadius : 55,
        });
        //=====================================
        // \\// patch for quick slider creation
        //=====================================

        //fapp.stdL2.setupL2data();
    };


}) ();


