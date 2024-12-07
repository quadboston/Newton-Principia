// //\\// site-wide conf
( function() {
    var {
        ns, url2conf,userOptions,
        fconf,
    } = window.b$l.apptree({
    });

    //fconf.basicSiteFeatures = true;
    url2conf( fconf );

    //apparently, we can do '.' because "contents" is moved levels up
    //when move-to-prod-folder.php builds production package folders,
    //will be it better to explicitly set './'?
    fconf.pathToContentSite     = '.';

    fconf.pathToContentSiteImg  = 'contents/img';
    fconf.engineImg             = 'engine-img';
    fconf.pathToContents        = fconf.pathToContentSite + '/contents';

    //----------------------------------------------------
    // //\\ sets width fractions for text and sim-scene
    //----------------------------------------------------
    //prevents text box srtring from being too wide,
    //otherwise, hard to move eye from string to string,
    fconf.MAX_ESS_WIDTH = 600;
    //should be this:
    //var ESS_MIN_WIDTH           = 370;
    //var MODEL_MIN_WIDTH         = 300; //when dragging
    //var RIGHT_WORKAREA_MARGIN   = 0.015; //fraction
    //----------------------------------------------------
    // \\// sets width fractions for text and sim-scene
    //----------------------------------------------------
    
    //====================================================
    // //\\ put configuration parameters here
    //====================================================
    to_fconf =
    {
        hideSingleItemContentMenus : true,
        SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM : false,

        timeToShowOriginalDiagram  : 3600000, //ms

        //we adopt strategy when svg x-scale is unchanged and set as
        //sconf.mod2inn_scale, but y-scale can have additional factor,
        //mod2inn_scaleY, to be overriden in lemma's conf.js
        //but only for lemmas where dontRun_ExpandConfig is not true
        mod2inn_scaleY              : 1,

        doDisplayPageTopNavigatMenu : true,
        lemmaHasHomeButton          : true,
        homeButtonName              : 'Contents',
        theorionTab_nonClickable    : false,

        //:data
        svgNS : ns.svgNS,


        //--------------------
        // //\\ page-wide
        //--------------------
        // //\\ view
        //--------------------


        ESSAY_FRACTION_IN_WORKPANE : 0.5, //0.33,  //default
        //ESSAY_FRACTION_IN_WORKPANE : 0.9, //for preliminaries

        //.below this value, JS considers the device as a mobile
        MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD : 800,
        MOBILE_MEDIA_QUERY_HEIGHT_THRESHOLD : 800,

        model_float_dir : 'right', //vs left
        ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML : true,
        attach_menu_to_essaion_root : true,

        LEFT_SIDE_MENU_WIDTH : 40, //px
        LEFT_SIDE_MENU_OFFSET_X : 20, //px
        LEFT_SIDE_MENU_ITEM_LENGTH : 100, //px

        DRAG_POINTS_THROTTLE_TIME : 50, //ms
        DRAGGEE_HALF_SIZE : 40, //px

        //setting this to "false" does hide slider
        //decoration spinning arrows
        NAVIGATION_DECORATIONS_ALWAYS_VISIBLE : false,

        //since ver 1931 was automated from contents
        //as of ver 2955 is created automatically in content2exegs.js
        //dragPointDecoratorClasses : [],
        //[ 'aspect--video', 'aspect--english', 'aspect--xixcentury' ],


        LETTER_FONT_SIZE_PER_1000 : 32,
        //--------------------
        // \\// view
        //--------------------

        //developer's proposals
        //these constants are used for development planning: they are not needed for application
        //approvalGranted: {},
        //fconf.approvalGranted[ 'area-fragments-manager-to-link-with-app' ] = true;

        ///abandoned code
        ///this should be moved into lab/tools/sliders
        ///this "if" always set to "false" as of Dec, 2020.
        // //if( fconf.ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED ) {
        // //    sDomF.create_original_picture_vis_slider();
        // //}
        ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED : false,

        ORIGINAL_FIGURE_VISIBILITY : 0.6,
        ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS : 3000,
        //--------------------
        // \\// page-wide
        //--------------------

        rgShapesVisible : true, //initial visibility of rg elements with pname
                                //when subessay relaunches





        //app decorations
        appDecor :
        {
            backButtonCaption       : 'Back to the Lemmas',
            landingImage            : 'landing-img.jpg',
            homePageCaption         : 'Newton’s <span>Principia</span><br>' +
                                      'Interactive Models',
            homePageSubCaption      : 'The logic in Newton’s <span>Principia</span> can be hard to follow.<br>' +
                                      'These models make it easier.',
            helpButtonCaption       : 'Hover over the diagram or text to interact',

            //todm: this disables functionality ... not only CSS:
            helpBox_opacity0        : false,
            idleHelpButtonTooltip   : 'Get Help',

            putTextDescriptionIntoTopNavigationArrows : false,
        },

        //------------------------------------------------------
        // //\\ macros
        //      , keyNames must not include RegEx special chars.
        //------------------------------------------------------
        HTMLMacroKey : '<><>',
        textScriptMacros : {
            CXX2E :
                `<a target="_blank" href="?conf=sappId=addd-fw#Cframework">CalculusXX</a>
                to
                <a target="_blank" href="?conf=sappId=addd-fw#Eframework">Euclid</a>
                framwork`
            ,
            E2CXX :
                `<a target="_blank" href="?conf=sappId=addd-fw#Eframework">CalculusXX</a>
                to
                <a target="_blank" href="?conf=sappId=addd-fw#Cframework">Euclid</a>
                framwork`
            ,
            CXX :
                `<a target="_blank" href="?conf=sappId=addd-fw#Cframework">CalculusXX</a> framework`
            ,
        },
        //------------------------------------------------------
        // \\// macros
        //------------------------------------------------------
    };


    /*
    //inactive
    if( to_fconf.MODEL_MIN_WIDTH + to_fconf.ESS_MIN_WIDTH  >
        to_fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD - 100 ) {
        alert( 'wrong config settings: ' +
               'MODEL_MIN_WIDTH + ESS_MIN_WIDTH > mobile size' );
            ////todm: we cannot put min media and min essay together because of
            ////window's width is too small, do resort to mobile one
            ////"one column" solution
            //return; //isMobile = true;
    }
    */
    //====================================================
    // \\// put configuration parameters here
    //====================================================


    ///spawns config to its final place
    Object.assign( fconf, to_fconf );

}) ();

