//default app wide settings for lemmas
//may be overriden later by URL-query or lemma sconf.js,
(function(){
    const { fapp, fconf, sf, userOptions, topicColors_repo } =
           window.b$l.apptree({});
    fapp.normalizeSliders = normalizeSliders;
    fapp.doesConfigLemma = doesConfigLemma;
    const tr = topicColors_repo;

    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sf ... anyway, they
    //do ? override from URL-query,
    return;


function doesConfigLemma (){
    // runs once per page load
    // c cc('doesConfigLemma');

    //=======================================
    // //\\ topic colors repo
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
    tr.highlight = rgbToArray("rgb(234, 234, 234)");

    //usually as a condition of a claim,
    //condition of the theorem,
    //given parameters of the claim or proof
    tr.given       = rgbToArray("rgb(0, 113, 0)");
    tr.givenArea   = [...tr.given, 1];
    tr.givenOnlyVisibleWhenHighlighted
        = [...tr.given, 0, 1],

    //relates to moving body, to an orbit
    tr.body    = rgbToArray("rgb(0, 150, 0)");
    tr.orbit   = tr.body;

    tr.orbitareaSample         = [0, 150, 0,  0.05]; //P12
    tr.orbitarea               = [0, 150, 0,  0.1, 0.5]; //P14 (in P12 sconf)
    tr.orbitareaHiddenStart    = [0, 150, 0,  0.001, 0.5]; //P12
    tr.instanttriangle         = [0, 150, 200, 0.2, 0.5 ]; //P14 (in P12 sconf)
    tr.instanttriangleHiddenStart  = [0, 150, 200, 0.001, 0.5 ] //P12

    tr.time      = rgbToArray("rgb(0, 150, 200)");
    tr.dtime     = tr.time;
    tr.distance  = rgbToArray("rgb(60, 20, 0)");

    //logical steps of the proof, auxilary constructs
    //of a proof
    tr.proof       = rgbToArray("rgb(0, 0, 255)");
    tr.proofArea   = [...tr.proof, 1];
    tr.result      = rgbToArray("rgb(100, 0, 0)");
    tr.resultOnlyVisibleWhenHighlighted
        = [...tr.result, 0, 1];

    //alert, invalid user actions
    tr.invalid = rgbToArray("rgb(250, 0, 0)");
    //force, energy
    tr.force   = rgbToArray("rgb(200, 150, 0)");
    //conclusion of the proof

    tr.forceMove       = tr.force;
    tr.speed           = rgbToArray("rgb(90, 90, 90)");

    //neutral elements
    tr.shadow  = rgbToArray("rgb(50, 50, 50)");
    tr.hidden  = [0, 0, 0, 0];

    tr.context = rgbToArray("rgb(0, 0, 0)");

    tr.estimatedForce  = rgbToArray("rgb(200, 0, 200)");
    tr.sagitta         = tr.estimatedForce;
    tr.displacement    = tr.estimatedForce;
    tr.curvature       = rgbToArray("rgb(200, 40, 200)");
    tr.chord           = rgbToArray("rgb(0, 0, 255)");
    tr.attention       = rgbToArray("rgb(200, 200, 0)");

    //From L20, L21
    tr.static              = rgbToArray("rgb(0, 200, 255)");
    tr.staticHalfOpacity   = [0, 200, 255, 0.5];
    tr.core                = rgbToArray("rgb(255, 150, 0)");
    tr.coreHalfOpacity     = [255, 150, 0, 0.5];
    tr.aux                 = rgbToArray("rgb(255, 0, 255)");
    tr.constructors        = rgbToArray("rgb(0, 0, 255)");
    tr.ellipse             = rgbToArray("rgb(0, 150, 0)");

    //From L2, L3, L4
    tr.difference  = [150, 50, 0, 0, 0.64];
    tr.figure      = rgbToArray("rgb(0, 150, 0)");

    tr["figure-area"]              = [0, 150, 0, 0.32, 0.64],
    tr["figure-area-txt"]          = [0, 150, 0, 0.7, 1],

    tr["circumscribed-rectangles"] = [0, 80, 150, 0.32, 0.64],
    tr["circ-txt"]                 = [0, 80, 150, 0.7, 1],

    tr["inscribed-rectangles"]     = [150, 0, 150, 0.32, 0.64],
    tr["insc-txt"]                 = [150, 0, 150, 0.7, 1],

    tr.widths                      = [150, 0, 150, 0, 0.64],

    tr.widestRectangular           = [0, 0, 150, 0.28, 0.49],
    tr.widestRectangularHiddenStart= [0, 0, 150, 0.0, 0.49],
    tr["widt-txt"]                 = [0, 0, 150, 0.7, 1],

    //P1 (Shared with P2)
    tr.freeMove        = rgbToArray("rgb(0, 150, 0)");
    tr.diagram         = rgbToArray("rgb(150, 0, 90)");
    tr.path            = rgbToArray("rgb(0, 0, 150)");
    tr.sagittaeChords  = tr.sagitta;

    tr.trianglePurpleTextAreaColor = tr.path;
    tr["kepler-triangle-odd"]  = [102, 102, 255, 0.35, 0.7],
    tr["kepler-triangle-even"] = [153, 153, 255, 0.35, 0.7],
    tr.triangleGreen           = [0, 150, 0, 0.25, 0.64];

    tr.perpendicular   = [150, 80, 0];
    tr.tangent         = [0, 150, 0];

    //P41
    //Note that Fi for P12 is shadow (see its sconf.js ~line 635)
    tr.fi      = [0, 0, 150, 0.1, 0.3];
    tr.Fkernel = [0, 0, 150];

    tr.bodyHiddenStart         = [...tr.body.slice(0,3), 0.01, 1];
    tr.forceTransparentStart   = [...tr.force.slice(0,3), 0.1, 1];
    tr.VSarea                  = [...tr.force.slice(0,3), 0.3, 0.7];
    tr.timeHiddenStart         = [...tr.time.slice(0,3), 0.01, 0.7];

    //Is vgpoint still needed?  Seems to be after "Drop point, A"
    //in Elements under developer tools
    //however may not be visible.
    tr.vgpoint = [0, 150, 0, 0.01, 1]; //todm: last two pars have no effect

    tr.XCY     = [0, 0, 150, 0.03, 0.5];

    tr.D𝑐𝑥E    = [0, 0, 150, 0.01, 0.5];

    tr.D𝑏𝑧E    = [110, 90, 0, 0.01, 0.5];
    tr.VIC     = [110, 90, 0, 0.01, 0.5];
    tr.ICK     = [110, 90, 0, 0.01, 0.5];
    //=======================================
    // \\// topic colors repo
    //=======================================

    sf.default_tp_stroke_width = 10;
    ///for default points (and draggers???)
    ///in module points.js
    sf.handleRadius = 8;
    sf.standardSvgSize = 1000;
    sf.PATH_WIDTH = '2';

    Object.assign( sf, {
        //***************************************************
        // //\\ tp color
        //===================================================
        //takes precedence in: ssF.colorArray_2_rgba
        //                     ssF.lowtpid__2__glocss8anchorRack

        //this solution is not good:
        //some lemmas need bright red, but
        //bright green text is hard to read ...
        //so we resort to dark color LIGHT = 30

        //This sets L-paramter in SHL color model.
        //Range of L is from 0 to 100. 100 is 100% lightness which mean
        //all colors are equaly bright and diagram becomes invisible.
        //0 - is complete darkness.

        //topics:
        DEFAULT_TP_SATUR : 99,

        //---------------------------------------------------
        // //\\ tp color opacity
        //---------------------------------------------------
        //affects only ssF.lowtpid__2__glocss8anchorRack and
        //ssF.colorArray_2_rgba
        //does not affect text anchor colors, but does affect both model and table together
        TP_OPACITY_LOW : 0.5, // applied to 'topicColors_elected' in page's sconf.js

        //0.6-makes opacity points do look "non-solid"
        //applied to 'originalPoints' and 'linesArray' in page's sconf.js
        TP_OPACITY_LOW_POINT : 1, 
        TP_OPACITY_HIGH : 1,

        // //\\ remove when lemmas
        //      will be standartized
        AREA_HIGHLIGHT_OPACITY : 0.7,
        AREA_DEFAULT_OPACITY : 0.3,
        // \\// remove when lemmas

        SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY : 0.6,
        default_tp_stroke_opacity   : 0.5, //2, todotodo bug everywhere

        ANCHOR_OPACITY_LOW : '0.7',
        ANCHOR_OPACITY_HIGH : '1',
        ANCHOR_DEFAULT_COLOR : 'rgba( 150, 0, 150, 1 )',

        //affects only anchor colors in Book text,
        TP_OPACITY_FROM_fixed_colors : true,
        //---------------------------------------------------
        // \\// tp color opacity
        // \\// tp color
        //===================================================

        //---------------------------------------------------------------
        // //\\ anchor control
        //---------------------------------------------------------------
        ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS : 0.8,
        ANCHOR_TOPIC__OPACITY_IN_FOCUS : 1.0,
        ITEM_BASE_COLOR_TO_ANCHOR : false, //for anchor-text, sets tpcolarr opacity to 1
        //---------------------------------------------------------------
        // \\// anchor control
        //---------------------------------------------------------------

        //***************************************************
        // ??? in better design, this setting should come
        // from ns.dpdec.dimensions.WIDTH bsl-core,
        // to do this, this module should have
        // delayed execution based on setModue
        // machinery,
        //
        // in mean time, these 21px comes as a sum
        // for 5px of image width + 2*8px margin from
        //     subroots.css.js::#bsl-resizable-handle
        // and not from dpdec.dimensions.WIDTH as may appear,
        main_horizontal_dividor_width_px : 21,
        //***************************************************

        mediaOffset : [ 0, 0 ], //in respect to simscene
        LETTER_FONT_SIZE_PER_1000 : 32,

        GENERIC_SLIDERS_FONT_SIZE : 15,
        GENERIC_SLIDER_HEIGHT_Y : 25,
        GENERIC_SLIDERS_COUNT : 2,
        SLIDERS_LEGEND_HEIGHT : 25*2+20, //2=GENERIC_SLIDERS_COUNT
        SLIDERS_OFFSET_Y      : 0,
        SLIDERS_OFFSET_X : 0.05, //in respect to background-image-width
        SLIDERS_LENGTH_X : 0.70, //in respect to background-image-width
        dragHidesPictures : true,  //vital for show/hide letters machinery
    });

    sf.pointDecoration = {
        cssClass        : 'tostroke tofill thickable',
        'stroke-width'  : 3,
        r               : sf.handleRadius,
    };
    //====================================================
    // \\// optionally overriden by url-query-config
    //====================================================
}

function normalizeSliders( sscale )
{
    sf.GENERIC_SLIDERS_FONT_SIZE *= sscale;
    sf.GENERIC_SLIDER_HEIGHT_Y *= sscale;
    sf.SLIDERS_LEGEND_HEIGHT *= sscale;
    sf.SLIDERS_OFFSET_Y *= sscale;
}

function rgbToArray(rgbString, alpha) {
    const matches = rgbString.match(/\d+/g);
    if (!matches || matches.length !== 3) {
        throw new Error("Input must be a string in the format" +
                        "'rgb(r, g, b)' with three numeric values.");
    }
    const rgb = matches.map(Number);
    if (alpha !== undefined) {
        rgb.push(alpha);
    }
    return rgb;
}
})();
