( function () {
    var { sn, nspaste, fapp, fconf, sconf, sapp, fixedColors, } = 
	    window.b$l.apptree({ ssFExportList : { init_conf, }, });
    
    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var sdata       = sn('sdata', study );
    var dr          = sn('datareg', stdL2 );
    var appstate    = sn('appstate', stdL2 );

    //=====================================
    // //\\ presets data
    //=====================================
    Object.assign( dr,
    {
        basePts         : {offset:1, visOffset:0, list:[]},
        curvPts         : {offset:1, visOffset:0, list:[]},
        circRects       : {offset:0, visOffset:0, list:[]},
        InscrRects       : {offset:0, visOffset:0, list:[]},
        differenceRects  : {offset:0, visOffset:0, list:[]},
        
        //baseLabels      : {offset:1, visOffset:0, list:[]},
        curvLabels      : {offset:0, visOffset:0, list:[]},
        leftLabels      : {offset:0, visOffset:0, list:[]},
        //righLabels      : {offset:0, visOffset:0, list:[]},
        //deltaOnLeft historically means "virtual majoranta-rectangle"
        //is on the right
        figureParams    : {minX:0, maxX:0, deltaOnLeft:true},
        ctrlPts         : [],
        partitionWidths      : [1],
        basesN         : 4,
        movables        : {} //key-value for movable jswrap
    });
    appstate.movingBasePt = false;
    sdata.view = { isInscribed:1, isCircumscribed:1, isFigureChecked:1 };
    //=====================================
    // \\// presets data
    //=====================================    
    return;





    function init_conf()
    {
        //as of Ap/13 2023 sets data in preset-data.js

        //sconf.TP_OPACITY_FROM_fixed_colors = true;

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
        sconf.ONLY_MONOTONIC_CURVE = false;
        sconf.mediaMoverPointDisabled = !false;
        sconf.skipGenDragList = !false; //false is for media mover,
        sconf.enableTools     = !true;

        //predefined-topic colors [R, G, B, Adefault, A-mouse-highlighted]
        const {
            given,
            difference,
            base,
            curve,
            figure,

            widestRectangular,
            widestRectangularHiddenStart,
        } = fixedColors;


        const predT =
        {
            given,
            difference,
            base,
            curve,

            figure,
            "figure-area"               : fixedColors["figure-area"],
            "figure-area-txt"           : fixedColors["figure-area-txt"],

            "circumscribed-rectangles"  : fixedColors["circumscribed-rectangles"],
            "inscribed-rectangles"      : fixedColors["inscribed-rectangles"],

            "widest-rectangular"        : fconf.sappId.indexOf('lemma2')===0 ?
                                            widestRectangularHiddenStart :
                                            widestRectangular,

            "circ-txt"                  : fixedColors["circ-txt"],
            "insc-txt"                  : fixedColors["insc-txt"],
            "widt-txt"                  : fixedColors["widt-txt"],
            'a--K--b--l'                : difference,
            'b--L--c--m'                : difference,
            'c--M--d--n'                : difference,
            'd--e--p--o'                : difference,
        }
        
        
        //todm: this disables functionality ... not only CSS:
        fconf.appDecor.helpBox_opacity0             = true;
        fconf.appDecor.idleHelpButtonTooltip        = '';
        
        //to make legend nicely seen, the legend needs
        //own css independent of rectangulars:
        //then so, we can decreas opacities below for nicer diagram:

        //these are additional over high and low opacities in color itself:
        sconf.ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS = 0.8;
        sconf.ANCHOR_TOPIC__OPACITY_IN_FOCUS = 1;
        
        //no dice: sconf.default_tp_lightness = 0;

        //=====================================
        // //\\ configures application engine
        //=====================================
        Object.assign( sconf,
        {
            //====================================================
            // //\\ subapp regim switches
            //====================================================
            enableStudylab  : false,
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
                
                //four middle handles:
                {x: 74.8, y: 45.97726888798351},
                {x: 118.1, y: 72.70148453700233},
                {x: 161.4, y: 109.92474464283467},
                {x: 204.7, y: 166.52378909964816},
                
                //three middle handles
                //{x:85,          y: 51.5},
                //{x:139,         y: 89.0},
                //{x:193,         y: 148.5 },

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
            //rubbish: 
            //dragPointVisibilityToggling  : false, //show or hide drag points by mouse-enter
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
                initialR    : 1.6,
            },

            K : {
                pcolor      : predT.given,
                letterAngle : -145,
                letterRotRadius : 40,
                initialR    : 1.6,
            },

            L : {
                pcolor      : predT.given,
                letterAngle : -145,
                initialR    : 1.6,
            },

            M : {
                pcolor      : predT.given,
                letterAngle : -145,
                letterRotRadius : 40,
                initialR    : 1.6,
            },

            a : {
				caption: '𝑎',
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            A : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 1.6,
            },

            F : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            f : {
				caption: '𝑓',
                pcolor      : predT.given,
                letterAngle : 90,
                initialR    : 1.6,
            },

            C : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 1.6,
            },

            D : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 1.6,
            },

            E : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 1.6,
            },

            l : {
				caption: '𝑙',
                pcolor      : predT.given,
                letterAngle : 135,
                initialR    : 1.6,
            },

            b : {
				caption: '𝑏',
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            //invisible point
            c : {
				caption: '𝑐',
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            d : {
				caption: '𝑑',
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },
            m : {
				caption: '𝑚',
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            n : {
				caption: '𝑛',
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            o : {
				caption: '𝑜',
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            e : {
				caption: '𝑒',
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
                hideCaption  : true,
            },
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
            { AE : {
                        pcolor : predT.given,
                   },
            },
            { Aa : {
                        pcolor : predT.given,
                   },
            },

            { AK : {
                        pcolor : predT.given,
                   },
            },
            { LB : {
                        pcolor : predT.given,
                   },
            },
            { MC : {
                        pcolor : predT.given,
                   },
            },
            // //\\ top rect sides
            //lower
            { cL : {
                        pcolor : predT.given,
                   },
            },
            { dM : {
                        pcolor : predT.given,
                   },
            },
            //circ, right rect sides
            { lB : {
                        pcolor : predT.given,
                   },
            },
            { mC : {
                        pcolor : predT.given,
                   },
            },
            { nD : {
                        pcolor : predT.given,
                   },
            },
            { oE : {
                        pcolor : predT.given,
                   },
            },


            //upper
            { od : {
                        pcolor : predT.given,
                   },
            },
            { nc : {
                        pcolor : predT.given,
                   },
            },
            { mb : {
                        pcolor : predT.given,
                   },
            },
            { la : {
                        pcolor : predT.given,
                   },
            },
            // \\// top rect sides


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

            { Kb : {
                        pcolor : predT.given,
                        //undisplayAlways : true,
                        //undisplay : true,
                   },
            },

        ];

        nspaste( sconf, {
            predefinedTopics : predT,
            originalPoints,
            linesArray,
            //lines,
            originX_onPicture : modorInPicX,
            originY_onPicture : modorInPicY + pictureActiveArea,
            pictureWidth,
            pictureHeight,
            mod2inn_scale : 1, //was pictureActiveArea,
            //default_tp_stroke_width : 12,
            handleRadius : 55,
        });
        //=====================================
        // \\// patch for quick slider creation
        //=====================================

        //fapp.stdL2.setupL2data();
    };


}) ();


