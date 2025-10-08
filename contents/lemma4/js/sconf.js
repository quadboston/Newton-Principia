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
        xLeft  : 57,
        width  : 258,
        height : 282,
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
        xLeft  : 359,
        width  : 258,
        height : 252,
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


    function initDataReg({xLeft, width, height,
        basePtDraggersEnabled, pointLabels,
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
                positions : computeControlPointPositions(xLeft, width, height),
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

    
    function computeControlPointPositions(xLeft, width, height) {
        //Bottom of figure (same for all figures)
        const yBottom = 332;

        //Unscaled positions (used as a template)
        const positionsUnscaled = [
            //Top left
            {x: 0, y: 0},
            //Two middle handles
            {x: 102.7, y: 44.5},
            {x: 218.3, y: 147.0},
            //Bottom right
            {x: 265, y: 252},
        ];

        const pLast = positionsUnscaled[positionsUnscaled.length-1];
        const xScale = width / pLast.x;
        const yScale = height / pLast.y;

        //Offset and scale positions relative to bottom left
        return positionsUnscaled.map(p => {
            return {
                x: Math.round(p.x * xScale + xLeft),
                y: Math.round((p.y - pLast.y) * yScale + yBottom),
            };
        });
    }



    function init_conf()
    {
        //as of Ap/13 2023 sets data in preset-data.js

        //sconf.TP_OPACITY_FROM_fixed_colors = true;

        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        var pictureWidth = 676;
        var pictureHeight = 375;
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

        //Used to calculate slider width (left side of left figure, to right
        //side of right figure).
        const xSliderL = dr.ctrlPts.positions[0].x;
        const positionsR = dr2.ctrlPts.positions;
        const xSliderR = positionsR[positionsR.length - 1].x;
        const BASES_SLIDER_WIDTH_FACTOR = (xSliderR - xSliderL) / pictureWidth;



        //predefined-topic colors [R, G, B, Adefault, A-mouse-highlighted]
        const {
            given,
            difference,
            //TEMP
            // base,
            // curve,
            figure,
            widths,

            widestRectangular,
            widestRectangularHiddenStart,
        } = fixedColors;


        //TEMP Given that many of the above are the same "figure" color, it
        //would probably make more sense to only have the "figure" color above
        //and in the global color constants file.  Then set the others
        //(eg. base, curve) below to the "figure" color.  Since those are
        //shared with L2/3, it would probably be best make this change at the
        //same time as L2/3.
        const predT =
        {
            given,
            difference,
            figure,

            //For a line along the base of the figure...
            //-L2/3 uses it for the bottom of the figure, because line "AE"
            // doesn't extend the entire width when there are many bases.
            //-L4 uses it so parallelogram widths can be highlighted, and uses
            // line "AE" and "PT" for the bottom of the figure.
            "base" : fconf.sappId.indexOf('lemma4')===0 ? widths : figure,

            curve   : figure, //TEMP Probably only really needed for L2/3
            //The figure curves (so they can be highlighted separately)
            'acE'   : figure,
            'prT'   : figure,

            //For highlighting the data table
            'figuresRatio'  : figure,
            'parallelogramsRatio'   : fixedColors["inscribed-rectangles"],

            //Individual parallelograms (for highlighting)
            "inscribed-rectangle-AacE-1" : fixedColors["inscribed-rectangles"],
            "inscribed-rectangle-PprT-1" : fixedColors["inscribed-rectangles"],

            //For each figure so they can be highlighted separately
            "inscribed-rectangles-AacE" : fixedColors["inscribed-rectangles"],
            "inscribed-rectangles-PprT" : fixedColors["inscribed-rectangles"],



            //TEMP The following probably aren't needed for L4
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
            BASES_SLIDER_WIDTH_FACTOR,

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
            //Minimum distance between base handles
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

            //Keep curve handles from getting too close to right side of
            //figure.  This prevents issue where a "gap" appears on the right
            //figure, and it's area can't converge on the left figure area.
            //This occurs because the width of the second last rectangle on the
            //right figure gets very large.  It mainly occurs when the right
            //side of the curve on the right figure is very flat, and the right
            //side of the curve on the left figure is very vertical.
            HORIZONTAL_CONSTRAINT      : 25,

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

        var linesArray =
        [
            { AE : {
                        pcolor : predT.figure,
                   },
            },
            { Aa : {
                        pcolor : predT.figure,
                   },
            },

            { PT : {
                        pcolor : predT.figure,
                   },
            },
            { Pp : {
                        pcolor : predT.figure,
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
			mediaBgImage : "l4-diagram.png",
        });
        //=====================================
        // \\// patch for quick slider creation
        //=====================================

        //fapp.stdL2.setupL2data();
    };


}) ();


