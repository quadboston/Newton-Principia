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

        //sappId : 'homePage',

        //--------------------
        // //\\ site-wide
        //--------------------

        //:data
        svgNS :  "http://www.w3.org/2000/svg",

        siteCaptionPlain : "An Interactive Exploration of Newton’s Lemmas",
        siteCaptionHTML : "An Interactive Exploration <br><span>of</span> Newton’s Lemmas",
        //--------------------
        // \\// site-wide
        //--------------------



        //--------------------
        // //\\ page-wide
        //--------------------
        // //\\ view
        //--------------------

        //.below this value, JS considers the device as a mobile
        MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD : 800,
        SMALL_DESKTOP_MEDIA_QUERY_WIDTH_THRESHOLD :1300, //px
        MODEL_MIN_WIDTH : 200, //when dragging

        model_float_dir : 'right', //vs left
        exegesis_floats : !true,   //floats around media-pane
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

        dragPointDecoratorClasses :
        [ 'aspect--hypertext', 'aspect--english' ],
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
    };
    //====================================================
    // \\// put configuration parameters here
    //====================================================




    ///spawns config to its final place
    Object.keys( to_fconf ).forEach( function( key ) {
        fconf[ key ] = to_fconf[ key ];
    });

}) ();

