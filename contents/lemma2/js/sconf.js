( function () {
    var {
        nspaste,
        fconf, sconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            init_conf,
        },
    });
    return;








    function init_conf()
    {
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



        //=====================================
        // //\\ configures application engine
        //=====================================
        Object.assign( sconf,
        {
            dontRun_ExpandConfig : true,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------


            //todm ... this still makes?? a gap between svg and slider
            SLIDERS_LEGEND_HEIGHT : SLIDERS_LEGEND_HEIGHT,


            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            innerMediaHeight    : pictureHeight + SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,
            modorInPicY,
            pictureActiveArea   : pictureActiveArea,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------


            //:model
            baseMax         : 500,
            ctrlPtXYs_js    :
            [
                {x:modorInPicX,             y: modorInPicY},
                {x:85,          y: 51.5},
                {x:139,         y: 89.0},
                {x:193,         y: 148.5 },
                {x:248,         y: 259.5 }
            ],

            //.widths coinsided with dashed-rect ... set to empty array if not to match dashed rect
            //baseWidths_for_lemma3 : [41, 69, 53.5, 53.5],
            baseWidths_for_lemma3 : [],

            ////GUI
            svgns           : "http://www.w3.org/2000/svg",
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



        /*
        //see ///modern approach ... abandoned
        //=====================================
        // //\\ patch for quick slider creation
        //=====================================
        var originX_onPicture = modorInPicX;
        var originY_onPicture = modorInPicY + pictureActiveArea;
        var originalPoints =
        {
            baseSlider : { 
                pos         : [0,0.1],
                letterAngle : 90,
                draggableX  : true,
            },
        };
        var predefinedTopics =
        {
            baseSlider : [0,0,100],
        };

        var mod2inn_scale = 1; //todo

        nspaste( sconf, {
            predefinedTopics,
            originalPoints,
            //linesArray,
            //lines,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
            //default_tp_stroke_width : 12,
        });
        //=====================================
        // \\// patch for quick slider creation
        //=====================================
        */
    };


}) ();


