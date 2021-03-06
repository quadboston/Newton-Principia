// //\\// file where to set plugin main configuration
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);



    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sconf ... anyway, they do ? override from URL-query,

    //====================================================
    // //\\ optionally overriden by url-query-config
    //====================================================

    var GENERIC_SLIDERS_FONT_SIZE = 15;
    var GENERIC_SLIDER_HEIGHT_Y = 25;
    var GENERIC_SLIDERS_COUNT = 2; //todm ... not automated
    var SLIDERS_LEGEND_HEIGHT = 25*GENERIC_SLIDERS_COUNT+20;
    var SLIDERS_OFFSET_Y      = 0;

    to_sconf =
    {
        mediaOffset : [ 0, 0 ],                 //in respect to media-root
        main_horizontal_dividor_width_px : 21,

        //topics:
        DEFAULT_TP_SATUR : 99,
        DEFAULT_TP_OPACITY : 0.6,

        //this settings play role in tp/opacity/mouseover scenario
        TOPIC_FILL_OPACITY_NOT_IN_FOCUS : 0.3,
        TOPIC_FILL_OPACITY_IN_FOCUS : 0.7, //controls mutual visibility overlapped areas,
                                           //apparently, 1.0 is for bully overlapping


        //:this solution is not good:
        //:some lemmas need bright red, but
        //:bright green text is hard to read ...
        //:so we resort to dark color LIGHT = 30
        DEFAULT_TP_LIGHT : 30,

        GENERIC_SLIDERS_FONT_SIZE,
        GENERIC_SLIDER_HEIGHT_Y,
        GENERIC_SLIDERS_COUNT,
        SLIDERS_LEGEND_HEIGHT,
        SLIDERS_OFFSET_Y,

        SLIDERS_OFFSET_X : 0.05, //in respect to background-image-width
        SLIDERS_LENGTH_X : 0.70, //in respect to background-image-width

        dragHidesPictures : true,  //vital for show/hide letters machinery

        ///for default points (and draggers???)
        ///in module points.js
        handleRadius : 5,
    };

    to_sconf.pointDecoration =
    {
        cssClass        : 'tostroke tofill thickable',
        'stroke-width'  : 2,
        r               : to_sconf.handleRadius,
    };
    //====================================================
    // \\// optionally overriden by url-query-config
    //====================================================




    //adds to_sconf to commong sconf
    Object.keys( to_sconf ).forEach( function( key ) {
        sconf[ key ] = to_sconf[ key ];
    });

    fapp.normalizeSliders = normalizeSliders;
    return;


    //fapp
    function normalizeSliders( sscale )
    {
        sconf.GENERIC_SLIDERS_FONT_SIZE *= sscale;
        sconf.GENERIC_SLIDER_HEIGHT_Y *= sscale;
        sconf.SLIDERS_LEGEND_HEIGHT *= sscale;
        sconf.SLIDERS_OFFSET_Y *= sscale;
    }

}) ();

