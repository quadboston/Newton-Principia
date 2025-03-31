// //\\// file where to set plugin main configuration
( function() {
    var {
        fapp, sconf, userOptions, fixedColors,
    } = window.b$l.apptree({
    });

    fapp.doesConfigLemma = doesConfigLemma;
    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sconf ... anyway, they do ? override from URL-query,
    return;
    
    
    function doesConfigLemma()
    {
        fconf.tpversion = 1;
        
        //====================================================
        // //\\ optionally overriden by url-query-config
        //====================================================
        var GENERIC_SLIDERS_FONT_SIZE = 15;
        var GENERIC_SLIDER_HEIGHT_Y = 25;
        var GENERIC_SLIDERS_COUNT = 2; //todm ... not automated
        var SLIDERS_LEGEND_HEIGHT = 25*GENERIC_SLIDERS_COUNT+20;
        var SLIDERS_OFFSET_Y      = 0;

        //=======================================
        // //\\ topicGroupColors
        //      historically named as fixedColors
        //=======================================
        {
            //usually as a condition of a claim,
            //condition of the theorem,
            //given parameters of the claim or proof
            var given = [100,  50, 0,      1];

            //relates to moving body, to an orbit
            var body      = [0,     150, 0, 1];
            
            var orbit     = body;
            var time      = [0,     150,  200];
            var distance  = [60, 20, 0];
            
            //logical steps of the proof, auxilary constructs
            //of a proof
            var proof     = [0,     0,   255];
            var result    = [100,   0,  0];

            ///addendum has different color concepts
            if( userOptions.showingBonusFeatures() ) {
                ////swaps colors
                var force = [250, 0, 0];
                var invalid = [0, 0, 0, 1];;
            } else {
                //alert, invalid user actions
                var invalid   = [250,  0,  0];
                //force, energy
                var force     = [200,  150,  0];
                //conclusion of the proof
            }
            //neutral elements
            var shadow    = [50,  50,  50];
            
            Object.assign( fixedColors, {
                given,
                body,
                orbit,
                time,
                distance,
                proof,
                force,
                invalid,
                result,
                shadow,
            });
        }
        //=======================================
        // \\// topicGroupColors
        //=======================================
        
        to_sconf =
        {
            //***************************************************
            // //\\ TOPIC COLORS AND SHAPES
            // //\\ tp color
            //===================================================
            //takes precedence in: ssF.colorArray_2_rgba
            //                     ssF.topics__2__topicsColorModel
            //affects diagram only in tpversion 1,
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
            //0.6-makes opacity in tpversion 2, points do look "non-solid"
            //does not affect anchor colors,
            TP_OPACITY_LOW : fconf.tpversion === 2 ? 0.5 : 0.6,
            TP_OPACITY_LOW_POINT : 1, //for points only,

            TP_OPACITY_HIGH : fconf.tpversion === 2 ? 0.8 : 1,
            TP_OPACITY_HIGH_POINT : 1,
    
            ANCHOR_OPACITY_LOW : '0.7',
            ANCHOR_OPACITY_HIGH : '1',
            ANCHOR_DEFAULT_COLOR : 'rgba( 150, 0, 150, 1 )',
    

            //affects only anchor colors in Book text,
            TP_OPACITY_FROM_fixed_colors : true, //false,
            //---------------------------------------------------
            // \\// tp color opacity
            // \\// tp color
            //===================================================
        
    
            //since ver 13510, affects only tpversion 1,
            //before (in tp 2) affected only anchor colors in Book text,
            TP_SATUR_FROM_fixed_colors : true,

            //diagram drag handle mouse pointer styles
            spinnerCursorGrab : 'crosshair',
            spinnerCursorGrabbed : 'crosshair',
    
            SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY : 0.6,

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
    }
}) ();

