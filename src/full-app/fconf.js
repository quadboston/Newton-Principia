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
        //--------------------
        // //\\ site-wide
        //--------------------
        //:scenario
        enabledLemmas : [2,3,9],
        startLemmaReadingNumber : 2,
        LANDING_MODE : 'claim',
        TEXT_MODE : 'text-none',
        //:data
        svgNS :  "http://www.w3.org/2000/svg",
        //--------------------
        // \\// site-wide
        //--------------------



        //--------------------
        // //\\ page-wide
        //--------------------
        // //\\ view
        //--------------------

        //.below this value, JS considers the device as a mobile
        mobileDetectorMediaThreshold : 800,

        model_float_dir : 'right', //vs left
        exegesis_floats : false,
        DRAG_POINTS_THROTTLE_TIME : 50, //ms
        DRAGGEE_HALF_SIZE : 40, //px
        NAVIGATION_DECORATIONS_ALWAYS_VISIBLE : false,
        appview :
        {
            lemmaRomanNumbers :
            [
                'o', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 
                'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi'
            ]
        },

        dragPointDecoratorClasses :
        [ 'text--hypertext', 'text--english' ],
        //--------------------
        // \\// view
        //--------------------

        //developer's proposals
        //these constants are used for development planning: they are not needed for application
        approvalGranted: {},
        //fconf.approvalGranted[ 'area-fragments-manager-to-link-with-app' ] = true;

        ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED : false,
        ORIGINAL_FIGURE_VISIBILITY : 0.6,
        ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS : 3000,

        USE_LOCAL_VIDEO : false //vs social-remote-or-youtube
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

