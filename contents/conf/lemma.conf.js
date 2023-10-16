// //\\// file where to set plugin main configuration
( function() {
    var {
        fapp, sconf,
    } = window.b$l.apptree({
    });


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
        //***************************************************
        // //\\ TOPIC COLORS AND SHAPES
        // //\\ tp color
        //===================================================
        //takes precedence in: ssF.colorArray_2_rgba
        //                     ssF.topics__2__topicsColorModel
        default_tp_lightness : 40,
        //this solution is not good:
        //some lemmas need bright red, but
        //bright green text is hard to read ...
        //so we resort to dark color LIGHT = 30

        //This sets L-paramter in SHL color model.
        //Range of L is from 0 to 100. 100 is 100% lightness which mean
        //all colors are equaly bright and diagram becomes invisible. 0 - is complete darkness.
  
        //topics:
        DEFAULT_TP_SATUR : 99,
  
        //---------------------------------------------------
        // //\\ tp color opacity
        //---------------------------------------------------
        //affects only ssF.topics__2__topicsColorModel and  ssF.colorArray_2_rgba
        OWN_SHAPE_OPACITY : 0.6, //not used at current version
        OWN_SHAPE_OPACITY_HIGH : 1,
        ITEM_OPACITY_INSTEAD_OF_OWN_SHAPE_in_low8high : false,
        //---------------------------------------------------
        // \\// tp color opacity
        // \\// tp color
        //===================================================

        SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY : 0.6,

        //---------------------------------------------------------------
        // //\\ global tp svg opacity
        //---------------------------------------------------------------
        //goes only to tpOpacityLow through topics__2__topicsColorModel(),
        //which is global tp-css
        TOPIC_FILL_OPACITY_NOT_IN_FOCUS : 0.6,
        TOPIC_FILL_OPACITY_IN_FOCUS : 0.9, //controls mutual visibility overlapped areas,
                                           //apparently, 1.0 is for bully overlapping
        //---------------------------------------------------------------
        // \\// global tp svg opacity
        //---------------------------------------------------------------

        default_tp_stroke_opacity   : 0.5, //2, todotodo bug everywhere
  
        //---------------------------------------------------------------
        // //\\ anchor control
        //---------------------------------------------------------------
        ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS : 0.6,
        ANCHOR_TOPIC__OPACITY_IN_FOCUS : 0.9,
        ITEM_BASE_COLOR_TO_ANCHOR : false, //for anchor-text, sets fixed-color opacity to 1
        //---------------------------------------------------------------
        // \\// anchor control
        //---------------------------------------------------------------
  
        //---------------------------------------------------------------
        // //\\ moved to site conf from expand-conf.js
        //---------------------------------------------------------------
        default_tp_stroke_width     : 10,
        defaultLineWidth            : 2,
        //---------------------------------------------------------------
        // \\// moved to site conf from expand-conf.js
        //***************************************************
        // \\// TOPIC COLORS AND SHAPES
        //***************************************************
            
            
            
            
        //***************************************************
        // in better design, this setting should come
        // from ns.dpdec.dimensions.WIDTH bsl-core,
        // to do this, this module should have
        // delayed execution of to_sconf based on setModue
        // machinery,
        //
        // in mean time, these 21px comes as a sum
        // for 5px of image width + 2*8px padding from
        //     subroots.css.js::#bsl-resizable-handle
        // and not from dpdec.dimensions.WIDTH as may appear,
        main_horizontal_dividor_width_px : 21,
        //***************************************************
  
        mediaOffset : [ 0, 0 ],                 //in respect to simscene
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
        handleRadius : 8,
        standardSvgSize : 1000,
    };

    to_sconf.pointDecoration =
    {
        cssClass        : 'tostroke tofill thickable',
        'stroke-width'  : 3,
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

