( function () {
    var { sn, nspaste, fapp, fconf, sconf, sapp, fixedColors, } = 
	    window.b$l.apptree({ ssFExportList : { init_conf, }, });
    
    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var sdata       = sn('sdata', study );
    //TEMP Maybe it would be better to rename them datareg1, datareg2 or
    //dataregFigure1, dataregFigure2, or replace 1 and 2 with left and right
    //respectively.
    //Probably something more like L and R, perhaps it would be best to store
    //themp in an array?
    var dr          = sn('datareg', stdL2 );
    var dr2         = sn('datareg2', stdL2 );//TEMP
    var appstate    = sn('appstate', stdL2 );

    //=====================================
    // //\\ presets data
    //=====================================
    
    //TEMP
    //-L2 should probably set basePtDraggersEnabled to false rather than have
    //  a check such as "if( fconf.sappId.indexOf('lemma2') === 0 ) return;"
    //-Should some of the following be switched to all uppercase?


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
        transformPtIEnabled : false,
        transformPtJEnabled : true,
    }));

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
        transformPtIEnabled : true,
        transformPtJEnabled : true,
        drAdjustRectWidthsToMatchAreaRatios : dr,
    }));


    appstate.movingBasePt = false;
    sdata.view = { isInscribed:1, isCircumscribed:1, isFigureChecked:1 };
    //=====================================
    // \\// presets data
    //=====================================    
    return;


    //TEMP To override initial values for testing
    function initDataReg({xOffset = 0, pointLabels, basePtDraggersEnabled,
        transformPtIEnabled, transformPtJEnabled,
        drAdjustRectWidthsToMatchAreaRatios}) {
        return {
            basePts         : {offset:1, visOffset:0, list:[]},
            curvPts         : {offset:1, visOffset:0, list:[]},
            transPts        : {offset:1, visOffset:0, list:[]},
            circRects       : {offset:0, visOffset:0, list:[]},
            InscrRects      : {offset:0, visOffset:0, list:[]},
            differenceRects : {offset:0, visOffset:0, list:[]},
            
            //baseLabels      : {offset:1, visOffset:0, list:[]},
            curvLabels      : {offset:0, visOffset:0, list:[]},
            leftLabels      : {offset:0, visOffset:0, list:[]},
            //righLabels      : {offset:0, visOffset:0, list:[]},
            //deltaOnLeft historically means "virtual majoranta-rectangle"
            //is on the right
            figureParams    : {minX:0, maxX:0, deltaOnLeft:true},
            figureArea      : 0,
            curveMicroPts   : {points:[], sectionIndices:[]},
            ctrlPts         : {
                //Control point draggers with transformed positions.
                list:[],
                //Default positions which are never transformed but modified
                //as the control points are dragged.  Note the transforms use
                //the first and last points for their initialization.
                //
                //TEMP Should the naming be modified to specify un-transformed?
                //This would probably be best for clarity.
                positions : [
                    {x:31.5 + xOffset, y: 29},

                    //four middle handles:
                    // {x: 74.8  + xOffset, y: 45.97726888798351},
                    // {x: 118.1 + xOffset, y: 72.70148453700233},
                    // {x: 161.4 + xOffset, y: 109.92474464283467},
                    // {x: 204.7 + xOffset, y: 166.52378909964816},
                    
                    //three middle handles
                    // {x:85  + xOffset, y: 51.5},
                    // {x:139 + xOffset, y: 89.0},
                    // {x:193 + xOffset, y: 148.5},

                    //two middle handles
                    {x: 103.67 + xOffset, y: 62.65},
                    {x: 175.83 + xOffset, y: 126.01},

                    //one middle handle
                    // {x: 139.75 + xOffset, y: 89.44},

                    {x:248 + xOffset, y: 259.5 },
                ],
                //Are the first and last control points on the curve draggable
                draggableEndPoints : false,
                //TEMP Should something similar to the following be added?
                //Also it only works if draggableEndPoints is enabled.
                //slopeConstraintEnabled : true,
            },
            partitionWidths : [1],
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
                //TEMP Should a comment or similar be added to mention that
                //the following shouldn't be active at the same time as
                //draggableEndPoints?
                isPointIEnabled : transformPtIEnabled,
                isPointJEnabled : transformPtJEnabled,
                //Pos to transform relative to, automatically set
                origin          : null,
                pts             : {},//To store the draggers
            },
            //Automatically adjust rectangle widths in this datareg to match
            //the ratio of areas in the following datareg.
            drAdjustRectWidthsToMatchAreaRatios,
        }
    };



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
            basesN                : 4,
            BASE_MAX_NUM          : 500,
            DRAGGABLE_BASE_POINTS : 15,

            ////GUI
            FINEPTS_RADIUS  : 10,
            MOVABLE_BASE_RADIUS : 3,
            CTRL_RADIUS     : 3,
            //TEMP Maybe mention more about what this does and why it's a bit
            //larger?
	        BASE_POINTS_REPELLING_DISTANCE : 10,

            //:d8d
            //DRAG_POINTS_THROTTLE_TIME : 0, //ms, softens drag8drop on performance-weak-devices
            DRAGGEE_HALF_SIZE : 20, //"rectangular-distance" to point to be detected

            //Curve handles can't pass sloped line offset from figure bottom.
            //This reduces "jumping" issues where algorithm that automatically
            //adjusts rectangle widths can jump between different possible
            //solutions.
            SLOPE_CONSTRAINT_ANGLE_DEG : 12,
            SLOPE_CONSTRAINT_OFFSET    : 15,

            //Approximate number of line segments used to generate the curve.
            //The actual number used can vary slightly (by a few).
            CURVE_SEGMENTS_APPROXIMATE : 500,

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

            // //TEMP For testing to see if other dragging code can be used
            // S : {
            //     pos: [20, 20],
            //     pcolor : given,
            //     letterAngle : -90,
            //     draggableX  : true,
            //     draggableY  : true,
            //     initialR    : 5,
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
            { Aa : {
                        pcolor : predT.figure,
                   },
            },
            { Pp : {
                        pcolor : predT.figure,
                   },
            },

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
			mediaBgImage : "l4-diagram.png",
        });
        //=====================================
        // \\// patch for quick slider creation
        //=====================================

        //fapp.stdL2.setupL2data();
    };


}) ();


