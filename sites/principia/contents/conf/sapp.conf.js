//default app wide settings for lemmas
//may be overriden later by URL-query or lemma sconf.js,
(function(){

const {sn, fapp, fconf, sf, userOptions, tprepo,
    rg, stdMod} =
    window.b$l.atree({});
fapp.normalizeSliders = normalizeSliders;
fapp.doesConfigLemma = doesConfigLemma;
const tr = tprepo;

//MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
//todm ... merge some fconf and sf ... anyway, they
//do ? override from URL-query,
return;


function doesConfigLemma (){
    // runs once per page load
    // c cc('doesConfigLemma');
    //====================================================
    // //\\ user scenarios
    //====================================================
    sf.SUBESSAY_TAB_RESETS_zoom_to_1 = false;
    //in selected lemma, can cancel
    //picture which is enabled in UserOptions:
    sf.MUSK_OUT_BOOK_PICTURE = false;
    sf.enableStudylab = false;
    sf.enableTools = false;
    sf.enableZoom = true;
    //todo true makes a bug
    //in amode8captures in prop 41
    sf.mediaMover_isDisabled = false;
    //toggles different functions in lemma5 f.e.
    sf.enableDataFunctionsRepository = false;
    //text book script scenario

    ///in the book text,
    ///replaces raw words with value from value found in
    ///collection of collectedDelayedLinks
    sf.insertDelayedBatch = true;
    //====================================================
    // \\// user scenarios
    //====================================================

    //=======================================
    // //\\ topic colors repo
    //=======================================
    //-----------------------
    // //\\ physics
    //-----------------------
    tr.time   = [0,   150, 200     ];
    tr.dtime  = [...tr.time, 1];

    //moving body on orbit
    tr.body   = [0,   120,  0,   1 ];
    tr.speed  = [...tr.body];
    tr.borbit  = [0,   180, 0,   1  ];
    tr.triangleGreen  = [...tr.borbit];
    tr.tangent = [0, 150, 0];
    tr.distanceToCenter = [...tr.body];

    //distances
    tr.path = [0,   0, 150,  1  ];
    tr.chord = [...tr.path];
    tr.trianglePurpleTextAreaColor = [...tr.path];
    tr["kepler-triangle-odd"]  = [102, 102, 255, 0.35, 0.7];
    tr["kepler-triangle-even"] = [153, 153, 255, 0.35, 0.7];
    tr.triangleGreen           = [0, 150, 0, 0.25, 0.64];
    tr.freeMove                = [0, 150, 0];
    tr.diagram                 = [150, 0, 90];
    tr.distance        = [60,  20,  0       ];
    tr.chord           = [0,0,255,   1  ];

    //dynamics
    tr.force           = [250, 0,   0       ];
    tr.curvature       = [...tr.force];
    tr.curvatureCircle = [...tr.force];

    tr.estimatedForce  = [100, 50,  0       ];
    tr.forceMove       = [250, 0,   0       ];
    tr.sagitta         = [...tr.estimatedForce];
    tr.sagittaeChords  = [...tr.sagitta];
    tr.displacement    = [...tr.estimatedForce];
    tr.fQR             = [...tr.estimatedForce];
    tr.perpendicular   = [150, 80, 0];
    //-----------------------
    // \\// physics
    //-----------------------

    // //\\ diagram
    tr.angle       = [0,  0,  150,   0.1, 0.4 ];
    tr.angleArea   = [0,  0,  150,   0.1, 0.3 ];
    // \\// diagram

    // //\\ proof steps
    tr.given       = [0,   150, 0,   1  ];
    tr.proof       = [0,   0,   255     ];
    tr.result      = [100, 0,   0       ];
    tr.invalid     = [0,   0,   0,   1  ];
    // \\// proof steps

    //neutral elements
    tr.shadow      = [50,  50, 50,      ];
    tr.dimShadow   = [0,  0, 0,  0.2   ];
    tr.hidden      = [0,   0,  0,    0  ];
    tr.context     = [0,   0,  0,    1  ];
    tr.legends     = [0,   0,  0,    1  ];
    tr.attention   = [200, 90, 0 ];

    // //\\ specific groups of lemmas
    //lemma 2,3,4
    tr["circumscribed-rectangles"] = [150, 0, 150, 0.32, 0.64],
    tr["inscribed-rectangles"]     = [0, 80, 150, 0.32, 0.64],
    //was:  "circumscribed-rectangles"  : [0,  50, 100, 0.4, 0.8],
    //      "inscribed-rectangles"      : [100,  0, 100, 0.4, 0.8],
    // \\// specific groups of lemmas
    //=======================================
    // \\// topic colors repo
    //=======================================

    //we adopt strategy when svg x-scale is unchanged and set as
    //sconf.mod2med, but y-scale can have additional factor,
    //mod2med_scaleY, to be overriden in lemma's conf.js
    //except lemmas 1 and 5 for which dontRun_ExpandConfig === true
    //
    //as of Dec 2025 never used in this app,
    sf.mod2med_scaleY = 1;

    //initial visibility of rg elements with rgid
    //when subessay relaunches
    sf.rgShapesVisible = true;

    ///for default points (and draggers???)
    ///in module points.js
    sf.medsize_standard = 1000;
    sf.medsize = 1000;
    sf.graphSvgSize = (1000+600)/2;

    //---------------------------------------------------------------
    // //\\ moved to site conf from expand-conf.js,
    //      defaults for medsize_standard = 1000 px,
    //---------------------------------------------------------------
    sf.default_tp_stroke_width = 10;
    sf.defaultLineWidth = 4;
    sf.handleRadius = 4;

    //unitless, will be multiplied by medsizeScale,
    //medsizeScale = medsize / sf.medsize_standard
    //see: topics-media-glocss.js

    //this makes hanle's border nicely thin
    sf.nonhover_width = 1;
    sf.hover_width = 3;

    //overrides hover_width for texts
    //for activation, needs class "hover-width" in element,
    //
    //apparently, we often disable this stroke at all
    //by minimizing its width
    //because of it only corrupts bold font on mouse hover,
    sf.text_nonhover_width = 0.01; //0.5; //0.13;
    //vital to fix too thick text-anchor-hovered font:
    sf.text_hover_width = 0.01; //1.0; //0.33;
    //---------------------------------------------------------------
    // \\// moved to site conf from expand-conf.js
    //---------------------------------------------------------------
    sf.thickness = 1;

    //this looks not very consistent because
    //gives this object special attention:
    sf.pointDecoration=  {
        'stroke-width': 2,
        r: sf.handleRadius,
        //todm is this ever used?:
        cssClass: 'tostroke tofill thickable',
    };

    Object.assign( sf, {
        //***************************************************
        // //\\ tp color
        //===================================================
        //topics:
        DEFAULT_TP_SATUR : 99,

        //---------------------------------------------------
        // //\\ tp color opacity
        //---------------------------------------------------
        //affects only ssF.lowrgid__2__glocss8anchorRack and
        //ssF.colorArray_2_rgba
        //does not affect anchor colors,
        TP_OPACITY_LOW : 0.5,

        //for points and lines only,
        //0.6-makes opacity points do look "non-solid",
        //todo implement this for curve and orbit strokes,
        TP_OPACITY_LOW_POINT : 1,

        TP_OPACITY_HIGH : 0.8,

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

        //diagram drag handle mouse pointer styles
        spinnerCursorGrab : 'crosshair',
        spinnerCursorGrabbed : 'crosshair',

        //---------------------------------------------------------------
        // //\\ anchor control
        //---------------------------------------------------------------
        ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS : 0.6,
        ANCHOR_TOPIC__OPACITY_IN_FOCUS : 0.9,
        //for anchor-text, sets tpcolarr opacity to 1
        ITEM_BASE_COLOR_TO_ANCHOR : false,
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

    //changable data
    //backups media zoom for case if its rule dragger
    //is not set:
    sn( 'medzoom', rg ).value = 1;
    stdMod.railsCustomSlidersCount = 0;
}

function normalizeSliders( sscale )
{
    sf.GENERIC_SLIDERS_FONT_SIZE *= sscale;
    sf.GENERIC_SLIDER_HEIGHT_Y *= sscale;
    sf.SLIDERS_LEGEND_HEIGHT *= sscale;
    sf.SLIDERS_OFFSET_Y *= sscale;
}
})();
