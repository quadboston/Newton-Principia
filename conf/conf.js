// //\\// site-wide conf
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);






    //====================================================
    // //\\ put configuration parameters here
    //====================================================
    to_fconf =
    {

        //:data
        svgNS :  "http://www.w3.org/2000/svg",

        pathToStem : '', // not sure about './',

        //--------------------
        // //\\ page-wide
        //--------------------
        // //\\ view
        //--------------------

        ESSAY_FRACTION_IN_WORKPANE : 0.33,

        //.below this value, JS considers the device as a mobile
        MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD : 800,

        model_float_dir : 'right', //vs left
        ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML : true,
        attach_menu_to_essaion_root : true,
        decorateTopMenuWithRadioCircle : false,

        LEFT_SIDE_MENU_WIDTH : 40, //px
        LEFT_SIDE_MENU_OFFSET_X : 20, //px
        LEFT_SIDE_MENU_ITEM_LENGTH : 100, //px
        DATA_LEGEND_WIDTH : 300, //px //todo must be per table-column to achive respon.
        //ESSAY_PANE_MAX_HEIGHT :400, //px

        DRAG_POINTS_THROTTLE_TIME : 50, //ms
        DRAGGEE_HALF_SIZE : 40, //px
        NAVIGATION_DECORATIONS_ALWAYS_VISIBLE : false,

        //since ver 1931 was automated from contents
        //as of ver 2955 is created automatically in content2exegs.js
        //dragPointDecoratorClasses : [],
        //[ 'aspect--hypertext', 'aspect--english', 'aspect--xixcentury' ],


        LETTER_FONT_SIZE_PER_1000 : 32,
        //--------------------
        // \\// view
        //--------------------

        //developer's proposals
        //these constants are used for development planning: they are not needed for application
        //approvalGranted: {},
        //fconf.approvalGranted[ 'area-fragments-manager-to-link-with-app' ] = true;

        ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED : false,
        ORIGINAL_FIGURE_VISIBILITY : 0.6,
        ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS : 3000,
        //--------------------
        // \\// page-wide
        //--------------------

        rgShapesVisible : true,





        //app decorations
        appDecor :
        {
            backButtonCaption : 'Back to the Lemmas',
            landingImage : 'landing-img.jpg',
            homePageCaption : 'Interactive Illustrations<br>' +
                              'for Newton’s <span>Principia</span>',
            helpButtonCaption : 'Hover over the diagram to interact',
            idleHelpButtonTooltip : '',
        },

    };


    if( to_fconf.MODEL_MIN_WIDTH + to_fconf.ESS_MIN_WIDTH  >
        to_fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD - 100 ) {
        alert( 'wrong config settings: ' +
               'MODEL_MIN_WIDTH + ESS_MIN_WIDTH > mobile size' );
            ////todm: we cannot put min media and min essay together because of
            ////window's width is too small, do resort to mobile one
            ////"one column" solution
            //return; //isMobile = true;
    }
    //====================================================
    // \\// put configuration parameters here
    //====================================================






    ///spawns config to its final place
    Object.keys( to_fconf ).forEach( function( key ) {
        fconf[ key ] = to_fconf[ key ];
    });

}) ();

