// //\\// engine-wide config
(function(){
const {ns, userOptions,fapp, fconf} = window.b$l.atree();
full_conf();
return;


function full_conf(){
    //===================================================
    // //\\ establishes site id,
    //      aka "principia" in bshelf/principia
    //===================================================

    //:dont edit, will be replaced by productifier
    let SITEID = "dont edit";

    //match happens when site (book site) is in dev. environment:
    const siteidMatch = location.pathname.match(
                        /bshelf\/([^\/]+)\/(?:index\.html|#|\?|$)/ );
    //c cc( 'SITEID='+SITEID + ' siteidMatch=', siteidMatch );
    if( siteidMatch ){
        SITEID = siteidMatch[1];
    }
    //c cc( 'SITEID='+SITEID );
    fconf.pathToContentSite     = siteidMatch ? '.' : './bshelf/'+SITEID;
    //this is a top root of an entire project suite folder system
    fconf.dev8prod_projectRoot  = siteidMatch ? '../..' : '.';
    fconf.pathToContentSiteImg  = fconf.pathToContentSite + '/contents/img';
    fconf.engineImg             = fconf.dev8prod_projectRoot + '/bshelf/_engine/eimg';
    fconf.pathToContents        = fconf.pathToContentSite + '/contents';
    //===================================================
    // \\// establishes site id,
    //===================================================

    ///====================================================
    /// put configuration parameters here
    ///====================================================
    Object.assign( fconf, {
        hideSingleItemContentMenus : true, //todm fails to work at once
        SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM : false,

        timeToShowOriginalDiagram  : 3600000, //ms
        //for development for speed:
        //timeToShowOriginalDiagram  : 1, //ms

        doDisplayPageTopNavigatMenu : true,
        lemmaHasHomeButton          : true,
        homeButtonName              : 'Contents',
        logic_phaseTab_nonClickable : false,

        //:data
        svgNS : ns.svgNS,

        //--------------------
        // //\\ page-wide
        // //\\ view
        //--------------------
        //prevents text box string from being too wide,
        //otherwise, hard to move eye from string to string,
        ESSAY_MAX_WIDTH: 600,
        ESSAY_MIN_WIDTH: 370,

        MODEL_MIN_WIDTH: 300, //when dragging
        RIGHT_WORKAREA_MARGIN: 0.015, //fraction

        ESSAY_FRACTION_IN_WORKPANE : 0.5, //0.33,  //default
        //ESSAY_FRACTION_IN_WORKPANE : 0.9, //for preliminaries

        //at this value or lower, device is given mobile layout,
        //resulting in vertically stacked text-model-data areas
        MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD : 790,

        model_float_dir : 'right', //vs left
        ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML : true,
        attach_menu_to_essaion_root : true,

        LEFT_SIDE_MENU_WIDTH : 40, //px
        LEFT_SIDE_MENU_OFFSET_X : 20, //px
        LEFT_SIDE_MENU_ITEM_LENGTH : 100, //px

        DRAG_POINTS_THROTTLE_TIME : 50, //ms
        DRAGGEE_HALF_SIZE : 15, //40, //px
        DRAG_HANDLE_HALFHOTSPOT : 15,

        //setting this to "false" does hide slider
        //decoration spinning arrows
        NAVIGATION_DECORATIONS_ALWAYS_VISIBLE: false,
        //--------------------
        // \\// view
        //--------------------
        ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED : false,
        ORIGINAL_FIGURE_VISIBILITY : 0.6,
        ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS : 3000,
        //--------------------
        // \\// page-wide
        //--------------------

        //app decorations
        'header-default-min-height' : '250px',

        appDecor: {
            backButtonCaption       : 'Back to contents',
            landingImage            : 'empty.png',
            landingImage_alt        : 'book image.',
            homePageCaption         : 'Introduction',
            homePageSubCaption      : 'Interactive simulations.<br>',
            homePageSubtitle        : '',
            helpButtonCaption       :
                'Hover over the diagram or text to interact',
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
        textScriptMacros : {},
        //------------------------------------------------------
        // \\// macros
        //------------------------------------------------------
    });
}
})();
