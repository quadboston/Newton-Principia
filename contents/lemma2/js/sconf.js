// //\\// App config

( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000





    function setModule()
    {
        ssF.init_conf = init_conf;
    }

    function init_conf()
    {
        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        var pictureWidth = 282;
        var pictureHeight = 290;
        var activeAreaOffsetX = 31.5;
        var activeAreaOffsetY = 29;
        //.set it from graph editor
        var pictureActiveArea = 259 - activeAreaOffsetY;
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

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------


            //todm ... this still makes?? a gap between svg and slider
            SLIDERS_LEGEND_HEIGHT : SLIDERS_LEGEND_HEIGHT,


            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            innerMediaHeight    : pictureHeight + SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,
            activeAreaOffsetY   : activeAreaOffsetY,
            pictureActiveArea   : pictureActiveArea,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------


            //:model
            baseMax         : 500,
            ctrlPtXYs_js    :
            [
                {x:activeAreaOffsetX,             y: activeAreaOffsetY},
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

            GENERIC_COLOR       : '0, 0, 0',
            CORE_CURVE_COLOR    : '160, 0, 0',
            CORE_AREA_COLOR     : '0,125,0',
            REMOTE_AREA_COLOR   : '0,0,255',
            FIGURE_COLOR        : '0,97,0'
        });

        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        /*
        sconf.tfamilyColor =
        {
            generic         : sconf.GENERIC_COLOR,
            claim           : sconf.CORE_AREA_COLOR,
            proof           : sconf.REMOTE_AREA_COLOR,
            'primary-curve' : sconf.CORE_CURVE_COLOR,
            'figure'        : sconf.FIGURE_COLOR
        };
        */
        //=====================================
        // \\// configures application engine
        //=====================================
    };


}) ();


