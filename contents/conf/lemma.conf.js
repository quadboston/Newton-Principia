// //\\// file where to set plugin main configuration
( function() {
    var { fapp, sconf, userOptions, fixedColors, } = 
        window.b$l.apptree({});

    fapp.doesConfigLemma = doesConfigLemma;
    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sconf ... anyway, they do ? override from URL-query,
    return;
    

    function rgbToArray(rgbString, alpha) {
        const matches = rgbString.match(/\d+/g);
        if (!matches || matches.length !== 3) {
            throw new Error("Input must be a string in the format 'rgb(r, g, b)' with three numeric values.");
        }
        const rgb = matches.map(Number);
        if (alpha !== undefined) {
            rgb.push(alpha);
        }
        return rgb;
    }

    
    function doesConfigLemma()
    {
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
        
        //The colors have been moved from each model to this file so they can be standardized.  Note
        //that comments referencing specific models (eg. P12) may not be up to date, or include every 
        //model where the color is used.  More improvements can be made to the colors, some 
        //possibilities are below.


        //Variable Naming and Comments...
        //-Variable names:
        //  -Could be more descriptive.
        //  -Renamed to remove hyphens (some already had them removed previously).
        //  -Many include information about their opacity values.  Terms used such as "HiddenStart" are
        //   vague, and variables that use "HiddenStart" have different opacity values.

        //-Descriptive comments should be added, and may only be needed for variables where their 
        // purpose isn't obvious.


        //Color Variable Constants...
        //-Many color variables use the same color (eg. green [0, 150, 0]) but their r, g, b values 
        // are set independently.  For consistency, especially for when changes are made in the future, 
        // it would be much better to have a single variable for each color (eg. green, blue etc.) 
        // that is referenced (eg. body = green).  They could be in the array format for now, then 
        // converted to the CSS format later.


        //Opacity Variable Constants...
        //-Some opacity values use the defaults while others override them.  It would be best to 
        // have constants for these overriding opacity values to keep them consistent.  For example if 
        // the non-highlighted opacity value is supposed to keep a decoration/shape hidden, any situation 
        // where that’s the case should reference a variable (eg. opacityHidden or similar).

        //-The non-highlighted opacity values (0.01 and 0.001) don't really look very different.  Since
        // they are supposed to start hidden, an opacity value 0 would probably be better.

        //-Some colors override the default opacity values, however given that they use values that are
        // similar to the defaults, they may be able to use them instead.


        //Other Possible Improvements...
        //-Note some variables (eg. P41 “XCY”, “D𝑐𝑥E”, “D𝑏𝑧E” etc.) should probably be moved back to their
        // sconf.js file, once a more broad variable name is created for them.  They are currently here so 
        // that all colors from all models in the global file can be compared, to determine the best way to
        // group them.

        //-Many more similar color variables could likely be combined together.

        // background color used to highlight text and table rows on hover
        fixedColors.highlight = rgbToArray("rgb(234, 234, 234)");

        //usually as a condition of a claim,
        //condition of the theorem,
        //given parameters of the claim or proof
        fixedColors.given       = rgbToArray("rgb(0, 113, 0)");
        fixedColors.givenArea   = [...fixedColors.given, 1];
		fixedColors.givenOnlyVisibleWhenHighlighted  
			= [...fixedColors.given, 0, 1],

        //relates to moving body, to an orbit
        fixedColors.body    = rgbToArray("rgb(0, 150, 0)");
        fixedColors.orbit   = fixedColors.body;
        
        fixedColors.orbitareaSample         = [0, 150, 0,  0.05]; //P12
        fixedColors.orbitarea               = [0, 150, 0,  0.1, 0.5]; //P14 (in P12 sconf)
        fixedColors.orbitareaHiddenStart    = [0, 150, 0,  0.001, 0.5]; //P12
        fixedColors.instanttriangle         = [0, 150, 200, 0.2, 0.5 ]; //P14 (in P12 sconf)
        fixedColors.instanttriangleHiddenStart  = [0, 150, 200, 0.001, 0.5 ] //P12

        fixedColors.time      = rgbToArray("rgb(0, 150, 200)");
        fixedColors.dtime     = fixedColors.time;
        fixedColors.distance  = rgbToArray("rgb(60, 20, 0)");
        
        //logical steps of the proof, auxilary constructs
        //of a proof
        fixedColors.proof       = rgbToArray("rgb(0, 0, 255)");
        fixedColors.proofArea   = [...fixedColors.proof, 1];
		fixedColors.result      = rgbToArray("rgb(100, 0, 0)");
		fixedColors.resultOnlyVisibleWhenHighlighted
			= [...fixedColors.result, 0, 1];

        //alert, invalid user actions
        fixedColors.invalid = rgbToArray("rgb(250, 0, 0)");
        //force, energy
        fixedColors.force   = rgbToArray("rgb(200, 150, 0)");
        //conclusion of the proof

        fixedColors.forceMove       = fixedColors.force;
        fixedColors.speed           = rgbToArray("rgb(90, 90, 90)");

        //neutral elements
        fixedColors.shadow  = rgbToArray("rgb(50, 50, 50)");
        fixedColors.hidden  = [0, 0, 0, 0];


        fixedColors.context = rgbToArray("rgb(0, 0, 0)");

        fixedColors.estimatedForce  = rgbToArray("rgb(200, 0, 200)");
        fixedColors.sagitta         = fixedColors.estimatedForce;
        fixedColors.displacement    = fixedColors.estimatedForce;
        fixedColors.curvature       = rgbToArray("rgb(200, 40, 200)");
        fixedColors.chord           = rgbToArray("rgb(0, 0, 255)");
        fixedColors.attention       = rgbToArray("rgb(200, 200, 0)");



        //From L20, L21
        fixedColors.static              = rgbToArray("rgb(0, 200, 255)");
        fixedColors.staticHalfOpacity   = [0, 200, 255, 0.5];
        fixedColors.core                = rgbToArray("rgb(255, 150, 0)");
        fixedColors.coreHalfOpacity     = [255, 150, 0, 0.5];
        fixedColors.aux                 = rgbToArray("rgb(255, 0, 255)");
        fixedColors.constructors        = rgbToArray("rgb(0, 0, 255)");
        fixedColors.ellipse             = rgbToArray("rgb(0, 150, 0)");



        //From L2, L3
        fixedColors.difference  = [150, 50, 0, 0, 0.64];
        fixedColors.base        = rgbToArray("rgb(0, 150, 0)");
        fixedColors.curve       = rgbToArray("rgb(0, 150, 0)");
        fixedColors.figure      = rgbToArray("rgb(0, 150, 0)");

        fixedColors["figure-area"]              = [0, 150, 0, 0.32, 0.64],
        fixedColors["figure-area-txt"]          = [0, 150, 0, 0.7, 1],

        fixedColors["circumscribed-rectangles"] = [0, 80, 150, 0.32, 0.64],
        fixedColors["circ-txt"]                 = [0, 80, 150, 0.7, 1],

        fixedColors["inscribed-rectangles"]     = [150, 0, 150, 0.32, 0.64],
        fixedColors["insc-txt"]                 = [150, 0, 150, 0.7, 1],

        fixedColors.widestRectangular           = [0, 0, 150, 0.28, 0.49],
        fixedColors.widestRectangularHiddenStart= [0, 0, 150, 0.0, 0.49],
        fixedColors["widt-txt"]                 = [0, 0, 150, 0.7, 1],



        //P1 (Shared with P2)
        fixedColors.freeMove        = rgbToArray("rgb(0, 150, 0)");
        fixedColors.diagram         = rgbToArray("rgb(150, 0, 90)");
        fixedColors.path            = rgbToArray("rgb(0, 0, 150)");
        fixedColors.sagittaeChords  = fixedColors.sagitta;

        fixedColors.trianglePurpleTextAreaColor = fixedColors.path;
        fixedColors["kepler-triangle-odd"]  = [102, 102, 255, 0.35, 0.7],
        fixedColors["kepler-triangle-even"] = [153, 153, 255, 0.35, 0.7],
        fixedColors.triangleGreen           = [0, 150, 0, 0.25, 0.64];

        fixedColors.perpendicular   = [150, 80, 0];
        fixedColors.tangent         = [0, 150, 0]; 

        //P2
        fixedColors.areaDescriptionAccelerated = rgbToArray("rgb(120, 90, 82)", 1); //Description of areas triangle P2 proof tab



        //P41
        //Note that Fi for P12 is shadow (see its sconf.js ~line 635)
        fixedColors.fi      = [0, 0, 150, 0.1, 0.3];
        fixedColors.Fkernel = [0, 0, 150];

        fixedColors.bodyHiddenStart         = [...fixedColors.body.slice(0,3), 0.01, 1];
        fixedColors.forceTransparentStart   = [...fixedColors.force.slice(0,3), 0.1, 1];
        fixedColors.VSarea                  = [...fixedColors.force.slice(0,3), 0.3, 0.7];
        fixedColors.timeHiddenStart         = [...fixedColors.time.slice(0,3), 0.01, 0.7];

        //Is vgpoint still needed?  Seems to be after "Drop point, A" in Elements under developer tools
        //however may not be visible.
        fixedColors.vgpoint = [0, 150, 0, 0.01, 1]; //todm: last two pars have no effect

        fixedColors.XCY     = [0, 0, 150, 0.03, 0.5];

        fixedColors.D𝑐𝑥E    = [0, 0, 150, 0.01, 0.5];

        fixedColors.D𝑏𝑧E    = [110, 90, 0, 0.01, 0.5];
        fixedColors.VIC     = [110, 90, 0, 0.01, 0.5];
        fixedColors.ICK     = [110, 90, 0, 0.01, 0.5];
        
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
            //does not affect text anchor colors, but does affect both model and table together
            TP_OPACITY_LOW : 0.5, // applied to 'predefinedTopics' in page's sconf.js
            //0.6-makes opacity points do look "non-solid"
            TP_OPACITY_LOW_POINT : 1, // applied to 'originalPoints' and 'linesArray' in page's sconf.js

            TP_OPACITY_HIGH : 1,
    
            AREA_DEFAULT_OPACITY : 0.35,
            AREA_HIGHLIGHT_OPACITY : 0.7,

            ANCHOR_OPACITY_LOW : '0.7',
            ANCHOR_OPACITY_HIGH : '1',
            ANCHOR_DEFAULT_COLOR : 'rgba( 150, 0, 150, 1 )',
    

            //affects only anchor colors in Book text,
            TP_OPACITY_FROM_fixed_colors : true, //false,
            //---------------------------------------------------
            // \\// tp color opacity
            // \\// tp color
            //===================================================
    
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
            //---------------------------------------------------------------
            // \\// moved to site conf from expand-conf.js
            //***************************************************
            // \\// TOPIC COLORS AND SHAPES
            //***************************************************
                
             PATH_WIDTH : '2',   
                
                
            //***************************************************
            // in better design, this setting should come
            // from ns.dpdec.dimensions.WIDTH bsl-core,
            // to do this, this module should have
            // delayed execution of to_sconf based on setModue
            // machinery,
            //
            // in mean time, these 21px comes as a sum
            // for 5px of image width + 2*8px margin from
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

