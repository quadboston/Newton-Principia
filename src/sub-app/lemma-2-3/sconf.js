// //\\// App config

( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var sapp        = sn('sapp');

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);

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
        var pictureWidth = 268;//276;//282;
        var pictureHeight = 270;//290;
        var activeAreaOffsetX = 23;//31.5;
        var activeAreaOffsetY = 35;//182;//29;
        //.set it from graph editor
        var pictureActiveArea = 259 - activeAreaOffsetY;//259 - activeAreaOffsetY;
        //----------------------------------
        // \\// original material parameters
        //----------------------------------



        //----------------------------------
        //:app view parameters
        //----------------------------------
        var MONITOR_Y_FLIP = 0;




        //=====================================
        // //\\ configures application engine
        //=====================================
        Object.assign( sconf,
        {

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            innerMediaHeight    : pictureHeight,
            innerMediaWidth     : pictureWidth,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------


            //:model
            baseMax         : 500,
            ctrlPtXYs_js    :
            [
                {x:activeAreaOffsetX,             y: activeAreaOffsetY},
                {x:activeAreaOffsetX - 31.5 + 85,          y: activeAreaOffsetY - 29 + 51.5},
                {x:activeAreaOffsetX - 31.5 + 139,         y: activeAreaOffsetY - 29 + 89.0},
                {x:activeAreaOffsetX - 31.5 + 193,         y: activeAreaOffsetY - 29 + 148.5 },
                {x:activeAreaOffsetX - 31.5 + 248,         y: activeAreaOffsetY - 29 + 259.5 }
            ],

            //.widths coinsided with dashed-rect ... set to empty array if not to match dashed rect
            //baseWidths_for_lemma3 : [41, 69, 53.5, 53.5],
            baseWidths_for_lemma3 : [],

            ////GUI
            svgns           : "http://www.w3.org/2000/svg",
            FINEPTS_RADIUS  : 20,
            MOVABLE_BASE_RADIUS : 4,
            CTRL_RADIUS     : 5,
	        BASE_POINTS_REPELLING_DISTANCE : 5, //formerly PAD

            //:d8d
            DRAG_POINTS_THROTTLE_TIME : 0, // 3 //300 //ms, softens drag8drop on performance-weak-devices
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
        sconf.tfamilyColor =
        {
            generic         : sconf.GENERIC_COLOR,
            claim           : sconf.CORE_AREA_COLOR,
            proof           : sconf.REMOTE_AREA_COLOR,
            'primary-curve' : sconf.CORE_CURVE_COLOR,
            'figure'        : sconf.FIGURE_COLOR
        };
        //=====================================
        // \\// configures application engine
        //=====================================
    };


}) ();


