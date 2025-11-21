( function () {
    var { fconf, sconf, } =
	    window.b$l.apptree({ ssFExportList : { init_conf_common, }, });
    return;


    function init_conf_common(BASES_SLIDER_WIDTH_FACTOR)
    {
        //Settings common to L2/3/4 placed here to ensure they're always
        //updated together.

        //as of Ap/13 2023 sets data in preset-data.js

        //sconf.TP_OPACITY_FROM_fixed_colors = true;


        //----------------------------------
        //:app view parameters
        //----------------------------------
        var MONITOR_Y_FLIP = 0;
        var SLIDERS_LEGEND_HEIGHT = 0;

        sconf.default_tp_lightness = 30;
        sconf.mediaMoverPointDisabled = !false;
        sconf.skipGenDragList = !false; //false is for media mover,
        sconf.enableTools     = !true;
        
        
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
            ADD_BASES_SLIDER : true,
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
            MOVABLE_BASE_RADIUS : 2.5,
            CTRL_RADIUS     : 2.5,
            //Minimum distance between base handles
	        BASE_POINTS_REPELLING_DISTANCE : 10,

            //:d8d
            //DRAG_POINTS_THROTTLE_TIME : 0, //ms, softens drag8drop on performance-weak-devices
            DRAGGER_TOLERANCE : 5, //"rectangular-distance" to point to be detected

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
    };
}) ();