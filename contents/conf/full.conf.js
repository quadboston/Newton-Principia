// //\\// site-wide conf
//        as of nov 13, 2025, the execution order is:
//        this file then lemma.conf.js
(function(){
    const {ns, url2conf,userOptions,fapp, fconf} = window.b$l.apptree({});
    //fconf.basicSiteFeatures = true;
    url2conf( fconf );
    full_conf();
    fapp.doesConfigLemma();
    return;

function full_conf(){
    //apparently, we can do '.' because "contents" is moved levels up
    //when move-to-prod-folder.php builds production package folders,
    //will be it better to explicitly set './'?
    fconf.pathToContentSite     = '.';

    fconf.pathToContentSiteImg  = 'contents/img';
    fconf.engineImg             = 'engine-img';
    fconf.pathToContents        = fconf.pathToContentSite + '/contents';

    ///====================================================
    /// put configuration parameters here
    ///====================================================
    Object.assign( fconf, {
        hideSingleItemContentMenus : true, //todm fails to work at once
        SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM : false,

        timeToShowOriginalDiagram  : 3600000, //ms

        doDisplayPageTopNavigatMenu : true,
        lemmaHasHomeButton          : true,
        homeButtonName              : 'Contents',
        logic_phaseTab_nonClickable    : false,

        //:data
        svgNS : ns.svgNS,


        //--------------------
        // //\\ page-wide
        //--------------------
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

        //since ver 1931 was automated from contents
        //as of ver 2955 is created automatically in content2exegs.js
        //dragPointDecoratorClasses : [],
        //[ 'aspect--video', 'aspect--english', 'aspect--xixcentury' ],
        //--------------------
        // \\// view
        //--------------------

        //developer's proposals
        //these constants are used for development planning:
        //they are not needed for application
        //approvalGranted: {},
        //fconf.approvalGranted[
        // 'area-fragments-manager-to-link-with-app' ] = true;

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

        //app decorations
        appDecor :
        {
            backButtonCaption       : 'Back to the Lemmas',
            landingImage            : 'landing-img.jpg',
            homePageCaption         : 'Newton’s <span>Principia</span><br>' +
                                      'Interactive Models',
            homePageSubCaption      : 'The logic in Newton’s <span>Principia</span> can be hard to follow.<br>' +
                                      'These models make it easier.<br>',
            homePageSubtitle        : 'A supplement to resources such as<br>' +
                                      '* Joseph Gallant’s <span class="dd-label"><a href="https://www.worldscientific.com/worldscibooks/10.1142/13416#t=aboutBook">Newton’s Principia for the Modern Student</span></a><br>' +
                                      '* Dana Densmore’s <span class="dd-label"><a href="https://www.greenlion.com/books/NewtonPrincipia.html">Newton’s Principia: The Central Argument</span></a><br>' +
                                      '* L. Bernard Cohen’s <span class="dd-label"><a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z">A Guide to Newton’s Principia</span></a>',
                                        /*'<ul>' +
                                            '<li>Joseph Gallant’s <i>Newton’s Principia for the Modern Student</i></li>' +
                                            '<li>Dana Densmore’ <i>Newton’s Principia for the Modern Student</i></li>' +
                                        '</ul>',*/
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
                `<a target="_blank" href="?conf=sappId=addd-fw#Cframework">Vector Calculus</a>
                to
                <a target="_blank" href="?conf=sappId=addd-fw#Eframework">Euclid</a>
                framwork`
            ,
            E2CXX :
                `<a target="_blank" href="?conf=sappId=addd-fw#Eframework">Vector Calculus</a>
                to
                <a target="_blank" href="?conf=sappId=addd-fw#Cframework">Euclid</a>
                framwork`
            ,
            CXX :
                `<a target="_blank" href="?conf=sappId=addd-fw#Cframework">Vector Calculus</a> framework`
            ,
        },
        //------------------------------------------------------
        // \\// macros
        //------------------------------------------------------
    });
}
})();