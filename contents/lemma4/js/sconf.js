( function () {
    var { sn, nspaste, fapp, fconf, sconf, sapp, fixedColors, } = 
	    window.b$l.apptree({ ssFExportList : { init_conf, }, });
    
    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var sdata       = sn('sdata', study );
    //TEMP Maybe it would be better to rename them datareg1, datareg2 or
    //dataregFigure1, dataregFigure2, or replace 1 and 2 with left and right
    //respectively.
    var dr          = sn('datareg', stdL2 );
    var dr2         = sn('datareg2', stdL2 );//TEMP
    var appstate    = sn('appstate', stdL2 );

    //=====================================
    // //\\ presets data
    //=====================================
    
    //TEMP
    //-L2 should probably set basePtDraggersEnabled to false rather than bave
    //  a check such as "if( fconf.sappId.indexOf('lemma2') === 0 ) return;"
    //-Should some of the following be switched to all uppercase?


    //TEMP To set the number of handles
    const handleOptionsTemp = [
        [
            //one middle handle
            {x: 439.75, y: 89.44},
        ],
        [
            //two middle handles
            {x: 403.67, y: 62.65},
            {x: 475.83, y: 126.01},
        ],
        [
            //three middle handles
            {x:85 + 300,    y: 51.5},
            {x:139 + 300,   y: 89.0},
            {x:193 + 300,   y: 148.5 },
        ],
        [
            //four middle handles:
            {x: 74.8 + 300,  y: 45.97726888798351},
            {x: 118.1 + 300, y: 72.70148453700233},
            {x: 161.4 + 300, y: 109.92474464283467},
            {x: 204.7 + 300, y: 166.52378909964816},
        ],
    ];
    const countHandlesStored = sessionStorage.getItem("count-handles");
    console.log("countHandlesStored =", countHandlesStored);
    const countHandles = sessionStorage.getItem("count-handles") || 1;



    //Right figure
    Object.assign(dr2, initDataReg({
        xOffset : 300,
        basePtDraggersEnabled : false,
        pointLabels     : {
            ctrlPtFirst : 'p',
            curveMiddle : 'r',
            ctrlPtLast  : 'T',
            basePtFirst : 'P',
        },
        transformVerticalPtEnabled : true,
        transformHorizontalPtEnabled : true,
        ctrlPtPositionsTemp : [
            {x:31.5 + 300, y: 29},
            
            //four middle handles:
            // {x: 74.8 + 300, y: 45.97726888798351},
            // {x: 118.1 + 300, y: 72.70148453700233},
            // {x: 161.4 + 300, y: 109.92474464283467},
            // {x: 204.7 + 300, y: 166.52378909964816},
            
            //three middle handles
            // {x:85 + 300,          y: 51.5},
            // {x:139 + 300,         y: 89.0},
            // {x:193 + 300,         y: 148.5 },

            //two middle handles
            // {x: 403.67, y: 62.65},
            // {x: 475.83, y: 126.01},

            //one middle handle
            // {x: 439.75, y: 89.44},
            ...handleOptionsTemp[countHandles - 1],

            {x:248 + 300, y: 259.5 },
        ],
        partitionWidthsTemp : [1],
    }));

    //TEMP Positions copy
    const ctrlPtPositionsTempCopy = dr2.ctrlPts.positions.map(pos => {
        const {x, y} = pos;
        return {x: x-300, y };
    });


    //Left figure
    Object.assign(dr, initDataReg({
        xOffset : 0,
        basePtDraggersEnabled : true,
        pointLabels     : {
            ctrlPtFirst : 'a',
            curveMiddle : 'c',
            ctrlPtLast  : 'E',
            basePtFirst : 'A',
        },
        transformHorizontalPtEnabled : false,
        transformVerticalPtEnabled : true,
        drAdjustRectWidthsToMatchAreaRatios : dr2,
        // ctrlPtPositionsTemp : [
        //     {x:31.5, y:29},
        //     {x:94.37763941129889, y:55.29995432193536},
        //     {x:159.1198159093881, y:73.63375308039753},
        //     {x:202.41981590938815, y:108.0602075560443},
        //     {x:226.14217649808924, y:162.79471492606743},
        //     {x:248, y:259.5},
        // ],
        // // ctrlPtPositionsTemp : [
        // //     {x:31.5, y:29},
        // //     {x:100.90301839324853, y:238.1442580872202},
        // //     {x:40.638476153274155, y:95.00715884675765},
        // //     {x:190.3956064125703, y:251.73649751576627},
        // //     {x:236.24848199449696, y:257.8532306681781},
        // //     {x:248, y:259.5},
        // // ],
        ctrlPtPositionsTemp : ctrlPtPositionsTempCopy,
        // // ctrlPtPositionsTemp : [
        // //     {x:331.5-300, y:29},
        // //     {x:398.83785088521734-300, y:242.27459310328263},
        // //     {x:339.9500869839304-300, y:96.38393718544512},
        // //     {x:479.38137970307054-300, y:252.42488668511},
        // //     {x:536.248481994497-300, y:257.8532306681781},
        // //     {x:548-300, y:259.5},
        // // ],
        // partitionWidthsTemp : [
        //     9.130335016062418,
        //     82.44008961791046,
        //     119.92957536602712,
        //     5.000000000000003,
        // ],
        partitionWidthsTemp : [
            5,
            109.25055313328448,
            97.24944686671552,
            5,
        ],

        // ctrlPtPositionsTemp : [
        //     {x:31.5, y:29},
        //     {x:94.37763941129889, y:55.29995432193536},
        //     {x:159.1198159093881, y:73.63375308039753},
        //     {x:202.41981590938815, y:108.0602075560443},
        //     {x:226.14217649808924, y:162.79471492606743},
        //     {x:248, y:259.5},
        // ],
        // partitionWidthsTemp : [
        //     0.8965138710777648,
        //     0.8965160581642239,
        //     0.8967860809709538,
        //     0.8973046728305017,
        //     137.2215088188454461,
        //     58.8092180652194769,
        //     16.882152432891623,
        // ],

        // partitionWidthsTemp : [
        //     26.267228711595514,
        //     24.402691624805136,
        //     36.52218268894255,
        //     19.74134890782919,
        //     62.42111735885439,
        //     16.216859279401774,
        //     30.928571428571438,
        // ],
    }));


    //TEMP Current best draft 2025.08.06
    // //Right figure
    // Object.assign(dr2, initDataReg({
    //     xOffset : 300,
    //     basePtDraggersEnabled : false,
    //     pointLabels     : {
    //         ctrlPtFirst : 'p',
    //         curveMiddle : 'r',
    //         ctrlPtLast  : 'T',
    //         basePtFirst : 'P',
    //     },
    //     transformVerticalPtEnabled : true,
    //     transformHorizontalPtEnabled : true,
    // }));

    // //Left figure
    // Object.assign(dr, initDataReg({
    //     xOffset : 0,
    //     basePtDraggersEnabled : true,
    //     pointLabels     : {
    //         ctrlPtFirst : 'a',
    //         curveMiddle : 'c',
    //         ctrlPtLast  : 'E',
    //         basePtFirst : 'A',
    //     },
    //     transformHorizontalPtEnabled : false,
    //     transformVerticalPtEnabled : true,
    //     drAdjustRectWidthsToMatchAreaRatios : dr2,
    // }));

    appstate.movingBasePt = false;
    sdata.view = { isInscribed:1, isCircumscribed:1, isFigureChecked:1 };
    //=====================================
    // \\// presets data
    //=====================================    
    return;


    //TEMP To override initial values for testing
    function initDataReg({xOffset, pointLabels, basePtDraggersEnabled, 
        transformHorizontalPtEnabled, transformVerticalPtEnabled,
        drAdjustRectWidthsToMatchAreaRatios, ctrlPtPositionsTemp,
        partitionWidthsTemp}) {
        return {
            basePts         : {offset:1, visOffset:0, list:[]},
            curvPts         : {offset:1, visOffset:0, list:[]},
            transPts        : {offset:1, visOffset:0, list:[]},
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
            ctrlPts         : {
                //Control point draggers with transformed positions.
                list:[],
                //Default positions which are never transformed but modified
                //as the control points are dragged.  Note the transforms use
                //the first and last points to initialize the vertical and
                //horizontal handles respectively, and the origin.
                positions   : ctrlPtPositionsTemp,
                // positions : [
                //     {x:31.5 + (xOffset || 0), y: 29},
                    
                //     //four middle handles:
                //     {x: 74.8 + (xOffset || 0), y: 45.97726888798351},
                //     {x: 118.1 + (xOffset || 0), y: 72.70148453700233},
                //     {x: 161.4 + (xOffset || 0), y: 109.92474464283467},
                //     {x: 204.7 + (xOffset || 0), y: 166.52378909964816},
                    
                //     //three middle handles
                //     //{x:85,          y: 51.5},
                //     //{x:139,         y: 89.0},
                //     //{x:193,         y: 148.5 },

                //     {x:248 + (xOffset || 0), y: 259.5 },
                // ],
                //Should draggers be constrained between initial min and max
                constraints : {
                    xEnabled: true, 
                    minX    : null,//Automatically set
                    maxX    : null,//Automatically set
                },
                //Are the first and last control points on the curve draggable
                draggableEndPoints : false,
            },
            partitionWidths      : partitionWidthsTemp,//[1],
            movables        : {}, //key-value for movable jswrap
            //Specifies what points have what labels
            pointLabels     : {
                ctrlPtFirst : '',
                curveMiddle : '',
                ctrlPtLast  : '',
                basePtFirst : '',
                ...pointLabels,
            },
            basePtDraggersEnabled,
            transforms       : {
                horizontalPtEnabled : transformHorizontalPtEnabled,
                verticalPtEnabled   : transformVerticalPtEnabled,
                //Pos to transform relative to, automatically set
                origin              : null,
                pts                 : {},//To store the draggers
            },
            //Automatically adjust rectangle widths in the following datareg to
            //match the ratio of areas in this datareg.
            //See "calculateRectWidthsToMatchAreaRatios" function in
            //"model-aux.js" for more.
            drAdjustRectWidthsToMatchAreaRatios,
        }
    };

    //TEMP Current best draft 2025.08.06
    // function initDataReg({xOffset, pointLabels, basePtDraggersEnabled, 
    //     transformHorizontalPtEnabled, transformVerticalPtEnabled,
    //     drAdjustRectWidthsToMatchAreaRatios}) {
    //     return {
    //         basePts         : {offset:1, visOffset:0, list:[]},
    //         curvPts         : {offset:1, visOffset:0, list:[]},
    //         transPts        : {offset:1, visOffset:0, list:[]},
    //         circRects       : {offset:0, visOffset:0, list:[]},
    //         InscrRects       : {offset:0, visOffset:0, list:[]},
    //         differenceRects  : {offset:0, visOffset:0, list:[]},
            
    //         //baseLabels      : {offset:1, visOffset:0, list:[]},
    //         curvLabels      : {offset:0, visOffset:0, list:[]},
    //         leftLabels      : {offset:0, visOffset:0, list:[]},
    //         //righLabels      : {offset:0, visOffset:0, list:[]},
    //         //deltaOnLeft historically means "virtual majoranta-rectangle"
    //         //is on the right
    //         figureParams    : {minX:0, maxX:0, deltaOnLeft:true},
    //         ctrlPts         : {
    //             //Control point draggers with transformed positions.
    //             list:[],
    //             //Default positions which are never transformed but modified
    //             //as the control points are dragged.  Note the transforms use
    //             //the first and last points to initialize the vertical and
    //             //horizontal handles respectively, and the origin.
    //             positions : [
    //                 {x:31.5 + (xOffset || 0), y: 29},
                    
    //                 //four middle handles:
    //                 {x: 74.8 + (xOffset || 0), y: 45.97726888798351},
    //                 {x: 118.1 + (xOffset || 0), y: 72.70148453700233},
    //                 {x: 161.4 + (xOffset || 0), y: 109.92474464283467},
    //                 {x: 204.7 + (xOffset || 0), y: 166.52378909964816},
                    
    //                 //three middle handles
    //                 //{x:85,          y: 51.5},
    //                 //{x:139,         y: 89.0},
    //                 //{x:193,         y: 148.5 },

    //                 {x:248 + (xOffset || 0), y: 259.5 },
    //             ],
    //             //Should draggers be constrained between initial min and max
    //             constraints : {
    //                 xEnabled: true, 
    //                 minX    : null,//Automatically set
    //                 maxX    : null,//Automatically set
    //             },
    //             //Are the first and last control points on the curve draggable
    //             draggableEndPoints : false,
    //         },
    //         partitionWidths      : [1],
    //         movables        : {}, //key-value for movable jswrap
    //         //Specifies what points have what labels
    //         pointLabels     : {
    //             ctrlPtFirst : '',
    //             curveMiddle : '',
    //             ctrlPtLast  : '',
    //             basePtFirst : '',
    //             ...pointLabels,
    //         },
    //         basePtDraggersEnabled,
    //         transforms       : {
    //             horizontalPtEnabled : transformHorizontalPtEnabled,
    //             verticalPtEnabled   : transformVerticalPtEnabled,
    //             //Pos to transform relative to, automatically set
    //             origin              : null,
    //             pts                 : {},//To store the draggers
    //         },
    //         //TEMP Fill in function name and folder
    //         //Automatically adjust widths of rects in the following datareg to
    //         //match the ratio of areas on this datareg.  See "" function in
    //         //"model-aux.js" for more.
    //         drAdjustRectWidthsToMatchAreaRatios,
    //     }
    // };



    function init_conf()
    {
        //as of Ap/13 2023 sets data in preset-data.js

        //sconf.TP_OPACITY_FROM_fixed_colors = true;

        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        var pictureWidth = 699; //282;
        var pictureHeight = 375;//290;
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

            "widest-rectangular"        : fconf.sappId.indexOf('lemma4')===0 ?
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
            dontDoMathJax : false, //true,
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
            basesN                : 4,//7,//4, TEMP
            BASE_MAX_NUM          : 500,
            DRAGGABLE_BASE_POINTS : 15,//4,//15,

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
            // B : {
            //     pcolor      : predT.given,
            //     letterAngle : -45,
            //     initialR    : 1.6,
            // },

            // K : {
            //     pcolor      : predT.given,
            //     letterAngle : -145,
            //     letterRotRadius : 40,
            //     initialR    : 1.6,
            // },

            // L : {
            //     pcolor      : predT.given,
            //     letterAngle : -145,
            //     initialR    : 1.6,
            // },

            // M : {
            //     pcolor      : predT.given,
            //     letterAngle : -145,
            //     letterRotRadius : 40,
            //     initialR    : 1.6,
            // },

            a : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            A : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 1.6,
            },

            E : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 1.6,
            },

            c : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },



            p : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            P : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 1.6,
            },

            T : {
                pcolor      : predT.given,
                letterAngle : -45,
                initialR    : 1.6,
            },

            r : {
                pcolor      : predT.given,
                letterAngle : 45,
                initialR    : 1.6,
            },

            // F : {
            //     pcolor      : predT.given,
            //     letterAngle : 45,
            //     initialR    : 1.6,
            // },

            // f : {
            //     pcolor      : predT.given,
            //     letterAngle : 90,
            //     initialR    : 1.6,
            // },

            // C : {
            //     pcolor      : predT.given,
            //     letterAngle : -45,
            //     initialR    : 1.6,
            // },

            // D : {
            //     pcolor      : predT.given,
            //     letterAngle : -45,
            //     initialR    : 1.6,
            // },

            // l : {
            //     pcolor      : predT.given,
            //     letterAngle : 135,
            //     initialR    : 1.6,
            // },

            // b : {
            //     pcolor      : predT.given,
            //     letterAngle : 45,
            //     initialR    : 1.6,
            // },

            // d : {
            //     pcolor      : predT.given,
            //     letterAngle : 45,
            //     initialR    : 1.6,
            // },
            // m : {
            //     pcolor      : predT.given,
            //     letterAngle : 45,
            //     initialR    : 1.6,
            // },

            // n : {
            //     pcolor      : predT.given,
            //     letterAngle : 45,
            //     initialR    : 1.6,
            // },

            // o : {
            //     pcolor      : predT.given,
            //     letterAngle : 45,
            //     initialR    : 1.6,
            // },

            // e : {
            //     pcolor      : predT.given,
            //     letterAngle : 45,
            //     initialR    : 1.6,
            //     hideCaption  : true,
            // },
        };

        //AB, BC, CD
        var linesArray =
        [
            // { AB : {
            //             pcolor : predT.given,
            //        },
            // },
            // { BC : {
            //             pcolor : predT.given,
            //        },
            // },
            // { CD : {
            //             pcolor : predT.given,
            //        },
            // },
            // { AE : {
            //             pcolor : predT.given,
            //        },
            // },
            // { Aa : {
            //             pcolor : predT.given,
            //        },
            // },

            // { AK : {
            //             pcolor : predT.given,
            //        },
            // },
            // { LB : {
            //             pcolor : predT.given,
            //        },
            // },
            // { MC : {
            //             pcolor : predT.given,
            //        },
            // },
            // // //\\ top rect sides
            // //lower
            // { cL : {
            //             pcolor : predT.given,
            //        },
            // },
            // { dM : {
            //             pcolor : predT.given,
            //        },
            // },
            // //circ, right rect sides
            // // { lB : {
            // //             pcolor : predT.given,
            // //        },
            // // },
            // // { mC : {
            // //             pcolor : predT.given,
            // //        },
            // // },
            // // { nD : {
            // //             pcolor : predT.given,
            // //        },
            // // },
            // // { oE : {
            // //             pcolor : predT.given,
            // //        },
            // // },


            // //upper
            // // { od : {
            // //             pcolor : predT.given,
            // //        },
            // // },
            // // { nc : {
            // //             pcolor : predT.given,
            // //        },
            // // },
            // // { mb : {
            // //             pcolor : predT.given,
            // //        },
            // // },
            // // { la : {
            // //             pcolor : predT.given,
            // //        },
            // // },
            // // \\// top rect sides


            // { Bb : {
            //             pcolor : predT.given,
            //        },
            // },
            // { Cc : {
            //             pcolor : predT.given,
            //        },
            // },
            // { Dd : {
            //             pcolor : predT.given,
            //        },
            // },
            // { AF : {
            //             pcolor : predT.given,
            //        },
            // },

            // { Kb : {
            //             pcolor : predT.given,
            //             //undisplayAlways : true,
            //             //undisplay : true,
            //        },
            // },

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


