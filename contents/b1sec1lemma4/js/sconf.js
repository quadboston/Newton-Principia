( function () {
    var { sn, nspaste, fapp, sconf, ssF, topicColors_repo, } = 
	    window.b$l.apptree({ ssFExportList : { init_conf, }, });
    
    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var sdata       = sn('sdata', study );
    var dataregs    = sn('dataregs', stdL2 );
    var appstate    = sn('appstate', stdL2 );

    //=====================================
    // //\\ presets data
    //=====================================
    appstate.movingBasePt = false;
    sdata.view = { isInscribed:1, isCircumscribed:0, isFigureChecked:1 };
    //=====================================
    // \\// presets data
    //=====================================    
    return;


    function init_conf()
    {
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
        // //\\ dataregs
        //----------------------------------
        //Left figure
        dataregs.drL = ssF.initDataReg({
            xLeft  : 57,
            width  : 258,
            height : 282,
            BASE_PT_DRAGGERS_ENABLED : true,
            POINT_LABELS      : {
                CTRL_PT_FIRST : 'a',
                CURVE_MIDDLE  : 'c',
                CTRL_PT_LAST  : 'E',
                BASE_PT_FIRST : 'A',
            },
            DRAGGABLE_END_POINTS : false,
            TRANSFORM_PT_I_ENABLED  : false,
            TRANSFORM_PT_J_ENABLED  : true,
        });

        //Right figure
        dataregs.drR = ssF.initDataReg({
            xLeft  : 359,
            width  : 258,
            height : 252,
            BASE_PT_DRAGGERS_ENABLED : false,
            POINT_LABELS      : {
                CTRL_PT_FIRST : 'p',
                CURVE_MIDDLE  : 'r',
                CTRL_PT_LAST  : 'T',
                BASE_PT_FIRST : 'P',
            },
            DRAGGABLE_END_POINTS : false,
            TRANSFORM_PT_I_ENABLED : true,
            TRANSFORM_PT_J_ENABLED : true,
            DR_ADJUST_WIDTHS_MATCH_AREA_RATIOS : dataregs.drL,
        });
        //----------------------------------
        // \\// dataregs
        //----------------------------------


        //Used to calculate slider width (left side of left figure, to right
        //side of right figure).
        const xSliderL = dataregs.drL.ctrlPts.untransformed[0].x;
        const ptsUntransformedR = dataregs.drR.ctrlPts.untransformed;
        const xSliderR = ptsUntransformedR[ptsUntransformedR.length - 1].x;
        const BASES_SLIDER_WIDTH_FACTOR = (xSliderR - xSliderL) / pictureWidth;


        //Common settings
        ssF.init_conf_common(BASES_SLIDER_WIDTH_FACTOR);

        //point sizes
        sconf.pointDecoration.r = 2; // solid points
				// (overwrites defaults from sconf-common.js)
        sconf.MOVABLE_BASE_RADIUS = 3.2; // movable base points
        sconf.CTRL_RADIUS = 3.2;	// curve control points


        //predefined-topic colors [R, G, B, Adefault, A-mouse-highlighted]
        const {
            given,
            figureColor,
            widths,
        } = topicColors_repo;


        const predT =
        {
            given,
            figureColor,

            //For a line along the base of the figure.  Used so parallelogram
            //widths can be highlighted, and uses line "AE" and "PT" for the
            //bottom of the figure.
            "base"  : widths,

            //The figure curves (so they can be highlighted separately)
            'acE'   : figureColor,
            'prT'   : figureColor,

            //For highlighting the data table
            'figuresRatio'  : figureColor,
            'parallelogramsRatio'   : topicColors_repo["inscribed-rectangles"],

            //Individual parallelograms (for highlighting)
            "inscribed-rectangle-AacE-1" : topicColors_repo["inscribed-rectangles"],
            "inscribed-rectangle-PprT-1" : topicColors_repo["inscribed-rectangles"],

            //For each figure so they can be highlighted separately
            "inscribed-rectangles-AacE" : topicColors_repo["inscribed-rectangles"],
            "inscribed-rectangles-PprT" : topicColors_repo["inscribed-rectangles"],
        }


        //=====================================
        // //\\ configures application engine
        //=====================================
        Object.assign( sconf,
        {
            //Curve handles can't pass sloped line offset from figure bottom.
            //This reduces "jumping" issues where algorithm that automatically
            //adjusts rectangle widths can jump between different possible
            //solutions.
            //Only works if DRAGGABLE_END_POINTS is disabled.
            SLOPE_CONSTRAINT_ANGLE_DEG : 12,
            SLOPE_CONSTRAINT_OFFSET    : 15,

            //Keep curve handles from getting too close to right side of
            //figure.  This prevents issue where a "gap" appears on the right
            //figure, and it's area can't converge on the left figure area.
            //This occurs because the width of the second last rectangle on the
            //right figure gets very large.  It mainly occurs when the right
            //side of the curve on the right figure is very flat, and the right
            //side of the curve on the left figure is very vertical.
            //Only works if DRAGGABLE_END_POINTS is disabled.
            HORIZONTAL_CONSTRAINT      : 25,

            //Hides the rectangles, lines etc. when non-monotonic
            HIDE_WHEN_NON_MONOTONIC : true,

            DRAGGER_TOLERANCE : 8,
        });
        //=====================================
        // \\// configures application engine
        //=====================================


        //=====================================
        // //\\ patch for quick slider creation
        //      see //modern approach ... abandoned
        //=====================================
        const labelFontSize = 22;
        var originalPoints =
        {
            a : {
				caption: '𝑎',
                pcolor      : predT.figureColor,
                letterAngle : 45,
                fontSize : labelFontSize
            },

            A : {
                pcolor      : predT.figureColor,
                letterAngle : -45,
                fontSize : labelFontSize
            },

            E : {
                pcolor      : predT.figureColor,
                letterAngle : -45,
                fontSize : labelFontSize
            },

            c : {
				caption: '𝑐',
                pcolor      : predT.figureColor,
                letterAngle : 45,
                fontSize : labelFontSize
            },


            p : {
				caption: '𝑝',
                pcolor      : predT.figureColor,
                letterAngle : 45,
                fontSize : labelFontSize
            },

            P : {
                pcolor      : predT.figureColor,
                letterAngle : -45,
                fontSize : labelFontSize
            },

            T : {
                pcolor      : predT.figureColor,
                letterAngle : -45,
                fontSize : labelFontSize
            },

            r : {
				caption: '𝑟',
                pcolor      : predT.figureColor,
                letterAngle : 45,
                fontSize : labelFontSize
            },
        };

        var linesArray =
        [
            { AE : {
                        pcolor : predT.figureColor,
                   },
            },
            { Aa : {
                        pcolor : predT.figureColor,
                   },
            },

            { PT : {
                        pcolor : predT.figureColor,
                   },
            },
            { Pp : {
                        pcolor : predT.figureColor,
                   },
            },
        ];

        nspaste( sconf, {
            topicColors_elected : predT,
            originalPoints,
            linesArray,
            //lines,
            originX_onPicture : modorInPicX,
            originY_onPicture : modorInPicY + pictureActiveArea,
            pictureWidth,
            pictureHeight,
            mod2inn_scale : 5, //was pictureActiveArea,
            //default_tp_stroke_width : 12,
            handleRadius : 155,
			mediaBgImage : "l4-diagram.png",
        });
        //=====================================
        // \\// patch for quick slider creation
        //=====================================

        //fapp.stdL2.setupL2data();
    };
}) ();
